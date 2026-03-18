import { z } from 'zod';

const passwordSchema = z
  .string()
  .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  .max(16, { message: 'La contraseña debe tener máximo 16 caracteres' })
  .refine((password) => /[A-Z]/.test(password), {
    message: 'La contraseña debe contener al menos una letra mayúscula',
  })
  .refine((password) => /[a-z]/.test(password), {
    message: 'La contraseña debe contener al menos una letra minúscula',
  })
  .refine((password) => /[0-9]/.test(password), {
    message: 'La contraseña debe contener al menos un número',
  })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    message: 'La contraseña debe contener al menos un carácter especial (!@#$%^&*)',
  });

export const schema = z
  .object({
    forenames: z.string().min(1, 'Los nombres son requeridos').max(30),
    surnames: z.string().min(1, 'Los apellidos son requeridos').max(30),
    nid: z.string().min(1, 'El RUT es requerido').max(12),
    email: z.string().email('Correo electrónico inválido'),
    entity_id: z.string().min(1, 'Debe seleccionar un centro de salud'),
    password: passwordSchema,
    confirmPassword: z.string(),
    checkBox: z.boolean().refine((val) => val === true, {
      message: 'Debe aceptar los términos y condiciones',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });
