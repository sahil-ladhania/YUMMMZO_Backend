import express from 'express';
import {authenticate} from "../../middlewares/authN_authZ/Authenticate.js";
import {authorize} from "../../middlewares/authN_authZ/Authorize.js";
const router = express.Router();

router.get('/restaurants/:restaurantId/menu', authenticate , authorize('VIEW_AVAILABLE_MENU_ITEMS') , (req, res) => {
    res.send("Get Menu");
})

export default router;