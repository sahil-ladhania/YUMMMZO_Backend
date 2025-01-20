import { getAllCuisinesService } from "../../../services/customerServices/cuisineFeedServices/CuisineServices.js"

// Controller to Get All Cuisines
export const getAllCuisines = async(req , res , next) => {
    try{
        const cuisines = await getAllCuisinesService(); // Call the getAllCuisinesService Service -> Getting the cuisines array of objects in the cuisines variable
        return res.status(200).send({ // returning the response with message and cuisines array of objects
            message : "Cuisines Successfully Retrieved...",
            cuisines : cuisines
        })
    }
    catch(error){
        next(error);
    }
}