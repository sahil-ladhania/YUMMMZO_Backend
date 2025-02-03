import prisma from "../../../config/DB.js";

// Service to Get All Cuisines
export const createTopBrandService = async({image , name}) => {
    try{
        const createdTopBrand = await prisma.topBrand.create({ // Will get created top brand in the createdTopBrand Variable -> Prisma will create a new record of top brand and insert it in topBrand Table and return it.
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

// Service to Get All Cuisines
export const getTopBrandsService = async() => {
    try{
        const topBrands = await prisma.topBrand.findMany(); // Will get all top brands in the topBrands Variable -> Prisma will find all the topBrands from topBrand Table and return it.
        return topBrands;
    }
    catch(error){
        throw new Error('Error Getting Top Brands : ' + error.message + error.stack);
    }
}