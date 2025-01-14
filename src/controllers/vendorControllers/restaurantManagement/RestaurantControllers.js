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
            !cuisines.length || 
            !openingTime || 
            !closingTime || 
            !openingDays.length
        ){
            return res.status(400).send({
                message : "Please fill all required fields..."
            })
        }
        const ifRestaurantExist = await checkIfRestaurantExist({restaurantName: restaurantName}); // Checking if the Restaurant already exist -> Pass the Key:Value Pair as we have to destructure it in the checkIfRestaurantExist Service -> Will return Restaurant Object or null -> Will Jump to checkIfRestaurantExist Service
        // If Restaurant Dont Exist -> Create a New One
        if(!ifRestaurantExist){
            const createdRestaurant = await createRestaurantService({userId , restaurantName , ownerName , ownerEmail , ownerPhoneNumber , buildingNumber , floorNumber , area , nearbyLandmark , city , state , postalCode , country , restaurantImage , cuisines , openingTime , closingTime , openingDays , isPureVeg , priceForTwo}); // Creating a new Restaurant -> Will get a new Restaurant Object -> Will Jump to createRestaurantService Service
            console.log(createdRestaurant);
            return res.status(201).send({ // Send the Response with message and New Created Restuarant Object
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
        const {restaurantId} = req.params; // Get the ID for Restaurant you want to Update
        const restaurantIdInt = parseInt(restaurantId , 10); // Convert the String ID into Int Type
        console.log(restaurantIdInt);
        if (isNaN(restaurantIdInt)) { // If Not a Number -> Send a Response that Invalid ID
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
        const ifRestaurantExist = await checkIfRestaurantExist({restaurantId: restaurantIdInt}); // Checking if the Restaurant already exist by its ID -> Pass the Key:Value Pair as we have to destructure it in the checkIfRestaurantExist Service -> Will return Restaurant Object or null -> Will Jump to checkIfRestaurantExist Service
        // If Restaurant Dont Exist -> Send a Response that Restaurant Dont Exist 
        if(!ifRestaurantExist){
            return res.status(404).send({
                message : "Restaurant Doesnt Exist!!!"
            })
        }
        // If Restaurant Exist -> Update It
        else{
            const updatedRestaurant = await updateRestaurantService({restaurantIdInt , restaurantName , ownerName , ownerEmail , ownerPhoneNumber , buildingNumber , floorNumber , area , nearbyLandmark , city , state , postalCode , country , restaurantImage , cuisines , openingTime , closingTime , openingDays , isPureVeg , priceForTwo}); // Update the Restautant -> Will Return Updated Restaurant -> Will Jump to updateRestaurantService Service
            console.log(updatedRestaurant);
            return res.status(201).send({ // Send the Response with message and Updated Restuarant Object
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
        const {restaurantId} = req.params; // Get the ID for Restaurant you want to Delete
        const restaurantIdInt = parseInt(restaurantId , 10); // Convert the String ID into Int Type
        if (isNaN(restaurantIdInt)) { // If Not a Number -> Send a Response that Invalid ID
            return res.status(400).send({ 
                message: "Invalid restaurant ID!!!" 
            });
        }
        const ifRestaurantExist = await checkIfRestaurantExist({restaurantId: restaurantIdInt}); // Checking if the Restaurant already exist by its ID -> Pass the Key:Value Pair as we have to destructure it in the checkIfRestaurantExist Service -> Will return Restaurant Object or null -> Will Jump to checkIfRestaurantExist Service
        if(ifRestaurantExist){ // If Restaurant Exist -> Delete It
            const deletedRestaurant = await deleteRestaurantService({restaurantIdInt}); // Delete the Existing Restaurant -> Will get the Deleted Restaurant Object -> Will Jump to deleteRestaurantService Service
            console.log(deletedRestaurant);
            return res.status(200).send({ // Send the Response with message and Deleted Restaurant Object
                message : "Restaurant Successfully Deleted...",
                restaurant : deletedRestaurant
            })
        }
        else{ 
            return res.status(404).send({ // Send the Response with message that Restaurant Doesnt Exist
                message : "Restaurant Doesnt Exist!!!",
            })
        }
    }
    catch(error){
        next(error);
    }
};
