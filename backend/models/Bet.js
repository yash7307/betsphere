const mongoose = require('mongoose');

const betSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    match: {
        matchId: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        league: String,
        teams: {
            home: String,
            away: String
        }
    },
    selection: {
        type: String,
        required: [true, 'Please provide a selection']
    },
    market: {
        type: String,
        required: true,
        enum: ['match_winner', 'session_runs', 'top_batsman', 'top_bowler', 'total_runs', 'over_under']
    },
    odds: {
        type: Number,
        required: [true, 'Please provide odds'],
        min: [1.01, 'Odds must be at least 1.01']
    },
    stake: {
        type: Number,
        required: [true, 'Please provide stake amount'],
        min: [10, 'Minimum stake is ₹10'],
        max: [100000, 'Maximum stake is ₹100,000']
    },
    potentialReturn: {
        type: Number,
        required: true
    },
    actualReturn: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['open', 'pending', 'won', 'lost', 'void', 'cashed_out'],
        default: 'open'
    },
    cashOut: {
        available: {
            type: Boolean,
            default: false
        },
        value: {
            type: Number,
            default: 0
        },
        cashedOutAt: Date
    },
    result: {
        won: Boolean,
        settledAt: Date,
        settledBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        notes: String
    },
    placedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Calculate potential return before saving
betSchema.pre('save', function (next) {
    if (this.isModified('stake') || this.isModified('odds')) {
        this.potentialReturn = this.stake * this.odds;
    }
    next();
});

// Static method to get user's active bets
betSchema.statics.getActiveBets = function (userId) {
    return this.find({
        user: userId,
        status: { $in: ['open', 'pending'] }
    }).sort({ placedAt: -1 });
};

// Static method to get user's betting statistics
betSchema.statics.getUserStats = async function (userId) {
    const stats = await this.aggregate([
        { $match: { user: mongoose.Types.ObjectId(userId) } },
        {
            $group: {
                _id: null,
                totalBets: { $sum: 1 },
                totalStaked: { $sum: '$stake' },
                totalWon: {
                    $sum: {
                        $cond: [{ $eq: ['$status', 'won'] }, '$actualReturn', 0]
                    }
                },
                wins: {
                    $sum: {
                        $cond: [{ $eq: ['$status', 'won'] }, 1, 0]
                    }
                },
                losses: {
                    $sum: {
                        $cond: [{ $eq: ['$status', 'lost'] }, 1, 0]
                    }
                },
                openBets: {
                    $sum: {
                        $cond: [{ $in: ['$status', ['open', 'pending']] }, 1, 0]
                    }
                }
            }
        }
    ]);

    if (stats.length === 0) {
        return {
            totalBets: 0,
            totalStaked: 0,
            totalWon: 0,
            wins: 0,
            losses: 0,
            openBets: 0,
            profitLoss: 0,
            winRate: 0
        };
    }

    const result = stats[0];
    result.profitLoss = result.totalWon - result.totalStaked;
    result.winRate = result.totalBets > 0 ? (result.wins / result.totalBets) * 100 : 0;

    return result;
};

// Method to settle bet
betSchema.methods.settleBet = async function (won, settledBy, notes = '') {
    this.status = won ? 'won' : 'lost';
    this.result = {
        won: won,
        settledAt: new Date(),
        settledBy: settledBy,
        notes: notes
    };

    if (won) {
        this.actualReturn = this.potentialReturn;
        // Update user balance
        const User = mongoose.model('User');
        const user = await User.findById(this.user);
        await user.updateBalance(this.actualReturn, 'add');
    }

    await this.save();
    return this;
};

// Method to cash out bet
betSchema.methods.cashOutBet = async function () {
    if (!this.cashOut.available) {
        throw new Error('Cash out not available for this bet');
    }

    this.status = 'cashed_out';
    this.actualReturn = this.cashOut.value;
    this.cashOut.cashedOutAt = new Date();

    // Update user balance
    const User = mongoose.model('User');
    const user = await User.findById(this.user);
    await user.updateBalance(this.cashOut.value, 'add');

    await this.save();
    return this;
};

module.exports = mongoose.model('Bet', betSchema);
