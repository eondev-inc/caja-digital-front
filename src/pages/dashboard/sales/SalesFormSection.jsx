import PropTypes from 'prop-types';
import { Button, Spinner } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoice, faTimes } from '@fortawesome/free-solid-svg-icons';
import SalesFormFields from '../../../components/Sales/SalesFormFields';
import ItemsTable from '../../../components/Sales/ItemsTable';
import NotesSection from '../../../components/Sales/NotesSection';
import SummaryCard from '../../../components/Sales/SummaryCard';

export const SalesFormSection = ({
  register,
  handleSubmit,
  control,
  errors,
  isValid,
  isSubmitting,
  paymentMethods,
  professionals,
  previsions,
  invoiceItems,
  addInvoiceItem,
  removeInvoiceItem,
  updateInvoiceItem,
  showFolioInput,
  onSubmit,
  handleCancel,
}) => {
  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <SalesFormFields
        control={control}
        register={register}
        errors={errors}
        paymentMethods={paymentMethods}
        showFolioInput={showFolioInput}
      />

      <ItemsTable
        items={invoiceItems}
        onAdd={addInvoiceItem}
        onRemove={removeInvoiceItem}
        onUpdate={updateInvoiceItem}
        professionals={professionals}
        previsions={previsions}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <NotesSection register={register} />
        <SummaryCard items={invoiceItems} />
      </div>

      <div className="flex justify-end gap-4">
        <input type="hidden" {...register('description')} />

        <Button
          type="button"
          color="gray"
          className="cursor-pointer"
          onClick={handleCancel}
        >
          <FontAwesomeIcon
            icon={faTimes}
            className="mr-2 size-4"
            aria-hidden="true"
          />
          Cancelar
        </Button>

        <Button
          type="submit"
          color="success"
          className="cursor-pointer"
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Spinner size="sm" className="mr-2" />
              Procesando...
            </>
          ) : (
            <>
              <FontAwesomeIcon
                icon={faFileInvoice}
                className="mr-2 size-4"
                aria-hidden="true"
              />
              Generar Comprobante Médico
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

SalesFormSection.propTypes = {
  register: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  control: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  isValid: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  paymentMethods: PropTypes.array.isRequired,
  professionals: PropTypes.array.isRequired,
  previsions: PropTypes.array.isRequired,
  invoiceItems: PropTypes.array.isRequired,
  addInvoiceItem: PropTypes.func.isRequired,
  removeInvoiceItem: PropTypes.func.isRequired,
  updateInvoiceItem: PropTypes.func.isRequired,
  showFolioInput: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};
