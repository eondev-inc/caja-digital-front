import { Card, TextInput, Textarea } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillWave, faCreditCard, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

/**
 * Tarjeta de ingreso de montos reales contados en caja.
 * Calcula en tiempo real las diferencias vs. lo esperado.
 *
 * @param {number} cashAmount - Monto efectivo ingresado
 * @param {number} debitAmount - Monto débito ingresado
 * @param {number} creditAmount - Monto crédito ingresado
 * @param {string} notes - Notas opcionales del cierre
 * @param {object|null} differences - Objeto con diferencias calculadas
 * @param {number} totalEntered - Suma de los tres montos
 * @param {boolean} hasDiscrepancies - Si existe diferencia total != 0
 * @param {function} setCashAmount - Setter efectivo
 * @param {function} setDebitAmount - Setter débito
 * @param {function} setCreditAmount - Setter crédito
 * @param {function} setNotes - Setter notas
 * @param {function} formatCurrency - Formateador CLP
 */
export default function AmountInputCard({
  cashAmount,
  debitAmount,
  creditAmount,
  notes,
  differences,
  totalEntered,
  hasDiscrepancies,
  setCashAmount,
  setDebitAmount,
  setCreditAmount,
  setNotes,
  formatCurrency,
}) {
  return (
    <Card className="border border-gray-200 bg-yellow-50 dark:border-slate-600 dark:bg-slate-700">
      <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
        Ingrese los Montos Contados
      </h2>
      <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Ingrese los montos reales que tiene en caja. El sistema calculará automáticamente las diferencias.
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Efectivo */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            <FontAwesomeIcon icon={faMoneyBillWave} className="mr-2 text-primary-600 dark:text-primary-400" aria-hidden="true" />
            Efectivo
          </label>
          <TextInput
            type="number"
            min="0"
            step="1"
            value={cashAmount}
            onChange={(e) => setCashAmount(e.target.value)}
            placeholder="0"
            className="w-full"
          />
          {differences && (
            <p className={`mt-1 text-sm ${
              differences.cash === 0
                ? 'text-primary-600 dark:text-primary-400'
                : 'font-medium text-red-600 dark:text-red-400'
            }`}>
              Esperado: {formatCurrency(differences.cashExpected)}
              {differences.cash !== 0 && (
                <span className="ml-2">
                  ({differences.cash > 0 ? '+' : ''}{formatCurrency(differences.cash)})
                </span>
              )}
            </p>
          )}
        </div>

        {/* Débito */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            <FontAwesomeIcon icon={faCreditCard} className="mr-2 text-secondary-600 dark:text-secondary-400" aria-hidden="true" />
            Tarjeta de Débito
          </label>
          <TextInput
            type="number"
            min="0"
            step="1"
            value={debitAmount}
            onChange={(e) => setDebitAmount(e.target.value)}
            placeholder="0"
            className="w-full"
          />
          {differences && (
            <p className={`mt-1 text-sm ${
              differences.debit === 0
                ? 'text-primary-600 dark:text-primary-400'
                : 'font-medium text-red-600 dark:text-red-400'
            }`}>
              Esperado: {formatCurrency(differences.debitExpected)}
              {differences.debit !== 0 && (
                <span className="ml-2">
                  ({differences.debit > 0 ? '+' : ''}{formatCurrency(differences.debit)})
                </span>
              )}
            </p>
          )}
        </div>

        {/* Crédito */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            <FontAwesomeIcon icon={faCreditCard} className="mr-2 text-purple-600 dark:text-purple-400" aria-hidden="true" />
            Tarjeta de Crédito
          </label>
          <TextInput
            type="number"
            min="0"
            step="1"
            value={creditAmount}
            onChange={(e) => setCreditAmount(e.target.value)}
            placeholder="0"
            className="w-full"
          />
          {differences && (
            <p className={`mt-1 text-sm ${
              differences.credit === 0
                ? 'text-primary-600 dark:text-primary-400'
                : 'font-medium text-red-600 dark:text-red-400'
            }`}>
              Esperado: {formatCurrency(differences.creditExpected)}
              {differences.credit !== 0 && (
                <span className="ml-2">
                  ({differences.credit > 0 ? '+' : ''}{formatCurrency(differences.credit)})
                </span>
              )}
            </p>
          )}
        </div>
      </div>

      {/* Total y Diferencia */}
      <div className="mt-6 border-t pt-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-white p-4 dark:bg-slate-800">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Ingresado</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">
              {formatCurrency(totalEntered)}
            </p>
          </div>
          <div className={`rounded-lg p-4 ${
            hasDiscrepancies ? 'dark:bg-red-900/20 bg-red-100' : 'dark:bg-primary-900/20 bg-primary-100'
          }`}>
            <p className="text-sm text-gray-600 dark:text-gray-400">Diferencia</p>
            <p className={`text-2xl font-bold ${
              hasDiscrepancies ? 'text-red-700 dark:text-red-400' : 'text-primary-700 dark:text-primary-400'
            }`}>
              {differences?.total > 0 ? '+' : ''}{formatCurrency(differences?.total || 0)}
            </p>
            {hasDiscrepancies && (
              <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
                <FontAwesomeIcon icon={faExclamationTriangle} aria-hidden="true" />
                Hay diferencias en los montos
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Notas */}
      <div className="mt-4">
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Notas (opcional)
        </label>
        <Textarea
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Agregue comentarios sobre el cierre de caja..."
          className="w-full"
        />
      </div>
    </Card>
  );
}

AmountInputCard.propTypes = {
  cashAmount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  debitAmount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  creditAmount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  notes: PropTypes.string.isRequired,
  differences: PropTypes.object,
  totalEntered: PropTypes.number.isRequired,
  hasDiscrepancies: PropTypes.bool.isRequired,
  setCashAmount: PropTypes.func.isRequired,
  setDebitAmount: PropTypes.func.isRequired,
  setCreditAmount: PropTypes.func.isRequired,
  setNotes: PropTypes.func.isRequired,
  formatCurrency: PropTypes.func.isRequired,
};
