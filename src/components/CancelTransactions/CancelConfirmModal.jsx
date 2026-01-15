import { Modal, Button } from 'flowbite-react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

/**
 * Modal de confirmación para cancelar una transacción
 * @param {boolean} show - Muestra u oculta el modal
 * @param {function} onClose - Función para cerrar el modal
 * @param {function} onConfirm - Función para confirmar la cancelación
 * @param {object} transaction - Datos de la transacción a cancelar
 * @author Copilot
 */
export default function CancelConfirmModal({ show, onClose, onConfirm, transaction }) {
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
            <div className="flex size-16 items-center justify-center rounded-full bg-red-100">
              <FontAwesomeIcon icon={faExclamationTriangle} className="size-8 text-red-600" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-slate-800">¿Cancelar esta transacción?</h3>
            <p className="mt-2 text-sm text-slate-500">
              Esta acción es <span className="font-semibold">irreversible</span>. La transacción será marcada como cancelada.
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
                <p className="text-slate-500">Monto total</p>
                <p className="text-xl font-bold text-red-600">{formatCurrency(transaction.amount)}</p>
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
