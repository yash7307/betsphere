// Bet Slip Component
const BetSlip = {
    currentBet: null,

    open(betData) {
        this.currentBet = betData;
        this.render();
        const modal = document.getElementById('bet-slip-modal');
        modal.classList.add('show');
    },

    close() {
        const modal = document.getElementById('bet-slip-modal');
        modal.classList.remove('show');
        this.currentBet = null;
    },

    render() {
        const body = document.getElementById('bet-slip-body');
        if (!this.currentBet) return;

        const { match, selection, market, odds, team } = this.currentBet;

        body.innerHTML = `
            <div class="bet-slip-info">
                <div class="bet-slip-match">
                    <div class="text-muted" style="font-size: 12px; margin-bottom: 4px;">${match}</div>
                    <div style="font-weight: 600; font-size: 16px; color: var(--color-primary); margin-bottom: 8px;">
                        ${selection}
                    </div>
                    <div class="flex justify-between" style="margin-bottom: 16px;">
                        <span class="text-muted" style="font-size: 14px;">${market}</span>
                        <span style="font-weight: 700; font-size: 18px; color: var(--color-primary);">
                            ${helpers.formatOdds(odds)}
                        </span>
                    </div>
                </div>

                <div class="amount-input-group">
                    <label>Stake Amount</label>
                    <input 
                        type="number" 
                        class="amount-input" 
                        id="stake-input" 
                        placeholder="Enter amount"
                        value="100"
                        min="10"
                        step="10"
                    >
                    <div class="quick-amounts">
                        <button class="quick-amount-btn" onclick="BetSlip.setAmount(100)">₹100</button>
                        <button class="quick-amount-btn" onclick="BetSlip.setAmount(500)">₹500</button>
                        <button class="quick-amount-btn" onclick="BetSlip.setAmount(1000)">₹1K</button>
                        <button class="quick-amount-btn" onclick="BetSlip.setAmount(5000)">₹5K</button>
                    </div>
                </div>

                <div class="bet-summary" style="background: var(--color-background); padding: 16px; border-radius: 8px; margin: 16px 0;">
                    <div class="flex justify-between" style="margin-bottom: 8px;">
                        <span class="text-muted">Potential Return</span>
                        <span id="potential-return" style="font-weight: 700; font-size: 18px; color: var(--color-success);">
                            ${helpers.formatCurrency(100 * odds)}
                        </span>
                    </div>
                    <div class="flex justify-between" style="font-size: 14px;">
                        <span class="text-muted">Potential Profit</span>
                        <span id="potential-profit" class="text-success">
                            ${helpers.formatCurrency(100 * odds - 100)}
                        </span>
                    </div>
                </div>

                <button class="btn btn-primary btn-lg" style="width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px;" onclick="BetSlip.placeBet()">
                    <span>Place Bet</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>

                <div style="text-align: center; margin-top: 12px; font-size: 12px; color: var(--color-text-muted);">
                    By placing this bet, you agree to our terms & conditions
                </div>
            </div>
        `;

        // Add input listener
        const input = document.getElementById('stake-input');
        input.addEventListener('input', () => this.updateCalculations());

        // Focus input
        setTimeout(() => input.focus(), 100);
    },

    setAmount(amount) {
        const input = document.getElementById('stake-input');
        input.value = amount;
        this.updateCalculations();
    },

    updateCalculations() {
        const input = document.getElementById('stake-input');
        const amount = parseFloat(input.value) || 0;
        const odds = this.currentBet.odds;

        const potentialReturn = amount * odds;
        const profit = potentialReturn - amount;

        document.getElementById('potential-return').textContent = helpers.formatCurrency(potentialReturn);
        document.getElementById('potential-profit').textContent = helpers.formatCurrency(profit);
    },

    placeBet() {
        const input = document.getElementById('stake-input');
        const amount = parseFloat(input.value) || 0;
        const user = MOCK_DATA.user;

        // Validate
        const validation = helpers.validateBetAmount(amount, user.balance);
        if (!validation.valid) {
            helpers.showToast(validation.message, 'error');
            return;
        }

        // Show loading
        helpers.showLoading();

        // Simulate placing bet
        setTimeout(() => {
            // Update user balance
            user.balance -= amount;

            // Add bet to my bets
            const newBet = {
                id: helpers.generateId(),
                matchId: this.currentBet.matchId || '#LIVE',
                match: this.currentBet.match,
                league: this.currentBet.league || '',
                selection: this.currentBet.selection,
                market: this.currentBet.market,
                odds: this.currentBet.odds,
                stake: amount,
                potentialReturn: amount * this.currentBet.odds,
                status: 'OPEN',
                canCashOut: false,
                placedAt: new Date(),
                time: 'Just now'
            };

            MOCK_DATA.myBets.unshift(newBet);
            user.openBets++;

            helpers.hideLoading();
            this.close();
            helpers.showToast('Bet placed successfully! 🎉', 'success');

            // Navigate to My Bets if not already there
            setTimeout(() => {
                if (window.App && window.location.hash !== '#my-bets') {
                    window.App.navigate('my-bets');
                }
            }, 1000);
        }, 1500);
    }
};

// Setup modal close handlers
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('bet-slip-modal');
    const closeBtn = modal.querySelector('.close-modal');

    closeBtn.addEventListener('click', () => BetSlip.close());

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            BetSlip.close();
        }
    });
});

// Export
if (typeof window !== 'undefined') {
    window.BetSlip = BetSlip;
}
