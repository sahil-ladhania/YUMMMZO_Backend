import express from 'express';
import {authenticate} from "../../middlewares/authN_authZ/Authenticate.js";
import {authorize} from "../../middlewares/authN_authZ/Authorize.js";
import { createRestaurant, deleteRestaurant, updateRestaurant } from '../../controllers/vendorControllers/restaurantManagement/RestaurantControllers.js';
import { validateRequest } from '../../middlewares/dataValidation/ValidateRequestMiddleware.js';
import { createRestaurantValidation } from '../../utils/validations/vendor/CreateRestaurantValidation.js';
import { updateRestaurantValidation } from '../../utils/validations/vendor/UpdateRestaurantValidation.js';
const router = express.Router();

router.post('/restaurants' , authenticate , authorize('CREATE_RESTAURANT') , validateRequest(createRestaurantValidation) , createRestaurant); // If Owner tries to create a new restaurant -> createRestaurant will start executing.
router.put('/restaurants/:restaurantId' , authenticate , authorize('UPDATE_RESTAURANT') , validateRequest(updateRestaurantValidation) , updateRestaurant); // If Owner tries to update an existing restaurant -> updateRestaurant will start executing.
router.delete('/restaurants/:restaurantId' , authenticate , authorize('DELETE_RESTAURANT') , deleteRestaurant); // If Owner tries to delete an existing restaurant -> deleteRestaurant will start executing.

export default router;