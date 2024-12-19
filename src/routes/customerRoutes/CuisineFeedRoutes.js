import express from 'express';
import { getAllCuisines } from '../../controllers/customerControllers/cuisineFeed/CuisineControllers.js';
const router = express.Router();

router.get('/cuisines' , getAllCuisines);

export default router;