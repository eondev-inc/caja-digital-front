import { useState, useEffect, useMemo } from 'react';
import { Card, Button, Alert, Breadcrumb, Spinner, TextInput, Textarea, Modal } from 'flowbite-react';
import { HiHome, HiCheckCircle, HiExclamationCircle } from 'react-icons/hi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator, faMoneyBillWave, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { calculateReconciliation, createReconciliation, approveReconciliation } from '../../api';
import { useStore } from '../../app/store';

/**
 * Página de Cuadratura y Cierre de Caja
 * Permite visualizar el resumen de transacciones y realizar el cierre de caja
 * con validación reactiva de montos
 */
const CloseRegister = () => {
  const navigate = useNavigate();
  const { openRegister, userInfo, setOpenRegister } = useStore();
  
  // Estados para la carga y datos del cálculo
  const [loading, setLoading] = useState(true);
  const [calculationData, setCalculationData] = useState(null);
  const [error, setError] = useState(null);
  
  // Estados para los montos ingresados por el usuario
  const [cashAmount, setCashAmount] = useState(0);
  const [debitAmount, setDebitAmount] = useState(0);
  const [creditAmount, setCreditAmount] = useState(0);
  const [notes, setNotes] = useState('');
  
  // Estados para el proceso de cierre
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  
  // Estados para el modal de aprobación
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [reconciliationId, setReconciliationId] = useState(null);
  const [approving, setApproving] = useState(false);
  
  // Estado para el modal de caja no abierta
  const [showNoRegisterModal, setShowNoRegisterModal] = useState(false);

  /**
   * Carga los datos de cuadratura al montar el componente
   */
  useEffect(() => {
    const fetchCalculation = async () => {
      const entityId = (userInfo.entity_users && userInfo.entity_users.length > 0 && userInfo.entity_users[0]?.entities?.id) || '';
      if (!openRegister?.id) {
        setLoading(false);
        setShowNoRegisterModal(true);
        return;
      }

      setLoading(true);
      setError(null);

      const result = await calculateReconciliation({
        entity_id: entityId,
      });

      if (result.success) {
        setCalculationData(result.data);
      } else {
        setError(result.error || 'No se pudo cargar la información de cuadratura.');
      }

      setLoading(false);
    };

    fetchCalculation();
  }, [openRegister, userInfo]);

  /**
   * Calcula el total ingresado por el usuario
   */
  const totalEntered = useMemo(() => {
    return Number(cashAmount) + Number(debitAmount) + Number(creditAmount);
  }, [cashAmount, debitAmount, creditAmount]);

  /**
   * Calcula las diferencias entre lo esperado y lo ingresado
   */
  const differences = useMemo(() => {
    if (!calculationData) return null;

    const expected = calculationData.transactionDetailsByPaymentMethod || {};
    
    // Mapeo de métodos de pago (ajustar según los nombres exactos de tu backend)
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

  /**
   * Verifica si hay discrepancias en los montos
   */
  const hasDiscrepancies = useMemo(() => {
    if (!differences) return false;
    return differences.total !== 0;
  }, [differences]);

  /**
   * Maneja el envío del cierre de caja
   */
  const handleSubmitClose = async () => {
    if (!calculationData) return;

    setSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    const totalSales = Object.values(calculationData.transactionDetailsByType || {})
      .reduce((sum, type) => sum + (type.count || 0), 0);

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
      // Guardar el ID de la reconciliación y mostrar modal de aprobación
      setReconciliationId(result.data?.id || result.data?.reconciliation_id);
      setSuccessMessage('Cierre de caja enviado a revisión exitosamente');
      setShowApprovalModal(true);
    } else {
      setError(result.error || 'No se pudo realizar el cierre de caja');
    }
  };

  /**
   * Maneja la aprobación del cierre de caja
   */
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
      // Limpiar el openRegister en Zustand
      setOpenRegister({});
      
      setSuccessMessage('¡Cierre de caja aprobado exitosamente! Redirigiendo...');
      setShowApprovalModal(false);
      
      // Redirigir después de 2 segundos
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } else {
      setError(result.error || 'No se pudo aprobar el cierre de caja');
    }
  };

  /**
   * Formatea montos para mostrar
   */
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    }).format(amount || 0);
  };

  // Si está mostrando el modal de caja no abierta, no mostrar spinner
  if (loading && !showNoRegisterModal) {
    return (
      <section className="min-h-screen bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 py-6">
          <Card className="mt-8 flex items-center justify-center p-12">
            <Spinner size="xl" />
            <p className="mt-4 text-gray-600">Cargando información de cuadratura...</p>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-7xl px-4 py-6">
        <Card className="mx-2 mt-8 border border-gray-200 bg-white p-6 shadow-lg">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-4">
            <Breadcrumb.Item href="/dashboard" icon={HiHome} className="text-green-600">
              Inicio
            </Breadcrumb.Item>
            <Breadcrumb.Item className="text-gray-600">
              Cuadratura y Cierre de Caja
            </Breadcrumb.Item>
          </Breadcrumb>

          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3">
              <FontAwesomeIcon icon={faCalculator} className="text-3xl text-green-600" />
              <h1 className="text-3xl font-bold text-gray-800">
                Cuadratura y Cierre de Caja
              </h1>
            </div>
            <p className="mt-2 text-gray-600">
              Verifica los montos y realiza el cierre diario de tu caja registradora.
            </p>
          </div>

          {/* Mensajes de error o éxito */}
          {error && (
            <Alert color="failure" icon={HiExclamationCircle} className="mb-4">
              <span className="font-medium">Error:</span> {error}
            </Alert>
          )}

          {successMessage && (
            <Alert color="success" icon={HiCheckCircle} className="mb-4">
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
              {/* Resumen General */}
              <Card className="border border-gray-200">
                <h2 className="mb-4 text-xl font-semibold text-gray-800">
                  Resumen General
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="rounded-lg bg-blue-50 p-4">
                    <p className="text-sm text-gray-600">Monto Inicial</p>
                    <p className="text-2xl font-bold text-blue-700">
                      {formatCurrency(calculationData.initialAmount)}
                    </p>
                  </div>
                  <div className="rounded-lg bg-green-50 p-4">
                    <p className="text-sm text-gray-600">Total Transacciones</p>
                    <p className="text-2xl font-bold text-green-700">
                      {formatCurrency(calculationData.totalAmount)}
                    </p>
                  </div>
                  <div className="rounded-lg bg-purple-50 p-4">
                    <p className="text-sm text-gray-600">Balance Esperado</p>
                    <p className="text-2xl font-bold text-purple-700">
                      {formatCurrency(calculationData.expectedBalance)}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Resumen por Tipo de Transacción */}
              <Card className="border border-gray-200">
                <h2 className="mb-4 text-xl font-semibold text-gray-800">
                  Resumen por Tipo de Transacción
                </h2>
                <div className="space-y-3">
                  {Object.entries(calculationData.transactionDetailsByType || {}).map(
                    ([type, details]) => (
                      <div key={type} className="rounded-lg border border-gray-200 p-4">
                        <h3 className="mb-2 font-semibold text-gray-700">{type}</h3>
                        <p className="text-sm text-gray-600">
                          Total: <span className="font-medium">{details.count}</span> transacciones
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {Object.entries(details.details || {}).map(([status, count]) => (
                            <span
                              key={status}
                              className={`rounded-full px-3 py-1 text-xs font-medium ${
                                status === 'COMPLETADO'
                                  ? 'bg-green-100 text-green-800'
                                  : status === 'CANCELADO'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {status}: {count}
                            </span>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </Card>

              {/* Resumen por Método de Pago */}
              <Card className="border border-gray-200">
                <h2 className="mb-4 text-xl font-semibold text-gray-800">
                  Resumen por Método de Pago
                </h2>
                <div className="space-y-3">
                  {Object.entries(calculationData.transactionDetailsByPaymentMethod || {}).map(
                    ([method, details]) => (
                      <div key={method} className="rounded-lg border border-gray-200 p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-700">{method}</h3>
                            <p className="text-sm text-gray-600">
                              {details.count} transacciones
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-green-700">
                              {formatCurrency(details.totalAmount)}
                            </p>
                          </div>
                        </div>
                        <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
                          {Object.entries(details.details || {}).map(([status, amount]) => (
                            <div key={status} className="text-center">
                              <p className="text-gray-600">{status}</p>
                              <p className={`font-medium ${
                                amount > 0 ? 'text-green-600' : amount < 0 ? 'text-red-600' : 'text-gray-600'
                              }`}>
                                {formatCurrency(amount)}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </Card>

              {/* Ingreso de Montos Reales */}
              <Card className="border border-gray-200 bg-yellow-50">
                <h2 className="mb-4 text-xl font-semibold text-gray-800">
                  Ingrese los Montos Contados
                </h2>
                <p className="mb-4 text-sm text-gray-600">
                  Ingrese los montos reales que tiene en caja. El sistema calculará automáticamente las diferencias.
                </p>
                
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {/* Efectivo */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      <FontAwesomeIcon icon={faMoneyBillWave} className="mr-2 text-green-600" />
                      Efectivo
                    </label>
                    <TextInput
                      type="number"
                      min="0"
                      step="1"
                      value={cashAmount}
                      onChange={(e) => setCashAmount(e.target.value)}
                      placeholder="0"
                      className="w-full"
                    />
                    {differences && (
                      <p className={`mt-1 text-sm ${
                        differences.cash === 0 
                          ? 'text-green-600' 
                          : 'font-medium text-red-600'
                      }`}>
                        Esperado: {formatCurrency(differences.cashExpected)}
                        {differences.cash !== 0 && (
                          <span className="ml-2">
                            ({differences.cash > 0 ? '+' : ''}{formatCurrency(differences.cash)})
                          </span>
                        )}
                      </p>
                    )}
                  </div>

                  {/* Débito */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      <FontAwesomeIcon icon={faCreditCard} className="mr-2 text-blue-600" />
                      Tarjeta de Débito
                    </label>
                    <TextInput
                      type="number"
                      min="0"
                      step="1"
                      value={debitAmount}
                      onChange={(e) => setDebitAmount(e.target.value)}
                      placeholder="0"
                      className="w-full"
                    />
                    {differences && (
                      <p className={`mt-1 text-sm ${
                        differences.debit === 0 
                          ? 'text-green-600' 
                          : 'font-medium text-red-600'
                      }`}>
                        Esperado: {formatCurrency(differences.debitExpected)}
                        {differences.debit !== 0 && (
                          <span className="ml-2">
                            ({differences.debit > 0 ? '+' : ''}{formatCurrency(differences.debit)})
                          </span>
                        )}
                      </p>
                    )}
                  </div>

                  {/* Crédito */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      <FontAwesomeIcon icon={faCreditCard} className="mr-2 text-purple-600" />
                      Tarjeta de Crédito
                    </label>
                    <TextInput
                      type="number"
                      min="0"
                      step="1"
                      value={creditAmount}
                      onChange={(e) => setCreditAmount(e.target.value)}
                      placeholder="0"
                      className="w-full"
                    />
                    {differences && (
                      <p className={`mt-1 text-sm ${
                        differences.credit === 0 
                          ? 'text-green-600' 
                          : 'font-medium text-red-600'
                      }`}>
                        Esperado: {formatCurrency(differences.creditExpected)}
                        {differences.credit !== 0 && (
                          <span className="ml-2">
                            ({differences.credit > 0 ? '+' : ''}{formatCurrency(differences.credit)})
                          </span>
                        )}
                      </p>
                    )}
                  </div>
                </div>

                {/* Total y Diferencia */}
                <div className="mt-6 border-t pt-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="rounded-lg bg-white p-4">
                      <p className="text-sm text-gray-600">Total Ingresado</p>
                      <p className="text-2xl font-bold text-gray-800">
                        {formatCurrency(totalEntered)}
                      </p>
                    </div>
                    <div className={`rounded-lg p-4 ${
                      hasDiscrepancies ? 'bg-red-100' : 'bg-green-100'
                    }`}>
                      <p className="text-sm text-gray-600">Diferencia</p>
                      <p className={`text-2xl font-bold ${
                        hasDiscrepancies ? 'text-red-700' : 'text-green-700'
                      }`}>
                        {differences?.total > 0 ? '+' : ''}{formatCurrency(differences?.total || 0)}
                      </p>
                      {hasDiscrepancies && (
                        <p className="mt-1 text-xs text-red-600">
                          ⚠ Hay diferencias en los montos
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Notas */}
                <div className="mt-4">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Notas (opcional)
                  </label>
                  <Textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Agregue comentarios sobre el cierre de caja..."
                    className="w-full"
                  />
                </div>
              </Card>

              {/* Botones de Acción */}
              <div className="flex justify-end gap-4">
                <Button
                  color="gray"
                  onClick={() => navigate('/dashboard')}
                  disabled={submitting}
                >
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

              {/* Advertencia de discrepancias */}
              {hasDiscrepancies && (
                <Alert color="warning" icon={HiExclamationCircle}>
                  <span className="font-medium">Atención:</span> Se detectaron diferencias en los montos. 
                  Verifique los valores antes de confirmar el cierre.
                </Alert>
              )}
            </div>
          )}
        </Card>

        {/* Modal de Aprobación */}
        <Modal show={showApprovalModal} onClose={() => !approving && setShowApprovalModal(false)} size="lg">
          <Modal.Header>
            Aprobar Cierre de Caja
          </Modal.Header>
          <Modal.Body>
            <div className="space-y-4">
              <Alert color="success" icon={HiCheckCircle}>
                <span className="font-medium">¡Cierre enviado a revisión!</span> El cierre de caja se ha registrado correctamente.
              </Alert>
              
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <h3 className="mb-3 font-semibold text-gray-800">Resumen del Cierre</h3>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monto Inicial:</span>
                    <span className="font-medium text-gray-800">
                      {formatCurrency(calculationData?.initialAmount || 0)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Transacciones:</span>
                    <span className="font-medium text-gray-800">
                      {formatCurrency(calculationData?.totalAmount || 0)}
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-gray-600">Balance Final:</span>
                    <span className="font-semibold text-green-700">
                      {formatCurrency((calculationData?.initialAmount || 0) + totalEntered)}
                    </span>
                  </div>
                </div>

                <div className="mt-4 border-t pt-3">
                  <p className="mb-2 text-xs font-medium text-gray-700">Montos Ingresados:</p>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="text-center">
                      <p className="text-xs text-gray-600">Efectivo</p>
                      <p className="font-medium text-gray-800">{formatCurrency(cashAmount)}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-600">Débito</p>
                      <p className="font-medium text-gray-800">{formatCurrency(debitAmount)}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-600">Crédito</p>
                      <p className="font-medium text-gray-800">{formatCurrency(creditAmount)}</p>
                    </div>
                  </div>
                </div>

                {hasDiscrepancies && (
                  <div className="mt-3 rounded bg-yellow-50 p-2">
                    <p className="text-xs text-yellow-800">
                      ⚠ Nota: Se detectaron diferencias de {formatCurrency(differences?.total || 0)}
                    </p>
                  </div>
                )}
              </div>

              <div className="rounded-lg bg-blue-50 p-4">
                <p className="text-sm text-blue-800">
                  <span className="font-medium">¿Desea aprobar este cierre?</span>
                  <br />
                  Al aprobar, la caja se cerrará definitivamente y no podrá realizar más transacciones en esta sesión.
                </p>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="flex w-full justify-end gap-3">
              <Button
                color="gray"
                onClick={() => setShowApprovalModal(false)}
                disabled={approving}
              >
                Cancelar
              </Button>
              <Button
                color="success"
                onClick={handleApproveClose}
                disabled={approving}
              >
                {approving ? (
                  <>
                    <Spinner size="sm" className="mr-2" />
                    Aprobando...
                  </>
                ) : (
                  <>
                    <HiCheckCircle className="mr-2 size-5" />
                    Aprobar Cierre
                  </>
                )}
              </Button>
            </div>
          </Modal.Footer>
        </Modal>

        {/* Modal de Caja No Abierta */}
        <Modal show={showNoRegisterModal} onClose={() => {}} dismissible={false} size="md">
          <Modal.Header>
            <div className="flex items-center gap-2">
              <HiExclamationCircle className="size-6 text-yellow-500" />
              <span>Caja No Abierta</span>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="space-y-4">
              <Alert color="warning" icon={HiExclamationCircle}>
                <span className="font-medium">Atención:</span> No hay una caja abierta actualmente.
              </Alert>
              
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <p className="text-sm text-gray-700">
                  Para realizar el cierre de caja, primero debe abrir una caja registradora. 
                  La apertura de caja le permite:
                </p>
                <ul className="ml-4 mt-2 list-disc space-y-1 text-sm text-gray-600">
                  <li>Registrar el monto inicial</li>
                  <li>Asociar transacciones a la caja</li>
                  <li>Realizar seguimiento de movimientos</li>
                  <li>Generar reportes y cierres</li>
                </ul>
              </div>

              <div className="rounded-lg bg-blue-50 p-4">
                <p className="text-sm text-blue-800">
                  <span className="font-medium">¿Desea abrir una caja ahora?</span>
                  <br />
                  Será redirigido a la página de apertura de caja.
                </p>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="flex w-full justify-end gap-3">
              <Button
                color="gray"
                onClick={() => navigate('/dashboard')}
              >
                Cancelar
              </Button>
              <Button
                color="success"
                onClick={() => navigate('/dashboard/open-register')}
              >
                Abrir Caja
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    </section>
  );
};

export default CloseRegister;
