import { getAllCuisinesService } from "../../../services/customerServices/cuisineFeedServices/CuisineServices.js"

// Controller to Get All Cuisines
export const getAllCuisines = async(req , res , next) => {
    try{
        const cuisines = await getAllCuisinesService();
        return res.status(200).send({ 
            message : "Cuisines Successfully Retrieved...",
            cuisines : cuisines
        })
    }
    catch(error){
        next(error);
    }
}