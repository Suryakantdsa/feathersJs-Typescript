import { z } from "zod";

export const UserSchema = z.object({
  id: z.number().optional(), // id is auto-incremented and not required on creation
  email: z.string().email("Invalid email format"), // Ensures the email is in a proper format
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }) // Password must be at least 1 character long
    .max(10,"error mess"),

  name: z.string().min(1, "Name required"), // Name must be at least 1 character long

  coverUrl: z.string().optional(), // Optional field, must be a string if provided

  avatarUrl: z.string().optional(), // Optional field, must be a string if provided

  blogCount: z
    .number()
    .int() // Ensures blogCount is an integer
    .nonnegative("Blog count cannot be negative") // Ensures blogCount is not negative
    .optional(),

  status: z
    .number()
    .int() // Ensures status is an integer
    .optional(),

  createdAt: z.date().optional(), // Date field, optional since it might be set by the DB
  updatedAt: z.date().optional(), // Date field, optional since it might be set by the DB
});

export const arryObj=UserSchema.array().nonempty("arry must not be empty!!")