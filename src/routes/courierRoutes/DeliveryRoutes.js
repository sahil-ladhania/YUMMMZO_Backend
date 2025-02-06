import express from 'express';
import {authenticate} from "../../middlewares/authN_authZ/Authenticate.js";
import {authorize} from "../../middlewares/authN_authZ/Authorize.js";
import { assignDeliveryPartner, getActiveDeliveryDetails, getAllDeliveriesDoneByAPartner, getOrderDetailsOfCurrentDeliveryForAPartner, updateOrderStatusToDelivered, updateOrderStatusToOnTheWay } from '../../controllers/courierControllers/deliveryManagement/DeliveryControllers.js';
import { validateRequest } from '../../middlewares/dataValidation/ValidateRequestMiddleware.js';
import { assignDeliveryPartnerValidation } from '../../utils/validations/courier/AssignDeliveryPartnerValidation.js';
import { updateDeliveryStatusToOnTheWayValidation } from '../../utils/validations/courier/UpdateDeliveryStatusToOnTheWayValidation.js';
import { updateDeliveryStatusToDeliveredValidation } from '../../utils/validations/courier/UpdateDeliveryStatusToDeliveredValidation.js';
const router  = express.Router();

// router.get('/delivery/orders', authenticate , authorize('VIEW_ACTIVE_ORDERS'))
// router.put('/delivery/orders/:orderId/status', authenticate , authorize('UPDATE_ORDER_STATUS_COURIER'))
// router.get('/delivery/history', authenticate , authorize('VIEW_DELIVERY_HISTORY'))

router.put('/user/:userId/partner/:restaurantId/assign-delivery-partner/orders/:orderId', validateRequest(assignDeliveryPartnerValidation) , assignDeliveryPartner); // If Owner Update the Status to OUT FOR DELIVERY -> assignDeliveryPartner will start executing.
router.put('/partner/:partnerId/:restaurantId/order-on-the-way/orders/:orderId', validateRequest(updateDeliveryStatusToOnTheWayValidation) , updateOrderStatusToOnTheWay); // If Partner tries to Update the Order Status -> updateOrderStatusToOnTheWay will start executing.
router.put('/partner/:partnerId/:restaurantId/order-delivered/orders/:orderId', validateRequest(updateDeliveryStatusToDeliveredValidation) , updateOrderStatusToDelivered); // If Partner tries to Update the Order Status -> updateOrderStatusToDelivered will start executing.
router.get('/partner/:partnerId/get-active-delivery/orders/:orderId', getActiveDeliveryDetails); // If Partner tries to get active delivery Details -> getActiveDeliveryDetails will start executing.
router.get('/partner/:partnerId/get-all-deliveries', getAllDeliveriesDoneByAPartner); // If Partner tries to get all deliveries done -> getAllDeliveriesDoneByAPartner will start executing.
router.get('/partner/:partnerId/get-orderId', getOrderDetailsOfCurrentDeliveryForAPartner); // If Partner tries to get current delivery details -> getOrderDetailsOfCurrentDeliveryForAPartner will start executing.

export default router ;