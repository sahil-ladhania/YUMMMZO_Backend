import { getAllCuisinesService } from "../../../services/customerServices/cuisineFeedServices/CuisineServices.js"

export const getAllCuisines = async(req , res , next) => {
    try{
        const cuisines = await getAllCuisinesService();
        console.log(cuisines);
        return res.status(200).send({
            message : "Cuisines Successfully Retrieved...",
            cuisines : cuisines
        })
    }
    catch(error){

    }
}