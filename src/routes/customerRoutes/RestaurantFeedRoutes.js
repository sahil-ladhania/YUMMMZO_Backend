import express from 'express';
const router = express.Router();

router.get('/restaurants', (req, res) => {
    res.send('Get Restaurants');
})
router.get('/restaurants/:restaurantId', (req, res) => {
    res.send('Get a Restaurant');
})

export default router;