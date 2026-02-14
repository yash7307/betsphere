<script>
    import { page } from '$app/state';
    import OddsButton from '$lib/components/OddsButton.svelte';
    import BetSlip from '$lib/components/BetSlip.svelte';
    import { MOCK_DATA } from '$lib/data/mockData.js';

    let matchId = $derived(page.params.matchId);
    let match = $derived(
        MOCK_DATA.liveMatches.find(m => m.id === parseInt(matchId)) ||
        MOCK_DATA.upcomingMatches.find(m => m.id === parseInt(matchId)) ||
        MOCK_DATA.liveMatches[0]
    );

    let showBetSlip = $state(false);
    let selectedBet = $state(null);

    function selectBet(selection, odds) {
        selectedBet = {
            matchId: match.matchId,
            match: `${match.teams.home.name} vs ${match.teams.away.name}`,
            league: match.league, selection, odds
        };
        showBetSlip = true;
    }
</script>

<div class="in-play-page">
    {#if match}
        <div class="match-detail-card">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
                <span style="font-size:12px;color:var(--color-text-muted);">{match.league}</span>
                {#if match.status === 'LIVE'}
                    <span class="badge badge-live"><span style="font-size:8px;margin-right:4px;">●</span> LIVE</span>
                {:else}
                    <span class="badge badge-info">{match.time}</span>
                {/if}
            </div>
            <div class="match-score-section">
                <div class="team-info">
                    <div class="team-flag">{match.teams.home.flag}</div>
                    <div style="font-weight:700;font-size:16px;">{match.teams.home.name}</div>
                    {#if match.teams.home.score}
                        <div style="font-size:24px;font-weight:800;color:var(--color-primary);margin-top:4px;">{match.teams.home.score}</div>
                    {/if}
                </div>
                <div class="vs-badge">VS</div>
                <div class="team-info">
                    <div class="team-flag">{match.teams.away.flag}</div>
                    <div style="font-weight:700;font-size:16px;">{match.teams.away.name}</div>
                    {#if match.teams.away.score}
                        <div style="font-size:24px;font-weight:800;color:var(--color-primary);margin-top:4px;">{match.teams.away.score}</div>
                    {/if}
                </div>
            </div>
        </div>
        <div style="margin-bottom:16px;">
            <h3 style="font-size:16px;font-weight:700;margin-bottom:12px;">Match Winner</h3>
            <div class="odds-row">
                <OddsButton selection={match.teams.home.name} odds={match.odds.home.back} onclick={() => selectBet(match.teams.home.name, match.odds.home.back)} />
                <OddsButton selection={match.teams.away.name} odds={match.odds.away.back} onclick={() => selectBet(match.teams.away.name, match.odds.away.back)} />
            </div>
        </div>
    {:else}
        <div style="text-align:center;padding:48px;color:var(--color-text-muted);">Match not found</div>
    {/if}
</div>

<BetSlip isOpen={showBetSlip} bet={selectedBet} onclose={() => showBetSlip = false} />
