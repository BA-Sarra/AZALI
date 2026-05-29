import { z } from 'zod';

export const orderCustomizationSchema = z.object({
  groupId: z.string().min(1),
  inputType: z.string().min(1),
  optionId: z.string().optional(),
  optionIds: z.array(z.string()).optional(),
  textValue: z.string().max(500).optional(),
  booleanValue: z.boolean().optional()
});

export const createOrderSchema = z.object({
  locale: z.enum(['fr', 'en']).default('fr'),
  termsAccepted: z.literal(true),
  customer: z.object({
    firstName: z.string().trim().min(2).max(80),
    lastName: z.string().trim().min(2).max(80),
    email: z.string().email().max(160),
    phone: z.string().trim().min(6).max(40),
    secondPhone: z.string().trim().max(40).optional().or(z.literal(''))
  }),
  address: z.object({
    addressLine: z.string().trim().min(5).max(240),
    city: z.string().trim().min(2).max(80),
    governorate: z.string().trim().min(2).max(80),
    postalCode: z.string().trim().max(20).optional().or(z.literal(''))
  }),
  notes: z.string().max(600).optional(),
  items: z.array(z.object({
    productId: z.string().min(1),
    colorId: z.string().optional(),
    quantity: z.coerce.number().int().min(1).max(20),
    customizations: z.array(orderCustomizationSchema).default([])
  })).min(1)
});
