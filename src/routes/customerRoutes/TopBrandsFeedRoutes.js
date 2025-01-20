import express from 'express';
import { getTopBrands } from '../../controllers/customerControllers/topBrandsFeed/topBrandsFeedController.js';
import { createTopBrand } from '../../controllers/internalAdminControllers/miscellaneous/TopBrandsController.js';
const router = express.Router();

router.post('/top-brand' , createTopBrand);
router.get('/top-brands' , getTopBrands);

export default router;