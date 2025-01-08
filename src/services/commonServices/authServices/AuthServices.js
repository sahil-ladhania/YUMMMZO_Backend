import prisma from "../../../config/DB.js";
import {comparePassword, generateToken} from "../../../utils/helpers/AuthHelpers.js";

// Service for Checking If a User Exist
export const checkIfUserExists = async ({email}) => {
    try{
        const ifUserExists = await prisma.user.findUnique({ // Get the user Object in ifUserExists variable -> We are calling the User Table and checking if the email that user has provided exist or not
            where: {email}
        })
        return ifUserExists; // Return the User Object
    }
    catch(error){
        throw new Error('Error Checking User Existence : ' + error.message + error.stack);
    }
}

// Service for Creating a New User
export const createUserService = async ({firstName , lastName , phoneNumber , email , hashedPassword , role}) => {
    try{
        const newUser = await prisma.user.create({ // Get the new created User in the newUser variable -> We are creating a new User and adding it in the Users Table with all the below data that we got in parameters
            data : {
                firstName,
                lastName,
                phoneNumber,
                email,
                password : hashedPassword,
                role
            }
        });
        return newUser; // Return the User Object
    }
    catch(error){
        throw new Error('Error Creating User : ' + error.message + error.stack);
    }
};

// Service for Authenticating the User
export const authenticateService = async ({email , password}) => {
    try{
        const user = await prisma.user.findUnique({ // Get the user Object in user variable -> We are calling the User Table and checking if email and password that user has provided matches or not
            where : {email}
        });
        if(!user){
            return null; // So if the user dont exist , simply return null
        }
        const isPasswordValid = await comparePassword(password , user.password); // Here we wil get true or false : true if saved password matches with what the user has entered -> We will now go inside comparePassword Function
        if(!isPasswordValid){
            return null; // So if it doesnt match , simply return null
        }
        const jwt_token = await generateToken(user.userId , user.firstName , user.email , user.role); // Here we will generate the jwt token and get the token in jwt_token variable -> We will now go inside generateToken Function
        console.log(jwt_token); 
        const User = {
            user : user,
            jwt_token : jwt_token
        }
        return User; // Now we just return an Object that contains user Object and the jwt_token
    }
    catch(error){
        throw new Error('Error Authenticating User...' + error.message + error.stack);
    }
};

// Service for Updating the User's Password
export const updatePasswordService = async ({email , password , newHashedPassword}) => {
    try{
        const user = await checkIfUserExists({email}); // We will get the user object in the user variable and just check if the user with the specified email exist or not -> We will now go inside checkIfUserExists Service
        if(!user){
            return null; // So if the user dont exist , simply return null
        }
        const isPasswordValid = await comparePassword(password , user.password); // Here we wil get true or false : true if saved password matches with what the user has entered -> We will now go inside comparePassword Function
        if(!isPasswordValid){
            throw new Error('Current Password is Incorrect...');
        }
        const User = await prisma.user.update({ // We wil get the updated user object in the User variable and just update the user in user table
            where : {email},
            data : {
                password : newHashedPassword
            }
        });
        const updatedUser = {
            message : "Password Updated Successfully...",
            user : User
        }
        return updatedUser; // Now we will just return an Object that contains user Object and the message
    }
    catch(error){
        throw new Error('Error Updating User Password...' + error.message + error.stack);
    }
};

// Service for Getting the Permissions for a Specific Role
export const getPermissionsByRole = async({role}) => {
    try{
        const permissions = await prisma.rolePermission.findMany({ // We will get the permissions which is an  array or objects in the permissions variable -> We will call the rolePermission table and find all the permissions that is mapped to specified role
            where: {
                role : role
            },
            include: {
                permission : true
            }
        })
        return permissions.map((rp) => 
            rp.permission.name // So here we are just returning the array of permissions
        );
    }
    catch(error){
        throw new Error('Failed to Fetch Permissions...');
    }
}