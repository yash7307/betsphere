<script>
    import { bets, cashOut } from '$lib/stores/bets.js';
    import { success, error as showError } from '$lib/stores/toast.js';
    import { formatters } from '$lib/utils/formatters.js';

    let activeTab = $state('active');

    let activeBets = $derived($bets.filter(b => b.status === 'OPEN' || b.status === 'PENDING'));
    let settledBets = $derived($bets.filter(b => b.status === 'WON' || b.status === 'LOST' || b.status === 'CASHED_OUT'));

    async function handleCashOut(betId) {
        const result = await cashOut(betId);
        if (result.success) {
            success(`Cashed out ${formatters.currency(result.amount)}! ${result.demo ? '(Demo)' : ''}`);
        } else {
            showError(result.error || 'Cash out failed');
        }
    }
</script>

<div class="my-bets-page">
    <div class="bets-tabs">
        <button class="bet-tab {activeTab === 'active' ? 'active' : ''}" onclick={() => activeTab = 'active'}>
            Active ({activeBets.length})
        </button>
        <button class="bet-tab {activeTab === 'settled' ? 'active' : ''}" onclick={() => activeTab = 'settled'}>
            Settled ({settledBets.length})
        </button>
    </div>

    {#if activeTab === 'active'}
        {#if activeBets.length === 0}
            <div style="text-align:center;padding:48px;color:var(--color-text-muted);">
                <p style="font-size:48px;margin-bottom:16px;">📋</p>
                <p>No active bets</p>
            </div>
        {:else}
            {#each activeBets as bet (bet.id)}
                <div class="bet-card">
                    <div class="bet-header">
                        <span class="bet-match">{bet.match}</span>
                        <span class="badge {formatters.betStatus(bet.status).class}">{formatters.betStatus(bet.status).label}</span>
                    </div>
                    <div class="bet-selection">{bet.selection}</div>
                    <div style="font-size:12px;color:var(--color-text-muted);margin-bottom:8px;">{bet.market}</div>
                    <div class="bet-details">
                        <div class="bet-detail-item">
                            <span class="bet-detail-label">Stake</span>
                            <span class="bet-detail-value">{formatters.currency(bet.stake)}</span>
                        </div>
                        <div class="bet-detail-item">
                            <span class="bet-detail-label">Odds</span>
                            <span class="bet-detail-value">{formatters.odds(bet.odds)}</span>
                        </div>
                        <div class="bet-detail-item">
                            <span class="bet-detail-label">Potential Return</span>
                            <span class="bet-detail-value text-success">{formatters.currency(bet.potentialReturn)}</span>
                        </div>
                        <div class="bet-detail-item">
                            <span class="bet-detail-label">Placed</span>
                            <span class="bet-detail-value" style="font-size:12px;">{bet.time}</span>
                        </div>
                    </div>
                    {#if bet.canCashOut}
                        <button class="btn btn-primary" style="width:100%;margin-top:16px;" onclick={() => handleCashOut(bet.id)}>
                            Cash Out {formatters.currency(bet.cashOutValue)}
                        </button>
                    {/if}
                </div>
            {/each}
        {/if}
    {:else}
        {#if settledBets.length === 0}
            <div style="text-align:center;padding:48px;color:var(--color-text-muted);">
                <p style="font-size:48px;margin-bottom:16px;">📋</p>
                <p>No settled bets</p>
            </div>
        {:else}
            {#each settledBets as bet (bet.id)}
                <div class="bet-card">
                    <div class="bet-header">
                        <span class="bet-match">{bet.match}</span>
                        <span class="badge {formatters.betStatus(bet.status).class}">{formatters.betStatus(bet.status).label}</span>
                    </div>
                    <div class="bet-selection">{bet.selection}</div>
                    <div class="bet-details">
                        <div class="bet-detail-item">
                            <span class="bet-detail-label">Stake</span>
                            <span class="bet-detail-value">{formatters.currency(bet.stake)}</span>
                        </div>
                        <div class="bet-detail-item">
                            <span class="bet-detail-label">Odds</span>
                            <span class="bet-detail-value">{formatters.odds(bet.odds)}</span>
                        </div>
                        <div class="bet-detail-item">
                            <span class="bet-detail-label">Return</span>
                            <span class="bet-detail-value {bet.status === 'WON' ? 'text-success' : 'text-danger'}">
                                {formatters.currency(bet.actualReturn || 0)}
                            </span>
                        </div>
                        <div class="bet-detail-item">
                            <span class="bet-detail-label">Settled</span>
                            <span class="bet-detail-value" style="font-size:12px;">{bet.time}</span>
                        </div>
                    </div>
                </div>
            {/each}
        {/if}
    {/if}
</div>
