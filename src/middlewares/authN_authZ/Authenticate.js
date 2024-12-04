import jwt from 'jsonwebtoken';

export const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.cookie;
        if (!token) {
            return res.status(401).send({
                message: "Token not found..."
            });
        }
        jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decodedJWT) => {
            if (error) {
                return res.status(403).send({
                    message: "Invalid or expired token..."
                });
            }
            req.user = decodedJWT;
            next();
        });
    } catch (error) {
        res.status(403).send({
            message: "Invalid or expired token..."
        });
    }
};