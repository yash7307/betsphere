# BetSphere - Cricket Betting Platform

A modern, mobile-first cricket betting web application with sleek dark green theme, live match betting, and integrated payment gateway.

## 🎯 Features

- **Live Cricket Matches** - Real-time scores and odds
- **In-Play Betting** - Bet on live matches with dynamic odds
- **My Bets** - Track active and settled bets
- **User Profile** - Manage account and KYC
- **Payment Integration** - Razorpay for deposits and withdrawals
- **Responsive Design** - Optimized for mobile devices
- **Beautiful UI** - Modern dark green theme with smooth animations

## 🚀 Quick Start

### Option 1: Simple HTTP Server (Recommended)

```bash
# Using Python
python -m http.server 8000

# OR using Node.js
npx http-server -p 8000
```

Then open: `http://localhost:8000`

### Option 2: Vite Dev Server (For Production)

```bash
# Install Vite globally
npm install -g vite

# Run dev server
vite

# OR run directly
npx vite
```

## 📁 Project Structure

```
betsphere/
├── index.html              # Main HTML file
├── styles.css              # Complete design system
├── js/
│   ├── app.js             # Main application & routing
│   ├── data/
│   │   └── mockData.js    # Mock cricket data
│   ├── utils/
│   │   └── helpers.js     # Utility functions
│   ├── components/
│   │   └── betSlip.js     # Bet slip modal
│   ├── payment/
│   │   └── razorpay.js    # Payment integration
│   └── pages/
│       ├── home.js        # Home page
│       ├── myBets.js      # My Bets page
│       ├── inPlay.js      # In-Play betting
│       └── profile.js     # User profile
└── README.md
```

## 💳 Payment Gateway Setup

### Razorpay Integration

1. Sign up at [Razorpay](https://razorpay.com/)
2. Get your API keys from Dashboard
3. Update `js/payment/razorpay.js`:

```javascript
config: {
    key: 'rzp_test_YOUR_KEY_HERE', // Replace with your test key
    // ... rest of config
}
```

### Test Cards (Razorpay Test Mode)

- **Card Number**: 4111 1111 1111 1111
- **CVV**: Any 3 digits
- **Expiry**: Any future date

## 🎮 Usage

### Navigation

- **Home** - Browse live and upcoming matches
- **In-Play** - View live match details and place bets
- **My Bets** - Track your betting history
- **Profile** - Manage account and funds

### Placing a Bet

1. Click on any match odds button
2. Enter your stake amount
3. Review potential return
4. Click "Place Bet"

### Managing Funds

**Deposit:**
- Go to Profile → Click "Add Funds"
- Enter amount and complete payment

**Withdraw:**
- Go to Profile → Click "Withdraw"
- Enter amount (requires KYC verification)

## 🔧 Configuration

### Mock Data

The app uses mock data for demonstration. To integrate real cricket data:

1. Sign up for a Cricket API (e.g., [CricAPI](https://www.cricapi.com/))
2. Update `js/data/mockData.js` to fetch from API
3. Set up data refresh intervals

### User Authentication

Currently using mock user data. To add real authentication:

1. Implement backend API with JWT
2. Add login/register pages
3. Update user state management

## 🎨 Design System

### Colors

- **Primary**: `#00ff87` (Bright Green)
- **Background**: `#0a1f1a` (Dark Green)
- **Surface**: `#122820`
- **Success**: `#00ff87`
- **Danger**: `#ff3b5c`
- **Warning**: `#ffa726`

### Typography

- **Font Family**: Inter
- **Base Size**: 14px
- **Weights**: 300, 400, 500, 600, 700, 800

## 📱 Mobile Optimization

The app is designed mobile-first with:

- Max width: 480px
- Touch-friendly buttons (min 44px)
- Swipe-friendly cards
- Bottom navigation for easy thumb access

## 🛡️ Legal & Compliance

> **Important**: Ensure you have proper licensing and comply with local gambling/betting regulations before deploying this application.

## 🐛 Known Limitations

- Mock data (not connected to live cricket API)
- Authentication is simulated
- Cash out values are calculated statically
- No backend validation

## 🔮 Future Enhancements

- Live score updates via WebSocket
- Push notifications for bet results
- Social features (share bets)
- Multi-language support
- More payment gateways (PhonePe, Paytm)
- Cricket predictions using ML

## 📄 License

This is a demonstration project. Use at your own risk.

## 🤝 Support

For issues or questions, please refer to the code comments or documentation.

---

**Built with ❤️ for cricket betting enthusiasts**
