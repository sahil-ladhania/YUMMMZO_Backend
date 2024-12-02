import prisma from "../../../config/DB.js";

export const createUserService = async ({firstName , lastName , phoneNumber , email , password , role}) => {
    try{
        const newUser = await prisma.user.create({
            data : {
                firstName,
                lastName,
                phoneNumber,
                email,
                password,
                role
            }
        });
        return newUser;
    }
    catch(error){
        throw new Error('Error Creating User : ' + error.message);
    }
};

export const authenticateService = async ({email , password}) => {
    try{
        const user = await prisma.user.findUnique({
            where : {email}
        });
        if(!user){
            return null;
        }
        else if(password !== user.password){
            return null;
        }
        return user;
    }
    catch(error){
        throw new Error('Error Authenticating User...');
    }
};

export const updatePasswordService = async ({email , password , newPassword}) => {
    try{
        const user = await prisma.user.update({
            where : {email},
            data : {
                password : newPassword
            }
        });
        return user;
    }
    catch(error){
        throw new Error('Error Updating User Password...');
    }
};
