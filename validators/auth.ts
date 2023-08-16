import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Must be 3 or more characters long" })
    .max(100),
  email: z.string().email({ message: "Must provide a valid email address" }),
  password: z
    .string()
    .min(5, { message: "Must be 5 or more characters long" })
    .max(10),
  // confirmPassword: z.string().min(5).max(10),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Must provide a valid email address" }),
  password: z
    .string()
    .min(5, { message: "Must be 5 or more characters long" })
    .max(10),
});
