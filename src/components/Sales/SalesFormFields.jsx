import CustomerFields from './fields/CustomerFields';
import ProductFields from './fields/ProductFields';
/**
 * Sección compacta de datos del cliente y método de pago.
 * Fila 1: RUT | Nombre | Fecha | Método de Pago
 * Fila 2 (condicional): Folio (solo si método es Bono)
 */
/* eslint-disable react/prop-types */
export default function SalesFormFields({
  control,
  register,
  errors,
  paymentMethods,
  showFolioInput,
}) {
  return (
    <div className="space-y-3">
      {/* Row 1: RUT | Name | Date | Payment Method */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <CustomerFields
          control={control}
          register={register}
          errors={errors}
          paymentMethods={paymentMethods}
        />
      </div>

      {/* Row 2: Folio (conditional) */}
      {showFolioInput && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
          <ProductFields register={register} errors={errors} showFolioInput={showFolioInput} />
        </div>
      )}
    </div>
  );
}
