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

// Service for Getting A Restaurants
export const getARestaurantService = async ({restaurantId}) => {
    try{    
        const restaurant = await prisma.restaurant.findUnique({
            where : {restaurantId}
        });
        return restaurant;
    }  
    catch(error){
        throw new Error('Error Getting Restaurants : ' + error.message);
    }
};