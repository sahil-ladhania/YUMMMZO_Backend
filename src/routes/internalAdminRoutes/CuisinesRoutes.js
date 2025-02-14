import express from 'express';
import { createCuisine } from '../../controllers/internalAdminControllers/miscellaneous/CuisinesController.js';
import { validateRequest } from '../../middlewares/dataValidation/ValidateRequestMiddleware.js';
import { cuisineSchema } from '../../utils/data validations/admin/CuisineValidation.js';
import { authenticate } from '../../middlewares/authN_authZ/Authenticate.js';
import { authorize } from '../../middlewares/authN_authZ/Authorize.js';
const router = express.Router();

router.post('/cuisine' , authenticate , authorize('CREATE_CUISINE') , validateRequest(cuisineSchema) , createCuisine);

export default router;