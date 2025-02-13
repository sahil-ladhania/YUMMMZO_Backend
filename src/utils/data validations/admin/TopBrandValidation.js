import { z } from "zod";

export const topBrandValidation = {
    body : z.object({
        image : z.string().url("Invalid URL format for image !!!"),
        name : z.string().min(3 , "Name must be at least 3 characters !!!").max(20 , "Name cannot exceed 20 characters !!!"),
    }),
}