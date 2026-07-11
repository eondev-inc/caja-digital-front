import { z } from 'zod';

/**
 * Esquema de validación para el cierre de caja (reconciliation).
 * Valida los datos antes de enviarlos al backend utilizando Zod.
 *
 * Campos validados:
 * - open_register_id: UUID del registro de caja abierto (string, requerido)
 * - closing_balance: Balance de cierre (number, requerido, no negativo)
 * - total_sales: Total de ventas (integer, requerido, no negativo)
 * - sales_summary: Resumen de ventas por método de pago, indexado por description
 *                  del método. Acepta cualquier clave string con valor numérico no negativo.
 *                  Ej: { 'Efectivo': 5000, 'Tarjeta de débito': 3000, 'Bono Papel': 1000 }
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
  
  sales_summary: z.record(
    z.string(),
    z.number({ invalid_type_error: 'El monto debe ser un número' })
      .nonnegative('El monto no puede ser negativo')
      .default(0),
  ),
  
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

/**
 * Schema de validación para el formulario de cierre de caja.
 * Valida los inputs del usuario (montos ingresados + notas).
 * Los montos vienen como string del input type="number" y se transforman a number.
 *
 * Campos validados:
 * - enteredAmounts: Objeto dinámico { [paymentMethodDescription]: amount }
 *                   Las claves son descriptions de métodos de pago activos.
 *                   Los valores se coercenan a número no negativo.
 * - notes: Notas opcionales (string, máximo 500 caracteres)
 */
export const closeRegisterFormSchema = z.object({
  enteredAmounts: z.record(
    z.string(),
    z
      .union([z.string(), z.number()])
      .transform((val) => (val === '' ? 0 : Number(val)))
      .pipe(z.number().nonnegative('El monto no puede ser negativo')),
  ),
  notes: z
    .string()
    .max(500, 'Las notas no pueden exceder 500 caracteres')
    .optional()
    .or(z.literal('')),
});
