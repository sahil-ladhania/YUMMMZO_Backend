import { checkIfUserExistsById } from "../../../services/commonServices/authServices/AuthServices.js";
import { assignDeliveryPartnerService, getActiveDeliveryDetailsService, getAllDeliveriesDoneByAPartnerService, getOrderDetailsOfCurrentDeliveryForAPartnerService, updateOrderStatusToDeliveredService, updateOrderStatusToOnTheWayService } from "../../../services/courierServices/deliveryServices/DeliveryServices.js";
import { checkingOrderExistence } from "../../../services/customerServices/ordersAndPaymentsServices/OrdersAndPaymentsServices.js";
import { checkIfRestaurantExist } from "../../../services/vendorServices/restaurantServices/RestaurantServices.js";

// Controller For Assigning a Delivery Partner to a Order
export const assignDeliveryPartner = async (req , res , next) => {
    try {
        const {userId , restaurantId , orderId} = req.params;
        const userId_INT = parseInt(userId);
        const restaurantId_INT = parseInt(restaurantId);
        const orderId_INT = parseInt(orderId);
        const {orderItems , totalPrice , orderStatus , userAddress , restaurantAddress} = req.body;
        if(!userId || !restaurantId || !orderId || !orderItems || !totalPrice || !orderStatus || !userAddress || !restaurantAddress){
            return res.status(400).send({
                message : "Please fill all required fields..."
            })
        }
        // const ifUserExist = await checkIfUserExistsById({userId: userId_INT}); // Will get existing user object or null in the ifUserExist Variable -> checkIfUserExistsById will start executing and will take userId.
        // if(!ifUserExist){
        //     return res.status(400).send({
        //         message: "User Doesn't Exist..."
        //     });
        // }
        // const ifRestaurantExist = await checkIfRestaurantExist({restaurantId: restaurantId_INT}); // Will get existing restaurant object or null in the ifRestaurantExist Variable -> checkIfRestaurantExist will start executing and will take restaurantId.
        // if(!ifRestaurantExist){
        //     return res.status(400).send({
        //         message: "Restaurant Doesn't Exist..."
        //     });
        // }
        // const ifOrderExist = await checkingOrderExistence({orderId: orderId_INT}); // Will get existing order object or null in the ifOrderExist Variable -> checkingOrderExistence will start executing and will take orderId.
        // if (!ifOrderExist) {
        //     return res.status(400).send({
        //         message: "Order Doesn't Exist..."
        //     });
        // }
        // if(ifOrderExist.orderStatus === "OUT_FOR_DELIVERY"){
        //     const assignedDeliveryPartner = await assignDeliveryPartnerService({userId:userId_INT , restaurantId: restaurantId_INT , orderId: orderId_INT , orderItems , totalPrice , orderStatus , userAddress , restaurantAddress}); // Will get assigned delivery partner details in the assignedDeliveryPartner Variable -> assignDeliveryPartnerService will start executing and will take body info.
        //     return res.status(200).send({
        //         message: "Order is being assigned a Delivery Partner...",
        //         updatedOrderDetails: assignedDeliveryPartner
        //     });
        // }
    }
    catch (error){
        next(error);
    }
};

// Controller For Updating Order Status to On The Way
export const updateOrderStatusToOnTheWay = async (req , res , next) => {
    try {
        const {partnerId , restaurantId , orderId} = req.params;
        const partnerId_INT = parseInt(partnerId);
        const restaurantId_INT = parseInt(restaurantId);
        const orderId_INT = parseInt(orderId);
        const {orderItems , totalPrice , orderStatus , userAddress , restaurantAddress} = req.body;
        if(!partnerId || !restaurantId || !orderId || !orderItems || !totalPrice || !orderStatus || !userAddress || !restaurantAddress){
            return res.status(400).send({
                message : "Please fill all required fields..."
            })
        }
        const ifPartnerExist = await checkIfUserExistsById({userId: partnerId_INT}); // Will get existing Partner object or null in the ifPartnerExist Variable -> checkIfUserExistsById will start executing and will take userId.
        if(!ifPartnerExist){
            return res.status(400).send({
                message: "Partner Doesn't Exist..."
            });
        }
        const ifRestaurantExist = await checkIfRestaurantExist({restaurantId: restaurantId_INT}); // Will get existing restaurant object or null in the ifRestaurantExist Variable -> checkIfRestaurantExist will start executing and will take restaurantId.
        if(!ifRestaurantExist){
            return res.status(400).send({
                message: "Restaurant Doesn't Exist..."
            });
        }
        const ifOrderExist = await checkingOrderExistence({orderId: orderId_INT}); // Will get existing order object or null in the ifOrderExist Variable -> checkingOrderExistence will start executing and will take orderId.
        if (!ifOrderExist) {
            return res.status(400).send({
                message: "Order Doesn't Exist..."
            });
        }
        if(ifOrderExist.orderStatus === "OUT_FOR_DELIVERY"){
            const updatedOrderStatus = await updateOrderStatusToOnTheWayService({partnerId : partnerId_INT , restaurantId: restaurantId_INT , orderId: orderId_INT , orderItems , totalPrice , orderStatus , userAddress , restaurantAddress}); // Will get updated order details in the updatedOrderStatus Variable -> updateOrderStatusToOnTheWayService will start executing and will take body info.
            return res.status(200).send({
                message: "Order is On The Way...",
                updatedOrderDetails: updatedOrderStatus
            });
        }
    }
    catch (error){
        next(error);
    }
};

