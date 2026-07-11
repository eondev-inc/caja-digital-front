import { Card, Alert } from 'flowbite-react';
import { CancelHeader } from './cancel/CancelHeader';
import { CancelFilters } from './cancel/CancelFilters';
import { CancelList } from './cancel/CancelList';
import { useCancelTransactions } from './cancel/hooks/useCancelTransactions';
import CancelConfirmModal from '../../components/CancelTransactions/CancelConfirmModal';
import DevolutionConfirmModal from '../../components/CancelTransactions/DevolutionConfirmModal';
import NoRegisterModal from '../../components/Commons/NoRegisterModal';

/**
 * Página de Anulación de Movimientos.
 * Permite cancelar o devolver transacciones completadas.
 */
const CancelTransactions = () => {
  const c = useCancelTransactions();

  return (
    <section className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <div className="container mx-auto max-w-6xl px-4 py-6">
        <Card className="border border-neutral-200 bg-white p-6 shadow-lg dark:border-neutral-700 dark:bg-neutral-800">
          <CancelHeader />

          {c.alert.show && (
            <Alert
              color={c.alert.type}
              onDismiss={() => c.setAlert({ show: false, type: '', message: '' })}
              className="mb-4"
              role={c.alert.type === 'success' ? 'status' : 'alert'}
            >
              <span className="font-medium">
                {c.alert.type === 'success' ? '¡Éxito! ' : 'Error: '}
              </span>
              {c.alert.message}
            </Alert>
          )}

          <CancelFilters
            searchTerm={c.searchTerm}
            onSearchTermChange={c.setSearchTerm}
            onSearch={c.handleSearch}
            loading={c.loading}
            totalItems={c.totalItems}
          />

          <CancelList
            transactions={c.transactions}
            loading={c.loading}
            currentPage={c.currentPage}
            totalPages={c.totalPages}
            onPageChange={c.handlePageChange}
            onCancel={c.openCancelModal}
            onDevolution={c.openDevolutionModal}
          />
        </Card>

        <CancelConfirmModal
          show={c.showCancelModal}
          transaction={c.selectedTransaction}
          onClose={() => c.setShowCancelModal(false)}
          onConfirm={c.handleCancelConfirm}
        />

        <DevolutionConfirmModal
          show={c.showDevolutionModal}
          transaction={c.selectedTransaction}
          onClose={() => c.setShowDevolutionModal(false)}
          onConfirm={c.handleDevolutionConfirm}
        />

        <NoRegisterModal show={c.showNoRegisterModal} context="cancel" />
      </div>
    </section>
  );
};

export default CancelTransactions;
