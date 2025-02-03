import { createTopBrandService } from "../../../services/customerServices/topBrandsServices/topBrandsServices.js";

// Controller to Get Top Brands
export const createTopBrand = async(req , res , next) => {
    try{
        const {image , name} = req.body;
        if(!image || !name){
            return res.status(400).send({
                message : "Please fill all required fields..."
            })
        }
        // save the data in db
        const createdTopBrand = await createTopBrandService({image , name}); // Will get created top brand in the createdTopBrand Variable -> createTopBrandService will start executing.
        return res.status(201).send({ 
            message : "Top Brand Successfully Created...",
            topBrand : createdTopBrand
        })
    }
    catch(error){
        next(error);
    }
}