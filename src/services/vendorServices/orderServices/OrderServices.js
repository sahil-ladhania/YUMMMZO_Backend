import prisma from "../../../config/DB.js";

// Service to Get All Active Orders For a Restaurant
export const getAllPreviousOrdersForARestaurantService = async ({ restaurantId }) => {
    try{
        const restaurantActiveOrders = await prisma.restaurant.findMany({ 
            where : {
                restaurantId : restaurantId,
            },
            select : {
                orders : {
                    where : {
                        orderStatus : {
                            in: ["PENDING", "ACCEPTED", "IN_PROGRESS", "OUT_FOR_DELIVERY"]
                        }
                    }
                }
            },
        })
        const orders = restaurantActiveOrders.length > 0 ? restaurantActiveOrders[0].orders : [];
        return orders;
    }
    catch(error){
        throw new Error('Error Getting All Orders For a Restaurant : ' + error.message + error.stack);
    }
};

// Service to Get a Order For a Restaurant
export const getActiveOrderForARestaurantService = async ({orderId}) => {
    try{
        const restaurantOrderDetail = await prisma.order.findUnique({ 
            where : {
                orderId : orderId
            },
            include: {
                orderItems: true, 
            },
        })
        return restaurantOrderDetail;
    }
    catch(error){
        throw new Error('Error Getting a Order For a Restaurant : ' + error.message + error.stack);
    }
};

// Service to Accept or Reject a Order For a Restaurant
export const acceptOrRejectOrderService_R = async ({orderId , orderItems , totalPrice , orderStatus , userAddress , restaurantAddress}) => {
    try{
        const updatedOrderStatus = await prisma.order.update({ 
            where: {
                orderId: orderId,
            },
            data: {
              totalPrice,
              orderStatus,
              userAddress,
              restaurantAddress,
            },
            include: {
              orderItems: true,
            },
          });
        return updatedOrderStatus;
    }
    catch(error){
        throw new Error('Error Accepting or Rejecting a Order For a Restaurant : ' + error.message + error.stack);
    }
};

// Service to Update a Order Status to In Progress For a Restaurant
export const updateOrderStatusToInProgressService_R = async ({orderId , orderItems , totalPrice , orderStatus , userAddress , restaurantAddress}) => {
    try{
        const updatedOrderStatus = await prisma.order.update({ 
            where: {
                orderId: orderId,
            },
            data: {
              totalPrice,
              orderStatus,
              userAddress,
              restaurantAddress,
            },
            include: {
              orderItems: true,
            },
          });
        return updatedOrderStatus;
    }
    catch(error){
        throw new Error('Error Updating a Order Status For a Restaurant : ' + error.message + error.stack);
    }
};

// Service to Update a Order Status to Out For Delivery For a Restaurant
export const updateOrderStatusToOutForDeliveryService_R = async ({orderId , orderItems , totalPrice , orderStatus , userAddress , restaurantAddress}) => {
    try{
        const updatedOrderStatus = await prisma.order.update({ 
            where: {
                orderId: orderId,
            },
            data: {
              totalPrice,
              orderStatus,
              userAddress,
              restaurantAddress,
            },
            include: {
              orderItems: true,
            },
          });
        return updatedOrderStatus;
    }
    catch(error){
        throw new Error('Error Updating a Order Status For a Restaurant : ' + error.message + error.stack);
    }
};