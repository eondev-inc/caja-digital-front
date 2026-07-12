import { Breadcrumb } from 'flowbite-react';
import { HiHome } from 'react-icons/hi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

export const CancelHeader = () => {
  return (
    <>
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item
          href="/dashboard"
          icon={HiHome}
          className="text-primary-600 dark:text-primary-400"
        >
          Inicio
        </Breadcrumb.Item>
        <Breadcrumb.Item className="text-gray-600 dark:text-gray-400">
          Anulación de Movimientos
        </Breadcrumb.Item>
      </Breadcrumb>

      <div className="mb-4">
        <div className="flex items-center gap-3">
          <FontAwesomeIcon
            icon={faTimesCircle}
            className="text-2xl text-primary-600 dark:text-primary-400"
            aria-hidden="true"
          />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Anulación de Movimientos
          </h1>
        </div>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Gestiona cancelaciones y devoluciones de las transacciones de la caja
          actual.
        </p>
      </div>
    </>
  );
};
