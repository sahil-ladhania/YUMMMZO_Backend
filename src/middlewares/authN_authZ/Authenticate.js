import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET_KEY;

// Middleware for Authenticating a User
export const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.jwt; 
        if (!token) {
            return res.status(401).send({
                message: "Token not found..."
            });
        }
        jwt.verify(token, secretKey, (error, decodedJWT) => { 
            if (error) {
                return res.status(403).send({
                    message: "Invalid or expired token..."
                });
            }
            req.user = decodedJWT; 
            next();
        });
    } 
    catch (error) {
        res.status(403).send({
            message: "Invalid or expired token..."
        });
    }
};