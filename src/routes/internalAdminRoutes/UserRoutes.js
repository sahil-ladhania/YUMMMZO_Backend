import express from 'express';
import {
    getDeliveryPartner,
    getDeliveryPartners, getRestaurantOwner,
    getRestaurantOwners, getUser,
    getUsers
} from "../../controllers/internalAdminControllers/users/UserController.js";
const router = express.Router();

router.get('/users' , getUsers);
router.get('/user/:customerId' , getUser);
router.get('/restaurantOwners' , getRestaurantOwners);
router.get('/restaurantOwner/:vendorId' , getRestaurantOwner);
router.get('/deliveryPartners' , getDeliveryPartners);
router.get('/deliveryPartner/:courierId' , getDeliveryPartner);

export default router;