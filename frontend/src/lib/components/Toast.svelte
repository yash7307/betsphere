<script>
    import { toasts, removeToast } from '$lib/stores/toast.js';

    const typeStyles = {
        success: { background: 'var(--color-success)', color: '#000' },
        error: { background: 'var(--color-danger)', color: '#fff' },
        warning: { background: 'var(--color-warning)', color: '#000' },
        info: { background: 'var(--color-info)', color: '#fff' }
    };
</script>

<div class="toast-container" style="position:fixed;top:80px;right:16px;z-index:1000;display:flex;flex-direction:column;gap:8px;max-width:400px;">
    {#each $toasts as toast (toast.id)}
        {@const style = typeStyles[toast.type] || typeStyles.info}
        <div
            style="background:{style.background};color:{style.color};padding:12px 16px;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:space-between;gap:12px;animation:slideIn 0.3s ease;min-width:250px;"
        >
            <span style="font-weight:600;font-size:14px;">{toast.message}</span>
            <button
                onclick={() => removeToast(toast.id)}
                style="background:none;border:none;color:inherit;font-size:20px;cursor:pointer;padding:0 4px;line-height:1;"
            >×</button>
        </div>
    {/each}
</div>

<style>
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
</style>
