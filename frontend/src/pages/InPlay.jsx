import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MOCK_DATA } from '../data/mockData';
import BetSlip from '../components/BetSlip/BetSlip';
import OddsButton from '../components/Match/OddsButton';

export default function InPlay() {
    const { matchId } = useParams();
    const [betSlipOpen, setBetSlipOpen] = useState(false);
    const [selectedBet, setSelectedBet] = useState(null);

    // Get match data (in real app, would fetch from API)
    const match = MOCK_DATA.liveMatches[0]; // Default to first live match

    const handlePlaceBet = (selection, odds) => {
        setSelectedBet({
            matchId: match.matchId,
            match: `${match.teams.home.name} vs ${match.teams.away.name}`,
            league: match.league,
            selection,
            market: 'Match Winner',
            odds
        });
        setBetSlipOpen(true);
    };

    return (
        <div style={{ padding: '16px' }}>
            {/* Match Info Card */}
            <div className="card" style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span className="badge badge-live">● LIVE</span>
                    <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{match.matchId}</span>
                </div>
                <div style={{ fontSize: '14px', color: 'var(--color-text-muted)', marginBottom: '12px' }}>
                    {match.league}
                </div>

                {/* Teams and Scores */}
                <div style={{ display: 'grid', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '24px' }}>{match.teams.home.flag}</span>
                            <span style={{ fontWeight: 600, fontSize: '16px' }}>{match.teams.home.name}</span>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-primary)' }}>
                                {match.teams.home.score}
                            </div>
                            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                                {match.teams.home.overs}
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '24px' }}>{match.teams.away.flag}</span>
                            <span style={{ fontWeight: 600, fontSize: '16px' }}>{match.teams.away.name}</span>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-primary)' }}>
                                {match.teams.away.score}
                            </div>
                            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                                {match.teams.away.overs}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Match Winner Market */}
            <div className="card" style={{ marginBottom: '16px' }}>
                <h4 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: 700 }}>Match Winner</h4>
                <div style={{ display: 'grid', gap: '12px' }}>
                    <OddsButton
                        selection={match.teams.home.name}
                        odds={match.odds.home.back}
                        onClick={() => handlePlaceBet(match.teams.home.name, match.odds.home.back)}
                    />
                    <OddsButton
                        selection={match.teams.away.name}
                        odds={match.odds.away.back}
                        onClick={() => handlePlaceBet(match.teams.away.name, match.odds.away.back)}
                    />
                </div>
            </div>

            {/* Session Runs */}
            <div className="card" style={{ marginBottom: '16px' }}>
                <h4 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: 700 }}>Session Runs</h4>
                <div style={{ padding: '12px', background: 'var(--color-background)', borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-primary)' }}>
                        {match.sessionRuns}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                        Current Session
                    </div>
                </div>
            </div>

            {/* Match Stats */}
            <div className="card">
                <h4 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: 700 }}>Match Stats</h4>
                <div style={{ display: 'grid', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>Top Batsman</span>
                        <span style={{ fontWeight: 600, fontSize: '14px' }}>{match.topBatsman}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>Current Run Rate</span>
                        <span style={{ fontWeight: 600, fontSize: '14px' }}>{match.runRate.current}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>Required Run Rate</span>
                        <span style={{ fontWeight: 600, fontSize: '14px' }}>{match.runRate.required}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>Target Projection</span>
                        <span style={{ fontWeight: 600, fontSize: '14px' }}>{match.targetProjection}</span>
                    </div>
                </div>
            </div>

            <BetSlip
                isOpen={betSlipOpen}
                onClose={() => setBetSlipOpen(false)}
                bet={selectedBet}
            />
        </div>
    );
}
