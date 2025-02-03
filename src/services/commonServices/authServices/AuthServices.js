import prisma from "../../../config/DB.js";
import {comparePassword, generateToken} from "../../../utils/helpers/AuthHelpers.js";

// Service for Checking If a User Exist
export const checkIfUserExists = async ({email}) => {
    try{
        const ifUserExists = await prisma.user.findUnique({ // Will get User Object or null in ifUserExists Variable -> Prisma will search in User Table if the User with this email exist or not.
            where: {email}
        })
        return ifUserExists; 
    }
    catch(error){
        throw new Error('Error Checking User Existence : ' + error.message + error.stack);
    }
}

export const checkIfUserExistsById = async ({userId}) => {
    try{
        const ifUserExists = await prisma.user.findUnique({ // Will get User Object or null in ifUserExists Variable -> Prisma will search in User Table if the User with this userId exist or not.
            where: {userId}
        })
        return ifUserExists; 
    }
    catch(error){
        throw new Error('Error Checking User Existence : ' + error.message + error.stack);
    }
}

// Service for Creating a New User
export const createUserService = async ({firstName , lastName , phoneNumber , email , hashedPassword , role}) => {
    try{
        const newUser = await prisma.user.create({ // Will the new User Object in the newUser Variable -> Prisma will create and insert new User Object in the User Table with all the info got.
            data : {
                firstName,
                lastName,
                phoneNumber,
                email,
                password : hashedPassword,
                role
            }
        });
        return newUser;
    }
    catch(error){
        throw new Error('Error Creating User : ' + error.message + error.stack);
    }
};

// Service for Authenticating the User
export const authenticateService = async ({email , password}) => {
    try{
        const user = await prisma.user.findUnique({
            where : {email}
        });
        if(!user){
            return null; 
        }
        const isPasswordValid = await comparePassword(password , user.password); // Will get User Object or null Based on the Password Match in isPasswordValid Variable -> comparePassword Function will start executing  and will take password that user entered with that is Saved in DB.
        if(!isPasswordValid){
            return null;
        }
        const jwt_token = await generateToken(user.userId , user.firstName , user.email , user.role); // Will get the JWT Token in the jwt_token Variable -> generateToken will start executing and will take relevant info to set in Payload.
        const User = {
            user : user,
            jwt_token : jwt_token
        }
        return User;
    }
    catch(error){
        throw new Error('Error Authenticating User...' + error.message + error.stack);
    }
};

// Service for Updating the User's Password
export const updatePasswordService = async ({email , password , newHashedPassword}) => {
    try{
        const user = await checkIfUserExists({email}); 
        if(!user){
            return null; 
        }
        const isPasswordValid = await comparePassword(password , user.password); 
        if(!isPasswordValid){
            throw new Error('Current Password is Incorrect...');
        }
        const User = await prisma.user.update({ // Will get the Updated User Object or null in the User Variable -> Prisma will update existing User Object in the User Table with all the info got to Update. 
            where : {email},
            data : {
                password : newHashedPassword
            }
        });
        const updatedUser = {
            message : "Password Updated Successfully...",
            user : User
        }
        return updatedUser;
    }
    catch(error){
        throw new Error('Error Updating User Password...' + error.message + error.stack);
    }
};

// Service for Getting the Permissions for a Specific Role
export const getPermissionsByRole = async({role}) => {
    try{
        const permissions = await prisma.rolePermission.findMany({ 
            where: {
                role : role
            },
            include: {
                permission : true
            }
        })
        return permissions.map((rp) => 
            rp.permission.name 
        );
    }
    catch(error){
        throw new Error('Failed to Fetch Permissions...' + error.message + error.stack);
    }
}
