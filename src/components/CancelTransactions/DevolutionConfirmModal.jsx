import { Modal, Button } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo } from '@fortawesome/free-solid-svg-icons';
import { formatCurrency, formatDate } from '../../utils/formatters';

/**
 * Modal de confirmación para realizar una devolución de transacción
 * @param {boolean} show - Muestra u oculta el modal
 * @param {function} onClose - Función para cerrar el modal
 * @param {function} onConfirm - Función para confirmar la devolución
 * @param {object} transaction - Datos de la transacción a devolver
 */
/* eslint-disable react/prop-types */
export default function DevolutionConfirmModal({ show, onClose, onConfirm, transaction }) {
  if (!transaction) return null;

  return (
    <Modal show={show} size="lg" onClose={onClose} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          {/* Warning Icon */}
          <div className="flex justify-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-warning-100 dark:bg-warning-900">
              <FontAwesomeIcon icon={faUndo} className="size-8 text-warning-600 dark:text-warning-400" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-50">¿Realizar devolución?</h3>
            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
              Se realizará la devolución de esta transacción. El monto será devuelto al cliente.
            </p>
          </div>

          {/* Transaction Details */}
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-600 dark:bg-neutral-700">
            <h4 className="mb-3 text-sm font-semibold text-neutral-700 dark:text-neutral-300">Detalles de la transacción</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-neutral-500 dark:text-neutral-400">ID Factura</p>
                <p className="font-medium text-neutral-900 dark:text-neutral-50">{transaction.invoice?.id?.slice(0, 8) || 'N/A'}</p>
              </div>
              <div>
                <p className="text-neutral-500 dark:text-neutral-400">Fecha</p>
                <p className="font-medium text-neutral-900 dark:text-neutral-50">{transaction.created_at ? formatDate(transaction.created_at) : 'N/A'}</p>
              </div>
              <div>
                <p className="text-neutral-500 dark:text-neutral-400">Tipo</p>
                <p className="font-medium text-neutral-900 dark:text-neutral-50">{transaction.transaction_type?.description || 'N/A'}</p>
              </div>
              <div>
                <p className="text-neutral-500 dark:text-neutral-400">Método de pago</p>
                <p className="font-medium text-neutral-900 dark:text-neutral-50">{transaction.payment_method?.description || 'N/A'}</p>
              </div>
              <div className="col-span-2">
                <p className="text-neutral-500 dark:text-neutral-400">Descripción</p>
                <p className="font-medium text-neutral-900 dark:text-neutral-50">{transaction.description || 'Sin descripción'}</p>
              </div>
              <div className="col-span-2 border-t border-neutral-300 pt-3 dark:border-neutral-600">
                <p className="text-neutral-500 dark:text-neutral-400">Monto a devolver</p>
                <p className="text-xl font-bold text-warning-600 dark:text-warning-400">{formatCurrency(transaction.amount)}</p>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="rounded-lg border border-warning-200 bg-warning-50 p-4 dark:border-warning-800 dark:bg-warning-900">
            <p className="text-sm text-warning-800 dark:text-warning-400">
              <span className="font-semibold">Nota:</span> Esta acción generará un registro de devolución 
              y actualizará el estado de la transacción.
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button color="gray" onClick={onClose}>
              Cancelar
            </Button>
            <Button color="warning" onClick={onConfirm}>
              Sí, realizar devolución
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
