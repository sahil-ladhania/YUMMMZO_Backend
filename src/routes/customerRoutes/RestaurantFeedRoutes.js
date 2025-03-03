import express from 'express';
import {authenticate} from "../../middlewares/authN_authZ/Authenticate.js";
import {authorize} from "../../middlewares/authN_authZ/Authorize.js";
import { getAllRestaurants, getARestaurant, getARestaurantByUserId } from '../../controllers/customerControllers/restaurantFeed/RestaurantFeedControllers.js';
const router = express.Router();

router.get('/restaurants' , getAllRestaurants);
router.get('/restaurantss/:restaurantId' , getARestaurant); 
router.get('/restaurantss/by-userId/:userId' , authenticate , authorize('VIEW_SPECIFIC_RESTAURANT') , getARestaurantByUserId); 

export default router;