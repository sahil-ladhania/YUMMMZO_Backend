import { commentOnReviewService, deleteDirectCommentOnReviewService, deleteReplyOnCommentService, getAllCommentRepliesService, getAllDirectCommentsService, getAllRestaurantReviewsService, replyToCommentService, updateCommentOnReviewService, updateReplyOnCommentService } from "../../../services/customerServices/restaurantReviewsServices/RestaurantReviewsServices.js";
import { checkIfACommentExist, checkIfCommentBelongsToThisReview, checkIfParentCommentExist, checkIfReplyBelongsToThisComment, checkIfRestaurantMatches, checkIfReviewBelongsToThisRestaurant, checkIfReviewExist, checkIfUserIsValidForDeletingComment, checkIfUserIsValidForDeletingReply, checkIfUserIsValidForUpdatingComment, checkIfUserIsValidForUpdatingReply } from "../../../utils/ownership validation/customer/CommentsAndRepliesValidation.js";

// Controller to Get All Restaurant Reviews
export const getAllRestaurantReviews = async (req , res , next) => {
    try {
        const {restaurantId} = req.params;
        const restaurantId_INT = parseInt(restaurantId);
        if(!restaurantId){
            return res.status(400).send({
                message : "Please fill all required fields..."
            })
        }
        const isRestaurantValid = await checkIfRestaurantMatches({restaurantId: restaurantId_INT});
        if(!isRestaurantValid){
            return res.status(404).send({
                message : "Restaurant Doesnt Exist..."
            })
        }
        const reviews = await getAllRestaurantReviewsService({restaurantId : restaurantId_INT});
        if(!reviews){
            return res.status(404).send({ 
                message : "Error Getting All Reviews For a Restaurant...",
            })
        }
        return res.status(200).send({ 
            message : "Successfully Got All Reviews For a Restaurant...",
            reviews : reviews
        })
    } 
    catch (error) {
        next(error);
    }
};

// Controller to Comment on a Review
export const commentOnReview = async (req , res , next) => {
    try {
        const {restaurantId , reviewId} = req.params;
        const restaurantId_INT = parseInt(restaurantId);
        const reviewId_INT = parseInt(reviewId);
        const {userId , comment} = req.body;
        if(!restaurantId || !reviewId || !userId || !comment){
            return res.status(400).send({
                message : "Please fill all required fields..."
            })
        }
        const isRestaurantValid = await checkIfRestaurantMatches({restaurantId: restaurantId_INT});
        if(!isRestaurantValid){
            return res.status(404).send({
                message : "Restaurant Doesnt Exist..."
            })
        }
        const ifReviewValid = await checkIfReviewExist({reviewId : reviewId_INT});
        if(!ifReviewValid){
            return res.status(404).send({
                message : "Review Doesnt Exist..."
            })
        }
        const ifReviewBelongsToRestaurant = await checkIfReviewBelongsToThisRestaurant({restaurantId: restaurantId_INT , reviewId: reviewId_INT});
        if(!ifReviewBelongsToRestaurant){
            return res.status(404).send({
                message : "Review Doesnt Belong to this Restaurant..."
            })
        }
        const commentOnReview = await commentOnReviewService({restaurantId : restaurantId_INT , reviewId : reviewId_INT , userId , parentId : null , comment});
        if(!commentOnReview){
            return res.status(404).send({ 
                message : "Error Commenting on a Review...",
            })
        }
        return res.status(200).send({ 
            message : "Successfully Commented on Direct Review...",
            comment : commentOnReview
        })
    } 
    catch (error) {
        next(error);
    }
};

// Controller to Get All Direct Comments on a Review
export const getAllDirectComments = async (req , res , next) => {
    try {
        const {restaurantId , reviewId} = req.params;
        const restaurantId_INT = parseInt(restaurantId);
        const reviewId_INT = parseInt(reviewId);
        if(!restaurantId || !reviewId){
            return res.status(400).send({
                message : "Please fill all required fields..."
            })
        }
        const isRestaurantValid = await checkIfRestaurantMatches({restaurantId: restaurantId_INT});
        if(!isRestaurantValid){
            return res.status(404).send({
                message : "Restaurant Doesnt Exist..."
            })
        }
        const ifReviewValid = await checkIfReviewExist({reviewId : reviewId_INT});
        if(!ifReviewValid){
            return res.status(404).send({
                message : "Review Doesnt Exist..."
            })
        }
        const ifReviewBelongsToRestaurant = await checkIfReviewBelongsToThisRestaurant({restaurantId: restaurantId_INT , reviewId: reviewId_INT});
        if(!ifReviewBelongsToRestaurant){
            return res.status(404).send({
                message : "Review Doesnt Belong to this Restaurant..."
            })
        }
        const directComments = await getAllDirectCommentsService({reviewId : reviewId_INT});
        if(!directComments){
            return res.status(404).send({ 
                message : "Error Getting All Direct Comments For a Review...",
            })
        }
        return res.status(200).send({ 
            message : "Successfully Got All Direct Comments For a Review...",
            directComments : directComments
        })
    } 
    catch (error) {
        next(error);
    }
};

