import express from 'express';
const router = express.Router();

router.get('/restaurants/:restaurantId/menu', (req, res) => {
    res.send("Get Menu");
})

export default router;