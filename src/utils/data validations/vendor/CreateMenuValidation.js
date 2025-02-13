import { z } from "zod";

export const createMenuValidation = {
    params : z.object({
        restaurantId : z.string().min(1 , "Restaurant Id is required and must be a positive number !!!"),
    }),
    body : z.object({
        menuName : z.string().min(3, "Menu Name must be at least 3 characters !!!").max(100, "Menu Name cannot exceed 100 characters !!!"),
        description : z.string().min(10, "Description must be at least 10 characters !!!").max(500, "Description cannot exceed 500 characters !!!"),
        isActive : z.boolean(),
        menuItems : z.array(    
            z.object({
                itemName: z.string().min(3, "Item Name must be at least 3 characters !!!").max(100, "Item Name cannot exceed 100 characters !!!"),
                itemPrice: z.number().positive("Price must be a positive number !!!").max(10000, "Price cannot exceed 10000 !!!"),
                quantity: z.number().min(1, "Quantity must be at least 1 !!!").max(1000, "Quantity cannot exceed 1000 !!!"),
                itemDescription: z.string().min(20 , "Item Description must be at least 20 characters !!!").max(500, "Item Description cannot exceed 500 characters !!!").optional(),
                isPureVeg: z.boolean(),
                isBestSeller: z.boolean(),
                itemImage: z.string().url("Invalid image URL format !!!"),
                itemCategory: z.enum(["MAIN_COURSE", "APPETIZER", "DESSERT", "BEVERAGE" , "SIDE"], "Invalid Category !!!"),
            })
        ).min(1 , "At least one menu item is required !!!"),
    }),
};