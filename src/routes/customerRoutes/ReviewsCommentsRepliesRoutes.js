import express from 'express';
import {authenticate} from "../../middlewares/authN_authZ/Authenticate.js";
import {authorize} from "../../middlewares/authN_authZ/Authorize.js";
import { validateRequest } from '../../middlewares/dataValidation/ValidateRequestMiddleware.js';
import { commentOnReview, deleteDirectCommentOnReview, deleteReplyOnComment, getAllCommentReplies, getAllDirectComments, getAllRestaurantReviews, replyToComment, updateCommentOnReview, updateReplyOnComment } from '../../controllers/customerControllers/restaurantReviews/RestaurantReviewControllers.js';
import { directCommentOnReview, updateDirectCommentOnReview } from '../../utils/data validations/customer/CommentValidation.js';
import { replyOnComment, updateReplyOnAComment } from '../../utils/data validations/customer/ReplyValidation.js';
const router = express.Router();

router.get('/restaurants/:restaurantId/reviews' , getAllRestaurantReviews);
router.post('/restaurants/:restaurantId/:reviewId/comment' , authenticate , validateRequest(directCommentOnReview) , commentOnReview);
router.get('/restaurants/:restaurantId/:reviewId/comments' , getAllDirectComments);
router.delete('/restaurants/:restaurantId/:reviewId/:commentId/delete-direct-comment' , authenticate ,  deleteDirectCommentOnReview);
router.put('/restaurants/:restaurantId/:reviewId/:commentId/update-direct-comment' , authenticate , validateRequest(updateDirectCommentOnReview) , updateCommentOnReview);
router.post('/restaurants/:restaurantId/:reviewId/:commentId/reply' , authenticate , validateRequest(replyOnComment) , replyToComment);
router.get('/restaurants/:restaurantId/:commentId/replies' , getAllCommentReplies);
router.put('/restaurants/:restaurantId/:reviewId/:commentId/update-reply' , authenticate , validateRequest(updateReplyOnAComment) , updateReplyOnComment);
router.delete('/restaurants/:restaurantId/:reviewId/:commentId/delete-reply' , authenticate ,  deleteReplyOnComment);

export default router;