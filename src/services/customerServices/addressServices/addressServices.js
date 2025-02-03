import prisma from "../../../config/DB.js";

// Service to Create a Address
export const createAddressService = async ({ userId , buildingNumber , floorNumber , apartment , area , nearbyLandmark , city , state , postalCode , country , addressType }) => {
    try {
        const userAddress = await prisma.userAddress.create({ // Will get created address in the userAddress Variable -> Prisma will create a new address and insert it in the UserAddress Table and return it.
            data : {
                userId,
                buildingNumber,
                floorNumber,
                apartment,
                area,
                nearbyLandmark,
                city,
                state,
                postalCode,
                country,
                addressType
            }
        })
        return userAddress;
    } 
    catch(error){
        throw new Error('Error Creating a new Address For a User  : ' + error.message + error.stack);
    }
};

// Service to Get all Addresses
export const getAllAddressesService = async ({ userId }) => {
    try {
        const userAddresses = await prisma.userAddress.findMany({ // Will get all user addresses in the userAddresses Variable -> Prisma will find all the user addresses from UserAddress Table and return it.
            where : {userId}
        })
        return userAddresses;
    } 
    catch(error){
        throw new Error('Error Getting all Addresses For a User  : ' + error.message + error.stack);
    }
};

// Service to Get a Specific Address
export const getAAddressService = async ({ userId , userAddressId }) => {
    try { 
        const userAddress = await prisma.userAddress.findUnique({ // Will get a specific user address in the userAddress Variable -> Prisma will find a specific user addresses from UserAddress Table and return it.
            where: { 
                userAddressId: userAddressId 
            }
        });
        return userAddress;
    } 
    catch(error){
        throw new Error('Error Getting a Specific Address For a User  : ' + error.message + error.stack);
    }
};

// Service to Check If User Address Exist
export const ifUserAddressExist = async ({ userAddressId }) => {
    try {
        const ifUserAddressExist = await prisma.userAddress.findUnique({ // Will get existing user address in ifUserAddressExist Variable -> Prisma will find a specific user address from the UserAddress Table and return it.
            where : {userAddressId}
        })
        return ifUserAddressExist;
    } 
    catch(error){
        throw new Error('Error Checking a Specific Address Existence  : ' + error.message + error.stack);
    }
};

// Service to Update a Address
export const updateAAddressService = async ({ userId , userAddressId , buildingNumber , floorNumber , apartment , area , nearbyLandmark , city , state , postalCode , country , addressType }) => {
    try {
        const userAddress = await prisma.userAddress.update({ // Will get updated address in the userAddress Variable -> Prisma will update an existing address and insert it in the UserAddress Table and return it.
            where : {userAddressId},
            data : {
                userId : userId,
                buildingNumber : buildingNumber,
                floorNumber : floorNumber,
                apartment : apartment,
                area : area,
                nearbyLandmark : nearbyLandmark,
                city : city,
                state : state,
                postalCode : postalCode,
                country : country,
                addressType : addressType
            }
        })  
        return userAddress;
    } 
    catch(error){
        throw new Error('Error Updating a Address For a User  : ' + error.message + error.stack);
    }
};

// Service to Delete a Address
export const deleteAAddressService = async ({ userId , userAddressId }) => {
    try {
        const deletedUserAddress = await prisma.userAddress.delete({ // Will get deleted address in the deletedUserAddress Variable -> Prisma will delete an existing address from the UserAddress Table and return it.
            where : {userAddressId}
        })
        return deletedUserAddress;
    } 
    catch(error){
        throw new Error('Error Deleting a Address For a User  : ' + error.message + error.stack);
    }
};
