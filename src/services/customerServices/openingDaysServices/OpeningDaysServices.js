import prisma from "../../../config/DB.js";

export const getAllOpenDaysService = async() => {
    try{
        const openDays = await prisma.openingDay.findMany(); // Will get all open days in the openDays Variable -> Prisma will find all the open days from openingDays Table and return it.
        return openDays;
    }
    catch(error){
        throw new Error('Error Getting Open Days : ' + error.message);
    }
}