import prisma from "../../../config/DB.js"

export const getAllCuisinesService = async() => {
    try{
        const cuisines = await prisma.cuisine.findMany();
        console.log(cuisines);
        return cuisines;
    }
    catch(error){
        throw new Error('Error Getting Cuisines : ' + error.message);
    }
}