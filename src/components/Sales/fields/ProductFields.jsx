import { Label, TextInput } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHashtag } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

/**
 * Product fields: folio (conditional, shown only for Bono payment method).
 */
const ProductFields = ({ register, errors, showFolioInput }) => {
  if (!showFolioInput) return null;

  return (
    <div>
      <Label
        htmlFor="folio"
        className="mb-1 block text-xs font-medium text-neutral-700 dark:text-neutral-300"
      >
        <FontAwesomeIcon icon={faHashtag} className="mr-1 text-primary-600 dark:text-primary-400" aria-hidden="true" />
        Número de Folio
      </Label>
      <TextInput
        id="folio"
        placeholder="Folio del bono"
        sizing="sm"
        aria-describedby={errors.folio ? 'folio-error' : undefined}
        aria-invalid={!!errors.folio}
        className="transition-colors duration-fast focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200 dark:focus:border-primary-400 dark:focus:ring-primary-800"
        {...register('folio')}
      />
      {errors.folio && (
        <p id="folio-error" className="mt-0.5 text-xs text-error-500 dark:text-error-400" role="alert">
          {errors.folio.message}
        </p>
      )}
    </div>
  );
};

ProductFields.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  showFolioInput: PropTypes.bool,
};

export default ProductFields;
