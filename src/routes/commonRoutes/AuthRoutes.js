import express from 'express';
const router = express.Router();

router.post('/login' , (req, res) => {
    res.send('Login');
});
router.post('/signup' , (req, res) => {
    res.send('Signup');
});
router.post('/logout' , (req, res) => {
    res.send('Logout');
});
router.put('/change-password' , (req, res) => {
    res.send('Change Password');
});

export default router;