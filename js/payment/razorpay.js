// Razorpay Payment Integration
const RazorpayPayment = {
    // Test keys - Replace with your actual Razorpay keys
    config: {
        key: 'rzp_test_YOUR_KEY_HERE', // Replace with actual test key
        currency: 'INR',
        name: 'BetSphere',
        description: 'Cricket Betting Platform',
        image: 'https://ui-avatars.com/api/?name=BetSphere&background=00ff87&color=000&size=128',
        theme: {
            color: '#00ff87'
        }
    },

    // Initialize deposit
    deposit(amount, onSuccess, onFailure) {
        if (!window.Razorpay) {
            helpers.showToast('Payment gateway not available', 'error');
            return;
        }

        const options = {
            ...this.config,
            amount: amount * 100, // Convert to paise
            handler: (response) => {
                this.handleSuccess(response, amount, onSuccess);
            },
            modal: {
                ondismiss: () => {
                    if (onFailure) onFailure();
                }
            },
            prefill: {
                name: MOCK_DATA.user.name,
                email: MOCK_DATA.user.email,
                contact: MOCK_DATA.user.phone
            },
            notes: {
                transaction_type: 'DEPOSIT',
                user_id: MOCK_DATA.user.id
            }
        };

        const rzp = new Razorpay(options);
        rzp.on('payment.failed', (response) => {
            this.handleFailure(response, onFailure);
        });
        rzp.open();
    },

    // Handle successful payment
    handleSuccess(response, amount, callback) {
        helpers.showLoading();

        // Simulate backend verification
        setTimeout(() => {
            // Update user balance
            MOCK_DATA.user.balance += amount;

            // Add transaction record
            const transaction = {
                id: helpers.generateId(),
                type: 'DEPOSIT',
                amount: amount,
                method: 'Razorpay',
                status: 'SUCCESS',
                date: new Date(),
                txnId: response.razorpay_payment_id
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

    // Handle failed payment
    handleFailure(response, callback) {
        const errorMessage = response.error?.description || 'Payment failed';
        helpers.showToast(errorMessage, 'error');

        if (callback) callback(response);
    },

    // Withdraw funds
    withdraw(amount, onSuccess, onFailure) {
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

        // Simulate withdrawal processing
        setTimeout(() => {
            // Update user balance
            user.balance -= amount;

            // Add transaction record
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

            // Save to localStorage
            helpers.storage.set('user_balance', user.balance);
            helpers.storage.set('transactions', MOCK_DATA.transactions);

            helpers.hideLoading();
            helpers.showToast('Withdrawal request submitted! 💸', 'success');

            if (onSuccess) onSuccess(transaction);
        }, 1500);
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

                    <button class="btn btn-primary btn-lg" style="width: 100%;" onclick="RazorpayPayment.processDeposit()">
                        Continue to Payment
                    </button>

                    <div style="text-align: center; margin-top: 12px; font-size: 11px; color: var(--color-text-muted);">
                        🔒 Secure payment powered by Razorpay
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

        // Open Razorpay
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

                    <button class="btn btn-primary btn-lg" style="width: 100%;" onclick="RazorpayPayment.processWithdrawal()">
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

// Export
if (typeof window !== 'undefined') {
    window.RazorpayPayment = RazorpayPayment;
}
