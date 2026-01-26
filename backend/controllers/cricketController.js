const axios = require('axios');

// Roanuz Cricket API configuration
const ROANUZ_API_BASE = 'https://api.sports.roanuz.com/v5';
const ROANUZ_API_KEY = process.env.ROANUZ_API_KEY;
const ROANUZ_PROJECT_KEY = process.env.ROANUZ_PROJECT_KEY;

// Cache for API responses (to reduce API calls)
const cache = {
    liveMatches: { data: null, timestamp: 0 },
    upcomingMatches: { data: null, timestamp: 0 }
};
const CACHE_DURATION = 30000; // 30 seconds

// Helper to make authenticated API calls
const makeApiCall = async (endpoint) => {
    try {
        const response = await axios.get(`${ROANUZ_API_BASE}${endpoint}`, {
            headers: {
                'rs-token': ROANUZ_API_KEY,
                'Content-Type': 'application/json'
            },
            params: {
                project_key: ROANUZ_PROJECT_KEY
            }
        });
        return response.data;
    } catch (error) {
        console.error('Roanuz API Error:', error.response?.data || error.message);
        throw error;
    }
};

// @desc    Get live cricket matches
// @route   GET /api/cricket/live
// @access  Public
exports.getLiveMatches = async (req, res) => {
    try {
        const now = Date.now();

        // Return cached data if fresh
        if (cache.liveMatches.data && (now - cache.liveMatches.timestamp) < CACHE_DURATION) {
            return res.status(200).json({
                success: true,
                cached: true,
                matches: cache.liveMatches.data
            });
        }

        // If no API key, return mock data
        if (!ROANUZ_API_KEY || !ROANUZ_PROJECT_KEY) {
            return res.status(200).json({
                success: true,
                mock: true,
                matches: getMockLiveMatches()
            });
        }

        const data = await makeApiCall('/cricket/matches/live');

        // Transform Roanuz response to our format
        const matches = transformMatches(data.matches || []);

        // Update cache
        cache.liveMatches = { data: matches, timestamp: now };

        res.status(200).json({
            success: true,
            count: matches.length,
            matches
        });
    } catch (error) {
        console.error('Get Live Matches Error:', error);
        // Return mock data on error
        res.status(200).json({
            success: true,
            mock: true,
            matches: getMockLiveMatches()
        });
    }
};

// @desc    Get upcoming cricket matches
// @route   GET /api/cricket/upcoming
// @access  Public
exports.getUpcomingMatches = async (req, res) => {
    try {
        const now = Date.now();

        // Return cached data if fresh
        if (cache.upcomingMatches.data && (now - cache.upcomingMatches.timestamp) < CACHE_DURATION) {
            return res.status(200).json({
                success: true,
                cached: true,
                matches: cache.upcomingMatches.data
            });
        }

        // If no API key, return mock data
        if (!ROANUZ_API_KEY || !ROANUZ_PROJECT_KEY) {
            return res.status(200).json({
                success: true,
                mock: true,
                matches: getMockUpcomingMatches()
            });
        }

        const data = await makeApiCall('/cricket/matches/upcoming');

        // Transform Roanuz response to our format
        const matches = transformMatches(data.matches || [], false);

        // Update cache
        cache.upcomingMatches = { data: matches, timestamp: now };

        res.status(200).json({
            success: true,
            count: matches.length,
            matches
        });
    } catch (error) {
        console.error('Get Upcoming Matches Error:', error);
        // Return mock data on error
        res.status(200).json({
            success: true,
            mock: true,
            matches: getMockUpcomingMatches()
        });
    }
};

// @desc    Get match details
// @route   GET /api/cricket/match/:matchKey
// @access  Public
exports.getMatchDetails = async (req, res) => {
    try {
        const { matchKey } = req.params;

        if (!matchKey) {
            return res.status(400).json({
                success: false,
                message: 'Match key is required'
            });
        }

        // If no API key, return mock data
        if (!ROANUZ_API_KEY || !ROANUZ_PROJECT_KEY) {
            return res.status(200).json({
                success: true,
                mock: true,
                match: getMockMatchDetails(matchKey)
            });
        }

        const data = await makeApiCall(`/cricket/match/${matchKey}`);

        res.status(200).json({
            success: true,
            match: data.match
        });
    } catch (error) {
        console.error('Get Match Details Error:', error);
        res.status(200).json({
            success: true,
            mock: true,
            match: getMockMatchDetails(req.params.matchKey)
        });
    }
};

