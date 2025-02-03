import prisma from "../../../config/DB.js";


// Service For Checking if a Menu Exist
export const checkMenuExistance = async ({ menuName , restaurantId }) => {
    try{
        const ifMenuExist = await prisma.menu.findUnique({ // Will get menu object or null in the ifMenuExist Variable -> Prisma will find a specific menu from Menu Table and return it.
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
        const newMenu = await prisma.menu.create({ // Will get new menu in the newMenu Variable -> Prisma will create a new menu and insert it in the Menu Table and return it.
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
        const newMenuitems = await prisma.menuItem.createMany({ // Will get new menuItems in the formattedMenuItems Variable -> Prisma will create many new menuItems for a specific menu and insert it in the MenuItem Table and return it.
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
        const restaurantMenusList = await prisma.menu.findMany({ // Will get all menu in the restaurantMenusList Variable -> Prisma will find all menus from Menu Table and return it.
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
        const menuItemsList = await prisma.menuItem.findMany({ // Will get all menuItems in the menuItemsList Variable -> Prisma will find all menuItems for a specific menu from MenuItem Table and return it.
            where : { menuId }
        })
        return menuItemsList;
    } 
    catch(error){
        throw new Error('Error Getting All MenuItems of a Menu For a Restaurant : ' + error.message + error.stack);
    }
};

// Service For Getting all MenuItems
export const getAllMenuItemsForARestaurantService = async ({ restaurantId }) => {
    try {
        const menuItems = await prisma.menuItem.findMany({ // Will get all menuItems in the menuItems Variable -> Prisma will find all menuItems for a specific restaurant from MenuItem Table and return it.
            where: {
                menu: {
                    restaurantId: restaurantId,
                },
            },
        });
        return menuItems;
    } catch (error) {
        throw new Error('Error retrieving menu items: ' + error.message);
    }
};

// Service For Deleting a Specific Menu with MenuItems
export const deleteMenuService = async ({ menuId }) => {
    try{
        const deletedMenu = await prisma.menu.delete({ // Will get deleted menu in the deletedMenu Variable -> Prisma will delete a specific menu from Menu Table and return it.
            where : { menuId }
        })
        return deletedMenu;
    } 
    catch(error){
        throw new Error('Error Deleting a Menu For a Restaurant : ' + error.message + error.stack);
    }
};

// Service For Getting a Restaurant ID for a User
export const getRestaurantIdService = async ({ userId }) => {
    try{
        const restaurantId = await prisma.restaurant.findFirst({ // Will get a restaurantId in the restaurantId Variable -> Prisma will find a specific restaurantId for a specific restaurant from Restaurant Table and return it.
            where : { userId }
        })
        return restaurantId;
    }
    catch(error){
        throw new Error('Error Getting a Restaurant Id For a User : ' + error.message + error.stack);
    }
};


// Service For Updating a Specific Menu with MenuItems
export const updateMenuService = async () => {
    
};