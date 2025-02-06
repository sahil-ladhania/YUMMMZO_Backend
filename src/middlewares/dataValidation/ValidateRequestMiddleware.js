
// Middleware for Validating Data
export const validateRequest = (schemas) => {
    return (req , res , next) => {
        try{
            if (schemas.params) {
                schemas.params.parse(req.params);
            }
            if (schemas.body) {
                schemas.body.parse(req.body);
            }
            if (schemas.query) {
                schemas.query.parse(req.query);
            }
            next();
        }
        catch(error){
            console.log(error);
            return res.status(400).json({ 
                message: "Validation Error !!!",
                errors: error.errors.map(err => err.message) 
            });
        }
    }
}