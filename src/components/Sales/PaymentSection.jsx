import { Label, Select, TextInput } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

export default function PaymentSection({ register, errors, paymentMethods, showFolioInput }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div>
        <Label
          htmlFor="payment_method_id"
          className="mb-1 block text-sm font-medium text-secondary-700 dark:text-gray-300"
        >
          <FontAwesomeIcon icon={faCreditCard} className="mr-2 text-primary-600" aria-hidden="true" />
          Método de Pago
        </Label>
        <Select
          id="payment_method_id"
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
          <p className="mt-1 text-xs text-error-600" role="alert">
            {errors.payment_method_id.message}
          </p>
        )}
      </div>

      {showFolioInput && (
        <div>
          <Label
            htmlFor="folio"
            className="mb-1 block text-sm font-medium text-secondary-700 dark:text-gray-300"
          >
            Número de Folio
          </Label>
          <TextInput
            id="folio"
            placeholder="Folio"
            className="w-full"
            {...register('folio')}
          />
          {errors.folio && (
            <p className="mt-1 text-xs text-error-600" role="alert">
              {errors.folio.message}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

PaymentSection.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  paymentMethods: PropTypes.array.isRequired,
  showFolioInput: PropTypes.bool,
};
