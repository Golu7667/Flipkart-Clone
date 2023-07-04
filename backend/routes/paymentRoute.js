const express = require('express');
const { processPayment, verifyPayment, getPaymentStatus } = require('../controllers/paymentController');
const { isAuthenticatedUser } = require('../middlewares/auth');

const router = express.Router();

router.route('/payment/process').post(processPayment);
router.route('/callback').post(verifyPayment);
router.route('/payment/status/:id').get(getPaymentStatus);
// isAuthenticatedUser
module.exports = router;