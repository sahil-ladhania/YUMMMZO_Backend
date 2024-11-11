import express from 'express';
const router = express.Router();

router.post('/restaurants/:restaurantId/menu' , (req, res) => {
    res.send('Create Menu');
})
router.put('/restaurants/:restaurantId/menu/:itemId' , (req, res) => {
    res.send('Update Menu');
})
router.delete('/restaurants/:restaurantId/menu/:itemId' , (req, res) => {
    res.send('Delete Menu');
})

export default router;