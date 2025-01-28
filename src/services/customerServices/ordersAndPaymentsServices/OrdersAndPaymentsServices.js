import prisma from "../../../config/DB.js";

// Service to Place an Order
export const placeOrderService = async ({ userId , restaurantId , orderItems , totalPrice , orderStatus , userAddress , restaurantAddress }) => {
    try {
        const orderDetails = await prisma.order.create({
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