// Transform Roanuz match data to our app format
function transformMatches(matches, isLive = true) {
    return matches.map((match, index) => {
        const teamA = match.teams?.a || match.team_a || {};
        const teamB = match.teams?.b || match.team_b || {};

        return {
            id: index + 1,
            matchId: match.key || match.match_key || `#M${Date.now()}${index}`,
            sport: 'cricket',
            league: match.tournament?.name || match.series?.name || 'Cricket Match',
            teams: {
                home: {
                    name: teamA.name || 'Team A',
                    score: teamA.score || '',
                    overs: teamA.overs ? `(${teamA.overs})` : '',
                    flag: getTeamFlag(teamA.name)
                },
                away: {
                    name: teamB.name || 'Team B',
                    score: teamB.score || '',
                    overs: teamB.overs ? `(${teamB.overs})` : '',
                    flag: getTeamFlag(teamB.name)
                }
            },
            odds: {
                home: { back: generateOdds(), lay: generateOdds() + 0.02 },
                away: { back: generateOdds(), lay: generateOdds() + 0.02 }
            },
            status: isLive ? 'LIVE' : match.status || 'UPCOMING',
            time: isLive ? 'Live Now' : formatMatchTime(match.start_at || match.start_date),
            venue: match.venue?.name || 'TBD'
        };
    });
}

// Get country flag emoji
function getTeamFlag(teamName) {
    const flags = {
        'India': '🇮🇳', 'Australia': '🇦🇺', 'England': '🇬🇧',
        'Pakistan': '🇵🇰', 'South Africa': '🇿🇦', 'New Zealand': '🇳🇿',
        'West Indies': '🏝️', 'Sri Lanka': '🇱🇰', 'Bangladesh': '🇧🇩',
        'Afghanistan': '🇦🇫', 'Zimbabwe': '🇿🇼', 'Ireland': '🇮🇪',
        'CSK': '🦁', 'MI': '🔵', 'RCB': '🔴', 'KKR': '🟣',
        'DC': '🔵', 'PBKS': '🔴', 'RR': '💗', 'SRH': '🟠', 'GT': '🔵', 'LSG': '🟢'
    };

    for (const [key, flag] of Object.entries(flags)) {
        if (teamName && teamName.includes(key)) return flag;
    }
    return '🏏';
}

// Generate random odds for demo
function generateOdds() {
    return Math.round((1.5 + Math.random() * 2) * 100) / 100;
}

// Format match time
function formatMatchTime(dateStr) {
    if (!dateStr) return 'TBD';
    const date = new Date(dateStr);
    const now = new Date();

    if (date.toDateString() === now.toDateString()) {
        return `Today, ${date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}`;
    }
    return date.toLocaleDateString('en-IN', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Mock data functions
function getMockLiveMatches() {
    return [
        {
            id: 1,
            matchId: '#IND2024001',
            sport: 'cricket',
            league: '2nd ODI • Mumbai Stadium',
            teams: {
                home: { name: 'India', score: '245/3', overs: '(45.1)', flag: '🇮🇳' },
                away: { name: 'Australia', score: '42.1', overs: 'Overs', flag: '🇦🇺' }
            },
            odds: { home: { back: 1.55, lay: 1.57 }, away: { back: 2.80, lay: 2.85 } },
            status: 'LIVE',
            time: 'Live Now',
            winProbability: { home: 62, away: 38 }
        },
        {
            id: 2,
            matchId: '#ENG2024001',
            sport: 'cricket',
            league: 'T20 International',
            teams: {
                home: { name: 'England', score: '156/4', overs: '(18.2)', flag: '🇬🇧' },
                away: { name: 'South Africa', score: '', overs: '', flag: '🇿🇦' }
            },
            odds: { home: { back: 1.72, lay: 1.74 }, away: { back: 2.10, lay: 2.12 } },
            status: 'LIVE',
            time: 'Live Now'
        }
    ];
}

function getMockUpcomingMatches() {
    return [
        {
            id: 3,
            matchId: '#IPL2024001',
            sport: 'cricket',
            league: 'IPL 2024',
            teams: {
                home: { name: 'Chennai Super Kings', abbr: 'CSK', flag: '🦁' },
                away: { name: 'Mumbai Indians', abbr: 'MI', flag: '🔵' }
            },
            odds: { home: { back: 1.72 }, away: { back: 2.10 } },
            status: 'TODAY',
            time: '19:30'
        },
        {
            id: 4,
            matchId: '#IPL2024002',
            sport: 'cricket',
            league: 'IPL 2024',
            teams: {
                home: { name: 'Royal Challengers', abbr: 'RCB', flag: '🔴' },
                away: { name: 'Kolkata Knight Riders', abbr: 'KKR', flag: '🟣' }
            },
            odds: { home: { back: 1.90 }, away: { back: 1.90 } },
            status: 'TOMORROW',
            time: '15:00'
        }
    ];
}

function getMockMatchDetails(matchKey) {
    return {
        matchId: matchKey,
        sport: 'cricket',
        league: 'International Cricket',
        teams: {
            home: { name: 'India', score: '245/3', overs: '(45.1)', flag: '🇮🇳' },
            away: { name: 'Australia', score: '', overs: '', flag: '🇦🇺' }
        },
        status: 'LIVE',
        venue: 'Wankhede Stadium, Mumbai'
    };
}
