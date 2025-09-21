import { z } from 'zod';

// UUID del método de pago que requiere folio (Bono). Mantener sincronizado con la UI.
export const BONO_PAYMENT_METHOD_ID = '2a9c03ff-4d55-4f0a-b611-06ec999e5a36';

const invoiceItemSchema = z.object({
  description: z.string().min(1, 'La descripción es requerida'),
  quantity: z.coerce.number().min(1, 'La cantidad debe ser mayor a 0'),
  total_price: z.coerce.number().min(1, 'El precio debe ser mayor a 0'),
  // subtotal es derivado en UI; no se valida aquí.
});

const invoiceSchema = z.object({
  // Requeridos por la API
  custumer_nid: z.string().min(1, 'El RUT del cliente es requerido'),
  total_amount: z.coerce.number().min(1, 'El monto total debe ser mayor a 0'),
  notes: z.string().optional(),
  invoice_items: z.array(invoiceItemSchema).min(1, 'Debe agregar al menos un item'),

  // No requeridos por la API (opcionales en el formulario)
  custumer_name: z.string().optional(),
  professional_uuid: z.string().optional(),
  prevision_uuid: z.string().optional(),
  // La API puede aceptar una fecha generada por servidor; si se envía, permitimos string o Date
  date: z.union([z.string(), z.date()]).optional(),
});

export const transactionSchema = z
  .object({
    open_register_id: z.string().min(1, 'El registro de caja es requerido'),
    amount: z.coerce.number().min(1, 'El monto debe ser mayor a 0'),
    description: z.string().optional(),
    transaction_type_id: z.string().min(1, 'El tipo de transacción es requerido'),
    payment_method_id: z.string().min(1, 'El método de pago es requerido'),
    folio: z.string().optional(),
    invoice: invoiceSchema,
  })
  .refine(
    (data) => data.payment_method_id !== BONO_PAYMENT_METHOD_ID || !!data.folio,
    {
      path: ['folio'],
      message: 'El número de folio es requerido para este método de pago',
    }
  );