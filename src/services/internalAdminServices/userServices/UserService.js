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


export const getAUserService = async({customerId}) => {
    try{
        const user = await prisma.user.findUnique({
            where : {
                userId : parseInt(customerId)
            }
        });
        return user;
    }
    catch(error){
        throw new Error('Error Getting A User : ' + error.message);
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


export const getARestaurantOwnerService = async({vendorId}) => {
    try{
        const restaurantOwner = await prisma.user.findUnique({
            where : {
                userId : parseInt(vendorId)
            }
        });
        return restaurantOwner;
    }
    catch(error){
        throw new Error('Error Getting A Restaurant Owner : ' + error.message);
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


export const getADeliveryPartnerService = async({courierId}) => {
    try{
        const deliveryPartner = await prisma.user.findUnique({
            where : {
                userId : parseInt(courierId)
            }
        });
        return deliveryPartner;
    }
    catch(error){
        throw new Error('Error Getting A User : ' + error.message);
    }
}
