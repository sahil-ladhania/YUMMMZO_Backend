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
        const cuisineDetails = await prisma.cuisine.findMany({ // Querying the Cuisine Table and checking if the the cuisineId field in the database matched any of the values present in the cuisines array or not
            where : {
                cuisineId : {
                    in : cuisines
                }
            }
        })
        if(cuisineDetails.length !== cuisines.length){ // If the cuisineDetails length is not equal to cuisines length -> Something is missing -> Error
            throw new Error('Some Cuisines are not Valid!!!');
        }
        const openingDaysDetails = await prisma.openingDay.findMany({ // Querying the openingDay Table and checking if the the openingDayId field in the database matched any of the values present in the openingDays array or not
            where : {
                openingDayId : {
                    in : openingDays
                }
            }
        })
        if(openingDaysDetails.length !== openingDays.length){ // If the openingDaysDetails length is not equal to openingDays length -> Something is missing -> Error
            throw new Error('Some Days are not Valid!!!');
        }
        const newRestaurant = await prisma.restaurant.create({ // Creating a new Restaurant Object
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
                    connect : cuisineDetails.map(cuisine => ({ cuisineId : cuisine.cuisineId}))  // Linking the new restaurant to existing cuisine records by their cuisineId
                },
                openingTime,
                closingTime,
                openingDays : {
                    connect : openingDaysDetails.map(openingDay => ({ openingDayId : openingDay.openingDayId }))  // Linking the new restaurant to existing opening day records by their openingDayId
                },
                isPureVeg,
                priceForTwo
            }
        })
        return newRestaurant; // Return the new created Restaurant Object
    }
    catch(error){
        throw new Error('Error Registering a new Restaurant  : ' + error.message + error.stack);
    }
};

// Service for Updating an existing Restaurant
export const updateRestaurantService = async ({restaurantIdInt , restaurantName , ownerName , ownerEmail , ownerPhoneNumber , buildingNumber , floorNumber , area , nearbyLandmark , city , state , postalCode , country , restaurantImage , cuisines , openingTime , closingTime , openingDays , isPureVeg , priceForTwo}) => {
    try{
        const cuisineDetails = await prisma.cuisine.findMany({ // Querying the Cuisine Table and checking if the the cuisineId field in the database matched any of the values present in the cuisines array or not
            where : {
                cuisineId : {
                    in : cuisines
                }
            }
        })
        if(cuisineDetails.length !== cuisines.length){ // If the cuisineDetails length is not equal to cuisines length -> Something is missing -> Error
            throw new Error('Some Cuisines are not Valid!!!');
        }
        const openingDaysDetails = await prisma.openingDay.findMany({ // Querying the openingDay Table and checking if the the openingDayId field in the database matched any of the values present in the openingDays array or not
            where : {
                openingDayId : {
                    in : openingDays
                }
            }
        })
        if(openingDaysDetails.length !== openingDays.length){ // Querying the openingDay Table and checking if the the openingDayId field in the database matched any of the values present in the openingDays array or not
            throw new Error('Some Days are not Valid!!!');
        }
        const updatedRestaurant = await prisma.restaurant.update({ // Update an existing Restaurant Object
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
                    connect: cuisineDetails.map(cuisine => ({ cuisineId: cuisine.cuisineId })) // Linking the restaurant to existing cuisine records by their cuisineId
                },  
                openingTime : openingTime,
                closingTime : closingTime, 
                openingDays  : {
                    connect: openingDaysDetails.map(day => ({ openingDayId: day.openingDayId })) // Linking the new restaurant to existing opening day records by their openingDayId
                },
                isPureVeg : isPureVeg,
                priceForTwo : priceForTwo
            }
        })
        return updatedRestaurant; // Return the updated Restaurant Object
    }
    catch(error){
        throw new Error('Error Updating Restaurant...' + error.message + error.stack);
    }
};

// Service for Deleting an existing Restaurant
export const deleteRestaurantService = async ({restaurantIdInt}) => {
    try{
        const deletedRestaurant = prisma.restaurant.delete({ // Querying the Restaurant Table and checking if the the restaurantId field in the database matched what user has entered
            where : {restaurantId : restaurantIdInt}
        })
        return deletedRestaurant; // Return the Deleted Restaurant Object or null
    }
    catch(error){
        throw new Error('Error Deleting Restaurant...' + error.message + error.stack);
    }
};
