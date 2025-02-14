import express from 'express';
import { getAllOpenDays } from '../../controllers/customerControllers/openingDays/OpeningDaysControllers.js';
const router = express.Router();

router.get('/opening-days' , getAllOpenDays);

export default router;