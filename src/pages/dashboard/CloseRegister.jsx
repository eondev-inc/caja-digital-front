import { Card, Alert, Spinner } from 'flowbite-react';
import { HiCheckCircle, HiExclamationCircle } from 'react-icons/hi';
import CloseHeader from './close/CloseHeader';
import { useCloseRegister } from './close/hooks/useCloseRegister';
import ReconciliationSummaryCard from '../../components/CloseRegister/ReconciliationSummaryCard';
import AmountInputCard from '../../components/CloseRegister/AmountInputCard';
import ApprovalModal from '../../components/CloseRegister/ApprovalModal';
import NoRegisterModal from '../../components/Commons/NoRegisterModal';
import { Button } from 'flowbite-react';

/**
 * Página de Cuadratura y Cierre de Caja.
 * Permite visualizar el resumen de transacciones y realizar el cierre
 * con validación reactiva de montos por método de pago dinámico.
 */
const CloseRegister = () => {
  const c = useCloseRegister();

  if (c.loading && !c.showNoRegisterModal) {
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
          <CloseHeader />

          {c.error && (
            <Alert color="failure" icon={HiExclamationCircle} className="mb-4" role="alert">
              <span className="font-medium">Error:</span> {c.error}
            </Alert>
          )}
          {c.successMessage && (
            <Alert color="success" icon={HiCheckCircle} className="mb-4" role="status">
              <span className="font-medium">¡Éxito!</span> {c.successMessage}
            </Alert>
          )}
          {!c.calculationData && !c.error && (
            <Alert color="warning" icon={HiExclamationCircle} className="mb-4">
              No hay información de cuadratura disponible.
            </Alert>
          )}

          {c.calculationData && (
            <div className="space-y-4">
              <ReconciliationSummaryCard
                calculationData={c.calculationData}
                paymentMethods={c.paymentMethods}
                enteredAmounts={c.enteredAmounts}
                totalEntered={c.totalEntered}
                differences={c.differences}
                hasDiscrepancies={c.hasDiscrepancies}
                formatCurrency={c.formatCurrency}
              />

              <AmountInputCard
                paymentMethods={c.paymentMethods}
                enteredAmounts={c.enteredAmounts}
                setEnteredAmounts={c.setEnteredAmounts}
                notes={c.notes}
                differences={c.differences}
                setNotes={c.setNotes}
                formatCurrency={c.formatCurrency}
              />

              <div className="flex justify-end gap-4">
                <Button color="gray" onClick={() => c.navigate('/dashboard')} disabled={c.submitting}>
                  Cancelar
                </Button>
                <Button
                  color="success"
                  onClick={c.handleSubmitClose}
                  disabled={c.submitting || !c.calculationData}
                >
                  {c.submitting ? (
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

              {c.hasDiscrepancies && (
                <Alert color="warning" icon={HiExclamationCircle} role="alert">
                  <span className="font-medium">Atención:</span>{' '}
                  Se detectaron diferencias en los montos. Verifique los valores antes de confirmar el cierre.
                </Alert>
              )}
            </div>
          )}
        </Card>

        <ApprovalModal
          show={c.showApprovalModal}
          approving={c.approving}
          calculationData={c.calculationData}
          paymentMethods={c.paymentMethods}
          totalEntered={c.totalEntered}
          enteredAmounts={c.enteredAmounts}
          hasDiscrepancies={c.hasDiscrepancies}
          differences={c.differences}
          onClose={() => c.setShowApprovalModal(false)}
          onApprove={c.handleApproveClose}
          formatCurrency={c.formatCurrency}
        />

        <NoRegisterModal show={c.showNoRegisterModal} context="close" />
      </div>
    </section>
  );
};

export default CloseRegister;
