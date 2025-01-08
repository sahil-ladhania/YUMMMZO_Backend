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
        const hashedPassword = await hashPassword(password); // Hashing the Password(We will get the Hashed Password from hashPassword Function) -> We will now go inside hashPassword Function
        const ifUserExist = await checkIfUserExists({email}); // Here we will get the User Object for the specific email , if the User exists -> We will now go inside checkIfUserExists Service
        if(!ifUserExist){
            const newUser = await createUserService({firstName , lastName , phoneNumber , email , hashedPassword , role}); // Here we will get a new User Object if there is no such User with the given email in the DB -> We will now go inside createUserService Service
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
        const {user , jwt_token} = await authenticateService({email , password}); // Here we will get the user and jwt_token form the authenticateService Function as it will be returning an Object and that is why we are destructuring it in this way -> We will now go inside authenticateService Service
        if(!user){
            return res.status(400).send({
                message : "Invalid Credentials..."
            })
        }
        res.cookie("jwt" , jwt_token, {
            maxAge : 600000, httpOnly : false , path: '/', sameSite : 'None' , secure : false // Now set the jwt_token into the Cookie
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
            const newHashedPassword = await hashPassword(newPassword); // We will get the Hashed Password for the new password -> We will now go inside hashPassword Function
            const updatedUserInfo = await updatePasswordService({email , password , newHashedPassword}); // We will get the updated user Object in the updatedUserInfo variable -> We will now go inside updatePasswordService Serivce
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