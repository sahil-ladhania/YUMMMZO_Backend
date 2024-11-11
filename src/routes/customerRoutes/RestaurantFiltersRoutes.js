import express from 'express';
const router = express.Router();

router.get('/restaurants/filters', (req, res) => {
    res.send("Filtering Restaurants");
})

export default router;