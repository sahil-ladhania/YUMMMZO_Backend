

// Controller For Creating a Menu with MenuItems
export const createMenu = async (req , res , next) => {
    /*
        Logic :
        1. Get the data from body.
        2. Check if all the feilds are filled.
        3. Check if the Menu user wants to create exits or not -> Call a Service to Check -> Will return a MenuObject or null.
        4. If returns a Menu Object -> Send response that you cant create a Menu with the same name and the menu already exist.
        5. Else start creating a Menu :
            5.1. First collect all Menu related data like - menuName , description , isActive.
            5.2. Start the Transaction.
            5.3. Save the Menu with these details in DB -> Call a Service to Create record for Menu in Menu Table -> Will return a new MenuObject or null.
            5.4. Get the menuId that is being created.
            5.5. Related all the MenuItems with this menuId and save it in DB -> Call a Service to Create multiple records in MenuItems Table -> Will return an array of objects or null.
            5.6. Commit the Transaction after success.
            5.7. Send a Response to User with message and Menu Details.
    */
   console.log("Hi From Create Menu...");
};


// Controller For Getting all Menus
export const getAllMenus = async (req , res , next) => {
    
};

// Controller For Getting a Specific Menu
export const getAMenu = async (req , res , next) => {
    
};

// Controller For Getting all MenuItems
export const getAllMenuItems = async (req , res , next) => {
    
};

// Controller For Getting a Specific MenuItem
export const getAMenuItem = async (req , res , next) => {
    
};

// Controller For Updating a Specific Menu with MenuItems
export const updateMenu = async (req , res , next) => {
    
};

// Controller For Deleting a Specific Menu with MenuItems
export const deleteMenu = async (req , res , next) => {
    
};