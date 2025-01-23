import prisma from "../../../config/DB.js";


// Service For Checking if a Menu Exist
export const checkMenuExistance = async ({ menuName , restaurantId }) => {
    try{
        const ifMenuExist = await prisma.menu.findUnique({
            where : { 
                restaurantId_menuName : {
                    restaurantId : parseInt(restaurantId),
                    menuName : menuName
                }
             }
        })
        return ifMenuExist;
    }
    catch(error){
        throw new Error('Error Checking Menu Existence : ' + error.message + error.stack);
    }
};

// Service For Creating a Menu with MenuItems
export const createAMenuService = async ({ menuName , description , isActive , restaurantId }) => {
    try{
        const newMenu = await prisma.menu.create({
            data : {
                restaurantId : parseInt(restaurantId),
                menuName,
                description,
                isActive
            }
        });
        return newMenu;
    }
    catch(error){
        throw new Error('Error Creating New Menu : ' + error.message + error.stack);
    }
};

// Service For Creating MenuItems for a Menu
export const createMenuItemsService = async ({ currentMenuId , menuItems }) => {
    try{
        const formattedMenuItems = menuItems.map((menuItem) => ({
            menuId: currentMenuId,
            itemName: menuItem.itemName,
            itemPrice: menuItem.itemPrice,
            quantity: menuItem.quantity,
            itemDescription: menuItem.itemDescription,
            isPureVeg: menuItem.isPureVeg,
            isBestSeller: menuItem.isBestSeller,
            itemImage: menuItem.itemImage,
            itemCategory: menuItem.itemCategory
        }))
        const newMenuitems = await prisma.menuItem.createMany({
            data : formattedMenuItems
        })
        return newMenuitems;
    }
    catch(error){
        throw new Error('Error Creating New MenuItems : ' + error.message + error.stack);
    }
};


// Service For Getting all Menus
export const getAllMenusService = async ({ restaurantId }) => {
    try{    
        const restaurantMenusList = await prisma.menu.findMany({
            where : {restaurantId}
        })
        return restaurantMenusList;
    }
    catch(error){
        throw new Error('Error Getting All Menus For a Restaurant : ' + error.message + error.stack);
    }
};

// Service For Getting all MenuItems
export const getAllMenuItemsService = async ({ menuId }) => {
    try{
        const menuItemsList = await prisma.menuItem.findMany({
            where : { menuId }
        })
        return menuItemsList;
    } 
    catch(error){
        throw new Error('Error Getting All MenuItems of a Menu For a Restaurant : ' + error.message + error.stack);
    }
};

// Service For Deleting a Specific Menu with MenuItems
export const deleteMenuService = async ({ menuId }) => {
    try{
        const deletedMenu = await prisma.menu.delete({
            where : { menuId }
        })
        return deletedMenu;
    } 
    catch(error){
        throw new Error('Error Deleting a Menu For a Restaurant : ' + error.message + error.stack);
    }
};

// Service For Updating a Specific Menu with MenuItems
export const updateMenuService = async () => {
    
};
