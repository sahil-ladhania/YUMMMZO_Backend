import prisma from "../../../config/DB.js"

// Service to Get Al Cuisines
export const getAllCuisinesService = async() => {
    try{
        const cuisines = await prisma.cuisine.findMany(); // Will get all cuisines in the cuisines Variable -> Prisma will find all the cuisines from Cuisine Table and return it.
        return cuisines; 
    }
    catch(error){
        throw new Error('Error Getting Cuisines : ' + error.message);
    }
}