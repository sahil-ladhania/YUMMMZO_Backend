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

/* 
    Depending on the Route User has gone through , that controller will be activated , and the flow will be like :-
    1st step - authenticate Middleware will Run
    2nd step - authorize Middleware will Run
    3rd step - Controller Function will be Called
    Note - 
        If in the middle the flow stops , it wont run the Controller Function
        To run the Controller Function , all the Middleware should run 
*/ 
router.get('/users' , authenticate , authorize('VIEW_ALL_USERS') , getUsers); // If user wants to go to /users route -> authenticate Middleware will be called -> authorize('VIEW_ALL_USERS') Middleware with the specified permission will be called -> Then getUsers Controller Function will be called
router.get('/user/:customerId' , authenticate , authorize('VIEW_USER_DETAILS') , getUser);
router.get('/restaurantOwners' , authenticate , authorize('VIEW_ALL_RESTAURANT_OWNERS') , getRestaurantOwners);
router.get('/restaurantOwner/:vendorId' , authenticate , authorize('VIEW_RESTAURANT_OWNER_DETAILS') , getRestaurantOwner);
router.get('/deliveryPartners' , authenticate , authorize('VIEW_ALL_DELIVERY_PARTNERS') , getDeliveryPartners);
router.get('/deliveryPartner/:courierId' , authenticate , authorize('VIEW_DELIVERY_PARTNER_DETAILS') , getDeliveryPartner);

export default router;