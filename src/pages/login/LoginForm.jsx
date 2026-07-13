import { Button, Label, Select, TextInput } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faLock,
  faHospital,
  faCashRegister,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
/**
 * Login form: email, password, entity select, submit button.
 * Restyled with semantic design tokens and dark mode parity.
 */
/* eslint-disable react/prop-types */
const LoginForm = ({
  register,
  handleSubmit,
  errors,
  isSubmitting,
  entities,
  errorMessage,
  onSubmit,
}) => (
  <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white shadow-xl backdrop-blur-sm dark:border-primary-800 dark:bg-primary-900 sm:max-w-lg">
    <div className="space-y-6 p-6 sm:p-8 md:space-y-8">
      <div className="text-center">
        <h2 className="font-heading text-xl font-bold leading-snug tracking-tight text-neutral-900 dark:text-white md:text-2xl">
          Acceso de Recepción Médica
        </h2>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          Portal de acceso para personal de recepción
        </p>
      </div>

      {errorMessage && (
        <div
          role="alert"
          aria-live="assertive"
          className="flex items-start gap-3 rounded-xl border border-error-200 bg-error-50 p-4 text-sm text-error-700 dark:border-error-800 dark:bg-error-900 dark:text-error-400"
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
        className="space-y-5 md:space-y-6"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="space-y-1.5">
          <Label
            htmlFor="email"
            className="flex items-center gap-2 text-sm font-semibold text-neutral-700 dark:text-neutral-200"
          >
            <FontAwesomeIcon
              icon={faEnvelope}
              className="text-primary-500 dark:text-primary-400"
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
            className="rounded-lg border-neutral-300 transition-colors duration-fast focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-primary-700 dark:bg-primary-950 dark:focus:border-primary-400 dark:focus:ring-primary-800"
            {...register('email')}
          />
          {errors.email && (
            <p id="email-error" role="alert" className="ml-1 text-left text-sm text-error-500 dark:text-error-400">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor="password"
            className="flex items-center gap-2 text-sm font-semibold text-neutral-700 dark:text-neutral-200"
          >
            <FontAwesomeIcon
              icon={faLock}
              className="text-primary-500 dark:text-primary-400"
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
            className="rounded-lg border-neutral-300 transition-colors duration-fast focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-primary-700 dark:bg-primary-950 dark:focus:border-primary-400 dark:focus:ring-primary-800"
            {...register('password')}
          />
          {errors.password && (
            <p id="password-error" role="alert" className="ml-1 text-left text-sm text-error-500 dark:text-error-400">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor="entity"
            className="flex items-center gap-2 text-sm font-semibold text-neutral-700 dark:text-neutral-200"
          >
            <FontAwesomeIcon
              icon={faHospital}
              className="text-primary-500 dark:text-primary-400"
              aria-hidden="true"
            />
            Centro de Salud / Hospital
          </Label>
          <Select
            id="entity"
            color={errors.entity ? 'failure' : 'gray'}
            aria-describedby={errors.entity ? 'entity-error' : undefined}
            aria-invalid={!!errors.entity}
            className="rounded-lg border-neutral-300 transition-colors duration-fast focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-primary-700 dark:bg-primary-950 dark:focus:border-primary-400 dark:focus:ring-primary-800"
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
            <p id="entity-error" role="alert" className="ml-1 text-left text-sm text-error-500 dark:text-error-400">
              {errors.entity.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          size="xl"
          disabled={isSubmitting}
          isProcessing={isSubmitting}
          className="w-full rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 font-semibold text-white shadow-lg transition-all duration-base ease-standard hover:from-primary-700 hover:to-secondary-700 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-primary-300 disabled:cursor-not-allowed disabled:opacity-60 dark:focus:ring-primary-800"
          color="blue"
        >
          {!isSubmitting && (
            <div className="flex items-center justify-center gap-2">
              <FontAwesomeIcon icon={faCashRegister} aria-hidden="true" />
              <span>Acceder a Caja de Recepción</span>
            </div>
          )}
        </Button>

        <div className="space-y-1.5 text-center">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            ¿Necesita acceso?{' '}
            <a
              href="/register"
              className="font-semibold text-secondary-600 transition-colors duration-fast hover:text-secondary-700 hover:underline focus:outline-none focus:ring-2 focus:ring-secondary-300 focus:ring-offset-2 dark:text-secondary-400 dark:hover:text-secondary-300 dark:focus:ring-secondary-700"
            >
              Solicitar credenciales
            </a>
          </p>
          <p className="text-xs text-neutral-400 dark:text-neutral-500">
            Sistema autorizado para personal de recepción médica
          </p>
        </div>
      </form>
    </div>
  </div>
);

export default LoginForm;
