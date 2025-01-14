import express from 'express';
import {authenticate} from "../../middlewares/authN_authZ/Authenticate.js";
import {authorize} from "../../middlewares/authN_authZ/Authorize.js";
import { createRestaurant, deleteRestaurant, updateRestaurant } from '../../controllers/vendorControllers/restaurantManagement/RestaurantControllers.js';
const router = express.Router();

// router.post('/restaurants' , authenticate , authorize('CREATE_RESTAURANT') , createRestaurant);
// router.put('/restaurants/:restaurantId' , authenticate , authorize('UPDATE_RESTAURANT') , updateRestaurant);
// router.delete('/restaurants/:restaurantId' , authenticate , authorize('DELETE_RESTAURANT') , deleteRestaurant);

router.post('/restaurants' , createRestaurant); // If a user(only VENDOR access) hits "/restaurants" endpoint -> Will Jump to createRestautant Controller
router.put('/restaurants/:restaurantId' , updateRestaurant); // If a user(only VENDOR access) hits "/restaurants/:restaurantId" endpoint -> Will Jump to createRestautant Controller
router.delete('/restaurants/:restaurantId' , deleteRestaurant); // If a user(only VENDOR access) hits "/restaurants/:restaurantId" endpoint -> Will Jump to createRestautant Controller

export default router;