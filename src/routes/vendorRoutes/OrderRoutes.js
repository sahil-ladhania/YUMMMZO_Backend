import express from 'express';
import {authenticate} from "../../middlewares/authN_authZ/Authenticate.js";
import {authorize} from "../../middlewares/authN_authZ/Authorize.js";
import { acceptOrRejectOrder_R, getActiveOrderForARestaurant, getAllPreviousOrdersForARestaurant, updateOrderStatusToInProgress_R, updateOrderStatusToOutForDelivery_R } from '../../controllers/vendorControllers/orderManagement/OrderControllers.js';
import { validateRequest } from '../../middlewares/dataValidation/ValidateRequestMiddleware.js';
import { acceptOrRejectOrderValidation } from '../../utils/validations/vendor/AcceptOrRejectOrderValidation.js';
import { updateOrderStatusToOrderInProgressValidation } from '../../utils/validations/vendor/UpdateOrderStatusToOrderInProgressValidation.js';
import { updateOrderStatusToOutForDeliveryValidation } from '../../utils/validations/vendor/UpdateOrderStatusToOutForDelivery.js';
const router = express.Router();


router.get('/owner/:restaurantId/orders' , getAllPreviousOrdersForARestaurant); // If Owner tries to get all Previous Orders -> getAllActiveOrdersForARestaurant will start executing.
router.get('/owner/:restaurantId/orders/:orderId' , getActiveOrderForARestaurant); // If Owner tries to get an active Order -> getAOrderForARestaurant will start executing.
router.put('/owner/:restaurantId/orders/accept-or-reject/:orderId' , validateRequest(acceptOrRejectOrderValidation) , acceptOrRejectOrder_R); // If Owner tries to update the status of Order -> acceptOrRejectOrder_R will start executing.
router.put('/owner/:restaurantId/orders/accept-or-reject/:orderId' , acceptOrRejectOrder_R); // If Owner tries to update the status of Order -> acceptOrRejectOrder_R will start executing.
router.put('/owner/:restaurantId/orders/update-order-status-to-in-progress/:orderId' , validateRequest(updateOrderStatusToOrderInProgressValidation) , updateOrderStatusToInProgress_R); // If Owner tries to update the status of Order -> updateOrderStatusToInProgress_R will start executing.
router.put('/owner/:restaurantId/orders/update-order-status-to-out-for-delivery/:orderId' , validateRequest(updateOrderStatusToOutForDeliveryValidation) , updateOrderStatusToOutForDelivery_R); // If Owner tries to update the status of Order -> updateOrderStatusToOutForDelivery_R will start executing.

export default router;
