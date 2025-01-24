import prisma from "../../../config/DB.js";

export const searchAndSortMenuItemsService = async ({ restaurantId , sortingCriteria }) => {
    try {
        const {search , veg , availability , sort_by_price , sort_by_category} = sortingCriteria;
        let where = {
            menu : {
                restaurantId : restaurantId
            },
        };
        if(search){
            where.itemName = {
                contains : search,
            }  
        }
        if(veg){
            where.isPureVeg = true;
        }
        if(sort_by_category){
            where.itemCategory = sort_by_category;
        }
        let orderBy = {};
        if(sort_by_price){
            if(sort_by_price === "Cost:Low-High"){
                orderBy = {
                    itemPrice : 'asc'
                }
            }
            if(sort_by_price === "Cost:High-Low"){
                orderBy = {
                    itemPrice : 'desc'
                }
            }
        }
        const menuItems = await prisma.menuItem.findMany({
            where,
            orderBy,
            include : {
                menu : {
                    select : {
                        menuName : true
                    }
                }
            }
        })
        return menuItems;
    } 
    catch(error){
        throw new Error('Error Searching and Sorting Menu Items  : ' + error.message + error.stack);
    }
};
