import express from 'express';
const router = express.Router();

router.get('/orders/track/:orderId', (req, res) => {
    res.send("Track Orders");
})

export default router;