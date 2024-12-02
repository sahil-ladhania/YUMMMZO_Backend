import express from 'express';
import {
    getDeliveryPartners,
    getRestaurantOwners,
    getUsers
} from "../../controllers/internalAdminControllers/users/UserController.js";
const router = express.Router();

router.get('/users' , getUsers);
router.get('/restaurantOwners' , getRestaurantOwners);
router.get('/deliveryPartners' , getDeliveryPartners);

export default router;