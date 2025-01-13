import {getPermissionsByRole} from "../../services/commonServices/authServices/AuthServices.js";

export const authorize = (requiredPermission) => {
    return async (req, res, next) => {
        try{
            const {role} = req.user;
            const permissions = await getPermissionsByRole({role}); 
            if(permissions.includes(requiredPermission)){
                next(); 
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