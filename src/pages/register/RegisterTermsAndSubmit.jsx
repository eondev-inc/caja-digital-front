import PropTypes from 'prop-types';
import { Button, Checkbox, Label, Spinner } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

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
          className="mt-1 shrink-0 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-slate-600 dark:text-primary-400"
        />
        <div className="text-xs text-gray-600 dark:text-gray-400">
          <Label htmlFor="terms" id="terms-label">
            Acepto los{' '}
            <a
              className="font-medium text-primary-600 underline hover:text-primary-800 dark:text-primary-400"
              href="#"
            >
              términos y condiciones
            </a>
            {' '}del sistema Caja Digital
          </Label>
          {errors.checkBox && (
            <p
              className="mt-1 text-xs text-red-600 dark:text-red-400"
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
          className="w-full rounded-lg bg-gradient-to-r from-primary-600 to-secondary-600 px-5 py-2.5 text-center text-sm font-medium text-white shadow-lg transition-all duration-200 hover:from-primary-700 hover:to-secondary-700 focus:ring-4 focus:ring-primary-300 disabled:opacity-60"
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
        <p className="text-sm text-gray-600 dark:text-gray-400">
          ¿Ya tienes una cuenta?{' '}
          <a
            href="/login"
            className="font-medium text-primary-600 underline hover:text-primary-800 dark:text-primary-400"
          >
            Inicia sesión aquí
          </a>
        </p>
      </div>
    </>
  );
};

RegisterTermsAndSubmit.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  loadingEntities: PropTypes.bool.isRequired,
};
