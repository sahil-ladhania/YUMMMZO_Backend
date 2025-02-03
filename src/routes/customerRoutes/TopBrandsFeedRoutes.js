import express from 'express';
import { getTopBrands } from '../../controllers/customerControllers/topBrandsFeed/topBrandsFeedController.js';
import { createTopBrand } from '../../controllers/internalAdminControllers/miscellaneous/TopBrandsController.js';
const router = express.Router();

router.post('/top-brand' , createTopBrand); // If User tries to create a Top Brand -> createTopBrand will start executing.
router.get('/top-brands' , getTopBrands); // If User tries to get all Top Brands -> getTopBrands will start executing.

export default router;