const DodoPayments = require('dodopayments').default;
const { Webhook } = require('standardwebhooks');
const Transaction = require('../models/Transaction');
const User = require('../models/User');

// Initialize Dodo Payments client
const dodoClient = new DodoPayments({
    bearerToken: process.env.DODO_PAYMENTS_API_KEY,
    environment: process.env.DODO_ENVIRONMENT || 'test_mode'
});

// Initialize webhook verifier
const webhookVerifier = new Webhook(process.env.DODO_WEBHOOK_KEY || 'default_key');

// @desc    Create Dodo checkout session for deposit
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

        // Create Dodo checkout session
        const session = await dodoClient.checkoutSessions.create({
            payment_link: true,
            billing: {
                currency: 'INR',
                amount: amount * 100 // Amount in paise
            },
            customer: {
                email: req.user.email,
                name: req.user.username
            },
            return_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/#profile?payment=success`,
            metadata: {
                userId: req.user.id.toString(),
                type: 'deposit',
                amount: amount.toString()
            }
        });

        res.status(200).json({
            success: true,
            checkoutUrl: session.checkout_url || session.url,
            sessionId: session.id
        });
    } catch (error) {
        console.error('Dodo Payment Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to create payment session'
        });
    }
};

// @desc    Verify payment after redirect (client-side verification)
// @route   POST /api/payment/verify
// @access  Private
exports.verifyPayment = async (req, res) => {
    try {
        const { sessionId, amount } = req.body;

        if (!sessionId || !amount) {
            return res.status(400).json({
                success: false,
                message: 'Session ID and amount are required'
            });
        }

        // Verify the session with Dodo
        const session = await dodoClient.checkoutSessions.retrieve(sessionId);

        if (session.status !== 'complete' && session.status !== 'paid') {
            return res.status(400).json({
                success: false,
                message: 'Payment not completed'
            });
        }

        // Check if transaction already exists
        const existingTxn = await Transaction.findOne({
            'paymentDetails.sessionId': sessionId
        });

        if (existingTxn) {
            return res.status(400).json({
                success: false,
                message: 'Transaction already processed'
            });
        }

        // Create transaction and update balance
        const transaction = await Transaction.createDeposit(req.user.id, amount, {
            sessionId: sessionId,
            provider: 'dodo_payments'
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
        console.error('Payment Verification Error:', error);
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

// @desc    Dodo Payments webhook handler
// @route   POST /api/payment/webhook
// @access  Public (verified by signature)
exports.webhookHandler = async (req, res) => {
    try {
        const rawBody = JSON.stringify(req.body);
        const webhookHeaders = {
            'webhook-id': req.headers['webhook-id'] || '',
            'webhook-signature': req.headers['webhook-signature'] || '',
            'webhook-timestamp': req.headers['webhook-timestamp'] || ''
        };

        // Verify webhook signature
        try {
            await webhookVerifier.verify(rawBody, webhookHeaders);
        } catch (verifyError) {
            console.error('Webhook verification failed:', verifyError);
            return res.status(400).json({ success: false, message: 'Invalid signature' });
        }

        const event = req.body;
        const eventType = event.type || event.event;

        // Handle different webhook events
        if (eventType === 'payment.succeeded' || eventType === 'checkout.completed') {
            console.log('✅ Payment succeeded:', event.data?.id || event.id);

            const metadata = event.data?.metadata || event.metadata;
            if (metadata && metadata.userId && metadata.amount) {
                const userId = metadata.userId;
                const amount = parseFloat(metadata.amount);

                // Check if already processed
                const existing = await Transaction.findOne({
                    'paymentDetails.webhookEventId': event.id
                });

                if (!existing) {
                    await Transaction.createDeposit(userId, amount, {
                        webhookEventId: event.id,
                        provider: 'dodo_payments'
                    });
                    console.log(`✅ Deposit of ₹${amount} processed for user ${userId}`);
                }
            }
        } else if (eventType === 'payment.failed') {
            console.log('❌ Payment failed:', event.data?.id || event.id);
        }

        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Webhook error:', error);
        res.status(500).json({ success: false });
    }
};
