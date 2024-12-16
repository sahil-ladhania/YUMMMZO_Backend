import express from 'express';
import {authenticate} from "../../middlewares/authN_authZ/Authenticate.js";
import {authorize} from "../../middlewares/authN_authZ/Authorize.js";
const router = express.Router();

// router.post('/restaurants' , authenticate , authorize('CREATE_RESTAURANT') ,  (req, res) => {
//     res.send('Create Restaurant');
// })
// router.put('/restaurants/:restaurantId' , authenticate , authorize('UPDATE_RESTAURANT') ,  (req, res) => {
//     res.send('Update a Restaurant');
// })
// router.delete('/restaurants/:restaurantId' , authenticate , authorize('DELETE_RESTAURANT') ,  (req, res) => {
//     res.send('Delete a Restaurant');
// })
// router.get('/restaurants' , authenticate , authorize('GET_ALL_RESTAURANTS_VENDOR') ,  (req, res) => {
//     res.send('Get all Restaurants for a Vendor');
// })
// router.get('/restaurants/:restaurantId' , authenticate , authorize('GET_RESTAURANT_VENDOR') ,  (req, res) => {
//     res.send('Get a Restaurant for a Vendor');
// })

router.post('/restaurants' ,  (req, res) => {
    res.send('Create Restaurant');
})
router.put('/restaurants/:restaurantId' ,  (req, res) => {
    res.send('Update a Restaurant');
})
router.delete('/restaurants/:restaurantId' ,  (req, res) => {
    res.send('Delete a Restaurant');
})
router.get('/restaurants' ,  (req, res) => {
    res.send('Get all Restaurants for a Vendor');
})
router.get('/restaurants/:restaurantId' ,  (req, res) => {
    res.send('Get a Restaurant for a Vendor');
})

export default router;