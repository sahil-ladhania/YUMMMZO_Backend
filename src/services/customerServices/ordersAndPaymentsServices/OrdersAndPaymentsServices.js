import prisma from "../../../config/DB.js";

// Service to Check if the Order Exist
export const checkingOrderExistence = async({ orderId }) => {
    try {
        const ifOrderExist = await prisma.order.findUnique({ // Will get an exsiting order or null in ifOrderExist Variable -> Prisma will find a specific order from the Order Table and return it.
            where : {
                orderId : orderId
            }
        })
        return ifOrderExist;
    }
    catch(error){
        throw new Error('Error Checking an Order Existence : ' + error.message + error.stack);        
    }
}

// Service to Place an Order
export const placeOrderService = async ({ userId , restaurantId , orderItems , totalPrice , orderStatus , userAddress , restaurantAddress }) => {
    try {
        const orderDetails = await prisma.order.create({ // Will get created order details in the orderDetails Variable -> Prisma will create a new record or order in the Order Table and return it.
            data : {
                userId,
                restaurantId,
                totalPrice,
                orderStatus,
                userAddress , 
                restaurantAddress,
                orderItems : {
                    create : orderItems.map((item) => ({
                        menuItemId: item.menuItemId,
                        quantity: item.quantity,
                        itemPrice: item.itemPrice,
                        totalPrice: item.totalPrice,
                    }))
                }
            },
            include : {
                orderItems : true
            }
        });
        return orderDetails;
    }
    catch(error){
        throw new Error('Error Placing an Order : ' + error.message + error.stack);
    }
};