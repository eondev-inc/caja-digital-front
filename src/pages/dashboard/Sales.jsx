import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { transactionSchema, BONO_PAYMENT_METHOD_ID } from '../../utils/transactionSchema';
import { Button, Card, Alert } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoice, faTimes } from '@fortawesome/free-solid-svg-icons';
import { getPaymentMethods, getPrevisions, getProfessionals, createTransaction } from '../../api';
import { useStore } from '../../app/store';
import SalesHeader from '../../components/Sales/SalesHeader';
import CustomerSection from '../../components/Sales/CustomerSection';
import PaymentSection from '../../components/Sales/PaymentSection';
import ItemsTable from '../../components/Sales/ItemsTable';
import NotesSection from '../../components/Sales/NotesSection';
import SummaryCard from '../../components/Sales/SummaryCard';
import ConfirmModal from '../../components/Sales/ConfirmModal';
import ReceiptModal from '../../components/Sales/ReceiptModal';

const Sales = () => {
  const [showFolioInput, setShowFolioInput] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [previsions, setPrevisions] = useState([]);
  const [professionals, setProfessionals] = useState([]); // TODO: cargar desde API cuando esté disponible
  const { openRegister } = useStore();
  const [invoiceItems, setInvoiceItems] = useState([
    {
      description: '',
      quantity: 1,
      total_price: 0,
    }
  ]);

  const { register, handleSubmit, setValue, watch, control, reset, formState: { errors, isValid, isSubmitting } } = useForm({
    resolver: zodResolver(transactionSchema),
    mode: "onChange", // Cambio a onChange para validación más reactiva
    defaultValues: {
      invoice: {
        custumer_nid: '',
        custumer_name: '',
        professional_uuid: '',
        prevision_uuid: '',
        date: undefined,
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
  const [showConfirm, setShowConfirm] = useState(false);
  const [toast, setToast] = useState({ type: null, message: '' });
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  // Show or hide folio input based on payment method
  useEffect(() => {
    const isBono = paymentMethod === BONO_PAYMENT_METHOD_ID;

    setShowFolioInput(isBono);
  }, [paymentMethod]);

  useEffect(() => {
    const fetchData = async () => {
      const [methods, prevs, professionals] = await Promise.all([
        getPaymentMethods(),
        getPrevisions(),
        getProfessionals()
      ]);
      setPaymentMethods(methods);
      setPrevisions(prevs);
      setProfessionals(professionals);
      // TODO: setProfessionals(await getEntities()) si aplica
    };
    fetchData();

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

  const onSubmit = async () => {
    // Abrir confirmación con datos clave
    setShowConfirm(true);
  };

  const computeTotals = () => {
    const subtotal = invoiceItems.reduce((sum, item) => sum + (item.subtotal || 0), 0);
    const tax = subtotal * 0.19;
    const total = Math.round(subtotal + tax);
    return { subtotal, tax, total };
  };

  const confirmAndCreate = async () => {
    setShowConfirm(false);
    const formData = {
      ...watch(),
      amount: computeTotals().total,
      invoice: {
        ...watch('invoice'),
        total_amount: computeTotals().total,
        invoice_items: invoiceItems.map((item) => ({
          description: item.description,
          quantity: Number(item.quantity) || 1,
          total_price: Number(item.total_price) || 0,
        })),
      },
    };
    try {
      const response = await createTransaction(formData);
      if (response?.status === 201) {
        setToast({ type: 'success', message: 'Transacción creada exitosamente' });
        // Preparar datos para comprobante
        const { subtotal, tax, total } = computeTotals();
        const previsionId = watch('invoice.prevision_uuid');
        const previsionLabel = previsions.find((p) => p.id === previsionId)?.description;
        setReceiptData({
          invoice: watch('invoice'),
          items: invoiceItems,
          subtotal,
          tax,
          total,
          payment_method_label: paymentMethods.find((m) => m.id === paymentMethod)?.description,
          folio: watch('folio'),
          prevision_label: previsionLabel,
        });
        setShowReceipt(true);
        reset();
        setInvoiceItems([{ description: '', quantity: 1, total_price: 0 }]);
      } else {
        setToast({ type: 'error', message: 'Error al crear la transacción' });
      }
    } catch (error) {
      console.error('Error creating transaction:', error);
      setToast({ type: 'error', message: `Error al crear la transacción: ${error.message || 'Error desconocido'}` });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container mx-auto px-4 py-6">
        <Card className="mx-auto max-w-5xl border border-neutral-200 bg-white shadow-lg">
          <SalesHeader />

          <form className="space-y-5 p-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Información básica del cliente */}
            <CustomerSection register={register} control={control} errors={errors} />

            <PaymentSection
              register={register}
              errors={errors}
              paymentMethods={paymentMethods}
              showFolioInput={showFolioInput}
              professionals={professionals}
              previsions={previsions}
            />
            
            {/* Folio se gestiona dentro de PaymentSection */}

            <ItemsTable items={invoiceItems} onAdd={addInvoiceItem} onRemove={removeInvoiceItem} onUpdate={updateInvoiceItem} />

            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
              <NotesSection register={register} />
              <SummaryCard items={invoiceItems} />
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
                className="flex items-center bg-primary-500 px-8 py-3 text-white hover:bg-primary-600"
                disabled={!isValid || isSubmitting}
              >
                <FontAwesomeIcon icon={faFileInvoice} className="mr-2 size-4" />
                <span className='text-base'>Generar Comprobante Médico</span>
              </Button>
            </div>
          </form>

          <ConfirmModal
            open={showConfirm}
            onClose={() => setShowConfirm(false)}
            onConfirm={confirmAndCreate}
            dataPreview={{
              invoice: watch('invoice'),
              payment_method_label: paymentMethods.find((m) => m.id === paymentMethod)?.description,
              total: computeTotals().total,
            }}
          />

          {toast.type && (
            <div className="fixed bottom-6 right-6">
              <Alert color={toast.type === 'success' ? 'success' : 'failure'} onDismiss={() => setToast({ type: null, message: '' })}>
                {toast.message}
              </Alert>
            </div>
          )}

          <ReceiptModal open={showReceipt} onClose={() => setShowReceipt(false)} data={receiptData} />
        </Card>
      </div>
    </div>
  );
};

export default Sales;
