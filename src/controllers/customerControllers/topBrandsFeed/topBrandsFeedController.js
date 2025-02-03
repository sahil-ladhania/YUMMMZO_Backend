import { getTopBrandsService } from "../../../services/customerServices/topBrandsServices/topBrandsServices.js";

// Controller to Get Top Brands
export const getTopBrands = async(req , res , next) => {
    try{
        const topBrands = await getTopBrandsService(); // Will get all top brands in the topBrands Variable -> getTopBrandsService will start executing.
        return res.status(200).send({ 
            message : "Top Brands Successfully Retrieved...",
            topBrands : topBrands
        })
    }
    catch(error){
        next(error);
    }
}