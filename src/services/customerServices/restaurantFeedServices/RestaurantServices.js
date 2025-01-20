import prisma from "../../../config/DB.js";

// Service for Getting All Restaurants
export const getAllRestaurantsService = async () => {
    try{    
        const restaurants = await prisma.restaurant.findMany();
        return restaurants;
    }  
    catch(error){
        throw new Error('Error Getting Restaurants : ' + error.message);
    }
};