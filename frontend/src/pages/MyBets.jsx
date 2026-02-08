import { useState } from 'react';
import { useBets } from '../context/BetContext';
import { useToast } from '../context/ToastContext';
import { formatters } from '../utils/formatters';
import Button from '../components/UI/Button';

export default function MyBets() {
    const { bets, cashOut } = useBets();
    const { success, error: showError } = useToast();
    const [activeTab, setActiveTab] = useState('active');

    const activeBets = bets.filter(bet => bet.status === 'OPEN' || bet.status === 'PENDING');
    const settledBets = bets.filter(bet => bet.status === 'WON' || bet.status === 'LOST' || bet.status === 'CASHED_OUT');

    const displayBets = activeTab === 'active' ? activeBets : settledBets;

    const handleCashOut = async (betId) => {
        const result = await cashOut(betId);
        if (result.success) {
            success(`Cashed out ${formatters.currency(result.amount)}! ${result.demo ? '(Demo Mode)' : ''}`);
        } else {
            showError(result.error);
        }
    };

    return (
        <div style={{ padding: '16px' }}>
            {/* Tabs */}
            <div style={{
                display: 'flex',
                gap: '8px',
                marginBottom: '24px',
                background: 'var(--color-background)',
                borderRadius: '12px',
                padding: '4px'
            }}>
                <button
                    className={`auth-tab ${activeTab === 'active' ? 'active' : ''}`}
                    onClick={() => setActiveTab('active')}
                    style={{ flex: 1 }}
                >
                    Active ({activeBets.length})
                </button>
                <button
                    className={`auth-tab ${activeTab === 'settled' ? 'active' : ''}`}
                    onClick={() => setActiveTab('settled')}
                    style={{ flex: 1 }}
                >
                    Settled ({settledBets.length})
                </button>
            </div>

            {/* Bets List */}
            {displayBets.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '48px 16px' }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>📋</div>
                    <h3 style={{ marginBottom: '8px' }}>No {activeTab} bets</h3>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>
                        {activeTab === 'active'
                            ? 'Place your first bet to get started!'
                            : 'Your bet history will appear here'}
                    </p>
                </div>
            ) : (
                displayBets.map(bet => (
                    <div key={bet.id} className="bet-card">
                        <div className="bet-header">
                            <span className="bet-match">{bet.match}</span>
                            <span className={`badge ${formatters.betStatus(bet.status).class}`}>
                                {formatters.betStatus(bet.status).label}
                            </span>
                        </div>

                        <div className="bet-selection">{bet.selection}</div>

                        <div style={{
                            fontSize: '12px',
                            color: 'var(--color-text-muted)',
                            marginBottom: '12px'
                        }}>
                            {bet.market} • {bet.league}
                        </div>

                        <div className="bet-details">
                            <div className="bet-detail-item">
                                <span className="bet-detail-label">Stake</span>
                                <span className="bet-detail-value">{formatters.currency(bet.stake)}</span>
                            </div>
                            <div className="bet-detail-item">
                                <span className="bet-detail-label">Odds</span>
                                <span className="bet-detail-value">{formatters.odds(bet.odds)}</span>
                            </div>
                            <div className="bet-detail-item">
                                <span className="bet-detail-label">Potential Return</span>
                                <span className="bet-detail-value" style={{ color: 'var(--color-primary)' }}>
                                    {formatters.currency(bet.potentialReturn)}
                                </span>
                            </div>
                            {bet.actualReturn !== undefined && (
                                <div className="bet-detail-item">
                                    <span className="bet-detail-label">Return</span>
                                    <span className="bet-detail-value" style={{
                                        color: bet.status === 'WON' ? 'var(--color-success)' : 'var(--color-danger)'
                                    }}>
                                        {formatters.currency(bet.actualReturn)}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div style={{
                            marginTop: '12px',
                            fontSize: '11px',
                            color: 'var(--color-text-muted)'
                        }}>
                            Placed {bet.time}
                        </div>

                        {bet.canCashOut && bet.status === 'OPEN' && (
                            <div style={{ marginTop: '12px' }}>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => handleCashOut(bet.id)}
                                    style={{ width: '100%' }}
                                >
                                    Cash Out {formatters.currency(bet.cashOutValue)}
                                </Button>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}
