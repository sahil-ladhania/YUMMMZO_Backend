import express from 'express';
import { getAllCuisines } from '../../controllers/customerControllers/cuisineFeed/CuisineControllers.js';
const router = express.Router();

router.get('/cuisines' , getAllCuisines); // If User tries to get all Cuisines -> getAllCuisines will start executing.

export default router;