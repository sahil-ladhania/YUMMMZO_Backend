import { searchAndSortRestaurantsService } from "../../../services/customerServices/restaurantFiltersServices/RestaurantFiltersServices.js";

// Controller to Search and Sort Restaurants
export const searchAndSortRestaurants = async (req , res , next) => {
    try{
        const { search , veg , priceRange , sort } = req.query;
        const [minPrice , maxPrice] = priceRange ? priceRange.split('-') : [null , null];
        let sortingCriteria = {}; 
        if(search){
            sortingCriteria.search = search; 
        }
        if(veg){
            sortingCriteria.veg = veg;
        }
        if(minPrice && maxPrice){
            sortingCriteria.priceRange = { minPrice , maxPrice }; 
        }
        if(sort){
            sortingCriteria.sort = sort; 
        }
        const filteredRestaurants = await searchAndSortRestaurantsService(sortingCriteria); // Will get filtered restaurants in the filteredRestaurants Variable -> searchAndSortRestaurantsService will start executing and will take sortingCriteria which is an object.
        return res.status(200).send({  
            message : "Filtered Restaurants Successfully Retrieved...",
            filteredRestaurants : filteredRestaurants
        })
    }
    catch(error){
        next(error);
    }
};
