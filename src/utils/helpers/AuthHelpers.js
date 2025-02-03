import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Auth Helper for Hashing Password
export const hashPassword = async(password) => {
    try{
        const saltrounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltrounds); // Will get the Hashed Password in hashedPassword Variable -> Will use bcrypt.hash method of bcrypt that takes password and saltrounds.
        return hashedPassword; 
    }
    catch(error){
        throw new Error(`Error Hashing Password : ${error.message}`);
    }
}

// Auth Helper for Comparing Password
export const comparePassword = async(password , hashedPassword) => {
    try{
        const isMatch = await bcrypt.compare(password, hashedPassword); // Will get true or false based on the comparison in the isMatch Variable -> Will use bcrypt.compare method of bcrypt that takes password and hashedPassword.
        return isMatch; 
    }
    catch(error){
        throw new Error(`Error Comparing Password : ${error.message}`);
    }
}

// Auth Helper for Generating JWT Token
export const generateToken = async(userId , firstName , email , role) => {
    try{
        const payload = {
            userId : userId,
            firstName : firstName,
            email : email,
            role : role
        };
        const secretKey = process.env.JWT_SECRET_KEY;
        const options = {
            expiresIn : "1h",
        }
        const jwt_token = await jwt.sign(payload, secretKey, options); // Will get Token or will throw an error based on the process -> Will use bcrypt.sign method of bcrypt that takes password , secretKey and options.
        return jwt_token;
    }
    catch(error){
        throw new Error(`Error Generating Token : ${error.message}`);
    }
}