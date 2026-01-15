import { Modal, Button } from 'flowbite-react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo } from '@fortawesome/free-solid-svg-icons';

/**
 * Modal de confirmación para realizar una devolución de transacción
 * @param {boolean} show - Muestra u oculta el modal
 * @param {function} onClose - Función para cerrar el modal
 * @param {function} onConfirm - Función para confirmar la devolución
 * @param {object} transaction - Datos de la transacción a devolver
 * @author Copilot
 */
export default function DevolutionConfirmModal({ show, onClose, onConfirm, transaction }) {
  if (!transaction) return null;

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

  return (
    <Modal show={show} size="lg" onClose={onClose} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          {/* Warning Icon */}
          <div className="flex justify-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-yellow-100">
              <FontAwesomeIcon icon={faUndo} className="size-8 text-yellow-600" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-slate-800">¿Realizar devolución?</h3>
            <p className="mt-2 text-sm text-slate-500">
              Se realizará la devolución de esta transacción. El monto será devuelto al cliente.
            </p>
          </div>

          {/* Transaction Details */}
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <h4 className="mb-3 text-sm font-semibold text-slate-700">Detalles de la transacción</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-slate-500">ID Factura</p>
                <p className="font-medium text-slate-900">{transaction.invoice?.id?.slice(0, 8) || 'N/A'}</p>
              </div>
              <div>
                <p className="text-slate-500">Fecha</p>
                <p className="font-medium text-slate-900">{transaction.created_at ? formatDate(transaction.created_at) : 'N/A'}</p>
              </div>
              <div>
                <p className="text-slate-500">Tipo</p>
                <p className="font-medium text-slate-900">{transaction.transaction_type?.description || 'N/A'}</p>
              </div>
              <div>
                <p className="text-slate-500">Método de pago</p>
                <p className="font-medium text-slate-900">{transaction.payment_method?.description || 'N/A'}</p>
              </div>
              <div className="col-span-2">
                <p className="text-slate-500">Descripción</p>
                <p className="font-medium text-slate-900">{transaction.description || 'Sin descripción'}</p>
              </div>
              <div className="col-span-2 border-t border-gray-300 pt-3">
                <p className="text-slate-500">Monto a devolver</p>
                <p className="text-xl font-bold text-yellow-600">{formatCurrency(transaction.amount)}</p>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
            <p className="text-sm text-yellow-800">
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
