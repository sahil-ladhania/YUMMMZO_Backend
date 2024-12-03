import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Auth Helper for Hashing Password
export const hashPassword = async(password) => {
    try{
        // return hashed password
        const saltrounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltrounds);
        return hashedPassword;
    }
    catch(error){
        throw new Error(`Error Hashing Password : ${error.message}`);
    }
}

// Auth Helper for Comparing Password
export const comparePassword = async(password , hashedPassword) => {
    try{
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    }
    catch(error){
        throw new Error(`Error Comparing Password : ${error.message}`);
    }
}

// Auth Helper for Generating JWT Token
export const generateToken = async(userId , firstName , email , role) => {
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
    const jwt_token = await jwt.sign(payload, secretKey, options);
    return jwt_token;
}