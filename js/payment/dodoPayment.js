// Dodo Payments Integration
const DodoPayment = {
    // API configuration
    config: {
        apiUrl: 'http://localhost:5000/api/payment',
        currency: 'INR',
        name: 'BetSphere',
        description: 'Cricket Betting Platform',
        theme: {
            color: '#00ff87'
        }
    },

    // Initialize deposit
    async deposit(amount, onSuccess, onFailure) {
        if (amount < 100) {
            helpers.showToast('Minimum deposit is ₹100', 'error');
            if (onFailure) onFailure();
            return;
        }

        helpers.showLoading();

        try {
            // Get checkout session from backend
            const token = helpers.storage.get('auth_token');
            const response = await fetch(`${this.config.apiUrl}/create-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ amount })
            });

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.message || 'Failed to create payment session');
            }

            helpers.hideLoading();

            // Store pending payment info
            helpers.storage.set('pending_payment', {
                sessionId: data.sessionId,
                amount: amount
            });

            // Redirect to Dodo checkout
            if (data.checkoutUrl) {
                window.location.href = data.checkoutUrl;
            } else {
                throw new Error('No checkout URL received');
            }

        } catch (error) {
            helpers.hideLoading();
            helpers.showToast(error.message || 'Payment failed', 'error');
            if (onFailure) onFailure(error);
        }
    },

    // Check for payment redirect and verify
    async checkPaymentReturn() {
        const urlParams = new URLSearchParams(window.location.search);
        const paymentStatus = urlParams.get('payment');

        if (paymentStatus === 'success') {
            const pending = helpers.storage.get('pending_payment');

            if (pending) {
                helpers.showLoading();

                try {
                    const token = helpers.storage.get('auth_token');
                    const response = await fetch(`${this.config.apiUrl}/verify`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            sessionId: pending.sessionId,
                            amount: pending.amount
                        })
                    });

                    const data = await response.json();

                    helpers.hideLoading();
                    helpers.storage.remove('pending_payment');

                    if (data.success) {
                        // Update local balance
                        MOCK_DATA.user.balance = data.balance || MOCK_DATA.user.balance + pending.amount;
                        helpers.storage.set('user_balance', MOCK_DATA.user.balance);
                        helpers.showToast(`₹${pending.amount} added successfully! 💰`, 'success');
                    }

                } catch (error) {
                    helpers.hideLoading();
                    console.error('Payment verification error:', error);
                }
            }

            // Clean URL
            window.history.replaceState({}, document.title, window.location.pathname + window.location.hash);
        }
    },

    // Handle successful payment (for local simulation)
    handleSuccess(response, amount, callback) {
        helpers.showLoading();

        setTimeout(() => {
            // Update user balance
            MOCK_DATA.user.balance += amount;

            // Add transaction record
            const transaction = {
                id: helpers.generateId(),
                type: 'DEPOSIT',
                amount: amount,
                method: 'Dodo Payments',
                status: 'SUCCESS',
                date: new Date(),
                txnId: response.sessionId || `DP${Date.now()}`
            };
            MOCK_DATA.transactions.unshift(transaction);

            // Save to localStorage
            helpers.storage.set('user_balance', MOCK_DATA.user.balance);
            helpers.storage.set('transactions', MOCK_DATA.transactions);

            helpers.hideLoading();
            helpers.showToast(`₹${amount} added successfully! 💰`, 'success');

            if (callback) callback(transaction);
        }, 1500);
    },

    // Withdraw funds
    async withdraw(amount, onSuccess, onFailure) {
        const user = MOCK_DATA.user;

        // Validate
        if (amount > user.balance) {
            helpers.showToast('Insufficient balance', 'error');
            if (onFailure) onFailure();
            return;
        }

        if (amount < 100) {
            helpers.showToast('Minimum withdrawal is ₹100', 'error');
            if (onFailure) onFailure();
            return;
        }

        if (!user.kycVerified) {
            helpers.showToast('Please complete KYC verification', 'error');
            if (onFailure) onFailure();
            return;
        }

        helpers.showLoading();

        try {
            const token = helpers.storage.get('auth_token');
            const response = await fetch(`${this.config.apiUrl}/withdraw`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ amount })
            });

            const data = await response.json();
            helpers.hideLoading();

            if (data.success) {
                user.balance -= amount;
                helpers.storage.set('user_balance', user.balance);
                helpers.showToast('Withdrawal request submitted! 💸', 'success');
                if (onSuccess) onSuccess(data.transaction);
            } else {
                throw new Error(data.message);
            }

        } catch (error) {
            helpers.hideLoading();

            // Fallback to local simulation
            user.balance -= amount;

            const transaction = {
                id: helpers.generateId(),
                type: 'WITHDRAWAL',
                amount: amount,
                method: 'Bank Transfer',
                status: 'PENDING',
                date: new Date(),
                txnId: `WD${Date.now()}`
            };
            MOCK_DATA.transactions.unshift(transaction);

            helpers.storage.set('user_balance', user.balance);
            helpers.storage.set('transactions', MOCK_DATA.transactions);

            helpers.showToast('Withdrawal request submitted! 💸', 'success');
            if (onSuccess) onSuccess(transaction);
        }
    },

    // Show deposit modal
    showDepositModal() {
        const modal = document.createElement('div');
        modal.className = 'modal show';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Add Funds</h3>
                    <button class="close-modal" onclick="this.closest('.modal').remove()">&times;</button>
                </div>
                <div style="padding: 16px;">
                    <div class="amount-input-group">
                        <label>Enter Amount</label>
                        <input 
                            type="number" 
                            class="amount-input" 
                            id="deposit-amount" 
                            placeholder="Minimum ₹100"
                            value="1000"
                            min="100"
                            step="100"
                        >
                        <div class="quick-amounts">
                            <button class="quick-amount-btn" onclick="document.getElementById('deposit-amount').value = 500">₹500</button>
                            <button class="quick-amount-btn" onclick="document.getElementById('deposit-amount').value = 1000">₹1K</button>
                            <button class="quick-amount-btn" onclick="document.getElementById('deposit-amount').value = 5000">₹5K</button>
                            <button class="quick-amount-btn" onclick="document.getElementById('deposit-amount').value = 10000">₹10K</button>
                        </div>
                    </div>

                    <div style="margin: 16px 0; padding: 16px; background: var(--color-background); border-radius: 8px;">
                        <div style="font-size: 12px; color: var(--color-text-muted); margin-bottom: 8px;">Payment Methods</div>
                        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                            <span class="badge" style="background: var(--color-surface);">UPI</span>
                            <span class="badge" style="background: var(--color-surface);">Cards</span>
                            <span class="badge" style="background: var(--color-surface);">Net Banking</span>
                            <span class="badge" style="background: var(--color-surface);">Wallets</span>
                        </div>
                    </div>

                    <button class="btn btn-primary btn-lg" style="width: 100%;" onclick="DodoPayment.processDeposit()">
                        Continue to Payment
                    </button>

                    <div style="text-align: center; margin-top: 12px; font-size: 11px; color: var(--color-text-muted);">
                        🔒 Secure payment powered by Dodo Payments
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    },

    // Process deposit from modal
    processDeposit() {
        const input = document.getElementById('deposit-amount');
        const amount = parseFloat(input.value) || 0;

        if (amount < 100) {
            helpers.showToast('Minimum deposit is ₹100', 'error');
            return;
        }

        // Close modal
        document.querySelector('.modal.show')?.remove();

        // Open Dodo Payment
        this.deposit(amount, () => {
            // Refresh page if on profile
            if (window.App && window.location.hash === '#profile') {
                window.App.render();
            }
        });
    },

    // Show withdrawal modal
    showWithdrawalModal() {
        const user = MOCK_DATA.user;
        const modal = document.createElement('div');
        modal.className = 'modal show';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Withdraw Funds</h3>
                    <button class="close-modal" onclick="this.closest('.modal').remove()">&times;</button>
                </div>
                <div style="padding: 16px;">
                    <div style="margin-bottom: 16px; padding: 12px; background: var(--color-background); border-radius: 8px;">
                        <div style="font-size: 12px; color: var(--color-text-muted);">Available Balance</div>
                        <div style="font-size: 24px; font-weight: 700; color: var(--color-primary);">
                            ${helpers.formatCurrency(user.balance)}
                        </div>
                    </div>

                    <div class="amount-input-group">
                        <label>Withdrawal Amount</label>
                        <input 
                            type="number" 
                            class="amount-input" 
                            id="withdrawal-amount" 
                            placeholder="Minimum ₹100"
                            value="1000"
                            min="100"
                            max="${user.balance}"
                            step="100"
                        >
                        <div class="quick-amounts">
                            <button class="quick-amount-btn" onclick="document.getElementById('withdrawal-amount').value = 500">₹500</button>
                            <button class="quick-amount-btn" onclick="document.getElementById('withdrawal-amount').value = 1000">₹1K</button>
                            <button class="quick-amount-btn" onclick="document.getElementById('withdrawal-amount').value = Math.floor(${user.balance})">All</button>
                        </div>
                    </div>

                    <div style="margin: 16px 0; padding: 12px; background: rgba(255, 165, 38, 0.1); border-radius: 8px; border-left: 3px solid var(--color-warning);">
                        <div style="font-size: 12px; color: var(--color-warning);">
                            ⚠️ Withdrawals typically take 1-3 business days to process
                        </div>
                    </div>

                    <button class="btn btn-primary btn-lg" style="width: 100%;" onclick="DodoPayment.processWithdrawal()">
                        Request Withdrawal
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    },

    // Process withdrawal from modal
    processWithdrawal() {
        const input = document.getElementById('withdrawal-amount');
        const amount = parseFloat(input.value) || 0;

        // Close modal
        document.querySelector('.modal.show')?.remove();

        // Process withdrawal
        this.withdraw(amount, () => {
            // Refresh page if on profile
            if (window.App && window.location.hash === '#profile') {
                window.App.render();
            }
        });
    }
};

// Check for payment return on page load
document.addEventListener('DOMContentLoaded', () => {
    DodoPayment.checkPaymentReturn();
});

// Export for backwards compatibility with RazorpayPayment references
if (typeof window !== 'undefined') {
    window.DodoPayment = DodoPayment;
    window.RazorpayPayment = DodoPayment; // Backwards compatibility
}
