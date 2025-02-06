import express from 'express';
import { createCuisine } from '../../controllers/internalAdminControllers/miscellaneous/CuisinesController.js';
import { validateRequest } from '../../middlewares/dataValidation/ValidateRequestMiddleware.js';
import { cuisineSchema } from '../../utils/validations/admin/CuisineValidation.js';
const router = express.Router();

router.post('/cuisine' , validateRequest(cuisineSchema) , createCuisine); // If Admin tries to create a cuisine -> createCuisine will start executing.

export default router;