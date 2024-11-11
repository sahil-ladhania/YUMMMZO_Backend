import express from 'express';
const router = express.Router();

router.post('/orders/schedule', (req, res) => {
    res.send("Schedule Orders");
})

export default router;