import express from 'express';
import {
    changePasswordController,
    loginController,
    signupController
} from "../../controllers/commonControllers/authN_authZ/AuthController.js";
const router = express.Router();

// Depending on the Route User has gone through , that controller will be activated.
router.post('/signup' , signupController); // If user wants to singup and went to /signup route -> We will go inside signupController
router.post('/login' , loginController); // If user wants to login and  went to /login route -> We will go inside loginController
router.put('/change-password' , changePasswordController); // If user wants to change password and  went to /change-password route -> We will go inside changePasswordController

export default router;