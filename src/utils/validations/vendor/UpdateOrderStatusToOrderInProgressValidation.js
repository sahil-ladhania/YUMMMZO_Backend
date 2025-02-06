import { z } from "zod";

export const updateOrderStatusToOrderInProgressValidation = {
    params : z.object({
        restaurantId : z.string().min(1 , "Restaurant Id is required and must be a positive number !!!"),
        orderId : z.string().min(1 , "Order Id is required and must be a positive number !!!"),
    }),
    body : z.object({
        orderItems : z.array(
            z.object({
                menuItemId : z.number().min(1 , "Menu Item Id is required and must be a positive number !!!"),
                quantity: z.number().positive("Quantity must be at least 1 !!!"),
                itemPrice: z.number().positive("Item Price must be a positive number !!!"),
                totalPrice: z.number().positive("Total Price must be a positive number !!!")
            })
        ).min(1, "Order must have at least one item !!!"),
        totalPrice : z.number().positive("Total Price must be a positive number !!!"),
        orderStatus : z.enum(["IN_PROGRESS"], {
            message: "Invalid Order Status !!!"
        }),
        userAddress : z.string().min(5, "User Address is required and must be minimum of 5 chracters !!!"),
        restaurantAddress : z.string().min(5, "Restaurant Address is required and must be minimum of 5 chracters !!!"),
    }),
}