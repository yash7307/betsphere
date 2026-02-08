import { useAuth } from '../context/AuthContext';
import { formatters } from '../utils/formatters';
import { MOCK_DATA } from '../data/mockData';
import Button from '../components/UI/Button';

export default function Profile() {
    const { user, logout } = useAuth();

    const stats = [
        { label: 'Total Bets', value: MOCK_DATA.myBets.length, icon: '📊' },
        { label: 'Win Rate', value: '62%', icon: '🎯' },
        { label: 'Total Winnings', value: formatters.currency(1450), icon: '💰' },
        { label: 'KYC Level', value: `Level ${user.kycLevel}`, icon: user.kycVerified ? '✅' : '⏳' }
    ];

    const transactions = MOCK_DATA.transactions;

    return (
        <div style={{ padding: '16px' }}>
            {/* Profile Header */}
            <div className="card" style={{ marginBottom: '16px', textAlign: 'center' }}>
                <img
                    src={user.avatar}
                    alt={user.name}
                    style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        marginBottom: '12px',
                        border: '3px solid var(--color-primary)'
                    }}
                />
                <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '4px' }}>{user.name}</h2>
                <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', marginBottom: '12px' }}>
                    {user.username}
                </p>

                {/* Balance */}
                <div style={{
                    background: 'var(--color-background)',
                    padding: '16px',
                    borderRadius: '12px',
                    marginTop: '16px'
                }}>
                    <div style={{
                        fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '4px'
                    }}>
                        Available Balance
                    </div>
                    <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--color-primary)' }}>
                        {formatters.currency(user.balance)}
                    </div>
                    <Button variant="primary" size="sm" style={{ marginTop: '12px', width: '100%' }}>
                        Add Funds
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                {stats.map((stat, index) => (
                    <div key={index} className="card" style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '24px', marginBottom: '8px' }}>{stat.icon}</div>
                        <div style={{ fontSize: '18px', fontWeight: 700, marginBottom: '4px' }}>{stat.value}</div>
                        <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Account Info */}
            <div className="card" style={{ marginBottom: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>Account Information</h3>
                <div style={{ display: 'grid', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>Email</span>
                        <span style={{ fontWeight: 600, fontSize: '14px' }}>{user.email}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>Phone</span>
                        <span style={{ fontWeight: 600, fontSize: '14px' }}>{user.phone}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>Open Bets</span>
                        <span style={{ fontWeight: 600, fontSize: '14px' }}>{user.openBets}</span>
                    </div>
                </div>
            </div>

            {/* Recent Transactions */}
            <div className="card" style={{ marginBottom: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>Recent Transactions</h3>
                <div style={{ display: 'grid', gap: '12px' }}>
                    {transactions.map(txn => (
                        <div key={txn.id} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '12px',
                            background: 'var(--color-background)',
                            borderRadius: '8px'
                        }}>
                            <div>
                                <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '4px' }}>
                                    {txn.type}
                                </div>
                                <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                                    {txn.method} • {txn.txnId}
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{
                                    fontWeight: 700,
                                    fontSize: '16px',
                                    color: txn.type === 'DEPOSIT' ? 'var(--color-success)' : 'var(--color-danger)'
                                }}>
                                    {txn.type === 'DEPOSIT' ? '+' : '-'}{formatters.currency(txn.amount)}
                                </div>
                                <span className={`badge badge-${txn.status === 'SUCCESS' ? 'success' : 'pending'}`}
                                    style={{ fontSize: '10px', marginTop: '4px' }}>
                                    {txn.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Logout Button */}
            <Button variant="danger" onClick={logout} style={{ width: '100%' }}>
                Logout
            </Button>
        </div>
    );
}
