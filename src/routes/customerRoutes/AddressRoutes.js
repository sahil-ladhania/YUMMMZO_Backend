import express from 'express';
import { createAddress, deleteAAddress, getAAddress, getAllAddresses, updateAAddress } from '../../controllers/customerControllers/addressManagement/addressController.js';
import { validateRequest } from '../../middlewares/dataValidation/ValidateRequestMiddleware.js';
import { createAddressValidation } from '../../utils/data validations/customer/CreateAddressValidation.js';
import { updateAddressValidation } from '../../utils/data validations/customer/UpdateAddressValidation.js';
const router = express.Router();

router.post('/user/:userId/address' , validateRequest(createAddressValidation) , createAddress);
router.get('/user/:userId/addresses' , getAllAddresses); 
router.get('/user/:userId/address/:userAddressId' , getAAddress); 
router.put('/user/:userId/address/:userAddressId' , validateRequest(updateAddressValidation) , updateAAddress); 
router.delete('/user/:userId/address/:userAddressId' , deleteAAddress); 

export default router;