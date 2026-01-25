const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        trim: true,
        maxlength: [50, 'Name cannot be more than 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        lowercase: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please provide a valid email'
        ]
    },
    phone: {
        type: String,
        required: [true, 'Please provide a phone number'],
        unique: true,
        match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit phone number']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [6, 'Password must be at least 6 characters'],
        select: false // Don't return password by default
    },
    username: {
        type: String,
        unique: true,
        sparse: true
    },
    balance: {
        type: Number,
        default: 0,
        min: [0, 'Balance cannot be negative']
    },
    avatar: {
        type: String,
        default: function () {
            return `https://ui-avatars.com/api/?name=${this.name}&background=00ff87&color=000`;
        }
    },
    kyc: {
        verified: {
            type: Boolean,
            default: false
        },
        level: {
            type: Number,
            default: 0,
            enum: [0, 1, 2]
        },
        documents: [{
            type: {
                type: String,
                enum: ['aadhar', 'pan', 'driving_license', 'passport']
            },
            number: String,
            verified: Boolean,
            uploadedAt: Date
        }]
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    status: {
        type: String,
        enum: ['active', 'suspended', 'banned'],
        default: 'active'
    },
    settings: {
        notifications: {
            email: { type: Boolean, default: true },
            sms: { type: Boolean, default: true },
            push: { type: Boolean, default: true }
        },
        biometricLogin: { type: Boolean, default: false }
    },
    lastLogin: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for open bets count
userSchema.virtual('openBetsCount', {
    ref: 'Bet',
    localField: '_id',
    foreignField: 'user',
    count: true,
    match: { status: { $in: ['open', 'pending'] } }
});

// Encrypt password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Generate username from email if not provided
userSchema.pre('save', function (next) {
    if (!this.username) {
        this.username = '@' + this.email.split('@')[0] + Math.floor(Math.random() * 1000);
    }
    next();
});

// Match password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Sign JWT and return
userSchema.methods.getSignedJwtToken = function () {
    return jwt.sign(
        { id: this._id, role: this.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );
};

// Update balance
userSchema.methods.updateBalance = async function (amount, operation = 'add') {
    if (operation === 'add') {
        this.balance += amount;
    } else if (operation === 'subtract') {
        if (this.balance < amount) {
            throw new Error('Insufficient balance');
        }
        this.balance -= amount;
    }
    await this.save();
    return this.balance;
};

module.exports = mongoose.model('User', userSchema);
