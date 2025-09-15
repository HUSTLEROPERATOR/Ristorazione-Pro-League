import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.string().email(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  password: z.string().min(6).optional(),
});

export const updateUserSchema = z.object({
  email: z.string().email().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  password: z.string().min(6).optional(),
  isActive: z.boolean().optional(),
  role: z.string().optional(),
});

export const createRestaurantSchema = z.object({
  name: z.string().min(1),
  address: z.string().optional(),
  city: z.string().optional(),
  region: z.string().optional(),
  postalCode: z.string().optional(),
  cuisine: z.array(z.string()).optional(),
  priceRange: z.string().optional(),
  ownerId: z.string().optional(),
});

export const updateRestaurantSchema = z.object({
  name: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  region: z.string().optional(),
  postalCode: z.string().optional(),
  cuisine: z.array(z.string()).optional(),
  priceRange: z.string().optional(),
  ownerId: z.string().optional(),
});

export function extractValidationError(err: any) {
  if (err && err.errors) {
    return err.errors.map((e: any) => ({ path: e.path, message: e.message }));
  }
  return [{ message: 'Invalid payload' }];
}
