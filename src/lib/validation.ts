// src/lib/validation.ts
// Input validation schemas with Zod

import { z } from 'zod';

/**
 * Email validation
 */
const emailSchema = z.string().email('Invalid email address').max(255);

/**
 * Password validation - min 12 chars, must include uppercase, lowercase, number, special char
 */
const passwordSchema = z
  .string()
  .min(12, 'Password must be at least 12 characters')
  .regex(/[A-Z]/, 'Password must include uppercase letter')
  .regex(/[a-z]/, 'Password must include lowercase letter')
  .regex(/[0-9]/, 'Password must include number')
  .regex(/[^A-Za-z0-9]/, 'Password must include special character');

/**
 * Signup validation
 */
export const signupSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  passwordConfirm: z.string(),
  companyName: z.string().min(2, 'Company name required').max(255),
}).refine((data) => data.password === data.passwordConfirm, {
  message: 'Passwords do not match',
  path: ['passwordConfirm'],
});

export type SignupInput = z.infer<typeof signupSchema>;

/**
 * Login validation
 */
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password required'),
});

export type LoginInput = z.infer<typeof loginSchema>;

/**
 * Password reset request validation
 */
export const resetPasswordRequestSchema = z.object({
  email: emailSchema,
});

export type ResetPasswordRequestInput = z.infer<typeof resetPasswordRequestSchema>;

/**
 * Password reset confirmation validation
 */
export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Invalid token'),
  password: passwordSchema,
  passwordConfirm: z.string(),
}).refine((data) => data.password === data.passwordConfirm, {
  message: 'Passwords do not match',
  path: ['passwordConfirm'],
});

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

/**
 * Company update validation
 */
export const updateCompanySchema = z.object({
  name: z.string().min(2, 'Company name required').max(255).optional(),
  billingEmail: emailSchema.optional(),
  billingAddress: z.string().max(500).optional(),
});

export type UpdateCompanyInput = z.infer<typeof updateCompanySchema>;

/**
 * Payment intent validation
 */
export const createPaymentIntentSchema = z.object({
  subscriptionId: z.string().uuid('Invalid subscription ID'),
  amount: z.number().int().positive('Amount must be positive'),
});

export type CreatePaymentIntentInput = z.infer<typeof createPaymentIntentSchema>;

/**
 * Support ticket validation
 */
export const createTicketSchema = z.object({
  subject: z.string().min(5, 'Subject required').max(255),
  description: z.string().min(10, 'Description must be at least 10 characters').max(5000),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
});

export type CreateTicketInput = z.infer<typeof createTicketSchema>;

/**
 * Validate input safely and return error message or parsed data
 */
export async function validateInput<T>(
  schema: z.ZodSchema,
  data: unknown
): Promise<{ success: true; data: T } | { success: false; errors: Record<string, string> }> {
  try {
    const parsed = await schema.parseAsync(data);
    return { success: true, data: parsed as T };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.errors.forEach((err) => {
        const path = err.path.join('.');
        errors[path] = err.message;
      });
      return { success: false, errors };
    }
    return { success: false, errors: { _general: 'Validation failed' } };
  }
}
