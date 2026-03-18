import { Label, Textarea } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

export default function NotesSection({ register }) {
  return (
    <div className="space-y-3">
      <Label className="flex items-center gap-2 text-sm font-medium text-secondary-700 dark:text-gray-300">
        <FontAwesomeIcon icon={faFileInvoice} className="text-primary-600" />
        Observaciones
        <span className="font-normal text-neutral-400">(Opcional)</span>
      </Label>
      <Textarea
        placeholder="Observaciones del tratamiento, instrucciones, próximas citas..."
        rows={5}
        className="rounded-lg border-neutral-300 focus:border-primary-500 focus:ring-primary-200"
        {...register('invoice.notes')}
      />
    </div>
  );
}

NotesSection.propTypes = {
  register: PropTypes.func.isRequired,
};
