import { z } from 'zod';

const minLengthErrorMessage = 'Password must be at least 8 characters';
const maxLengthErrorMessage = 'Password must be max 16 characters';
const uppercaseErrorMessage = 'Password must contain at least one uppercase letter';
const lowercaseErrorMessage = 'Password must contain at least one lowercase letter';
const specialCharacterErrorMessage = 'Password must contain at least one special character';
const numberErrorMessage = 'Password must contain at least one number';
const passwordMismatchErrorMessage = 'Passwords do not match';


const passwordSchema = z
  .string()
  .min(8, { message: minLengthErrorMessage })
  .max(16, { message: maxLengthErrorMessage })
  .refine((password) => /[A-Z]/.test(password), {
    message: uppercaseErrorMessage,
  })
  .refine((password) => /[a-z]/.test(password), {
    message: lowercaseErrorMessage,
  })
  .refine((password) => /[0-9]/.test(password), { message: numberErrorMessage })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    message: specialCharacterErrorMessage,
  });


export const schema = z.object({
  surnames: z.string().min(1, 'Name is required').max(30),
  forenames: z.string().min(1, 'Forename is required').max(30),
  nidType: z.enum(['rut', 'pasaporte']),
  nid: z.string().min(1, 'NID is required').max(12),
  email: z.string().email('Invalid email address'),
  password: passwordSchema,
  confirmPassword: z.string(),
  checkBox: z.boolean('You must accept the terms and conditions'),
})
.refine((data) => data.password === data.confirmPassword, {
  message: passwordMismatchErrorMessage,
  path: ['confirmPassword'],
});