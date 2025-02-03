import prisma from "../../../config/DB.js";

// Service for Getting All Restaurants
export const getAllRestaurantsService = async () => {
    try{    
        const restaurants = await prisma.restaurant.findMany(); // Will get all restaurants in the restaurants Variable -> Prisma will find all the restaurants from Restaurant Table and return it.
        return restaurants;
    }  
    catch(error){
        throw new Error('Error Getting Restaurants : ' + error.message);
    }
};

// Service for Getting A Restaurant
export const getARestaurantService = async ({restaurantId}) => {
    try{    
        const restaurant = await prisma.restaurant.findUnique({ // Will get a specific restaurant in the restaurant Variable -> Prisma will find a specific restaurant by restaurantId from Restaurant Table and return it.
            where : {restaurantId}
        });
        return restaurant;
    }  
    catch(error){
        throw new Error('Error Getting Restaurants : ' + error.message);
    }
};

// Service for Getting A Restaurant By UserId
export const getARestaurantByUserIdService = async ({userId}) => {
    try{    
        const restaurant = await prisma.restaurant.findMany({ // Will get a specific restaurant in the restaurant Variable -> Prisma will find a specific restaurant by userId from Restaurant Table and return it.
            where : {
                userId : userId
            }
        });
        return restaurant;
    }  
    catch(error){
        throw new Error('Error Getting Restaurants : ' + error.message);
    }
};