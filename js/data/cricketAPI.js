// Cricket API Integration
// Fetches live match data from backend, falls back to mock data

const CricketAPI = {
    baseUrl: 'http://localhost:5000/api/cricket',

    // Fetch live matches
    async getLiveMatches() {
        try {
            const response = await fetch(`${this.baseUrl}/live`);
            const data = await response.json();

            if (data.success && data.matches) {
                return data.matches;
            }
            return null;
        } catch (error) {
            console.log('Using mock data for live matches');
            return null;
        }
    },

    // Fetch upcoming matches
    async getUpcomingMatches() {
        try {
            const response = await fetch(`${this.baseUrl}/upcoming`);
            const data = await response.json();

            if (data.success && data.matches) {
                return data.matches;
            }
            return null;
        } catch (error) {
            console.log('Using mock data for upcoming matches');
            return null;
        }
    },

    // Fetch match details
    async getMatchDetails(matchKey) {
        try {
            const response = await fetch(`${this.baseUrl}/match/${matchKey}`);
            const data = await response.json();

            if (data.success && data.match) {
                return data.match;
            }
            return null;
        } catch (error) {
            console.log('Using mock data for match details');
            return null;
        }
    },

    // Update MOCK_DATA with live data
    async refreshData() {
        const [liveMatches, upcomingMatches] = await Promise.all([
            this.getLiveMatches(),
            this.getUpcomingMatches()
        ]);

        if (liveMatches) {
            MOCK_DATA.liveMatches = liveMatches;
        }

        if (upcomingMatches) {
            MOCK_DATA.upcomingMatches = upcomingMatches;
        }

        return { liveMatches, upcomingMatches };
    }
};

// Auto-refresh data every 30 seconds
setInterval(() => {
    CricketAPI.refreshData();
}, 30000);

// Initial data fetch
document.addEventListener('DOMContentLoaded', () => {
    CricketAPI.refreshData();
});

// Export
if (typeof window !== 'undefined') {
    window.CricketAPI = CricketAPI;
}
