import { TextInput, Textarea } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMoneyBillWave,
  faCreditCard,
  faTicket,
} from '@fortawesome/free-solid-svg-icons';
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
  return { icon: faCreditCard, color: 'text-secondary-600 dark:text-secondary-400' };
};

/**
 * Sección de ingreso de montos reales contados en caja.
 * Genera inputs dinámicamente a partir de los métodos de pago activos.
 * Usa RHF register para validación con Zod.
 *
 * @param {Array}    paymentMethods   - Lista de métodos activos [{id, method_name, description}]
 * @param {object}   watchedAmounts   - Montos ingresados (from RHF watch): { [description]: number }
 * @param {function} register         - RHF register function
 * @param {object}   errors           - RHF formState.errors
 * @param {string}   watchedNotes     - Notas del cierre (from RHF watch)
 * @param {object|null} differences   - Diferencias calculadas
 * @param {function} formatCurrency   - Formateador CLP
 */
export default function AmountInputCard({
  paymentMethods,
  watchedAmounts,
  register,
  errors,
  watchedNotes,
  differences,
  formatCurrency,
}) {
  const colClass =
    paymentMethods.length <= 2
      ? `sm:grid-cols-${paymentMethods.length}`
      : 'sm:grid-cols-3';

  const enteredAmountsErrors = errors?.enteredAmounts;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-base font-semibold text-neutral-800 dark:text-neutral-50">
          Ingrese los montos contados
        </h2>
        <p className="mt-0.5 text-sm text-neutral-500 dark:text-neutral-400">
          Ingrese el dinero físico y vouchers contados al cerrar la caja.
        </p>
      </div>

      <div className={`grid grid-cols-1 gap-4 ${colClass}`}>
        {paymentMethods.map((method) => {
          const desc = method.description;
          const { icon, color } = getMethodStyle(method.method_name);
          const inputId = `amount-${method.id}`;
          const value = watchedAmounts?.[desc] ?? 0;
          const methodDiff = differences?.byMethod?.[desc];
          const expected = methodDiff?.expected ?? 0;
          const diff = methodDiff?.diff ?? 0;
          const fieldError = enteredAmountsErrors?.[desc];

          return (
            <div key={method.id}>
              <label
                htmlFor={inputId}
                className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-neutral-700 dark:text-neutral-300"
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
                placeholder="0"
                className="w-full"
                color={fieldError ? 'failure' : 'gray'}
                aria-describedby={fieldError ? `${inputId}-error` : undefined}
                aria-invalid={!!fieldError}
                {...register(`enteredAmounts.${desc}`)}
              />
              {fieldError && (
                <p
                  id={`${inputId}-error`}
                  className="mx-1 mt-1 text-left text-sm text-error-500"
                  role="alert"
                >
                  {fieldError.message}
                </p>
              )}
              {differences !== null && !fieldError && (
                <p
                  className={`mt-1 text-xs ${
                    diff === 0
                      ? 'text-neutral-500 dark:text-neutral-400'
                      : 'font-medium text-error-600 dark:text-error-400'
                  }`}
                >
                  Esperado: {formatCurrency(expected)}
                  {diff !== 0 && (
                    <span className="ml-1.5">
                      ({diff > 0 ? '+' : ''}
                      {formatCurrency(diff)})
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
          className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
        >
          Notas <span className="font-normal text-neutral-400">(Opcional)</span>
        </label>
        <Textarea
          id="close-notes"
          rows={3}
          value={watchedNotes || ''}
          placeholder="Agregue comentarios sobre el cierre de caja..."
          className="w-full"
          color={errors?.notes ? 'failure' : 'gray'}
          aria-describedby={errors?.notes ? 'close-notes-error' : undefined}
          aria-invalid={!!errors?.notes}
          {...register('notes')}
        />
        {errors?.notes && (
          <p id="close-notes-error" className="mx-1 mt-1 text-left text-sm text-error-500" role="alert">
            {errors.notes.message}
          </p>
        )}
      </div>
    </div>
  );
}

AmountInputCard.propTypes = {
  paymentMethods: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      method_name: PropTypes.string,
      description: PropTypes.string.isRequired,
    }),
  ).isRequired,
  watchedAmounts: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ),
  register: PropTypes.func.isRequired,
  errors: PropTypes.object,
  watchedNotes: PropTypes.string,
  differences: PropTypes.object,
  formatCurrency: PropTypes.func.isRequired,
};
