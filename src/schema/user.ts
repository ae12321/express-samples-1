import { z } from "zod";

export const SignupSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

export const AddressSchema = z.object({
  city: z.string(),
  zipcode: z.string().length(7),
});

export const updateUserSchema = z.object({
  name: z.string().nullable(),
  defaultShippingAddress: z.number().nullable(),
  defaultBillingAddress: z.number().nullable(),
});
