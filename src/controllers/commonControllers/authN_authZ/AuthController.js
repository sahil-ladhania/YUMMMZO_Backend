import {
    authenticateService, checkIfUserExists,
    createUserService,
    updatePasswordService
} from "../../../services/commonServices/authServices/AuthServices.js";
import {hashPassword} from "../../../utils/helpers/AuthHelpers.js";

// Controller for Signing Up
export const signupController = async(req , res , next) => {
    try{
        const {firstName , lastName , phoneNumber , email , password , role} = req.body;
        if(!firstName || !lastName || !phoneNumber || !email || !password || !role){
            return res.status(400).send({
                message : "Please fill all required fields..."
            })
        }
        const hashedPassword = await hashPassword(password); // Will get the Hashed Password in hashedPassword Variable -> hashPassword will start executing and will take password.
        const ifUserExist = await checkIfUserExists({email}); // Will get the User Object or null Based on if the User exist or not in ifUserExist Variable -> checkIfUserExists will start executing and will take email.
        if(!ifUserExist){
            const newUser = await createUserService({firstName , lastName , phoneNumber , email , hashedPassword , role}); // Will get the new User Object in the newUser Variable -> createUserService will start executing and will take the body info.
            return res.status(201).send({
                message : "User Successfully Signed Up...",
                user : newUser
            })
        }
        else{
            return res.status(400).send({
                message : "User Already Exist..."
            })
        }
    }
    catch(error){
        next(error);
    }
}

// Controller for Logging In
export const loginController = async(req , res , next) => {
    try{
        const {email , password} = req.body;
        if(!email || !password){
            return res.status(400).send({
                message : "Please fill all required fields..."
            })
        }
        const {user , jwt_token} = await authenticateService({email , password}); // Will get user Object and jwt_token Token -> authenticateService will start executing and will take email and password.
        if(!user){
            return res.status(400).send({
                message : "Invalid Credentials..."
            })
        }
        res.cookie("jwt" , jwt_token, { // Will Set the Cookie with Configuration
            maxAge : 3600000, 
            httpOnly : true , 
            path: '/', 
            sameSite : 'Lax' , 
            secure : false
        });
        return res.status(201).send({
            message : "User Successfully Logged In...",
            existingUser : user
        })
    }
    catch(error){
        next(error);
    }
}

// Controller for Updating Password
export const changePasswordController = async(req , res , next) => {
    try{
        const {email , password , newPassword , confirmPassword} = req.body;
        if(!email || !password || !newPassword || !confirmPassword){
            return res.status(400).send({
                message : "Please fill all required fields..."
            })
        }
        if(newPassword === confirmPassword){
            const newHashedPassword = await hashPassword(newPassword); 
            const updatedUserInfo = await updatePasswordService({email , password , newHashedPassword}); // Will get Updated User Object in updatedUserInfo Variable -> updatePasswordService will start executing and will tka eemail , password and newHashedPassword.
            return res.status(201).send({
                message : "User Successfully Updated Password...",
                updatedInfo : updatedUserInfo
            })
        }
        else{
            return res.status(400).send({
                message : "New Password Doesnt Match to Confirm Password..."
            })
        }
    }
    catch(error){
        next(error);
    }
}

// Controller for Logout
export const logoutController = async(req , res , next) => {
    try{
        res.clearCookie("jwt", { // Will Clear the Cookie with Configuration
            path: "/",                
            httpOnly: false,          
            sameSite: "None",         
            secure: false,            
        });
        return res.status(200).send({
            message : "User Successfully Logged Out...",
        })
    }
    catch(error){
        next(error);
    }
}