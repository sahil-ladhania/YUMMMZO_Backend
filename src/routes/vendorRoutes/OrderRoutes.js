import express from 'express';
import {authenticate} from "../../middlewares/authN_authZ/Authenticate.js";
import {authorize} from "../../middlewares/authN_authZ/Authorize.js";
import { acceptOrRejectOrder_R, getActiveOrderForARestaurant, getAllPreviousOrdersForARestaurant, updateOrderStatusToInProgress_R, updateOrderStatusToOutForDelivery_R } from '../../controllers/vendorControllers/orderManagement/OrderControllers.js';
import { validateRequest } from '../../middlewares/dataValidation/ValidateRequestMiddleware.js';
import { acceptOrRejectOrderValidation } from '../../utils/data validations/vendor/AcceptOrRejectOrderValidation.js';
import { updateOrderStatusToOrderInProgressValidation } from '../../utils/data validations/vendor/UpdateOrderStatusToOrderInProgressValidation.js';
import { updateOrderStatusToOutForDeliveryValidation } from '../../utils/data validations/vendor/UpdateOrderStatusToOutForDelivery.js';
const router = express.Router();

router.get('/owner/:restaurantId/orders' , authenticate , getAllPreviousOrdersForARestaurant); 
router.get('/owner/:restaurantId/orders/:orderId' , authenticate , getActiveOrderForARestaurant);
router.put('/owner/:restaurantId/orders/accept-or-reject/:orderId' , authenticate , validateRequest(acceptOrRejectOrderValidation) , acceptOrRejectOrder_R); 
router.put('/owner/:restaurantId/orders/update-order-status-to-in-progress/:orderId' , authenticate , validateRequest(updateOrderStatusToOrderInProgressValidation) , updateOrderStatusToInProgress_R); 
router.put('/owner/:restaurantId/orders/update-order-status-to-out-for-delivery/:orderId' , authenticate , validateRequest(updateOrderStatusToOutForDeliveryValidation) , updateOrderStatusToOutForDelivery_R); 

export default router;