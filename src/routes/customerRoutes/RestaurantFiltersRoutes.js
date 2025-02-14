import express from 'express';
import { searchAndSortRestaurants } from '../../controllers/customerControllers/restaurantFilters/RestaurantFiltersControllers.js';
import { authenticate } from '../../middlewares/authN_authZ/Authenticate.js';
import { authorize } from '../../middlewares/authN_authZ/Authorize.js';
const router = express.Router();

router.get('/restaurants/filter' , authenticate , authorize('FILTER_RESTAURANTS') , searchAndSortRestaurants); 

export default router;