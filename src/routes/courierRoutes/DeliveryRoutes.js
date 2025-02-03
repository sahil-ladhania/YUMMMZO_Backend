import express from 'express';
import {authenticate} from "../../middlewares/authN_authZ/Authenticate.js";
import {authorize} from "../../middlewares/authN_authZ/Authorize.js";
import { assignDeliveryPartner, getActiveDeliveryDetails, getAllDeliveriesDoneByAPartner, getOrderDetailsOfCurrentDeliveryForAPartner, updateOrderStatusToDelivered, updateOrderStatusToOnTheWay } from '../../controllers/courierControllers/deliveryManagement/DeliveryControllers.js';
const router  = express.Router();

// router.get('/delivery/orders', authenticate , authorize('VIEW_ACTIVE_ORDERS'))
// router.put('/delivery/orders/:orderId/status', authenticate , authorize('UPDATE_ORDER_STATUS_COURIER'))
// router.get('/delivery/history', authenticate , authorize('VIEW_DELIVERY_HISTORY'))

router.put('/user/:userId/partner/:restaurantId/assign-delivery-partner/orders/:orderId', assignDeliveryPartner); // If Owner Update the Status to OUT FOR DELIVERY -> assignDeliveryPartner will start executing.
router.put('/partner/:partnerId/:restaurantId/order-on-the-way/orders/:orderId', updateOrderStatusToOnTheWay); // If Partner tries to Update the Order Status -> updateOrderStatusToOnTheWay will start executing.
router.put('/partner/:partnerId/:restaurantId/order-delivered/orders/:orderId', updateOrderStatusToDelivered); // If Partner tries to Update the Order Status -> updateOrderStatusToDelivered will start executing.
router.get('/partner/:partnerId/get-active-delivery/orders/:orderId', getActiveDeliveryDetails); // If Partner tries to get active delivery Details -> getActiveDeliveryDetails will start executing.
router.get('/partner/:partnerId/get-all-deliveries', getAllDeliveriesDoneByAPartner); // If Partner tries to get all deliveries done -> getAllDeliveriesDoneByAPartner will start executing.
router.get('/partner/:partnerId/get-orderId', getOrderDetailsOfCurrentDeliveryForAPartner); // If Partner tries to get current delivery details -> getOrderDetailsOfCurrentDeliveryForAPartner will start executing.

export default router ;