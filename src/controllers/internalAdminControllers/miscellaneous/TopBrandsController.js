import { createTopBrandService } from "../../../services/customerServices/topBrandsServices/topBrandsServices.js";

// Controller to Create a Top Brand
export const createTopBrand = async(req , res , next) => {
    try{
        const {image , name} = req.body;
        if(!image || !name){
            return res.status(400).send({
                message : "Please fill all required fields..."
            })
        }
        const createdTopBrand = await createTopBrandService({image , name}); 
        return res.status(201).send({ 
            message : "Top Brand Successfully Created...",
            topBrand : createdTopBrand
        })
    }
    catch(error){
        next(error);
    }
}