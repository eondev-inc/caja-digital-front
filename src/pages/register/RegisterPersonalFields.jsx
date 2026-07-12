import PropTypes from 'prop-types';
import { Label, TextInput } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faIdCard } from '@fortawesome/free-solid-svg-icons';

export const RegisterPersonalFields = ({ register, errors }) => {
  return (
    <div className="space-y-3">
      <Label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        <FontAwesomeIcon
          icon={faUser}
          className="text-primary-600 dark:text-primary-400"
          aria-hidden="true"
        />
        Información Personal
      </Label>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <Label
            htmlFor="forenames"
            className="text-xs font-medium text-gray-600 dark:text-gray-400"
          >
            Nombres
          </Label>
          <TextInput
            type="text"
            id="forenames"
            {...register('forenames')}
            placeholder="Nombres"
            className="rounded-lg border-gray-300 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-slate-600 dark:focus:border-primary-400"
          />
          {errors.forenames && (
            <p className="text-xs text-red-600 dark:text-red-400" role="alert">
              {errors.forenames.message}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label
            htmlFor="surnames"
            className="text-xs font-medium text-gray-600 dark:text-gray-400"
          >
            Apellidos
          </Label>
          <TextInput
            type="text"
            id="surnames"
            {...register('surnames')}
            placeholder="Apellidos"
            className="rounded-lg border-gray-300 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-slate-600 dark:focus:border-primary-400"
          />
          {errors.surnames && (
            <p className="text-xs text-red-600 dark:text-red-400" role="alert">
              {errors.surnames.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2 pt-2">
        <Label
          htmlFor="nid"
          className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          <FontAwesomeIcon
            icon={faIdCard}
            className="text-primary-600 dark:text-primary-400"
            aria-hidden="true"
          />
          RUT
        </Label>
        <TextInput
          type="text"
          id="nid"
          {...register('nid')}
          placeholder="11.111.111-1"
          className="rounded-lg border-gray-300 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-slate-600"
        />
        {errors.nid && (
          <p className="text-xs text-red-600 dark:text-red-400" role="alert">
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
