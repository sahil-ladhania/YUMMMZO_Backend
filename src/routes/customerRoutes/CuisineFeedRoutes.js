import express from 'express';
import { getAllCuisines } from '../../controllers/customerControllers/cuisineFeed/CuisineControllers.js';
const router = express.Router();

router.get('/cuisines' , getAllCuisines); // If user hits this endpoint -> Will Jump to getAllCuisines Controller

export default router;