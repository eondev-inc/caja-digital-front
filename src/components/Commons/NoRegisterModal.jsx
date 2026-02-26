import { Modal, Button, Alert } from 'flowbite-react';
import { HiExclamationCircle } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Modal informativo que aparece cuando no hay caja abierta.
 * Ofrece redirigir a la página de apertura de caja.
 * Compartido por Sales y CloseRegister.
 *
 * @param {boolean} show - Controla visibilidad
 * @param {string} context - 'sales' | 'close' — ajusta el texto descriptivo
 */
export default function NoRegisterModal({ show, context = 'sales' }) {
  const navigate = useNavigate();

  const descriptionText =
    context === 'close'
      ? 'Para realizar el cierre de caja, primero debe abrir una caja registradora. La apertura de caja le permite:'
      : 'Para realizar ventas y registrar transacciones, primero debe abrir una caja registradora. La apertura de caja le permite:';

  const items =
    context === 'close'
      ? [
          'Registrar el monto inicial',
          'Asociar transacciones a la caja',
          'Realizar seguimiento de movimientos',
          'Generar reportes y cierres',
        ]
      : [
          'Registrar el monto inicial del día',
          'Asociar todas las ventas a la caja',
          'Mantener control de ingresos y egresos',
          'Realizar el cierre diario correctamente',
        ];

  return (
    <Modal show={show} onClose={() => {}} dismissible={false} size="md">
      <Modal.Header>
        <div className="flex items-center gap-2">
          <HiExclamationCircle className="size-6 text-yellow-500" aria-hidden="true" />
          <span>Caja No Abierta</span>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-4">
          <Alert color="warning" icon={HiExclamationCircle}>
            <span className="font-medium">Atención:</span> No hay una caja abierta actualmente.
          </Alert>

          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-slate-600 dark:bg-slate-700">
            <p className="text-sm text-gray-700 dark:text-gray-300">{descriptionText}</p>
            <ul className="ml-4 mt-2 list-disc space-y-1 text-sm text-gray-600 dark:text-gray-400">
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="dark:bg-secondary-900/20 rounded-lg bg-secondary-50 p-4">
            <p className="text-sm text-secondary-800 dark:text-secondary-200">
              <span className="font-medium">¿Desea abrir una caja ahora?</span>
              <br />
              Será redirigido a la página de apertura de caja.
            </p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex w-full justify-end gap-3">
          <Button color="gray" onClick={() => navigate('/dashboard')}>
            Cancelar
          </Button>
          <Button color="success" onClick={() => navigate('/dashboard/open-register')}>
            Abrir Caja
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

NoRegisterModal.propTypes = {
  show: PropTypes.bool.isRequired,
  context: PropTypes.oneOf(['sales', 'close']),
};
