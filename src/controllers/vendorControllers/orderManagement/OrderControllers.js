import { checkingOrderExistence } from "../../../services/customerServices/ordersAndPaymentsServices/OrdersAndPaymentsServices.js";
import { acceptOrRejectOrderService_R, getAllActiveOrdersForARestaurantService, getAOrderForARestaurantService, updateOrderStatusToInProgressService_R, updateOrderStatusToOutForDeliveryService_R } from "../../../services/vendorServices/orderServices/OrderServices.js";
import { checkIfRestaurantExist } from "../../../services/vendorServices/restaurantServices/RestaurantServices.js";

// Controller to Get All Active Orders For a Restaurant
export const getAllActiveOrdersForARestaurant = async (req , res , next) => {
    try{
        const { restaurantId } = req.params;
        const restaurantId_INT = parseInt(restaurantId);
        if(!restaurantId){
            return res.status(400).send({
                message : "Please fill all required fields..."
            })
        }
        const ifRestaurantExist = await checkIfRestaurantExist({restaurantId: restaurantId_INT}); // Will get an existing restaurant object or null in the ifRestaurantExist Variable -> checkIfRestaurantExist will start executing and will take restaurantId.
        if(ifRestaurantExist){
            const ordersForRestaurant = await getAllActiveOrdersForARestaurantService({ restaurantId : restaurantId_INT }); // Will get all orders for a restaurant in the ordersForRestaurant Variable -> getAllActiveOrdersForARestaurantService will start executing and will take restaurantId.
            return res.status(200).send({ 
                message : "Orders Successfully Retrieved...",
                orders : ordersForRestaurant
            })
        }
        else{
            return res.status(400).send({
                message : "Restaurant Doesnt Exist..."
            })
        }
    }
    catch(error){
        next(error);
    }
};

// Controller to Get a Order For a Restaurant
export const getAOrderForARestaurant = async (req , res , next) => {
    try{
        const { restaurantId , orderId } = req.params;
        const restaurantId_INT = parseInt(restaurantId);
        const orderId_INT = parseInt(orderId);
        if(!restaurantId || !orderId){
            return res.status(400).send({
                message : "Please fill all required fields..."
            })
        }
        const ifRestaurantExist = await checkIfRestaurantExist({restaurantId: restaurantId_INT}); // Will get an existing restaurant object or null in the ifRestaurantExist Variable -> checkIfRestaurantExist will start executing and will take restaurantId.
        if(ifRestaurantExist){
            const ifOrderExist = await checkingOrderExistence({orderId : orderId_INT}); // Will get an existing order object or null in the ifOrderExist Variable -> checkingOrderExistence will start executing and will take orderId.
            if(ifOrderExist){
                const orderForRestaurant = await getAOrderForARestaurantService({orderId : orderId_INT}); // Will get a specific order in the orderForRestaurant Variable -> getAOrderForARestaurantService will start executing and will take orderId.
                return res.status(200).send({ 
                    message : "Order Successfully Retrieved...",
                    order : orderForRestaurant
                })   
            }
            else{
                return res.status(400).send({
                    message : "Order Doesnt Exist..."
                })    
            }
        }
        else{
            return res.status(400).send({
                message : "Restaurant Doesnt Exist..."
            })
        }
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
        const ifRestaurantExist = await checkIfRestaurantExist({restaurantId: restaurantId_INT}); // Will get an existing restaurant object or null in the ifRestaurantExist Variable -> checkIfRestaurantExist will start executing and will take restaurantId.
        if(ifRestaurantExist){
            const ifOrderExist = await checkingOrderExistence({orderId : orderId_INT}); // Will get an existing order object or null in the ifOrderExist Variable -> checkingOrderExistence will start executing and will take orderId.
            if(ifOrderExist){
                const updatedOrderDetails = await acceptOrRejectOrderService_R({orderId : orderId_INT , orderItems , totalPrice , orderStatus , userAddress , restaurantAddress}); // Will get updated order details in the updatedOrderDetails Variable -> acceptOrRejectOrderService_R will start executing and will take body info.
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
            else{
                return res.status(400).send({
                    message : "Order Doesnt Exist..."
                })    
            }
        }
        else{
            return res.status(400).send({
                message : "Restaurant Doesnt Exist..."
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
        const ifRestaurantExist = await checkIfRestaurantExist({ restaurantId: restaurantId_INT }); // Will get an existing restaurant object or null in the ifRestaurantExist Variable -> checkIfRestaurantExist will start executing and will take restaurantId.
        if (!ifRestaurantExist) {
            return res.status(400).send({
                message: "Restaurant Doesnt Exist..."
            });
        }
        const ifOrderExist = await checkingOrderExistence({ orderId: orderId_INT }); // Will get an existing order object or null in the ifOrderExist Variable -> checkingOrderExistence will start executing and will take orderId.
        if (!ifOrderExist) {
            return res.status(400).send({
                message: "Order Doesnt Exist..."
            });
        }
        if (ifOrderExist.orderStatus === "ACCEPTED") {
            const updatedOrderDetails = await updateOrderStatusToInProgressService_R({orderId: orderId_INT , orderItems , totalPrice , orderStatus , userAddress , restaurantAddress}); // Will get updated order details in the updatedOrderDetails Variable -> updateOrderStatusToInProgressService_R will start executing and will take body info.
            if(updatedOrderDetails.orderStatus === "IN_PROGRESS"){
                return res.status(200).send({
                    message: "User Order is in Progress Successfully...",
                    orderStatus: updatedOrderDetails.orderStatus
                });
            } 
            else{
                return res.status(200).send({
                    message: "User Order is not Updated to In Progress Order Status...",
                    orderStatus: updatedOrderDetails.orderStatus
                });
            }
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
        const ifRestaurantExist = await checkIfRestaurantExist({ restaurantId: restaurantId_INT }); // Will get an existing restaurant object or null in the ifRestaurantExist Variable -> checkIfRestaurantExist will start executing and will take restaurantId.
        if (!ifRestaurantExist) {
            return res.status(400).send({
                message: "Restaurant Doesn't Exist..."
            });
        }
        const ifOrderExist = await checkingOrderExistence({ orderId: orderId_INT }); // Will get an existing order object or null in the ifOrderExist Variable -> checkingOrderExistence will start executing and will take orderId.
        if (!ifOrderExist) {
            return res.status(400).send({
                message: "Order Doesn't Exist..."
            });
        }
        if (ifOrderExist.orderStatus === "IN_PROGRESS") {
            const updatedOrderDetails = await updateOrderStatusToOutForDeliveryService_R({orderId: orderId_INT , orderItems , totalPrice , orderStatus , userAddress , restaurantAddress}); // Will get updated order details in the updatedOrderDetails Variable -> updateOrderStatusToOutForDeliveryService_R will start executing and will take body info.
            return res.status(200).send({
                message: "User Order is Out For Delivery Successfully...",
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