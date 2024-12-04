import express from 'express';
import {authenticate} from "../../middlewares/authN_authZ/Authenticate.js";
import {authorize} from "../../middlewares/authN_authZ/Authorize.js";
const router = express.Router();

router.get('/restaurants/:restaurantId/menu?filter=criteria', authenticate , authorize('FILTER_MENU_ITEMS') , (req, res) => {
    res.send("Filtering Menu");
})

export default router;