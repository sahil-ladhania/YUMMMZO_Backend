import express from 'express';
const router  = express.Router();

router.get('/delivery/orders', (req, res) => {
    res.send('Check Orders');
})
router.put('/delivery/orders/:orderId/accept', (req, res) => {
    res.send('Accept Orders');
})
router.put('/delivery/orders/:orderId/reject', (req, res) => {
    res.send('Reject Orders');
})
router.put('/delivery/orders/:orderId/status', (req, res) => {
    res.send('Update Order Status');
})
router.get('/delivery/history', (req, res) => {
    res.send('Check Delivery History');
})

export default router ;