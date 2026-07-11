import { Label, TextInput, Datepicker } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard, faUser, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import { formatRut } from '../../utils/rut';

export default function CustomerSection({ control, errors }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div>
        <Label htmlFor="custumer_nid" className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          <FontAwesomeIcon icon={faIdCard} className="mr-2 text-primary-600 dark:text-primary-400" />
          RUT
        </Label>
        <Controller
          control={control}
          name="invoice.custumer_nid"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextInput
              id="custumer_nid"
              placeholder="12.345.678-9"
              inputMode="text"
              autoComplete="off"
              maxLength={12}
              color={errors.invoice?.custumer_nid ? 'failure' : 'gray'}
              aria-describedby={errors.invoice?.custumer_nid ? 'custumer_nid-error' : undefined}
              aria-invalid={!!errors.invoice?.custumer_nid}
              className="w-full border-neutral-300 transition-colors duration-fast focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200 dark:focus:border-primary-400 dark:focus:ring-primary-800"
              ref={ref}
              value={value ?? ''}
              onBlur={onBlur}
              onChange={(e) => onChange(formatRut(e.target.value))}
            />
          )}
        />
        {errors.invoice?.custumer_nid && (
          <p id="custumer_nid-error" className="mt-1 text-xs text-error-500 dark:text-error-400" role="alert">{errors.invoice.custumer_nid.message}</p>
        )}
      </div>
      <div className="md:col-span-2">
        <Label htmlFor="custumer_name" className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          <FontAwesomeIcon icon={faUser} className="mr-2 text-primary-600 dark:text-primary-400" />
          Nombre del Cliente
        </Label>
        <Controller
          control={control}
          name="invoice.custumer_name"
          render={({ field }) => (
            <TextInput
              id="custumer_name"
              placeholder="Nombre completo del paciente"
              color={errors.invoice?.custumer_name ? 'failure' : 'gray'}
              aria-describedby={errors.invoice?.custumer_name ? 'custumer_name-error' : undefined}
              aria-invalid={!!errors.invoice?.custumer_name}
              className="w-full border-neutral-300 transition-colors duration-fast focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200 dark:focus:border-primary-400 dark:focus:ring-primary-800"
              {...field}
              value={field.value ?? ''}
            />
          )}
        />
        {errors.invoice?.custumer_name && (
          <p id="custumer_name-error" className="mt-1 text-xs text-error-500 dark:text-error-400" role="alert">{errors.invoice.custumer_name.message}</p>
        )}
      </div>

      <div>
        <Label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-primary-600 dark:text-primary-400" />
          Fecha
        </Label>
        <Controller
          control={control}
          name="invoice.date"
          render={({ field: { value, onChange } }) => (
            <Datepicker
              language="es-CL"
              labelTodayButton="Hoy"
              labelClearButton="Limpiar"
              value={value}
              onChange={(date) => onChange(date)}
              className="w-full"
            />
          )}
        />
        {errors.invoice?.date && (
          <p className="mt-1 text-xs text-error-500 dark:text-error-400" role="alert">{errors.invoice.date.message}</p>
        )}
      </div>
    </div>
  );
}

CustomerSection.propTypes = {
  control: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

