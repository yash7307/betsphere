<script>
    import { formatters } from '$lib/utils/formatters.js';

    let { selection = '', odds = 0, isActive = false, onclick } = $props();
</script>

<button
    class="odds-btn {isActive ? 'active' : ''}"
    onclick={onclick}
    style={isActive ? 'background:rgba(0,255,135,0.15);border-color:var(--color-primary);' : ''}
>
    <div class="odds-value">{formatters.odds(odds)}</div>
    <div class="odds-label">{selection}</div>
</button>
