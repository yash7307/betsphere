const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['deposit', 'withdrawal', 'bet_placed', 'bet_won', 'bet_lost', 'bet_refund', 'cash_out', 'bonus', 'commission'],
        required: true
    },
    amount: {
        type: Number,
        required: [true, 'Please provide amount'],
        min: [0, 'Amount cannot be negative']
    },
    balanceBefore: {
        type: Number,
        required: true
    },
    balanceAfter: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'cancelled'],
        default: 'pending'
    },
    payment: {
        method: {
            type: String,
            enum: ['razorpay', 'upi', 'card', 'netbanking', 'wallet', 'bank_transfer']
        },
        gateway: String,
        razorpayOrderId: String,
        razorpayPaymentId: String,
        razorpaySignature: String
    },
    bet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bet'
    },
    description: String,
    metadata: {
        ipAddress: String,
        userAgent: String,
        notes: String
    },
    processedAt: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Index for faster queries
transactionSchema.index({ user: 1, createdAt: -1 });
transactionSchema.index({ status: 1 });
transactionSchema.index({ type: 1 });

// Static method to create deposit transaction
transactionSchema.statics.createDeposit = async function (userId, amount, paymentDetails) {
    const User = mongoose.model('User');
    const user = await User.findById(userId);

    const transaction = await this.create({
        user: userId,
        type: 'deposit',
        amount: amount,
        balanceBefore: user.balance,
        balanceAfter: user.balance + amount,
        status: 'completed',
        payment: {
            method: 'razorpay',
            gateway: 'Razorpay',
            razorpayOrderId: paymentDetails.orderId,
            razorpayPaymentId: paymentDetails.paymentId,
            razorpaySignature: paymentDetails.signature
        },
        description: `Deposit of ₹${amount} via Razorpay`,
        processedAt: new Date()
    });

    // Update user balance
    await user.updateBalance(amount, 'add');

    return transaction;
};

// Static method to create withdrawal transaction
transactionSchema.statics.createWithdrawal = async function (userId, amount) {
    const User = mongoose.model('User');
    const user = await User.findById(userId);

    if (user.balance < amount) {
        throw new Error('Insufficient balance');
    }

    const transaction = await this.create({
        user: userId,
        type: 'withdrawal',
        amount: amount,
        balanceBefore: user.balance,
        balanceAfter: user.balance - amount,
        status: 'pending',
        payment: {
            method: 'bank_transfer'
        },
        description: `Withdrawal request for ₹${amount}`
    });

    // Deduct from user balance
    await user.updateBalance(amount, 'subtract');

    return transaction;
};

// Method to approve/reject withdrawal
transactionSchema.methods.processWithdrawal = async function (approved, notes = '') {
    if (this.type !== 'withdrawal') {
        throw new Error('Not a withdrawal transaction');
    }

    if (approved) {
        this.status = 'completed';
        this.processedAt = new Date();
        this.metadata = { ...this.metadata, notes: notes };
    } else {
        this.status = 'failed';
        this.processedAt = new Date();
        this.metadata = { ...this.metadata, notes: notes };

        // Refund to user balance
        const User = mongoose.model('User');
        const user = await User.findById(this.user);
        await user.updateBalance(this.amount, 'add');
    }

    await this.save();
    return this;
};

module.exports = mongoose.model('Transaction', transactionSchema);
