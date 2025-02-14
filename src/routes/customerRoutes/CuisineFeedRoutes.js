import express from 'express';
import { getAllCuisines } from '../../controllers/customerControllers/cuisineFeed/CuisineControllers.js';
import { authenticate } from '../../middlewares/authN_authZ/Authenticate.js';
const router = express.Router();

router.get('/cuisines' , getAllCuisines); 

export default router;