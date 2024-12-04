import express from 'express';
import {authenticate} from "../../middlewares/authN_authZ/Authenticate.js";
import {authorize} from "../../middlewares/authN_authZ/Authorize.js";
const router = express.Router();

router.post('/restaurants/:restaurantId/review', authenticate , authorize('ADD_REVIEW') , (req, res) => {
    res.send("Write a Review");
})
router.post('/restaurants/:reviewId/comment', authenticate , authorize('ADD_REVIEW_COMMENT') , (req, res) => {
    res.send("Write a Comment");
})
router.post('/comments/:commentId/reply', authenticate , authorize('REPLY_TO_COMMENT') , (req, res) => {
    res.send("Write a Reply");
})

export default router;