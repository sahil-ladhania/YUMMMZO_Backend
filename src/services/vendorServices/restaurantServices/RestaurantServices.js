import prisma from "../../../config/DB.js";

// Service for Checking If the Restaurant Exist Based on the Restaurant Name or Restaurant ID
export const checkIfRestaurantExist = async({restaurantName , restaurantId}) => {
    try{
        if(restaurantId){
            const ifRestaurantExist = await prisma.restaurant.findUnique({ // Querying the Restaurant Table and checking if Restaurant with given ID exist or not -> Will return the Restaurant Object or null
                where : {restaurantId}
            })
            return ifRestaurantExist; // Return the Restaurant Object or null
        }
        else if(restaurantName){
            const ifRestaurantExist = await prisma.restaurant.findUnique({ // Querying the Restaurant Table and checking if Restaurant with given name exist or not -> Will return the Restaurant Object or null
                where : {restaurantName}
            })
            return ifRestaurantExist; // Return the Restaurant Object or null
        }
        throw new Error("Either Restaurant ID or Restaurant Name must be provided!!!");
    }
    catch(error){
        throw new Error('Error Checking Restaurant Existence : ' + error.message + error.stack);
    }
}

// Service for Creating a new Restaurant
export const createRestaurantService = async ({userId , restaurantName , ownerName , ownerEmail , ownerPhoneNumber , buildingNumber , floorNumber , area , nearbyLandmark , city , state , postalCode , country , restaurantImage , cuisines , openingTime , closingTime , openingDays , isPureVeg , priceForTwo}) => {
    try{
        const cuisineDetails = await prisma.cuisine.findMany({ 
            where : {
                cuisineId : {
                    in : cuisines
                }
            }
        })
        if(cuisineDetails.length !== cuisines.length){ 
            throw new Error('Some Cuisines are not Valid!!!');
        }
        const openingDaysDetails = await prisma.openingDay.findMany({ 
            where : {
                openingDayId : {
                    in : openingDays
                }
            }
        })
        if(openingDaysDetails.length !== openingDays.length){ 
            throw new Error('Some Days are not Valid!!!');
        }
        const newRestaurant = await prisma.restaurant.create({ 
            data : {
                userId,
                restaurantName,
                ownerName,
                ownerEmail,
                ownerPhoneNumber,
                buildingNumber,
                floorNumber,
                area,
                nearbyLandmark,
                city,
                state,
                postalCode,
                country,
                restaurantImage,
                cuisines : {
                    connect : cuisineDetails.map(cuisine => ({ cuisineId : cuisine.cuisineId}))  
                },
                openingTime,
                closingTime,
                openingDays : {
                    connect : openingDaysDetails.map(openingDay => ({ openingDayId : openingDay.openingDayId }))  
                },
                isPureVeg,
                priceForTwo
            }
        })
        return newRestaurant;
    }
    catch(error){
        throw new Error('Error Registering a new Restaurant  : ' + error.message + error.stack);
    }
};

// Service for Updating an existing Restaurant
export const updateRestaurantService = async ({restaurantIdInt , restaurantName , ownerName , ownerEmail , ownerPhoneNumber , buildingNumber , floorNumber , area , nearbyLandmark , city , state , postalCode , country , restaurantImage , cuisines , openingTime , closingTime , openingDays , isPureVeg , priceForTwo}) => {
    try{
        const cuisineDetails = await prisma.cuisine.findMany({ 
            where : {
                cuisineId : {
                    in : cuisines
                }
            }
        })
        if(cuisineDetails.length !== cuisines.length){ 
            throw new Error('Some Cuisines are not Valid!!!');
        }
        const openingDaysDetails = await prisma.openingDay.findMany({ 
            where : {
                openingDayId : {
                    in : openingDays
                }
            }
        })
        if(openingDaysDetails.length !== openingDays.length){ 
            throw new Error('Some Days are not Valid!!!');
        }
        const updatedRestaurant = await prisma.restaurant.update({
            where : {restaurantId : restaurantIdInt},
            data : {
                restaurantName : restaurantName,
                ownerName : ownerName,
                ownerEmail : ownerEmail,
                ownerPhoneNumber : ownerPhoneNumber,
                buildingNumber : buildingNumber,
                floorNumber : floorNumber,
                area : area,
                nearbyLandmark : nearbyLandmark,
                city : city,
                state : state,
                postalCode : postalCode,
                country : country,
                restaurantImage : restaurantImage,
                cuisines : {
                    connect: cuisineDetails.map(cuisine => ({ cuisineId: cuisine.cuisineId })) 
                },  
                openingTime : openingTime,
                closingTime : closingTime, 
                openingDays  : {
                    connect: openingDaysDetails.map(day => ({ openingDayId: day.openingDayId }))
                },
                isPureVeg : isPureVeg,
                priceForTwo : priceForTwo
            }
        })
        return updatedRestaurant;
    }
    catch(error){
        throw new Error('Error Updating Restaurant...' + error.message + error.stack);
    }
};

// Service for Deleting an existing Restaurant
export const deleteRestaurantService = async ({restaurantIdInt}) => {
    try{
        const deletedRestaurant = prisma.restaurant.delete({
            where : {restaurantId : restaurantIdInt}
        })
        return deletedRestaurant; 
    }
    catch(error){
        throw new Error('Error Deleting Restaurant...' + error.message + error.stack);
    }
};
