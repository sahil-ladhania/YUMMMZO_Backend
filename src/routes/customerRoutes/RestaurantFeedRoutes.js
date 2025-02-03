import express from 'express';
import {authenticate} from "../../middlewares/authN_authZ/Authenticate.js";
import {authorize} from "../../middlewares/authN_authZ/Authorize.js";
import { getAllRestaurants, getARestaurant, getARestaurantByUserId } from '../../controllers/customerControllers/restaurantFeed/RestaurantFeedControllers.js';
const router = express.Router();

// router.get('/restaurants', authenticate , authorize('VIEW_OPEN_RESTAURANTS'));

router.get('/restaurants' , getAllRestaurants); // If User tries to get all restaurants -> getAllRestaurants will start executing.
router.get('/restaurantss/:restaurantId' , getARestaurant); // If User tries to get a specific restaurant by restaurantId -> getARestaurant will start executing.
router.get('/restaurantss/by-userId/:userId' , getARestaurantByUserId); // If User tries to get a specific restaurant by userId -> getARestaurantByUserId will start executing.

export default router;