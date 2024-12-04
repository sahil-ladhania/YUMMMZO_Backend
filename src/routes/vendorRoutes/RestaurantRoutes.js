import express from 'express';
import {authenticate} from "../../middlewares/authN_authZ/Authenticate.js";
import {authorize} from "../../middlewares/authN_authZ/Authorize.js";
const router = express.Router();

router.post('/restaurants' , authenticate , authorize('CREATE_RESTAURANT') ,  (req, res) => {
    res.send('Create Restaurant');
})
router.put('/restaurants/:restaurantId' , authenticate , authorize('UPDATE_RESTAURANT') ,  (req, res) => {
    res.send('Update a Restaurant');
})
router.delete('/restaurants/:restaurantId' , authenticate , authorize('DELETE_RESTAURANT') ,  (req, res) => {
    res.send('Delete a Restaurant');
})

export default router;