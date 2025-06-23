import { z } from 'zod';

const invoiceItemSchema = z.object({
  description: z.string().min(1, 'La descripción es requerida'),
  quantity: z.number().min(1, 'La cantidad debe ser mayor a 0'),
  total_price: z.number().min(1, 'El precio total debe ser mayor a 0'),
});

const invoiceSchema = z.object({
  customer_nid: z.string().min(1, 'El RUT del cliente es requerido'),
  customer_name: z.string().min(1, 'El nombre del cliente es requerido'),
  professional_uuid: z.string().min(1, 'El profesional es requerido'),
  total_amount: z.number().min(1, 'El monto total debe ser mayor a 0'),
  notes: z.string().optional(),
  invoice_items: z.array(invoiceItemSchema).min(1, 'Debe agregar al menos un item')
});

export const transactionSchema = z.object({
  open_register_id: z.string().min(1, 'El registro de caja es requerido'),
  amount: z.number().min(1, 'El monto debe ser mayor a 0'),
  description: z.string().optional(),
  transaction_type_id: z.string().min(1, 'El tipo de transacción es requerido'),
  payment_method_id: z.string().min(1, 'El método de pago es requerido'),
  folio: z.string().optional(),
  invoice: invoiceSchema
});