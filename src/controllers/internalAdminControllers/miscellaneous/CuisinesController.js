import { checkIfCuisineExist, createCuisineService } from "../../../services/internalAdminServices/miscellaneous/CuisinesService.js";

export const createCuisine = async(req , res , next) => { 
    try{
        const {name , description , image} = req.body;
        if(!name || !description || !image){
            return res.status(400).send({
                message : "Please fill all required fields..."
            })
        }
        const ifCuisineExist = await checkIfCuisineExist({name}); // Checking if Cuisine already exist or not -> Will get a Cusine Object with data in it or null
        if(!ifCuisineExist){
            const createdCuisine = await createCuisineService({name , description , image}); // Create a new Cuisine if the Cuisine dont exist already -> Will get a Cuisine Object with the data in it
            return res.status(201).send({ // Return the response with message and new created Cuisine
                message : "Cuisine Successfully Created...",
                cuisine : createdCuisine
            })
        }
        else{
            return res.status(400).send({
                message : "Cuisine Already Exist..."
            })
        }
    }
    catch(error){
        next(error);
    }
}