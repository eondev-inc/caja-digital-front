import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { transactionSchema, isBono } from '../../utils/transactionSchema';
import { Button, Card, Alert } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoice, faTimes } from '@fortawesome/free-solid-svg-icons';
import { getPaymentMethods, getPrevisions, getProfessionals, getTransactionTypes, createTransaction } from '../../api';
import { useStore } from '../../app/store';
import SalesHeader from '../../components/Sales/SalesHeader';
import CustomerSection from '../../components/Sales/CustomerSection';
import PaymentSection from '../../components/Sales/PaymentSection';
import ItemsTable from '../../components/Sales/ItemsTable';
import NotesSection from '../../components/Sales/NotesSection';
import SummaryCard from '../../components/Sales/SummaryCard';
import ConfirmModal from '../../components/Sales/ConfirmModal';
import ReceiptModal from '../../components/Sales/ReceiptModal';
import NoRegisterModal from '../../components/Commons/NoRegisterModal';

const EMPTY_ITEM = () => ({ description: '', quantity: 1, total_price: 0 });

const Sales = () => {
  const [showFolioInput, setShowFolioInput] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [previsions, setPrevisions] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [ventaTransactionTypeId, setVentaTransactionTypeId] = useState(null);
  const { openRegister } = useStore();
  const [showNoRegisterModal, setShowNoRegisterModal] = useState(false);
  const [invoiceItems, setInvoiceItems] = useState([EMPTY_ITEM()]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(transactionSchema),
    mode: 'onChange',
    defaultValues: {
      invoice: {
        custumer_nid: '',
        custumer_name: '',
        date: undefined,
        total_amount: 0,
        tax_amount: 0,
        notes: '',
        invoice_items: [],
      },
      description: 'Venta realizada',
      amount: 0,
      folio: '',
    },
  });

  const paymentMethod = watch('payment_method_id');
  const [showConfirm, setShowConfirm] = useState(false);
  const [toast, setToast] = useState({ type: null, message: '' });
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  // Helper para restaurar campos hidden después de reset
  const restoreHiddenFields = useCallback(() => {
    setValue('open_register_id', openRegister.id);
    if (ventaTransactionTypeId) {
      setValue('transaction_type_id', ventaTransactionTypeId);
    }
  }, [openRegister.id, ventaTransactionTypeId, setValue]);

  // Verificar si hay una caja abierta
  useEffect(() => {
    if (!openRegister?.id) {
      setShowNoRegisterModal(true);
    }
  }, [openRegister]);

  // Mostrar/ocultar input folio según método de pago
  useEffect(() => {
    const selected = paymentMethods.find((m) => m.id === paymentMethod);
    const isBonoMethod = isBono(selected?.method_name);
    setShowFolioInput(isBonoMethod);
    // Sincronizar payment_method_name para que el refine del schema funcione
    setValue('payment_method_name', selected?.method_name ?? '');
  }, [paymentMethod, paymentMethods, setValue]);

  // Cargar catálogos y setear campos hidden iniciales
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [methods, prevs, profs, txTypes] = await Promise.all([
          getPaymentMethods(),
          getPrevisions(),
          getProfessionals(),
          getTransactionTypes(),
        ]);
        setPaymentMethods(Array.isArray(methods) ? methods : []);
        setPrevisions(Array.isArray(prevs) ? prevs : []);
        setProfessionals(Array.isArray(profs) ? profs : []);

        const ventaType = Array.isArray(txTypes)
          ? txTypes.find((t) => t.transaction_name === 'VENTA')
          : null;
        if (ventaType) {
          setVentaTransactionTypeId(ventaType.id);
          setValue('transaction_type_id', ventaType.id);
        }
      } catch (error) {
        console.error('Error cargando catálogos:', error);
      }
    };

    fetchData();
    restoreHiddenFields();
  }, [openRegister.id, restoreHiddenFields, setValue]);

  // Sincronizar invoice items con react-hook-form
  useEffect(() => {
    setValue('invoice.invoice_items', invoiceItems);
  }, [invoiceItems, setValue]);

  // Recalcular totales cuando cambian los items
  useEffect(() => {
    const subtotal = invoiceItems.reduce((sum, item) => sum + (item.subtotal || 0), 0);
    const tax = Math.round(subtotal * 0.19);
    const total = subtotal + tax;
    setValue('invoice.total_amount', total);
    setValue('invoice.tax_amount', tax);
    setValue('amount', total);
  }, [invoiceItems, setValue]);

  const addInvoiceItem = () => {
    setInvoiceItems([...invoiceItems, EMPTY_ITEM()]);
  };

  const removeInvoiceItem = (index) => {
    setInvoiceItems(invoiceItems.filter((_, i) => i !== index));
  };

  const updateInvoiceItem = (index, field, value) => {
    const updatedItems = [...invoiceItems];

    if (field === 'quantity') {
      value = parseInt(value, 10) || 1;
    } else if (field === 'total_price') {
      value = parseInt(value, 10) || 0;
    }

    updatedItems[index] = { ...updatedItems[index], [field]: value };

    if (field === 'quantity' || field === 'total_price') {
      const quantity = updatedItems[index].quantity || 1;
      const totalPrice = updatedItems[index].total_price || 0;
      updatedItems[index].subtotal = quantity * totalPrice;
    }

    setInvoiceItems(updatedItems);
  };

  const onSubmit = () => {
    setShowConfirm(true);
  };

  const computeTotals = () => {
    const subtotal = invoiceItems.reduce((sum, item) => sum + (item.subtotal || 0), 0);
    const tax = Math.round(subtotal * 0.19);
    const total = subtotal + tax;
    return { subtotal, tax, total };
  };

  const confirmAndCreate = async () => {
    setShowConfirm(false);
    const { subtotal, tax, total } = computeTotals();

    const formData = {
      ...watch(),
      amount: total,
      invoice: {
        ...watch('invoice'),
        total_amount: total,
        tax_amount: tax,
        invoice_items: invoiceItems.map((item) => ({
          description: item.description,
          quantity: Number(item.quantity) || 1,
          total_price: Number(item.total_price) || 0,
          professional_uuid: item.professional_uuid || undefined,
          prevision_id: item.prevision_id || undefined,
        })),
      },
    };

    try {
      const response = await createTransaction(formData);
      if (response?.status === 201) {
        setToast({ type: 'success', message: 'Transacción creada exitosamente' });
        const previsionId = watch('invoice.prevision_uuid');
        const previsionLabel = previsions.find((p) => p.id === previsionId)?.name;
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
        setInvoiceItems([EMPTY_ITEM()]);
        restoreHiddenFields();
      } else {
        setToast({ type: 'error', message: 'Error al crear la transacción' });
      }
    } catch (error) {
      console.error('Error creating transaction:', error);
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        'Error desconocido';
      setToast({ type: 'error', message: `Error al crear la transacción: ${msg}` });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 py-6">
        <Card className="mx-auto max-w-5xl border border-neutral-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800">
          <SalesHeader />

          <form className="space-y-5 p-6" onSubmit={handleSubmit(onSubmit)}>
            <CustomerSection control={control} errors={errors} />

            <PaymentSection
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

            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
              <NotesSection register={register} />
              <SummaryCard items={invoiceItems} />
            </div>

            <div className="mt-8 flex flex-col justify-end gap-4 sm:flex-row">
              {/* Campos ocultos requeridos por el schema */}
              <input type="hidden" {...register('description')} />

              <Button
                type="button"
                size="md"
                color="gray"
                className="flex items-center px-4 py-3"
                onClick={() => {
                  reset();
                  setInvoiceItems([EMPTY_ITEM()]);
                  restoreHiddenFields();
                }}
              >
                <FontAwesomeIcon icon={faTimes} className="mr-2 size-4" />
                <span className="text-base text-gray-700 dark:text-gray-300">Cancelar</span>
              </Button>

              <Button
                type="submit"
                size="md"
                color="success"
                className="flex items-center px-8 py-3"
                disabled={!isValid || isSubmitting}
              >
                <FontAwesomeIcon icon={faFileInvoice} className="mr-2 size-4" />
                <span className="text-base">Generar Comprobante Médico</span>
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
              <Alert
                color={toast.type === 'success' ? 'success' : 'failure'}
                onDismiss={() => setToast({ type: null, message: '' })}
              >
                {toast.message}
              </Alert>
            </div>
          )}

          <ReceiptModal open={showReceipt} onClose={() => setShowReceipt(false)} data={receiptData} />
        </Card>

        <NoRegisterModal show={showNoRegisterModal} context="sales" />
      </div>
    </div>
  );
};

export default Sales;
