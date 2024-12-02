import {
    getADeliveryPartnerService,
    getAllDeliveryPartners,
    getAllRestaurantOwners,
    getAllUsersService, getARestaurantOwnerService, getAUserService
} from "../../../services/internalAdminServices/userServices/UserService.js";

export const getUsers = async(req , res) => {
    try{
        const users = await getAllUsersService();
        return res.status(201).send({
            message : "Users Successfully Retrieved...",
            user : users
        })
    }
    catch(error){
        return res.status(500).send({
            message : "Error Getting Users...",
            error : error.message
        })
    }
}


export const getUser = async(req , res) => {
    try{
        const {customerId} = req.params;
        const user = await getAUserService({customerId});
        return res.status(201).send({
            message : "User Successfully Retrieved...",
            user : user
        })
    }
    catch(error){
        return res.status(500).send({
            message : "Error Getting A User...",
            error : error.message
        })
    }
}


export const getRestaurantOwners = async(req , res) => {
    try{
        const restaurantOwners = await getAllRestaurantOwners();
        return res.status(201).send({
            message : "Restaurant Owners Successfully Retrieved...",
            restaurantOwners : restaurantOwners
        })
    }
    catch(error){
        return res.status(500).send({
            message : "Error Getting Restaurant Owners...",
            error : error.message
        })
    }
}


export const getRestaurantOwner = async(req , res) => {
    try{
        const {vendorId} = req.params;
        const restaurantOwner = await getARestaurantOwnerService({vendorId});
        return res.status(201).send({
            message : "Restaurant Owner Successfully Retrieved...",
            restaurantOwner : restaurantOwner
        })
    }
    catch(error){
        return res.status(500).send({
            message : "Error Getting A Restaurant Owner...",
            error : error.message
        })
    }
}


export const getDeliveryPartners = async(req , res) => {
    try{
        const deliveryPartners = await getAllDeliveryPartners();
        return res.status(201).send({
            message : "Delivery Partners Successfully Retrieved...",
            deliveryPartners : deliveryPartners
        })
    }
    catch(error){
        return res.status(500).send({
            message : "Error Getting Delivery Partners...",
            error : error.message
        })
    }
}


export const getDeliveryPartner = async(req , res) => {
    try{
        const {courierId} = req.params;
        const deliveryPartner = await getADeliveryPartnerService({courierId});
        return res.status(201).send({
            message : "Delivery Partner Successfully Retrieved...",
            deliveryPartner : deliveryPartner
        })
    }
    catch(error){
        return res.status(500).send({
            message : "Error Getting A Delivery Partner...",
            error : error.message
        })
    }
}