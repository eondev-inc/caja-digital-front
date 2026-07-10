import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHospital } from '@fortawesome/free-solid-svg-icons';

export const RegisterHeader = () => {
  return (
    <div className="text-center">
      <div className="mb-4 inline-flex size-16 items-center justify-center rounded-full bg-gradient-to-r from-primary-500 to-secondary-600 shadow-lg">
        <FontAwesomeIcon
          icon={faHospital}
          className="size-8 text-white"
          aria-hidden="true"
        />
      </div>
      <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
        Registro de Personal
      </h1>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Caja Digital — Centros de Salud
      </p>
    </div>
  );
};
