import express from 'express';
import {authenticate} from "../../middlewares/authN_authZ/Authenticate.js";
import {authorize} from "../../middlewares/authN_authZ/Authorize.js";
import { createMenu, deleteMenu, getAllMenuItems, getAllMenuItemsForARestaurant, getAllMenus, getRestaurantId, updateMenu } from '../../controllers/vendorControllers/menuManagement/MenuControllers.js';
const router = express.Router();

// router.post('/restaurants/:restaurantId/menu' , authenticate , authorize('CREATE_MENU'));
// router.put('/restaurants/:restaurantId/menu/:itemId' , authenticate , authorize('UPDATE_MENU_ITEM'));
// router.delete('/restaurants/:restaurantId/menu/:itemId' , authenticate , authorize('DELETE_MENU_ITEM'));

router.post('/restaurants/:restaurantId/menu' , createMenu);
router.get('/restaurants/:restaurantId/menus' , getAllMenus);
router.get('/restaurants/menu/:menuId/menuItems' , getAllMenuItems); 
router.get('/restaurants/:restaurantId/menu/menuItems' , getAllMenuItemsForARestaurant); 
router.get('/restaurant/:userId' , getRestaurantId); 
router.delete('/restaurants/menu/:menuId' , deleteMenu);
router.put('/restaurants/:restaurantId/menu/:menuId' , updateMenu);

export default router;