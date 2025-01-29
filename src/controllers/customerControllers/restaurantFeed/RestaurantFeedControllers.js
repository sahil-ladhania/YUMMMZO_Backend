import { getAllRestaurantsService, getARestaurantByUserIdService, getARestaurantService } from "../../../services/customerServices/restaurantFeedServices/RestaurantServices.js";

// Controller for Getting All Restaurants
export const getAllRestaurants = async (req , res , next) => {
    try{
        const restaurants = await getAllRestaurantsService();
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
        const restaurant = await getARestaurantService({restaurantId : restaurantId_INT});
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
        const restaurant = await getARestaurantByUserIdService({userId : userId_INT});
        return res.status(200).send({ 
            message : "Restaurant Successfully Retrieved...",
            restaurant : restaurant
        })
    }
    catch(error){
        next(error);
    }
};