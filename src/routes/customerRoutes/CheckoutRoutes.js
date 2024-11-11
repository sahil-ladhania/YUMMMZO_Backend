import express from 'express';
const router = express.Router();

router.post('/checkout', (req, res) => {
    res.send("Checking Out");
})

export default router