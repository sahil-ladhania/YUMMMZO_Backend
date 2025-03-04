import { getDeliveryPartnerDetailsService, getOrderIdService, getOrderSummaryService, getRestaurantDetailsService, rateDeliveryPartnerService, rateOrderedItemService, rateRestaurantService } from "../../../services/customerServices/orderSummaryAndRating/OrderSummaryAndRatingServices.js";
import { checkIfOrderBelongsToPartner } from "../../../utils/ownership validation/courier/DeliveryValidation.js";
import { checkIfOrderBelongsToUser, checkIfOrderedItemBelongsToOrder } from "../../../utils/ownership validation/customer/OrderSummaryAndRatingValidation.js";
import { checkIfOrderBelongsToRestaurant } from "../../../utils/ownership validation/vendor/OrdersValidation.js";

// Controller to Get orderId
export const getOrderId = async (req , res , next) => { 
    try {
        const {userId} = req.params;
        const userId_INT = parseInt(userId);
        if(!userId){
            return res.status(400).send({
                message : "Please fill all required fields..."
            })
        }
        const order = await getOrderIdService({userId : userId_INT});
        if(!order){
            return res.status(404).send({ 
                message : "No Order With Status On The Way Exist...",
            })
        }
        return res.status(200).send({ 
            message : "orderId That Is On The Way Successfully Retrieved...",
            orderId : order.orderId
        })
    }
    catch(error){
        next(error);
    }
};

// Controller to Get Order Summary
export const getOrderSummary = async (req , res , next) => { 
    try {
        const {userId , orderId} = req.params;
        const userId_INT = parseInt(userId);
        const orderId_INT = parseInt(orderId);
        if(!userId || !orderId){
            return res.status(400).send({
                message : "Please fill all required fields..."
            })
        }
        const ifOrderBelongsToUser = await checkIfOrderBelongsToUser({userId : userId_INT , orderId : orderId_INT});
        if(!ifOrderBelongsToUser){
            return res.status(404).send({
                message : "Order Doesnt Belongs To User..."
            })
        }
        const orderSummary = await getOrderSummaryService({userId : userId_INT , orderId : orderId_INT});
        if(!orderSummary){
            return res.status(404).send({
                message : "Error Getting Order Summary..."
            })
        }
        return res.status(200).send({
            message : "Successfully Retrieved Order Summary...",
            orderSummary : orderSummary
        })
    }
    catch(error){
        next(error);
    }
};

// Controller to Get Restaurant Order Details
export const getRestaurantDetails = async (req , res , next) => {
    try {
        const {restaurantId} = req.params;
        const restaurantId_INT = parseInt(restaurantId);
        if(!restaurantId){
            return res.status(400).send({
                message : "Please fill all required fields..."
            })   
        }
        const restaurantDetails = await getRestaurantDetailsService({restaurantId : restaurantId_INT});
        if(!restaurantDetails){
            return res.status(404).send({ 
                message : "Error Getting Restaurant Details...",
            })
        }
        return res.status(200).send({ 
            message : "Restaurant Details Successfully Retrieved...",
            restaurantDetails : restaurantDetails
        })
    }
    catch(error){
        next(error);
    }
};

// Controller to Get Delivery Partner Details
export const getDeliveryPartnerDetails = async (req , res , next) => {
    try {
        const {partnerId} = req.params;
        const partnerId_INT = parseInt(partnerId);
        if(!partnerId){
            return res.status(400).send({
                message : "Please fill all required fields..."
            });   
        }
        const partnerDetails = await getDeliveryPartnerDetailsService({partnerId : partnerId_INT});
        if(!partnerDetails){
            return res.status(404).send({ 
                message : "Error Getting Partner Details...",
            })
        }
        return res.status(200).send({ 
            message : "Partner Details Successfully Retrieved...",
            partnerDetails : partnerDetails
        })
    }
    catch(error){
        next(error);
    }
};

