import { Button, Checkbox, Label, Spinner } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

/* eslint-disable react/prop-types */
export const RegisterTermsAndSubmit = ({
  register,
  errors,
  isSubmitting,
  loadingEntities,
}) => {
  return (
    <>
      {/* Términos y Condiciones */}
      <div className="flex items-start gap-3 py-2">
        <Checkbox
          id="terms"
          {...register('checkBox')}
          aria-describedby="terms-label"
          className="mt-1 shrink-0 rounded border-neutral-300 text-primary-600 focus:ring-2 focus:ring-primary-200 dark:border-primary-700 dark:text-primary-400 dark:focus:ring-primary-800"
        />
        <div className="text-xs text-neutral-600 dark:text-neutral-400">
          <Label htmlFor="terms" id="terms-label">
            Acepto los{' '}
            <a
              className="font-medium text-primary-600 underline transition-colors duration-fast hover:text-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2 dark:text-primary-400 dark:hover:text-primary-300"
              href="#"
            >
              términos y condiciones
            </a>
            {' '}del sistema Caja Digital
          </Label>
          {errors.checkBox && (
            <p
              className="mt-1 text-xs text-error-600 dark:text-error-400"
              role="alert"
            >
              {errors.checkBox.message}
            </p>
          )}
        </div>
      </div>

      {/* Botón de Registro */}
      <div className="pt-2">
        <Button
          type="submit"
          disabled={isSubmitting || loadingEntities}
          className="w-full rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 px-5 py-2.5 text-center text-sm font-semibold text-white shadow-lg transition-all duration-base ease-standard hover:from-primary-700 hover:to-secondary-700 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-primary-300 disabled:cursor-not-allowed disabled:opacity-60 dark:focus:ring-primary-800"
        >
          <div className="flex items-center justify-center gap-2">
            {isSubmitting ? (
              <Spinner size="sm" />
            ) : (
              <FontAwesomeIcon icon={faUserPlus} aria-hidden="true" />
            )}
            {isSubmitting ? 'Registrando...' : 'Crear Cuenta de Recepción'}
          </div>
        </Button>
      </div>

      <div className="text-center">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          ¿Ya tienes una cuenta?{' '}
          <a
            href="/login"
            className="font-semibold text-primary-600 underline transition-colors duration-fast hover:text-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2 dark:text-primary-400 dark:hover:text-primary-300"
          >
            Inicia sesión aquí
          </a>
        </p>
      </div>
    </>
  );
};
