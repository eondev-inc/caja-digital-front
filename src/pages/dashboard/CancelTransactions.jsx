import { useState, useEffect, useCallback } from 'react';
import {
  Card,
  TextInput,
  Button,
  Badge,
  Table,
  Alert,
  Spinner,
  Pagination,
  Breadcrumb,
} from 'flowbite-react';
import { HiHome } from 'react-icons/hi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faUndo,
  faBan,
  faExclamationTriangle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import {
  listTransactionsByUser,
  cancelTransaction,
  devolutionTransaction,
} from '../../api';
import { useStore } from '../../app/store';
import NoRegisterModal from '../../components/Commons/NoRegisterModal';
import CancelConfirmModal from '../../components/CancelTransactions/CancelConfirmModal';
import DevolutionConfirmModal from '../../components/CancelTransactions/DevolutionConfirmModal';
import { formatCurrency, formatDate } from '../../utils/formatters';

/**
 * Página de anulación de movimientos.
 * Permite listar, buscar, cancelar y devolver transacciones de la caja abierta.
 * Requiere caja abierta — muestra NoRegisterModal si no la hay.
 */
const CancelTransactions = () => {
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

  const itemsPerPage = 10;

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
          limit: itemsPerPage,
          search: search.trim(),
        });

        // API now returns { data, meta } — handle both shapes for resilience
        const data = Array.isArray(response) ? response : (response?.data ?? []);
        const meta = response?.meta;

        setTransactions(data);
        setCurrentPage(meta?.page ?? page);
        setTotalPages(meta?.totalPages ?? (Math.ceil(data.length / itemsPerPage) || 1));
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

  /**
   * Returns a Flowbite Badge for a given transaction status.
   */
  const getStatusBadge = (status) => {
    const s = status?.toLowerCase() ?? '';
    const map = {
      completado: { color: 'success', label: 'Completada' },
      cancelado: { color: 'failure', label: 'Cancelada' },
      devuelto: { color: 'warning', label: 'Devuelta' },
      pendiente: { color: 'info', label: 'Pendiente' },
    };
    const cfg = map[s] ?? { color: 'gray', label: status ?? 'Desconocido' };
    return <Badge color={cfg.color}>{cfg.label}</Badge>;
  };

  /**
   * Returns true only for COMPLETADO transactions (the only cancellable/returnable state).
   */
  const canActOnTransaction = (transaction) =>
    transaction?.status?.toLowerCase() === 'completado';

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="container mx-auto max-w-5xl px-4 py-6">
        <Card className="border border-gray-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-4">
            <Breadcrumb.Item
              href="/dashboard"
              icon={HiHome}
              className="text-primary-600 dark:text-primary-400"
            >
              Inicio
            </Breadcrumb.Item>
            <Breadcrumb.Item className="text-gray-600 dark:text-gray-400">
              Anulación de Movimientos
            </Breadcrumb.Item>
          </Breadcrumb>

          {/* Page header */}
          <div className="mb-4">
            <div className="flex items-center gap-3">
              <FontAwesomeIcon
                icon={faTimesCircle}
                className="text-2xl text-primary-600 dark:text-primary-400"
                aria-hidden="true"
              />
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                Anulación de Movimientos
              </h1>
            </div>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Gestiona cancelaciones y devoluciones de las transacciones de la caja actual.
            </p>
          </div>

          {/* Alert */}
          {alert.show && (
            <div className="mb-4">
              <Alert
                color={alert.type === 'error' ? 'failure' : 'success'}
                onDismiss={() => setAlert({ show: false, type: '', message: '' })}
                role={alert.type === 'error' ? 'alert' : 'status'}
              >
                <span className="font-medium">
                  {alert.type === 'error' ? '¡Error!' : '¡Éxito!'}
                </span>{' '}
                {alert.message}
              </Alert>
            </div>
          )}

          {/* Search bar */}
          <div className="mb-4 flex gap-3">
            <TextInput
              className="flex-1"
              icon={() => (
                <FontAwesomeIcon icon={faSearch} className="size-4 text-gray-400" aria-hidden="true" />
              )}
              placeholder="Buscar por folio o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              aria-label="Buscar transacciones"
            />
            <Button color="blue" onClick={handleSearch} disabled={loading}>
              <FontAwesomeIcon icon={faSearch} className="mr-2" aria-hidden="true" />
              Buscar
            </Button>
          </div>

          {/* Summary pill */}
          <div className="mb-4 flex items-center justify-end gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span>Total de movimientos:</span>
            <span className="font-semibold text-gray-800 dark:text-white">{totalItems}</span>
          </div>

          {/* Content: spinner / empty state / table */}
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Spinner size="xl" aria-label="Cargando transacciones" />
              <span className="ml-3 text-lg text-slate-600 dark:text-slate-400">
                Cargando transacciones...
              </span>
            </div>
          ) : transactions.length === 0 ? (
            <div className="py-16 text-center">
              <FontAwesomeIcon
                icon={faExclamationTriangle}
                className="mb-4 size-12 text-gray-400 dark:text-gray-500"
                aria-hidden="true"
              />
              <p className="text-lg text-slate-600 dark:text-slate-400">
                No se encontraron transacciones
              </p>
              <p className="text-sm text-slate-400 dark:text-slate-500">
                Intenta con otros términos de búsqueda
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table hoverable>
                  <Table.Head>
                    <Table.HeadCell>ID Factura</Table.HeadCell>
                    <Table.HeadCell>Fecha</Table.HeadCell>
                    <Table.HeadCell>Descripción</Table.HeadCell>
                    <Table.HeadCell>Tipo</Table.HeadCell>
                    <Table.HeadCell>Método de Pago</Table.HeadCell>
                    <Table.HeadCell>Monto</Table.HeadCell>
                    <Table.HeadCell>Estado</Table.HeadCell>
                    <Table.HeadCell>
                      <span className="sr-only">Acciones</span>
                    </Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y">
                    {transactions.map((transaction) => (
                      <Table.Row
                        key={transaction.id}
                        className="bg-white dark:border-slate-700 dark:bg-slate-800"
                      >
                        <Table.Cell className="font-medium text-slate-900 dark:text-white">
                          {transaction.invoice?.id?.slice(0, 8) ?? 'N/A'}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">
                          {transaction.created_at
                            ? formatDate(transaction.created_at)
                            : 'N/A'}
                        </Table.Cell>
                        <Table.Cell className="max-w-xs truncate text-slate-600 dark:text-slate-400">
                          {transaction.description ?? 'Sin descripción'}
                        </Table.Cell>
                        <Table.Cell className="text-slate-600 dark:text-slate-400">
                          {transaction.transaction_type?.description ?? 'N/A'}
                        </Table.Cell>
                        <Table.Cell className="text-slate-600 dark:text-slate-400">
                          {transaction.payment_method?.description ?? 'N/A'}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-semibold text-slate-900 dark:text-white">
                          {formatCurrency(transaction.amount)}
                        </Table.Cell>
                        <Table.Cell>{getStatusBadge(transaction.status)}</Table.Cell>
                        <Table.Cell>
                          <div className="flex gap-2">
                            <Button
                              size="xs"
                              color="failure"
                              disabled={!canActOnTransaction(transaction)}
                              onClick={() => openCancelModal(transaction)}
                              aria-label="Cancelar transacción"
                              title="Cancelar transacción"
                            >
                              <FontAwesomeIcon icon={faBan} className="mr-1" aria-hidden="true" />
                              Cancelar
                            </Button>
                            <Button
                              size="xs"
                              color="warning"
                              disabled={!canActOnTransaction(transaction)}
                              onClick={() => openDevolutionModal(transaction)}
                              aria-label="Realizar devolución"
                              title="Realizar devolución"
                            >
                              <FontAwesomeIcon icon={faUndo} className="mr-1" aria-hidden="true" />
                              Devolver
                            </Button>
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>

              {/* Server-side pagination */}
              {totalPages > 1 && (
                <div className="mt-4 flex items-center justify-center">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    showIcons
                  />
                </div>
              )}
            </>
          )}
        </Card>

        {/* Modals — siblings of Card, inside container */}
        <NoRegisterModal show={showNoRegisterModal} context="cancel" />

        <CancelConfirmModal
          show={showCancelModal}
          onClose={() => setShowCancelModal(false)}
          onConfirm={handleCancelConfirm}
          transaction={selectedTransaction}
        />

        <DevolutionConfirmModal
          show={showDevolutionModal}
          onClose={() => setShowDevolutionModal(false)}
          onConfirm={handleDevolutionConfirm}
          transaction={selectedTransaction}
        />
      </div>
    </section>
  );
};

export default CancelTransactions;
