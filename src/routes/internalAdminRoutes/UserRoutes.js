import express from 'express';
import {
    getDeliveryPartner,
    getDeliveryPartners, getRestaurantOwner,
    getRestaurantOwners, getUser,
    getUsers
} from "../../controllers/internalAdminControllers/users/UserController.js";
import {authenticate} from "../../middlewares/authN_authZ/Authenticate.js";
import {authorize} from "../../middlewares/authN_authZ/Authorize.js";
const router = express.Router();

router.get('/users' , authenticate , authorize('VIEW_ALL_USERS') , getUsers);
router.get('/user/:customerId' , authenticate , authorize('VIEW_USER_DETAILS') , getUser);
router.get('/restaurantOwners' , authenticate , authorize('VIEW_ALL_RESTAURANT_OWNERS') , getRestaurantOwners);
router.get('/restaurantOwner/:vendorId' , authenticate , authorize('VIEW_RESTAURANT_OWNER_DETAILS') , getRestaurantOwner);
router.get('/deliveryPartners' , authenticate , authorize('VIEW_ALL_DELIVERY_PARTNERS') , getDeliveryPartners);
router.get('/deliveryPartner/:courierId' , authenticate , authorize('VIEW_DELIVERY_PARTNER_DETAILS') , getDeliveryPartner);

export default router;