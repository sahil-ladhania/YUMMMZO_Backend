import express from 'express';
import {authenticate} from "../../middlewares/authN_authZ/Authenticate.js";
import {authorize} from "../../middlewares/authN_authZ/Authorize.js";
import { searchAndSortMenuItems } from '../../controllers/customerControllers/menuFilters/MenuFiltersControllers.js';
const router = express.Router();

// router.get('/restaurants/:restaurantId/menu/filter', authenticate , authorize('FILTER_MENU_ITEMS'));
router.get('/restaurants/:restaurantId/menu/filter' , searchAndSortMenuItems);

export default router;