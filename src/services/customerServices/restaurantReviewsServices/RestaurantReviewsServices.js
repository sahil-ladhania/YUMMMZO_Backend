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
            orderBy : {
                createdAt : 'desc'
            }
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
            },
            orderBy : {
                createdAt : 'desc'
            }
        });
        return directComments;
    } 
    catch (error) {
        throw new Error('Error Getting All Direct Comments on a Review : ' + error.message + error.stack);
    }
};

// Service to Delete a Direct Comment on a Review
export const deleteDirectCommentOnReviewService = async ({commentId}) => {
    try {
        const deletedComment = await prisma.comment.delete({
            where : {
                commentId : commentId
            }
        });
        return deletedComment;
    } 
    catch (error) {
        throw new Error('Error Deleting Direct Comment on a Review : ' + error.message + error.stack);
    }
};

// Service to Update a Direct Comment on a Review
export const updateCommentOnReviewService = async ({commentId , userId , comment}) => {
    try {
        const updatedComment = await prisma.comment.update({
            where : {
                commentId : commentId
            },
            data : {
                userId : userId,
                comment : comment
            }
        });
        return updatedComment;
    } 
    catch (error) {
        throw new Error('Error Updating Direct Comment on a Review : ' + error.message + error.stack);
    }
};

// Service to Reply to a Comment
export const replyToCommentService = async ({reviewId , userId , parentId , reply}) => {
    try {
        const replyToComment = await prisma.comment.create({
            data : {
                ratingId : reviewId,
                userId : userId,
                parentId : parentId,
                comment : reply
            }
        })
        return replyToComment;
    } 
    catch (error) {
        throw new Error('Error Replying to a Comment : ' + error.message + error.stack);
    }
};

// Service to Get All Replies For a Comment
export const getAllCommentRepliesService = async ({commentId}) => {
    try {
        const commentReplies = await prisma.comment.findMany({
            where : {
                parentId : commentId
            },
            include : {
                user : {
                    select : {
                        firstName : true,
                        lastName : true
                    }
                }
            },
            orderBy : {
                createdAt : 'desc'
            }
        })
        return commentReplies;
    } 
    catch (error) {
        throw new Error('Error Getting All Replies on a Comment : ' + error.message + error.stack);
    }
};

// Service to Update a Reply on Comment
export const updateReplyOnCommentService = async ({commentId , userId , parentId , reply}) => {
    try {
        const updatedReply = await prisma.comment.update({
            where : {
                commentId : commentId
            },
            data : {
                userId : userId,
                parentId : parentId,
                comment : reply
            }
        })
        return updatedReply;
    } 
    catch (error) {
        throw new Error('Error Updating a Reply on a Comment : ' + error.message + error.stack);
    }
};


// Service to Delete a Reply on Comment
export const deleteReplyOnCommentService = async ({commentId}) => {
    try {
        const deletedReply = await prisma.comment.delete({
            where : {
                commentId : commentId
            },
        })
        return deletedReply;      
    } 
    catch (error) {
        throw new Error('Error Deleting a Reply on a Comment : ' + error.message + error.stack);
    }
};