// Controller to Delete a Direct Comment on a Review
export const deleteDirectCommentOnReview = async (req , res , next) => {
    try {
        const {restaurantId , reviewId , commentId} = req.params;
        const restaurantId_INT = parseInt(restaurantId);
        const reviewId_INT = parseInt(reviewId);
        const commentId_INT = parseInt(commentId);
        const retrievedUserId = req.user.userId;
        if(!restaurantId || !reviewId || !commentId){
            return res.status(400).send({
                message : "Please fill all required fields..."
            })
        };
        const ifCommentValid = await checkIfACommentExist({commentId : commentId_INT});
        if(!ifCommentValid){
            return res.status(404).send({
                message : "Comment Doesnt Exist..."
            })
        }
        const isRestaurantValid = await checkIfRestaurantMatches({restaurantId: restaurantId_INT});
        if(!isRestaurantValid){
            return res.status(404).send({
                message : "Restaurant Doesnt Exist..."
            })
        }
        const ifReviewBelongsToRestaurant = await checkIfReviewBelongsToThisRestaurant({restaurantId: restaurantId_INT , reviewId: reviewId_INT});
        if(!ifReviewBelongsToRestaurant){
            return res.status(404).send({
                message : "Review Doesnt Belong to this Restaurant..."
            })
        }
        const ifCommentBelongsToReview = await checkIfCommentBelongsToThisReview({reviewId: reviewId_INT , commentId: commentId_INT});
        if(!ifCommentBelongsToReview){
            return res.status(404).send({
                message : "Comment Doesnt Belong to this Review..."
            })
        }
        const ifUserValidForDeletingComment = await checkIfUserIsValidForDeletingComment({retrievedUserId , commentId: commentId_INT});
        if(!ifUserValidForDeletingComment){
            return res.status(404).send({
                message : "User Does Not Have Authority to Delete This Comment..."
            })
        }
        const deletedComment = await deleteDirectCommentOnReviewService({commentId: commentId_INT});
        if(!deletedComment){
            return res.status(404).send({ 
                message : "Error Deleting a Direct Comment...",
            })
        }
        return res.status(200).send({ 
            message : "Successfully Deleted a Direct Comment...",
            deletedComment : deletedComment
        })
    } 
    catch (error) {
        next(error);
    }
};

// Controller to Update a Direct Comment on a Review
export const updateCommentOnReview = async (req , res , next) => {
    try {
        const {restaurantId , reviewId , commentId} = req.params;
        const restaurantId_INT = parseInt(restaurantId);
        const reviewId_INT = parseInt(reviewId);
        const commentId_INT = parseInt(commentId);
        const {userId , comment} = req.body;
        const retrievedUserId = req.user.userId;
        if(!restaurantId || !reviewId || !commentId || !userId || !comment){
            return res.status(400).send({
                message : "Please fill all required fields..."
            })
        }
        const ifCommentExist = await checkIfACommentExist({commentId : commentId_INT});
        if(!ifCommentExist){
            return res.status(404).send({
                message : "Comment Doesnt Exist..."
            })
        }
        const isRestaurantValid = await checkIfRestaurantMatches({restaurantId: restaurantId_INT});
        if(!isRestaurantValid){
            return res.status(404).send({
                message : "Restaurant Doesnt Exist..."
            })
        }
        const ifReviewBelongsToRestaurant = await checkIfReviewBelongsToThisRestaurant({restaurantId: restaurantId_INT , reviewId: reviewId_INT});
        if(!ifReviewBelongsToRestaurant){
            return res.status(404).send({
                message : "Review Doesnt Belong to this Restaurant..."
            })
        }
        const ifCommentBelongsToReview = await checkIfCommentBelongsToThisReview({reviewId: reviewId_INT , commentId: commentId_INT});
        if(!ifCommentBelongsToReview){
            return res.status(404).send({
                message : "Comment Doesnt Belong to this Review..."
            })
        }
        const ifUserValidForUpdatingComment = await checkIfUserIsValidForUpdatingComment({retrievedUserId , commentId: commentId_INT});
        if(!ifUserValidForUpdatingComment){
            return res.status(404).send({
                message : "User Does Not Have Authority to Update This Comment..."
            })
        }
        const updatedComment = await updateCommentOnReviewService({commentId: commentId_INT , userId: userId , comment});
        if(!updatedComment){
            return res.status(404).send({ 
                message : "Error Updating a Direct Comment...",
            })
        }
        return res.status(200).send({ 
            message : "Successfully Updated a Direct Comment...",
            updatedComment : updatedComment
        })
    } 
    catch (error) {
        next(error);
    }
};

