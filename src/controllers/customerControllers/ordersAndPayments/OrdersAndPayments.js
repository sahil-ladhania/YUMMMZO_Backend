import { checkIfUserExistsById } from "../../../services/commonServices/authServices/AuthServices.js";
import { placeOrderService } from "../../../services/customerServices/ordersAndPaymentsServices/OrdersAndPaymentsServices.js";
import { checkIfRestaurantExist } from "../../../services/vendorServices/restaurantServices/RestaurantServices.js";

// Controller to Place an Order
export const placeOrder = async (req , res , next) => {
    try {
        const { userId , restaurantId } = req.params;
        const userId_INT = parseInt(userId);
        const restaurantId_INT = parseInt(restaurantId);
        const {orderItems , totalPrice , orderStatus , userAddress , restaurantAddress} = req.body;
        if(!userId || !restaurantId || !orderItems || !totalPrice || !orderStatus || !userAddress || !restaurantAddress){
            return res.status(400).send({
                message : "Please fill all required fields..."
            })
        }
        const ifUserExist = await checkIfUserExistsById({userId : userId_INT}); // Will get existing user object or null in the ifUserExist Variable -> checkIfUserExistsById will start executing.
        if(ifUserExist){
            const ifRestaurantExist = await checkIfRestaurantExist({restaurantId : restaurantId_INT}); // Will get existing restaurant object or null in the ifRestaurantExist Variable -> checkIfRestaurantExist will start executing.
            if(ifRestaurantExist){
                const placedOrder = await placeOrderService({ userId : userId_INT , restaurantId : restaurantId_INT , orderItems , totalPrice , orderStatus , userAddress , restaurantAddress }); // Will get placed order object in the placedOrder Variable -> placeOrderService will start executing and will take body info.
                return res.status(201).send({ 
                    message : "User Order Placed Successfully...",
                    orderDetails : placedOrder
                })
            }
            else{
                return res.status(400).send({
                    message : "Restaurant Doesnt Exist..."
                })
            }
        }
        else{
            return res.status(400).send({
                message : "User Doesnt Exist..."
            })
        }
    }
    catch(error){
        next(error);
    }
};
