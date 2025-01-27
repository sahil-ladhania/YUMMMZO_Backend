import express from 'express';
import { createAddress, deleteAAddress, getAAddress, getAllAddresses, updateAAddress } from '../../controllers/customerControllers/addressManagement/addressController.js';
const router = express.Router();

router.post('/user/:userId/address' , createAddress);
router.get('/user/:userId/addresses' , getAllAddresses); 
router.get('/user/:userId/address/:userAddressId' , getAAddress);
router.put('/user/:userId/address/:userAddressId' , updateAAddress); 
router.delete('/user/:userId/address/:userAddressId' , deleteAAddress); 

export default router;