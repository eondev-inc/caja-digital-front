import { Label, TextInput } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons';

export default function SalesHeader() {
  return (
    <div className="mb-8 flex items-center justify-between rounded-t-lg border border-neutral-200 bg-neutral-50 p-6">
      <div className="flex items-center gap-4">
        <div className="flex size-16 items-center justify-center rounded-lg bg-primary-500 shadow-sm">
          <FontAwesomeIcon icon={faFileInvoice} className="size-8 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-secondary-800">Nueva Venta</h2>
          <p className="text-sm text-secondary-500">Sistema de Facturación Médica</p>
        </div>
      </div>
      <div className="flex items-center gap-3 rounded-lg border border-neutral-200 bg-white px-4 py-2 shadow-sm">
        <Label htmlFor="invoice_number" className="text-sm font-medium text-secondary-600">Factura #</Label>
  <TextInput id="invoice_number" className="w-20 text-center tracking-wide" value="-" disabled />
      </div>
    </div>
  );
}
