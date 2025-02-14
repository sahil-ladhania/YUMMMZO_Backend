import express from 'express';
import {authenticate} from "../../middlewares/authN_authZ/Authenticate.js";
import {authorize} from "../../middlewares/authN_authZ/Authorize.js";
import { createRestaurant, deleteRestaurant, updateRestaurant } from '../../controllers/vendorControllers/restaurantManagement/RestaurantControllers.js';
import { validateRequest } from '../../middlewares/dataValidation/ValidateRequestMiddleware.js';
import { createRestaurantValidation } from '../../utils/data validations/vendor/CreateRestaurantValidation.js';
import { updateRestaurantValidation } from '../../utils/data validations/vendor/UpdateRestaurantValidation.js';
const router = express.Router();

router.post('/restaurants' , authenticate , authorize('CREATE_RESTAURANT') , validateRequest(createRestaurantValidation) , createRestaurant); 
router.put('/restaurants/:restaurantId' , authenticate , authorize('UPDATE_RESTAURANT') , validateRequest(updateRestaurantValidation) , updateRestaurant); 
router.delete('/restaurants/:restaurantId' , authenticate , authorize('DELETE_RESTAURANT') , deleteRestaurant);

export default router;