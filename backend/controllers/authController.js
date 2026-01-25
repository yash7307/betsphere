const User = require('../models/User');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ $or: [{ email }, { phone }] });
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email or phone'
            });
        }

        // Create user
        const user = await User.create({
            name,
            email,
            phone,
            password
        });

        // Create token
        const token = user.getSignedJwtToken();

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                username: user.username,
                balance: user.balance,
                avatar: user.avatar,
                role: user.role
            }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate email & password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password'
            });
        }

        // Check for user
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Check account status
        if (user.status !== 'active') {
            return res.status(403).json({
                success: false,
                message: 'Account is suspended or banned'
            });
        }

        // Update last login
        user.lastLogin = new Date();
        await user.save();

        // Create token
        const token = user.getSignedJwtToken();

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                username: user.username,
                balance: user.balance,
                avatar: user.avatar,
                role: user.role,
                kyc: user.kyc
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('openBetsCount');

        res.status(200).json({
            success: true,
            user: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
exports.updateProfile = async (req, res) => {
    try {
        const fieldsToUpdate = {
            name: req.body.name,
            phone: req.body.phone,
            avatar: req.body.avatar
        };

        const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            user: user
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Update password
// @route   PUT /api/auth/password
// @access  Private
exports.updatePassword = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('+password');

        // Check current password
        if (!(await user.matchPassword(req.body.currentPassword))) {
            return res.status(401).json({
                success: false,
                message: 'Current password is incorrect'
            });
        }

        user.password = req.body.newPassword;
        await user.save();

        const token = user.getSignedJwtToken();

        res.status(200).json({
            success: true,
            message: 'Password updated successfully',
            token
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
