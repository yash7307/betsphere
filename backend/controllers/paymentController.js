const Razorpay = require('razorpay');
const crypto = require('crypto');
const Transaction = require('../models/Transaction');
const User = require('../models/User');

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// @desc    Create Razorpay order for deposit
// @route   POST /api/payment/create-order
// @access  Private
exports.createOrder = async (req, res) => {
    try {
        const { amount } = req.body;

        // Validate amount
        if (!amount || amount < 100) {
            return res.status(400).json({
                success: false,
                message: 'Minimum deposit amount is ₹100'
            });
        }

        // Create Razorpay order
        const options = {
            amount: amount * 100, // amount in paise
            currency: 'INR',
            receipt: `receipt_${req.user.id}_${Date.now()}`,
            notes: {
                userId: req.user.id.toString(),
                type: 'deposit'
            }
        };

        const order = await razorpay.orders.create(options);

        res.status(200).json({
            success: true,
            order: {
                id: order.id,
                amount: order.amount,
                currency: order.currency
            },
            key: process.env.RAZORPAY_KEY_ID
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Verify Razorpay payment and add balance
// @route   POST /api/payment/verify
// @access  Private
exports.verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        // Generate signature
        const generated_signature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest('hex');

        // Verify signature
        if (generated_signature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: 'Payment verification failed'
            });
        }

        // Fetch payment details from Razorpay
        const payment = await razorpay.payments.fetch(razorpay_payment_id);

        if (payment.status !== 'captured') {
            return res.status(400).json({
                success: false,
                message: 'Payment not captured'
            });
        }

        const amount = payment.amount / 100; // Convert from paise to rupees

        // Create transaction and update balance
        const transaction = await Transaction.createDeposit(req.user.id, amount, {
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
            signature: razorpay_signature
        });

        // Get updated user
        const user = await User.findById(req.user.id);

        res.status(200).json({
            success: true,
            message: `₹${amount} deposited successfully`,
            transaction,
            balance: user.balance
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Request withdrawal
// @route   POST /api/payment/withdraw
// @access  Private (requires KYC)
exports.withdrawRequest = async (req, res) => {
    try {
        const { amount } = req.body;

        const minWithdrawal = parseFloat(process.env.WITHDRAWAL_MIN) || 100;

        // Validate amount
        if (!amount || amount < minWithdrawal) {
            return res.status(400).json({
                success: false,
                message: `Minimum withdrawal amount is ₹${minWithdrawal}`
            });
        }

        // Create withdrawal transaction
        const transaction = await Transaction.createWithdrawal(req.user.id, amount);

        // Get updated user
        const user = await User.findById(req.user.id);

        res.status(200).json({
            success: true,
            message: 'Withdrawal request submitted. Processing within 1-3 business days.',
            transaction,
            balance: user.balance
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get user transactions
// @route   GET /api/payment/transactions
// @access  Private
exports.getTransactions = async (req, res) => {
    try {
        const { type, status, limit = 50, page = 1 } = req.query;

        const query = { user: req.user.id };
        if (type) query.type = type;
        if (status) query.status = status;

        const transactions = await Transaction.find(query)
            .sort({ createdAt: -1 })
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit))
            .populate('bet', 'match.name selection odds');

        const total = await Transaction.countDocuments(query);

        res.status(200).json({
            success: true,
            count: transactions.length,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit),
            transactions
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Razorpay webhook handler
// @route   POST /api/payment/webhook
// @access  Public (but verified by signature)
exports.webhookHandler = async (req, res) => {
    try {
        const signature = req.headers['x-razorpay-signature'];
        const body = JSON.stringify(req.body);

        // Verify webhook signature
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest('hex');

        if (signature !== expectedSignature) {
            return res.status(400).json({ success: false, message: 'Invalid signature' });
        }

        const event = req.body.event;
        const paymentEntity = req.body.payload.payment.entity;

        // Handle different webhook events
        if (event === 'payment.captured') {
            console.log('✅ Payment captured:', paymentEntity.id);
            // Additional processing if needed
        } else if (event === 'payment.failed') {
            console.log('❌ Payment failed:', paymentEntity.id);
            // Handle failed payment
        }

        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Webhook error:', error);
        res.status(500).json({ success: false });
    }
};
