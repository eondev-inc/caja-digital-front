import PropTypes from 'prop-types';
import { Badge, Table, Pagination } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUndo,
  faBan,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import { Button } from 'flowbite-react';
import { formatCurrency, formatDate } from '../../../utils/formatters';
import Skeleton from '../../../components/Skeleton/Skeleton';

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
 * Returns true only for COMPLETADO transactions (cancellable/returnable).
 */
const canActOnTransaction = (transaction) =>
  transaction?.status?.toLowerCase() === 'completado';

export const CancelList = ({
  transactions,
  loading,
  currentPage,
  totalPages,
  onPageChange,
  onCancel,
  onDevolution,
}) => {
  if (loading) {
    return (
      <div className="space-y-3 py-8">
        <Skeleton variant="text" lines={1} className="w-1/4" />
        <Skeleton variant="rectangular" height="2rem" />
        <Skeleton variant="rectangular" height="2rem" />
        <Skeleton variant="rectangular" height="2rem" />
        <Skeleton variant="rectangular" height="2rem" />
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="py-16 text-center">
        <FontAwesomeIcon
          icon={faExclamationTriangle}
          className="mb-4 size-12 text-neutral-400 dark:text-neutral-500"
          aria-hidden="true"
        />
        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          No se encontraron transacciones
        </p>
        <p className="text-sm text-neutral-400 dark:text-neutral-500">
          Intenta con otros términos de búsqueda
        </p>
      </div>
    );
  }

  return (
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
                className="bg-white dark:border-neutral-700 dark:bg-neutral-800"
              >
                <Table.Cell className="font-medium text-neutral-900 dark:text-neutral-50">
                  {transaction.invoice?.id?.slice(0, 8) ?? 'N/A'}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap text-sm text-neutral-600 dark:text-neutral-400">
                  {transaction.created_at
                    ? formatDate(transaction.created_at)
                    : 'N/A'}
                </Table.Cell>
                <Table.Cell className="max-w-xs truncate text-neutral-600 dark:text-neutral-400">
                  {transaction.description ?? 'Sin descripción'}
                </Table.Cell>
                <Table.Cell className="text-neutral-600 dark:text-neutral-400">
                  {transaction.transaction_type?.description ?? 'N/A'}
                </Table.Cell>
                <Table.Cell className="text-neutral-600 dark:text-neutral-400">
                  {transaction.payment_method?.description ?? 'N/A'}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-semibold text-neutral-900 dark:text-neutral-50">
                  {formatCurrency(transaction.amount)}
                </Table.Cell>
                <Table.Cell>{getStatusBadge(transaction.status)}</Table.Cell>
                <Table.Cell>
                  <div className="flex gap-2">
                    <Button
                      size="xs"
                      color="failure"
                      disabled={!canActOnTransaction(transaction)}
                      onClick={() => onCancel(transaction)}
                      aria-label="Cancelar transacción"
                      title="Cancelar transacción"
                    >
                      <FontAwesomeIcon
                        icon={faBan}
                        className="mr-1"
                        aria-hidden="true"
                      />
                      Cancelar
                    </Button>
                    <Button
                      size="xs"
                      color="warning"
                      disabled={!canActOnTransaction(transaction)}
                      onClick={() => onDevolution(transaction)}
                      aria-label="Realizar devolución"
                      title="Realizar devolución"
                    >
                      <FontAwesomeIcon
                        icon={faUndo}
                        className="mr-1"
                        aria-hidden="true"
                      />
                      Devolver
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            showIcons
          />
        </div>
      )}
    </>
  );
};

CancelList.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDevolution: PropTypes.func.isRequired,
};
