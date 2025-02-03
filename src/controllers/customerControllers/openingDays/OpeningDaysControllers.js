import { getAllOpenDaysService } from "../../../services/customerServices/openingDaysServices/OpeningDaysServices.js";

export const getAllOpenDays = async(req , res , next) => {
    try{
        const openDays = await getAllOpenDaysService(); // Will get all open days in the openDays Variable -> getAllOpenDaysService will start executing.
        return res.status(200).send({
            message : "Open Days Successfully Retrieved...",
            openDays : openDays
        })
    }
    catch(error){
        next(error);
    }
}