import prisma from "../../../config/DB.js";

// Validation to Check If the Parent Comment Exist
export const checkIfParentCommentExist = async ({ parentId }) => {
    try{
        const ifParentCommentExist = await prisma.comment.findUnique({
            where : {
                commentId : parentId
            },
        })
        return ifParentCommentExist;
    }
    catch(error){
        throw new Error('Error Checking If a Restaurant Exist or Not : ' + error.message + error.stack);
    }
};

// Validation to Check If the Comment Exist
export const checkIfReviewExist = async ({ reviewId }) => {
    try{
        const ifReviewExist = await prisma.rating.findUnique({
            where : {
                ratingId : reviewId
            },
        })
        return ifReviewExist;
    }
    catch(error){
        throw new Error('Error Checking If a Restaurant Exist or Not : ' + error.message + error.stack);
    }
};

// Validation to Check If the Comment Exist
export const checkIfACommentExist = async ({ commentId }) => {
    try{
        const ifCommentValid = await prisma.comment.findUnique({
            where : {
                commentId : commentId
            },
        })
        return ifCommentValid;
    }
    catch(error){
        throw new Error('Error Checking If a Restaurant Exist or Not : ' + error.message + error.stack);
    }
};

// Validation to Check If the Restaurant is Valid
export const checkIfRestaurantMatches = async ({ restaurantId }) => {
    try{
        const isRestaurantValid = await prisma.restaurant.findUnique({
            where : {
                restaurantId : restaurantId
            },
        })
        return isRestaurantValid;
    }
    catch(error){
        throw new Error('Error Checking If a Restaurant Exist or Not : ' + error.message + error.stack);
    }
};

// Validation to Check If the Review Belongs to this Restaurant
export const checkIfReviewBelongsToThisRestaurant = async ({ restaurantId , reviewId }) => {
    try{
        const ifReviewBelongsToRestaurant = await prisma.rating.findFirst({
            where : {
                ratingId : reviewId,
                targetId : restaurantId
            },
        })
        return ifReviewBelongsToRestaurant;
    }
    catch(error){
        throw new Error('Error Checking If a Review Beloongs To a Restaurant : ' + error.message + error.stack);
    }
};

// Validation to Check If the Comment Belongs to this Review
export const checkIfCommentBelongsToThisReview = async ({ reviewId , commentId }) => {
    try{
        const ifCommentBelongsToReview = await prisma.comment.findFirst({
            where : {   
                commentId : commentId,
                ratingId : reviewId
            },
        })
        return ifCommentBelongsToReview;
    }
    catch(error){
        throw new Error('Error Checking If a Comment Beloongs To a Review : ' + error.message + error.stack);
    }
};

// Validation to Check If the Reply Belongs to this Comment
export const checkIfReplyBelongsToThisComment = async ({ commentId , parentId }) => {
    try{
        const ifReplyBelongsToComment = await prisma.comment.findFirst({
            where : {   
                commentId : commentId,
                parent : {
                    commentId : parentId
                }
            },
        })
        return ifReplyBelongsToComment;
    }
    catch(error){
        throw new Error('Error Checking If a Comment Belongs To a Review : ' + error.message + error.stack);
    }
};

// Validation to Check If the Comment has been created by the User before Deletion
export const checkIfUserIsValidForDeletingComment = async ({ retrievedUserId , commentId }) => {
    try{
        const ifUserValidForDeletingComment = await prisma.comment.findFirst({
            where : {   
                commentId : commentId,
                userId : retrievedUserId
            },
        })
        return ifUserValidForDeletingComment;
    }
    catch(error){
        throw new Error('Error Checking If a User is allowed for Deleting Comment : ' + error.message + error.stack);
    }
};

// Validation to Check If the Comment has been created by the User before Deletion
export const checkIfUserIsValidForUpdatingComment = async ({ retrievedUserId , commentId }) => {
    try{
        const ifUserValidForUpdatingComment = await prisma.comment.findFirst({
            where : {   
                commentId : commentId,
                userId : retrievedUserId
            },
        })
        return ifUserValidForUpdatingComment;
    }
    catch(error){
        throw new Error('Error Checking If a User is allowed for Updating Comment : ' + error.message + error.stack);
    }
};

// Validation to Check If the Reply has been created by the User before Deletion
export const checkIfUserIsValidForUpdatingReply = async ({ retrievedUserId , commentId }) => {
    try{
        const ifUserValidForUpdatingReply = await prisma.comment.findFirst({
            where : {   
                commentId : commentId,
                userId : retrievedUserId
            },
        })
        return ifUserValidForUpdatingReply;
    }
    catch(error){
        throw new Error('Error Checking If a User is allowed for Updating Reply : ' + error.message + error.stack);
    }
};

// Validation to Check If the Reply has been created by the User before Deletion
export const checkIfUserIsValidForDeletingReply = async ({ retrievedUserId , commentId }) => {
    try{
        const ifUserValidForDeletingReply = await prisma.comment.findFirst({
            where : {   
                commentId : commentId,
                userId : retrievedUserId,
            },
        })
        return ifUserValidForDeletingReply;
    }
    catch(error){
        throw new Error('Error Checking If a User is allowed for Deleting Reply : ' + error.message + error.stack);
    }
};