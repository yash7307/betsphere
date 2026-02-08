import { useState } from 'react';
import { useBets } from '../../context/BetContext';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';
import Modal from '../UI/Modal';
import Button from '../UI/Button';
import { formatters } from '../../utils/formatters';
import { helpers } from '../../utils/helpers';

export default function BetSlip({ isOpen, onClose, bet }) {
    const { user } = useAuth();
    const { placeBet } = useBets();
    const { success, error: showError } = useToast();
    const [stake, setStake] = useState('');
    const [loading, setLoading] = useState(false);

    if (!bet) return null;

    const potentialReturn = stake ? helpers.calculateWinnings(parseFloat(stake), bet.odds) : 0;

    const handlePlaceBet = async () => {
        if (!stake || parseFloat(stake) <= 0) {
            showError('Please enter a valid stake amount');
            return;
        }

        if (parseFloat(stake) > user.balance) {
            showError('Insufficient balance');
            return;
        }

        setLoading(true);

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

        setLoading(false);

        if (result.success) {
            success(`Bet placed successfully! ${result.demo ? '(Demo Mode)' : ''}`);
            setStake('');
            onClose();
        } else {
            showError(result.error || 'Failed to place bet');
        }
    };

    const quickAmounts = [100, 250, 500, 1000];

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Place Bet">
            <div style={{ padding: '16px' }}>
                {/* Bet Details */}
                <div style={{
                    background: 'var(--color-background)',
                    padding: '16px',
                    borderRadius: '8px',
                    marginBottom: '16px'
                }}>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
                        {bet.match}
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '8px' }}>
                        {bet.selection}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Odds</span>
                        <span style={{ fontSize: '14px', fontWeight: 600 }}>{formatters.odds(bet.odds)}</span>
                    </div>
                </div>

                {/* Stake Input */}
                <div className="amount-input-group">
                    <label>Stake Amount (₹)</label>
                    <input
                        type="number"
                        className="amount-input"
                        placeholder="Enter amount"
                        value={stake}
                        onChange={(e) => setStake(e.target.value)}
                        min="1"
                        max={user.balance}
                    />
                    <div className="quick-amounts">
                        {quickAmounts.map(amount => (
                            <button
                                key={amount}
                                className="quick-amount-btn"
                                onClick={() => setStake(amount.toString())}
                            >
                                ₹{amount}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Potential Return */}
                {stake && (
                    <div style={{
                        background: 'rgba(0, 255, 135, 0.1)',
                        padding: '12px',
                        borderRadius: '8px',
                        marginBottom: '16px',
                        border: '1px solid rgba(0, 255, 135, 0.3)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                                Potential Return
                            </span>
                            <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-primary)' }}>
                                {formatters.currency(potentialReturn)}
                            </span>
                        </div>
                    </div>
                )}

                {/* User Balance */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '16px',
                    fontSize: '12px',
                    color: 'var(--color-text-muted)'
                }}>
                    <span>Available Balance</span>
                    <span style={{ fontWeight: 600 }}>{formatters.currency(user.balance)}</span>
                </div>

                {/* Place Bet Button */}
                <Button
                    variant="primary"
                    size="lg"
                    onClick={handlePlaceBet}
                    disabled={loading}
                    style={{ width: '100%' }}
                >
                    {loading ? 'Placing Bet...' : 'Place Bet'}
                </Button>
            </div>
        </Modal>
    );
}
