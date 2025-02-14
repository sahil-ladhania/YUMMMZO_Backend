import express from 'express';
import { changePasswordController , loginController , logoutController , signupController } from "../../controllers/commonControllers/authN_authZ/AuthController.js";
import { validateRequest } from '../../middlewares/dataValidation/ValidateRequestMiddleware.js';
import { signupSchema } from '../../utils/data validations/common/SignupValidation.js';
import { loginSchema } from '../../utils/data validations/common/LoginValidation.js';
import { changePasswordSchema } from '../../utils/data validations/common/ChangePasswordValidation.js';
const router = express.Router();

router.post('/signup' , validateRequest(signupSchema) , signupController); 
router.post('/login' , validateRequest(loginSchema) , loginController); 
router.put('/change-password' , validateRequest(changePasswordSchema) , changePasswordController); 
router.post('/logout' , logoutController);

export default router;