import express from 'express';
import {authenticate} from "../../middlewares/authN_authZ/Authenticate.js";
import {authorize} from "../../middlewares/authN_authZ/Authorize.js";
import { placeOrder } from '../../controllers/customerControllers/ordersAndPayments/OrdersAndPayments.js';
import { validateRequest } from '../../middlewares/dataValidation/ValidateRequestMiddleware.js';
import { placeOrderValidation } from '../../utils/validations/customer/PlaceOrderValidation.js';
const router = express.Router();

router.post('/user/:userId/restaurant/:restaurantId/place-order' , authenticate , authorize('PLACE_ORDER_AND_PAY') , validateRequest(placeOrderValidation) , placeOrder); // If User tries to place an order -> placeOrder will start executing.

export default router;