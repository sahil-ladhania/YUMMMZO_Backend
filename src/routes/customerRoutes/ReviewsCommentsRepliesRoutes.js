import express from 'express';
import {authenticate} from "../../middlewares/authN_authZ/Authenticate.js";
import {authorize} from "../../middlewares/authN_authZ/Authorize.js";
import { commentOnReview, deleteCommentOnReview, getAllCommentReplies, getAllDirectComments, getAllRestaurantReviews, replyToComment, updateCommentOnReview } from '../../controllers/customerControllers/restaurantReviews/RestaurantReviewControllers.js';
const router = express.Router();


router.get('/restaurants/:restaurantId/reviews' , getAllRestaurantReviews);
router.post('/restaurants/:restaurantId/:reviewId/comment' , commentOnReview);
router.get('/restaurants/:restaurantId/:reviewId/comments' , getAllDirectComments);

router.get('/restaurants/:restaurantId/:commentId/replies' , getAllCommentReplies);
router.post('/restaurants/:restaurantId/:reviewId/:commentId/reply' , replyToComment);
router.put('/restaurants/:restaurantId/:reviewId/:commentId/update-comment' , updateCommentOnReview);
router.put('/restaurants/:restaurantId/:reviewId/:commentId/delete-comment' , deleteCommentOnReview);

export default router;