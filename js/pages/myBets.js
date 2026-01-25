// My Bets Page Component
const MyBetsPage = {
    currentFilter: 'open',

    render() {
        const { myBets, user } = MOCK_DATA;
        const activeBets = myBets.filter(b => b.status === 'OPEN' || b.status === 'PENDING');
        const totalStake = activeBets.reduce((sum, bet) => sum + bet.stake, 0);
        const totalReturn = activeBets.reduce((sum, bet) => sum + bet.potentialReturn, 0);

        return `
            <div class="my-bets-page" style="padding: 16px;">
                <!-- Summary Card -->
                <div class="card" style="background: linear-gradient(135deg, #0f4c38 0%, #1a7553 100%); margin-bottom: 24px; padding: 20px;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div>
                            <div style="font-size: 12px; color: rgba(255,255,255,0.7); margin-bottom: 4px;">
                                Total Active Stake
                            </div>
                            <div style="font-size: 28px; font-weight: 800; color: white;">
                                ${helpers.formatCurrencyShort(totalStake)}
                            </div>
                        </div>
                        <div style="text-align: right;">
                            <div style="font-size: 12px; color: rgba(255,255,255,0.7); margin-bottom: 4px;">
                                Potential Return
                            </div>
                            <div style="font-size: 28px; font-weight: 800; color: var(--color-primary);">
                                ${helpers.formatCurrencyShort(totalReturn)}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Filter Tabs -->
                <div class="filter-tabs" style="display: flex; gap: 0; margin-bottom: 24px; background: var(--color-surface); border-radius: 8px; padding: 4px;">
                    <button 
                        class="filter-tab ${this.currentFilter === 'open' ? 'active' : ''}" 
                        data-filter="open"
                        onclick="MyBetsPage.setFilter('open')"
                        style="flex: 1; padding: 10px; border-radius: 6px; font-weight: 600; font-size: 14px; 
                               background: ${this.currentFilter === 'open' ? 'var(--color-primary)' : 'transparent'};
                               color: ${this.currentFilter === 'open' ? '#000' : 'var(--color-text-secondary)'};"
                    >
                        Open (${myBets.filter(b => b.status === 'OPEN' || b.status === 'PENDING').length})
                    </button>
                    <button 
                        class="filter-tab ${this.currentFilter === 'settled' ? 'active' : ''}" 
                        data-filter="settled"
                        onclick="MyBetsPage.setFilter('settled')"
                        style="flex: 1; padding: 10px; border-radius: 6px; font-weight: 600; font-size: 14px;
                               background: ${this.currentFilter === 'settled' ? 'var(--color-primary)' : 'transparent'};
                               color: ${this.currentFilter === 'settled' ? '#000' : 'var(--color-text-secondary)'};"
                    >
                        Settled
                    </button>
                    <button 
                        class="filter-tab ${this.currentFilter === 'all' ? 'active' : ''}" 
                        data-filter="all"
                        onclick="MyBetsPage.setFilter('all')"
                        style="flex: 1; padding: 10px; border-radius: 6px; font-weight: 600; font-size: 14px;
                               background: ${this.currentFilter === 'all' ? 'var(--color-primary)' : 'transparent'};
                               color: ${this.currentFilter === 'all' ? '#000' : 'var(--color-text-secondary)'};"
                    >
                        All
                    </button>
                </div>

                <!-- Bets List -->
                <div class="bets-list">
                    ${this.renderBets()}
                </div>

                ${myBets.length === 0 ? this.renderEmptyState() : ''}
            </div>
        `;
    },

    renderBets() {
        const { myBets } = MOCK_DATA;
        let filteredBets = myBets;

        if (this.currentFilter === 'open') {
            filteredBets = myBets.filter(b => b.status === 'OPEN' || b.status === 'PENDING');
        } else if (this.currentFilter === 'settled') {
            filteredBets = myBets.filter(b => b.status === 'WON' || b.status === 'LOST');
        }

        if (filteredBets.length === 0) {
            return this.renderEmptyState();
        }

        return filteredBets.map(bet => this.renderBetCard(bet)).join('');
    },

    renderBetCard(bet) {
        const statusColors = {
            'OPEN': 'var(--color-info)',
            'PENDING': 'var(--color-pending)',
            'WON': 'var(--color-success)',
            'LOST': 'var(--color-danger)'
        };

        return `
            <div class="bet-card" style="margin-bottom: 16px;">
                <div class="bet-header">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span class="bet-match" style="font-size: 11px;">
                            ${bet.league} • ${bet.matchId}
                        </span>
                    </div>
                    <span class="badge" style="background: ${statusColors[bet.status]}; color: ${bet.status === 'WON' ? '#000' : '#fff'};">
                        ${bet.status}
                    </span>
                </div>

                <div style="margin: 12px 0;">
                    <div style="font-size: 13px; color: var(--color-text-muted); margin-bottom: 4px;">
                        ${bet.match}
                    </div>
                    <div class="bet-selection" style="font-size: 16px; margin-bottom: 8px;">
                        ${bet.selection}
                    </div>
                    <div style="font-size: 12px; color: var(--color-text-muted);">
                        ${bet.market} • Odds: ${helpers.formatOdds(bet.odds)}
                    </div>
                </div>

                <div class="bet-details">
                    <div class="bet-detail-item">
                        <div class="bet-detail-label">Stake</div>
                        <div class="bet-detail-value">${helpers.formatCurrency(bet.stake)}</div>
                    </div>
                    <div class="bet-detail-item" style="text-align: right;">
                        <div class="bet-detail-label">
                            ${bet.status === 'WON' ? 'Won' : bet.status === 'LOST' ? 'Lost' : 'To Return'}
                        </div>
                        <div class="bet-detail-value" style="color: ${bet.status === 'WON' ? 'var(--color-success)' : bet.status === 'LOST' ? 'var(--color-danger)' : 'var(--color-primary)'};">
                            ${bet.status === 'WON' ? helpers.formatCurrency(bet.actualReturn) :
                bet.status === 'LOST' ? helpers.formatCurrency(0) :
                    helpers.formatCurrency(bet.potentialReturn)}
                        </div>
                    </div>
                </div>

                ${bet.canCashOut ? `
                    <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--color-border); display: flex; gap: 12px; align-items: center;">
                        <button class="btn btn-primary" style="flex: 1; background: var(--color-success);" onclick="MyBetsPage.cashOut(${bet.id})">
                            Cash Out ${helpers.formatCurrency(bet.cashOutValue)}
                        </button>
                        <div style="font-size: 11px; color: var(--color-text-muted); flex: 1; text-align: right;">
                            Guaranteed ${helpers.formatCurrency(bet.cashOutValue - bet.stake)} profit
                        </div>
                    </div>
                ` : ''}

                <div style="margin-top: 12px; display: flex; align-items: center; gap: 8px;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                        <path d="M12 6V12L16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    <span style="font-size: 11px; color: var(--color-text-muted);">
                        ${helpers.formatDateTime(bet.placedAt)}
                    </span>
                    ${bet.status !== 'OPEN' && bet.status !== 'PENDING' ? `
                        <span style="font-size: 11px; color: var(--color-text-muted); margin-left: auto;">
                            Settled: ${helpers.formatDateTime(bet.settledAt)}
                        </span>
                    ` : ''}
                </div>
            </div>
        `;
    },

    renderEmptyState() {
        return `
            <div style="text-align: center; padding: 60px 20px;">
                <div style="font-size: 64px; margin-bottom: 16px;">📋</div>
                <h3 style="font-size: 20px; font-weight: 700; margin-bottom: 8px;">No Bets Yet</h3>
                <p style="color: var(--color-text-muted); margin-bottom: 24px;">
                    ${this.currentFilter === 'open' ? 'You have no active bets' :
                this.currentFilter === 'settled' ? 'You have no settled bets' :
                    'Start betting on live matches!'}
                </p>
                <button class="btn btn-primary" onclick="App.navigate('home')">
                    Explore Matches
                </button>
            </div>
        `;
    },

    setFilter(filter) {
        this.currentFilter = filter;
        window.App.render();
    },

    cashOut(betId) {
        const bet = MOCK_DATA.myBets.find(b => b.id === betId);
        if (!bet || !bet.canCashOut) return;

        if (confirm(`Cash out for ${helpers.formatCurrency(bet.cashOutValue)}?`)) {
            helpers.showLoading();

            setTimeout(() => {
                // Update user balance
                MOCK_DATA.user.balance += bet.cashOutValue;

                // Update bet
                bet.status = 'WON';
                bet.actualReturn = bet.cashOutValue;
                bet.settledAt = new Date();
                bet.canCashOut = false;
                MOCK_DATA.user.openBets--;

                helpers.hideLoading();
                helpers.showToast('Cash out successful! 💰', 'success');
                window.App.render();
            }, 1000);
        }
    }
};

// Export
if (typeof window !== 'undefined') {
    window.MyBetsPage = MyBetsPage;
}
