import express from 'express';
import {authenticate} from "../../middlewares/authN_authZ/Authenticate.js";
import {authorize} from "../../middlewares/authN_authZ/Authorize.js";
import { assignDeliveryPartner, getActiveDeliveryDetails, getAllDeliveriesDoneByAPartner, getOrderDetailsOfCurrentDeliveryForAPartner, updateOrderStatusToDelivered, updateOrderStatusToOnTheWay } from '../../controllers/courierControllers/deliveryManagement/DeliveryControllers.js';
import { validateRequest } from '../../middlewares/dataValidation/ValidateRequestMiddleware.js';
import { assignDeliveryPartnerValidation } from '../../utils/data validations/courier/AssignDeliveryPartnerValidation.js';
import { updateDeliveryStatusToOnTheWayValidation } from '../../utils/data validations/courier/UpdateDeliveryStatusToOnTheWayValidation.js';
import { updateDeliveryStatusToDeliveredValidation } from '../../utils/data validations/courier/UpdateDeliveryStatusToDeliveredValidation.js';
const router  = express.Router();

router.get('/partner/:partnerId/get-active-delivery/orders/:orderId', authenticate , getActiveDeliveryDetails); 
router.get('/partner/:partnerId/get-all-deliveries', authenticate , getAllDeliveriesDoneByAPartner); 
router.get('/partner/:partnerId/get-orderId', authenticate , getOrderDetailsOfCurrentDeliveryForAPartner); 
router.put('/user/:userId/partner/:restaurantId/assign-delivery-partner/orders/:orderId', authenticate , authorize('ASSIGN_DELIVERY_PARTNER') , validateRequest(assignDeliveryPartnerValidation) , assignDeliveryPartner); 
router.put('/partner/:partnerId/:restaurantId/order-on-the-way/orders/:orderId', authenticate , validateRequest(updateDeliveryStatusToOnTheWayValidation) , updateOrderStatusToOnTheWay); 
router.put('/partner/:partnerId/:restaurantId/order-delivered/orders/:orderId', authenticate , validateRequest(updateDeliveryStatusToDeliveredValidation) , updateOrderStatusToDelivered);

export default router ;