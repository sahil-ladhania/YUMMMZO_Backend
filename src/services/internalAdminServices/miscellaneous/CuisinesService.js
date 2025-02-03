import prisma from "../../../config/DB.js";


export const checkIfCuisineExist = async({name}) => {
    try{
        const ifCuisineExist = await prisma.cuisine.findUnique({ // Will get a specific cuisine object or null in ifCuisineExist Variable -> Prisma will find a specific cuisine from the Cuisine Table and return it.
            where : {name}
        })
        return ifCuisineExist; 
    }
    catch(error){
        throw new Error('Error Checking Cuisine Existence : ' + error.message + error.stack);
    }
}

export const createCuisineService = async({name , description , image}) => {
    try{
        const newCuisine = await prisma.cuisine.create({ // Will get a new cuisine in newCuisine Variable -> Prisma will create a new cuisine and insert it in the Cuisine Table and return it.
            data : {
                name : name,
                description : description,
                image : image
            }
        })
        return newCuisine; 
    }
    catch(error){
        throw new Error('Error Creating a new Cuisine  : ' + error.message + error.stack);
    }
}