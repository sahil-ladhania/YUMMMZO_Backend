import {
    getADeliveryPartnerService,
    getAllDeliveryPartners,
    getAllRestaurantOwners,
    getAllUsersService, getARestaurantOwnerService, getAUserService
} from "../../../services/internalAdminServices/userServices/UserService.js";

export const getUsers = async(req , res , next) => {
    try{
        const users = await getAllUsersService();
        return res.status(200).send({
            message : "Users Successfully Retrieved...",
            user : users
        })
    }
    catch(error){
        next(error);
    }
}


export const getUser = async(req , res , next) => {
    try{
        const {customerId} = req.params;
        const user = await getAUserService({customerId});
        return res.status(200).send({
            message : "User Successfully Retrieved...",
            user : user
        })
    }
    catch(error){
        next(error);
    }
}


export const getRestaurantOwners = async(req , res , next) => {
    try{
        const restaurantOwners = await getAllRestaurantOwners();
        return res.status(201).send({
            message : "Restaurant Owners Successfully Retrieved...",
            restaurantOwners : restaurantOwners
        })
    }
    catch(error){
        next(error);
    }
}


export const getRestaurantOwner = async(req , res , next) => {
    try{
        const {vendorId} = req.params;
        const restaurantOwner = await getARestaurantOwnerService({vendorId});
        return res.status(201).send({
            message : "Restaurant Owner Successfully Retrieved...",
            restaurantOwner : restaurantOwner
        })
    }
    catch(error){
        next(error);
    }
}


export const getDeliveryPartners = async(req , res , next) => {
    try{
        const deliveryPartners = await getAllDeliveryPartners();
        return res.status(201).send({
            message : "Delivery Partners Successfully Retrieved...",
            deliveryPartners : deliveryPartners
        })
    }
    catch(error){
        next(error);
    }
}


export const getDeliveryPartner = async(req , res , next) => {
    try{
        const {courierId} = req.params;
        const deliveryPartner = await getADeliveryPartnerService({courierId});
        return res.status(201).send({
            message : "Delivery Partner Successfully Retrieved...",
            deliveryPartner : deliveryPartner
        })
    }
    catch(error){
        next(error);
    }
}