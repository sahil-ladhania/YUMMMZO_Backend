import { commentOnReviewService, getAllDirectCommentsService, getAllRestaurantReviewsService } from "../../../services/customerServices/restaurantReviewsServices/RestaurantReviewsServices.js";

// Controller to Get All Restaurant Reviews
export const getAllRestaurantReviews = async (req , res , next) => {
    try {
        const {restaurantId} = req.params;
        const restaurantId_INT = parseInt(restaurantId);
        console.log(restaurantId_INT);
        if(!restaurantId){
            return res.status(400).send({
                message : "Please fill all required fields..."
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

export const getAllCommentReplies = async (req , res , next) => {
    try {
        
    } 
    catch (error) {
        next(error);
    }
};

export const replyToComment = async (req , res , next) => {
    try {
        
    } 
    catch (error) {
        next(error);
    }
};

export const updateCommentOnReview = async (req , res , next) => {
    try {
        
    } 
    catch (error) {
        next(error);
    }
};

export const deleteCommentOnReview = async (req , res , next) => {
    try {
        
    } 
    catch (error) {
        next(error);
    }
};