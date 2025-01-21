import { searchAndSortRestaurantsService } from "../../../services/customerServices/restaurantFiltersServices/RestaurantFiltersServices.js";

// Controller to Search and Sort Restaurants
export const searchAndSortRestaurants = async (req , res , next) => {
    try{
        const { search , veg , priceRange , sort } = req.query; // Getting query values
        const [minPrice , maxPrice] = priceRange ? priceRange.split('-') : [null , null]; // Price Range mai se Min Price and Max Price Nikalo
        let sortingCriteria = {}; // Yaha pe hm sortingCriteria object banate hain, jo sare filters aur sorting options ko store karega jo hum pass karenge service function ko
        if(search){
            sortingCriteria.search = search; // Agar search parameter diya gaya hai, to usse sortingCriteria object me store karenge
        }
        if(veg){
            sortingCriteria.veg = veg; // Agar veg parameter hai (jo pure veg restaurants ko indicate karta hai), to usse bhi sortingCriteria me add karenge
        }
        if(minPrice && maxPrice){
            sortingCriteria.priceRange = { minPrice , maxPrice }; // Agar minPrice aur maxPrice available hain, to unko sortingCriteria.priceRange me store karenge
        }
        if(sort){
            sortingCriteria.sort = sort; // Agar sort parameter diya gaya hai (jaise “Cost:Low-High” ya “Cost:High-Low”), to usse sortingCriteria me store karenge
        }
        const filteredRestaurants = await searchAndSortRestaurantsService(sortingCriteria); // Hum searchAndSortRestaurantsService function ko sortingCriteria ke saath call karte hai and Isme jo bhi filters aur sorting parameters hain, wo pass kar diye jaate hain
        console.log(filteredRestaurants);
        return res.status(200).send({  // Sending the Response to user with message and filteredRestaurants
            message : "Filtered Restaurants Successfully Retrieved...",
            filteredRestaurants : filteredRestaurants
        })
    }
    catch(error){
        next(error);
    }
};
