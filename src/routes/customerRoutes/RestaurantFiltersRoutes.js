import express from 'express';
import {authenticate} from "../../middlewares/authN_authZ/Authenticate.js";
import {authorize} from "../../middlewares/authN_authZ/Authorize.js";
const router = express.Router();

router.get('/restaurants/filters', authenticate , authorize('FILTER_RESTAURANTS') , (req, res) => {
    res.send("Filtering Restaurants");
})

export default router;