import { z } from 'zod';

export const signupSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters long !!!").max(20, "First name can't be longer than 20 characters !!!"),
    lastName: z.string().min(2, "Last name must be at least 2 characters long !!!").max(30, "Last name can't be longer than 30 characters !!!"),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 digits long !!!").max(10, "Phone number can't be longer than 10 digits !!!").regex(/^\d+$/, "Phone number must only contain digits !!!"),
    email: z.string().email("Invalid email format !!!"),
    password: z.string().min(8, "Password must be at least 8 characters long !!!").max(20, "Password can't be longer than 20 characters !!!"),
    role: z.enum(["CUSTOMER", "VENDOR" , "COURIER" , "ADMIN"], "Role must be either 'CUSTOMER' or 'VENDOR' or 'COURIER' or 'ADMIN' !!!")
});