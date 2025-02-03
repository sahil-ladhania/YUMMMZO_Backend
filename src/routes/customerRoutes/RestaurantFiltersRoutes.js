import express from 'express';
import { searchAndSortRestaurants } from '../../controllers/customerControllers/restaurantFilters/RestaurantFiltersControllers.js';
const router = express.Router();

router.get('/restaurants/filter' , searchAndSortRestaurants); // If User tries to search or sort restaurants -> searchAndSortRestaurants will start executing.

export default router;