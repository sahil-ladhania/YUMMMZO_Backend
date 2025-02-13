import prisma from "../../../config/DB.js";

// Validation to Check If the Partner Who is Sending the partnerId is same as Who is Logged In
export const validatePartner = async ({ partnerId , retrievedPartnerId }) => {
    try{
        const partner = await prisma.user.findUnique({
            where : {
                userId : partnerId
            }
        })
        if(!partner){
            return false;
        }
        return partner.userId === retrievedPartnerId;
    }
    catch(error){
        throw new Error('Error Checking If a Restaurant Beloongs To a Owner : ' + error.message + error.stack);
    }
};

// Validation to Check If a Restaurant Belongs to Owner
export const checkIfOrderBelongsToPartner = async ({ orderId , retrievedPartnerId }) => {
    try{
        // logic
        const order = await prisma.order.findUnique({
            where : {
                orderId : orderId
            },
            select : {
                deliveryPartnerId : true
            }
        })
        if(!order){
            return false;
        }
        return order.deliveryPartnerId === retrievedPartnerId;
    }
    catch(error){
        throw new Error('Error Checking If a Restaurant Beloongs To a Owner : ' + error.message + error.stack);
    }
};