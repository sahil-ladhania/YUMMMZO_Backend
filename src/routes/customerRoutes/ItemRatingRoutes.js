import express from 'express';
import {authenticate} from "../../middlewares/authN_authZ/Authenticate.js";
import {authorize} from "../../middlewares/authN_authZ/Authorize.js";
const router = express.Router();

router.post('/restaurants/:restaurantId/menu/:itemId/rate', authenticate , authorize('RATE_MENU_ITEM') , (req, res) => {
    res.send("Rate an Item");
})

export default router;