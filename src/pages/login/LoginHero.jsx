import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHospital } from '@fortawesome/free-solid-svg-icons';

/**
 * Login page hero: logo badge + app title + tagline.
 */
const LoginHero = () => (
  <div className="mb-8 flex flex-col items-center">
    <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-600 shadow-lg transition-shadow duration-base ease-standard hover:shadow-xl">
      <FontAwesomeIcon
        icon={faHospital}
        className="size-8 text-white"
        aria-hidden="true"
      />
    </div>
    <h1 className="font-heading text-3xl font-bold tracking-tight text-neutral-900 dark:text-white md:text-4xl">
      Caja Digital
    </h1>
    <p className="mt-2 text-sm font-medium text-secondary-600 dark:text-secondary-400">
      Sistema de Caja para Centros de Salud
    </p>
  </div>
);

export default LoginHero;
