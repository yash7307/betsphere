// Home Page Component
const HomePage = {
    render() {
        const { liveMatches, upcomingMatches, trendingBets, promoData } = MOCK_DATA;

        return `
            <div class="home-page" style="padding: 16px;">
                <!-- Promo Banner -->
                <div class="promo-banner" style="
                    background: ${promoData.image};
                    border-radius: 16px;
                    padding: 24px;
                    margin-bottom: 24px;
                    position: relative;
                    overflow: hidden;
                ">
                    <div style="position: relative; z-index: 1;">
                        <div style="display: inline-block; padding: 4px 12px; background: rgba(0,0,0,0.3); border-radius: 20px; font-size: 11px; font-weight: 600; margin-bottom: 8px;">
                            PROMO
                        </div>
                        <h2 style="font-size: 24px; font-weight: 800; margin-bottom: 8px;">
                            ${promoData.title}
                        </h2>
                        <p style="font-size: 14px; color: rgba(255,255,255,0.9); margin-bottom: 16px;">
                            ${promoData.description}
                        </p>
                        <button class="btn btn-primary" style="background: white; color: #0f4c38; font-weight: 700;">
                            ${promoData.ctaText}
                        </button>
                    </div>
                    <div style="position: absolute; right: -20px; bottom: -20px; width: 150px; height: 150px; background: rgba(255,255,255,0.05); border-radius: 50%;"></div>
                </div>

                <!-- Categories -->
                <div class="categories" style="display: flex; gap: 8px; margin-bottom: 24px; overflow-x: auto; -webkit-overflow-scrolling: touch;">
                    <button class="category-btn active" data-category="all" style="
                        padding: 8px 16px;
                        border-radius: 20px;
                        background: var(--color-primary);
                        color: #000;
                        font-weight: 600;
                        font-size: 14px;
                        white-space: nowrap;
                        border: none;
                    ">
                        🏏 All
                    </button>
                    <button class="category-btn" data-category="live" style="
                        padding: 8px 16px;
                        border-radius: 20px;
                        background: var(--color-surface);
                        color: var(--color-text-primary);
                        font-weight: 600;
                        font-size: 14px;
                        white-space: nowrap;
                        border: 1px solid var(--color-border);
                    ">
                        🔴 Live
                    </button>
                    <button class="category-btn" data-category="upcoming" style="
                        padding: 8px 16px;
                        border-radius: 20px;
                        background: var(--color-surface);
                        color: var(--color-text-primary);
                        font-weight: 600;
                        font-size: 14px;
                        white-space: nowrap;
                        border: 1px solid var(--color-border);
                    ">
                        Upcoming
                    </button>
                    <button class="category-btn" data-category="ipl" style="
                        padding: 8px 16px;
                        border-radius: 20px;
                        background: var(--color-surface);
                        color: var(--color-text-primary);
                        font-weight: 600;
                        font-size: 14px;
                        white-space: nowrap;
                        border: 1px solid var(--color-border);
                    ">
                        IPL 2024
                    </button>
                </div>

                <!-- Live Matches -->
                <div class="section-header" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
                    <h3 style="font-size: 18px; font-weight: 700;">
                        Live Matches <span class="badge badge-live" style="margin-left: 8px;">${liveMatches.length}</span>
                    </h3>
                    <a href="#" style="font-size: 14px; font-weight: 600; color: var(--color-primary);">See All</a>
                </div>

                ${liveMatches.map(match => this.renderMatchCard(match)).join('')}

                <!-- Upcoming Matches -->
                <div class="section-header" style="display: flex; align-items: center; justify-content: space-between; margin: 32px 0 16px;">
                    <h3 style="font-size: 18px; font-weight: 700;">Upcoming Matches</h3>
                    <a href="#" style="font-size: 14px; font-weight: 600; color: var(--color-primary);">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style="vertical-align: middle; margin-right: 4px;">
                            <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" stroke-width="2"/>
                            <path d="M16 2V6M8 2V6M3 10H21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                        Calendar
                    </a>
                </div>

                ${upcomingMatches.map(match => this.renderMatchCard(match)).join('')}

                <!-- Trending Bets -->
                <div class="section-header" style="margin: 32px 0 16px;">
                    <h3 style="font-size: 18px; font-weight: 700;">
                        Trending Bets 🔥
                    </h3>
                </div>

                <div style="display: grid; gap: 12px; margin-bottom: 24px;">
                    ${trendingBets.map(bet => this.renderTrendingBet(bet)).join('')}
                </div>
            </div>
        `;
    },

    renderMatchCard(match) {
        const isLive = match.status === 'LIVE';

        return `
            <div class="match-card" onclick="App.navigate('in-play', ${match.id})" style="margin-bottom: 16px;">
                <div class="match-header">
                    <div class="match-info" style="display: flex; align-items: center; gap: 8px;">
                        ${isLive ? '<span class="badge badge-live">● LIVE</span>' : ''}
                        <span style="color: var(--color-text-muted); font-size: 11px;">
                            ${match.league} • ${match.matchId}
                        </span>
                    </div>
                    ${match.time ? `<span style="font-size: 11px; color: var(--color-text-muted);">${match.time}</span>` : ''}
                </div>

                <div class="match-teams">
                    <div class="team">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span style="font-size: 24px;">${match.teams.home.flag}</span>
                            <span class="team-name">${match.teams.home.name}</span>
                        </div>
                        ${match.teams.home.score ?
                `<div>
                                <span class="team-score">${match.teams.home.score}</span>
                                <span style="font-size: 12px; color: var(--color-text-muted); margin-left: 4px;">
                                    ${match.teams.home.overs}
                                </span>
                            </div>`
                : ''}
                    </div>
                    <div class="team">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span style="font-size: 24px;">${match.teams.away.flag}</span>
                            <span class="team-name">${match.teams.away.name}</span>
                        </div>
                        ${match.teams.away.score ?
                `<div>
                                <span class="team-score">${match.teams.away.score}</span>
                                <span style="font-size: 12px; color: var(--color-text-muted); margin-left: 4px;">
                                    ${match.teams.away.overs}
                                </span>
                            </div>`
                : ''}
                    </div>
                </div>

                <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--color-border);">
                    <div style="font-size: 11px; color: var(--color-text-muted); margin-bottom: 8px; text-transform: uppercase; font-weight: 600;">
                        Match Winner
                    </div>
                    <div class="match-odds">
                        <button class="odds-btn" style="flex: 1;" onclick="event.stopPropagation(); BetSlip.open({
                            matchId: '${match.matchId}',
                            match: '${match.teams.home.name} vs ${match.teams.away.name}',
                            league: '${match.league}',
                            selection: '${match.teams.home.name}',
                            market: 'Match Winner',
                            odds: ${match.odds.home.back}
                        })">
                            <div style="display: flex; justify-content: space-between; width: 100%; margin-bottom: 4px;">
                                <span style="font-size: 11px; color: var(--color-text-muted); font-weight: 600;">BACK</span>
                                <span style="font-size: 11px; color: var(--color-text-muted); font-weight: 600;">LAY</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; width: 100%;">
                                <span class="odds-value">${helpers.formatOdds(match.odds.home.back)}</span>
                                <span style="font-size: 14px; color: var(--color-danger); font-weight: 700;">
                                    ${helpers.formatOdds(match.odds.home.lay)}
                                </span>
                            </div>
                            <div class="odds-label" style="text-align: center; margin-top: 4px;">
                                ${match.teams.home.name}
                            </div>
                        </button>
                        <button class="odds-btn" style="flex: 1;" onclick="event.stopPropagation(); BetSlip.open({
                            matchId: '${match.matchId}',
                            match: '${match.teams.home.name} vs ${match.teams.away.name}',
                            league: '${match.league}',
                            selection: '${match.teams.away.name}',
                            market: 'Match Winner',
                            odds: ${match.odds.away.back}
                        })">
                            <div style="display: flex; justify-content: space-between; width: 100%; margin-bottom: 4px;">
                                <span style="font-size: 11px; color: var(--color-text-muted); font-weight: 600;">BACK</span>
                                <span style="font-size: 11px; color: var(--color-text-muted); font-weight: 600;">LAY</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; width: 100%;">
                                <span class="odds-value">${helpers.formatOdds(match.odds.away.back)}</span>
                                <span style="font-size: 14px; color: var(--color-danger); font-weight: 700;">
                                    ${helpers.formatOdds(match.odds.away.lay)}
                                </span>
                            </div>
                            <div class="odds-label" style="text-align: center; margin-top: 4px;">
                                ${match.teams.away.name}
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    renderTrendingBet(bet) {
        return `
            <div class="card" style="padding: 16px; cursor: pointer;" onclick="BetSlip.open({
                match: '${bet.team}',
                selection: '${bet.player}',
                market: '${bet.market}',
                odds: ${bet.odds}
            })">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="font-size: 32px;">${bet.icon}</div>
                    <div style="flex: 1;">
                        <div style="font-weight: 700; font-size: 16px; margin-bottom: 2px;">
                            ${bet.player}
                        </div>
                        <div style="font-size: 12px; color: var(--color-text-muted);">
                            ${bet.team} • ${bet.market}
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <div class="odds-value" style="font-size: 24px;">
                            ${helpers.formatOdds(bet.odds)}
                        </div>
                        <div style="font-size: 10px; color: var(--color-text-muted); text-transform: uppercase;">
                            odds
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};

// Export
if (typeof window !== 'undefined') {
    window.HomePage = HomePage;
}
