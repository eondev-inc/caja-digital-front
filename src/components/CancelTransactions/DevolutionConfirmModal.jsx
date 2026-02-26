import { Modal, Button } from 'flowbite-react';
import PropTypes from 'prop-types';
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
export default function DevolutionConfirmModal({ show, onClose, onConfirm, transaction }) {
  if (!transaction) return null;

  return (
    <Modal show={show} size="lg" onClose={onClose} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          {/* Warning Icon */}
          <div className="flex justify-center">
            <div className="dark:bg-yellow-900/30 flex size-16 items-center justify-center rounded-full bg-yellow-100">
              <FontAwesomeIcon icon={faUndo} className="size-8 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">¿Realizar devolución?</h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Se realizará la devolución de esta transacción. El monto será devuelto al cliente.
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
                <p className="text-slate-500 dark:text-slate-400">Monto a devolver</p>
                <p className="text-xl font-bold text-yellow-600 dark:text-yellow-400">{formatCurrency(transaction.amount)}</p>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="dark:bg-yellow-900/20 rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800">
            <p className="text-sm text-yellow-800 dark:text-yellow-400">
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

DevolutionConfirmModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  transaction: PropTypes.object,
};
