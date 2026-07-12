import { useState, useEffect, useCallback } from 'react';
import {
  listTransactionsByUser,
  cancelTransaction,
  devolutionTransaction,
} from '../../../../api';
import { useStore } from '../../../../app/store';

const ITEMS_PER_PAGE = 10;

/**
 * Hook that manages all CancelTransactions state and side-effects:
 * data loading, pagination, search, cancel/devolution actions, and alerts.
 */
export const useCancelTransactions = () => {
  const { openRegister, userInfo } = useStore();

  // Register guard
  const [showNoRegisterModal, setShowNoRegisterModal] = useState(false);

  // Data state
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  // Modals
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showDevolutionModal, setShowDevolutionModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Check for open register on mount
  useEffect(() => {
    if (!openRegister?.id) {
      setShowNoRegisterModal(true);
    }
  }, [openRegister]);

  /**
   * Displays a temporary alert that auto-dismisses after 5 seconds.
   */
  const showAlert = useCallback((type, message) => {
    setAlert({ show: true, type, message });
    setTimeout(() => setAlert({ show: false, type: '', message: '' }), 5000);
  }, []);

  /**
   * Loads transactions from the server with pagination and optional search.
   */
  const loadTransactions = useCallback(
    async (page = 1, search = '') => {
      const entityId = userInfo?.entity_users?.[0]?.entities?.id;
      if (!entityId) {
        showAlert('error', 'Entidad no identificada');
        return;
      }

      setLoading(true);
      try {
        const response = await listTransactionsByUser(entityId, {
          page,
          limit: ITEMS_PER_PAGE,
          search: search.trim(),
        });

        // API returns { data, meta } — handle both shapes for resilience
        const data = Array.isArray(response) ? response : (response?.data ?? []);
        const meta = response?.meta;

        setTransactions(data);
        setCurrentPage(meta?.page ?? page);
        setTotalPages(
          meta?.totalPages ?? (Math.ceil(data.length / ITEMS_PER_PAGE) || 1),
        );
        setTotalItems(meta?.total ?? data.length);
      } catch (error) {
        console.error('Error al cargar transacciones:', error);
        showAlert('error', 'Error al cargar las transacciones');
      } finally {
        setLoading(false);
      }
    },
    [userInfo, showAlert],
  );

  // Initial load (only when register is open)
  useEffect(() => {
    if (openRegister?.id) {
      loadTransactions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openRegister]);

  /** Triggers a search from page 1 */
  const handleSearch = () => {
    setCurrentPage(1);
    loadTransactions(1, searchTerm);
  };

  /** Handles pagination page change */
  const handlePageChange = (page) => {
    loadTransactions(page, searchTerm);
  };

  /** Opens the cancel confirmation modal */
  const openCancelModal = (transaction) => {
    setSelectedTransaction(transaction);
    setShowCancelModal(true);
  };

  /** Opens the devolution confirmation modal */
  const openDevolutionModal = (transaction) => {
    setSelectedTransaction(transaction);
    setShowDevolutionModal(true);
  };

  /** Confirms and executes transaction cancellation */
  const handleCancelConfirm = async () => {
    if (!selectedTransaction) return;
    try {
      await cancelTransaction(selectedTransaction.id);
      showAlert('success', 'Transacción cancelada exitosamente');
      setShowCancelModal(false);
      loadTransactions(currentPage, searchTerm);
    } catch (error) {
      console.error('Error al cancelar transacción:', error);
      showAlert(
        'error',
        error?.response?.data?.message || 'Error al cancelar la transacción',
      );
    }
  };

  /** Confirms and executes transaction devolution */
  const handleDevolutionConfirm = async () => {
    if (!selectedTransaction) return;
    try {
      await devolutionTransaction(selectedTransaction.id);
      showAlert('success', 'Devolución realizada exitosamente');
      setShowDevolutionModal(false);
      loadTransactions(currentPage, searchTerm);
    } catch (error) {
      console.error('Error al realizar devolución:', error);
      showAlert(
        'error',
        error?.response?.data?.message || 'Error al realizar la devolución',
      );
    }
  };

  return {
    // Register guard
    showNoRegisterModal,
    // Data
    transactions,
    loading,
    searchTerm,
    setSearchTerm,
    currentPage,
    totalPages,
    totalItems,
    alert,
    setAlert,
    // Modals
    showCancelModal,
    setShowCancelModal,
    showDevolutionModal,
    setShowDevolutionModal,
    selectedTransaction,
    // Actions
    handleSearch,
    handlePageChange,
    openCancelModal,
    openDevolutionModal,
    handleCancelConfirm,
    handleDevolutionConfirm,
  };
};
