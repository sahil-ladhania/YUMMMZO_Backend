import express from 'express';
import {authenticate} from "../../middlewares/authN_authZ/Authenticate.js";
import {authorize} from "../../middlewares/authN_authZ/Authorize.js";
const router = express.Router();

router.post('/cart', authenticate , authorize('ADD_TO_CART') , (req, res) => {
    res.send("Create Cart");
})
router.put('/cart/increment/:itemId', authenticate , authorize('INCREMENT_CART_ITEM') , (req, res) => {
    res.send("Increment Cart");
})
router.put('/cart/decrement/:itemId', authenticate , authorize('DECREMENT_CART_ITEM') , (req, res) => {
    res.send("Decrement Cart");
})
router.get('/cart', authenticate , authorize('VIEW_CART') , (req, res) => {
    res.send("Get Cart");
})

export default router;