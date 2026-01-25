// In-Play Betting Page Component
const InPlayPage = {
    matchId: null,
    updateInterval: null,

    render(matchId = 1) {
        this.matchId = matchId;
        const match = MOCK_DATA.liveMatches.find(m => m.id === matchId) || MOCK_DATA.liveMatches[0];

        // Start live updates
        this.startLiveUpdates();

        return `
            <div class="in-play-page" style="padding: 0; padding-bottom: 16px;">
                <!-- Match Header -->
                <div style="background: linear-gradient(135deg, #0f4c38 0%, #1a7553 100%); padding: 20px; border-radius: 0 0 24px 24px; margin-bottom: 20px;">
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
                        <div>
                            <div style="font-size: 12px; color: rgba(255,255,255,0.8); margin-bottom: 4px;">
                                ${match.league}
                            </div>
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <span class="badge badge-live">● LIVE</span>
                                <span style="font-size: 11px; color: rgba(255,255,255,0.7);">${match.matchId}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Live Score -->
                    <div style="background: rgba(0,0,0,0.2); border-radius: 16px; padding: 20px; margin-bottom: 16px;">
                        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
                            <div style="flex: 1;">
                                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                                    <span style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.1); border-radius: 50%; font-size: 20px;">
                                        ${match.teams.home.flag}
                                    </span>
                                    <span style="font-size: 18px; font-weight: 700;">${match.teams.home.name}</span>
                                </div>
                                <div style="font-size: 32px; font-weight: 800; color: var(--color-primary);">
                                    ${match.teams.home.score}
                                </div>
                                <div style="font-size: 14px; color: rgba(255,255,255,0.7);">
                                    ${match.teams.home.overs}
                                </div>
                            </div>
                            <div style="text-align: center; padding: 0 20px;">
                                <div style="font-size: 48px; font-weight: 800; color: white;">
                                    ${match.teams.away.score}
                                </div>
                                <div style="font-size: 14px; color: rgba(255,255,255,0.7);">
                                    ${match.teams.away.overs}
                                </div>
                            </div>
                        </div>

                        <!-- Win Probability -->
                        <div style="margin-top: 12px;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 11px;">
                                <span style="color: rgba(255,255,255,0.7);">Target Projection: ${match.targetProjection || '285-295'}</span>
                                <span style="color: var(--color-primary); font-weight: 600;">
                                    Win Prob: ${match.winProbability?.home || 62}%
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style="vertical-align: middle;">
                                        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
                                    </svg>
                                </span>
                            </div>
                            <div style="height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden;">
                                <div style="height: 100%; width: ${match.winProbability?.home || 62}%; background: var(--color-primary); border-radius: 3px;"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style="padding: 0 16px;">
                    <!-- Betting Tabs -->
                    <div style="display: flex; gap: 8px; margin-bottom: 20px; overflow-x: auto; -webkit-overflow-scrolling: touch;">
                        <button class="betting-tab active" style="
                            padding: 10px 20px;
                            border-radius: 8px;
                            background: var(--color-primary);
                            color: #000;
                            font-weight: 600;
                            font-size: 14px;
                            white-space: nowrap;
                        ">
                            Match Odds
                        </button>
                        <button class="betting-tab" style="
                            padding: 10px 20px;
                            border-radius: 8px;
                            background: var(--color-surface);
                            color: var(--color-text-primary);
                            font-weight: 600;
                            font-size: 14px;
                            white-space: nowrap;
                            border: 1px solid var(--color-border);
                        ">
                            Session Runs
                        </button>
                        <button class="betting-tab" style="
                            padding: 10px 20px;
                            border-radius: 8px;
                            background: var(--color-surface);
                            color: var(--color-text-primary);
                            font-weight: 600;
                            font-size: 14px;
                            white-space: nowrap;
                            border: 1px solid var(--color-border);
                        ">
                            Top Batsman
                        </button>
                    </div>

                    <!-- Run Rate Projection Chart -->
                    <div class="card" style="margin-bottom: 20px; padding: 16px;">
                        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
                            <h4 style="font-size: 14px; font-weight: 600;">Run Rate Projection</h4>
                            <button style="padding: 4px 12px; background: rgba(0,255,135,0.1); border-radius: 6px; color: var(--color-primary); font-size: 12px; font-weight: 600;">
                                EXPAND
                            </button>
                        </div>
                        
                        <!-- Simple Chart -->
                        <div style="position: relative; height: 100px; background: var(--color-background); border-radius: 8px; padding: 12px;">
                            <svg width="100%" height="100" viewBox="0 0 300 80" style="overflow: visible;">
                                <defs>
                                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" style="stop-color:rgba(0,255,135,0.3);stop-opacity:1" />
                                        <stop offset="100%" style="stop-color:rgba(0,255,135,0);stop-opacity:1" />
                                    </linearGradient>
                                </defs>
                                <path d="M0 60 Q 75 45, 150 30 T 300 15" stroke="#00ff87" stroke-width="3" fill="none" stroke-linecap="round"/>
                                <path d="M0 60 Q 75 45, 150 30 T 300 15 L 300 80 L 0 80 Z" fill="url(#chartGradient)"/>
                                <circle cx="300" cy="15" r="5" fill="#00ff87"/>
                            </svg>
                            <div style="position: absolute; bottom: 8px; left: 12px; font-size: 10px; color: var(--color-text-muted);">
                                Overs 1-10
                            </div>
                            <div style="position: absolute; bottom: 8px; right: 12px; font-size: 10px; color: var(--color-text-muted);">
                                Overs 40-50
                            </div>
                        </div>
                    </div>

                    <!-- Match Winner Betting -->
                    <div class="section-header" style="margin-bottom: 16px;">
                        <div style="display: flex; align-items: center; justify-content: space-between;">
                            <h3 style="font-size: 16px; font-weight: 700;">Match Winner</h3>
                            <button style="display: flex; align-items: center; gap: 4px; color: var(--color-primary); font-size: 12px; font-weight: 600;">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                                    <path d="M12 16V12M12 8H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                </svg>
                                Rules
                            </button>
                        </div>
                    </div>

                    <div style="display: grid; gap: 12px; margin-bottom: 24px;">
                        <!-- Team 1 Betting -->
                        <div class="card" style="padding: 16px;">
                            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
                                <div style="display: flex; align-items: center; gap: 12px;">
                                    <span style="font-size: 24px;">${match.teams.home.flag}</span>
                                    <div>
                                        <div style="font-weight: 700; font-size: 16px;">${match.teams.home.name}</div>
                                        <div style="font-size: 11px; color: var(--color-text-muted);">Betting</div>
                                    </div>
                                </div>
                            </div>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                                <button class="odds-btn" style="background: rgba(0,255,135,0.1); border-color: var(--color-primary);" onclick="BetSlip.open({
                                    matchId: '${match.matchId}',
                                    match: '${match.teams.home.name} vs ${match.teams.away.name}',
                                    league: '${match.league}',
                                    selection: '${match.teams.home.name}',
                                    market: 'Match Winner',
                                    odds: ${match.odds.home.back},
                                    team: 'home'
                                })">
                                    <div style="font-size: 10px; color: var(--color-text-muted); font-weight: 600; margin-bottom: 4px;">BACK</div>
                                    <div class="odds-value" style="font-size: 24px;">${helpers.formatOdds(match.odds.home.back)}</div>
                                    <div style="font-size: 11px; color: var(--color-text-muted); margin-top: 4px;">55.3k</div>
                                </button>
                                <button class="odds-btn" style="background: rgba(255,59,92,0.1); border-color: var(--color-danger);">
                                    <div style="font-size: 10px; color: var(--color-text-muted); font-weight: 600; margin-bottom: 4px;">LAY</div>
                                    <div style="font-size: 24px; font-weight: 700; color: var(--color-danger);">${helpers.formatOdds(match.odds.home.lay)}</div>
                                    <div style="font-size: 11px; color: var(--color-text-muted); margin-top: 4px;">13.8k</div>
                                </button>
                            </div>
                        </div>

                        <!-- Team 2 Betting -->
                        <div class="card" style="padding: 16px;">
                            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
                                <div style="display: flex; align-items: center; gap: 12px;">
                                    <span style="font-size: 24px;">${match.teams.away.flag}</span>
                                    <div>
                                        <div style="font-weight: 700; font-size: 16px;">${match.teams.away.name}</div>
                                        <div style="font-size: 11px; color: var(--color-text-muted);">Betting</div>
                                    </div>
                                </div>
                            </div>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                                <button class="odds-btn" style="background: rgba(0,255,135,0.1); border-color: var(--color-primary);" onclick="BetSlip.open({
                                    matchId: '${match.matchId}',
                                    match: '${match.teams.home.name} vs ${match.teams.away.name}',
                                    league: '${match.league}',
                                    selection: '${match.teams.away.name}',
                                    market: 'Match Winner',
                                    odds: ${match.odds.away.back},
                                    team: 'away'
                                })">
                                    <div style="font-size: 10px; color: var(--color-text-muted); font-weight: 600; margin-bottom: 4px;">BACK</div>
                                    <div class="odds-value" style="font-size: 24px;">${helpers.formatOdds(match.odds.away.back)}</div>
                                    <div style="font-size: 11px; color: var(--color-text-muted); margin-top: 4px;">1.5k</div>
                                </button>
                                <button class="odds-btn" style="background: rgba(255,59,92,0.1); border-color: var(--color-danger);">
                                    <div style="font-size: 10px; color: var(--color-text-muted); font-weight: 600; margin-bottom: 4px;">LAY</div>
                                    <div style="font-size: 24px; font-weight: 700; color: var(--color-danger);">${helpers.formatOdds(match.odds.away.lay)}</div>
                                    <div style="font-size: 11px; color: var(--color-text-muted); margin-top: 4px;">$0.0k</div>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Quick Bet Slip -->
                    <div class="card" style="background: linear-gradient(135deg, #0f4c38 0%, #1a7553 100%); padding: 16px;">
                        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                            <div style="width: 40px; height: 40px; background: rgba(0,255,135,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                💸
                            </div>
                            <div style="flex: 1;">
                                <div style="font-size: 12px; color: rgba(255,255,255,0.8); margin-bottom: 2px;">Quick Bet Slip</div>
                                <div style="font-weight: 700;">India to Win 1.55</div>
                            </div>
                        </div>
                        <div style="display: flex; gap: 8px;">
                            <input type="number" placeholder="₹ 100" value="100" style="
                                flex: 1;
                                padding: 12px;
                                border-radius: 8px;
                                background: rgba(0,0,0,0.2);
                                border: 1px solid rgba(255,255,255,0.1);
                                color: white;
                                font-size: 16px;
                                font-weight: 600;
                            ">
                            <button class="btn btn-primary" style="padding: 12px 24px; font-weight: 700; display: flex; align-items: center; gap: 6px;" onclick="BetSlip.open({
                                matchId: '${match.matchId}',
                                match: '${match.teams.home.name} vs ${match.teams.away.name}',
                                league: '${match.league}',
                                selection: '${match.teams.home.name}',
                                market: 'Match Winner',
                                odds: ${match.odds.home.back}
                            })">
                                Place Bet
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                </svg>
                            </button>
                        </div>
                        <div style="margin-top: 8px; font-size: 11px; color: rgba(255,255,255,0.7); text-align: center;">
                            Potential Return: <span style="color: var(--color-primary); font-weight: 600;">₹155.00</span> • 
                            Liability: <span style="color: rgba(255,255,255,0.9); font-weight: 600;">₹0.00</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    startLiveUpdates() {
        // Clear any existing interval
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }

        // Simulate live score updates every 5 seconds
        this.updateInterval = setInterval(() => {
            // This would normally fetch from API
            // For demo, we'll just update the UI slightly
        }, 5000);
    },

    cleanup() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
    }
};

// Export
if (typeof window !== 'undefined') {
    window.InPlayPage = InPlayPage;
}
