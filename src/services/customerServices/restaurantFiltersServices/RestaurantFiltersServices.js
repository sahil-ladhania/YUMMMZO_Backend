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
        const filteredRestaurants = await prisma.restaurant.findMany({ // Will get filtered restaurants in filteredRestaurants Variable -> Prisma will find all restaurants that matches where and orderBy criterias from the Restaurant Table and return it.
            where,
            orderBy
        })
        return filteredRestaurants;
    }
    catch(error){
        throw new Error('Error Searching and Sorting Restaurants  : ' + error.message + error.stack);
    }
};
