import express from 'express';
import { getAllOpenDays } from '../../controllers/customerControllers/openingDays/OpeningDaysControllers.js';
const router = express.Router();

router.get('/opening-days' , getAllOpenDays); // If User tries to get all opening Days -> getAllOpenDays will start executing.

export default router;