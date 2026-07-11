import { Label, TextInput, Select, Datepicker } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard, faUser, faCalendarAlt, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import { formatRut } from '../../../utils/rut';

/**
 * Custom theme for Datepicker to align input height with other sizing="sm" inputs.
 */
const datepickerSmTheme = {
  root: {
    input: {
      field: {
        input: {
          sizes: {
            sm: 'p-2 sm:text-xs',
            md: 'p-2 sm:text-xs',
          },
        },
      },
    },
  },
};

/**
 * Customer fields: RUT, name, date, payment method.
 */
const CustomerFields = ({ control, register, errors, paymentMethods }) => (
  <>
    {/* RUT */}
    <div>
      <Label
        htmlFor="custumer_nid"
        className="mb-1 block text-xs font-medium text-neutral-700 dark:text-neutral-300"
      >
        <FontAwesomeIcon icon={faIdCard} className="mr-1 text-primary-600 dark:text-primary-400" aria-hidden="true" />
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
            sizing="sm"
            color={errors.invoice?.custumer_nid ? 'failure' : 'gray'}
            aria-describedby={errors.invoice?.custumer_nid ? 'custumer_nid-error' : undefined}
            aria-invalid={!!errors.invoice?.custumer_nid}
            ref={ref}
            value={value ?? ''}
            onBlur={onBlur}
            onChange={(e) => onChange(formatRut(e.target.value))}
            className="transition-colors duration-fast focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200 dark:focus:border-primary-400 dark:focus:ring-primary-800"
          />
        )}
      />
      {errors.invoice?.custumer_nid && (
        <p id="custumer_nid-error" className="mt-0.5 text-xs text-error-500 dark:text-error-400" role="alert">
          {errors.invoice.custumer_nid.message}
        </p>
      )}
    </div>

    {/* Name */}
    <div>
      <Label
        htmlFor="custumer_name"
        className="mb-1 block text-xs font-medium text-neutral-700 dark:text-neutral-300"
      >
        <FontAwesomeIcon icon={faUser} className="mr-1 text-primary-600 dark:text-primary-400" aria-hidden="true" />
        Nombre del Paciente
      </Label>
      <Controller
        control={control}
        name="invoice.custumer_name"
        render={({ field }) => (
          <TextInput
            id="custumer_name"
            placeholder="Nombre completo"
            sizing="sm"
            color={errors.invoice?.custumer_name ? 'failure' : 'gray'}
            aria-describedby={errors.invoice?.custumer_name ? 'custumer_name-error' : undefined}
            aria-invalid={!!errors.invoice?.custumer_name}
            className="transition-colors duration-fast focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200 dark:focus:border-primary-400 dark:focus:ring-primary-800"
            {...field}
            value={field.value ?? ''}
          />
        )}
      />
      {errors.invoice?.custumer_name && (
        <p id="custumer_name-error" className="mt-0.5 text-xs text-error-500 dark:text-error-400" role="alert">
          {errors.invoice.custumer_name.message}
        </p>
      )}
    </div>

    {/* Date */}
    <div>
      <Label className="mb-1 block text-xs font-medium text-neutral-700 dark:text-neutral-300">
        <FontAwesomeIcon icon={faCalendarAlt} className="mr-1 text-primary-600 dark:text-primary-400" aria-hidden="true" />
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
            sizing="sm"
            theme={datepickerSmTheme}
          />
        )}
      />
      {errors.invoice?.date && (
        <p className="mt-0.5 text-xs text-error-500 dark:text-error-400" role="alert">
          {errors.invoice.date.message}
        </p>
      )}
    </div>

    {/* Payment Method */}
    <div>
      <Label
        htmlFor="payment_method_id"
        className="mb-1 block text-xs font-medium text-neutral-700 dark:text-neutral-300"
      >
        <FontAwesomeIcon icon={faCreditCard} className="mr-1 text-primary-600 dark:text-primary-400" aria-hidden="true" />
        Método de Pago
      </Label>
      <Select
        id="payment_method_id"
        sizing="sm"
        {...register('payment_method_id')}
        className="w-full transition-colors duration-fast focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200 dark:focus:border-primary-400 dark:focus:ring-primary-800"
      >
        <option value="">Seleccionar método</option>
        {paymentMethods.map((method) => (
          <option key={method.id} value={method.id}>
            {method.description}
          </option>
        ))}
      </Select>
      {errors.payment_method_id && (
        <p className="mt-0.5 text-xs text-error-500 dark:text-error-400" role="alert">
          {errors.payment_method_id.message}
        </p>
      )}
    </div>
  </>
);

CustomerFields.propTypes = {
  control: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  paymentMethods: PropTypes.array.isRequired,
};

export default CustomerFields;
