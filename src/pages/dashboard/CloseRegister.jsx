import { useState, useEffect, useMemo } from 'react';
import { Card, Button, Alert, Breadcrumb, Spinner } from 'flowbite-react';
import { HiHome, HiCheckCircle, HiExclamationCircle } from 'react-icons/hi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { calculateReconciliation, createReconciliation, approveReconciliation } from '../../api';
import { useStore } from '../../app/store';
import ReconciliationSummaryCard from '../../components/CloseRegister/ReconciliationSummaryCard';
import AmountInputCard from '../../components/CloseRegister/AmountInputCard';
import ApprovalModal from '../../components/CloseRegister/ApprovalModal';
import NoRegisterModal from '../../components/Commons/NoRegisterModal';

/**
 * Página de Cuadratura y Cierre de Caja.
 * Permite visualizar el resumen de transacciones y realizar el cierre
 * con validación reactiva de montos.
 */
const CloseRegister = () => {
  const navigate = useNavigate();
  const { openRegister, userInfo, setOpenRegister } = useStore();

  const [loading, setLoading] = useState(true);
  const [calculationData, setCalculationData] = useState(null);
  const [error, setError] = useState(null);

  const [cashAmount, setCashAmount] = useState(0);
  const [debitAmount, setDebitAmount] = useState(0);
  const [creditAmount, setCreditAmount] = useState(0);
  const [notes, setNotes] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [reconciliationId, setReconciliationId] = useState(null);
  const [approving, setApproving] = useState(false);

  const [showNoRegisterModal, setShowNoRegisterModal] = useState(false);

  /** Carga los datos de cuadratura al montar el componente */
  useEffect(() => {
    const fetchCalculation = async () => {
      const entityId =
        (userInfo.entity_users?.length > 0 && userInfo.entity_users[0]?.entities?.id) || '';

      if (!openRegister?.id) {
        setLoading(false);
        setShowNoRegisterModal(true);
        return;
      }

      setLoading(true);
      setError(null);

      const result = await calculateReconciliation({ entity_id: entityId });

      if (result.success) {
        setCalculationData(result.data);
      } else {
        setError(result.error || 'No se pudo cargar la información de cuadratura.');
      }

      setLoading(false);
    };

    fetchCalculation();
  }, [openRegister, userInfo]);

  /** Suma de montos ingresados */
  const totalEntered = useMemo(
    () => Number(cashAmount) + Number(debitAmount) + Number(creditAmount),
    [cashAmount, debitAmount, creditAmount],
  );

  /** Diferencias entre lo esperado y lo ingresado */
  const differences = useMemo(() => {
    if (!calculationData) return null;
    const expected = calculationData.transactionDetailsByPaymentMethod || {};
    const cashExpected = expected['Efectivo']?.totalAmount || 0;
    const debitExpected = expected['Tarjeta de débito']?.totalAmount || 0;
    const creditExpected = expected['Tarjeta de crédito']?.totalAmount || 0;
    const totalExpected = calculationData.totalAmount || 0;
    return {
      cash: Number(cashAmount) - cashExpected,
      debit: Number(debitAmount) - debitExpected,
      credit: Number(creditAmount) - creditExpected,
      total: totalEntered - totalExpected,
      cashExpected,
      debitExpected,
      creditExpected,
      totalExpected,
    };
  }, [calculationData, cashAmount, debitAmount, creditAmount, totalEntered]);

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

    const result = await createReconciliation({
      open_register_id: calculationData.openRegisterId,
      closing_balance: calculationData.initialAmount + totalEntered,
      total_sales: totalSales,
      sales_summary: {
        efectivo: Number(cashAmount),
        debito: Number(debitAmount),
        credito: Number(creditAmount),
      },
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
        <div className="container mx-auto max-w-7xl px-4 py-6">
          <Card className="mt-8 flex items-center justify-center p-12">
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
      <div className="container mx-auto max-w-7xl px-4 py-6">
        <Card className="mx-2 mt-8 border border-gray-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-800">
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
          <div className="mb-6">
            <div className="flex items-center gap-3">
              <FontAwesomeIcon icon={faCalculator} className="text-3xl text-primary-600 dark:text-primary-400" aria-hidden="true" />
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                Cuadratura y Cierre de Caja
              </h1>
            </div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
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
            <div className="space-y-6">
              <ReconciliationSummaryCard
                calculationData={calculationData}
                formatCurrency={formatCurrency}
              />

              <AmountInputCard
                cashAmount={cashAmount}
                debitAmount={debitAmount}
                creditAmount={creditAmount}
                notes={notes}
                differences={differences}
                totalEntered={totalEntered}
                hasDiscrepancies={hasDiscrepancies}
                setCashAmount={setCashAmount}
                setDebitAmount={setDebitAmount}
                setCreditAmount={setCreditAmount}
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
                  <FontAwesomeIcon icon={faExclamationTriangle} className="mr-1" aria-hidden="true" />
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
          totalEntered={totalEntered}
          cashAmount={cashAmount}
          debitAmount={debitAmount}
          creditAmount={creditAmount}
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
