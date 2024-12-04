import express from 'express';
import {authenticate} from "../../middlewares/authN_authZ/Authenticate.js";
import {authorize} from "../../middlewares/authN_authZ/Authorize.js";
const router = express.Router();

router.get('/orders/history', authenticate , authorize('VIEW_ORDER_HISTORY') , (req, res) => {
    res.send("Get Order History");
})
router.post('/orders/reorder/:orderId', authenticate , authorize('REORDER_FROM_HISTORY') , (req, res) => {
    res.send("Reorder From Order History");
})

export default router;