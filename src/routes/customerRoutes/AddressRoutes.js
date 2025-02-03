import express from 'express';
import { createAddress, deleteAAddress, getAAddress, getAllAddresses, updateAAddress } from '../../controllers/customerControllers/addressManagement/addressController.js';
const router = express.Router();

router.post('/user/:userId/address' , createAddress); // If User tries to create a new address -> createAddress will start executing.
router.get('/user/:userId/addresses' , getAllAddresses); // If User tries to get all addresses -> getAllAddresses will start executing.
router.get('/user/:userId/address/:userAddressId' , getAAddress); // If User tries to get a specific address -> getAAddress will start executing.
router.put('/user/:userId/address/:userAddressId' , updateAAddress); // If User tries to update an existing address -> updateAAddress will start executing.
router.delete('/user/:userId/address/:userAddressId' , deleteAAddress); // If User tries to delete an existing address -> deleteAAddress will start executing.

export default router;