import express from 'express';
import {authenticate} from "../../middlewares/authN_authZ/Authenticate.js";
import {authorize} from "../../middlewares/authN_authZ/Authorize.js";
const router  = express.Router();

router.get('/delivery/orders', authenticate , authorize('VIEW_ACTIVE_ORDERS') , (req, res) => {
    res.send('Check Orders');
})
router.put('/delivery/orders/:orderId/accept', authenticate , authorize('ACCEPT_ACTIVE_ORDER') , (req, res) => {
    res.send('Accept Orders');
})
router.put('/delivery/orders/:orderId/reject', authenticate , authorize('REJECT_ACTIVE_ORDER') , (req, res) => {
    res.send('Reject Orders');
})
router.put('/delivery/orders/:orderId/status', authenticate , authorize('UPDATE_ORDER_STATUS_COURIER') , (req, res) => {
    res.send('Update Order Status');
})
router.get('/delivery/history', authenticate , authorize('VIEW_DELIVERY_HISTORY') , (req, res) => {
    res.send('Check Delivery History');
})

export default router ;