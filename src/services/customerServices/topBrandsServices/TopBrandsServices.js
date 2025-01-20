import prisma from "../../../config/DB.js";

// Service to Get All Cuisines
export const createTopBrandService = async({image , name}) => {
    try{
        const createdTopBrand = await prisma.topBrand.create({
            data : {
                image : image,
                name : name
            }
        });
        console.log(createdTopBrand);
        return createdTopBrand;
    }
    catch(error){
        throw new Error('Error Creating a Top Brand  : ' + error.message + error.stack);
    }
}

// Service to Get All Cuisines
export const getTopBrandsService = async() => {
    try{
        const topBrands = await prisma.topBrand.findMany();
        return topBrands;
    }
    catch(error){
        throw new Error('Error Getting Top Brands : ' + error.message + error.stack);
    }
}