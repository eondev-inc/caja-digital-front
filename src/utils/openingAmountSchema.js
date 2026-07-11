import { z } from 'zod';

/**
 * Esquema de validación para apertura de caja.
 * Valida el monto inicial ingresado por el cajero.
 *
 * Campos validados:
 * - openingAmount: Monto inicial (número, requerido, mínimo 0)
 */
export const openingAmountSchema = z.object({
  openingAmount: z
    .string()
    .min(1, 'El monto inicial es obligatorio')
    .refine((val) => !isNaN(Number(val)), {
      message: 'El monto debe ser un número válido',
    })
    .refine((val) => Number(val) >= 0, {
      message: 'El monto no puede ser negativo',
    })
    .transform((val) => Number(val)),
});
