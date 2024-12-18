import express from 'express';
import {authenticate} from "../../middlewares/authN_authZ/Authenticate.js";
import {authorize} from "../../middlewares/authN_authZ/Authorize.js";
import { createRestaurant, deleteRestaurant, updateRestaurant } from '../../controllers/vendorControllers/restaurantManagement/RestaurantControllers.js';
const router = express.Router();

// router.post('/restaurants' , authenticate , authorize('CREATE_RESTAURANT') , createRestaurant);
// router.put('/restaurants/:restaurantId' , authenticate , authorize('UPDATE_RESTAURANT') , updateRestaurant);
// router.delete('/restaurants/:restaurantId' , authenticate , authorize('DELETE_RESTAURANT') , deleteRestaurant);
router.post('/restaurants' , createRestaurant);
router.put('/restaurants/:restaurantId' , updateRestaurant);
router.delete('/restaurants/:restaurantId' , deleteRestaurant);

export default router;