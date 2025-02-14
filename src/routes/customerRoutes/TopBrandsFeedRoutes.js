import express from 'express';
import { getTopBrands } from '../../controllers/customerControllers/topBrandsFeed/topBrandsFeedController.js';
import { createTopBrand } from '../../controllers/internalAdminControllers/miscellaneous/TopBrandsController.js';
import { validateRequest } from '../../middlewares/dataValidation/ValidateRequestMiddleware.js';
import { topBrandValidation } from '../../utils/data validations/admin/TopBrandValidation.js';
const router = express.Router();

router.post('/top-brand' , validateRequest(topBrandValidation) , createTopBrand); 
router.get('/top-brands' , getTopBrands); 

export default router;