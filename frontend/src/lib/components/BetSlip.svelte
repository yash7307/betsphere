<script>
    import Modal from './Modal.svelte';
    import Button from './Button.svelte';
    import { user } from '$lib/stores/auth.js';
    import { placeBet } from '$lib/stores/bets.js';
    import { success, error as showError } from '$lib/stores/toast.js';
    import { formatters } from '$lib/utils/formatters.js';
    import { helpers } from '$lib/utils/helpers.js';

    let { isOpen = false, bet = null, onclose } = $props();

    let stake = $state('');
    let loading = $state(false);

    let potentialReturn = $derived(stake ? helpers.calculateWinnings(parseFloat(stake), bet?.odds || 0) : 0);

    const quickAmounts = [100, 250, 500, 1000];

    async function handlePlaceBet() {
        if (!stake || parseFloat(stake) <= 0) {
            showError('Please enter a valid stake amount');
            return;
        }

        if (parseFloat(stake) > $user.balance) {
            showError('Insufficient balance');
            return;
        }

        loading = true;

        const betData = {
            matchId: bet.matchId,
            match: bet.match,
            league: bet.league,
            selection: bet.selection,
            market: bet.market || 'Match Winner',
            odds: bet.odds,
            stake: parseFloat(stake),
            potentialReturn
        };

        const result = await placeBet(betData);

        loading = false;

        if (result.success) {
            success(`Bet placed successfully! ${result.demo ? '(Demo Mode)' : ''}`);
            stake = '';
            if (onclose) onclose();
        } else {
            showError(result.error || 'Failed to place bet');
        }
    }
</script>

{#if bet}
    <Modal {isOpen} title="Place Bet" {onclose}>
        <div style="padding:16px;">
            <!-- Bet Details -->
            <div style="background:var(--color-background);padding:16px;border-radius:8px;margin-bottom:16px;">
                <div style="font-size:12px;color:var(--color-text-muted);margin-bottom:4px;">
                    {bet.match}
                </div>
                <div style="font-size:16px;font-weight:600;color:var(--color-primary);margin-bottom:8px;">
                    {bet.selection}
                </div>
                <div style="display:flex;justify-content:space-between;">
                    <span style="font-size:12px;color:var(--color-text-secondary);">Odds</span>
                    <span style="font-size:14px;font-weight:600;">{formatters.odds(bet.odds)}</span>
                </div>
            </div>

            <!-- Stake Input -->
            <div class="amount-input-group">
                <label for="stake-input">Stake Amount (₹)</label>
                <input
                    id="stake-input"
                    type="number"
                    class="amount-input"
                    placeholder="Enter amount"
                    bind:value={stake}
                    min="1"
                    max={$user.balance}
                />
                <div class="quick-amounts">
                    {#each quickAmounts as amount}
                        <button
                            class="quick-amount-btn"
                            onclick={() => stake = amount.toString()}
                        >
                            ₹{amount}
                        </button>
                    {/each}
                </div>
            </div>

            <!-- Potential Return -->
            {#if stake}
                <div style="background:rgba(0,255,135,0.1);padding:12px;border-radius:8px;margin-bottom:16px;border:1px solid rgba(0,255,135,0.3);">
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                        <span style="font-size:14px;color:var(--color-text-secondary);">
                            Potential Return
                        </span>
                        <span style="font-size:18px;font-weight:700;color:var(--color-primary);">
                            {formatters.currency(potentialReturn)}
                        </span>
                    </div>
                </div>
            {/if}

            <!-- User Balance -->
            <div style="display:flex;justify-content:space-between;margin-bottom:16px;font-size:12px;color:var(--color-text-muted);">
                <span>Available Balance</span>
                <span style="font-weight:600;">{formatters.currency($user.balance)}</span>
            </div>

            <!-- Place Bet Button -->
            <Button variant="primary" size="lg" onclick={handlePlaceBet} disabled={loading} style="width:100%;">
                {#snippet children()}
                    {loading ? 'Placing Bet...' : 'Place Bet'}
                {/snippet}
            </Button>
        </div>
    </Modal>
{/if}
