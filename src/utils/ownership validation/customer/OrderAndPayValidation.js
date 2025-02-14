import prisma from "../../../config/DB.js";

// Validation to Check If the User Matches
export const checkIfUserMatches = async ({ userId , retrievedUserId }) => {
    try{
        const user = await prisma.user.findUnique({
            where : {
                userId : userId
            },
            select : {
                userId : true
            }
        })
        if(!user){
            return false;
        }
        return user.userId === retrievedUserId;
    }
    catch(error){
        throw new Error('Error Checking If a Restaurant Beloongs To a Owner : ' + error.message + error.stack);
    }
};