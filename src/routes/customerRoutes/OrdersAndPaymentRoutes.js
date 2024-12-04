import express from 'express';
import {authenticate} from "../../middlewares/authN_authZ/Authenticate.js";
import {authorize} from "../../middlewares/authN_authZ/Authorize.js";
const router = express.Router();

router.post('/payment', authenticate , authorize('PLACE_ORDER_AND_PAY') , (req, res) => {
    res.send("Place Order and Pay");
})

export default router;