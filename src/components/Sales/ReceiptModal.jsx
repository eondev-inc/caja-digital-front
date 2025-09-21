import { Modal, Button } from 'flowbite-react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint, faFileInvoice } from '@fortawesome/free-solid-svg-icons';

function formatCLP(n) {
  return (n ?? 0).toLocaleString('es-CL');
}

export default function ReceiptModal({ open, onClose, data }) {
  const { invoice = {}, items = [], subtotal = 0, tax = 0, total = 0, payment_method_label, prevision_label, folio } = data || {};

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal show={open} size="6xl" onClose={onClose} popup>
      <Modal.Header className="print:hidden" />
      <Modal.Body>
        {/* Controles visibles solo en pantalla */}
        <div className="mb-4 flex items-center justify-between print:hidden">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-secondary-800">
            <FontAwesomeIcon icon={faFileInvoice} />
            Comprobante de Venta
          </h3>
          <div className="flex gap-2">
            <Button color="light" onClick={onClose}>Cerrar</Button>
            <Button color="green" onClick={handlePrint}>
              <FontAwesomeIcon icon={faPrint} className="mr-2" /> Imprimir
            </Button>
          </div>
        </div>

        {/* Contenido del comprobante - imprimible */}
        <div className="rounded-lg border border-neutral-200 bg-white p-6 text-sm text-secondary-700 print:border-0 print:p-0">
          <div className="mb-6 grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-secondary-500">Paciente</p>
              <p className="text-base font-semibold text-secondary-800">{invoice?.custumer_name || '-'}</p>
              <p>RUT: {invoice?.custumer_nid || '-'}</p>
              <p>Previsión: {prevision_label || '-'}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-secondary-500">Fecha</p>
              <p className="font-medium">{invoice?.date ? new Date(invoice.date).toLocaleDateString('es-CL') : '-'}</p>
              <p className="text-xs text-secondary-500">Método de Pago</p>
              <p className="font-medium">{payment_method_label || '-'}</p>
              {folio && (
                <p>Folio: <span className="font-medium">{folio}</span></p>
              )}
            </div>
          </div>

          <div className="mb-4 overflow-hidden rounded-md border border-neutral-200">
            <div className="grid grid-cols-12 bg-neutral-50 p-3 font-medium text-secondary-700">
              <div className="col-span-7">Descripción</div>
              <div className="col-span-2 text-center">Cantidad</div>
              <div className="col-span-3 text-right">Precio</div>
            </div>
            {items.map((it, idx) => (
              <div key={idx} className="grid grid-cols-12 border-t p-3">
                <div className="col-span-7">{it.description}</div>
                <div className="col-span-2 text-center">{it.quantity}</div>
                <div className="col-span-3 text-right">${formatCLP(it.total_price)}</div>
              </div>
            ))}
          </div>

          <div className="ml-auto w-full max-w-md space-y-2">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span className="font-medium">${formatCLP(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>IVA (19%)</span>
              <span className="font-medium">${formatCLP(tax)}</span>
            </div>
            <div className="border-t border-neutral-200 pt-2">
              <div className="flex items-center justify-between text-lg font-bold text-secondary-800">
                <span>Total</span>
                <span>${formatCLP(total)}</span>
              </div>
            </div>
          </div>

          {invoice?.notes && (
            <div className="mt-6">
              <p className="mb-1 text-xs text-secondary-500">Observaciones</p>
              <p className="whitespace-pre-wrap">{invoice.notes}</p>
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}

ReceiptModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.object,
};
