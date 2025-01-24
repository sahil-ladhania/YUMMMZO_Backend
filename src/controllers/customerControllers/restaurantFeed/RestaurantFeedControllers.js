import { getAllRestaurantsService, getARestaurantService } from "../../../services/customerServices/restaurantFeedServices/RestaurantServices.js";

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