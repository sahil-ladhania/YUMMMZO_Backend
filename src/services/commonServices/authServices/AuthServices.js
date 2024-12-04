import prisma from "../../../config/DB.js";
import {comparePassword, generateToken} from "../../../utils/helpers/AuthHelpers.js";

// Service for Checking If a User Exist
export const checkIfUserExists = async ({email}) => {
    try{
        const ifUserExists = await prisma.user.findUnique({
            where: {email}
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
        const newUser = await prisma.user.create({
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
        const isPasswordValid = await comparePassword(password , user.password);
        if(!isPasswordValid){
            return null;
        }
        const jwt_token = await generateToken(user.userId , user.firstName , user.email , user.role);
        console.log(jwt_token);
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
        // check if the password user is entering matches the password in the db and then allow for updation
        const user = await checkIfUserExists({email});
        if(!user){
            return null;
        }
        const isPasswordValid = await comparePassword(password , user.password);
        if(!isPasswordValid){
            throw new Error('Current Password is Incorrect...');
        }
        const User = await prisma.user.update({
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
        return permissions.map((rp) => rp.permission.name);
    }
    catch(error){
        throw new Error('Failed to Fetch Permissions...');
    }
}