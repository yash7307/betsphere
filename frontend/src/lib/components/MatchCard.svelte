<script>
    import { goto } from '$app/navigation';
    import { formatters } from '$lib/utils/formatters.js';

    let { match } = $props();

    function handleClick() {
        goto(`/in-play/${match.id}`);
    }

    function stopProp(e) {
        e.stopPropagation();
    }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="match-card" onclick={handleClick}>
    <div class="match-header">
        <div class="match-info">{match.league}</div>
        {#if match.status === 'LIVE'}
            <span class="badge badge-live">
                <span style="font-size:8px;margin-right:4px;">●</span>
                LIVE
            </span>
        {:else}
            <span class="badge badge-info">{match.time}</span>
        {/if}
    </div>

    <div class="match-teams">
        <div class="team">
            <div style="display:flex;align-items:center;gap:8px;">
                <span style="font-size:20px;">{match.teams.home.flag}</span>
                <span class="team-name">{match.teams.home.name}</span>
            </div>
            {#if match.teams.home.score}
                <div style="display:flex;gap:8px;align-items:center;">
                    <span class="team-score">{match.teams.home.score}</span>
                    <span style="font-size:12px;color:var(--color-text-muted);">
                        {match.teams.home.overs}
                    </span>
                </div>
            {/if}
        </div>

        <div class="team">
            <div style="display:flex;align-items:center;gap:8px;">
                <span style="font-size:20px;">{match.teams.away.flag}</span>
                <span class="team-name">{match.teams.away.name}</span>
            </div>
            {#if match.teams.away.score}
                <div style="display:flex;gap:8px;align-items:center;">
                    <span class="team-score">{match.teams.away.score}</span>
                    <span style="font-size:12px;color:var(--color-text-muted);">
                        {match.teams.away.overs}
                    </span>
                </div>
            {/if}
        </div>
    </div>

    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="match-odds">
        <div class="odds-btn" onclick={stopProp}>
            <div class="odds-value">{formatters.odds(match.odds.home.back)}</div>
            <div class="odds-label">{match.teams.home.name}</div>
        </div>
        <div class="odds-btn" onclick={stopProp}>
            <div class="odds-value">{formatters.odds(match.odds.away.back)}</div>
            <div class="odds-label">{match.teams.away.name}</div>
        </div>
    </div>
</div>
