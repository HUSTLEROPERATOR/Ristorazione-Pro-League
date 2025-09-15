import { z } from 'zod';

export const registerSchema = z.object({
  email: z
    .string()
    .min(1, 'Email è obbligatorio')
    .email('Email non valida')
    .max(255, 'Email troppo lunga'),
  
  password: z
    .string()
    .min(8, 'Password deve essere di almeno 8 caratteri')
    .max(128, 'Password troppo lunga')
    .regex(/[A-Z]/, 'Password deve contenere almeno una lettera maiuscola')
    .regex(/[a-z]/, 'Password deve contenere almeno una lettera minuscola')
    .regex(/\d/, 'Password deve contenere almeno un numero')
    .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password deve contenere almeno un carattere speciale'),
  
  firstName: z
    .string()
    .min(1, 'Nome è obbligatorio')
    .max(50, 'Nome troppo lungo')
    .regex(/^[a-zA-ZÀ-ÿ\s''-]+$/, 'Nome contiene caratteri non validi'),
  
  lastName: z
    .string()
    .min(1, 'Cognome è obbligatorio')
    .max(50, 'Cognome troppo lungo')
    .regex(/^[a-zA-ZÀ-ÿ\s''-]+$/, 'Cognome contiene caratteri non validi'),
  
  role: z
    .enum(['USER', 'ADMIN', 'MODERATOR'])
    .default('USER')
    .optional()
});

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email è obbligatorio')
    .email('Email non valida'),
  
  password: z
    .string()
    .min(1, 'Password è obbligatoria')
});

export const refreshTokenSchema = z.object({
  refreshToken: z
    .string()
    .min(1, 'Refresh token è obbligatorio')
});

export const updateProfileSchema = z.object({
  firstName: z
    .string()
    .min(1, 'Nome è obbligatorio')
    .max(50, 'Nome troppo lungo')
    .regex(/^[a-zA-ZÀ-ÿ\s''-]+$/, 'Nome contiene caratteri non validi')
    .optional(),
  
  lastName: z
    .string()
    .min(1, 'Cognome è obbligatorio')
    .max(50, 'Cognome troppo lungo')
    .regex(/^[a-zA-ZÀ-ÿ\s''-]+$/, 'Cognome contiene caratteri non validi')
    .optional(),
  
  email: z
    .string()
    .email('Email non valida')
    .max(255, 'Email troppo lunga')
    .optional()
});

// Type exports
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;