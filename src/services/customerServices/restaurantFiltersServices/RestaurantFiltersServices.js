import prisma from "../../../config/DB.js";

// Service to Search and Sort Restaurants
export const searchAndSortRestaurantsService = async (criteria) => {
    try{
        const { search, veg, priceRange, sort } = criteria; // Service function ko jo criteria pass hota hai (jo humne controller me banaya tha), usse hum search, veg, priceRange, aur sort ko extract kar rahe hain
        let where = {}; // where object ko hum initialize karte hain , Ye object Prisma query me filters ko dynamically add karne ke liye use hota hai
        if(search){
            where.restaurantName = { // Agar search parameter diya gaya hai, to hum where object me restaurantName ko filter karte hain, jisme contains operator use karte hain, Matlab jo restaurant name mein search term hoga, wo match hoga
                contains : search   
            }
        }
        if(veg){
            where.isPureVeg = true; // Agar veg diya gaya hai, to hum filter karte hain restaurants ko jahan isPureVeg property true ho , Yani, sirf pure veg restaurants ko filter karenge
        }
        if(priceRange){
            where.priceForTwo = {
                gte : Number(priceRange.minPrice), // Agar priceRange diya gaya hai, to hum where object me priceForTwo filter karte hain, gte (greater than or equal) aur lte (less than or equal) ko use karke min aur max price range ko apply karte hain
                lte : Number(priceRange.maxPrice)
            }
        }
        let orderBy = {}; // orderBy object ko initialize karte hain, jisme sorting logic ko store karenge
        if(sort){ // Agar sort parameter diya gaya hai, to hum orderBy me sorting logic ko apply karte hain
            if(sort === 'Cost:Low-High'){
                orderBy = {
                    priceForTwo : 'asc' // Agar sort = ‘Cost:Low-High’ hai, to hum priceForTwo ko ascending order (low to high) mein sort karenge
                }
            }
            if(sort === 'Cost:High-Low'){
                orderBy = {
                    priceForTwo : 'desc' // Agar sort = ‘Cost:High-Low’ hai, to hum priceForTwo ko descending order (high to low) mein sort karenge
                }
            }
        }
        const filteredRestaurants = await prisma.restaurant.findMany({ // prisma.restaurant.findMany se hum query ko execute karte hain, jisme where (filter conditions) aur orderBy (sorting conditions) pass kiye jaate hain
            where,
            orderBy
        })
        return filteredRestaurants;
    }
    catch(error){
        throw new Error('Error Searching and Sorting Restaurants  : ' + error.message + error.stack);
    }
};
