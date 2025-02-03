import express from 'express';
import {authenticate} from "../../middlewares/authN_authZ/Authenticate.js";
import {authorize} from "../../middlewares/authN_authZ/Authorize.js";
import { acceptOrRejectOrder_R, getAllActiveOrdersForARestaurant, getAOrderForARestaurant, updateOrderStatusToInProgress_R, updateOrderStatusToOutForDelivery_R } from '../../controllers/vendorControllers/orderManagement/OrderControllers.js';
const router = express.Router();

// router.get('/restaurants/:restaurantId/orders', authenticate , authorize('VIEW_ALL_RESTAURANT_ORDERS'));
// router.put('/restaurants/:restaurantId/orders/:orderId', authenticate , authorize('UPDATE_ORDER_STATUS_VENDOR'));

router.get('/owner/:restaurantId/orders' , getAllActiveOrdersForARestaurant); // If Owner tries to get all Previous Orders -> getAllActiveOrdersForARestaurant will start executing.
router.get('/owner/:restaurantId/orders/:orderId' , getAOrderForARestaurant); // If Owner tries to get an active Order -> getAOrderForARestaurant will start executing.
router.put('/owner/:restaurantId/orders/accept-or-reject/:orderId' , acceptOrRejectOrder_R); // If Owner tries to update the status of Order -> acceptOrRejectOrder_R will start executing.
router.put('/owner/:restaurantId/orders/update-order-status-to-in-progress/:orderId' , updateOrderStatusToInProgress_R); // If Owner tries to update the status of Order -> updateOrderStatusToInProgress_R will start executing.
router.put('/owner/:restaurantId/orders/update-order-status-to-out-for-delivery/:orderId' , updateOrderStatusToOutForDelivery_R); // If Owner tries to update the status of Order -> updateOrderStatusToOutForDelivery_R will start executing.

export default router;