import {
    getAllDeliveryPartners,
    getAllRestaurantOwners,
    getAllUsersService
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