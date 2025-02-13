import { checkIfUserExistsById } from "../../../services/commonServices/authServices/AuthServices.js";
import { assignDeliveryPartnerService, getActiveDeliveryDetailsService, getAllDeliveriesDoneByAPartnerService, getOrderDetailsOfCurrentDeliveryForAPartnerService, updateOrderStatusToDeliveredService, updateOrderStatusToOnTheWayService } from "../../../services/courierServices/deliveryServices/DeliveryServices.js";
import { checkingOrderExistence } from "../../../services/customerServices/ordersAndPaymentsServices/OrdersAndPaymentsServices.js";
import { checkIfRestaurantExist } from "../../../services/vendorServices/restaurantServices/RestaurantServices.js";
import { checkIfOrderBelongsToPartner, validatePartner } from "../../../utils/ownership validation/courier/DeliveryValidation.js";
import { checkIfOrderBelongsToRestaurant, checkIfRestaurantBelongsToOwner } from "../../../utils/ownership validation/vendor/OrdersValidation.js";

// Controller For Getting a Active Delivery Details
export const getActiveDeliveryDetails = async (req , res , next) => {
    try {
        const {partnerId , orderId} = req.params;
        const partnerId_INT = parseInt(partnerId);
        const orderId_INT = parseInt(orderId);
        const retrievedPartnerId = req.user.userId;
        const checkIfPartnerMatches = await validatePartner({ partnerId : partnerId_INT , retrievedPartnerId });
        if(!checkIfPartnerMatches){
            return res.status(400).send({
                message: "Partner Doesn't Match..."
            });
        }
        const ifOrderExist = await checkingOrderExistence({orderId: orderId_INT});
        if (!ifOrderExist) {
            return res.status(400).send({
                message: "Order Doesn't Exist..."
            });
        }
        const restaurantId = ifOrderExist.restaurantId;
        const validateOrderAndPartner = await checkIfOrderBelongsToPartner({ orderId : orderId_INT , retrievedPartnerId });
        if(!validateOrderAndPartner){
            return res.status(400).send({
                message: "Order Doesn't Belongs to this Partner..."
            });
        }
        const ifOrderBelongsToRestaurant = await checkIfOrderBelongsToRestaurant({ orderId : orderId_INT , restaurantId});
        if(!ifOrderBelongsToRestaurant){
            return res.status(400).send({
                message: "Order Doesn't Belongs to this Restaurant..."
            });
        }
        if((ifOrderExist.orderStatus === "OUT_FOR_DELIVERY") || (ifOrderExist.orderStatus === "ON_THE_WAY")){
            const activeDeliveryDetails = await getActiveDeliveryDetailsService({partnerId: partnerId_INT , orderId: orderId_INT}); 
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
        const retrievedPartnerId = req.user.userId;
        const checkIfPartnerMatches = await validatePartner({ partnerId : partnerId_INT , retrievedPartnerId });
        if(!checkIfPartnerMatches){
            return res.status(400).send({
                message: "Partner Doesn't Match..."
            });
        }
        const getAllDeliveries = await getAllDeliveriesDoneByAPartnerService({partnerId: partnerId_INT}); 
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
        const retrievedPartnerId = req.user.userId;
        const checkIfPartnerMatches = await validatePartner({ partnerId : partnerId_INT , retrievedPartnerId });
        if(!checkIfPartnerMatches){
            return res.status(400).send({
                message: "Partner Doesn't Match..."
            });
        }
        const getOrderDetails = await getOrderDetailsOfCurrentDeliveryForAPartnerService({partnerId: partnerId_INT}); 
        if(!getOrderDetails){
            return res.status(400).send({
                message: "Error Getting Order Details of Current Delivery..."
            });
        }
        return res.status(200).send({
            message: "Got Order Details For Active Delivery...",
            orderDetails: getOrderDetails
        });
    }
    catch (error){
        next(error);
    }
};

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
        const ownerId = req.user.userId;
        const restaurantBelongsToOwner = await checkIfRestaurantBelongsToOwner({restaurantId : restaurantId_INT , ownerId});
        if (!restaurantBelongsToOwner) {
            return res.status(403).json({ 
                message: "Unauthorized: This Restaurant Does Not Belong To You..." 
            });
        }
        const orderBelongsToRestaurant = await checkIfOrderBelongsToRestaurant({orderId : orderId_INT , restaurantId : restaurantId_INT});
        if(!orderBelongsToRestaurant){
            return res.status(403).json({ 
                message: "Unauthorized: This Order Does Not Belong To This Specific Restaurant..." 
            });
        }
        const ifOrderExist = await checkingOrderExistence({orderId: orderId_INT}); 
        if (!ifOrderExist) {
            return res.status(400).send({
                message: "Order Doesn't Exist..."
            });
        }
        if(ifOrderExist.orderStatus === "OUT_FOR_DELIVERY"){
            const assignedDeliveryPartner = await assignDeliveryPartnerService({userId:userId_INT , restaurantId: restaurantId_INT , orderId: orderId_INT , orderItems , totalPrice , orderStatus , userAddress , restaurantAddress}); // Will get assigned delivery partner details in the assignedDeliveryPartner Variable -> assignDeliveryPartnerService will start executing and will take body info.
            return res.status(200).send({
                message: "Order is being assigned a Delivery Partner...",
                updatedOrderDetails: assignedDeliveryPartner
            });
        }
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
        const retrievedPartnerId = req.user.userId;
        const checkIfPartnerMatches = await validatePartner({ partnerId : partnerId_INT , retrievedPartnerId });
        if(!checkIfPartnerMatches){
            return res.status(400).send({
                message: "Partner Doesn't Match..."
            });
        }
        const ifOrderExist = await checkingOrderExistence({orderId: orderId_INT});
        if (!ifOrderExist) {
            return res.status(400).send({
                message: "Order Doesn't Exist..."
            });
        }
        const validateOrderAndPartner = await checkIfOrderBelongsToPartner({ orderId : orderId_INT , retrievedPartnerId });
        if(!validateOrderAndPartner){
            return res.status(400).send({
                message: "Order Doesn't Belongs to this Partner..."
            });
        }
        const orderBelongsToRestaurant = await checkIfOrderBelongsToRestaurant({orderId : orderId_INT , restaurantId : restaurantId_INT});
        if(!orderBelongsToRestaurant){
            return res.status(403).json({ 
                message: "Unauthorized: This Order Does Not Belong To This Specific Restaurant..." 
            });
        }
        if(ifOrderExist.orderStatus === "OUT_FOR_DELIVERY"){
            const updatedOrderStatus = await updateOrderStatusToOnTheWayService({partnerId : partnerId_INT , restaurantId: restaurantId_INT , orderId: orderId_INT , orderItems , totalPrice , orderStatus , userAddress , restaurantAddress});
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
        const retrievedPartnerId = req.user.userId;
        const checkIfPartnerMatches = await validatePartner({ partnerId : partnerId_INT , retrievedPartnerId });
        if(!checkIfPartnerMatches){
            return res.status(400).send({
                message: "Partner Doesn't Match..."
            });
        }
        const ifOrderExist = await checkingOrderExistence({orderId: orderId_INT});
        if (!ifOrderExist) {
            return res.status(400).send({
                message: "Order Doesn't Exist..."
            });
        }
        const validateOrderAndPartner = await checkIfOrderBelongsToPartner({ orderId : orderId_INT , retrievedPartnerId });
        if(!validateOrderAndPartner){
            return res.status(400).send({
                message: "Order Doesn't Belongs to this Partner..."
            });
        }
        const orderBelongsToRestaurant = await checkIfOrderBelongsToRestaurant({orderId : orderId_INT , restaurantId : restaurantId_INT});
        if(!orderBelongsToRestaurant){
            return res.status(403).json({ 
                message: "Unauthorized: This Order Does Not Belong To This Specific Restaurant..." 
            });
        }
        if(ifOrderExist.orderStatus === "ON_THE_WAY"){
            const updatedOrderStatus = await updateOrderStatusToDeliveredService({partnerId : partnerId_INT , restaurantId: restaurantId_INT , orderId: orderId_INT , orderItems , totalPrice , orderStatus , userAddress , restaurantAddress}); 
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
