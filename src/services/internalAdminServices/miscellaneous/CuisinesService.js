import prisma from "../../../config/DB.js";


export const checkIfCuisineExist = async({name}) => {
    try{
        const ifCuisineExist = await prisma.cuisine.findUnique({
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
        const newCuisine = await prisma.cuisine.create({
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