// Controller to Reply to a Comment
export const replyToComment = async (req , res , next) => {
    try {
        const {restaurantId , reviewId , commentId} = req.params;
        const restaurantId_INT = parseInt(restaurantId);
        const reviewId_INT = parseInt(reviewId);
        const commentId_INT = parseInt(commentId);
        const {userId , parentId , reply} = req.body;
        if(!restaurantId || !reviewId || !commentId || !userId || !reply){
            return res.status(400).send({
                message : "Please fill all required fields..."
            })
        }
        const ifParentCommentExist = await checkIfParentCommentExist({parentId});
        if(!ifParentCommentExist){
            return res.status(404).send({
                message : "Parent Comment Doesnt Exist..."
            })
        }
        const isRestaurantValid = await checkIfRestaurantMatches({restaurantId: restaurantId_INT});
        if(!isRestaurantValid){
            return res.status(404).send({
                message : "Restaurant Doesnt Exist..."
            })
        }
        const ifReviewValid = await checkIfReviewExist({reviewId : reviewId_INT});
        if(!ifReviewValid){
            return res.status(404).send({
                message : "Review Doesnt Exist..."
            })
        }
        const ifCommentValid = await checkIfACommentExist({commentId : commentId_INT});
        if(!ifCommentValid){
            return res.status(404).send({
                message : "Comment Doesnt Exist..."
            })
        }
        const ifReviewBelongsToRestaurant = await checkIfReviewBelongsToThisRestaurant({restaurantId: restaurantId_INT , reviewId: reviewId_INT});
        if(!ifReviewBelongsToRestaurant){
            return res.status(404).send({
                message : "Review Doesnt Belong to this Restaurant..."
            })
        }
        const ifCommentBelongsToReview = await checkIfCommentBelongsToThisReview({reviewId: reviewId_INT , commentId: commentId_INT});
        if(!ifCommentBelongsToReview){
            return res.status(404).send({
                message : "Comment Doesnt Belong to this Review..."
            })
        }
        const replyToComment = await replyToCommentService({reviewId: reviewId_INT , userId , parentId , reply});
        if(!replyToComment){
            return res.status(404).send({ 
                message : "Error Replying on a Comment...",
            })
        }
        return res.status(200).send({ 
            message : "Successfully Replied to a Comment...",
            reply : replyToComment
        })
    } 
    catch (error) {
        next(error);
    }
};

// Controller to Get All Replies For a Comment
export const getAllCommentReplies = async (req , res , next) => {
    try {
        const {restaurantId , commentId} = req.params;
        const restaurantId_INT = parseInt(restaurantId);
        const commentId_INT = parseInt(commentId);
        if(!restaurantId || !commentId){
            return res.status(400).send({
                message : "Please fill all required fields..."
            })
        }
        const isRestaurantValid = await checkIfRestaurantMatches({restaurantId: restaurantId_INT});
        if(!isRestaurantValid){
            return res.status(404).send({
                message : "Restaurant Doesnt Exist..."
            })
        }
        const ifCommentValid = await checkIfACommentExist({commentId : commentId_INT});
        if(!ifCommentValid){
            return res.status(404).send({
                message : "Comment Doesnt Exist..."
            })
        }
        const commentReplies = await getAllCommentRepliesService({commentId: commentId_INT});
        if(!commentReplies){
            return res.status(404).send({ 
                message : "Error Getting All Replies For a Comment...",
            })
        }
        return res.status(200).send({ 
            message : "Successfully Got All Replies For a Comment...",
            commentReplies : commentReplies
        })
    } 
    catch (error) {
        next(error);
    }
};

