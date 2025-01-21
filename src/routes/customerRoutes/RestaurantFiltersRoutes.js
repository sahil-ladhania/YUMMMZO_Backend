import express from 'express';
import { searchAndSortRestaurants } from '../../controllers/customerControllers/restaurantFilters/RestaurantFiltersControllers.js';
const router = express.Router();

router.get('/restaurants/filter' , searchAndSortRestaurants); // Agr user iss endpoint pe hit kia -> to searchAndSortRestaurants Controller run hoga

export default router;