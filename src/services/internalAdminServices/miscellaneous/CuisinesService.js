import prisma from "../../../config/DB.js";


export const checkIfCuisineExist = async({name}) => {
    try{
        const ifCuisineExist = await prisma.cuisine.findUnique({ // Querying the Cuisine Table and checking through the Cuisine Name
            where : {name}
        })
        return ifCuisineExist; // Return the Cuisine Object or null
    }
    catch(error){
        throw new Error('Error Checking Cuisine Existence : ' + error.message + error.stack);
    }
}

export const createCuisineService = async({name , description , image}) => {
    try{
        const newCuisine = await prisma.cuisine.create({ // Creating a new record for Cusine in Cuisine Table
            data : {
                name : name,
                description : description,
                image : image
            }
        })
        return newCuisine; // Return the new created Cuisine Object or null
    }
    catch(error){
        throw new Error('Error Creating a new Cuisine  : ' + error.message + error.stack);
    }
}