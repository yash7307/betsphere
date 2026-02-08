import { useLocation, useNavigate } from 'react-router-dom';

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();

    const getTitleForPath = () => {
        const titles = {
            '/': 'BetSphere',
            '/in-play': 'Live Betting',
            '/my-bets': 'My Bets',
            '/profile': 'Profile'
        };
        return titles[location.pathname] || 'BetSphere';
    };

    const showBackButton = location.pathname.includes('/in-play/');

    return (
        <header className="top-header">
            <button
                className={`back-btn ${!showBackButton ? 'hidden' : ''}`}
                onClick={() => navigate(-1)}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                        strokeLinejoin="round" />
                </svg>
            </button>
            <h1 id="page-title">{getTitleForPath()}</h1>
            <button className="menu-btn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </button>
        </header>
    );
}
