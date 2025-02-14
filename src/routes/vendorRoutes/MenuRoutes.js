import express from 'express';
import {authenticate} from "../../middlewares/authN_authZ/Authenticate.js";
import {authorize} from "../../middlewares/authN_authZ/Authorize.js";
import { createMenu, deleteMenu, getAllMenuItems, getAllMenuItemsForARestaurant, getAllMenus, getRestaurantId, updateMenu } from '../../controllers/vendorControllers/menuManagement/MenuControllers.js';
import { validateRequest } from '../../middlewares/dataValidation/ValidateRequestMiddleware.js';
import { createMenuValidation } from '../../utils/data validations/vendor/CreateMenuValidation.js';
const router = express.Router();

router.post('/restaurants/:restaurantId/menu' , authenticate , authorize('CREATE_MENU') , validateRequest(createMenuValidation) , createMenu); 
router.get('/restaurants/:restaurantId/menus' , getAllMenus); 
router.get('/restaurants/menu/:menuId/menuItems' , getAllMenuItems); 
router.get('/restaurants/:restaurantId/menu/menuItems' , getAllMenuItemsForARestaurant); 
router.get('/restaurant/:userId' , getRestaurantId); 
router.delete('/restaurants/menu/:menuId' , deleteMenu); 
router.put('/restaurants/:restaurantId/menu/:menuId' , updateMenu);

export default router;