// Controller to Rate a Restaurant
export const rateRestaurant = async (req , res , next) => {
    try {
        const {userId , orderId , restaurantId} = req.params;
        const userId_INT = parseInt(userId);
        const orderId_INT = parseInt(orderId);
        const restaurantId_INT = parseInt(restaurantId);
        const {ratingType , rating , review} = req.body;
        if(!userId || !orderId || !restaurantId || !ratingType || !rating){
            return res.status(400).send({
                message : "Please fill all required fields..."
            });   
        }
        const ifOrderBelongsToUser = await checkIfOrderBelongsToUser({userId : userId_INT , orderId : orderId_INT});
        if(!ifOrderBelongsToUser){
            return res.status(404).send({
                message : "Order Doesnt Belongs To User..."
            })
        } 
        const ifOrderBelongsToRestaurant = await checkIfOrderBelongsToRestaurant({orderId : orderId_INT , restaurantId : restaurantId_INT});
        if(!ifOrderBelongsToRestaurant){
            return res.status(404).send({
                message : "Order Doesnt Belongs To Restaurant..."
            })
        }
        const restaurantRating = await rateRestaurantService({userId : userId_INT , orderId : orderId_INT , targetId : restaurantId_INT , ratingType , rating , review});
        if(!restaurantRating){
            return res.status(404).send({
                message : "Error Rating Restaurant..."
            })
        }
        return res.status(201).send({
            message : "Successfully Rated a Restaurant...",
            restaurantRating : restaurantRating
        })
    }
    catch(error){
        next(error);
    }
};

// Controller to Rate a Delivery Partner
export const rateDeliveryPartner = async (req , res , next) => {
    try {
        const {userId , orderId , partnerId} = req.params;
        const userId_INT = parseInt(userId);
        const orderId_INT = parseInt(orderId);
        const partnerId_INT = parseInt(partnerId);   
        const {ratingType , rating , review} = req.body;
        if(!userId || !orderId || !partnerId || !ratingType || !rating){
            return res.status(400).send({
                message : "Please fill all required fields..."
            });   
        }
        const ifOrderBelongsToUser = await checkIfOrderBelongsToUser({userId : userId_INT , orderId : orderId_INT});
        if(!ifOrderBelongsToUser){
            return res.status(404).send({
                message : "Order Doesnt Belongs To User..."
            })
        } 
        const ifOrderBelongsToPartner = await checkIfOrderBelongsToPartner({orderId : orderId_INT , retrievedPartnerId : partnerId_INT});
        if(!ifOrderBelongsToPartner){
            return res.status(404).send({
                message : "Order Doesnt Belongs To Partner..."
            })
        }
        const partnerRating = await rateDeliveryPartnerService({userId : userId_INT , orderId : orderId_INT , targetId : partnerId_INT , ratingType , rating , review});
        if(!partnerRating){
            return res.status(404).send({
                message : "Error Rating Delivery Partner..."
            })
        }
        return res.status(201).send({
            message : "Successfully Rated a Delivery Partner...",
            partnerRating : partnerRating
        })
    }
    catch(error){
        next(error);
    }
};

// Controller to Rate an Ordered Item
export const rateOrderedItem = async (req , res , next) => {
    try {
        const {userId , orderId , orderedItemId} = req.params;
        const userId_INT = parseInt(userId);
        const orderId_INT = parseInt(orderId);
        const orderedItemId_INT = parseInt(orderedItemId);
        const {ratingType , rating , review} = req.body;
        if(!userId || !orderId || !orderedItemId || !ratingType || !rating){
            return res.status(400).send({
                message : "Please fill all required fields..."
            });   
        };
        const ifOrderBelongsToUser = await checkIfOrderBelongsToUser({userId : userId_INT , orderId : orderId_INT});
        if(!ifOrderBelongsToUser){
            return res.status(404).send({
                message : "Order Doesnt Belongs To User..."
            })
        } 
        const ifOrderedItemBelongsToOrder = await checkIfOrderedItemBelongsToOrder({orderId : orderId_INT , orderedItemId : orderedItemId_INT});
        if(!ifOrderedItemBelongsToOrder){
            return res.status(404).send({
                message : "Ordered Item Doesnt Belongs To Order..."
            })
        }
        const orderedItemRating = await rateOrderedItemService({userId : userId_INT , orderId : orderId_INT , targetId : orderedItemId_INT , ratingType , rating , review});
        if(!orderedItemRating){
            return res.status(404).send({
                message : "Error Rating Ordered Item..."
            })
        }
        return res.status(201).send({
            message : "Successfully Rated a Ordered Item...",
            orderedItemRating : orderedItemRating
        })
    }
    catch(error){
        next(error);
    }
};