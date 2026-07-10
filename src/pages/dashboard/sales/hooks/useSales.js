import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { transactionSchema, isBono } from '../../../../utils/transactionSchema';
import { createTransaction } from '../../../../api';
import { useSalesCatalogs } from './useSalesCatalogs';

const EMPTY_ITEM = () => ({ description: '', quantity: 1, total_price: 0 });

export const useSales = () => {
  const { paymentMethods, previsions, professionals, ventaTransactionTypeId, openRegister } = useSalesCatalogs();

  const [showFolioInput, setShowFolioInput] = useState(false);
  const [showNoRegisterModal, setShowNoRegisterModal] = useState(false);
  const [invoiceItems, setInvoiceItems] = useState([EMPTY_ITEM()]);

  const { register, handleSubmit, setValue, watch, control, reset, formState: { errors, isValid, isSubmitting } } = useForm({
    resolver: zodResolver(transactionSchema),
    mode: 'onChange',
    defaultValues: {
      invoice: { custumer_nid: '', custumer_name: '', date: undefined, total_amount: 0, tax_amount: 0, notes: '', invoice_items: [] },
      description: 'Venta realizada',
      amount: 0,
      folio: '',
    },
  });

  const paymentMethod = watch('payment_method_id');
  const [showConfirm, setShowConfirm] = useState(false);
  const [alert, setAlert] = useState({ type: null, message: '' });
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  const restoreHiddenFields = () => {
    setValue('open_register_id', openRegister.id);
    if (ventaTransactionTypeId) setValue('transaction_type_id', ventaTransactionTypeId);
  };

  useEffect(() => {
    if (!openRegister?.id) setShowNoRegisterModal(true);
  }, [openRegister]);

  useEffect(() => {
    const selected = paymentMethods.find((m) => m.id === paymentMethod);
    setShowFolioInput(isBono(selected?.method_name));
    setValue('payment_method_name', selected?.method_name ?? '');
  }, [paymentMethod, paymentMethods, setValue]);

  useEffect(() => {
    restoreHiddenFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openRegister.id, ventaTransactionTypeId]);

  useEffect(() => { setValue('invoice.invoice_items', invoiceItems); }, [invoiceItems, setValue]);

  useEffect(() => {
    const subtotal = invoiceItems.reduce((sum, item) => sum + (item.subtotal || 0), 0);
    const tax = Math.round(subtotal * 0.19);
    setValue('invoice.total_amount', subtotal + tax);
    setValue('invoice.tax_amount', tax);
    setValue('amount', subtotal + tax);
  }, [invoiceItems, setValue]);

  const addInvoiceItem = () => setInvoiceItems([...invoiceItems, EMPTY_ITEM()]);
  const removeInvoiceItem = (index) => setInvoiceItems(invoiceItems.filter((_, i) => i !== index));

  const updateInvoiceItem = (index, field, value) => {
    const items = [...invoiceItems];
    if (field === 'quantity') value = parseInt(value, 10) || 1;
    else if (field === 'total_price') value = parseInt(value, 10) || 0;
    items[index] = { ...items[index], [field]: value };
    if (field === 'quantity' || field === 'total_price') {
      items[index].subtotal = (items[index].quantity || 1) * (items[index].total_price || 0);
    }
    setInvoiceItems(items);
  };

  const computeTotals = () => {
    const subtotal = invoiceItems.reduce((sum, item) => sum + (item.subtotal || 0), 0);
    const tax = Math.round(subtotal * 0.19);
    return { subtotal, tax, total: subtotal + tax };
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
        const previsionId = watch('invoice.prevision_uuid');
        setReceiptData({
          invoice: watch('invoice'),
          items: invoiceItems,
          subtotal,
          tax,
          total,
          payment_method_label: paymentMethods.find((m) => m.id === paymentMethod)?.description,
          folio: watch('folio'),
          prevision_label: previsions.find((p) => p.id === previsionId)?.name,
        });
        setShowReceipt(true);
        setAlert({ type: 'success', message: 'Transacción creada exitosamente' });
        reset();
        setInvoiceItems([EMPTY_ITEM()]);
        restoreHiddenFields();
      } else {
        setAlert({ type: 'error', message: 'Error al crear la transacción' });
      }
    } catch (error) {
      console.error('Error creating transaction:', error);
      const msg = error?.response?.data?.message || error?.message || 'Error desconocido';
      setAlert({ type: 'error', message: `Error al crear la transacción: ${msg}` });
    }
  };

  return {
    register, handleSubmit, watch, control, errors, isValid, isSubmitting,
    paymentMethod, showFolioInput, paymentMethods, previsions, professionals,
    invoiceItems, addInvoiceItem, removeInvoiceItem, updateInvoiceItem,
    showConfirm, setShowConfirm, alert, setAlert, showReceipt, setShowReceipt, receiptData, showNoRegisterModal,
    onSubmit: () => setShowConfirm(true),
    confirmAndCreate,
    computeTotals,
    handleCancel: () => { reset(); setInvoiceItems([EMPTY_ITEM()]); restoreHiddenFields(); },
  };
};
