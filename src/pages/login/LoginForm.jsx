import { Button, Label, Select, TextInput } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faLock,
  faHospital,
  faCashRegister,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

/**
 * Login form: email, password, entity select, submit button.
 */
const LoginForm = ({
  register,
  handleSubmit,
  errors,
  isSubmitting,
  entities,
  errorMessage,
  onSubmit,
}) => (
  <div className="dark:bg-gray-800/90 w-full rounded-2xl border-0 bg-white/90 shadow-2xl backdrop-blur-sm sm:max-w-md md:mt-0 xl:p-0">
    <div className="space-y-6 p-8 sm:p-10 md:space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-3xl">
          Acceso de Recepción Médica
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Portal de acceso para personal de recepción
        </p>
      </div>

      {errorMessage && (
        <div
          role="alert"
          className="dark:bg-red-900/30 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:text-red-400"
        >
          <FontAwesomeIcon
            icon={faTriangleExclamation}
            className="mt-0.5 shrink-0"
            aria-hidden="true"
          />
          <span>{errorMessage}</span>
        </div>
      )}

      <form
        className="space-y-6 md:space-y-8"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="mb-2 flex items-center text-sm font-medium text-gray-900 dark:text-white"
          >
            <FontAwesomeIcon
              icon={faEnvelope}
              className="mr-2 text-primary-600 dark:text-primary-400"
              aria-hidden="true"
            />
            Correo Institucional
          </Label>
          <TextInput
            type="email"
            id="email"
            autoComplete="username"
            placeholder="recepcion@centrodesalud.com"
            color={errors.email ? 'failure' : 'gray'}
            aria-describedby={errors.email ? 'email-error' : undefined}
            aria-invalid={!!errors.email}
            {...register('email')}
          />
          {errors.email && (
            <p id="email-error" className="mx-1 text-left text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="mb-2 flex items-center text-sm font-medium text-gray-900 dark:text-white"
          >
            <FontAwesomeIcon
              icon={faLock}
              className="mr-2 text-primary-600 dark:text-primary-400"
              aria-hidden="true"
            />
            Contraseña
          </Label>
          <TextInput
            type="password"
            id="password"
            autoComplete="current-password"
            placeholder="••••••••••••"
            color={errors.password ? 'failure' : 'gray'}
            aria-describedby={errors.password ? 'password-error' : undefined}
            aria-invalid={!!errors.password}
            {...register('password')}
          />
          {errors.password && (
            <p id="password-error" className="mx-1 text-left text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="entity"
            className="mb-2 flex items-center text-sm font-medium text-gray-900 dark:text-white"
          >
            <FontAwesomeIcon
              icon={faHospital}
              className="mr-2 text-primary-600 dark:text-primary-400"
              aria-hidden="true"
            />
            Centro de Salud / Hospital
          </Label>
          <Select
            id="entity"
            color={errors.entity ? 'failure' : 'gray'}
            aria-describedby={errors.entity ? 'entity-error' : undefined}
            aria-invalid={!!errors.entity}
            {...register('entity')}
          >
            <option value="">Seleccione su centro de trabajo...</option>
            {entities.map((entity) => (
              <option key={entity.id} value={entity.id}>
                {entity.name}
              </option>
            ))}
          </Select>
          {errors.entity && (
            <p id="entity-error" className="mx-1 text-left text-sm text-red-500">
              {errors.entity.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          size="xl"
          disabled={isSubmitting}
          isProcessing={isSubmitting}
          className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 font-semibold shadow-lg transition-all duration-200 hover:from-primary-700 hover:to-secondary-700 focus:ring-4 focus:ring-primary-300 disabled:opacity-70"
          color="blue"
        >
          {!isSubmitting && (
            <div className="flex items-center justify-center">
              <FontAwesomeIcon icon={faCashRegister} className="mr-3" aria-hidden="true" />
              <span>Acceder a Caja de Recepción</span>
            </div>
          )}
        </Button>

        <div className="text-center">
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            ¿Necesita acceso?{' '}
            <a
              href="/register"
              className="font-medium text-secondary-600 hover:text-secondary-700 hover:underline dark:text-secondary-400"
            >
              Solicitar credenciales
            </a>
          </p>
          <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
            Sistema autorizado para personal de recepción médica
          </p>
        </div>
      </form>
    </div>
  </div>
);

LoginForm.propTypes = {
  register: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  entities: PropTypes.array.isRequired,
  errorMessage: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
