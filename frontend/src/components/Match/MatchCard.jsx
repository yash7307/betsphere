import { useNavigate } from 'react-router-dom';
import { formatters } from '../../utils/formatters';

export default function MatchCard({ match }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/in-play/${match.id}`);
    };

    return (
        <div className="match-card" onClick={handleClick}>
            <div className="match-header">
                <div className="match-info">{match.league}</div>
                {match.status === 'LIVE' && (
                    <span className="badge badge-live">
                        <span style={{ fontSize: '8px', marginRight: '4px' }}>●</span>
                        LIVE
                    </span>
                )}
                {match.status !== 'LIVE' && (
                    <span className="badge badge-info">{match.time}</span>
                )}
            </div>

            <div className="match-teams">
                <div className="team">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '20px' }}>{match.teams.home.flag}</span>
                        <span className="team-name">{match.teams.home.name}</span>
                    </div>
                    {match.teams.home.score && (
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <span className="team-score">{match.teams.home.score}</span>
                            <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                                {match.teams.home.overs}
                            </span>
                        </div>
                    )}
                </div>

                <div className="team">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '20px' }}>{match.teams.away.flag}</span>
                        <span className="team-name">{match.teams.away.name}</span>
                    </div>
                    {match.teams.away.score && (
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <span className="team-score">{match.teams.away.score}</span>
                            <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                                {match.teams.away.overs}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            <div className="match-odds">
                <div className="odds-btn" onClick={(e) => e.stopPropagation()}>
                    <div className="odds-value">{formatters.odds(match.odds.home.back)}</div>
                    <div className="odds-label">{match.teams.home.name}</div>
                </div>
                <div className="odds-btn" onClick={(e) => e.stopPropagation()}>
                    <div className="odds-value">{formatters.odds(match.odds.away.back)}</div>
                    <div className="odds-label">{match.teams.away.name}</div>
                </div>
            </div>
        </div>
    );
}
