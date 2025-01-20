import { checkIfCuisineExist, createCuisineService } from "../../../services/internalAdminServices/miscellaneous/CuisinesService.js";

export const createCuisine = async(req , res , next) => { 
    try{
        const {name , description , image} = req.body;
        if(!name || !description || !image){
            return res.status(400).send({
                message : "Please fill all required fields..."
            })
        }
        const ifCuisineExist = await checkIfCuisineExist({name}); 
        if(!ifCuisineExist){
            const createdCuisine = await createCuisineService({name , description , image});
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