import axiosInstance from '../axios';

// Serializa y limpia el payload para que coincida con lo que acepta la API
const cleanString = (v) => (typeof v === 'string' ? v.trim() : v);
const isDefined = (v) => v !== undefined && v !== null && !(typeof v === 'string' && v.trim() === '');

const serializeTransactionPayload = (data = {}) => {
  const {
    open_register_id,
    amount,
    description,
    transaction_type_id,
    payment_method_id,
    folio,
    invoice = {},
  } = data;

  const items = Array.isArray(invoice.invoice_items)
    ? invoice.invoice_items.map((it) => {
        const item = {
          description: cleanString(it?.description) ?? '',
          quantity: Number(it?.quantity ?? 0),
          total_price: Number(it?.total_price ?? 0),
        };
        if (isDefined(it?.professional_uuid)) item.professional_uuid = cleanString(it.professional_uuid);
        if (isDefined(it?.prevision_id)) item.prevision_id = cleanString(it.prevision_id);
        return item;
      })
    : [];

  const payload = {
    open_register_id: cleanString(open_register_id),
    amount: Number(amount ?? 0),
    transaction_type_id: cleanString(transaction_type_id),
    payment_method_id: cleanString(payment_method_id),
    invoice: {
      custumer_nid: cleanString(invoice.custumer_nid),
      total_amount: Number(invoice.total_amount ?? 0),
      tax_amount: Number(invoice.tax_amount ?? 0),
      invoice_items: items,
    },
  };

  if (isDefined(description)) payload.description = cleanString(description);
  if (isDefined(invoice.notes)) payload.invoice.notes = cleanString(invoice.notes);
  if (isDefined(folio)) payload.folio = cleanString(folio);

  return payload;
};

export const createTransaction = async (data) => {
  const payload = serializeTransactionPayload(data);
  const response = await axiosInstance.post('/transactions/create', payload);
  return response;
};
