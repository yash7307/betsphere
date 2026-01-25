// Mock Cricket Data
const MOCK_DATA = {
    user: {
        id: 1,
        name: 'Rahul Sharma',
        username: '@rahul_cricket99',
        email: 'rahul_99@gmail.com',
        phone: '+91 98765 43210',
        balance: 2450.50,
        openBets: 4,
        avatar: 'https://ui-avatars.com/api/?name=Rahul+Sharma&background=00ff87&color=000',
        kycVerified: true,
        kycLevel: 2
    },

    liveMatches: [
        {
            id: 1,
            matchId: '#BB20162',
            sport: 'cricket',
            league: '2nd ODI • Mumbai Stadium',
            teams: {
                home: { name: 'India', score: '245/3', overs: '(45.1)', flag: '🇮🇳' },
                away: { name: 'Australia', score: '42.1', overs: 'Overs', flag: '🇦🇺' }
            },
            odds: {
                home: { back: 1.55, lay: 1.57 },
                away: { back: 2.80, lay: 2.85 }
            },
            status: 'LIVE',
            time: 'Live Now',
            matchWinner: 'India',
            sessionRuns: 'Mid 12-15',
            topBatsman: 'Virat Kohli',
            winProbability: { home: 62, away: 38 },
            targetProjection: '285-295',
            runRate: { current: 5.4, required: 6.2 }
        },
        {
            id: 2,
            matchId: '#BB20163',
            sport: 'cricket',
            league: '3rd ODI • Ahmedabad',
            teams: {
                home: { name: 'India', score: '', overs: '', flag: '🇮🇳' },
                away: { name: 'Australia', score: '', overs: '', flag: '🇦🇺' }
            },
            odds: {
                home: { back: 1.55, lay: 1.57 },
                away: { back: 2.80, lay: 2.85 }
            },
            status: 'LIVE',
            time: 'Yes 13 bat'
        }
    ],

    upcomingMatches: [
        {
            id: 3,
            matchId: '#CSK2024',
            sport: 'cricket',
            league: 'IPL 2024',
            teams: {
                home: { name: 'Chennai Super Kings', abbr: 'CSK', flag: '🦁' },
                away: { name: 'Mumbai Indians', abbr: 'MI', flag: '🔵' }
            },
            odds: {
                home: { back: 1.72 },
                away: { back: 2.10 }
            },
            status: 'TODAY',
            time: '19:30'
        },
        {
            id: 4,
            matchId: '#RCB2024',
            sport: 'cricket',
            league: 'IPL 2024',
            teams: {
                home: { name: 'Royal Challengers', abbr: 'RCB', flag: '🔴' },
                away: { name: 'Kolkata Riders', abbr: 'KKR', flag: '🟣' }
            },
            odds: {
                home: { back: 1.90 },
                away: { back: 1.90 }
            },
            status: 'FRIDAY',
            time: '15:00'
        }
    ],

    trendingBets: [
        {
            id: 1,
            player: 'Virat Kohli',
            team: 'vs Australia',
            market: 'Highest Run Scorer',
            odds: 3.50,
            icon: '🏏'
        },
        {
            id: 2,
            player: 'Jasprit Bumrah',
            team: 'vs Australia',
            market: 'Top Wicket Taker',
            odds: 4.20,
            icon: '⚡'
        }
    ],

    myBets: [
        {
            id: 1,
            matchId: '#BB20162',
            match: 'India vs Australia',
            league: '2nd ODI',
            selection: 'India',
            market: 'Match Winner',
            odds: 1.55,
            stake: 500,
            potentialReturn: 775,
            status: 'OPEN',
            canCashOut: true,
            cashOutValue: 562.50,
            placedAt: new Date('2026-01-18T14:30:00'),
            time: 'Today, 14:30'
        },
        {
            id: 2,
            matchId: '#BB20160',
            match: 'England vs New Zealand',
            league: '1st Innings Runs',
            selection: 'England (Over 50.5 Runs)',
            market: '1st Innings Runs',
            odds: 1.90,
            stake: 750,
            potentialReturn: 1425,
            status: 'PENDING',
            canCashOut: false,
            placedAt: new Date('2026-01-18T12:00:00'),
            time: 'Today, 14:30'
        },
        {
            id: 3,
            matchId: '#BB20155',
            match: 'Pakistan vs Bangladesh',
            league: 'T20 World Cup',
            selection: 'Pakistan',
            market: 'Match Winner',
            odds: 1.45,
            stake: 1000,
            potentialReturn: 1450,
            actualReturn: 1450,
            status: 'WON',
            settledAt: new Date('2026-01-17T20:00:00'),
            time: 'Yesterday, 20:00'
        },
        {
            id: 4,
            matchId: '#BB20150',
            match: 'Sri Lanka vs West Indies',
            league: 'ODI Series',
            selection: 'West Indies',
            market: 'Match Winner',
            odds: 2.10,
            stake: 300,
            potentialReturn: 630,
            actualReturn: 0,
            status: 'LOST',
            settledAt: new Date('2026-01-16T18:30:00'),
            time: 'Jan 16, 18:30'
        }
    ],

    transactions: [
        {
            id: 1,
            type: 'DEPOSIT',
            amount: 5000,
            method: 'UPI',
            status: 'SUCCESS',
            date: new Date('2026-01-18T10:00:00'),
            txnId: 'TXN1234567890'
        },
        {
            id: 2,
            type: 'WITHDRAWAL',
            amount: 2000,
            method: 'Bank Transfer',
            status: 'PENDING',
            date: new Date('2026-01-17T15:30:00'),
            txnId: 'TXN0987654321'
        }
    ],

    promoData: {
        title: 'IPL 2024 Mega Contest',
        description: 'Win up to ₹10,000 every match!',
        image: 'linear-gradient(135deg, #0f4c38 0%, #1a7553 100%)',
        ctaText: 'Join Now',
        ctaLink: '#promo'
    }
};

// Export for use in other files
if (typeof window !== 'undefined') {
    window.MOCK_DATA = MOCK_DATA;
}
