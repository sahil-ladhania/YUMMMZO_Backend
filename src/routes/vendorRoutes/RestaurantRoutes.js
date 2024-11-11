import express from 'express';
const router = express.Router();

router.post('/restaurants' , (req, res) => {
    res.send('Create Restaurant');
})
router.put('/restaurants/:restaurantId' , (req, res) => {
    res.send('Update a Restaurant');
})
router.delete('/restaurants/:restaurantId' , (req, res) => {
    res.send('Delete a Restaurant');
})

export default router;