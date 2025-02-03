import express from 'express';
import {
    changePasswordController,
    loginController,
    logoutController,
    signupController
} from "../../controllers/commonControllers/authN_authZ/AuthController.js";
const router = express.Router();

router.post('/signup' , signupController); // If User tries to signup -> signupController will start executing.
router.post('/login' , loginController); // If User tries to login -> loginController will start executing.
router.put('/change-password' , changePasswordController); // If User tries to change password -> changePasswordController will start executing.
router.post('/logout' , logoutController); // If User tries to logout -> logoutController will start executing.

export default router;