import express from 'express';
const router = express.Router();

router.get('/restaurants/:restaurantId/menu?filter=criteria', (req, res) => {
    res.send("Filtering Menu");
})

export default router;