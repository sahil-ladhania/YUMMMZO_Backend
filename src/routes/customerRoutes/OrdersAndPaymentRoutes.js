import express from 'express';
const router = express.Router();

router.post('/payment', (req, res) => {
    res.send("Place Order and Pay");
})

export default router;