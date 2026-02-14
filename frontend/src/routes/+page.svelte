<script>
    import MatchCard from '$lib/components/MatchCard.svelte';
    import { MOCK_DATA } from '$lib/data/mockData.js';
    import { formatters } from '$lib/utils/formatters.js';

    let activeCategory = $state('all');

    const categories = [
        { id: 'all', label: '🏏 All', icon: '' },
        { id: 'live', label: '🔴 Live', icon: '' },
        { id: 'upcoming', label: '📅 Upcoming', icon: '' },
        { id: 'ipl', label: '🏆 IPL', icon: '' }
    ];

    let filteredLiveMatches = $derived(
        activeCategory === 'all' || activeCategory === 'live'
            ? MOCK_DATA.liveMatches
            : []
    );

    let filteredUpcomingMatches = $derived(
        activeCategory === 'all' || activeCategory === 'upcoming'
            ? MOCK_DATA.upcomingMatches
            : activeCategory === 'ipl'
                ? MOCK_DATA.upcomingMatches.filter(m => m.league.includes('IPL'))
                : []
    );
</script>

<div class="home-page">
    <div style="padding:16px;">
        <!-- Promo Banner -->
        <div class="promo-banner" style="background:{MOCK_DATA.promoData.image};">
            <div class="promo-badge">⚡ Featured</div>
            <h2 style="font-size:20px;font-weight:800;margin-bottom:8px;">
                {MOCK_DATA.promoData.title}
            </h2>
            <p style="font-size:14px;color:var(--color-text-secondary);margin-bottom:16px;">
                {MOCK_DATA.promoData.description}
            </p>
            <button class="btn btn-primary">{MOCK_DATA.promoData.ctaText}</button>
        </div>

        <!-- Category Filters -->
        <div class="category-filters" style="margin-bottom:24px;">
            {#each categories as cat}
                <button
                    class="category-btn {activeCategory === cat.id ? 'active' : ''}"
                    onclick={() => activeCategory = cat.id}
                >
                    {cat.label}
                </button>
            {/each}
        </div>

        <!-- Live Matches -->
        {#if filteredLiveMatches.length > 0}
            <div style="margin-bottom:24px;">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
                    <h2 style="font-size:18px;font-weight:700;">
                        🔴 Live Matches
                    </h2>
                    <span style="font-size:12px;color:var(--color-text-muted);">
                        {filteredLiveMatches.length} matches
                    </span>
                </div>
                {#each filteredLiveMatches as match (match.id)}
                    <MatchCard {match} />
                {/each}
            </div>
        {/if}

        <!-- Upcoming Matches -->
        {#if filteredUpcomingMatches.length > 0}
            <div style="margin-bottom:24px;">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
                    <h2 style="font-size:18px;font-weight:700;">
                        📅 Upcoming
                    </h2>
                </div>
                {#each filteredUpcomingMatches as match (match.id)}
                    <MatchCard {match} />
                {/each}
            </div>
        {/if}

        <!-- Trending Bets -->
        {#if activeCategory === 'all'}
            <div style="margin-bottom:24px;">
                <h2 style="font-size:18px;font-weight:700;margin-bottom:16px;">
                    🔥 Trending Bets
                </h2>
                {#each MOCK_DATA.trendingBets as bet (bet.id)}
                    <div class="trending-bet">
                        <div class="trending-icon">{bet.icon}</div>
                        <div style="flex:1;">
                            <div style="font-weight:600;font-size:14px;">{bet.player}</div>
                            <div style="font-size:12px;color:var(--color-text-muted);">
                                {bet.team} • {bet.market}
                            </div>
                        </div>
                        <div style="text-align:right;">
                            <div style="font-weight:700;color:var(--color-primary);font-size:16px;">
                                {formatters.odds(bet.odds)}
                            </div>
                            <div style="font-size:10px;color:var(--color-text-muted);">odds</div>
                        </div>
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</div>
