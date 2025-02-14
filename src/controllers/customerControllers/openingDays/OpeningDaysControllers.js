import { getAllOpenDaysService } from "../../../services/customerServices/openingDaysServices/OpeningDaysServices.js";

// Controller to Get All Open Days
export const getAllOpenDays = async(req , res , next) => {
    try{
        const openDays = await getAllOpenDaysService(); 
        return res.status(200).send({
            message : "Open Days Successfully Retrieved...",
            openDays : openDays
        })
    }
    catch(error){
        next(error);
    }
}