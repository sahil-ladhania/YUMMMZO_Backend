import prisma from "../../../config/DB.js";


// Service to Get All Restaurant Reviews
export const getAllRestaurantReviewsService = async ({restaurantId}) => {
    try {
        const reviews = await prisma.rating.findMany({
            where : {
                targetId : restaurantId,
                ratingType : "RESTAURANT"
            },
            include : {
                user : {
                    select : {
                        firstName : true,
                        lastName : true
                    }
                }
            },
        })
        return reviews;
    } 
    catch (error) {
        throw new Error('Error Getting All Reviews For a Restaurant : ' + error.message + error.stack);
    }
};

export const getAllReviewCommentsService = async () => {
    try {
        
    } 
    catch (error) {
        
    }
};

export const getAllCommentRepliesService = async () => {
    try {
        
    } 
    catch (error) {
        
    }
};

export const commentOnReviewService = async () => {
    try {
        
    } 
    catch (error) {
        
    }
};

export const replyToCommentService = async () => {
    try {
        
    } 
    catch (error) {
        
    }
};

export const updateCommentOnReviewService = async () => {
    try {
        
    } 
    catch (error) {
        
    }
};

export const deleteCommentOnReviewService = async () => {
    try {
        
    } 
    catch (error) {
        
    }
};