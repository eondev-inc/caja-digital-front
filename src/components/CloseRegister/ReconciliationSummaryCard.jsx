import { Card } from 'flowbite-react';
import PropTypes from 'prop-types';

/**
 * Muestra el resumen general de cuadratura: monto inicial, total transacciones y
 * balance esperado. También renderiza los resúmenes por tipo y por método de pago.
 * @param {object} calculationData - Datos de cuadratura del backend
 * @param {function} formatCurrency - Función de formato CLP
 */
export default function ReconciliationSummaryCard({ calculationData, formatCurrency }) {
  return (
    <div className="space-y-6">
      {/* Resumen General */}
      <Card className="border border-gray-200 dark:border-slate-700">
        <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
          Resumen General
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="dark:bg-secondary-900/20 rounded-lg bg-secondary-50 p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">Monto Inicial</p>
            <p className="text-2xl font-bold text-secondary-700 dark:text-secondary-400">
              {formatCurrency(calculationData.initialAmount)}
            </p>
          </div>
          <div className="dark:bg-primary-900/20 rounded-lg bg-primary-50 p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Transacciones</p>
            <p className="text-2xl font-bold text-primary-700 dark:text-primary-400">
              {formatCurrency(calculationData.totalAmount)}
            </p>
          </div>
          <div className="dark:bg-purple-900/20 rounded-lg bg-purple-50 p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">Balance Esperado</p>
            <p className="text-2xl font-bold text-purple-700 dark:text-purple-400">
              {formatCurrency(calculationData.expectedBalance)}
            </p>
          </div>
        </div>
      </Card>

      {/* Resumen por Tipo de Transacción */}
      <Card className="border border-gray-200 dark:border-slate-700">
        <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
          Resumen por Tipo de Transacción
        </h2>
        <div className="space-y-3">
          {Object.entries(calculationData.transactionDetailsByType || {}).map(([type, details]) => (
            <div key={type} className="rounded-lg border border-gray-200 p-4 dark:border-slate-600">
              <h3 className="mb-2 font-semibold text-gray-700 dark:text-gray-300">{type}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total: <span className="font-medium">{details.count}</span> transacciones
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {Object.entries(details.details || {}).map(([status, count]) => (
                  <span
                    key={status}
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      status === 'COMPLETADO'
                        ? 'dark:bg-green-900/30 bg-green-100 text-green-800 dark:text-green-400'
                        : status === 'CANCELADO'
                        ? 'dark:bg-red-900/30 bg-red-100 text-red-800 dark:text-red-400'
                        : 'dark:bg-yellow-900/30 bg-yellow-100 text-yellow-800 dark:text-yellow-400'
                    }`}
                  >
                    {status}: {count}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Resumen por Método de Pago */}
      <Card className="border border-gray-200 dark:border-slate-700">
        <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
          Resumen por Método de Pago
        </h2>
        <div className="space-y-3">
          {Object.entries(calculationData.transactionDetailsByPaymentMethod || {}).map(([method, details]) => (
            <div key={method} className="rounded-lg border border-gray-200 p-4 dark:border-slate-600">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-700 dark:text-gray-300">{method}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {details.count} transacciones
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary-700 dark:text-primary-400">
                    {formatCurrency(details.totalAmount)}
                  </p>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
                {Object.entries(details.details || {}).map(([status, amount]) => (
                  <div key={status} className="text-center">
                    <p className="text-gray-600 dark:text-gray-400">{status}</p>
                    <p className={`font-medium ${
                      amount > 0
                        ? 'text-primary-600 dark:text-primary-400'
                        : amount < 0
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {formatCurrency(amount)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

ReconciliationSummaryCard.propTypes = {
  calculationData: PropTypes.object.isRequired,
  formatCurrency: PropTypes.func.isRequired,
};
