import { z } from 'zod';

const invoiceItemSchema = z.object({
  description: z.string().min(1, 'La descripción es requerida'),
  professional_uuid: z.string().min(1, 'El profesional es requerido'),
  quantity: z.number().min(1, 'La cantidad debe ser mayor a 0'),
  total_price: z.number().min(1, 'El precio total debe ser mayor a 0'),
  prevision_id: z.string().min(1, 'La previsión es requerida')
});

const invoiceSchema = z.object({
  custumer_nid: z.string().min(1, 'El RUT del cliente es requerido'),
  total_amount: z.number().min(1, 'El monto total debe ser mayor a 0'),
  notes: z.string().optional(),
  invoice_items: z.array(invoiceItemSchema).min(1, 'Debe agregar al menos un item')
});

export const transactionSchema = z.object({
  open_register_id: z.string().min(1, 'El registro de caja es requerido'),
  amount: z.number().min(1, 'El monto debe ser mayor a 0'),
  description: z.string().min(1, 'La descripción es requerida'),
  transaction_type_id: z.string().min(1, 'El tipo de transacción es requerido'),
  payment_method_id: z.string().min(1, 'El método de pago es requerido'),
  folio: z.string().optional().refine((val, ctx) => {
    const isBono = ctx.parent.payment_method_id?.toLowerCase().includes('bono');
    if (isBono && !val) {
      return false;
    }
    return true;
  }, 'El número de folio es requerido para bonos'),
  invoice: invoiceSchema
});