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

// Service to Comment on a Review
export const commentOnReviewService = async ({reviewId , userId , parentId , comment}) => {
    try {
        const commentOnReview = await prisma.comment.create({
            data : {
                ratingId : reviewId,
                userId : userId,
                parentId : parentId,
                comment : comment
            }
        })
        return commentOnReview;
    }   
    catch (error) {
        throw new Error('Error Commenting on a Review : ' + error.message + error.stack);
    }
};

// Service to Get All Direct Comments on a Review
export const getAllDirectCommentsService = async ({reviewId}) => {
    try {
        const directComments = await prisma.comment.findMany({
            where : {
                ratingId : reviewId,
                parentId : null
            },
            include : {
                user : {
                    select : {
                        firstName : true,
                        lastName : true
                    }
                }
            }
        });
        return directComments;
    } 
    catch (error) {
        throw new Error('Error Getting All Direct Comments on a Review : ' + error.message + error.stack);
    }
};

export const getAllCommentRepliesService = async () => {
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