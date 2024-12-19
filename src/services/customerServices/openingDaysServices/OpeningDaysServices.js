import prisma from "../../../config/DB.js";

export const getAllOpenDaysService = async() => {
    try{
        const openDays = await prisma.openingDay.findMany();
        console.log(openDays);
        return openDays;
    }
    catch(error){
        throw new Error('Error Getting Open Days : ' + error.message);
    }
}