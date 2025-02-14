import prisma from "../../../config/DB.js";

// Service to Get All Users
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

// Service to Get a User
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

// Service to Get All Restaurant Owners
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

// Service to Get a Restaurant Owner
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

// Service to Get All Delivery Partners
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

// Service to Get a Delivery Partner
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
