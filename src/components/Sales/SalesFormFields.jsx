import { Label, TextInput, Select, Datepicker } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard, faUser, faCalendarAlt, faCreditCard, faHashtag } from '@fortawesome/free-solid-svg-icons';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import { formatRut } from '../../utils/rut';

/**
 * Tema personalizado para el Datepicker que alinea la altura del input
 * con los demás inputs sizing="sm" (p-2 sm:text-xs en lugar de p-2.5 text-sm).
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
 * Sección compacta de datos del cliente y método de pago.
 * Fila 1: RUT | Nombre | Fecha | Método de Pago
 * Fila 2 (condicional): Folio (solo si método es Bono)
 */
export default function SalesFormFields({
  control,
  register,
  errors,
  paymentMethods,
  showFolioInput,
}) {
  return (
    <div className="space-y-3">
      {/* Fila 1: RUT | Nombre | Fecha | Método de Pago */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {/* RUT */}
        <div>
          <Label
            htmlFor="custumer_nid"
            className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300"
          >
            <FontAwesomeIcon icon={faIdCard} className="mr-1 text-primary-600" aria-hidden="true" />
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
                ref={ref}
                value={value ?? ''}
                onBlur={onBlur}
                onChange={(e) => onChange(formatRut(e.target.value))}
              />
            )}
          />
          {errors.invoice?.custumer_nid && (
            <p className="mt-0.5 text-xs text-red-600" role="alert">
              {errors.invoice.custumer_nid.message}
            </p>
          )}
        </div>

        {/* Nombre */}
        <div>
          <Label
            htmlFor="custumer_name"
            className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300"
          >
            <FontAwesomeIcon icon={faUser} className="mr-1 text-primary-600" aria-hidden="true" />
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
                {...field}
                value={field.value ?? ''}
              />
            )}
          />
          {errors.invoice?.custumer_name && (
            <p className="mt-0.5 text-xs text-red-600" role="alert">
              {errors.invoice.custumer_name.message}
            </p>
          )}
        </div>

        {/* Fecha */}
        <div>
          <Label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">
            <FontAwesomeIcon icon={faCalendarAlt} className="mr-1 text-primary-600" aria-hidden="true" />
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
            <p className="mt-0.5 text-xs text-red-600" role="alert">
              {errors.invoice.date.message}
            </p>
          )}
        </div>

        {/* Método de Pago */}
        <div>
          <Label
            htmlFor="payment_method_id"
            className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300"
          >
            <FontAwesomeIcon icon={faCreditCard} className="mr-1 text-primary-600" aria-hidden="true" />
            Método de Pago
          </Label>
          <Select
            id="payment_method_id"
            sizing="sm"
            {...register('payment_method_id')}
            className="w-full"
          >
            <option value="">Seleccionar método</option>
            {paymentMethods.map((method) => (
              <option key={method.id} value={method.id}>
                {method.description}
              </option>
            ))}
          </Select>
          {errors.payment_method_id && (
            <p className="mt-0.5 text-xs text-red-600" role="alert">
              {errors.payment_method_id.message}
            </p>
          )}
        </div>
      </div>

      {/* Fila 2: Folio (solo si es Bono) */}
      {showFolioInput && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
          <div>
            <Label
              htmlFor="folio"
              className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300"
            >
              <FontAwesomeIcon icon={faHashtag} className="mr-1 text-primary-600" aria-hidden="true" />
              Número de Folio
            </Label>
            <TextInput
              id="folio"
              placeholder="Folio del bono"
              sizing="sm"
              {...register('folio')}
            />
            {errors.folio && (
              <p className="mt-0.5 text-xs text-red-600" role="alert">
                {errors.folio.message}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

SalesFormFields.propTypes = {
  control: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  paymentMethods: PropTypes.array.isRequired,
  showFolioInput: PropTypes.bool,
};
