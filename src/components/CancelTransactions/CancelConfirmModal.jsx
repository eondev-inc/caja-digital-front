import { Modal, Button } from 'flowbite-react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { formatCurrency, formatDate } from '../../utils/formatters';

/**
 * Modal de confirmación para cancelar una transacción
 * @param {boolean} show - Muestra u oculta el modal
 * @param {function} onClose - Función para cerrar el modal
 * @param {function} onConfirm - Función para confirmar la cancelación
 * @param {object} transaction - Datos de la transacción a cancelar
 */
export default function CancelConfirmModal({ show, onClose, onConfirm, transaction }) {
  if (!transaction) return null;

  return (
    <Modal show={show} size="lg" onClose={onClose} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          {/* Warning Icon */}
          <div className="flex justify-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-error-100 dark:bg-error-900">
              <FontAwesomeIcon icon={faExclamationTriangle} className="size-8 text-error-600 dark:text-error-400" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-50">¿Cancelar esta transacción?</h3>
            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
              Esta acción es <span className="font-semibold">irreversible</span>. La transacción será marcada como cancelada.
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
                <p className="text-neutral-500 dark:text-neutral-400">Monto total</p>
                <p className="text-xl font-bold text-error-600 dark:text-error-400">{formatCurrency(transaction.amount)}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button color="gray" onClick={onClose}>
              Cancelar
            </Button>
            <Button color="failure" onClick={onConfirm}>
              Sí, cancelar transacción
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

CancelConfirmModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  transaction: PropTypes.object,
};
