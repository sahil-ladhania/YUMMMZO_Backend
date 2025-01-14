import express from 'express';
import { createCuisine } from '../../controllers/internalAdminControllers/miscellaneous/CuisinesController.js';
const router = express.Router();

router.post('/cuisine' , createCuisine); // If user(Only ADMIN access) will hit this endpoint -> Will Jump to createCuisine Controller

export default router;