import { useState, useEffect } from 'react';
import { set, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { transactionSchema } from '../../utils/transactionSchema';
import { Button, Card, Label, TextInput, Select, Textarea, Datepicker } from 'flowbite-react';
import { HiTrash, HiPlus } from 'react-icons/hi';
import { getPaymentMethods, getPrevisions, createTransaction } from '../../api';
import { useStore } from '../../app/store';

const Sales = () => {
  const [showFolioInput, setShowFolioInput] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [formData, setFormData] = useState({});
  const { openRegister } = useStore();
  const [invoiceItems, setInvoiceItems] = useState([
    {
      description: '',
      quantity: 1,
      total_price: 0,
    }
  ]);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    resolver: zodResolver(transactionSchema),
    mode: "onBlur",
    defaultValues: formData
  });

  const paymentMethod = watch('payment_method_id');

  // Show or hide folio input based on payment method
  useEffect(() => {
    const isBono = paymentMethod?.toLowerCase().includes('bono');
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

  }, []);

  // Sync invoice items with react-hook-form
  useEffect(() => {
    setValue('invoice.invoice_items', invoiceItems);
  }, [invoiceItems, setValue]);

  // Function to calculate the total dynamically
  useEffect(() => {
    const total = invoiceItems.reduce((sum, item) => sum + (item.subtotal || 0), 0);
    setValue('invoice.total_amount', total); // Update the total_amount field in the form
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
      // Enviar los datos validados directamente
      const response = await createTransaction(data);
      if (response.status === 200) {
        alert('Transacción creada exitosamente');
      } else {
        alert('Error al crear la transacción');
      }
    } catch (error) {
      console.error('Error creating transaction:', error);
      alert('Error al crear la transacción');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="Logo" className="w-16 h-16" />
            <h2 className="text-3xl font-bold">Factura</h2>
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="invoice_number" className="whitespace-nowrap">#</Label>
            <TextInput id="invoice_number" className="w-20" value="2" disabled />
          </div>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <Label htmlFor="from">Nombre de cliente</Label>
                <TextInput id="from" placeholder="Nombre de persona"
                  {...register('invoice.custumer_name')}
                />
                {errors.invoice?.custumer_name && (
                  <p className="text-sm text-red-500">{errors.invoice.custumer_name.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="custumer_nid">Número de identificación</Label>
                <TextInput id="custumer_nid" placeholder="RUT del cliente" {...register('invoice.custumer_nid')} />
                {errors.invoice?.custumer_nid && (
                  <p className="text-sm text-red-500">{errors.invoice.custumer_nid.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Fecha</Label>
                  <Datepicker 
                    language="es-CL" 
                    labelTodayButton="Hoy" 
                    labelClearButton="Limpiar" 
                    value={watch('invoice.date')} 
                    onChange={(date) => setValue('invoice.date', date)} 
                  />
                </div>
                <div>
                  <Label>Método de pago</Label>
                  <Select {...register('payment_method_id')}>
                    <option value="">Seleccionar método de pago</option>
                    {paymentMethods.map((method) => (
                      <option key={method.id} value={method.id}>
                        {method.description}
                      </option>
                    ))}
                  </Select>
                  {errors.payment_method_id && (
                    <p className="text-sm text-red-500">{errors.payment_method_id.message}</p>
                  )}
                </div>
              </div>
              {showFolioInput && (
                <div>
                  <Label htmlFor="folio">Número de folio</Label>
                  <TextInput id="folio" placeholder="Folio" {...register('folio')} />
                  {errors.folio && (
                    <p className="text-sm text-red-500">{errors.folio.message}</p>
                  )}
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Profesional</Label>
                  <Select {...register('invoice.professional_uuid')}>
                    <option value="">Seleccionar profesional</option>
                    <option value="1">Alberto Portillo</option>
                    <option value="2">María González</option>
                    <option value="3">Juan Pérez</option>
                    <option value="4">Ana Torres</option>
                  </Select>
                  {errors.invoice?.professional_uuid && (
                    <p className="text-sm text-red-500">
                      {errors.invoice.professional_uuid.message}
                    </p>
                  )}
                </div>
                {/* <div>
                  <Label>Selecciona Previsión</Label>
                  <Select {...register('invoice.prevision_id')}>
                    <option value="">Seleccionar previsión</option>
                    {previsions.map((prevision) => (
                      <option key={prevision.id} value={prevision.id}>
                        {prevision.name}
                      </option>
                    ))}
                  </Select>
                  {errors.invoice?.invoice_items?.[0]?.prevision_id && (
                    <p className="text-sm text-red-500">
                      {errors.invoice.prevision_id.message}
                    </p>
                  )}
                </div> */}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="bg-gray-800 text-white grid grid-cols-12 gap-4 p-3 rounded-t-lg">
              <div className="col-span-5">Descripción</div>
              <div className="col-span-2 text-center">Cantidad</div>
              <div className="col-span-2 text-center">Precio</div>
              <div className="col-span-2 text-center">Subtotal</div>
              <div className="col-span-1"></div>
            </div>

            {invoiceItems.map((item, index) => (
              <div key={index} className="grid grid-cols-12 gap-4 p-3 border-b items-center">
                <div className="col-span-5">
                  <TextInput
                    placeholder="Descripción del servicio"
                    value={item.description}
                    onChange={(e) => updateInvoiceItem(index, 'description', e.target.value)}
                  />
                </div>
                <div className="col-span-2">
                  <TextInput
                    type="number"
                    className="text-center"
                    value={item.quantity}
                    onChange={(e) => updateInvoiceItem(index, 'quantity', parseInt(e.target.value, 10))}
                  />
                </div>
                <div className="col-span-2">
                  <TextInput
                    type="number"
                    className="text-center"
                    value={item.total_price}
                    onChange={(e) => updateInvoiceItem(index, 'total_price', parseInt(e.target.value))}
                  />
                </div>
                <div className="col-span-2">
                  <TextInput
                    type="text"
                    className="text-center"
                    value={item.subtotal || 0}
                    disabled
                  />
                </div>
                <div className="col-span-1 flex justify-center">
                  <Button
                    color="failure"
                    size="sm"
                    onClick={() => removeInvoiceItem(index)}
                    disabled={invoiceItems.length === 1}
                  >
                    <HiTrash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            <Button type="button" color="gray" size="sm" className="mt-4" onClick={addInvoiceItem}>
              <HiPlus className="h-4 w-4 mr-2" />
              Agregar item
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-8 mt-8">
            <div>
              <Label>Notas</Label>
              <Textarea placeholder="Cualquier información relevante que no esté ya cubierta" rows={4} {...register('invoice.notes')} />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Subtotal</span>
                <span>${invoiceItems.reduce((sum, item) => sum + (item.subtotal || 0), 0)}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Impuesto</span>
                  <TextInput type="number" className="w-20" placeholder="0" value={19} disabled/>
                  <span>%</span>
                </div>
                <span>$0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total</span>
                <span className="text-xl font-bold">
                  ${invoiceItems.reduce((sum, item) => parseInt(sum + (item.subtotal || 0) * 1.19), 0)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <Button type="submit" color="blue">
              Registrar Venta
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Sales;
