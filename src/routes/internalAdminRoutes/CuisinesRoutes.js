import express from 'express';
import { createCuisine } from '../../controllers/internalAdminControllers/miscellaneous/CuisinesController.js';
const router = express.Router();

router.post('/cuisine' , createCuisine); // If Admin tries to create a cuisine -> createCuisine will start executing.

export default router;