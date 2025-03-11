import { getAllRestaurantReviewsService } from "../../../services/customerServices/restaurantReviewsServices/RestaurantReviewsServices.js";


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

export const getAllReviewComments = async (req , res , next) => {
    try {
        
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

export const commentOnReview = async (req , res , next) => {
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