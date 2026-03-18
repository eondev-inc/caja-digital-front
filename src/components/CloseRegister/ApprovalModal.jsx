import { Modal, Button, Alert, Spinner } from 'flowbite-react';
import { HiCheckCircle } from 'react-icons/hi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

/**
 * Modal de aprobación final del cierre de caja.
 * Muestra el resumen del cierre con todos los métodos de pago activos de forma dinámica.
 *
 * @param {boolean} show             - Controla visibilidad del modal
 * @param {boolean} approving        - Estado de carga durante aprobación
 * @param {object|null} calculationData - Datos de cuadratura
 * @param {Array}  paymentMethods    - Lista de métodos de pago activos [{id, description, ...}]
 * @param {number} totalEntered      - Suma de montos ingresados
 * @param {object} enteredAmounts    - Montos ingresados por description: { 'Efectivo': 0, ... }
 * @param {boolean} hasDiscrepancies - Si hay diferencias
 * @param {object|null} differences  - Objeto de diferencias
 * @param {function} onClose         - Cerrar modal
 * @param {function} onApprove       - Confirmar aprobación
 * @param {function} formatCurrency  - Formateador CLP
 */
export default function ApprovalModal({
  show,
  approving,
  calculationData,
  paymentMethods,
  totalEntered,
  enteredAmounts,
  hasDiscrepancies,
  differences,
  onClose,
  onApprove,
  formatCurrency,
}) {
  // Distribuir los métodos en columnas (máximo 3 por fila)
  const colClass =
    paymentMethods.length <= 2
      ? `grid-cols-${paymentMethods.length}`
      : 'grid-cols-3';

  return (
    <Modal show={show} onClose={() => !approving && onClose()} size="lg">
      <Modal.Header>Aprobar Cierre de Caja</Modal.Header>
      <Modal.Body>
        <div className="space-y-4">
          <Alert color="success" icon={HiCheckCircle}>
            <span className="font-medium">¡Cierre enviado a revisión!</span> El cierre de caja se ha registrado correctamente.
          </Alert>

          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-slate-600 dark:bg-slate-700">
            <h3 className="mb-3 font-semibold text-gray-800 dark:text-white">Resumen del Cierre</h3>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Monto Inicial:</span>
                <span className="font-medium text-gray-800 dark:text-white">
                  {formatCurrency(calculationData?.initialAmount || 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Total Transacciones:</span>
                <span className="font-medium text-gray-800 dark:text-white">
                  {formatCurrency(calculationData?.totalAmount || 0)}
                </span>
              </div>
              <div className="flex justify-between border-t pt-2 dark:border-slate-600">
                <span className="text-gray-600 dark:text-gray-400">Balance Final:</span>
                <span className="font-semibold text-primary-700 dark:text-primary-400">
                  {formatCurrency((calculationData?.initialAmount || 0) + totalEntered)}
                </span>
              </div>
            </div>

            {/* Montos ingresados por método — dinámico */}
            {paymentMethods.length > 0 && (
              <div className="mt-4 border-t pt-3 dark:border-slate-600">
                <p className="mb-2 text-xs font-medium text-gray-700 dark:text-gray-300">
                  Montos Ingresados:
                </p>
                <div className={`grid gap-2 text-sm ${colClass}`}>
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="text-center">
                      <p className="text-xs text-gray-600 dark:text-gray-400">{method.description}</p>
                      <p className="font-medium text-gray-800 dark:text-white">
                        {formatCurrency(enteredAmounts[method.description] ?? 0)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {hasDiscrepancies && (
              <div className="dark:bg-yellow-900/20 mt-3 rounded bg-yellow-50 p-2">
                <p className="flex items-center gap-1 text-xs text-yellow-800 dark:text-yellow-400">
                  <FontAwesomeIcon icon={faExclamationTriangle} aria-hidden="true" />
                  Nota: Se detectaron diferencias de {formatCurrency(differences?.total || 0)}
                </p>
              </div>
            )}
          </div>

          <div className="dark:bg-secondary-900/20 rounded-lg bg-secondary-50 p-4">
            <p className="text-sm text-secondary-800 dark:text-secondary-200">
              <span className="font-medium">¿Desea aprobar este cierre?</span>
              <br />
              Al aprobar, la caja se cerrará definitivamente y no podrá realizar más transacciones en esta sesión.
            </p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex w-full justify-end gap-3">
          <Button color="gray" onClick={onClose} disabled={approving}>
            Cancelar
          </Button>
          <Button color="success" onClick={onApprove} disabled={approving}>
            {approving ? (
              <>
                <Spinner size="sm" className="mr-2" />
                Aprobando...
              </>
            ) : (
              <>
                <HiCheckCircle className="mr-2 size-5" />
                Aprobar Cierre
              </>
            )}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

ApprovalModal.propTypes = {
  show: PropTypes.bool.isRequired,
  approving: PropTypes.bool.isRequired,
  calculationData: PropTypes.object,
  paymentMethods: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  })).isRequired,
  totalEntered: PropTypes.number.isRequired,
  enteredAmounts: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ).isRequired,
  hasDiscrepancies: PropTypes.bool.isRequired,
  differences: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onApprove: PropTypes.func.isRequired,
  formatCurrency: PropTypes.func.isRequired,
};
