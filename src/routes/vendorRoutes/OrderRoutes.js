import express from 'express';
import {authenticate} from "../../middlewares/authN_authZ/Authenticate.js";
import {authorize} from "../../middlewares/authN_authZ/Authorize.js";
const router = express.Router();

router.get('/restaurants/:restaurantId/orders', authenticate , authorize('VIEW_ALL_RESTAURANT_ORDERS') , (req, res) => {
    res.send('Get Orders');
})
router.put('/restaurants/:restaurantId/orders/:orderId', authenticate , authorize('UPDATE_ORDER_STATUS_VENDOR') , (req, res) => {
    res.send('Update Order Status');
})

export default router;