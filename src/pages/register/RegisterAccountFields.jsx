import PropTypes from 'prop-types';
import { Label, Select, TextInput } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import Skeleton from '../../../components/Skeleton/Skeleton';

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
          className="flex items-center gap-2 text-sm font-semibold text-neutral-700 dark:text-neutral-200"
        >
          <FontAwesomeIcon
            icon={faBuilding}
            className="text-primary-500 dark:text-primary-400"
            aria-hidden="true"
          />
          Centro de Salud
        </Label>
        {loadingEntities ? (
          <Skeleton variant="text" lines={1} className="py-2" />
        ) : (
          <Select
            id="entity_id"
            {...register('entity_id')}
            aria-invalid={!!errors.entity_id}
            aria-describedby={errors.entity_id ? 'entity_id-error' : undefined}
            className="rounded-lg border-neutral-300 text-sm transition-colors duration-fast focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-primary-700 dark:bg-primary-950 dark:focus:border-primary-400 dark:focus:ring-primary-800"
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
          <p id="entity_id-error" className="text-xs text-error-600 dark:text-error-400" role="alert">
            {errors.entity_id.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label
          htmlFor="email"
          className="flex items-center gap-2 text-sm font-semibold text-neutral-700 dark:text-neutral-200"
        >
          <FontAwesomeIcon
            icon={faEnvelope}
            className="text-primary-500 dark:text-primary-400"
            aria-hidden="true"
          />
          Correo Electrónico
        </Label>
        <TextInput
          type="email"
          id="email"
          {...register('email')}
          placeholder="correo@clinica.com"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          className="rounded-lg border-neutral-300 text-sm transition-colors duration-fast focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-primary-700 dark:bg-primary-950 dark:focus:border-primary-400 dark:focus:ring-primary-800"
        />
        {errors.email && (
          <p id="email-error" className="text-xs text-error-600 dark:text-error-400" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Contraseñas */}
      <div className="space-y-3">
        <Label className="flex items-center gap-2 text-sm font-semibold text-neutral-700 dark:text-neutral-200">
          <FontAwesomeIcon
            icon={faLock}
            className="text-primary-500 dark:text-primary-400"
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
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? 'password-error' : undefined}
            className="rounded-lg border-neutral-300 text-sm transition-colors duration-fast focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-primary-700 dark:bg-primary-950 dark:focus:border-primary-400 dark:focus:ring-primary-800"
          />
          {errors.password && (
            <p id="password-error" className="text-xs text-error-600 dark:text-error-400" role="alert">
              {errors.password.message}
            </p>
          )}
          <TextInput
            type="password"
            id="confirm-password"
            {...register('confirmPassword')}
            placeholder="Confirmar contraseña"
            aria-invalid={!!errors.confirmPassword}
            aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined}
            className="rounded-lg border-neutral-300 text-sm transition-colors duration-fast focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-primary-700 dark:bg-primary-950 dark:focus:border-primary-400 dark:focus:ring-primary-800"
          />
          {errors.confirmPassword && (
            <p id="confirm-password-error" className="text-xs text-error-600 dark:text-error-400" role="alert">
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
