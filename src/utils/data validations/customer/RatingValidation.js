import { z } from "zod";

export const ratingRestaurant = {
    params : z.object({ 
        userId : z.string().min(1 , "User Id is required and must be a positive number !!!"),
        orderId : z.string().min(1 , "Order Id is required and must be a positive number !!!"),
        restaurantId : z.string().min(1 , "Restaurant Id is required and must be a positive number !!!"),
    }),
    body : z.object({
        ratingType: z.enum(["RESTAURANT", "MENUITEM", "DELIVERY_PARTNER"], {
            message: "Invalid rating type. Allowed values: RESTAURANT, MENUITEM, DELIVERY_PARTNER",
        }),
        rating: z.number().min(0, { message: "Rating must be at least 0" }).max(5, { message: "Rating cannot be more than 5" }),
        review: z.string().min(10, { message: "Review must be at least 10 characters long" }).max(100, { message: "Review cannot exceed 100 characters" }),

    }),
};

export const ratingDeliveryPartner = {
    params : z.object({ 
        userId : z.string().min(1 , "User Id is required and must be a positive number !!!"),
        orderId : z.string().min(1 , "Order Id is required and must be a positive number !!!"),
        partnerId : z.string().min(1 , "Partner Id is required and must be a positive number !!!"),
    }),
    body : z.object({
        ratingType: z.enum(["RESTAURANT", "MENUITEM", "DELIVERY_PARTNER"], {
            message: "Invalid rating type. Allowed values: RESTAURANT, MENUITEM, DELIVERY_PARTNER",
        }),
        rating: z.number().min(0, { message: "Rating must be at least 0" }).max(5, { message: "Rating cannot be more than 5" }),
        review: z.string().min(10, { message: "Review must be at least 10 characters long" }).max(100, { message: "Review cannot exceed 100 characters" }),

    }),
};

export const ratingOrderedItem = {
    params : z.object({ 
        userId : z.string().min(1 , "User Id is required and must be a positive number !!!"),
        orderId : z.string().min(1 , "Order Id is required and must be a positive number !!!"),
        orderedItemId : z.string().min(1 , "Ordered Item Id is required and must be a positive number !!!"),
    }),
    body : z.object({
        ratingType: z.enum(["RESTAURANT", "MENUITEM", "DELIVERY_PARTNER"], {
            message: "Invalid rating type. Allowed values: RESTAURANT, MENUITEM, DELIVERY_PARTNER",
        }),
        rating: z.number().min(0, { message: "Rating must be at least 0" }).max(5, { message: "Rating cannot be more than 5" }),
        review: z.string().min(10, { message: "Review must be at least 10 characters long" }).max(100, { message: "Review cannot exceed 100 characters" }),

    }),
};