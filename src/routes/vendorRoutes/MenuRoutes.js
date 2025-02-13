import express from 'express';
import {authenticate} from "../../middlewares/authN_authZ/Authenticate.js";
import {authorize} from "../../middlewares/authN_authZ/Authorize.js";
import { createMenu, deleteMenu, getAllMenuItems, getAllMenuItemsForARestaurant, getAllMenus, getRestaurantId, updateMenu } from '../../controllers/vendorControllers/menuManagement/MenuControllers.js';
import { validateRequest } from '../../middlewares/dataValidation/ValidateRequestMiddleware.js';
import { createMenuValidation } from '../../utils/validations/vendor/CreateMenuValidation.js';
const router = express.Router();

router.post('/restaurants/:restaurantId/menu' , authenticate , authorize('CREATE_MENU') , validateRequest(createMenuValidation) , createMenu); // If Owner tries to create a new menu -> createMenu will start executing.
router.get('/restaurants/:restaurantId/menus' , getAllMenus); // If Owner tries to get all menus -> getAllMenus will start executing.
router.get('/restaurants/menu/:menuId/menuItems' , getAllMenuItems); // If Owner tries to get all menuItems for a menu -> getAllMenuItems will start executing.
router.get('/restaurants/:restaurantId/menu/menuItems' , getAllMenuItemsForARestaurant); // If Owner tries to get all menuItems for a retaurant -> getAllMenuItemsForARestaurant will start executing.
router.get('/restaurant/:userId' , getRestaurantId); // If Owner tries to get the restaurantId  by userId -> getRestaurantId will start executing.
router.delete('/restaurants/menu/:menuId' , deleteMenu); // If Owner tries to delete an existing menu -> deleteMenu will start executing.
router.put('/restaurants/:restaurantId/menu/:menuId' , updateMenu);

export default router;