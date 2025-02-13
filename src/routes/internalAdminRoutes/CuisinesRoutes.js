import express from 'express';
import { createCuisine } from '../../controllers/internalAdminControllers/miscellaneous/CuisinesController.js';
import { validateRequest } from '../../middlewares/dataValidation/ValidateRequestMiddleware.js';
import { cuisineSchema } from '../../utils/data validations/admin/CuisineValidation.js';
import { authenticate } from '../../middlewares/authN_authZ/Authenticate.js';
import { authorize } from '../../middlewares/authN_authZ/Authorize.js';
const router = express.Router();

// First Add CREATE_CUISINE in DB and Link it with Admin Role
router.post('/cuisine' , authenticate , authorize('CREATE_CUISINE') , validateRequest(cuisineSchema) , createCuisine); // If Admin tries to create a cuisine -> createCuisine will start executing.

export default router;