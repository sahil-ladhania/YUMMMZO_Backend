import express from 'express';
import {authenticate} from "../../middlewares/authN_authZ/Authenticate.js";
import {authorize} from "../../middlewares/authN_authZ/Authorize.js";
import { getAllRestaurants } from '../../controllers/customerControllers/restaurantFeed/RestaurantFeedControllers.js';
const router = express.Router();

// router.get('/restaurants', authenticate , authorize('VIEW_OPEN_RESTAURANTS'));

router.get('/restaurants' , getAllRestaurants);

export default router;