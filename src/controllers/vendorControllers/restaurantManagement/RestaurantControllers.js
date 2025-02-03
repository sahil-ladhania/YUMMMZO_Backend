import { checkIfRestaurantExist, createRestaurantService, deleteRestaurantService, updateRestaurantService } from "../../../services/vendorServices/restaurantServices/RestaurantServices.js";

// Controller For Creating a new Restaurant
export const createRestaurant = async (req , res , next) => {
    try{
        const {userId , restaurantName , ownerName , ownerEmail , ownerPhoneNumber , buildingNumber , floorNumber , area , nearbyLandmark , city , state , postalCode , country , restaurantImage , cuisines , openingTime , closingTime , openingDays , isPureVeg , priceForTwo} = req.body;
        if(
            !userId || 
            !restaurantName || 
            !ownerName || 
            !ownerEmail || 
            !ownerPhoneNumber || 
            !buildingNumber || 
            !floorNumber || 
            !area || 
            !city || 
            !nearbyLandmark || 
            !state || 
            !postalCode || 
            !country || 
            !restaurantImage || 
            isPureVeg === undefined || 
            !priceForTwo ||
            cuisines.length < 1|| 
            !openingTime || 
            !closingTime || 
            openingDays.length < 1
        ){
            return res.status(400).send({
                message : "Please fill all required fields..."
            })
        }
        const ifRestaurantExist = await checkIfRestaurantExist({restaurantName: restaurantName}); // Will get an existing restaurant object or null in the ifRestaurantExist Variable -> checkIfRestaurantExist will start executing.
        if(!ifRestaurantExist){
            const createdRestaurant = await createRestaurantService({userId , restaurantName , ownerName , ownerEmail , ownerPhoneNumber , buildingNumber , floorNumber , area , nearbyLandmark , city , state , postalCode , country , restaurantImage , cuisines , openingTime , closingTime , openingDays , isPureVeg , priceForTwo}); // Will get a new created restaurant in the createdRestaurant Variable -> createRestaurantService will start executing and will take body info.
            return res.status(201).send({ 
                message : "Restaurant Successfully Registered...",
                restaurant : createdRestaurant
            })
        }
        else{
            return res.status(400).send({
                message : "Restaurant Already Exist..."
            })
        }
    }
    catch(error){
        next(error);
    }
};

// Controller For Updating an existing Restaurant
export const updateRestaurant = async (req , res , next) => {
    try{
        const {userId , restaurantName , ownerName , ownerEmail , ownerPhoneNumber , buildingNumber , floorNumber , area , nearbyLandmark , city , state , postalCode , country , restaurantImage , cuisines , openingTime , closingTime , openingDays , isPureVeg , priceForTwo} = req.body;
        const {restaurantId} = req.params;
        const restaurantIdInt = parseInt(restaurantId , 10); 
        console.log(restaurantIdInt);
        if (isNaN(restaurantIdInt)) { 
            return res.status(400).send({ 
                message: "Invalid restaurant ID!!!" 
            });
        }
        if(
            !userId || 
            !restaurantName || 
            !ownerName || 
            !ownerEmail || 
            !ownerPhoneNumber || 
            !buildingNumber || 
            !floorNumber || 
            !area || 
            !city || 
            !nearbyLandmark || 
            !state || 
            !postalCode || 
            !country || 
            !restaurantImage || 
            isPureVeg === undefined || 
            !priceForTwo ||
            !cuisines.length || 
            !openingTime || 
            !closingTime || 
            !openingDays.length
        ){
            return res.status(400).send({
                message : "Please fill all required fields..."
            })
        }
        const ifRestaurantExist = await checkIfRestaurantExist({restaurantId: restaurantIdInt}); // Will get an existing restaurant object or null in the ifRestaurantExist Variable -> checkIfRestaurantExist will start executing.
        if(!ifRestaurantExist){
            return res.status(404).send({
                message : "Restaurant Doesnt Exist!!!"
            })
        }
        else{
            const updatedRestaurant = await updateRestaurantService({restaurantIdInt , restaurantName , ownerName , ownerEmail , ownerPhoneNumber , buildingNumber , floorNumber , area , nearbyLandmark , city , state , postalCode , country , restaurantImage , cuisines , openingTime , closingTime , openingDays , isPureVeg , priceForTwo}); // Will get the updated restaurant in the updatedRestaurant Variable -> updateRestaurantService will start executing and will take body info.
            return res.status(201).send({ 
                message : "Restaurant Successfully Updated...",
                restaurant : updatedRestaurant
            })
        }
    }
    catch(error){
        next(error);
    }
};

// Controller For Deleting an existing Restaurant
export const deleteRestaurant = async (req , res , next) => {
    try{
        const {restaurantId} = req.params;
        const restaurantIdInt = parseInt(restaurantId , 10); 
        if (isNaN(restaurantIdInt)) { 
            return res.status(400).send({ 
                message: "Invalid restaurant ID!!!" 
            });
        }
        const ifRestaurantExist = await checkIfRestaurantExist({restaurantId: restaurantIdInt}); // Will get an existing restaurant object or null in the ifRestaurantExist Variable -> checkIfRestaurantExist will start executing.
        if(ifRestaurantExist){
            const deletedRestaurant = await deleteRestaurantService({restaurantIdInt}); // Will get the deleted restaurant in the deletedRestaurant Variable -> deleteRestaurantService will start executing and will take restaurantId.
            return res.status(200).send({
                message : "Restaurant Successfully Deleted...",
                restaurant : deletedRestaurant
            })
        }
        else{ 
            return res.status(404).send({ 
                message : "Restaurant Doesnt Exist!!!",
            })
        }
    }
    catch(error){
        next(error);
    }
};
