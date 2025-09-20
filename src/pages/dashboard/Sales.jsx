import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { transactionSchema } from '../../utils/transactionSchema';
import { Button, Card, Label, TextInput, Select, Textarea, Datepicker } from 'flowbite-react';
import { HiTrash, HiPlus } from 'react-icons/hi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFileInvoice, 
  faUser, 
  faCalendarAlt, 
  faCreditCard, 
  faPlus, 
  faTrash, 
  faIdCard,
  faUserMd,
  faCalculator,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { getPaymentMethods, createTransaction } from '../../api';
import { useStore } from '../../app/store';

const Sales = () => {
  const [showFolioInput, setShowFolioInput] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const { openRegister } = useStore();
  const [invoiceItems, setInvoiceItems] = useState([
    {
      description: '',
      quantity: 1,
      total_price: 0,
    }
  ]);

  const { register, handleSubmit, setValue, watch, formState: { errors, isValid } } = useForm({
    resolver: zodResolver(transactionSchema),
    mode: "onChange", // Cambio a onChange para validación más reactiva
    defaultValues: {
      invoice: {
        custumer_nid: '',
        professional_uuid: '',
        total_amount: 0,
        notes: '',
        invoice_items: []
      },
      description: 'Venta realizada', // Valor por defecto para description
      amount: 0,
      folio: ''
    }
  });

  const paymentMethod = watch('payment_method_id');

  // Show or hide folio input based on payment method
  useEffect(() => {
    const isBono = paymentMethod === '2a9c03ff-4d55-4f0a-b611-06ec999e5a36';

    setShowFolioInput(isBono);
  }, [paymentMethod]);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      const response = await getPaymentMethods();
      setPaymentMethods(response);
    }
    fetchPaymentMethods();

    // Set default values for the form
    setValue('open_register_id', openRegister.id);
    setValue('transaction_type_id', '5059e4f4-f111-4747-92b1-bdc1f069c1fb');

  }, [openRegister.id, setValue]);

  // Sync invoice items with react-hook-form
  useEffect(() => {
    setValue('invoice.invoice_items', invoiceItems);
  }, [invoiceItems, setValue]);

  // Function to calculate the total dynamically
  useEffect(() => {
    const total = invoiceItems.reduce((sum, item) => sum + (item.subtotal || 0), 0);
    setValue('invoice.total_amount', total); // Update the total_amount field in the form
    setValue('amount', total); // Keep transaction amount in sync
  }, [invoiceItems, setValue]);

  const addInvoiceItem = () => {
    setInvoiceItems([
      ...invoiceItems,
      {
        description: '',
        quantity: 1,
        total_price: 0,
      }
    ]);
  };

  const removeInvoiceItem = (index) => {
    setInvoiceItems(invoiceItems.filter((_, i) => i !== index));
  };

  // Function to update an invoice item
  const updateInvoiceItem = (index, field, value) => {
    const updatedItems = [...invoiceItems];
    
    // Convertir valores numéricos apropiadamente
    if (field === 'quantity') {
      value = parseInt(value, 10) || 1; // Asegurar que siempre sea al menos 1
    } else if (field === 'total_price') {
      value = parseFloat(value) || 0;
    }
    
    updatedItems[index] = { ...updatedItems[index], [field]: value };

    // Recalculate subtotal when quantity or total_price changes
    if (field === 'quantity' || field === 'total_price') {
      const quantity = updatedItems[index].quantity || 1;
      const totalPrice = updatedItems[index].total_price || 0;
      updatedItems[index].subtotal = quantity * totalPrice;
    }

    setInvoiceItems(updatedItems);
  };

  const onSubmit = async (data) => {
    try {
      // Asegurar que los datos estén en el formato correcto
      const formattedData = {
        ...data,
        amount: parseFloat(data.amount) || 0,
        invoice: {
          ...data.invoice,
          total_amount: parseFloat(data.invoice.total_amount) || 0,
          invoice_items: data.invoice.invoice_items.map(item => ({
            ...item,
            quantity: parseInt(item.quantity, 10) || 1,
            total_price: parseFloat(item.total_price) || 0
          }))
        }
      };

      console.log('Datos enviados:', formattedData);
      const response = await createTransaction(formattedData);
      
      if (response.status === 200) {
        alert('Transacción creada exitosamente');
        // Opcional: resetear el formulario
        // reset();
      } else {
        alert('Error al crear la transacción');
      }
    } catch (error) {
      console.error('Error creating transaction:', error);
      alert(`Error al crear la transacción: ${error.message || 'Error desconocido'}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <Card className="mx-auto max-w-5xl border border-gray-200 bg-white shadow-lg">
          <div className="mb-8 flex items-center justify-between rounded-t-lg border-b border-gray-200 bg-gray-50 p-6">
            <div className="flex items-center gap-4">
              <div className="flex size-16 items-center justify-center rounded-lg bg-green-500 shadow-sm">
                <FontAwesomeIcon icon={faFileInvoice} className="size-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Nueva Venta</h2>
                <p className="text-sm text-gray-600">Sistema de Facturación Médica</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-2 shadow-sm">
              <Label htmlFor="invoice_number" className="text-sm font-medium text-gray-600">Factura #</Label>
              <TextInput id="invoice_number" className="font-mono w-20 text-center" value="2" disabled />
            </div>
          </div>

        <form className="space-y-5 p-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Información básica del cliente - Compacta */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <Label htmlFor="custumer_nid" className="mb-1 block text-sm font-medium text-gray-700">
                <FontAwesomeIcon icon={faIdCard} className="mr-2 text-green-600" />
                RUT
              </Label>
              <TextInput 
                id="custumer_nid" 
                placeholder="12.345.678-9" 
                className="w-full"
                {...register('invoice.custumer_nid')} 
              />
              {errors.invoice?.custumer_nid && (
                <p className="mt-1 text-xs text-red-600">{errors.invoice.custumer_nid.message}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="from" className="mb-1 block text-sm font-medium text-gray-700">
                <FontAwesomeIcon icon={faUser} className="mr-2 text-green-600" />
                Nombre del Cliente
              </Label>
              <TextInput 
                id="from" 
                placeholder="Nombre completo del paciente"
                className="w-full"
                {...register('invoice.custumer_name')}
              />
              {errors.invoice?.custumer_name && (
                <p className="mt-1 text-xs text-red-600">{errors.invoice.custumer_name.message}</p>
              )}
            </div>
            
          </div>

          {/* Resto de campos distribuidos homogéneamente */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <Label className="mb-1 block text-sm font-medium text-gray-700">
                <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-green-600" />
                Fecha
              </Label>
              <Datepicker 
                language="es-CL" 
                labelTodayButton="Hoy" 
                labelClearButton="Limpiar" 
                value={watch('invoice.date')} 
                onChange={(date) => setValue('invoice.date', date)} 
                className="w-full"
              />
            </div>
            <div>
              <Label className="mb-1 block text-sm font-medium text-gray-700">
                <FontAwesomeIcon icon={faCreditCard} className="mr-2 text-green-600" />
                Método de Pago
              </Label>
              <Select {...register('payment_method_id')} className="w-full">
                <option value="">Seleccionar método</option>
                {paymentMethods.map((method) => (
                  <option key={method.id} value={method.id}>
                    {method.description}
                  </option>
                ))}
              </Select>
              {errors.payment_method_id && (
                <p className="mt-1 text-xs text-red-600">{errors.payment_method_id.message}</p>
              )}
            </div>
            <div>
              <Label className="mb-1 block text-sm font-medium text-gray-700">
                <FontAwesomeIcon icon={faUserMd} className="mr-2 text-blue-600" />
                Profesional
              </Label>
              <Select 
                className="w-full"
                {...register('invoice.professional_uuid')}
              >
                <option value="">Seleccionar profesional</option>
                <option value="1">Alberto Portillo</option>
                <option value="2">María González</option>
                <option value="3">Juan Pérez</option>
                <option value="4">Ana Torres</option>
              </Select>
              {errors.invoice?.professional_uuid && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.invoice.professional_uuid.message}
                </p>
              )}
            </div>
            <div>
              <Label className="mb-1 block text-sm font-medium text-gray-700">
                <FontAwesomeIcon icon={faIdCard} className="mr-2 text-blue-600" />
                Previsión
              </Label>
              <Select 
                className="w-full"
                {...register('invoice.prevision_uuid')}
              >
                <option value="">Seleccionar previsión</option>
                <option value="fonasa">FONASA</option>
                <option value="isapre">ISAPRE</option>
                <option value="particular">Particular</option>
              </Select>
              {errors.invoice?.prevision_uuid && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.invoice.prevision_uuid.message}
                </p>
              )}
            </div>
          </div>
          
          {/* Campo condicional */}
          {showFolioInput && (
            <div className="max-w-md">
              <Label htmlFor="folio" className="mb-1 block text-sm font-medium text-gray-700">
                <FontAwesomeIcon icon={faFileInvoice} className="mr-2 text-green-600" />
                Número de Folio
              </Label>
              <TextInput id="folio" placeholder="Folio" className="w-full" {...register('folio')} />
              {errors.folio && (
                <p className="mt-1 text-xs text-red-600">{errors.folio.message}</p>
              )}
            </div>
          )}

          <div className="mt-8 overflow-hidden rounded-lg bg-white shadow-md">
            <div className="bg-green-500 p-4 text-white">
              <h3 className="flex items-center gap-2 text-lg font-semibold">
                <FontAwesomeIcon icon={faFileInvoice} />
                Detalle de Servicios Médicos
              </h3>
            </div>
            <div className="grid grid-cols-12 gap-4 border-b bg-gray-50 p-4 font-medium text-gray-700">
              <div className="col-span-5 flex items-center gap-2">
                <FontAwesomeIcon icon={faUserMd} className="text-green-600" />
                Servicio/Tratamiento
              </div>
              <div className="col-span-2 text-center">Cantidad</div>
              <div className="col-span-2 text-center">Precio</div>
              <div className="col-span-2 text-center">Subtotal</div>
              <div className="col-span-1 text-center">Acción</div>
            </div>

            {invoiceItems.map((item, index) => (
              <div key={index} className="grid grid-cols-12 items-center gap-4 border-b border-gray-200 p-4 transition-colors hover:bg-gray-50">
                <div className="col-span-5">
                  <TextInput
                    placeholder="Ej: Consulta médica, Examen, Procedimiento..."
                    value={item.description}
                    className="rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500"
                    onChange={(e) => updateInvoiceItem(index, 'description', e.target.value)}
                  />
                </div>
                <div className="col-span-2">
                  <TextInput
                    type="number"
                    min="1"
                    className="rounded-lg border-gray-300 text-center focus:border-green-500 focus:ring-green-500"
                    value={item.quantity}
                    onChange={(e) => updateInvoiceItem(index, 'quantity', e.target.value)}
                  />
                </div>
                <div className="col-span-2">
                  <TextInput
                    type="number"
                    min="0"
                    step="0.01"
                    className="rounded-lg border-gray-300 text-center focus:border-green-500 focus:ring-green-500"
                    value={item.total_price}
                    placeholder="0.00"
                    onChange={(e) => updateInvoiceItem(index, 'total_price', e.target.value)}
                  />
                </div>
                <div className="col-span-2">
                  <TextInput
                    type="text"
                    className="border-gray-200 bg-gray-50 text-center font-semibold text-green-600"
                    value={`$${(item.subtotal || 0).toLocaleString('es-CL')}`}
                    disabled
                  />
                </div>
                <div className="col-span-1 flex justify-center">
                  <Button
                    color="failure"
                    size="sm"
                    onClick={() => removeInvoiceItem(index)}
                    disabled={invoiceItems.length === 1}
                    className="hover:bg-red-600 focus:ring-red-300"
                  >
                    <FontAwesomeIcon icon={faTrash} className="size-4" />
                  </Button>
                </div>
              </div>
            ))}
            
            <div className="border-t bg-gray-50 p-4">
              <Button 
                type="button" 
                color="light" 
                size="sm" 
                className="flex items-center border-green-200 bg-green-50 text-green-700 hover:bg-green-100 focus:ring-green-300" 
                onClick={addInvoiceItem}
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2 size-4" />
                <span>Agregar Servicio Médico</span>
              </Button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FontAwesomeIcon icon={faFileInvoice} className="text-green-600" />
                Observaciones
              </Label>
              <Textarea 
                placeholder="Observaciones del tratamiento, instrucciones especiales, próximas citas..."
                rows={5}
                className="rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500"
                {...register('invoice.notes')}
              />
            </div>

            <div className="space-y-4 rounded-lg border border-blue-200 bg-blue-50 p-6">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-blue-800">
                <FontAwesomeIcon icon={faCalculator} />
                Resumen de Costos
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-gray-700">
                  <span>Subtotal:</span>
                  <span className="font-medium">${invoiceItems.reduce((sum, item) => sum + (item.subtotal || 0), 0).toLocaleString('es-CL')}</span>
                </div>
                <div className="flex items-center justify-between text-gray-700">
                  <div className="flex items-center gap-2">
                    <span>Impuesto</span>
                    <TextInput type="number" className="w-16 text-center" placeholder="19" value={19} disabled/>
                    <span>%</span>
                  </div>
                  <span className="font-medium">${(invoiceItems.reduce((sum, item) => sum + (item.subtotal || 0), 0) * 0.19).toLocaleString('es-CL')}</span>
                </div>
                <div className="border-t border-blue-200 pt-3">
                  <div className="flex items-center justify-between text-xl font-bold text-blue-800">
                    <span>Total a Pagar:</span>
                    <span>${invoiceItems.reduce((sum, item) => parseInt(sum + (item.subtotal || 0) * 1.19), 0).toLocaleString('es-CL')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col justify-end gap-4 sm:flex-row">
            {/* Campo oculto para description requerido por el schema */}
            <input type="hidden" {...register('description')} />
            
            <Button 
              type="button"
              size='md'
              color="gray"
              className="flex items-center px-4 py-3"
            >
              <FontAwesomeIcon icon={faTimes} className="mr-2 size-4" />
              <span className='text-base text-gray-700'>Cancelar</span>
            </Button>
            
            <Button 
              type="submit"
              size='md'
              className="flex items-center bg-green-600 px-8 py-3 text-white hover:bg-green-700"
              disabled={Object.keys(errors).length > 0}
            >
              <FontAwesomeIcon icon={faFileInvoice} className="mr-2 size-4" />
              <span className='text-base'>Generar Comprobante Médico</span>
            </Button>
          </div>
        </form>
      </Card>
      </div>
    </div>
  );
};

export default Sales;
