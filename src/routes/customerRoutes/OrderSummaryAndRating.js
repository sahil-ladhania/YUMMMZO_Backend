import express from 'express';
import {authenticate} from "../../middlewares/authN_authZ/Authenticate.js";
import {authorize} from "../../middlewares/authN_authZ/Authorize.js";
import { getDeliveryPartnerDetails, getOrderSummary, getRestaurantDetails, rateDeliveryPartner, rateOrderedItem, rateRestaurant } from '../../controllers/customerControllers/OrderSummaryAndRating/OrderSummaryAndRatings.js';
const router = express.Router();

router.get('/user/:userId/orderDetails/:orderId' , getOrderSummary);
router.post('/user/rate-ordered-item/:orderId/:orderedItemId' , rateOrderedItem);
router.get('/user/get-restaurant-details/:restaurantId' , getRestaurantDetails);
router.post('/user/rate-restaurant/:restaurantId' , rateRestaurant);
router.get('/user/get-delivery-partner-details/:partnerId' , getDeliveryPartnerDetails);
router.post('/user/rate-delivery-partner/:partnerId' , rateDeliveryPartner);

export default router;