// Controller For Updating Order Status to Delivered
export const updateOrderStatusToDelivered = async (req , res , next) => {
    try {
        const {partnerId , restaurantId , orderId} = req.params;
        const partnerId_INT = parseInt(partnerId);
        const restaurantId_INT = parseInt(restaurantId);
        const orderId_INT = parseInt(orderId);
        const {orderItems , totalPrice , orderStatus , userAddress , restaurantAddress} = req.body;
        if(!partnerId || !restaurantId || !orderId || !orderItems || !totalPrice || !orderStatus || !userAddress || !restaurantAddress){
            return res.status(400).send({
                message : "Please fill all required fields..."
            })
        }
        const ifPartnerExist = await checkIfUserExistsById({userId: partnerId_INT}); // Will get existing Partner object or null in the ifPartnerExist Variable -> checkIfUserExistsById will start executing and will take userId.
        if(!ifPartnerExist){
            return res.status(400).send({
                message: "Partner Doesn't Exist..."
            });
        }
        const ifRestaurantExist = await checkIfRestaurantExist({restaurantId: restaurantId_INT}); // Will get existing restaurant object or null in the ifRestaurantExist Variable -> checkIfRestaurantExist will start executing and will take restaurantId.
        if(!ifRestaurantExist){
            return res.status(400).send({
                message: "Restaurant Doesn't Exist..."
            });
        }
        const ifOrderExist = await checkingOrderExistence({orderId: orderId_INT}); // Will get existing order object or null in the ifOrderExist Variable -> checkingOrderExistence will start executing and will take orderId.
        if (!ifOrderExist) {
            return res.status(400).send({
                message: "Order Doesn't Exist..."
            });
        }
        if(ifOrderExist.orderStatus === "ON_THE_WAY"){
            const updatedOrderStatus = await updateOrderStatusToDeliveredService({partnerId : partnerId_INT , restaurantId: restaurantId_INT , orderId: orderId_INT , orderItems , totalPrice , orderStatus , userAddress , restaurantAddress}); // Will get updated order details in the updatedOrderStatus Variable -> updateOrderStatusToDeliveredService will start executing and will take body info.
            console.log(updatedOrderStatus);
            return res.status(200).send({
                message: "Order is Delivered to User Successfully...",
                updatedOrderDetails: updatedOrderStatus
            });
        }
    }
    catch (error){
        next(error);
    }
};

// Controller For Getting a Active Delivery Details
export const getActiveDeliveryDetails = async (req , res , next) => {
    try {
        const {partnerId , orderId} = req.params;
        const partnerId_INT = parseInt(partnerId);
        const orderId_INT = parseInt(orderId);
        const ifPartnerExist = await checkIfUserExistsById({userId: partnerId_INT}); // Will get existing Partner object or null in the ifPartnerExist Variable -> checkIfUserExistsById will start executing and will take userId.
        if(!ifPartnerExist){
            return res.status(400).send({
                message: "Partner Doesn't Exist..."
            });
        }
        const ifOrderExist = await checkingOrderExistence({orderId: orderId_INT}); // Will get existing order object or null in the ifOrderExist Variable -> checkingOrderExistence will start executing and will take orderId.
        if (!ifOrderExist) {
            return res.status(400).send({
                message: "Order Doesn't Exist..."
            });
        }
        if((ifOrderExist.orderStatus === "OUT_FOR_DELIVERY") || (ifOrderExist.orderStatus === "ON_THE_WAY")){
            const activeDeliveryDetails = await getActiveDeliveryDetailsService({partnerId: partnerId_INT , orderId: orderId_INT}); // Will get active delivery status in the activeDeliveryDetails Variable -> getActiveDeliveryDetailsService will start executing and will take orderId and partnerId.
            return res.status(200).send({
                message: "Got Delivery Detail of a Order For a Partner...",
                activeDeliveryDetails: activeDeliveryDetails
            });
        }
    }
    catch (error){
        next(error);
    }
};

// Controller For Getting All Deliveries For a Partner
export const getAllDeliveriesDoneByAPartner = async (req , res , next) => {
    try {
        const {partnerId} = req.params;
        const partnerId_INT = parseInt(partnerId);  
        const ifPartnerExist = await checkIfUserExistsById({userId: partnerId_INT}); // Will get existing Partner object or null in the ifPartnerExist Variable -> checkIfUserExistsById will start executing and will take userId.
        if(!ifPartnerExist){
            return res.status(400).send({
                message: "Partner Doesn't Exist..."
            });
        }
        const getAllDeliveries = await getAllDeliveriesDoneByAPartnerService({partnerId: partnerId_INT}); // Will get all deliveries done in the getAllDeliveries Variable -> getAllDeliveriesDoneByAPartnerService will start executing and will take partnerId.
        return res.status(200).send({
            message: "Got All Deliveries Done by a Partner...",
            allDeliveriesDetails: getAllDeliveries
        });
    }
    catch (error){
        next(error);
    }
};

// Controller For Getting OrderId For Current Delivery
export const getOrderDetailsOfCurrentDeliveryForAPartner = async (req , res , next) => {
    try {
        const {partnerId} = req.params;
        const partnerId_INT = parseInt(partnerId);  
        const ifPartnerExist = await checkIfUserExistsById({userId: partnerId_INT}); // Will get existing Partner object or null in the ifPartnerExist Variable -> checkIfUserExistsById will start executing and will take userId.
        if(!ifPartnerExist){
            return res.status(400).send({
                message: "Partner Doesn't Exist..."
            });
        }
        const getOrderDetails = await getOrderDetailsOfCurrentDeliveryForAPartnerService({partnerId: partnerId_INT}); // Will get order details in the getOrderDetails Variable -> getOrderDetailsOfCurrentDeliveryForAPartnerService will start executing and will take partnerId.
        return res.status(200).send({
            message: "Got Order Details For Active Delivery...",
            orderDetails: getOrderDetails
        });
    }
    catch (error){
        next(error);
    }
};
