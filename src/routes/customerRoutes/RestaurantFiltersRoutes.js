import express from 'express';
import { searchAndSortRestaurants } from '../../controllers/customerControllers/restaurantFilters/RestaurantFiltersControllers.js';
const router = express.Router();

router.get('/restaurants/filter' , searchAndSortRestaurants); 

export default router;