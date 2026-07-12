import PropTypes from 'prop-types';
import { Label, Select, TextInput, Spinner } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

export const RegisterAccountFields = ({
  register,
  errors,
  entities,
  loadingEntities,
}) => {
  return (
    <>
      {/* Centro de Salud */}
      <div className="space-y-2">
        <Label
          htmlFor="entity_id"
          className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          <FontAwesomeIcon
            icon={faBuilding}
            className="text-primary-600 dark:text-primary-400"
            aria-hidden="true"
          />
          Centro de Salud
        </Label>
        {loadingEntities ? (
          <div className="flex items-center gap-2 py-2 text-sm text-gray-500 dark:text-gray-400">
            <Spinner size="sm" />
            <span>Cargando centros de salud...</span>
          </div>
        ) : (
          <Select
            id="entity_id"
            {...register('entity_id')}
            className="rounded-lg border-gray-300 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-slate-600"
          >
            <option value="">Seleccione un centro de salud</option>
            {entities.map((entity) => (
              <option key={entity.id} value={entity.id}>
                {entity.name}
              </option>
            ))}
          </Select>
        )}
        {errors.entity_id && (
          <p className="text-xs text-red-600 dark:text-red-400" role="alert">
            {errors.entity_id.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label
          htmlFor="email"
          className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          <FontAwesomeIcon
            icon={faEnvelope}
            className="text-primary-600 dark:text-primary-400"
            aria-hidden="true"
          />
          Correo Electrónico
        </Label>
        <TextInput
          type="email"
          id="email"
          {...register('email')}
          placeholder="correo@clinica.com"
          className="rounded-lg border-gray-300 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-slate-600"
        />
        {errors.email && (
          <p className="text-xs text-red-600 dark:text-red-400" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Contraseñas */}
      <div className="space-y-3">
        <Label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          <FontAwesomeIcon
            icon={faLock}
            className="text-primary-600 dark:text-primary-400"
            aria-hidden="true"
          />
          Contraseña
        </Label>
        <div className="space-y-3">
          <TextInput
            type="password"
            id="password"
            {...register('password')}
            placeholder="Contraseña (mín. 8 caracteres)"
            className="rounded-lg border-gray-300 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-slate-600"
          />
          {errors.password && (
            <p className="text-xs text-red-600 dark:text-red-400" role="alert">
              {errors.password.message}
            </p>
          )}
          <TextInput
            type="password"
            id="confirm-password"
            {...register('confirmPassword')}
            placeholder="Confirmar contraseña"
            className="rounded-lg border-gray-300 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-slate-600"
          />
          {errors.confirmPassword && (
            <p className="text-xs text-red-600 dark:text-red-400" role="alert">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

RegisterAccountFields.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  entities: PropTypes.array.isRequired,
  loadingEntities: PropTypes.bool.isRequired,
};
