import { z } from "zod";

export const cuisineSchema = {
  body: z.object({
    name: z.string().min(3, "Name must be at least 3 characters !!!").max(50, "Name cannot exceed 50 characters !!!"),
    description: z.string().min(10, "Description must be at least 10 characters !!!").max(500, "Description too long !!!"),
    image: z.string().url("Invalid URL format for image !!!"),
  }),
};