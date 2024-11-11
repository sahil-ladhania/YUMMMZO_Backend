import express from 'express';
const router = express.Router();

router.get('/orders/history', (req, res) => {
    res.send("Get Order History");
})
router.post('/orders/reorder/:orderId', (req, res) => {
    res.send("Reorder From Order History");
})

export default router;