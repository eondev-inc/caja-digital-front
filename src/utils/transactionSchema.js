import { z } from 'zod';
import { validateRut } from './rut';

/**
 * Determina si un método de pago requiere folio (número de bono).
 * Aplica a cualquier método cuyo method_name contenga 'BONO'.
 * @param {string} methodName - El campo method_name del método de pago
 * @returns {boolean}
 */
export const isBono = (methodName) =>
  typeof methodName === 'string' && methodName.toUpperCase().includes('BONO');

const invoiceItemSchema = z.object({
  description: z.string().min(1, 'La descripción es requerida'),
  quantity: z.coerce.number().min(1, 'La cantidad debe ser mayor a 0'),
  total_price: z.coerce.number().min(1, 'El precio debe ser mayor a 0'),
  // professional_uuid y prevision_id son opcionales por item
  professional_uuid: z.string().optional(),
  prevision_id: z.string().optional(),
  // subtotal es derivado en UI; no se valida aquí.
});

const invoiceSchema = z.object({
  // Requeridos por la API
  custumer_nid: z
    .string()
    .min(1, 'El RUT del cliente es requerido')
    .refine(validateRut, 'RUT inválido'),
  total_amount: z.coerce.number().min(1, 'El monto total debe ser mayor a 0'),
  tax_amount: z.coerce.number().optional(),
  notes: z.string().optional(),
  invoice_items: z.array(invoiceItemSchema).min(1, 'Debe agregar al menos un item'),

  // Opcionales del formulario, no enviados a la API
  custumer_name: z.string().optional(),
  date: z.union([z.string(), z.date()]).optional(),
});

export const transactionSchema = z
  .object({
    open_register_id: z.string().min(1, 'El registro de caja es requerido'),
    amount: z.coerce.number().min(1, 'El monto debe ser mayor a 0'),
    description: z.string().optional(),
    transaction_type_id: z.string().min(1, 'El tipo de transacción es requerido'),
    payment_method_id: z.string().min(1, 'El método de pago es requerido'),
    payment_method_name: z.string().optional(),
    folio: z.string().optional(),
    invoice: invoiceSchema,
  })
  .refine(
    (data) => !isBono(data.payment_method_name) || !!data.folio,
    {
      path: ['folio'],
      message: 'El número de folio es requerido para este método de pago',
    }
  );
