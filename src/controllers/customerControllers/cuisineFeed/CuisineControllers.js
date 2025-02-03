import { getAllCuisinesService } from "../../../services/customerServices/cuisineFeedServices/CuisineServices.js"

// Controller to Get All Cuisines
export const getAllCuisines = async(req , res , next) => {
    try{
        const cuisines = await getAllCuisinesService(); // Will get all cuisines in the cuisines Variable -> getAllCuisinesService will start executing.
        return res.status(200).send({ 
            message : "Cuisines Successfully Retrieved...",
            cuisines : cuisines
        })
    }
    catch(error){
        next(error);
    }
}