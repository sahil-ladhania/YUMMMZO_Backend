import express from 'express';
import { getTopBrands } from '../../controllers/customerControllers/topBrandsFeed/topBrandsFeedController.js';
import { createTopBrand } from '../../controllers/internalAdminControllers/miscellaneous/TopBrandsController.js';
import { validateRequest } from '../../middlewares/dataValidation/ValidateRequestMiddleware.js';
import { topBrandValidation } from '../../utils/data validations/admin/TopBrandValidation.js';
const router = express.Router();

router.post('/top-brand' , validateRequest(topBrandValidation) , createTopBrand); // If User tries to create a Top Brand -> createTopBrand will start executing.
router.get('/top-brands' , getTopBrands); // If User tries to get all Top Brands -> getTopBrands will start executing.

export default router;