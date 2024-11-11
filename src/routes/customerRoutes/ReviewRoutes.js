import express from 'express';
const router = express.Router();

router.post('/restaurants/:restaurantId/review', (req, res) => {
    res.send("Write a Review");
})
router.post('/restaurants/:reviewId/comment', (req, res) => {
    res.send("Write a Comment");
})
router.post('/comments/:commentId/reply', (req, res) => {
    res.send("Write a Reply");
})

export default router;