import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { transactionSchema } from '../../utils/transactionSchema';
import { Button, Card, Label, TextInput, Select, Textarea } from 'flowbite-react';
import { HiTrash, HiPlus } from 'react-icons/hi';

const Sales = () => {
  const [showFolioInput, setShowFolioInput] = useState(false);
  const [invoiceItems, setInvoiceItems] = useState([
    {
      description: '',
      professional_uuid: '',
      quantity: 1,
      total_price: 0,
      prevision_id: ''
    }
  ]);
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      open_register_id: '',
      amount: '',
      description: '',
      transaction_type_id: '',
      payment_method_id: '',
      folio: '',
      invoice: {
        custumer_nid: '',
        total_amount: '',
        notes: '',
        invoice_items: [
          {
            description: '',
            professional_uuid: '',
            quantity: 1,
            total_price: 0,
            prevision_id: ''
          }
        ]
      }
    }
  });

  const paymentMethod = watch('payment_method_id');

  // Show or hide folio input based on payment method
  useEffect(() => {
    const isBono = paymentMethod?.toLowerCase().includes('bono');
    setShowFolioInput(isBono);
  }, [paymentMethod]);

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
        professional_uuid: '',
        quantity: 1,
        total_price: 0,
        prevision_id: ''
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

  const onSubmit = (data) => {
    console.log('Form submitted:', data);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="Logo" className="w-16 h-16" />
            <h2 className="text-3xl font-bold">FACTURA</h2>
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
                <TextInput id="from" placeholder="Nombre o empresa" {...register('invoice.custumer_nid')} />
                {errors.invoice?.custumer_nid && (
                  <p className="text-sm text-red-500">{errors.invoice.custumer_nid.message}</p>
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
                  <TextInput type="text" placeholder="DD/MM/YYYY" />
                </div>
                <div>
                  <Label>Método de pago</Label>
                  <Select {...register('payment_method_id')}>
                    <option value="">Seleccionar</option>
                    <option value="1">Efectivo</option>
                    <option value="2">Tarjeta</option>
                    <option value="bono">Bono</option>
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
                  <Select {...register('invoice.invoice_items.0.professional_uuid')}>
                    <option value="">Seleccionar profesional</option>
                    <option value="1">Alberto Portillo</option>
                  </Select>
                  {errors.invoice?.invoice_items?.[0]?.professional_uuid && (
                    <p className="text-sm text-red-500">
                      {errors.invoice.invoice_items[0].professional_uuid.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label>Selecciona Previsión</Label>
                  <Select {...register('invoice.invoice_items.0.prevision_id')}>
                    <option value="">Seleccionar previsión</option>
                    <option value="1">Fonasa</option>
                  </Select>
                  {errors.invoice?.invoice_items?.[0]?.prevision_id && (
                    <p className="text-sm text-red-500">
                      {errors.invoice.invoice_items[0].prevision_id.message}
                    </p>
                  )}
                </div>
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
                    onChange={(e) => updateInvoiceItem(index, 'total_price', parseFloat(e.target.value))}
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
              Elemento en línea
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
                  <TextInput type="number" className="w-20" placeholder="0" />
                  <span>%</span>
                </div>
                <span>$0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total</span>
                <span className="text-xl font-bold">
                  ${invoiceItems.reduce((sum, item) => sum + (item.subtotal || 0), 0)}
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
