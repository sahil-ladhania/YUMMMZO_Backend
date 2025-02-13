import { checkingOrderExistence } from "../../../services/customerServices/ordersAndPaymentsServices/OrdersAndPaymentsServices.js";
import { acceptOrRejectOrderService_R, getActiveOrderForARestaurantService, getAllPreviousOrdersForARestaurantService, updateOrderStatusToInProgressService_R, updateOrderStatusToOutForDeliveryService_R } from "../../../services/vendorServices/orderServices/OrderServices.js";
import { checkIfOrderBelongsToRestaurant, checkIfRestaurantBelongsToOwner } from "../../../utils/ownership validation/vendor/OrdersValidation.js";

// Controller to Get All Active Orders For a Restaurant
export const getAllPreviousOrdersForARestaurant = async (req , res , next) => {
    try{
        const { restaurantId } = req.params;
        const restaurantId_INT = parseInt(restaurantId);
        if(!restaurantId){
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
        const ordersForRestaurant = await getAllPreviousOrdersForARestaurantService({ restaurantId : restaurantId_INT });
        if(!ordersForRestaurant){
            return res.status(400).send({
                message : "No Previous Orders For a Restaurant..."
            })
        }
        return res.status(200).send({ 
            message : "Orders Successfully Retrieved...",
            orders : ordersForRestaurant
        })
    }
    catch(error){
        next(error);
    }
};

// Controller to Get a Order For a Restaurant
export const getActiveOrderForARestaurant = async (req , res , next) => {
    try{
        const { restaurantId , orderId } = req.params;
        const restaurantId_INT = parseInt(restaurantId);
        const orderId_INT = parseInt(orderId);
        if(!restaurantId || !orderId){
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
        const orderForRestaurant = await getActiveOrderForARestaurantService({orderId : orderId_INT}); 
        if (!orderForRestaurant) {
            return res.status(400).json({ 
                message: "Order Doesn't Exist..." 
            });
        }
        return res.status(200).json({ 
            message: "Order Successfully Retrieved...",
            order: orderForRestaurant
        });
    }
    catch(error){
        next(error);
    }
};

// Controller to Accept or Reject Order For a Restaurant
export const acceptOrRejectOrder_R = async (req , res , next) => {
    try{
        const { restaurantId , orderId } = req.params;
        const restaurantId_INT = parseInt(restaurantId);
        const orderId_INT = parseInt(orderId);
        const {orderItems , totalPrice , orderStatus , userAddress , restaurantAddress} = req.body;
        if(!restaurantId || !orderId || !orderItems || !totalPrice || !orderStatus || !userAddress || !restaurantAddress){
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
        const updatedOrderDetails = await acceptOrRejectOrderService_R({orderId : orderId_INT , orderItems , totalPrice , orderStatus , userAddress , restaurantAddress});
        if(updatedOrderDetails.orderStatus === "ACCEPTED"){                    
            return res.status(200).send({ 
                message : "User Order Accepted By Restaurant Successfully...",
                orderStatus : updatedOrderDetails.orderStatus
            })
        }
        else if(updatedOrderDetails.orderStatus === "REJECTED"){
            return res.status(200).send({ 
                message : "User Order Rejected By Restaurant Successfully...",
                orderStatus : updatedOrderDetails.orderStatus
            })
        }
    }
    catch(error){
        next(error);
    }
};

// Controller to Update a Order Status to In Progress For a Restaurant
export const updateOrderStatusToInProgress_R = async (req, res, next) => {
    try {
        const { restaurantId, orderId } = req.params;
        const restaurantId_INT = parseInt(restaurantId);
        const orderId_INT = parseInt(orderId);
        const { orderItems, totalPrice, orderStatus, userAddress, restaurantAddress } = req.body;
        if (!restaurantId || !orderId || !orderItems || !totalPrice || !orderStatus || !userAddress || !restaurantAddress) {
            return res.status(400).send({
                message: "Please fill all required fields..."
            });
        }
        const ownerId = req.user.userId;
        const restaurantBelongsToOwner = await checkIfRestaurantBelongsToOwner({restaurantId : restaurantId_INT , ownerId});
        if (!restaurantBelongsToOwner) {
            return res.status(403).json({ 
                message: "Unauthorized: This Restaurant Does Not Belong To You..." 
            });
        }
        const ifOrderExist = await checkingOrderExistence({ orderId: orderId_INT }); 
        if (!ifOrderExist) {
            return res.status(400).send({
                message: "Order Doesnt Exist..."
            });
        }
        const orderBelongsToRestaurant = await checkIfOrderBelongsToRestaurant({orderId : orderId_INT , restaurantId : restaurantId_INT});
        if(!orderBelongsToRestaurant){
            return res.status(403).json({ 
                message: "Unauthorized: This Order Does Not Belong To This Specific Restaurant..." 
            });
        }
        if (ifOrderExist.orderStatus === "ACCEPTED") {
            const updatedOrderDetails = await updateOrderStatusToInProgressService_R({orderId: orderId_INT , orderItems , totalPrice , orderStatus , userAddress , restaurantAddress}); 
            if(!updatedOrderDetails.orderStatus === "IN_PROGRESS"){
                return res.status(200).send({
                    message: "User Order is not Updated to In Progress Order Status...",
                    orderStatus: updatedOrderDetails.orderStatus
                });
            } 
            return res.status(200).send({
                message: "User Order Status Updated To In Progress Successfully...",
                orderStatus: updatedOrderDetails.orderStatus
            });
        } 
        else {
            return res.status(200).send({
                message: "User Order is not Updated to In Progress , Because Your Current status is : " + ifOrderExist.orderStatus,
                orderStatus: ifOrderExist.orderStatus
            });
        }
    } catch (error) {
        next(error);
    }
};

// Controller to Update a Order Status to Out For Delivery For a Restaurant
export const updateOrderStatusToOutForDelivery_R = async (req, res, next) => {
    try {
        const { restaurantId, orderId } = req.params;
        const restaurantId_INT = parseInt(restaurantId);
        const orderId_INT = parseInt(orderId);
        const { orderItems, totalPrice, orderStatus, userAddress, restaurantAddress } = req.body;
        if (!restaurantId || !orderId || !orderItems || !totalPrice || !orderStatus || !userAddress || !restaurantAddress) {
            return res.status(400).send({
                message: "Please fill all required fields..."
            });
        }
        const ownerId = req.user.userId;
        const restaurantBelongsToOwner = await checkIfRestaurantBelongsToOwner({restaurantId : restaurantId_INT , ownerId});
        if (!restaurantBelongsToOwner) {
            return res.status(403).json({ 
                message: "Unauthorized: This Restaurant Does Not Belong To You..." 
            });
        }
        const ifOrderExist = await checkingOrderExistence({ orderId: orderId_INT }); 
        if (!ifOrderExist) {
            return res.status(400).send({
                message: "Order Doesnt Exist..."
            });
        }
        const orderBelongsToRestaurant = await checkIfOrderBelongsToRestaurant({orderId : orderId_INT , restaurantId : restaurantId_INT});
        if(!orderBelongsToRestaurant){
            return res.status(403).json({ 
                message: "Unauthorized: This Order Does Not Belong To This Specific Restaurant..." 
            });
        }
        if (ifOrderExist.orderStatus === "IN_PROGRESS") {
            const updatedOrderDetails = await updateOrderStatusToOutForDeliveryService_R({orderId: orderId_INT , orderItems , totalPrice , orderStatus , userAddress , restaurantAddress}); 
            if(!updatedOrderDetails.orderStatus === "OUT_FOR_DELIVERY"){
                return res.status(200).send({
                    message: "User Order is not Updated to Out For Delivery Order Status...",
                    orderStatus: updatedOrderDetails.orderStatus
                });
            }            
            return res.status(200).send({
                message: "User Order Status is Updated to Out For Delivery Successfully...",
                orderStatus: updatedOrderDetails.orderStatus
            });
        } 
        else {
            return res.status(200).send({
                message: "User Order is not Updated to Out For Delivery , Because Your Current status is : " + ifOrderExist.orderStatus,
                orderStatus: ifOrderExist.orderStatus
            });
        }
    } 
    catch (error) {
        next(error);
    }
};