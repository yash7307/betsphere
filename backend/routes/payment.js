const express = require('express');
const router = express.Router();
const {
    createOrder,
    verifyPayment,
    withdrawRequest,
    getTransactions,
    webhookHandler
} = require('../controllers/paymentController');
const { protect, requireKYC } = require('../middleware/auth');

// Webhook (no auth required, verified by signature)
router.post('/webhook', webhookHandler);

// Protected routes
router.post('/create-order', protect, createOrder);
router.post('/verify', protect, verifyPayment);
router.post('/withdraw', protect, requireKYC, withdrawRequest);
router.get('/transactions', protect, getTransactions);

module.exports = router;
