import { checkIfRestaurantExist, createRestaurantService, deleteRestaurantService, updateRestaurantService } from "../../../services/vendorServices/restaurantServices/RestaurantServices.js";

export const createRestaurant = async (req , res , next) => {
    try{
        const {userId , restaurantName , ownerName , ownerEmail , ownerPhoneNumber , buildingNumber , floorNumber , area , nearbyLandmark , city , state , postalCode , country , restaurantImage , cuisines , openingTime , closingTime , openingDays , isPureVeg , priceForTwo} = req.body;
        if(!userId || !restaurantName || !ownerName || !ownerEmail || !ownerPhoneNumber || !buildingNumber || !floorNumber || !area || !nearbyLandmark || !city || !state || !postalCode || !country || !restaurantImage || !cuisines || !openingTime || !closingTime || !isPureVeg || !priceForTwo){
            return res.status(400).send({
                message : "Please fill all required fields..."
            })
        }
        const ifRestaurantExist = await checkIfRestaurantExist({restaurantName});
        if(!ifRestaurantExist){
            const createdRestaurant = await createRestaurantService({userId , restaurantName , ownerName , ownerEmail , ownerPhoneNumber , buildingNumber , floorNumber , area , nearbyLandmark , city , state , postalCode , country , restaurantImage , cuisines , openingTime , closingTime , openingDays , isPureVeg , priceForTwo});
            console.log(createdRestaurant);
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


export const updateRestaurant = async (req , res , next) => {
    try{
        const {userId , restaurantName , ownerName , ownerEmail , ownerPhoneNumber , buildingNumber , floorNumber , area , nearbyLandmark , city , state , postalCode , country , restaurantImage , cuisines , openingTime , closingTime , openingDays , isPureVeg , priceForTwo} = req.body;
        const {restaurantId} = req.params;
        const restaurantIdInt = parseInt(restaurantId , 10);
        if (isNaN(restaurantIdInt)) {
            return res.status(400).send({ 
                message: "Invalid restaurant ID!!!" 
            });
        }
        if(!userId || !restaurantName || !ownerName || !ownerEmail || !ownerPhoneNumber || !buildingNumber || !floorNumber || !area || !nearbyLandmark || !city || !state || !postalCode || !country || !restaurantImage || !cuisines || !openingTime || !closingTime || !isPureVeg || !priceForTwo){
            return res.status(400).send({
                message : "Please fill all required fields..."
            })
        }
        const ifRestaurantExist = await checkIfRestaurantExist({restaurantName});
        if(!ifRestaurantExist){
            return res.status(404).send({
                message : "Restaurant Doesnt Exist!!!"
            })
        }
        else{
            const updatedRestaurant = await updateRestaurantService({restaurantIdInt , restaurantName , ownerName , ownerEmail , ownerPhoneNumber , buildingNumber , floorNumber , area , nearbyLandmark , city , state , postalCode , country , restaurantImage , cuisines , openingTime , closingTime , openingDays , isPureVeg , priceForTwo});
            console.log(updatedRestaurant);
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


export const deleteRestaurant = async (req , res , next) => {
    try{
        const {restaurantId} = req.params;
        const restaurantIdInt = parseInt(restaurantId , 10);
        if (isNaN(restaurantIdInt)) {
            return res.status(400).send({ 
                message: "Invalid restaurant ID!!!" 
            });
        }
        const deletedRestaurant = await deleteRestaurantService({restaurantIdInt});
        console.log(deletedRestaurant);
        return res.status(200).send({
            message : "Restaurant Successfully Deleted...",
            restaurant : deletedRestaurant
        })
    }
    catch(error){
        next(error);
    }
};