// Controller to Update a Reply on Comment
export const updateReplyOnComment = async (req , res , next) => {
    try {
        const {restaurantId , reviewId , commentId} = req.params;
        const restaurantId_INT = parseInt(restaurantId);
        const reviewId_INT = parseInt(reviewId);
        const commentId_INT = parseInt(commentId);
        const {userId , parentId , reply} = req.body;
        const retrievedUserId = req.user.userId;
        if(!restaurantId || !reviewId || !commentId || !userId || !parentId || !reply){
            return res.status(400).send({
                message : "Please fill all required fields..."
            })
        }
        const isRestaurantValid = await checkIfRestaurantMatches({restaurantId: restaurantId_INT});
        if(!isRestaurantValid){
            return res.status(404).send({
                message : "Restaurant Doesnt Exist..."
            })
        }
        const ifReviewValid = await checkIfReviewExist({reviewId : reviewId_INT});
        if(!ifReviewValid){
            return res.status(404).send({
                message : "Review Doesnt Exist..."
            })
        }
        const ifCommentValid = await checkIfACommentExist({commentId : commentId_INT});
        if(!ifCommentValid){
            return res.status(404).send({
                message : "Comment Doesnt Exist..."
            })
        }
        const ifReviewBelongsToRestaurant = await checkIfReviewBelongsToThisRestaurant({restaurantId: restaurantId_INT , reviewId: reviewId_INT});
        if(!ifReviewBelongsToRestaurant){
            return res.status(404).send({
                message : "Review Doesnt Belong to this Restaurant..."
            })
        }
        const ifCommentBelongsToReview = await checkIfCommentBelongsToThisReview({reviewId: reviewId_INT , commentId: commentId_INT});
        if(!ifCommentBelongsToReview){
            return res.status(404).send({
                message : "Comment Doesnt Belong to this Review..."
            })
        }
        const ifReplyBelongsToComment = await checkIfReplyBelongsToThisComment({commentId: commentId_INT , parentId});
        if(!ifReplyBelongsToComment){
            return res.status(404).send({
                message : "Reply Doesnt Belong to this Comment..."
            })
        }
        const ifUserValidForUpdatingReply = await checkIfUserIsValidForUpdatingReply({retrievedUserId , commentId: commentId_INT});
        if(!ifUserValidForUpdatingReply){
            return res.status(404).send({
                message : "User Does Not Have Authority to Update This Reply..."
            })
        }
        const updatedReply = await updateReplyOnCommentService({commentId: commentId_INT , userId , parentId , reply});
        if(!updatedReply){
            return res.status(404).send({ 
                message : "Error Updating a Reply on a Comment...",
            })
        }
        return res.status(200).send({ 
            message : "Successfully Updated a Reply on a Comment...",
            updatedReply : updatedReply
        })
    } 
    catch (error) {
        next(error);
    }
};

// Controller to Delete a Reply on Comment
export const deleteReplyOnComment = async (req , res , next) => {
    try {
        const {restaurantId , reviewId , commentId} = req.params;
        const restaurantId_INT = parseInt(restaurantId);
        const reviewId_INT = parseInt(reviewId);
        const commentId_INT = parseInt(commentId);
        const retrievedUserId = req.user.userId;
        if(!restaurantId || !reviewId || !commentId){
            return res.status(400).send({
                message : "Please fill all required fields..."
            })
        }
        const isRestaurantValid = await checkIfRestaurantMatches({restaurantId: restaurantId_INT});
        if(!isRestaurantValid){
            return res.status(404).send({
                message : "Restaurant Doesnt Exist..."
            })
        }
        const ifReviewValid = await checkIfReviewExist({reviewId : reviewId_INT});
        if(!ifReviewValid){
            return res.status(404).send({
                message : "Review Doesnt Exist..."
            })
        }
        const ifCommentValid = await checkIfACommentExist({commentId : commentId_INT});
        if(!ifCommentValid){
            return res.status(404).send({
                message : "Comment Doesnt Exist..."
            })
        }
        const ifReviewBelongsToRestaurant = await checkIfReviewBelongsToThisRestaurant({restaurantId: restaurantId_INT , reviewId: reviewId_INT});
        if(!ifReviewBelongsToRestaurant){
            return res.status(404).send({
                message : "Review Doesnt Belong to this Restaurant..."
            })
        }
        const ifCommentBelongsToReview = await checkIfCommentBelongsToThisReview({reviewId: reviewId_INT , commentId: commentId_INT});
        if(!ifCommentBelongsToReview){
            return res.status(404).send({
                message : "Comment Doesnt Belong to this Review..."
            })
        }
        const ifUserValidForDeletingReply = await checkIfUserIsValidForDeletingReply({retrievedUserId , commentId: commentId_INT});
        if(!ifUserValidForDeletingReply){
            return res.status(404).send({
                message : "User Does Not Have Authority to Delete This Reply..."
            })
        }
        const deletedReply = await deleteReplyOnCommentService({commentId: commentId_INT});
        if(!deletedReply){
            return res.status(404).send({ 
                message : "Error Deleting a Reply on a Comment...",
            })
        }
        return res.status(200).send({ 
            message : "Successfully Deleted a Reply on a Comment...",
            deletedReply : deletedReply
        })
    } 
    catch (error) {
        next(error);
    }
};