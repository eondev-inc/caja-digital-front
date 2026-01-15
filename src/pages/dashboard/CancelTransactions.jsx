import { useState, useEffect } from 'react';
import { Card, TextInput, Button, Badge, Table, Alert, Spinner, Pagination } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTimesCircle, 
  faSearch, 
  faUndo, 
  faBan,
  faExclamationTriangle 
} from '@fortawesome/free-solid-svg-icons';
import { 
  listTransactionsByUser, 
  cancelTransaction, 
  devolutionTransaction 
} from '../../api';
import { useStore } from '../../app/store';
import CancelConfirmModal from '../../components/CancelTransactions/CancelConfirmModal';
import DevolutionConfirmModal from '../../components/CancelTransactions/DevolutionConfirmModal';

/**
 * Página de anulación de movimientos
 * Permite listar, buscar, cancelar y devolver transacciones
 * @author Copilot
 */
const CancelTransactions = () => {
  const { userInfo } = useStore();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });
  
  // Modales
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showDevolutionModal, setShowDevolutionModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  
  const itemsPerPage = 10;

  /**
   * Carga las transacciones de la entidad
   */
  const loadTransactions = async (page = 1, search = '') => {
    if (!userInfo?.entity_users[0]?.entities?.id) {
      showAlert('error', 'Entidad no identificada');
      return;
    }

    setLoading(true);
    try {
      const response = await listTransactionsByUser(userInfo?.entity_users[0]?.entities?.id, {
        page,
        limit: itemsPerPage,
        search: search.trim(),
      });

      console.log(response);

      // La respuesta es un array directo, no tiene estructura data/meta
      const transactionsList = Array.isArray(response) ? response : (response?.data || []);
      
      setTransactions(transactionsList);
      // Si no hay meta, calcular páginas basado en el límite
      setTotalPages(Math.ceil((transactionsList.length || 0) / itemsPerPage));
      setTotalItems(transactionsList.length || 0);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error al cargar transacciones:', error);
      showAlert('error', 'Error al cargar las transacciones');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Maneja la búsqueda de transacciones
   */
  const handleSearch = () => {
    setCurrentPage(1);
    loadTransactions(1, searchTerm);
  };

  /**
   * Maneja el cambio de página
   */
  const handlePageChange = (page) => {
    loadTransactions(page, searchTerm);
  };

  /**
   * Muestra alerta temporal
   */
  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
    setTimeout(() => {
      setAlert({ show: false, type: '', message: '' });
    }, 5000);
  };

  /**
   * Abre modal de cancelación
   */
  const openCancelModal = (transaction) => {
    setSelectedTransaction(transaction);
    setShowCancelModal(true);
  };

  /**
   * Abre modal de devolución
   */
  const openDevolutionModal = (transaction) => {
    setSelectedTransaction(transaction);
    setShowDevolutionModal(true);
  };

  /**
   * Confirma la cancelación de una transacción
   */
  const handleCancelConfirm = async () => {
    if (!selectedTransaction) return;

    try {
      await cancelTransaction(selectedTransaction.id);
      showAlert('success', 'Transacción cancelada exitosamente');
      setShowCancelModal(false);
      loadTransactions(currentPage, searchTerm);
    } catch (error) {
      console.error('Error al cancelar transacción:', error);
      showAlert('error', error?.response?.data?.message || 'Error al cancelar la transacción');
    }
  };

  /**
   * Confirma la devolución de una transacción
   */
  const handleDevolutionConfirm = async () => {
    if (!selectedTransaction) return;

    try {
      await devolutionTransaction(selectedTransaction.id);
      showAlert('success', 'Devolución realizada exitosamente');
      setShowDevolutionModal(false);
      loadTransactions(currentPage, searchTerm);
    } catch (error) {
      console.error('Error al realizar devolución:', error);
      showAlert('error', error?.response?.data?.message || 'Error al realizar la devolución');
    }
  };

  /**
   * Formatea el monto en pesos chilenos
   */
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    }).format(amount);
  };

  /**
   * Formatea la fecha
   */
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-CL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  /**
   * Obtiene el color del badge según el estado
   */
  const getStatusBadge = (status) => {
    // Normalizar el estado a minúsculas y manejar diferentes formatos
    const normalizedStatus = status?.toLowerCase() || '';
    
    const statusConfig = {
      completado: { color: 'success', label: 'Completada' },
      completed: { color: 'success', label: 'Completada' },
      cancelado: { color: 'failure', label: 'Cancelada' },
      cancelled: { color: 'failure', label: 'Cancelada' },
      devolucion: { color: 'warning', label: 'Devuelta' },
      devolution: { color: 'warning', label: 'Devuelta' },
      pendiente: { color: 'info', label: 'Pendiente' },
      pending: { color: 'info', label: 'Pendiente' },
    };

    const config = statusConfig[normalizedStatus] || { color: 'gray', label: status };
    return <Badge color={config.color}>{config.label}</Badge>;
  };

  /**
   * Verifica si una transacción puede ser anulada
   */
  const canCancelTransaction = (transaction) => {
    const normalizedStatus = transaction?.status?.toLowerCase() || '';
    return normalizedStatus === 'completado' || normalizedStatus === 'completed';
  };

  // Carga inicial
  useEffect(() => {
    loadTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex size-16 items-center justify-center rounded-lg bg-red-500 shadow-sm">
            <FontAwesomeIcon icon={faTimesCircle} className="size-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-800">Anulación de Movimientos</h2>
            <p className="text-sm text-slate-500">Gestión de cancelaciones y devoluciones</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-500">Total de movimientos</p>
          <p className="text-2xl font-bold text-slate-800">{totalItems}</p>
        </div>
      </div>

      {/* Alert */}
      {alert.show && (
        <div className="mb-4">
          <Alert color={alert.type === 'error' ? 'failure' : 'success'} onDismiss={() => setAlert({ show: false })}>
            <span className="font-medium">
              {alert.type === 'error' ? '¡Error!' : '¡Éxito!'}
            </span>{' '}
            {alert.message}
          </Alert>
        </div>
      )}

      {/* Search Bar */}
      <Card className="mb-6">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <FontAwesomeIcon icon={faSearch} className="size-4 text-gray-400" />
            </div>
            <TextInput
              className="pl-10"
              placeholder="Buscar por folio, descripción, monto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <Button color="primary" onClick={handleSearch} disabled={loading}>
            <FontAwesomeIcon icon={faSearch} className="mr-2" />
            Buscar
          </Button>
        </div>
      </Card>

      {/* Transactions Table */}
      <Card>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Spinner size="xl" />
            <span className="ml-3 text-lg text-slate-600">Cargando transacciones...</span>
          </div>
        ) : transactions.length === 0 ? (
          <div className="py-12 text-center">
            <FontAwesomeIcon icon={faExclamationTriangle} className="mb-4 size-12 text-gray-400" />
            <p className="text-lg text-slate-600">No se encontraron transacciones</p>
            <p className="text-sm text-slate-400">Intenta con otros términos de búsqueda</p>
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
                  <Table.HeadCell>Acciones</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {transactions.map((transaction) => (
                    <Table.Row key={transaction.id} className="bg-white">
                      <Table.Cell className="font-medium text-slate-900">
                        {transaction.invoice?.id?.slice(0, 8) || 'N/A'}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap text-sm text-slate-600">
                        {transaction.created_at ? formatDate(transaction.created_at) : 'N/A'}
                      </Table.Cell>
                      <Table.Cell className="max-w-xs truncate text-slate-600">
                        {transaction.description || 'Sin descripción'}
                      </Table.Cell>
                      <Table.Cell className="text-slate-600">
                        {transaction.transaction_type?.description || 'N/A'}
                      </Table.Cell>
                      <Table.Cell className="text-slate-600">
                        {transaction.payment_method?.description || 'N/A'}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap font-semibold text-slate-900">
                        {formatCurrency(transaction.amount)}
                      </Table.Cell>
                      <Table.Cell>
                        {getStatusBadge(transaction.status)}
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex gap-2">
                          <Button
                            size="xs"
                            color="failure"
                            disabled={!canCancelTransaction(transaction)}
                            onClick={() => openCancelModal(transaction)}
                            title="Cancelar transacción"
                          >
                            <FontAwesomeIcon icon={faBan} className="mr-1" />
                            Cancelar
                          </Button>
                          <Button
                            size="xs"
                            color="warning"
                            disabled={!canCancelTransaction(transaction)}
                            onClick={() => openDevolutionModal(transaction)}
                            title="Realizar devolución"
                          >
                            <FontAwesomeIcon icon={faUndo} className="mr-1" />
                            Devolver
                          </Button>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>

            {/* Pagination */}
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

      {/* Modals */}
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
  );
};

export default CancelTransactions;
