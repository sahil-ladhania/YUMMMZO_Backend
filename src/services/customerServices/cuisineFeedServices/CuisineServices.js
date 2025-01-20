import prisma from "../../../config/DB.js"

// Service to Get Al Cuisines
export const getAllCuisinesService = async() => {
    try{
        const cuisines = await prisma.cuisine.findMany(); // Will query the cuisine table and will retrieve all the cuisines -> Will get the array of objects in the cuisines variable
        return cuisines; // Return the cuisines array of objects
    }
    catch(error){
        throw new Error('Error Getting Cuisines : ' + error.message);
    }
}