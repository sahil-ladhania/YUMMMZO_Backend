import { getAllRestaurantsService, getARestaurantByUserIdService, getARestaurantService } from "../../../services/customerServices/restaurantFeedServices/RestaurantServices.js";

// Controller for Getting All Restaurants
export const getAllRestaurants = async (req , res , next) => {
    try{
        const restaurants = await getAllRestaurantsService(); // Will get all restaurants in the restaurants Variable -> getAllRestaurantsService will start executing.
        return res.status(200).send({ 
            message : "Restaurants Successfully Retrieved...",
            restaurants : restaurants
        })
    }
    catch(error){
        next(error);
    }
};

// Controller for Getting All Restaurants
export const getARestaurant = async (req , res , next) => {
    try{
        const {restaurantId} = req.params;
        const restaurantId_INT = parseInt(restaurantId);
        const restaurant = await getARestaurantService({restaurantId : restaurantId_INT}); // Will get a specific restaurant in the restaurant Variable -> getARestaurantService will start executing and will take restaurantId.
        return res.status(200).send({ 
            message : "Restaurant Successfully Retrieved...",
            restaurant : restaurant
        })
    }
    catch(error){
        next(error);
    }
};

// Controller for Getting All Restaurant By UserId
export const getARestaurantByUserId = async (req , res , next) => {
    try{
        const {userId} = req.params;
        const userId_INT = parseInt(userId);
        const restaurant = await getARestaurantByUserIdService({userId : userId_INT}); // Will get a specific restaurant in the restaurant Variable -> getARestaurantByUserIdService will start executing and will take userId.
        return res.status(200).send({ 
            message : "Restaurant Successfully Retrieved...",
            restaurant : restaurant
        })
    }
    catch(error){
        next(error);
    }
};