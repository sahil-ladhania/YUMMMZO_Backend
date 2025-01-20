import { getAllRestaurantsService } from "../../../services/customerServices/restaurantFeedServices/RestaurantServices.js";

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