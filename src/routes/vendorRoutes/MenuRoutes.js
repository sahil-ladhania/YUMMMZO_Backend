import express from 'express';
import {authenticate} from "../../middlewares/authN_authZ/Authenticate.js";
import {authorize} from "../../middlewares/authN_authZ/Authorize.js";
const router = express.Router();

router.post('/restaurants/:restaurantId/menu' , authenticate , authorize('CREATE_MENU') , (req, res) => {
    res.send('Create Menu');
})
router.put('/restaurants/:restaurantId/menu/:itemId' , authenticate , authorize('UPDATE_MENU_ITEM') , (req, res) => {
    res.send('Update Menu');
})
router.delete('/restaurants/:restaurantId/menu/:itemId' , authenticate , authorize('DELETE_MENU_ITEM') , (req, res) => {
    res.send('Delete Menu');
})

export default router;