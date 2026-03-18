import PropTypes from 'prop-types';

/**
 * Muestra el resumen compacto de cuadratura: 3 tiles de totales y una tabla
 * comparativa Esperado / Ingresado / Diferencia por método de pago (dinámico).
 *
 * @param {object} calculationData - Datos de cuadratura del backend
 * @param {Array}  paymentMethods  - Lista de métodos de pago activos [{id, description, ...}]
 * @param {object} enteredAmounts  - Montos ingresados indexados por description: { 'Efectivo': 0, ... }
 * @param {number} totalEntered    - Suma de todos los montos ingresados
 * @param {object|null} differences - Diferencias calculadas { byMethod, totalExpected, total }
 * @param {boolean} hasDiscrepancies - Si existe diferencia total != 0
 * @param {function} formatCurrency  - Función de formato CLP
 */
export default function ReconciliationSummaryCard({
  calculationData,
  paymentMethods,
  enteredAmounts,
  totalEntered,
  differences,
  hasDiscrepancies,
  formatCurrency,
}) {
  return (
    <div className="space-y-4">
      {/* Tiles de resumen general */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="dark:bg-secondary-900/20 rounded-lg bg-secondary-50 p-3">
          <p className="text-xs text-gray-500 dark:text-gray-400">Monto Inicial</p>
          <p className="mt-0.5 text-xl font-bold text-secondary-700 dark:text-secondary-400">
            {formatCurrency(calculationData.initialAmount)}
          </p>
        </div>
        <div className="dark:bg-primary-900/20 rounded-lg bg-primary-50 p-3">
          <p className="text-xs text-gray-500 dark:text-gray-400">Total Transacciones</p>
          <p className="mt-0.5 text-xl font-bold text-primary-700 dark:text-primary-400">
            {formatCurrency(calculationData.totalAmount)}
          </p>
        </div>
        <div className="dark:bg-purple-900/20 rounded-lg bg-purple-50 p-3">
          <p className="text-xs text-gray-500 dark:text-gray-400">Balance Esperado</p>
          <p className="mt-0.5 text-xl font-bold text-purple-700 dark:text-purple-400">
            {formatCurrency(calculationData.expectedBalance)}
          </p>
        </div>
      </div>

      {/* Tabla comparativa dinámica */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-slate-600">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 dark:border-slate-600 dark:bg-slate-700">
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Método de Pago
              </th>
              <th className="px-4 py-2.5 text-right text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Esperado
              </th>
              <th className="px-4 py-2.5 text-right text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Ingresado
              </th>
              <th className="px-4 py-2.5 text-right text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Diferencia
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white dark:divide-slate-700 dark:bg-slate-800">
            {paymentMethods.map((method) => {
              const desc = method.description;
              const methodDiff = differences?.byMethod?.[desc];
              const expected = methodDiff?.expected ?? 0;
              const entered = Number(enteredAmounts[desc] ?? 0);
              const diff = methodDiff?.diff ?? 0;
              const diffColor =
                diff === 0
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'font-medium text-red-600 dark:text-red-400';
              return (
                <tr key={method.id} className="dark:hover:bg-slate-700/50 transition-colors hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{desc}</td>
                  <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-400">
                    {formatCurrency(expected)}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-800 dark:text-white">
                    {formatCurrency(entered)}
                  </td>
                  <td className={`px-4 py-3 text-right ${diffColor}`}>
                    {diff > 0 ? '+' : ''}{formatCurrency(diff)}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-gray-300 bg-gray-50 dark:border-slate-500 dark:bg-slate-700">
              <td className="px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Total
              </td>
              <td className="px-4 py-3 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">
                {formatCurrency(differences?.totalExpected ?? calculationData.totalAmount)}
              </td>
              <td className="px-4 py-3 text-right text-sm font-semibold text-gray-800 dark:text-white">
                {formatCurrency(totalEntered)}
              </td>
              <td className={`px-4 py-3 text-right text-sm font-semibold ${
                hasDiscrepancies
                  ? 'text-red-600 dark:text-red-400'
                  : 'text-primary-600 dark:text-primary-400'
              }`}>
                {(differences?.total ?? 0) > 0 ? '+' : ''}
                {formatCurrency(differences?.total ?? 0)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

ReconciliationSummaryCard.propTypes = {
  calculationData: PropTypes.object.isRequired,
  paymentMethods: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  })).isRequired,
  enteredAmounts: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ).isRequired,
  totalEntered: PropTypes.number.isRequired,
  differences: PropTypes.object,
  hasDiscrepancies: PropTypes.bool.isRequired,
  formatCurrency: PropTypes.func.isRequired,
};
