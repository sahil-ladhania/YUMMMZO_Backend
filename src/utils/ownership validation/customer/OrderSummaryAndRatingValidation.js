import prisma from "../../../config/DB.js";

// Validation to Check If the Order Belongs to User
export const checkIfOrderBelongsToUser = async ({ userId , orderId }) => {
    try{
        const ifOrderBelongs = await prisma.order.findUnique({
            where : {
                orderId : orderId,
            },
            select : {
                userId : true
            }
        });
        if(!ifOrderBelongs){
            return false;
        }
        return ifOrderBelongs.userId === userId;
    }
    catch(error){
        throw new Error('Error Checking If a Order Belongs To a User : ' + error.message + error.stack);
    }
};

// Validation to Check If the Ordered Item Belongs to Order
export const checkIfOrderedItemBelongsToOrder = async ({ orderId , orderedItemId }) => {
    try{
        const ifOrderedItemBelongs = await prisma.order.findFirst({
            where : {
                orderId : orderId
            },
            select : {
                orderItems : {
                    select : {
                        orderItemId : true 
                    }
                }
            }
        });
        if(!ifOrderedItemBelongs){
            return false;
        }
        return ifOrderedItemBelongs.orderItems.some(item => item.orderItemId === orderedItemId);
    }
    catch(error){
        throw new Error('Error Checking If a Ordered Item Belongs To a Order : ' + error.message + error.stack);
    }
};