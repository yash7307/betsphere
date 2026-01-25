const Bet = require('../models/Bet');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

// @desc    Place a new bet
// @route   POST /api/bets
// @access  Private
exports.placeBet = async (req, res) => {
    try {
        const { matchId, matchName, league, teams, selection, market, odds, stake } = req.body;

        // Validate stake amount
        const minBet = parseFloat(process.env.MIN_BET_AMOUNT) || 10;
        const maxBet = parseFloat(process.env.MAX_BET_AMOUNT) || 100000;

        if (stake < minBet || stake > maxBet) {
            return res.status(400).json({
                success: false,
                message: `Stake must be between ₹${minBet} and ₹${maxBet}`
            });
        }

        // Check user balance
        const user = await User.findById(req.user.id);
        if (user.balance < stake) {
            return res.status(400).json({
                success: false,
                message: 'Insufficient balance'
            });
        }

        // Create bet
        const bet = await Bet.create({
            user: req.user.id,
            match: {
                matchId,
                name: matchName,
                league,
                teams
            },
            selection,
            market,
            odds,
            stake
        });

        // Deduct stake from user balance
        await user.updateBalance(stake, 'subtract');

        // Create transaction record
        await Transaction.create({
            user: req.user.id,
            type: 'bet_placed',
            amount: stake,
            balanceBefore: user.balance + stake,
            balanceAfter: user.balance,
            status: 'completed',
            bet: bet._id,
            description: `Bet placed on ${matchName} - ${selection}`,
            processedAt: new Date()
        });

        res.status(201).json({
            success: true,
            message: 'Bet placed successfully',
            bet,
            balance: user.balance
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get user's bets
// @route   GET /api/bets
// @access  Private
exports.getUserBets = async (req, res) => {
    try {
        const { status, limit = 50, page = 1 } = req.query;

        const query = { user: req.user.id };
        if (status) {
            if (status === 'active') {
                query.status = { $in: ['open', 'pending'] };
            } else if (status === 'settled') {
                query.status = { $in: ['won', 'lost'] };
            } else {
                query.status = status;
            }
        }

        const bets = await Bet.find(query)
            .sort({ placedAt: -1 })
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit));

        const total = await Bet.countDocuments(query);

        res.status(200).json({
            success: true,
            count: bets.length,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit),
            bets
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get single bet
// @route   GET /api/bets/:id
// @access  Private
exports.getBet = async (req, res) => {
    try {
        const bet = await Bet.findById(req.params.id);

        if (!bet) {
            return res.status(404).json({
                success: false,
                message: 'Bet not found'
            });
        }

        // Make sure user is bet owner or admin
        if (bet.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to access this bet'
            });
        }

        res.status(200).json({
            success: true,
            bet
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Cash out bet
// @route   POST /api/bets/:id/cashout
// @access  Private
exports.cashOutBet = async (req, res) => {
    try {
        const bet = await Bet.findById(req.params.id);

        if (!bet) {
            return res.status(404).json({
                success: false,
                message: 'Bet not found'
            });
        }

        // Make sure user is bet owner
        if (bet.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized'
            });
        }

        // Cash out bet
        await bet.cashOutBet();

        // Create transaction record
        const user = await User.findById(req.user.id);
        await Transaction.create({
            user: req.user.id,
            type: 'cash_out',
            amount: bet.cashOut.value,
            balanceBefore: user.balance - bet.cashOut.value,
            balanceAfter: user.balance,
            status: 'completed',
            bet: bet._id,
            description: `Cashed out bet on ${bet.match.name}`,
            processedAt: new Date()
        });

        res.status(200).json({
            success: true,
            message: 'Bet cashed out successfully',
            bet,
            balance: user.balance
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get user betting statistics
// @route   GET /api/bets/stats
// @access  Private
exports.getBettingStats = async (req, res) => {
    try {
        const stats = await Bet.getUserStats(req.user.id);

        res.status(200).json({
            success: true,
            stats
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
