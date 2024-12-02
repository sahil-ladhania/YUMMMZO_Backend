import express from 'express';
import {
    changePasswordController,
    loginController,
    signupController
} from "../../controllers/commonControllers/authN_authZ/AuthController.js";
const router = express.Router();

router.post('/signup' , signupController);
router.post('/login' , loginController);
router.put('/change-password' , changePasswordController);

export default router;