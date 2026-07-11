import { Breadcrumb } from 'flowbite-react';
import { HiHome } from 'react-icons/hi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons';

export default function SalesHeader() {
  return (
    <>
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item href="/dashboard" icon={HiHome} className="text-primary-600 dark:text-primary-400">
          Inicio
        </Breadcrumb.Item>
        <Breadcrumb.Item className="text-neutral-600 dark:text-neutral-400">
          Nueva Venta
        </Breadcrumb.Item>
      </Breadcrumb>

      <div className="mb-4">
        <div className="flex items-center gap-3">
          <FontAwesomeIcon
            icon={faFileInvoice}
            className="text-2xl text-primary-600 dark:text-primary-400"
            aria-hidden="true"
          />
          <h1 className="font-heading text-2xl font-bold text-neutral-900 dark:text-white">
            Nueva Venta
          </h1>
        </div>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          Sistema de Facturación Médica
        </p>
      </div>
    </>
  );
}
