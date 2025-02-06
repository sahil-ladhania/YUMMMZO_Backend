import prisma from "../../../config/DB.js";

// Service for Checking If the Restaurant Belongs to a Owner
export const checkIfRestaurantBelongsToOwner = async({orderId , restaurantId}) => {
    try{
        // get the userId from restaurantId
        const getUser = await prisma.restaurant.findUnique({
            where : {
                restaurantId : restaurantId
            }
        })
        const ownerId = getUser.userId; // ownerId mil gya
        console.log(ownerId);
        const ifRestaurantOwnerMatches = await prisma.order.findFirst({
            where : {
                restaurantId : restaurantId
            }
        })
        console.log(ifRestaurantOwnerMatches); // order Details mil gya
        // ab order mai jo restaurantId hai usko check krna hai ki uska owner whi hai jo upr retrive kia hai
    }
    catch(error){
        throw new Error('Error Checking Restaurant and Owner Relation : ' + error.message + error.stack);
    }
}


// Service for Checking If the Restaurant Exist Based on the Restaurant Name or Restaurant ID
export const checkIfRestaurantExist = async({restaurantName , restaurantId}) => {
    try{
        if(restaurantId){
            const ifRestaurantExist = await prisma.restaurant.findUnique({ // Will get an existing restaurant in the ifRestaurantExist Variable -> Prisma will find a specific restaurant by restaurantId from Restaurant Table and return it.
                where : {restaurantId}
            })
            return ifRestaurantExist; 
        }
        else if(restaurantName){
            const ifRestaurantExist = await prisma.restaurant.findUnique({ // Will get an existing restaurant in the ifRestaurantExist Variable -> Prisma will find a specific restaurant by restaurantName from Restaurant Table and return it.
                where : {restaurantName}
            })
            return ifRestaurantExist; 
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
        const cuisineDetails = await prisma.cuisine.findMany({ // Fetching cuisine details from the database for the given cuisine IDs & Ensuring that all provided cuisines exist in the database.    
            where : {
                cuisineId : {
                    in : cuisines
                }
            }
        })
        if(cuisineDetails.length !== cuisines.length){ 
            throw new Error('Some Cuisines are not Valid!!!');
        }
        const openingDaysDetails = await prisma.openingDay.findMany({ // Fetching opening days details from the database for the given opening day IDs & Ensuring that all provided opening days exist in the database.    
            where : {
                openingDayId : {
                    in : openingDays
                }
            }
        })
        if(openingDaysDetails.length !== openingDays.length){ 
            throw new Error('Some Days are not Valid!!!');
        }
        const newRestaurant = await prisma.restaurant.create({ // Creating a new restaurant record in the database with the provided details & Connecting cuisines and opening days using their existing IDs.    
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
        const cuisineDetails = await prisma.cuisine.findMany({ // Fetching cuisine details from the database for the given cuisine IDs & Ensuring that all provided cuisines exist in the database.    
            where : {
                cuisineId : {
                    in : cuisines
                }
            }
        })
        if(cuisineDetails.length !== cuisines.length){ 
            throw new Error('Some Cuisines are not Valid!!!');
        }
        const openingDaysDetails = await prisma.openingDay.findMany({ // Fetching opening days details from the database for the given opening day IDs & Ensuring that all provided opening days exist in the database.    
            where : {
                openingDayId : {
                    in : openingDays
                }
            }
        })
        if(openingDaysDetails.length !== openingDays.length){ 
            throw new Error('Some Days are not Valid!!!');
        }
        const updatedRestaurant = await prisma.restaurant.update({ // Updating an existing restaurant record in the database with the provided details & Connecting cuisines and opening days using their existing IDs.    
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
        const deletedRestaurant = prisma.restaurant.delete({ // Will get the deleted restaurant in deletedRestaurant Variable -> Prisma will delete a specific restaurant from the Restaurant Table and return it.
            where : {restaurantId : restaurantIdInt}
        })
        return deletedRestaurant; 
    }
    catch(error){
        throw new Error('Error Deleting Restaurant...' + error.message + error.stack);
    }
};
