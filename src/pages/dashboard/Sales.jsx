import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, Label, TextInput, Select, Textarea } from 'flowbite-react';
import { useStore } from '../../app/store';
import { transactionSchema } from '../../utils/transactionSchema';
import { ErrorModal } from '../../components/Commons/ErrorModal';
import { GeneralModal } from '../../components/Commons/GeneralModal';
import { createTransaction, getPaymentMethods, getPrevisions } from '../../api/';
import { HiTrash, HiPlus } from 'react-icons/hi';

const Sales = () => {
  const { openRegister } = useStore();
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [invoiceItems, setInvoiceItems] = useState([{
    description: '',
    professional_uuid: '',
    quantity: 1,
    total_price: 0,
    prevision_id: ''
  }]);
  const [previsions, setPrevisions] = useState([])
  const [paymentMethods, setPaymentMethods] = useState([])
  const [professionals, setProfessionals] = useState([])
  const [showFolioInput, setShowFolioInput] = useState(false);

  // Función para formatear números a formato CLP
  const formatToCLP = (number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(number);
  };

  // Función para convertir string formateado a número
  const parseFormattedNumber = (formattedString) => {
    return parseInt(formattedString.replace(/[^0-9]/g, '')) || 0;
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset
  } = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      open_register_id: openRegister.id,
      amount: 0,
      description: '',
      transaction_type_id: "e66064ea-fd72-49da-8503-95412af64f33", // ID fijo para ventas
      payment_method_id: '',
      folio: '',
      invoice: {
        custumer_nid: '',
        total_amount: 0,
        notes: '',
        invoice_items: invoiceItems
      }
    }
  });

  // Función para formatear la fecha a DD/MM/YYYY
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-CL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Función para convertir fecha de DD/MM/YYYY a ISOString
  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('/');
    return new Date(year, month - 1, day).toISOString();
  };

  // Efecto para calcular el monto total cuando cambien los items
  useEffect(() => {
    const totalAmount = invoiceItems.reduce((sum, item) => sum + (item.total_price || 0), 0);
    setValue('amount', totalAmount);
    setValue('invoice.total_amount', totalAmount);
  }, [invoiceItems, setValue]);

  useEffect(() => {
    const fetchPrevisions = async () => {
      const response = await getPrevisions();
      setPrevisions(response);
    }

    const fetchPaymentMethods = async () => {
      const response = await getPaymentMethods();
      setPaymentMethods(response)
    }

    const fetchProfessionals = async () => {
      const response = [
        {
          id: '1e852f2b-c696-4c11-9d88-1b8f31e16a01',
          name: "Alberto Portillo",
          uuid: '1e852f2b-c696-4c11-9d88-1b8f31e16a01'
        }
      ]

      setProfessionals(response)
    }
    fetchProfessionals();
    fetchPaymentMethods();
    fetchPrevisions();
  }
  , [])

  const addInvoiceItem = () => {
    setInvoiceItems([...invoiceItems, {
      description: '',
      professional_uuid: '',
      quantity: 1,
      total_price: 0,
      prevision_id: ''
    }]);
    // Limpiar la descripción de la transacción cuando se agrega un nuevo item
    setValue('description', '');
  };

  const removeInvoiceItem = (index) => {
    const newItems = invoiceItems.filter((_, i) => i !== index);
    setInvoiceItems(newItems);
    setValue(`invoice.invoice_items`, newItems);
    
    // Si queda solo un item, actualizar la descripción de la transacción con su descripción
    if (newItems.length === 1) {
      setValue('description', newItems[0].description);
    }
  };
  
  // Cambiar la lógica de actualización de invoiceItems para sincronizar correctamente con el formulario
  const updateInvoiceItem = (index, field, value) => {
    console.log('updateInvoiceItem', index, field, value);
    
    const updatedItems = [...invoiceItems] // Obtenemos los items actuales del formulario
    
    if (field === 'total_price') {
      // Convertir el valor formateado a número
      const numericValue = parseFormattedNumber(value);
      updatedItems[index] = { ...updatedItems[index], [field]: numericValue };
    } else {
      updatedItems[index] = { ...updatedItems[index], [field]: value };
    }


    // Si solo hay un item y se actualiza la descripción, actualizar también la descripción de la transacción
    if (updatedItems.length === 1 && field === 'description') {
      setValue('description', value);
    }

     // Actualizamos el estado local
     setInvoiceItems(updatedItems);
  };

  // Ajustar la lógica de validación y envío del formulario
  const onSubmit = async (data) => {
    try {
      console.log('Formulario enviado:', data);
      const response = await createTransaction(data);
      console.log('Respuesta del servidor:', response);

      if (response.status === 201) {
        // Limpiar el formulario
        setInvoiceItems([{
          description: '',
          professional_uuid: '',
          quantity: 1,
          total_price: 0,
          prevision_id: ''
        }]);
        reset();
        setShowFolioInput(false);
        setShowSuccess(true);
      } else {
        setShowError(true);
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setShowError(true);
    }
  };

  const handleCloseError = () => {
    setShowError(false);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  const handlePaymentMethodChange = (e) => {
    const selectedMethod = paymentMethods.find(method => method.id === e.target.value);
    setShowFolioInput(selectedMethod?.description?.toLowerCase().includes('bono'));
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
            <TextInput
              id="invoice_number"
              className="w-20"
              value="2"
              disabled
            />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-8">
            {/* Columna izquierda */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="from">Nombre de cliente</Label>
                <TextInput
                  id="from"
                  placeholder="Nombre o empresa"
                />
              </div>
              <div>
                <Label htmlFor="custumer_nid">Número de identificación</Label>
                <TextInput
                  id="custumer_nid"
                  {...register('invoice.custumer_nid')}
                  placeholder="RUT del cliente"
                />
                {errors.invoice?.custumer_nid && (
                  <p className="mx-1 text-left text-sm text-red-500">
                    {errors.invoice.custumer_nid.message}
                  </p>
                )}
              </div>
            </div>

            {/* Columna derecha */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Fecha</Label>
                  <TextInput
                    type="text"
                    value={formatDate(watch('invoice.date'))}
                    onChange={(e) => {
                      if (e.target.value) {
                        setValue('invoice.date', parseDate(e.target.value));
                      }
                    }}
                    placeholder="DD/MM/YYYY"
                  />
                </div>
                <div>
                  <Label>Método de pago</Label>
                  <Select 
                    {...register('payment_method_id')} 
                    onChange={handlePaymentMethodChange}
                  >
                    <option value="">Seleccionar</option>
                    {paymentMethods.map((method) => (
                      <option key={method.id} value={method.id}>
                        {method.description}
                      </option>
                    ))}
                  </Select>
                  {errors.payment_method_id && (
                    <p className="mx-1 text-left text-sm text-red-500">
                      {errors.payment_method_id.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Profesional</Label>
                  <Select
                    {...register('invoice.invoice_items.0.professional_uuid')}
                  >
                    <option value="">Seleccionar profesional</option>
                    {professionals.map((professional) => (
                      <option key={professional.id} value={professional.uuid}>
                        {professional.name}
                      </option>
                    ))}
                  </Select>
                  {errors.invoice?.invoice_items?.[0]?.professional_uuid && (
                    <p className="mx-1 text-left text-sm text-red-500">
                      {errors.invoice.invoice_items[0].professional_uuid.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label>Selecciona Previsión</Label>
                  <Select
                    {...register('invoice.invoice_items.0.prevision_id')}
                    className="w-full"
                  >
                    <option value="">Seleccionar previsión</option>
                    {previsions.map((prevision) => (
                      <option key={prevision.id} value={prevision.id}>
                        {prevision.name}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Tabla de items */}
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
                    value={item.description}
                    onKeyUp={(e) => { updateInvoiceItem(index, 'description', e.target.value) }}
                    placeholder="Descripción del servicio"
                    {...register(`invoice.invoice_items.${index}.description`)}
                  />
                </div>
                <div className="col-span-2">
                  <TextInput
                    type="number"
                    value={item.quantity}
                    className="text-center"
                    onChange={(e) => updateInvoiceItem(index, 'quantity', parseInt(e.target.value))}
                    {...register(`invoice.invoice_items.${index}.quantity`, { valueAsNumber: true })}
                  />
                </div>
                <div className="col-span-2">
                  <TextInput
                    type="text"
                    value={formatToCLP(item.total_price)}
                    className="text-center"
                    onChange={(e) => updateInvoiceItem(index, 'total_price', e.target.value)}
                    {...register(`invoice.invoice_items.${index}.total_price`, { valueAsNumber: true })}
                  />
                </div>
                <div className="col-span-2">
                  <TextInput
                    type="text"
                    value={formatToCLP(item.total_price * item.quantity)}
                    className="text-center"
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

            <Button
              type="button"
              color="gray"
              size="sm"
              onClick={addInvoiceItem}
              className="mt-4"
            >
              <HiPlus className="h-4 w-4 mr-2" />
              Elemento en línea
            </Button>
          </div>

          {/* Sección inferior */}
          <div className="grid grid-cols-2 gap-8 mt-8">
            <div>
              <Label>Notas</Label>
              <Textarea
                {...register('invoice.notes')}
                placeholder="Cualquier información relevante que no esté ya cubierta"
                rows={4}
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Subtotal</span>
                <span>{formatToCLP(watch('amount'))}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Impuesto</span>
                  <TextInput
                    type="number"
                    className="w-20"
                    placeholder="0"
                  />
                  <span>%</span>
                </div>
                <span>{formatToCLP(0)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total</span>
                <span className="text-xl font-bold">{formatToCLP(watch('amount'))}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <Button 
              type="submit"
              color="blue"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Registrando...' : 'Registrar Venta'}
            </Button>
          </div>
        </form>
      </Card>

      <ErrorModal
        show={showError}
        onClose={handleCloseError}
        message="Error al registrar la venta. Por favor, intente nuevamente."
      />

      <GeneralModal
        show={showSuccess}
        onClose={handleCloseSuccess}
        message="Venta registrada exitosamente."
      />
    </div>
  );
};

export default Sales;
