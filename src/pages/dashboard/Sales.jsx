import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, Label, TextInput, Select, Textarea } from 'flowbite-react';
import { useStore } from '../../app/store';
import { transactionSchema } from '../../utils/transactionSchema';
import { ErrorModal } from '../../components/Commons/ErrorModal';
import { GeneralModal } from '../../components/Commons/GeneralModal';
import { createTransaction, getPaymentMethods, getPrevisions } from '../../api/';
import { HiTrash } from 'react-icons/hi';

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
      is_bono: false,
      folio: '',
      invoice: {
        custumer_nid: '',
        total_amount: 0,
        notes: '',
        invoice_items: invoiceItems
      }
    }
  });

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

  const updateInvoiceItem = (index, field, value) => {
    const newItems = [...invoiceItems];
    if (field === 'total_price') {
      // Convertir el valor formateado a número
      const numericValue = parseFormattedNumber(value);
      newItems[index] = { ...newItems[index], [field]: numericValue };
    } else {
      newItems[index] = { ...newItems[index], [field]: value };
    }
    setInvoiceItems(newItems);
    setValue(`invoice.invoice_items`, newItems);

    // Si solo hay un item y se actualiza la descripción, actualizar también la descripción de la transacción
    if (invoiceItems.length === 1 && field === 'description') {
      setValue('description', value);
    }
  };

  const onSubmit = async (data) => {
    try {
      const { is_bono, ...payload } = data;

      console.log('Formulario enviado:', payload);
      const response = await createTransaction(payload);
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
    const isBono = selectedMethod?.description?.toLowerCase().includes('bono');
    setShowFolioInput(isBono);
    setValue('is_bono', isBono);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <h2 className="text-2xl font-bold mb-6">Registrar Venta</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Información de la Factura */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Información de la Factura</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="custumer_nid">RUT del Cliente *</Label>
                <TextInput
                  id="custumer_nid"
                  {...register('invoice.custumer_nid')}
                  error={errors.invoice?.custumer_nid?.message}
                  placeholder="Ingrese el RUT del cliente"
                />
              </div>
              <div>
                <Label htmlFor="invoice_notes">Notas</Label>
                <Textarea
                  id="invoice_notes"
                  {...register('invoice.notes')}
                  error={errors.invoice?.notes?.message}
                  placeholder="Ingrese notas adicionales"
                />
              </div>
            </div>
          </div>

          {/* Items de la Factura */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Items de la Factura</h3>
            {invoiceItems.map((item, index) => (
              <div key={index} className="grid grid-cols-5 gap-4 mb-4 p-4 border rounded">
                <div className="flex flex-col">
                  <Label>Descripción *</Label>
                  <TextInput
                    value={item.description}
                    onChange={(e) => updateInvoiceItem(index, 'description', e.target.value)}
                    error={errors.invoice?.invoice_items?.[index]?.description?.message}
                    placeholder="Descripción del servicio"
                  />
                </div>
                <div className="flex flex-col">
                  <Label>Profesional *</Label>
                  <Select
                    value={item.professional_uuid}
                    onChange={(e) => updateInvoiceItem(index, 'professional_uuid', e.target.value)}
                    error={errors.invoice?.invoice_items?.[index]?.professional_uuid?.message}
                  >
                    <option value="">Seleccione un profesional</option>
                    {professionals.map((professional) => (
                      <option key={professional.id} value={professional.id}>
                        {professional.name}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="flex flex-col">
                  <Label>Precio Total *</Label>
                  <TextInput
                    type="text"
                    value={formatToCLP(item.total_price)}
                    onChange={(e) => updateInvoiceItem(index, 'total_price', e.target.value)}
                    onKeyDown={(e) => {
                      if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
                        e.preventDefault();
                      }
                    }}
                    error={errors.invoice?.invoice_items?.[index]?.total_price?.message}
                  />
                </div>
                <div className="flex flex-col">
                  <Label>Previsión *</Label>
                  <Select
                    value={item.prevision_id}
                    onChange={(e) => updateInvoiceItem(index, 'prevision_id', e.target.value)}
                    error={errors.invoice?.invoice_items?.[index]?.prevision_id?.message}
                  >
                    <option value="">Seleccione una previsión</option>
                    {previsions.map((prevision) => (
                      <option key={prevision.id} value={prevision.id}>
                        {prevision.name}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="flex flex-col">
                  <Label className="invisible">Eliminar</Label>
                  <Button
                    type="button"
                    color="failure"
                    size="sm"
                    onClick={() => removeInvoiceItem(index)}
                    disabled={invoiceItems.length === 1}
                    className="w-full"
                  >
                    <HiTrash className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            ))}
            <Button
              type="button"
              color="light"
              onClick={addInvoiceItem}
              className="mt-2"
            >
              Agregar Item
            </Button>
          </div>

          {/* Información de la Transacción */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div>
              <Label htmlFor="amount">Monto Total</Label>
              <TextInput
                id="amount"
                type="text"
                disabled
                value={formatToCLP(watch('amount'))}
                className="bg-gray-50"
              />
            </div>
            <div>
              <Label htmlFor="description">
                {invoiceItems.length === 1 ? 'Descripción (Sincronizada con el item)' : 'Descripción de la Transacción'}
              </Label>
              <TextInput
                id="description"
                {...register('description')}
                error={errors.description?.message}
                placeholder="Descripción de la transacción"
                disabled={invoiceItems.length === 1}
                className={invoiceItems.length === 1 ? 'bg-gray-50' : ''}
              />
            </div>
            <div>
              <Label htmlFor="payment_method_id">Método de Pago *</Label>
              <Select
                id="payment_method_id"
                {...register('payment_method_id')}
                error={errors.payment_method_id?.message}
                onChange={handlePaymentMethodChange}
              >
                <option value="">Seleccione un método</option>
                {paymentMethods.map((method) => (
                  <option key={method.id} value={method.id}>
                    {method.description}
                  </option>
                ))}
              </Select>
            </div>
            {showFolioInput && (
              <div>
                <Label htmlFor="folio">Número de Folio *</Label>
                <TextInput
                  id="folio"
                  {...register('folio')}
                  error={errors.folio?.message}
                  placeholder="Ingrese el número de folio del bono"
                />
              </div>
            )}
          </div>

          <div className="mt-6">
            <Button 
              type="submit" 
              color="blue" 
              className="w-full"
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
