import { z } from "zod";

export const directCommentOnReview = {
    params : z.object({ 
        restaurantId : z.string().min(1 , "Restaurant Id is required and must be a positive number !!!"),
        reviewId : z.string().min(1 , "Review Id is required and must be a positive number !!!"),
    }),
    body : z.object({
        userId: z.number({ required_error: "User ID is required",invalid_type_error: "User ID must be a number"}).positive("User ID must be a positive number"),
        comment: z.string().min(10, { message: "Comment must be at least 10 characters long" }).max(200, { message: "Comment cannot exceed 200 characters" }),

    }),
};

export const updateDirectCommentOnReview = {
    params : z.object({ 
        restaurantId : z.string().min(1 , "Restaurant Id is required and must be a positive number !!!"),
        reviewId : z.string().min(1 , "Review Id is required and must be a positive number !!!"),
        commentId : z.string().min(1 , "Comment Id is required and must be a positive number !!!"),
    }),
    body : z.object({
        userId: z.number({ required_error: "User ID is required",invalid_type_error: "User ID must be a number"}).positive("User ID must be a positive number"),
        comment: z.string().min(10, { message: "Comment must be at least 10 characters long" }).max(200, { message: "Comment cannot exceed 200 characters" }),

    }),
};