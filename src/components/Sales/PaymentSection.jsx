import { Label, Select, TextInput } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faUserMd, faIdCard } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

export default function PaymentSection({ register, errors, paymentMethods, showFolioInput, professionals, previsions }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div>
        <Label htmlFor="payment_method_id" className="mb-1 block text-sm font-medium text-secondary-700">
          <FontAwesomeIcon icon={faCreditCard} className="mr-2 text-primary-600" aria-hidden="true" />
          Método de Pago
        </Label>
        <Select id="payment_method_id" {...register('payment_method_id')} className="w-full">
          <option value="">Seleccionar método</option>
          {paymentMethods.map((method) => (
            <option key={method.id} value={method.id}>
              {method.description}
            </option>
          ))}
        </Select>
        {errors.payment_method_id && (
          <p className="mt-1 text-xs text-error-600">{errors.payment_method_id.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="professional_uuid" className="mb-1 block text-sm font-medium text-secondary-700">
          <FontAwesomeIcon icon={faUserMd} className="mr-2 text-secondary-600" aria-hidden="true" />
          Profesional
        </Label>
        <Select id="professional_uuid" className="w-full" {...register('invoice.professional_uuid')}>
          <option value="">Seleccionar profesional</option>
          {professionals?.map((prof) => (
            <option key={prof.id} value={prof.id}>{prof.professional_name}</option>
          ))}
        </Select>
        {errors.invoice?.professional_uuid && (
          <p className="mt-1 text-xs text-error-600">{errors.invoice.professional_uuid.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="prevision_uuid" className="mb-1 block text-sm font-medium text-secondary-700">
          <FontAwesomeIcon icon={faIdCard} className="mr-2 text-secondary-600" aria-hidden="true" />
          Previsión
        </Label>
        <Select id="prevision_uuid" className="w-full" {...register('invoice.prevision_uuid')}>
          <option value="">Seleccionar previsión</option>
          {previsions?.map((prev) => (
            <option key={prev.id} value={prev.id}>{prev.description}</option>
          ))}
        </Select>
        {errors.invoice?.prevision_uuid && (
          <p className="mt-1 text-xs text-error-600">{errors.invoice.prevision_uuid.message}</p>
        )}
      </div>
      {showFolioInput && (
        <div>
          <Label htmlFor="folio" className="mb-1 block text-sm font-medium text-secondary-700">
            Número de Folio
          </Label>
          <TextInput id="folio" placeholder="Folio" className="w-full" {...register('folio')} />
          {errors.folio && (
            <p className="mt-1 text-xs text-error-600">{errors.folio.message}</p>
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
  professionals: PropTypes.array,
  previsions: PropTypes.array
};
