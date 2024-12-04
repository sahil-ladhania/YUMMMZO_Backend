import express from 'express';
import {authenticate} from "../../middlewares/authN_authZ/Authenticate.js";
import {authorize} from "../../middlewares/authN_authZ/Authorize.js";
const router = express.Router();

router.get('/orders/track/:orderId', authenticate , authorize('TRACK_ORDER') , (req, res) => {
    res.send("Track Orders");
})

export default router;