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
        className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300"
      >
        <FontAwesomeIcon icon={faHashtag} className="mr-1 text-primary-600" aria-hidden="true" />
        Número de Folio
      </Label>
      <TextInput id="folio" placeholder="Folio del bono" sizing="sm" {...register('folio')} />
      {errors.folio && (
        <p className="mt-0.5 text-xs text-red-600" role="alert">
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
