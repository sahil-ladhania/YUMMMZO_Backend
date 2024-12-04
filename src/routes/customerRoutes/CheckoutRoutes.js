import express from 'express';
import {authenticate} from "../../middlewares/authN_authZ/Authenticate.js";
import {authorize} from "../../middlewares/authN_authZ/Authorize.js";
const router = express.Router();

router.post('/checkout', authenticate , authorize('CHECKOUT') , (req, res) => {
    res.send("Checking Out");
})

export default router