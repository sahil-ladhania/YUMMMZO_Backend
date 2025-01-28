import express from 'express';
import {authenticate} from "../../middlewares/authN_authZ/Authenticate.js";
import {authorize} from "../../middlewares/authN_authZ/Authorize.js";
import { acceptOrRejectOrder_R, getAllActiveOrdersForARestaurant, getAOrderForARestaurant, updateOrderStatusToInProgress_R, updateOrderStatusToOutForDelivery_R } from '../../controllers/vendorControllers/orderManagement/OrderControllers.js';
const router = express.Router();

// router.get('/restaurants/:restaurantId/orders', authenticate , authorize('VIEW_ALL_RESTAURANT_ORDERS'));
// router.put('/restaurants/:restaurantId/orders/:orderId', authenticate , authorize('UPDATE_ORDER_STATUS_VENDOR'));

router.get('/owner/:restaurantId/orders' , getAllActiveOrdersForARestaurant);
router.get('/owner/:restaurantId/orders/:orderId' , getAOrderForARestaurant);
router.put('/owner/:restaurantId/orders/accept-or-reject/:orderId' , acceptOrRejectOrder_R);
router.put('/owner/:restaurantId/orders/update-order-status-to-in-progress/:orderId' , updateOrderStatusToInProgress_R);
router.put('/owner/:restaurantId/orders/update-order-status-to-out-for-delivery/:orderId' , updateOrderStatusToOutForDelivery_R);

export default router;