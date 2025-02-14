import prisma from "../../../config/DB.js";

// Validation to Check If a Restaurant Belongs to Owner
export const checkIfRestaurantBelongsToOwner = async ({ restaurantId , ownerId }) => {
    try{
        const restaurant = await prisma.restaurant.findUnique({
            where : {
                restaurantId : restaurantId,
                // userId : ownerId
            },
            select : {
                userId : true
            }
        })
        if(!restaurant){
            return false;
        }
        return restaurant.userId === ownerId;
    }
    catch(error){
        throw new Error('Error Checking If a Restaurant Beloongs To a Owner : ' + error.message + error.stack);
    }
};

// Validation to Check If a Order Belongs to Restaurant
export const checkIfOrderBelongsToRestaurant = async ({ orderId , restaurantId }) => {
    try{
        const order = await prisma.order.findUnique({
            where : {
                orderId : orderId
            },
            select : {
                restaurantId : true
            }  
        })
        if(!order){
            return false;
        }
        return order.restaurantId === restaurantId;
    }
    catch(error){
        throw new Error('Error Checking If a Order Beloongs To a Restaurant : ' + error.message + error.stack);
    }
};