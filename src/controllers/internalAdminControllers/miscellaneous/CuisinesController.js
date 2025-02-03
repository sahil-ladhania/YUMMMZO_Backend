import { checkIfCuisineExist, createCuisineService } from "../../../services/internalAdminServices/miscellaneous/CuisinesService.js";

export const createCuisine = async(req , res , next) => { 
    try{
        const {name , description , image} = req.body;
        if(!name || !description || !image){
            return res.status(400).send({
                message : "Please fill all required fields..."
            })
        }
        const ifCuisineExist = await checkIfCuisineExist({name}); // Will get an existing cuisine object or null in the ifCuisineExist Variable -> checkIfCuisineExist will start executing and will take name.
        if(!ifCuisineExist){
            const createdCuisine = await createCuisineService({name , description , image}); // Will get a new created cuisine in the createdCuisine Variable -> createCuisineService will start executing and will take name , descrition and image.
            return res.status(201).send({ 
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