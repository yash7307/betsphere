<script>
    import { user, logout } from '$lib/stores/auth.js';
    import { success } from '$lib/stores/toast.js';
    import { formatters } from '$lib/utils/formatters.js';
    import { MOCK_DATA } from '$lib/data/mockData.js';

    function handleLogout() {
        success('Logged out successfully');
        logout();
    }
</script>

<div class="profile-page">
    <!-- Profile Header -->
    <div class="profile-header">
        <div class="profile-avatar">
            <img src={$user?.avatar || `https://ui-avatars.com/api/?name=${$user?.name || 'User'}&background=00ff87&color=000`} alt="Avatar" />
        </div>
        <h2 style="font-size:20px;font-weight:700;">{$user?.name || 'User'}</h2>
        <p style="font-size:14px;color:var(--color-text-muted);">{$user?.username || ''}</p>
    </div>

    <!-- Balance Card -->
    <div class="balance-card">
        <div style="font-size:12px;color:var(--color-text-secondary);margin-bottom:4px;">Total Balance</div>
        <div style="font-size:32px;font-weight:800;color:var(--color-primary);">
            {formatters.currency($user?.balance || 0)}
        </div>
        <div style="display:flex;gap:8px;margin-top:16px;justify-content:center;">
            <button class="btn btn-primary btn-sm">Deposit</button>
            <button class="btn btn-secondary btn-sm">Withdraw</button>
        </div>
    </div>

    <!-- Stats Grid -->
    <div class="stats-grid">
        <div class="stat-item">
            <div class="stat-value">{$user?.openBets || 0}</div>
            <div class="stat-label">Open Bets</div>
        </div>
        <div class="stat-item">
            <div class="stat-value">12</div>
            <div class="stat-label">Won</div>
        </div>
        <div class="stat-item">
            <div class="stat-value">67%</div>
            <div class="stat-label">Win Rate</div>
        </div>
    </div>

    <!-- Account Details -->
    <div style="margin-bottom:24px;">
        <h3 style="font-size:16px;font-weight:700;margin-bottom:16px;">Account Details</h3>
        <div class="card">
            <div style="display:flex;justify-content:space-between;padding:12px 0;border-bottom:1px solid var(--color-border);">
                <span style="color:var(--color-text-muted);font-size:14px;">Email</span>
                <span style="font-weight:500;font-size:14px;">{$user?.email || 'N/A'}</span>
            </div>
            <div style="display:flex;justify-content:space-between;padding:12px 0;border-bottom:1px solid var(--color-border);">
                <span style="color:var(--color-text-muted);font-size:14px;">Phone</span>
                <span style="font-weight:500;font-size:14px;">{$user?.phone || 'N/A'}</span>
            </div>
            <div style="display:flex;justify-content:space-between;padding:12px 0;">
                <span style="color:var(--color-text-muted);font-size:14px;">KYC Status</span>
                <span class="badge {$user?.kycVerified ? 'badge-success' : 'badge-pending'}">
                    {$user?.kycVerified ? 'Verified' : 'Pending'}
                </span>
            </div>
        </div>
    </div>

    <!-- Recent Transactions -->
    <div style="margin-bottom:24px;">
        <h3 style="font-size:16px;font-weight:700;margin-bottom:16px;">Recent Transactions</h3>
        {#each MOCK_DATA.transactions as txn (txn.id)}
            <div class="card" style="margin-bottom:8px;">
                <div style="display:flex;justify-content:space-between;align-items:center;">
                    <div>
                        <div style="font-weight:600;font-size:14px;">{txn.type}</div>
                        <div style="font-size:12px;color:var(--color-text-muted);">{txn.method} • {formatters.date(txn.date)}</div>
                    </div>
                    <div style="text-align:right;">
                        <div style="font-weight:700;color:{txn.type === 'DEPOSIT' ? 'var(--color-success)' : 'var(--color-danger)'};">
                            {txn.type === 'DEPOSIT' ? '+' : '-'}{formatters.currency(txn.amount)}
                        </div>
                        <div style="font-size:10px;color:var(--color-text-muted);">{txn.status}</div>
                    </div>
                </div>
            </div>
        {/each}
    </div>

    <!-- Logout Button -->
    <button class="btn btn-danger btn-lg" style="width:100%;" onclick={handleLogout}>
        Logout
    </button>
</div>
