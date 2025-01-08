import {getPermissionsByRole} from "../../services/commonServices/authServices/AuthServices.js";

export const authorize = (requiredPermission) => {
    return async (req, res, next) => {
        try{
            const {role} = req.user; // Just get the Role from the user Object as we passed the decodedJWT in authenticate Middleware in user
            const permissions = await getPermissionsByRole({role}); // We will get the array or permissions for the specified role in the permissions variable -> We will now go inside getPermissionsByRole Service
            if(permissions.includes(requiredPermission)){ // We will just check if the requiredPermission is there in the permissions array 
                next(); // Move to next Middleware or Controller Function
            }
            else{
                return res.status(403).send({
                    message : "Forbidden: Insufficient permissions..."
                })
            }
        }
        catch(error){
            res.status(500).send({
                message: "Authorization Error...",
            });
        }
    }
}