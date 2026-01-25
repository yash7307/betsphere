const express = require('express');
const router = express.Router();
const {
    getDashboardStats,
    getAllUsers,
    updateUserStatus,
    settleBet,
    processWithdrawal,
    getPendingWithdrawals
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

// All routes require admin role
router.use(protect);
router.use(authorize('admin'));

// Dashboard& Analytics
router.get('/stats', getDashboardStats);

// User Management
router.get('/users', getAllUsers);
router.put('/users/:id/status', updateUserStatus);

// Bet Management
router.post('/bets/:id/settle', settleBet);

// Withdrawal Management
router.get('/withdrawals/pending', getPendingWithdrawals);
router.post('/withdrawals/:id/process', processWithdrawal);

module.exports = router;
