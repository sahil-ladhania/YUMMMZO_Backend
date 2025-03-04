import prisma from "../../../config/DB.js";

// Service to Get orderId
export const getOrderIdService = async ({userId}) => {
    try {
        const orderId = await prisma.order.findFirst({
            where : {
                orderStatus : "ON_THE_WAY"
            }
        })
        return orderId;
    }
    catch(error){
        throw new Error('Error Getting Order Summary For a Order : ' + error.message + error.stack);
    }
};

// Service to Get Order Summary
export const getOrderSummaryService = async ({userId , orderId}) => {
    try {
        const orderSummary = await prisma.order.findUnique({
            where : {
                orderId : orderId,
                orderStatus : "DELIVERED"
            },
            include : {
                orderItems : true
            }
        })
        return orderSummary;
    }
    catch(error){
        throw new Error('Error Getting Order Summary For a Order : ' + error.message + error.stack);
    }
};

// Service to Get Restaurant Order Details
export const getRestaurantDetailsService = async ({restaurantId}) => {
    try {
        const restaurantDetails = await prisma.restaurant.findUnique({
            where : {
                restaurantId : restaurantId
            }
        })
        return restaurantDetails;
    }
    catch(error){
        throw new Error('Error Getting All Orders For a Restaurant : ' + error.message + error.stack);
    }
};

// Service to Get Delivery Partner Details
export const getDeliveryPartnerDetailsService = async ({partnerId}) => {
    try {
        const partnerDetails = await prisma.user.findUnique({
            where : {
                userId : partnerId
            }
        });
        return partnerDetails;
    }
    catch(error){
        throw new Error('Error Getting All Orders For a Restaurant : ' + error.message + error.stack);
    }
};

// Service to Rate a Restaurant
export const rateRestaurantService = async ({userId , orderId , targetId , ratingType , rating , review}) => {
    try {
        const restaurantRating = await prisma.rating.create({
            data : {
                orderId : orderId,
                userId : userId,
                targetId : targetId,
                ratingType : ratingType,
                rating : parseInt(rating),
                review : review
            }
        });
        return restaurantRating;   
    }
    catch(error){
        throw new Error('Error Getting All Orders For a Restaurant : ' + error.message + error.stack);
    }
};

// Service to Rate a Delivery Partner
export const rateDeliveryPartnerService = async ({userId , orderId , targetId , ratingType , rating , review}) => {
    try {
        const partnerRating = await prisma.rating.create({
            data : {
                orderId : orderId,
                userId : userId,
                targetId : targetId,
                ratingType : ratingType,
                rating : parseInt(rating),
                review : review
            }
        });
        return partnerRating;   
    }
    catch(error){
        throw new Error('Error Getting All Orders For a Restaurant : ' + error.message + error.stack);
    }
};

// Service to Rate an Ordered Item
export const rateOrderedItemService = async ({userId , orderId , targetId , ratingType , rating , review}) => {
    try {
        const orderedItemRating = await prisma.rating.create({
            data : {
                orderId : orderId,
                userId : userId,
                targetId : targetId,
                ratingType : ratingType,
                rating : parseInt(rating),
                review : review
            }
        });
        return orderedItemRating;         
    }
    catch(error){
        throw new Error('Error Rating A Ordered Item For a Restaurant : ' + error.message + error.stack);
    }
};