import express from 'express';
import {authenticate} from "../../middlewares/authN_authZ/Authenticate.js";
import {authorize} from "../../middlewares/authN_authZ/Authorize.js";
const router = express.Router();

router.get('/restaurants', authenticate , authorize('VIEW_OPEN_RESTAURANTS') , (req, res) => {
    res.send('Get Restaurants');
})
router.get('/restaurants/:restaurantId', authenticate , authorize('VIEW_SPECIFIC_RESTAURANT') , (req, res) => {
    res.send('Get a Restaurant');
})

export default router;