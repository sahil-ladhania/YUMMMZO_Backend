import express from 'express';
import {
    changePasswordController,
    loginController,
    logoutController,
    signupController
} from "../../controllers/commonControllers/authN_authZ/AuthController.js";
import { validateRequest } from '../../middlewares/dataValidation/ValidateRequestMiddleware.js';
import { signupSchema } from '../../utils/validations/common/SignupValidation.js';
import { loginSchema } from '../../utils/validations/common/LoginValidation.js';
import { changePasswordSchema } from '../../utils/validations/common/ChangePasswordValidation.js';
const router = express.Router();

router.post('/signup' , validateRequest(signupSchema) , signupController); // If User tries to signup -> signupController will start executing.
router.post('/login' , validateRequest(loginSchema) , loginController); // If User tries to login -> loginController will start executing.
router.put('/change-password' , validateRequest(changePasswordSchema) , changePasswordController); // If User tries to change password -> changePasswordController will start executing.
router.post('/logout' , logoutController); // If User tries to logout -> logoutController will start executing.

export default router;