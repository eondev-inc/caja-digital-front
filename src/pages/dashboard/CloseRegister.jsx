import { useState, useEffect, useMemo } from 'react';
import { Card, Button, Alert, Breadcrumb, Spinner } from 'flowbite-react';
import { HiHome, HiCheckCircle, HiExclamationCircle } from 'react-icons/hi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { calculateReconciliation, createReconciliation, approveReconciliation, getPaymentMethods } from '../../api';
import { useStore } from '../../app/store';
import ReconciliationSummaryCard from '../../components/CloseRegister/ReconciliationSummaryCard';
import AmountInputCard from '../../components/CloseRegister/AmountInputCard';
import ApprovalModal from '../../components/CloseRegister/ApprovalModal';
import NoRegisterModal from '../../components/Commons/NoRegisterModal';

/**
 * Página de Cuadratura y Cierre de Caja.
 * Permite visualizar el resumen de transacciones y realizar el cierre
 * con validación reactiva de montos por método de pago dinámico.
 */
const CloseRegister = () => {
  const navigate = useNavigate();
  const { openRegister, userInfo, setOpenRegister } = useStore();

  const [loading, setLoading] = useState(true);
  const [calculationData, setCalculationData] = useState(null);
  const [error, setError] = useState(null);

  /** Lista de métodos de pago activos cargados desde el backend */
  const [paymentMethods, setPaymentMethods] = useState([]);

  /**
   * Montos ingresados por el usuario, indexados por description del método de pago.
   * Ej: { 'Efectivo': 0, 'Tarjeta de débito': 0, 'Bono Papel': 0 }
   */
  const [enteredAmounts, setEnteredAmounts] = useState({});
  const [notes, setNotes] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [reconciliationId, setReconciliationId] = useState(null);
  const [approving, setApproving] = useState(false);

  const [showNoRegisterModal, setShowNoRegisterModal] = useState(false);

  /** Carga métodos de pago y datos de cuadratura al montar el componente */
  useEffect(() => {
    const fetchAll = async () => {
      if (!openRegister?.id) {
        setLoading(false);
        setShowNoRegisterModal(true);
        return;
      }

      const entityId =
        (userInfo.entity_users?.length > 0 && userInfo.entity_users[0]?.entities?.id) || '';

      setLoading(true);
      setError(null);

      const [methodsResult, calcResult] = await Promise.allSettled([
        getPaymentMethods(),
        calculateReconciliation({ entity_id: entityId }),
      ]);

      // Procesar métodos de pago
      if (methodsResult.status === 'fulfilled') {
        const methods = Array.isArray(methodsResult.value) ? methodsResult.value : [];
        setPaymentMethods(methods);
        // Inicializar enteredAmounts con 0 para cada método
        const initial = {};
        methods.forEach((m) => { initial[m.description] = 0; });
        setEnteredAmounts(initial);
      }

      // Procesar datos de cuadratura
      if (calcResult.status === 'fulfilled') {
        const result = calcResult.value;
        if (result.success) {
          setCalculationData(result.data);
        } else {
          setError(result.error || 'No se pudo cargar la información de cuadratura.');
        }
      } else {
        setError('No se pudo cargar la información de cuadratura.');
      }

      setLoading(false);
    };

    fetchAll();
  }, [openRegister, userInfo]);

  /** Suma total de todos los montos ingresados */
  const totalEntered = useMemo(
    () => Object.values(enteredAmounts).reduce((sum, v) => sum + Number(v), 0),
    [enteredAmounts],
  );

  /**
   * Diferencias entre lo esperado (del backend) y lo ingresado (por el usuario).
   * Retorna un objeto indexado por description del método de pago, más totales.
   */
  const differences = useMemo(() => {
    if (!calculationData) return null;
    const expected = calculationData.transactionDetailsByPaymentMethod || {};
    const totalExpected = calculationData.totalAmount || 0;

    const byMethod = {};
    paymentMethods.forEach((m) => {
      const desc = m.description;
      const exp = expected[desc]?.totalAmount || 0;
      const entered = Number(enteredAmounts[desc] ?? 0);
      byMethod[desc] = {
        expected: exp,
        entered,
        diff: entered - exp,
      };
    });

    return {
      byMethod,
      totalExpected,
      total: totalEntered - totalExpected,
    };
  }, [calculationData, enteredAmounts, paymentMethods, totalEntered]);

  const hasDiscrepancies = useMemo(
    () => (differences ? differences.total !== 0 : false),
    [differences],
  );

  /** Formatea montos en CLP */
  const formatCurrency = (amount) =>
    new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount || 0);

  /** Envía el cierre de caja */
  const handleSubmitClose = async () => {
    if (!calculationData) return;
    setSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    const totalSales = Object.values(calculationData.transactionDetailsByType || {}).reduce(
      (sum, type) => sum + (type.count || 0),
      0,
    );

    // Construir sales_summary dinámico: { [description]: monto }
    const sales_summary = {};
    Object.entries(enteredAmounts).forEach(([desc, amount]) => {
      sales_summary[desc] = Number(amount);
    });

    const result = await createReconciliation({
      open_register_id: calculationData.openRegisterId,
      closing_balance: calculationData.initialAmount + totalEntered,
      total_sales: totalSales,
      sales_summary,
      notes: notes.trim() || undefined,
    });

    setSubmitting(false);

    if (result.success) {
      setReconciliationId(result.data?.id || result.data?.reconciliation_id);
      setSuccessMessage('Cierre de caja enviado a revisión exitosamente');
      setShowApprovalModal(true);
    } else {
      setError(result.error || 'No se pudo realizar el cierre de caja');
    }
  };

  /** Aprueba el cierre de caja */
  const handleApproveClose = async () => {
    if (!reconciliationId) {
      setError('No se encontró el ID de la reconciliación');
      return;
    }
    setApproving(true);
    setError(null);

    const result = await approveReconciliation(reconciliationId);
    setApproving(false);

    if (result.success) {
      setOpenRegister({});
      setSuccessMessage('¡Cierre de caja aprobado exitosamente! Redirigiendo...');
      setShowApprovalModal(false);
      setTimeout(() => navigate('/dashboard'), 2000);
    } else {
      setError(result.error || 'No se pudo aprobar el cierre de caja');
    }
  };

  if (loading && !showNoRegisterModal) {
    return (
      <section className="min-h-screen bg-gray-50 dark:bg-slate-900">
        <div className="container mx-auto max-w-4xl px-4 py-6">
          <Card className="flex items-center justify-center p-12">
            <Spinner size="xl" />
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Cargando información de cuadratura...
            </p>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="container mx-auto max-w-4xl px-4 py-6">
        <Card className="border border-gray-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-800">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-4">
            <Breadcrumb.Item href="/dashboard" icon={HiHome} className="text-primary-600 dark:text-primary-400">
              Inicio
            </Breadcrumb.Item>
            <Breadcrumb.Item className="text-gray-600">
              Cuadratura y Cierre de Caja
            </Breadcrumb.Item>
          </Breadcrumb>

          {/* Header */}
          <div className="mb-4">
            <div className="flex items-center gap-3">
              <FontAwesomeIcon icon={faCalculator} className="text-2xl text-primary-600 dark:text-primary-400" aria-hidden="true" />
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                Cuadratura y Cierre de Caja
              </h1>
            </div>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Verifica los montos y realiza el cierre diario de tu caja registradora.
            </p>
          </div>

          {/* Alertas */}
          {error && (
            <Alert color="failure" icon={HiExclamationCircle} className="mb-4" role="alert">
              <span className="font-medium">Error:</span> {error}
            </Alert>
          )}
          {successMessage && (
            <Alert color="success" icon={HiCheckCircle} className="mb-4" role="status">
              <span className="font-medium">¡Éxito!</span> {successMessage}
            </Alert>
          )}
          {!calculationData && !error && (
            <Alert color="warning" icon={HiExclamationCircle} className="mb-4">
              No hay información de cuadratura disponible.
            </Alert>
          )}

          {calculationData && (
            <div className="space-y-4">
              <ReconciliationSummaryCard
                calculationData={calculationData}
                paymentMethods={paymentMethods}
                enteredAmounts={enteredAmounts}
                totalEntered={totalEntered}
                differences={differences}
                hasDiscrepancies={hasDiscrepancies}
                formatCurrency={formatCurrency}
              />

              <AmountInputCard
                paymentMethods={paymentMethods}
                enteredAmounts={enteredAmounts}
                setEnteredAmounts={setEnteredAmounts}
                notes={notes}
                differences={differences}
                setNotes={setNotes}
                formatCurrency={formatCurrency}
              />

              {/* Botones de acción */}
              <div className="flex justify-end gap-4">
                <Button color="gray" onClick={() => navigate('/dashboard')} disabled={submitting}>
                  Cancelar
                </Button>
                <Button
                  color="success"
                  onClick={handleSubmitClose}
                  disabled={submitting || !calculationData}
                >
                  {submitting ? (
                    <>
                      <Spinner size="sm" className="mr-2" />
                      Procesando...
                    </>
                  ) : (
                    <>
                      <HiCheckCircle className="mr-2 size-5" />
                      Confirmar Cierre de Caja
                    </>
                  )}
                </Button>
              </div>

              {hasDiscrepancies && (
                <Alert color="warning" icon={HiExclamationCircle} role="alert">
                  <span className="font-medium">Atención:</span>{' '}
                  Se detectaron diferencias en los montos. Verifique los valores antes de confirmar el cierre.
                </Alert>
              )}
            </div>
          )}
        </Card>

        <ApprovalModal
          show={showApprovalModal}
          approving={approving}
          calculationData={calculationData}
          paymentMethods={paymentMethods}
          totalEntered={totalEntered}
          enteredAmounts={enteredAmounts}
          hasDiscrepancies={hasDiscrepancies}
          differences={differences}
          onClose={() => setShowApprovalModal(false)}
          onApprove={handleApproveClose}
          formatCurrency={formatCurrency}
        />

        <NoRegisterModal show={showNoRegisterModal} context="close" />
      </div>
    </section>
  );
};

export default CloseRegister;
