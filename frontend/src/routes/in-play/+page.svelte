<script>
    import OddsButton from '$lib/components/OddsButton.svelte';
    import BetSlip from '$lib/components/BetSlip.svelte';
    import { MOCK_DATA } from '$lib/data/mockData.js';
    import { formatters } from '$lib/utils/formatters.js';

    let match = $state(MOCK_DATA.liveMatches[0]);
    let showBetSlip = $state(false);
    let selectedBet = $state(null);

    function selectBet(selection, odds) {
        selectedBet = {
            matchId: match.matchId,
            match: `${match.teams.home.name} vs ${match.teams.away.name}`,
            league: match.league,
            selection,
            odds
        };
        showBetSlip = true;
    }
</script>

<div class="in-play-page">
    {#if match}
        <!-- Match Detail Card -->
        <div class="match-detail-card">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
                <span style="font-size:12px;color:var(--color-text-muted);">{match.league}</span>
                <span class="badge badge-live">
                    <span style="font-size:8px;margin-right:4px;">●</span> LIVE
                </span>
            </div>

            <div class="match-score-section">
                <div class="team-info">
                    <div class="team-flag">{match.teams.home.flag}</div>
                    <div style="font-weight:700;font-size:16px;">{match.teams.home.name}</div>
                    {#if match.teams.home.score}
                        <div style="font-size:24px;font-weight:800;color:var(--color-primary);margin-top:4px;">
                            {match.teams.home.score}
                        </div>
                        <div style="font-size:12px;color:var(--color-text-muted);">{match.teams.home.overs}</div>
                    {/if}
                </div>

                <div class="vs-badge">VS</div>

                <div class="team-info">
                    <div class="team-flag">{match.teams.away.flag}</div>
                    <div style="font-weight:700;font-size:16px;">{match.teams.away.name}</div>
                    {#if match.teams.away.score}
                        <div style="font-size:24px;font-weight:800;color:var(--color-primary);margin-top:4px;">
                            {match.teams.away.score}
                        </div>
                        <div style="font-size:12px;color:var(--color-text-muted);">{match.teams.away.overs}</div>
                    {/if}
                </div>
            </div>
        </div>

        <!-- Match Winner Odds -->
        <div style="margin-bottom:16px;">
            <h3 style="font-size:16px;font-weight:700;margin-bottom:12px;">Match Winner</h3>
            <div class="odds-row">
                <OddsButton
                    selection={match.teams.home.name}
                    odds={match.odds.home.back}
                    onclick={() => selectBet(match.teams.home.name, match.odds.home.back)}
                />
                <OddsButton
                    selection={match.teams.away.name}
                    odds={match.odds.away.back}
                    onclick={() => selectBet(match.teams.away.name, match.odds.away.back)}
                />
            </div>
        </div>

        <!-- Session & Stats -->
        {#if match.sessionRuns}
            <div style="margin-bottom:16px;">
                <h3 style="font-size:16px;font-weight:700;margin-bottom:12px;">Session & Stats</h3>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
                    <div class="session-card">
                        <div style="font-size:12px;color:var(--color-text-muted);margin-bottom:4px;">Session Runs</div>
                        <div style="font-weight:700;color:var(--color-primary);">{match.sessionRuns}</div>
                    </div>
                    {#if match.topBatsman}
                        <div class="session-card">
                            <div style="font-size:12px;color:var(--color-text-muted);margin-bottom:4px;">Top Batsman</div>
                            <div style="font-weight:700;">{match.topBatsman}</div>
                        </div>
                    {/if}
                    {#if match.winProbability}
                        <div class="session-card">
                            <div style="font-size:12px;color:var(--color-text-muted);margin-bottom:4px;">Win Probability</div>
                            <div style="font-weight:700;color:var(--color-primary);">
                                {match.teams.home.name}: {match.winProbability.home}%
                            </div>
                        </div>
                    {/if}
                    {#if match.targetProjection}
                        <div class="session-card">
                            <div style="font-size:12px;color:var(--color-text-muted);margin-bottom:4px;">Target Projection</div>
                            <div style="font-weight:700;">{match.targetProjection}</div>
                        </div>
                    {/if}
                </div>
            </div>
        {/if}

        <!-- Run Rate -->
        {#if match.runRate}
            <div style="margin-bottom:16px;">
                <h3 style="font-size:16px;font-weight:700;margin-bottom:12px;">Run Rate</h3>
                <div style="display:flex;gap:16px;">
                    <div class="session-card" style="flex:1;">
                        <div style="font-size:12px;color:var(--color-text-muted);margin-bottom:4px;">Current RR</div>
                        <div style="font-weight:700;font-size:20px;color:var(--color-primary);">
                            {match.runRate.current}
                        </div>
                    </div>
                    <div class="session-card" style="flex:1;">
                        <div style="font-size:12px;color:var(--color-text-muted);margin-bottom:4px;">Required RR</div>
                        <div style="font-weight:700;font-size:20px;color:var(--color-warning);">
                            {match.runRate.required}
                        </div>
                    </div>
                </div>
            </div>
        {/if}
    {/if}
</div>

<BetSlip
    isOpen={showBetSlip}
    bet={selectedBet}
    onclose={() => showBetSlip = false}
/>
