import express from 'express';
const router = express.Router();

router.get('/restaurants/:restaurantId/orders', (req, res) => {
    res.send('Get Orders');
})
router.put('/restaurants/:restaurantId/orders/:orderId', (req, res) => {
    res.send('Update Order Status');
})

export default router;