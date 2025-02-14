import prisma from "../../../config/DB.js";

// Service to Create a Top Brand
export const createTopBrandService = async({image , name}) => {
    try{
        const createdTopBrand = await prisma.topBrand.create({ 
            data : {
                image : image,
                name : name
            }
        });
        return createdTopBrand;
    }
    catch(error){
        throw new Error('Error Creating a Top Brand  : ' + error.message + error.stack);
    }
}

// Service to Get All Top Brands
export const getTopBrandsService = async() => {
    try{
        const topBrands = await prisma.topBrand.findMany(); 
        return topBrands;
    }
    catch(error){
        throw new Error('Error Getting Top Brands : ' + error.message + error.stack);
    }
}