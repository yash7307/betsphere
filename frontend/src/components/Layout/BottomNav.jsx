import { useNavigate, useLocation } from 'react-router-dom';

export default function BottomNav() {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        {
            id: 'home',
            path: '/',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                        strokeLinejoin="round" />
                </svg>
            ),
            label: 'Home'
        },
        {
            id: 'in-play',
            path: '/in-play',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                        fill="currentColor" />
                </svg>
            ),
            label: 'In-Play'
        },
        {
            id: 'center-fab',
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
            ),
            label: ''
        },
        {
            id: 'my-bets',
            path: '/my-bets',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M9 2C7.89543 2 7 2.89543 7 4V20C7 21.1046 7.89543 22 9 22H18C19.1046 22 20 21.1046 20 20V7L15 2H9Z"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M14 2V7H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                        strokeLinejoin="round" />
                </svg>
            ),
            label: 'My Bets'
        },
        {
            id: 'profile',
            path: '/profile',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path
                        d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            label: 'Profile'
        }
    ];

    const handleNavClick = (item) => {
        if (item.id === 'center-fab') {
            // Show quick actions menu
            // This will be implemented in App.jsx
        } else {
            navigate(item.path);
        }
    };

    return (
        <nav className="bottom-nav">
            {navItems.map((item) => (
                <button
                    key={item.id}
                    className={`nav-item ${item.id === 'center-fab' ? 'center-fab' : ''} ${location.pathname === item.path ? 'active' : ''}`}
                    onClick={() => handleNavClick(item)}
                >
                    {item.icon}
                    {item.label && <span>{item.label}</span>}
                </button>
            ))}
        </nav>
    );
}
