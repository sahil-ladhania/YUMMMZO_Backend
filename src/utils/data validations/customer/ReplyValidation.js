import { z } from "zod";

export const replyOnComment = {
    params : z.object({ 
        restaurantId : z.string().min(1 , "Restaurant Id is required and must be a positive number !!!"),
        reviewId : z.string().min(1 , "Review Id is required and must be a positive number !!!"),
        commentId : z.string().min(1 , "Comment Id is required and must be a positive number !!!"),
    }),
    body : z.object({
        userId: z.number({ required_error: "User ID is required",invalid_type_error: "User ID must be a number"}).positive("User ID must be a positive number"),
        parentId: z.number({ required_error: "Parent ID is required",invalid_type_error: "Parent ID must be a number"}).positive("Parent ID must be a positive number"),
        reply: z.string().min(10, { message: "Reply must be at least 10 characters long" }).max(200, { message: "Reply cannot exceed 200 characters" }),

    }),
};

export const updateReplyOnAComment = {
    params : z.object({ 
        restaurantId : z.string().min(1 , "Restaurant Id is required and must be a positive number !!!"),
        reviewId : z.string().min(1 , "Review Id is required and must be a positive number !!!"),
        commentId : z.string().min(1 , "Comment Id is required and must be a positive number !!!"),
    }),
    body : z.object({
        userId: z.number({ required_error: "User ID is required",invalid_type_error: "User ID must be a number"}).positive("User ID must be a positive number"),
        parentId: z.number({ required_error: "Parent ID is required",invalid_type_error: "Parent ID must be a number"}).positive("Parent ID must be a positive number"),
        reply: z.string().min(10, { message: "Reply must be at least 10 characters long" }).max(200, { message: "Reply cannot exceed 200 characters" }),

    }),
};
