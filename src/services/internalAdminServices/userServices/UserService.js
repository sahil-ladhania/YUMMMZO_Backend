import prisma from "../../../config/DB.js";

export const getAllUsersService = async() => {
    try{
        const users = await prisma.user.findMany({
            where : {
                role : 'CUSTOMER'
            }
        });
        return users;
    }
    catch(error){
        throw new Error('Error Getting Users : ' + error.message);
    }
}

export const getAllRestaurantOwners = async() => {
    try{
        const restaurantOwners = await prisma.user.findMany({
            where : {
                role : 'VENDOR'
            }
        });
        return restaurantOwners;
    }
    catch(error){
        throw new Error('Error Getting Restaurant Owners : ' + error.message);
    }
}

export const getAllDeliveryPartners = async() => {
    try{
        const deliveryPartners = await prisma.user.findMany({
            where : {
                role : 'COURIER'
            }
        });
        return deliveryPartners;
    }
    catch(error){
        throw new Error('Error Getting Delivery Partners : ' + error.message);
    }
}
