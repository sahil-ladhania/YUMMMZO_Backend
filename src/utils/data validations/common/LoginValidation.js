import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email("Invalid email format !!!"),
    password: z.string().min(8, "Password must be at least 8 characters long !!!").max(20, "Password can't be longer than 20 characters !!!"),
});