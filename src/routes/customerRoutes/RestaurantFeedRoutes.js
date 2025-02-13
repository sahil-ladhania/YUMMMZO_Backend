import express from 'express';
import {authenticate} from "../../middlewares/authN_authZ/Authenticate.js";
import {authorize} from "../../middlewares/authN_authZ/Authorize.js";
import { getAllRestaurants, getARestaurant, getARestaurantByUserId } from '../../controllers/customerControllers/restaurantFeed/RestaurantFeedControllers.js';
const router = express.Router();

router.get('/restaurants' , authenticate , authorize('GET_ALL_RESTAURANTS') , getAllRestaurants); // If User tries to get all restaurants -> getAllRestaurants will start executing.
router.get('/restaurantss/:restaurantId' , authenticate , authorize('VIEW_SPECIFIC_RESTAURANT') , getARestaurant); // If User tries to get a specific restaurant by restaurantId -> getARestaurant will start executing.
router.get('/restaurantss/by-userId/:userId' , authenticate , authorize('VIEW_SPECIFIC_RESTAURANT') , getARestaurantByUserId); // If User tries to get a specific restaurant by userId -> getARestaurantByUserId will start executing.

export default router;