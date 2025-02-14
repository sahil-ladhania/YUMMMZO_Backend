import prisma from "../../../config/DB.js"

// Service to Get All Cuisines
export const getAllCuisinesService = async() => {
    try{
        const cuisines = await prisma.cuisine.findMany(); 
        return cuisines; 
    }
    catch(error){
        throw new Error('Error Getting Cuisines : ' + error.message);
    }
}