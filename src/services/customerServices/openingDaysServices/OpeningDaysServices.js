import prisma from "../../../config/DB.js";

// Service to Get All Open Days
export const getAllOpenDaysService = async() => {
    try{
        const openDays = await prisma.openingDay.findMany();
        return openDays;
    }
    catch(error){
        throw new Error('Error Getting Open Days : ' + error.message);
    }
}