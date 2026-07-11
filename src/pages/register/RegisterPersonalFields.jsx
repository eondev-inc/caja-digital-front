import PropTypes from 'prop-types';
import { Label, TextInput } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faIdCard } from '@fortawesome/free-solid-svg-icons';

export const RegisterPersonalFields = ({ register, errors }) => {
  return (
    <div className="space-y-3">
      <Label className="flex items-center gap-2 text-sm font-semibold text-neutral-700 dark:text-neutral-200">
        <FontAwesomeIcon
          icon={faUser}
          className="text-primary-500 dark:text-primary-400"
          aria-hidden="true"
        />
        Información Personal
      </Label>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <Label
            htmlFor="forenames"
            className="text-xs font-medium text-neutral-600 dark:text-neutral-400"
          >
            Nombres
          </Label>
          <TextInput
            type="text"
            id="forenames"
            {...register('forenames')}
            placeholder="Nombres"
            aria-invalid={!!errors.forenames}
            aria-describedby={errors.forenames ? 'forenames-error' : undefined}
            className="rounded-lg border-neutral-300 text-sm transition-colors duration-fast focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-primary-700 dark:bg-primary-950 dark:focus:border-primary-400 dark:focus:ring-primary-800"
          />
          {errors.forenames && (
            <p id="forenames-error" className="text-xs text-error-600 dark:text-error-400" role="alert">
              {errors.forenames.message}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label
            htmlFor="surnames"
            className="text-xs font-medium text-neutral-600 dark:text-neutral-400"
          >
            Apellidos
          </Label>
          <TextInput
            type="text"
            id="surnames"
            {...register('surnames')}
            placeholder="Apellidos"
            aria-invalid={!!errors.surnames}
            aria-describedby={errors.surnames ? 'surnames-error' : undefined}
            className="rounded-lg border-neutral-300 text-sm transition-colors duration-fast focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-primary-700 dark:bg-primary-950 dark:focus:border-primary-400 dark:focus:ring-primary-800"
          />
          {errors.surnames && (
            <p id="surnames-error" className="text-xs text-error-600 dark:text-error-400" role="alert">
              {errors.surnames.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2 pt-2">
        <Label
          htmlFor="nid"
          className="flex items-center gap-2 text-sm font-semibold text-neutral-700 dark:text-neutral-200"
        >
          <FontAwesomeIcon
            icon={faIdCard}
            className="text-primary-500 dark:text-primary-400"
            aria-hidden="true"
          />
          RUT
        </Label>
        <TextInput
          type="text"
          id="nid"
          {...register('nid')}
          placeholder="11.111.111-1"
          aria-invalid={!!errors.nid}
          aria-describedby={errors.nid ? 'nid-error' : undefined}
          className="rounded-lg border-neutral-300 text-sm transition-colors duration-fast focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-primary-700 dark:bg-primary-950 dark:focus:border-primary-400 dark:focus:ring-primary-800"
        />
        {errors.nid && (
          <p id="nid-error" className="text-xs text-error-600 dark:text-error-400" role="alert">
            {errors.nid.message}
          </p>
        )}
      </div>
    </div>
  );
};

RegisterPersonalFields.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};
