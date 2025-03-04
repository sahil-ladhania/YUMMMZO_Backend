import express from 'express';
import {authenticate} from "../../middlewares/authN_authZ/Authenticate.js";
import {authorize} from "../../middlewares/authN_authZ/Authorize.js";
import { getDeliveryPartnerDetails, getOrderId, getOrderSummary, getRestaurantDetails, rateDeliveryPartner, rateOrderedItem, rateRestaurant } from '../../controllers/customerControllers/OrderSummaryAndRating/OrderSummaryAndRatings.js';
import { validateRequest } from '../../middlewares/dataValidation/ValidateRequestMiddleware.js';
import { ratingDeliveryPartner, ratingOrderedItem, ratingRestaurant } from '../../utils/data validations/customer/RatingValidation.js';
const router = express.Router();

// Add authenticate and authorize middleware
router.get('/user/:userId/get-orderId' , getOrderId);
router.get('/user/:userId/orderDetails/:orderId' , getOrderSummary);
router.get('/user/get-restaurant-details/:restaurantId' , getRestaurantDetails);
router.get('/user/get-delivery-partner-details/:partnerId' , getDeliveryPartnerDetails);
router.post('/user/:userId/order/:orderId/rate-restaurant/:restaurantId' , validateRequest(ratingRestaurant) , rateRestaurant);
router.post('/user/:userId/order/:orderId/rate-delivery-partner/:partnerId' , validateRequest(ratingDeliveryPartner) , rateDeliveryPartner);
router.post('/user/:userId/order/:orderId/rate-ordered-item/:orderedItemId' , validateRequest(ratingOrderedItem) , rateOrderedItem);

export default router;