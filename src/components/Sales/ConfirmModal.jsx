import { Modal, Button } from 'flowbite-react';
import PropTypes from 'prop-types';

export default function ConfirmModal({ open, onClose, onConfirm, dataPreview }) {
  const { invoice = {}, payment_method_label, total } = dataPreview || {};

  return (
    <Modal show={open} size="lg" onClose={onClose} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-4">
          <h3 className="font-heading text-lg font-semibold text-neutral-900 dark:text-white">Confirmar emisión de comprobante</h3>
          <div className="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-600 dark:bg-neutral-700">
            <div className="grid grid-cols-2 gap-4 text-sm text-neutral-700 dark:text-neutral-300">
              <div>
                <p className="font-medium">Cliente</p>
                <p>{invoice?.custumer_name} ({invoice?.custumer_nid})</p>
              </div>
              <div>
                <p className="font-medium">Método de pago</p>
                <p>{payment_method_label}</p>
              </div>
              <div>
                <p className="font-medium">Fecha</p>
                <p>{invoice?.date ? new Date(invoice.date).toLocaleDateString('es-CL') : '-'}</p>
              </div>
              <div>
                <p className="font-medium">Total</p>
                <p className="font-semibold">${(total ?? 0).toLocaleString('es-CL')}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button color="gray" onClick={onClose} className="cursor-pointer focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-600">Cancelar</Button>
            <Button color="success" onClick={onConfirm} className="cursor-pointer focus:ring-2 focus:ring-success-300 dark:focus:ring-success-700">Confirmar y generar</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

ConfirmModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  dataPreview: PropTypes.object,
};
