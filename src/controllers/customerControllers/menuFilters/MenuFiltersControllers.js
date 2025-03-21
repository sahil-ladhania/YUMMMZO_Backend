import { searchAndSortMenuItemsService } from "../../../services/customerServices/menuFiltersServices/MenuFiltersServices.js";

// Controller To Search and Filter Menu Items
export const searchAndSortMenuItems = async (req , res , next) => {
    try {
        const { restaurantId } = req.params;
        const restaurantId_INT = parseInt(restaurantId);
        const { search , veg , availability , sort_by_price , sort_by_category } = req.query;
        let sortingCriteria = {};
        if(search){
            sortingCriteria.search = search;
        }
        if(veg){
            sortingCriteria.veg = veg;
        }
        if(availability){
            sortingCriteria.availability = availability;
        }
        if(sort_by_price){
            sortingCriteria.sort_by_price = sort_by_price;
        }
        if(sort_by_category){
            sortingCriteria.sort_by_category = sort_by_category;
        }
        const filteredMenuItems = await searchAndSortMenuItemsService({ restaurantId: restaurantId_INT , sortingCriteria }); 
        return res.status(200).send({  
            message : "Filtered Menu Items Successfully Retrieved...",
            filteredMenuItems : filteredMenuItems
        })
    } 
    catch(error){
        next(error);        
    }
};
