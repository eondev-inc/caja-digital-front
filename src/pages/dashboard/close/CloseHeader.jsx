import { Breadcrumb } from 'flowbite-react';
import { HiHome } from 'react-icons/hi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator } from '@fortawesome/free-solid-svg-icons';

/**
 * CloseRegister page header: breadcrumb + title + description.
 */
const CloseHeader = () => (
  <>
    <Breadcrumb className="mb-4">
      <Breadcrumb.Item
        href="/dashboard"
        icon={HiHome}
        className="text-primary-600 dark:text-primary-400"
      >
        Inicio
      </Breadcrumb.Item>
      <Breadcrumb.Item className="text-neutral-600 dark:text-neutral-400">
        Cuadratura y Cierre de Caja
      </Breadcrumb.Item>
    </Breadcrumb>

    <div className="mb-4">
      <div className="flex items-center gap-3">
        <FontAwesomeIcon
          icon={faCalculator}
          className="text-2xl text-primary-600 dark:text-primary-400"
          aria-hidden="true"
        />
        <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-50">
          Cuadratura y Cierre de Caja
        </h1>
      </div>
      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
        Verifica los montos y realiza el cierre diario de tu caja registradora.
      </p>
    </div>
  </>
);

export default CloseHeader;
