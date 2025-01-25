import prisma from "../../../config/DB.js";
import { checkMenuExistance, createAMenuService, createMenuItemsService, deleteMenuService, getAllMenuItemsForARestaurantService, getAllMenuItemsService, getAllMenusService, getRestaurantIdService } from "../../../services/vendorServices/menuServices/MenuServices.js";


// Controller For Creating a Menu with MenuItems
export const createMenu = async (req , res , next) => {
    try{
        console.log("Hi From Create Menu...");
        const { menuName , description , isActive , menuItems } = req.body;
        const { restaurantId } = req.params;
        if(!menuName || !description || isActive === undefined || menuItems.length < 1){
            return res.status(400).send({
                message : "Please fill all required fields..."
            })
        }
        const ifMenuExist = await checkMenuExistance({ menuName , restaurantId });
        if(!ifMenuExist){
            const createdMenuData = await prisma.$transaction(async (prisma) => {
                const createdMenu = await createAMenuService({ menuName , description , isActive , restaurantId });
                const currentMenuId = createdMenu.menuId;
                const createdMenuItems = await createMenuItemsService({ currentMenuId , menuItems });
                return {createdMenu , createdMenuItems};
            })
            return res.status(201).send({
                message: "Menu Created Successfully...",
                menu: createdMenuData.createdMenu,
                menuItems: createdMenuData.createdMenuItems,
            });
        }
        else{
            return res.status(400).send({
                message : "Menu with this Name Already Exist..."
            })
        }
    }
    catch(error){
        next(error);
    }
};


// Controller For Getting all Menus
export const getAllMenus = async (req , res , next) => {
    try{
        const { restaurantId } = req.params;
        const restaurantId_INT = parseInt(restaurantId);
        const restaurantMenus = await getAllMenusService({ restaurantId: restaurantId_INT });
        return res.status(200).send({
            message: "Restaurant Menus Retrieved Successfully...",
            restaurantMenus : restaurantMenus
        });
    }
    catch(error){
        next(error);
    }
};


// Controller For Getting all MenuItems
export const getAllMenuItems = async (req , res , next) => {
    try{
        const { menuId } = req.params;
        const menuId_INT = parseInt(menuId);
        const menuItems = await getAllMenuItemsService({ menuId: menuId_INT });
        return res.status(200).send({
            message: "MenuItems Retrieved Successfully...",
            menuItems : menuItems
        });
    }
    catch(error){
        next(error);
    }
};

// Controller For Getting all MenuItems For a Restaurant
export const getAllMenuItemsForARestaurant = async (req , res , next) => {
    try{
        const { restaurantId } = req.params;
        const restaurantId_INT = parseInt(restaurantId);
        const restaurantMenuItems = await getAllMenuItemsForARestaurantService({ restaurantId: restaurantId_INT });
        return res.status(200).send({
            message: "MenuItems For A Restaurant Retrieved Successfully...",
            restaurant_menuItems : restaurantMenuItems
        });
    }
    catch(error){
        next(error);
    }
};

// Controller For Deleting a Specific Menu with MenuItems
export const deleteMenu = async (req , res , next) => {
    try{
        const { menuId } = req.params;
        const menuId_INT = parseInt(menuId);
        const deletedMenu = await deleteMenuService({ menuId: menuId_INT });
        return res.status(200).send({
            message: "Menu Deleted Successfully...",
            menu : deletedMenu
        });
    }
    catch(error){
        next(error);
    }
};  


// Controller For Getting a Restaurant ID for a User
export const getRestaurantId = async (req , res , next) => {
    try{
        const { userId } = req.params;
        const userId_INT = parseInt(userId);
        const restaurant = await getRestaurantIdService({ userId: userId_INT });
        const restaurantId = restaurant.restaurantId;
        return res.status(200).send({
            message: "Restaurant ID Retrieved Successfully...",
            restaurantId : restaurantId
        });
    }
    catch(error){
        next(error);
    }
};

// Controller For Updating a Specific Menu with MenuItems
export const updateMenu = async (req , res , next) => {
    try{

    }
    catch(error){
        next(error);
    }
};