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
    ? invoice.invoice_items.map((it) => ({
        description: cleanString(it?.description) ?? '',
        quantity: Number(it?.quantity ?? 0),
        total_price: Number(it?.total_price ?? 0),
      }))
    : [];

  const payload = {
    open_register_id: cleanString(open_register_id),
    amount: Number(amount ?? 0),
    // description es opcional para la API; se envía solo si viene definida/no vacía
    transaction_type_id: cleanString(transaction_type_id),
    payment_method_id: cleanString(payment_method_id),
    invoice: {
      custumer_nid: cleanString(invoice.custumer_nid),
      total_amount: Number(invoice.total_amount ?? 0),
      invoice_items: items,
    },
  };

  if (isDefined(description)) payload.description = cleanString(description);
  if (isDefined(invoice.notes)) payload.invoice.notes = cleanString(invoice.notes);
  if (isDefined(folio)) payload.folio = cleanString(folio);

  return payload;
};

export const createTransaction = async (data) => {
  try {
    const payload = serializeTransactionPayload(data);
    const response = await axiosInstance.post('/transactions/create', payload);
    return response;
  } catch (error) {
    return error?.response?.data ?? { status: 0, message: 'Network or server error' };
  }
}; 