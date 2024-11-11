import express from 'express';
const router = express.Router();

router.post('/restaurants/:restaurantId/menu/:itemId/rate', (req, res) => {
    res.send("Rate an Item");
})

export default router;