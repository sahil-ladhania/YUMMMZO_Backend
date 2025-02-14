import { createAddressService, deleteAAddressService, getAAddressService, getAllAddressesService, ifUserAddressExist, updateAAddressService } from "../../../services/customerServices/addressServices/addressServices.js";

// Controller to Create a Address
export const createAddress = async (req , res , next) => {
    try {
        const { userId } = req.params;
        const userId_INT = parseInt(userId);
        const { buildingNumber , floorNumber , apartment , area , nearbyLandmark , city , state , postalCode , country , addressType } = req.body;
        const postalCode_INT = parseInt(postalCode);
        if(!userId || !buildingNumber || !floorNumber || !apartment || !area || !nearbyLandmark || !city || !state || !postalCode || !country || !addressType){
            return res.status(400).send({
                message : "Please fill all required fields..."
            })
        }
        const createdAddress = await createAddressService({ userId : userId_INT , buildingNumber , floorNumber , apartment , area , nearbyLandmark , city , state , postalCode : postalCode_INT , country , addressType }); 
        return res.status(201).send({
            message: "User Address Created Successfully...",
            userAddress: createdAddress
        });
    } 
    catch(error){
        next(error);
    }
};

// Controller to Get all Addresses
export const getAllAddresses = async (req , res , next) => {
    try {
        const { userId } = req.params;
        const userId_INT = parseInt(userId);
        if(!userId){
            return res.status(400).send({
                message : "Please fill all required fields..."
            })
        }
        const userAddresses = await getAllAddressesService({ userId : userId_INT }); 
        return res.status(200).send({ 
            message : "User Addresses Successfully Retrieved...",
            userAddresses : userAddresses
        })
    } 
    catch(error){
        next(error);
    }
};

// Controller to Get a Specific Address
export const getAAddress = async (req , res , next) => {
    try {
        const { userId , userAddressId } = req.params;
        const userId_INT = parseInt(userId);
        const userAddressId_INT = parseInt(userAddressId);
        if(!userId || !userAddressId){
            return res.status(400).send({
                message : "Please fill all required fields..."
            })
        }
        const existingUserAddress = await ifUserAddressExist({ userAddressId : userAddressId_INT }); 
        if(!existingUserAddress){
            return res.status(404).send({
                message : "User Address Doesnt Exist!!!"
            })
        }
        else{
            const userAddress = await getAAddressService({ userId : userId_INT , userAddressId : userAddressId_INT }); 
            return res.status(200).send({ 
                message : "User Address Successfully Retrieved...",
                userAddress : userAddress
            })
        }
    } 
    catch(error){
        next(error);
    }
};

// Controller to Update a Address
export const updateAAddress = async (req , res , next) => {
    try {
        const { userId , userAddressId } = req.params;
        const userId_INT = parseInt(userId);
        const userAddressId_INT = parseInt(userAddressId);
        const { buildingNumber , floorNumber , apartment , area , nearbyLandmark , city , state , postalCode , country , addressType } = req.body;
        const postalCode_INT = parseInt(postalCode);
        if(!userId || !userAddressId || !buildingNumber || !floorNumber || !apartment || !area || !nearbyLandmark || !city || !state || !postalCode || !country || !addressType){
            return res.status(400).send({
                message : "Please fill all required fields..."
            })
        }
        const existingUserAddress = await ifUserAddressExist({ userAddressId : userAddressId_INT }); 
        if(!existingUserAddress){
            return res.status(404).send({
                message : "User Address Doesnt Exist!!!"
            })
        }
        else{
            const updatedAddress = await updateAAddressService({ userId : userId_INT , userAddressId : userAddressId_INT , buildingNumber , floorNumber , apartment , area , nearbyLandmark , city , state , postalCode : postalCode_INT , country , addressType }); 
            return res.status(201).send({
                message: "User Address Updated Successfully...",
                userAddress: updatedAddress
            });
        }
    } 
    catch(error){
        next(error);
    }
};

// Controller to Delete a Address
export const deleteAAddress = async (req , res , next) => {
    try {
        const { userId , userAddressId } = req.params;
        const userId_INT = parseInt(userId);
        const userAddressId_INT = parseInt(userAddressId);
        if(!userId || !userAddressId){
            return res.status(400).send({
                message : "Please fill all required fields..."
            })
        }
        const existingUserAddress = await ifUserAddressExist({ userAddressId : userAddressId_INT }); 
        if(!existingUserAddress){
            return res.status(404).send({
                message : "User Address Doesnt Exist!!!"
            })
        }
        else{
            const deletedAddress = await deleteAAddressService({ userId : userId_INT , userAddressId : userAddressId_INT });
            return res.status(201).send({
                message: "User Address Deleted Successfully...",
                userAddress: deletedAddress
            });
        }
    } 
    catch(error){
        next(error);
    }
};
