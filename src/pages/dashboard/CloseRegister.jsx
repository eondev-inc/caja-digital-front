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
      <section className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
        <div className="container mx-auto max-w-4xl px-4 py-6">
          <Card className="flex items-center justify-center p-12">
            <Spinner size="xl" />
            <p className="mt-4 text-neutral-600 dark:text-neutral-400">
              Cargando información de cuadratura...
            </p>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <div className="container mx-auto max-w-4xl px-4 py-6">
        <Card className="border border-neutral-200 bg-white p-6 shadow-lg dark:border-neutral-700 dark:bg-neutral-800">
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
            <form onSubmit={c.handleSubmit(c.onSubmitClose)} noValidate>
              <div className="space-y-4">
                <ReconciliationSummaryCard
                  calculationData={c.calculationData}
                  paymentMethods={c.paymentMethods}
                  enteredAmounts={c.watchedAmounts}
                  totalEntered={c.totalEntered}
                  differences={c.differences}
                  hasDiscrepancies={c.hasDiscrepancies}
                  formatCurrency={c.formatCurrency}
                />

                <AmountInputCard
                  paymentMethods={c.paymentMethods}
                  watchedAmounts={c.watchedAmounts}
                  register={c.register}
                  errors={c.errors}
                  watchedNotes={c.watchedNotes}
                  differences={c.differences}
                  formatCurrency={c.formatCurrency}
                />

                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    color="gray"
                    onClick={() => c.navigate('/dashboard')}
                    disabled={c.submitting}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    color="success"
                    disabled={c.submitting || !c.calculationData}
                    isProcessing={c.submitting}
                  >
                    {!c.submitting && (
                      <HiCheckCircle className="mr-2 size-5" />
                    )}
                    {c.submitting ? 'Procesando...' : 'Confirmar Cierre de Caja'}
                  </Button>
                </div>

                {c.hasDiscrepancies && (
                  <Alert color="warning" icon={HiExclamationCircle} role="alert">
                    <span className="font-medium">Atención:</span>{' '}
                    Se detectaron diferencias en los montos. Verifique los valores
                    antes de confirmar el cierre.
                  </Alert>
                )}
              </div>
            </form>
          )}
        </Card>

        <ApprovalModal
          show={c.showApprovalModal}
          approving={c.approving}
          calculationData={c.calculationData}
          paymentMethods={c.paymentMethods}
          totalEntered={c.totalEntered}
          enteredAmounts={c.watchedAmounts}
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
