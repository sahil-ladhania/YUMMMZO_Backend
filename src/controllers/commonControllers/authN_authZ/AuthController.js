import {
    authenticateService,
    createUserService,
    updatePasswordService
} from "../../../services/commonServices/authServices/AuthServices.js";

export const signupController = async(req , res) => {
    try{
        const {firstName , lastName , phoneNumber , email , password , role} = req.body;
        const newUser = await createUserService({firstName , lastName , phoneNumber , email , password , role});
        return res.status(201).send({
            message : "User Successfully Signed Up...",
            user : newUser
        })
    }
    catch(error){
        return res.status(500).send({
            message : "Error Creating User...",
            error : error.message
        })
    }
}


export const loginController = async(req , res) => {
    try{
        const {email , password} = req.body;
        const existingUser = await authenticateService({email , password});
        return res.status(201).send({
            message : "User Successfully Logged In...",
            existingUser : existingUser
        })
    }
    catch(error){
        return res.status(500).send({
            message : "Error Logging In User...",
            error : error.message
        })
    }
}


export const changePasswordController = async(req , res) => {
    try{
        const {email , password , newPassword} = req.body;
        const updatedUserInfo = await updatePasswordService({email , password , newPassword});
        return res.status(201).send({
            message : "User Successfully Updated Password...",
            updatedInfo : updatedUserInfo
        })
    }
    catch(error){
        return res.status(500).send({
            message : "Error Updating Password...",
            error : error.message
        })
    }
}