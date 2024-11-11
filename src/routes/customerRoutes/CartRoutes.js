import express from 'express';
const router = express.Router();

router.post('/cart', (req, res) => {
    res.send("Create Cart");
})
router.put('/cart/increment/:itemId', (req, res) => {
    res.send("Increment Cart");
})
router.put('/cart/decrement/:itemId', (req, res) => {
    res.send("Decrement Cart");
})
router.get('/cart', (req, res) => {
    res.send("Get Cart");
})

export default router;