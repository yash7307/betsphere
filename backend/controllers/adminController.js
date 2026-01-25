const User = require('../models/Bet');
const Bet = require('../models/Bet');
const Transaction = require('../models/Transaction');

// @desc    Get admin dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
exports.getDashboardStats = async (req, res) => {
    try {
        // Get total users
        const totalUsers = await User.countDocuments();
        const activeUsers = await User.countDocuments({ status: 'active' });

        // Get betting stats
        const totalBets = await Bet.countDocuments();
        const activeBets = await Bet.countDocuments({ status: { $in: ['open', 'pending'] } });

        // Get financial stats
        const transactions = await Transaction.aggregate([
            {
                $group: {
                    _id: '$type',
                    total: { $sum: '$amount' },
                    count: { $sum: 1 }
                }
            }
        ]);

        // Calculate revenue (deposits - withdrawals)
        let totalDeposits = 0;
        let totalWithdrawals = 0;
        transactions.forEach(t => {
            if (t._id === 'deposit') totalDeposits = t.total;
            if (t._id === 'withdrawal') totalWithdrawals = t.total;
        });

        const revenue = totalDeposits - totalWithdrawals;

        // Recent activity
        const recentBets = await Bet.find()
            .sort({ placedAt: -1 })
            .limit(10)
            .populate('user', 'name email');

        res.status(200).json({
            success: true,
            stats: {
                users: {
                    total: totalUsers,
                    active: activeUsers
                },
                bets: {
                    total: totalBets,
                    active: activeBets
                },
                financial: {
                    totalDeposits,
                    totalWithdrawals,
                    revenue
                }
            },
            recentBets
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
exports.getAllUsers = async (req, res) => {
    try {
        const { page = 1, limit = 50, search, status } = req.query;

        const query = {};
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { phone: { $regex: search, $options: 'i' } }
            ];
        }
        if (status) query.status = status;

        const users = await User.find(query)
            .select('-password')
            .sort({ createdAt: -1 })
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit));

        const total = await User.countDocuments(query);

        res.status(200).json({
            success: true,
            count: users.length,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit),
            users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Update user status
// @route   PUT /api/admin/users/:id/status
// @access  Private/Admin
exports.updateUserStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            message: `User status updated to ${status}`,
            user
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Settle bet
// @route   POST /api/admin/bets/:id/settle
// @access  Private/Admin
exports.settleBet = async (req, res) => {
    try {
        const { won, notes } = req.body;

        const bet = await Bet.findById(req.params.id);
        if (!bet) {
            return res.status(404).json({
                success: false,
                message: 'Bet not found'
            });
        }

        await bet.settleBet(won, req.user.id, notes);

        res.status(200).json({
            success: true,
            message: `Bet settled as ${won ? 'WON' : 'LOST'}`,
            bet
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Process withdrawal
// @route   POST /api/admin/withdrawals/:id/process
// @access  Private/Admin
exports.processWithdrawal = async (req, res) => {
    try {
        const { approved, notes } = req.body;

        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: 'Withdrawal not found'
            });
        }

        await transaction.processWithdrawal(approved, notes);

        res.status(200).json({
            success: true,
            message: `Withdrawal ${approved ? 'approved' : 'rejected'}`,
            transaction
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get pending withdrawals
// @route   GET /api/admin/withdrawals/pending
// @access  Private/Admin
exports.getPendingWithdrawals = async (req, res) => {
    try {
        const withdrawals = await Transaction.find({
            type: 'withdrawal',
            status: 'pending'
        })
            .populate('user', 'name email phone')
            .sort({ createdAt: 1 });

        res.status(200).json({
            success: true,
            count: withdrawals.length,
            withdrawals
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
