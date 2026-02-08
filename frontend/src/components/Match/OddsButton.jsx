import { formatters } from '../../utils/formatters';

export default function OddsButton({ selection, odds, onClick, isActive }) {
    return (
        <button
            className={`odds-btn ${isActive ? 'active' : ''}`}
            onClick={onClick}
            style={isActive ? {
                background: 'rgba(0, 255, 135, 0.15)',
                borderColor: 'var(--color-primary)'
            } : {}}
        >
            <div className="odds-value">{formatters.odds(odds)}</div>
            <div className="odds-label">{selection}</div>
        </button>
    );
}
