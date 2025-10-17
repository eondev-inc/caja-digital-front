import { z } from 'zod';

/**
 * Esquema de validación para el cierre de caja (reconciliation).
 * Valida los datos antes de enviarlos al backend utilizando Zod.
 *
 * Campos validados:
 * - open_register_id: UUID del registro de caja abierto (string, requerido)
 * - closing_balance: Balance de cierre (number, requerido, no negativo)
 * - total_sales: Total de ventas (integer, requerido, no negativo)
 * - sales_summary: Resumen de ventas por método de pago (efectivo, débito, crédito; cada uno number, no negativo, por defecto 0)
 * - notes: Notas adicionales (string, opcional, máximo 500 caracteres)
 */

export const reconciliationSchema = z.object({
  open_register_id: z
    .string()
    .uuid('El ID del registro debe ser un UUID válido')
    .min(1, 'El ID del registro de caja es requerido'),
  
  closing_balance: z
    .number({
      required_error: 'El balance de cierre es requerido',
      invalid_type_error: 'El balance debe ser un número',
    })
    .nonnegative('El balance de cierre no puede ser negativo'),
  
  total_sales: z
    .number({
      required_error: 'El total de ventas es requerido',
      invalid_type_error: 'El total de ventas debe ser un número',
    })
    .int('El total de ventas debe ser un número entero')
    .nonnegative('El total de ventas no puede ser negativo'),
  
  sales_summary: z.object({
    efectivo: z
      .number({
        invalid_type_error: 'El monto de efectivo debe ser un número',
      })
      .nonnegative('El monto de efectivo no puede ser negativo')
      .default(0),
    
    debito: z
      .number({
        invalid_type_error: 'El monto de débito debe ser un número',
      })
      .nonnegative('El monto de débito no puede ser negativo')
      .default(0),
    
    credito: z
      .number({
        invalid_type_error: 'El monto de crédito debe ser un número',
      })
      .nonnegative('El monto de crédito no puede ser negativo')
      .default(0),
  }),
  
  notes: z
    .string()
    .max(500, 'Las notas no pueden exceder 500 caracteres')
    .optional()
    .or(z.literal('')),
});

/**
 * Schema para la entidad que se envía al endpoint de cálculo
 */
export const calculateReconciliationSchema = z.object({
  entity_id: z
    .string()
    .uuid('El ID de la entidad debe ser un UUID válido')
    .min(1, 'El ID de la entidad es requerido'),
});
