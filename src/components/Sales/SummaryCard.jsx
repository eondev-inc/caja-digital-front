import { TextInput } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

export default function SummaryCard({ items, iva = 0.19 }) {
  const subtotal = items.reduce((sum, item) => sum + (item.subtotal || 0), 0);
  const tax = subtotal * iva;
  const total = Math.round(subtotal + tax);

  return (
    <div className="space-y-4 rounded-lg border border-blue-200 bg-blue-50 p-6">
      <h3 className="flex items-center gap-2 text-lg font-semibold text-blue-800">
        <FontAwesomeIcon icon={faCalculator} />
        Resumen de Costos
      </h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between text-secondary-700">
          <span>Subtotal:</span>
          <span className="font-medium">${subtotal.toLocaleString('es-CL')}</span>
        </div>
        <div className="flex items-center justify-between text-secondary-700">
          <div className="flex items-center gap-2">
            <span>Impuesto</span>
            <TextInput type="number" className="w-16 text-center" placeholder="19" value={iva * 100} disabled />
            <span>%</span>
          </div>
          <span className="font-medium">${tax.toLocaleString('es-CL')}</span>
        </div>
        <div className="border-t border-blue-200 pt-3">
          <div className="flex items-center justify-between text-xl font-bold text-blue-800">
            <span>Total a Pagar:</span>
            <span>${total.toLocaleString('es-CL')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

SummaryCard.propTypes = {
  items: PropTypes.array.isRequired,
  iva: PropTypes.number,
};
