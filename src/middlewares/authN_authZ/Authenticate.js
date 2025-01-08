import jwt from 'jsonwebtoken';

export const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.cookie; // We are getting the jwt_token from the Cookie , which is sent by the client automatically
        if (!token) {
            return res.status(401).send({
                message: "Token not found..."
            });
        }
        jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decodedJWT) => { // I need to verify the jwt_token 
            if (error) {
                return res.status(403).send({
                    message: "Invalid or expired token..."
                });
            }
            req.user = decodedJWT; // Just set the decodedJWT in the body object
            next(); // Move to next Middleware or Controller Function
        });
    } 
    catch (error) {
        res.status(403).send({
            message: "Invalid or expired token..."
        });
    }
};