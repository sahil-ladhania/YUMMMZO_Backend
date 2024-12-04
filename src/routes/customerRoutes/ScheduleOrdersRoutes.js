import express from 'express';
import {authenticate} from "../../middlewares/authN_authZ/Authenticate.js";
import {authorize} from "../../middlewares/authN_authZ/Authorize.js";
const router = express.Router();

router.post('/orders/schedule', authenticate , authorize('SCHEDULE_ORDER') , (req, res) => {
    res.send("Schedule Orders");
})

export default router;