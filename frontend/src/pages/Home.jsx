import { useState } from 'react';
import { MOCK_DATA } from '../data/mockData';
import MatchCard from '../components/Match/MatchCard';

export default function Home() {
    const { liveMatches, upcomingMatches, trendingBets, promoData } = MOCK_DATA;
    const [activeCategory, setActiveCategory] = useState('all');

    return (
        <div style={{ padding: '16px' }}>
            {/* Promo Banner */}
            <div style={{
                background: promoData.image,
                borderRadius: '16px',
                padding: '24px',
                marginBottom: '24px',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        background: 'rgba(0,0,0,0.3)',
                        borderRadius: '20px',
                        fontSize: '11px',
                        fontWeight: 600,
                        marginBottom: '8px'
                    }}>
                        PROMO
                    </div>
                    <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px' }}>
                        {promoData.title}
                    </h2>
                    <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.9)', marginBottom: '16px' }}>
                        {promoData.description}
                    </p>
                    <button className="btn btn-primary" style={{ background: 'white', color: '#0f4c38', fontWeight: 700 }}>
                        {promoData.ctaText}
                    </button>
                </div>
            </div>

            {/* Categories */}
            <div style={{
                display: 'flex',
                gap: '8px',
                marginBottom: '24px',
                overflowX: 'auto'
            }}>
                {['all', 'live', 'upcoming', 'ipl'].map(cat => (
                    <button
                        key={cat}
                        className={`category-btn ${activeCategory === cat ? 'active' : ''}`}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '20px',
                            background: activeCategory === cat ? 'var(--color-primary)' : 'var(--color-surface)',
                            color: activeCategory === cat ? '#000' : 'var(--color-text-primary)',
                            fontWeight: 600,
                            fontSize: '14px',
                            whiteSpace: 'nowrap',
                            border: activeCategory === cat ? 'none' : '1px solid var(--color-border)'
                        }}
                        onClick={() => setActiveCategory(cat)}
                    >
                        {cat === 'all' && '🏏 All'}
                        {cat === 'live' && '🔴 Live'}
                        {cat === 'upcoming' && 'Upcoming'}
                        {cat === 'ipl' && 'IPL 2024'}
                    </button>
                ))}
            </div>

            {/* Live Matches */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700 }}>
                    Live Matches <span className="badge badge-live" style={{ marginLeft: '8px' }}>{liveMatches.length}</span>
                </h3>
                <a href="#" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-primary)' }}>See All</a>
            </div>

            {liveMatches.map(match => (
                <MatchCard key={match.id} match={match} />
            ))}

            {/* Upcoming Matches */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '32px 0 16px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Upcoming Matches</h3>
            </div>

            {upcomingMatches.map(match => (
                <MatchCard key={match.id} match={match} />
            ))}

            {/* Trending Bets */}
            <div style={{ margin: '32px 0 16px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Trending Bets 🔥</h3>
            </div>

            <div style={{ display: 'grid', gap: '12px', marginBottom: '24px' }}>
                {trendingBets.map(bet => (
                    <div key={bet.id} className="card" style={{ padding: '16px', cursor: 'pointer' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ fontSize: '32px' }}>{bet.icon}</div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 700, fontSize: '16px', marginBottom: '2px' }}>
                                    {bet.player}
                                </div>
                                <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                                    {bet.team} • {bet.market}
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div className="odds-value" style={{ fontSize: '24px' }}>
                                    {bet.odds.toFixed(2)}
                                </div>
                                <div style={{ fontSize: '10px', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                                    odds
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
