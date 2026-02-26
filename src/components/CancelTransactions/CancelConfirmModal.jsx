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
            <div className="dark:bg-red-900/30 flex size-16 items-center justify-center rounded-full bg-red-100">
              <FontAwesomeIcon icon={faExclamationTriangle} className="size-8 text-red-600 dark:text-red-400" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">¿Cancelar esta transacción?</h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Esta acción es <span className="font-semibold">irreversible</span>. La transacción será marcada como cancelada.
            </p>
          </div>

          {/* Transaction Details */}
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-slate-600 dark:bg-slate-700">
            <h4 className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-300">Detalles de la transacción</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-slate-500 dark:text-slate-400">ID Factura</p>
                <p className="font-medium text-slate-900 dark:text-white">{transaction.invoice?.id?.slice(0, 8) || 'N/A'}</p>
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400">Fecha</p>
                <p className="font-medium text-slate-900 dark:text-white">{transaction.created_at ? formatDate(transaction.created_at) : 'N/A'}</p>
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400">Tipo</p>
                <p className="font-medium text-slate-900 dark:text-white">{transaction.transaction_type?.description || 'N/A'}</p>
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400">Método de pago</p>
                <p className="font-medium text-slate-900 dark:text-white">{transaction.payment_method?.description || 'N/A'}</p>
              </div>
              <div className="col-span-2">
                <p className="text-slate-500 dark:text-slate-400">Descripción</p>
                <p className="font-medium text-slate-900 dark:text-white">{transaction.description || 'Sin descripción'}</p>
              </div>
              <div className="col-span-2 border-t border-gray-300 pt-3 dark:border-slate-600">
                <p className="text-slate-500 dark:text-slate-400">Monto total</p>
                <p className="text-xl font-bold text-red-600 dark:text-red-400">{formatCurrency(transaction.amount)}</p>
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
