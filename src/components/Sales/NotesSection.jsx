import { Label, Textarea } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

export default function NotesSection({ register }) {
  return (
    <div className="space-y-3">
      <Label className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
        <FontAwesomeIcon icon={faFileInvoice} className="text-primary-600 dark:text-primary-400" />
        Observaciones
        <span className="font-normal text-neutral-400 dark:text-neutral-500">(Opcional)</span>
      </Label>
      <Textarea
        placeholder="Observaciones del tratamiento, instrucciones, próximas citas..."
        rows={3}
        className="rounded-lg border-neutral-300 transition-colors duration-fast focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200 dark:focus:border-primary-400 dark:focus:ring-primary-800"
        {...register('invoice.notes')}
      />
    </div>
  );
}

NotesSection.propTypes = {
  register: PropTypes.func.isRequired,
};
