import prisma from "../../../config/DB.js";

// Service to Search and Sort Restaurants
export const searchAndSortRestaurantsService = async (criteria) => {
    try{
        const { search, veg, priceRange, sort } = criteria; 
        let where = {};
        if(search){
            where.restaurantName = {
                contains : search   
            }
        }
        if(veg){
            where.isPureVeg = true;
        }
        if(priceRange){
            where.priceForTwo = {
                gte : Number(priceRange.minPrice),
                lte : Number(priceRange.maxPrice)
            }
        }
        let orderBy = {};
        if(sort){ 
            if(sort === 'Cost:Low-High'){
                orderBy = {
                    priceForTwo : 'asc'
                }
            }
            if(sort === 'Cost:High-Low'){
                orderBy = {
                    priceForTwo : 'desc'
                }
            }
        }
        const filteredRestaurants = await prisma.restaurant.findMany({
            where,
            orderBy
        })
        return filteredRestaurants;
    }
    catch(error){
        throw new Error('Error Searching and Sorting Restaurants  : ' + error.message + error.stack);
    }
};
