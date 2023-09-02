import { z } from "zod";

// AUTH
export const registerSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(100),
  email: z.string().email({ message: "Must provide a valid email address" }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters" })
    .max(30),
  // confirmPassword: z.string().min(5).max(10),
});

export type RegisterFormInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email({ message: "Must provide a valid email address" }),
  password: z.string().min(1, { message: "Must provide a password" }),
});

export type LoginFormInput = z.infer<typeof loginSchema>;

// CHATS
export const postChatSchema = z.object({
  userId: z.string().nonempty(),
});
