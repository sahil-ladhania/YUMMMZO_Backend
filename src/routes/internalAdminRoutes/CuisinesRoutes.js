import express from 'express';
import { createCuisine } from '../../controllers/internalAdminControllers/miscellaneous/CuisinesController.js';
const router = express.Router();

router.post('/cuisine' , createCuisine); 

export default router;