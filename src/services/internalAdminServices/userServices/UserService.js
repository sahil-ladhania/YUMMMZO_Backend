import prisma from "../../../config/DB.js";

export const getAllUsersService = async() => {
    try{
        const users = await prisma.user.findMany({ // Will get all customers in the users Variable -> Prisma will find all the users with role CUSTOMER from User Table and return it.
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
        const user = await prisma.user.findUnique({ // Will get a specific customer in user Variable -> Prisma will find a specific user with the role CUSTOMER from the User Table and return it.
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
        const restaurantOwners = await prisma.user.findMany({ // Will get all vendors in the restaurantOwners Variable -> Prisma will find all the vendors with role VENDOR from User Table and return it.
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
        const restaurantOwner = await prisma.user.findUnique({ // Will get a specific vendor in restaurantOwner Variable -> Prisma will find a specific vendor with the role VENDOR from the User Table and return it.
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
        const deliveryPartners = await prisma.user.findMany({ // Will get all partners in the deliveryPartners Variable -> Prisma will find all the partners with role COURIER from User Table and return it.
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
        const deliveryPartner = await prisma.user.findUnique({ // Will get a specific courier in deliveryPartner Variable -> Prisma will find a specific courier with the role COURIER from the User Table and return it.
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
