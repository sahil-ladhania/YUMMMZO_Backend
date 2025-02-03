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

router.get('/users' , authenticate , authorize('VIEW_ALL_USERS') , getUsers); // If Admin tries to get all users -> getUsers will start executing.
router.get('/user/:customerId' , authenticate , authorize('VIEW_USER_DETAILS') , getUser); // If Admin tries to get a specific customer -> getUser will start executing.
router.get('/restaurantOwners' , authenticate , authorize('VIEW_ALL_RESTAURANT_OWNERS') , getRestaurantOwners); // If Admin tries to get all vendors -> getRestaurantOwners will start executing.
router.get('/restaurantOwner/:vendorId' , authenticate , authorize('VIEW_RESTAURANT_OWNER_DETAILS') , getRestaurantOwner); // If Admin tries to get a specific vendor -> getRestaurantOwner will start executing.
router.get('/deliveryPartners' , authenticate , authorize('VIEW_ALL_DELIVERY_PARTNERS') , getDeliveryPartners); // If Admin tries to get all courier -> getDeliveryPartners will start executing.
router.get('/deliveryPartner/:courierId' , authenticate , authorize('VIEW_DELIVERY_PARTNER_DETAILS') , getDeliveryPartner); // If Admin tries to get a specific courier -> getDeliveryPartner will start executing.

export default router;