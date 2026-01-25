require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');

// Initialize express app
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(helmet()); // Security headers
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:8000',
    credentials: true
}));
app.use(express.json()); // Body parser
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api', limiter);

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/bets', require('./routes/bets'));
app.use('/api/payment', require('./routes/payment'));
app.use('/api/admin', require('./routes/admin'));

// Health check route
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'BetSphere API is running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV
    });
});

// Root route
app.get('/', (req, res) => {
    res.json({
        name: 'BetSphere API',
        version: '1.0.0',
        description: 'Cricket Betting Platform API',
        endpoints: {
            health: '/api/health',
            auth: '/api/auth',
            bets: '/api/bets',
            payment: '/api/payment',
            admin: '/api/admin'
        }
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('❌ Error:', err);

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log('');
    console.log('🚀 ============================================');
    console.log(`🎯 BetSphere API Server Running`);
    console.log(`📡 Port: ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 API URL: http://localhost:${PORT}`);
    console.log(`💚 Health Check: http://localhost:${PORT}/api/health`);
    console.log('============================================');
    console.log('');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.log(`❌ Unhandled Rejection: ${err.message}`);
    server.close(() => process.exit(1));
});

module.exports = app;
