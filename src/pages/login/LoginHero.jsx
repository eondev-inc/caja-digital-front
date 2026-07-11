import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHospital } from '@fortawesome/free-solid-svg-icons';

/**
 * Login page hero: logo + app title.
 */
const LoginHero = () => (
  <div className="mb-6 flex items-center">
    <FontAwesomeIcon
      icon={faHospital}
      className="mr-3 text-3xl text-primary-600 dark:text-primary-400"
      aria-hidden="true"
    />
    <h1 className="text-2xl font-bold text-primary-600 dark:text-primary-400">
      Caja Digital
    </h1>
  </div>
);

export default LoginHero;
