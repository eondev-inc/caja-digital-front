import { TextInput, Textarea } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillWave, faCreditCard, faTicket } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

/**
 * Devuelve el ícono y color asociados a un método de pago según su method_name.
 * @param {string} methodName
 * @returns {{ icon: object, color: string }}
 */
const getMethodStyle = (methodName) => {
  const name = (methodName || '').toUpperCase();
  if (name === 'EFECTIVO') {
    return { icon: faMoneyBillWave, color: 'text-primary-600 dark:text-primary-400' };
  }
  if (name.includes('BONO')) {
    return { icon: faTicket, color: 'text-amber-600 dark:text-amber-400' };
  }
  // Tarjetas (débito, crédito, u otro)
  return { icon: faCreditCard, color: 'text-secondary-600 dark:text-secondary-400' };
};

/**
 * Sección de ingreso de montos reales contados en caja.
 * Genera inputs dinámicamente a partir de los métodos de pago activos.
 *
 * @param {Array}    paymentMethods   - Lista de métodos activos [{id, method_name, description}]
 * @param {object}   enteredAmounts   - Montos ingresados: { [description]: number }
 * @param {function} setEnteredAmounts - Setter del objeto de montos
 * @param {string}   notes            - Notas opcionales del cierre
 * @param {object|null} differences   - Diferencias calculadas
 * @param {function} setNotes         - Setter notas
 * @param {function} formatCurrency   - Formateador CLP
 */
export default function AmountInputCard({
  paymentMethods,
  enteredAmounts,
  setEnteredAmounts,
  notes,
  differences,
  setNotes,
  formatCurrency,
}) {
  const handleChange = (description, value) => {
    setEnteredAmounts((prev) => ({ ...prev, [description]: value }));
  };

  // Determinar columnas según cantidad de métodos (máx. 3 por fila)
  const colClass =
    paymentMethods.length <= 2
      ? `sm:grid-cols-${paymentMethods.length}`
      : 'sm:grid-cols-3';

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-base font-semibold text-gray-800 dark:text-white">
          Ingrese los montos contados
        </h2>
        <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
          Ingrese el dinero físico y vouchers contados al cerrar la caja.
        </p>
      </div>

      <div className={`grid grid-cols-1 gap-4 ${colClass}`}>
        {paymentMethods.map((method) => {
          const desc = method.description;
          const { icon, color } = getMethodStyle(method.method_name);
          const inputId = `amount-${method.id}`;
          const value = enteredAmounts[desc] ?? 0;
          const methodDiff = differences?.byMethod?.[desc];
          const expected = methodDiff?.expected ?? 0;
          const diff = methodDiff?.diff ?? 0;

          return (
            <div key={method.id}>
              <label
                htmlFor={inputId}
                className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                <FontAwesomeIcon icon={icon} className={color} aria-hidden="true" />
                {desc}
              </label>
              <TextInput
                id={inputId}
                type="number"
                min="0"
                step="1"
                value={value}
                onChange={(e) => handleChange(desc, e.target.value)}
                placeholder="0"
                className="w-full"
              />
              {differences !== null && (
                <p className={`mt-1 text-xs ${
                  diff === 0
                    ? 'text-gray-500 dark:text-gray-400'
                    : 'font-medium text-red-600 dark:text-red-400'
                }`}>
                  Esperado: {formatCurrency(expected)}
                  {diff !== 0 && (
                    <span className="ml-1.5">
                      ({diff > 0 ? '+' : ''}{formatCurrency(diff)})
                    </span>
                  )}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Notas */}
      <div>
        <label
          htmlFor="close-notes"
          className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Notas{' '}
          <span className="font-normal text-neutral-400">(Opcional)</span>
        </label>
        <Textarea
          id="close-notes"
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Agregue comentarios sobre el cierre de caja..."
          className="w-full"
        />
      </div>
    </div>
  );
}

AmountInputCard.propTypes = {
  paymentMethods: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    method_name: PropTypes.string,
    description: PropTypes.string.isRequired,
  })).isRequired,
  enteredAmounts: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ).isRequired,
  setEnteredAmounts: PropTypes.func.isRequired,
  notes: PropTypes.string.isRequired,
  differences: PropTypes.object,
  setNotes: PropTypes.func.isRequired,
  formatCurrency: PropTypes.func.isRequired,
};
