import prisma from "../../../config/DB.js";

// Service For Assigning a Delivery Partner to a Order
export const assignDeliveryPartnerService = async({userId , restaurantId , orderId , orderItems , totalPrice , orderStatus , userAddress , restaurantAddress}) => {
    try {
        const allDeliveryPartners = await prisma.user.findMany({
            where : {
                role : "COURIER"
            }
        });
        const busyPartners = await prisma.order.findMany({
            where : {
                orderStatus : {
                    not : "DELIVERED"
                },
                deliveryPartnerId : {
                    not : null
                }
            },
            select : {
                deliveryPartnerId : true
            }
        });
        const busyPartnersId = busyPartners.map((bp) => bp.deliveryPartnerId);
        const availableDeliveryPartners = allDeliveryPartners.filter((dp) => !busyPartnersId.includes(dp.userId));
        if (availableDeliveryPartners.length === 0) {
            throw new Error("No available delivery partners at the moment !!!");
        }
        const randomCourier = availableDeliveryPartners[Math.floor(Math.random() * availableDeliveryPartners.length)];
        const updatedDeliveryPartnerId = await prisma.order.update({
            where : {
                orderId : orderId
            },
            data : {
                deliveryPartnerId : randomCourier.userId,
            }
        })
        return updatedDeliveryPartnerId;
    }
    catch (error){
        throw new Error('Error Assigning Delivery Partner To a Order : ' + error.message + error.stack);
    }
}

// Service For Updating Order Status to On The Way
export const updateOrderStatusToOnTheWayService = async({partnerId , restaurantId , orderId , orderItems , totalPrice , orderStatus , userAddress , restaurantAddress}) => {
    try {        
        const randomMinutes = Math.floor(Math.random() * (60 - 20 + 1)) + 20;
        const deliveryTime = new Date();
        deliveryTime.setMinutes(deliveryTime.getMinutes() + randomMinutes); 
        const updatedOrderStatus = await prisma.order.update({
            where : {
                orderId : orderId
            },
            data : {
                orderStatus : "ON_THE_WAY",
                deliveryTime : deliveryTime
            }
        });
        return updatedOrderStatus;
    }
    catch (error){
        throw new Error('Error Updating Order Status to On The Way : ' + error.message + error.stack);
    }
}

// Service For Updating Order Status to Delivered
export const updateOrderStatusToDeliveredService = async({partnerId , restaurantId , orderId , orderItems , totalPrice , orderStatus , userAddress , restaurantAddress}) => {
    try {
        const updatedOrderStatus = await prisma.order.update({
            where : {
                orderId : orderId
            },
            data : {
                orderStatus : "DELIVERED"
            }
        })
        return updatedOrderStatus;
    }
    catch (error){
        throw new Error('Error Updating Order Status to Delivered : ' + error.message + error.stack);
    }
}

// Service For Getting a Active Delivery Details
export const getActiveDeliveryDetailsService = async({partnerId , orderId}) => {
    try {
        const getActiveDeliveryDetail = await prisma.order.findMany({
            where : {
                deliveryPartnerId : partnerId,
                orderId : orderId
            },
            include: {
                orderItems : true
            },
        })
        return getActiveDeliveryDetail;
    }
    catch (error){
        throw new Error('Error Getting Active Delivery Details For a Partner : ' + error.message + error.stack);
    }
}

// Service For Getting All Deliveries For a Partner
export const getAllDeliveriesDoneByAPartnerService = async({partnerId}) => {
    try {
        const getAllDeliveries = await prisma.order.findMany({
            where : {
                deliveryPartnerId : partnerId,
                orderStatus : "DELIVERED"
            }
        });
        return getAllDeliveries;
    }
    catch (error){
        throw new Error('Error Getting All Deliveries For a Partner : ' + error.message + error.stack);
    }
}

// Service For Getting OrderId For Current Delivery
export const getOrderDetailsOfCurrentDeliveryForAPartnerService = async({partnerId}) => {
    try {
        const getOrderDetails = await prisma.order.findMany({
            where : {
                deliveryPartnerId : partnerId,
                orderStatus : "OUT_FOR_DELIVERY"
            }
        })
        return getOrderDetails;
    }
    catch (error){
        throw new Error('Error Getting All Deliveries For a Partner : ' + error.message + error.stack);
    }
}