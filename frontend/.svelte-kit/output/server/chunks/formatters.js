const helpers = {
  // Storage utilities
  storage: {
    get: (key) => {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      } catch (error) {
        console.error("Error reading from localStorage:", error);
        return null;
      }
    },
    set: (key, value) => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error("Error writing to localStorage:", error);
      }
    },
    remove: (key) => {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error("Error removing from localStorage:", error);
      }
    }
  },
  // Number formatting
  formatCurrency: (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2
    }).format(amount);
  },
  formatNumber: (num) => {
    return new Intl.NumberFormat("en-IN").format(num);
  },
  // Date formatting
  formatDate: (date) => {
    const d = new Date(date);
    const now = /* @__PURE__ */ new Date();
    const diff = now - d;
    const days = Math.floor(diff / (1e3 * 60 * 60 * 24));
    if (days === 0) {
      const hours = Math.floor(diff / (1e3 * 60 * 60));
      if (hours === 0) {
        const minutes = Math.floor(diff / (1e3 * 60));
        return minutes === 0 ? "Just now" : `${minutes}m ago`;
      }
      return `${hours}h ago`;
    }
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  },
  formatTime: (date) => {
    return new Date(date).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });
  },
  // Validation
  validateEmail: (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },
  validatePhone: (phone) => {
    const re = /^[6-9]\d{9}$/;
    return re.test(phone.replace(/\s+/g, ""));
  },
  // Calculate potential winnings
  calculateWinnings: (stake, odds) => {
    return stake * odds;
  },
  // Odds formatting
  formatOdds: (odds) => {
    return parseFloat(odds).toFixed(2);
  }
};
const MOCK_DATA = {
  liveMatches: [
    {
      id: 1,
      matchId: "#BB20162",
      sport: "cricket",
      league: "2nd ODI • Mumbai Stadium",
      teams: {
        home: { name: "India", score: "245/3", overs: "(45.1)", flag: "🇮🇳" },
        away: { name: "Australia", score: "42.1", overs: "Overs", flag: "🇦🇺" }
      },
      odds: {
        home: { back: 1.55, lay: 1.57 },
        away: { back: 2.8, lay: 2.85 }
      },
      status: "LIVE",
      time: "Live Now",
      matchWinner: "India",
      sessionRuns: "Mid 12-15",
      topBatsman: "Virat Kohli",
      winProbability: { home: 62, away: 38 },
      targetProjection: "285-295",
      runRate: { current: 5.4, required: 6.2 }
    },
    {
      id: 2,
      matchId: "#BB20163",
      sport: "cricket",
      league: "3rd ODI • Ahmedabad",
      teams: {
        home: { name: "India", score: "", overs: "", flag: "🇮🇳" },
        away: { name: "Australia", score: "", overs: "", flag: "🇦🇺" }
      },
      odds: {
        home: { back: 1.55, lay: 1.57 },
        away: { back: 2.8, lay: 2.85 }
      },
      status: "LIVE",
      time: "Yes 13 bat"
    }
  ],
  upcomingMatches: [
    {
      id: 3,
      matchId: "#CSK2024",
      sport: "cricket",
      league: "IPL 2024",
      teams: {
        home: { name: "Chennai Super Kings", abbr: "CSK", flag: "🦁" },
        away: { name: "Mumbai Indians", abbr: "MI", flag: "🔵" }
      },
      odds: {
        home: { back: 1.72 },
        away: { back: 2.1 }
      },
      status: "TODAY",
      time: "19:30"
    },
    {
      id: 4,
      matchId: "#RCB2024",
      sport: "cricket",
      league: "IPL 2024",
      teams: {
        home: { name: "Royal Challengers", abbr: "RCB", flag: "🔴" },
        away: { name: "Kolkata Riders", abbr: "KKR", flag: "🟣" }
      },
      odds: {
        home: { back: 1.9 },
        away: { back: 1.9 }
      },
      status: "FRIDAY",
      time: "15:00"
    }
  ],
  trendingBets: [
    {
      id: 1,
      player: "Virat Kohli",
      team: "vs Australia",
      market: "Highest Run Scorer",
      odds: 3.5,
      icon: "🏏"
    },
    {
      id: 2,
      player: "Jasprit Bumrah",
      team: "vs Australia",
      market: "Top Wicket Taker",
      odds: 4.2,
      icon: "⚡"
    }
  ],
  myBets: [
    {
      id: 1,
      matchId: "#BB20162",
      match: "India vs Australia",
      league: "2nd ODI",
      selection: "India",
      market: "Match Winner",
      odds: 1.55,
      stake: 500,
      potentialReturn: 775,
      status: "OPEN",
      canCashOut: true,
      cashOutValue: 562.5,
      placedAt: /* @__PURE__ */ new Date("2026-01-18T14:30:00"),
      time: "Today, 14:30"
    },
    {
      id: 2,
      matchId: "#BB20160",
      match: "England vs New Zealand",
      league: "1st Innings Runs",
      selection: "England (Over 50.5 Runs)",
      market: "1st Innings Runs",
      odds: 1.9,
      stake: 750,
      potentialReturn: 1425,
      status: "PENDING",
      canCashOut: false,
      placedAt: /* @__PURE__ */ new Date("2026-01-18T12:00:00"),
      time: "Today, 14:30"
    },
    {
      id: 3,
      matchId: "#BB20155",
      match: "Pakistan vs Bangladesh",
      league: "T20 World Cup",
      selection: "Pakistan",
      market: "Match Winner",
      odds: 1.45,
      stake: 1e3,
      potentialReturn: 1450,
      actualReturn: 1450,
      status: "WON",
      settledAt: /* @__PURE__ */ new Date("2026-01-17T20:00:00"),
      time: "Yesterday, 20:00"
    },
    {
      id: 4,
      matchId: "#BB20150",
      match: "Sri Lanka vs West Indies",
      league: "ODI Series",
      selection: "West Indies",
      market: "Match Winner",
      odds: 2.1,
      stake: 300,
      potentialReturn: 630,
      actualReturn: 0,
      status: "LOST",
      settledAt: /* @__PURE__ */ new Date("2026-01-16T18:30:00"),
      time: "Jan 16, 18:30"
    }
  ],
  transactions: [
    {
      id: 1,
      type: "DEPOSIT",
      amount: 5e3,
      method: "UPI",
      status: "SUCCESS",
      date: /* @__PURE__ */ new Date("2026-01-18T10:00:00"),
      txnId: "TXN1234567890"
    },
    {
      id: 2,
      type: "WITHDRAWAL",
      amount: 2e3,
      method: "Bank Transfer",
      status: "PENDING",
      date: /* @__PURE__ */ new Date("2026-01-17T15:30:00"),
      txnId: "TXN0987654321"
    }
  ],
  promoData: {
    title: "IPL 2024 Mega Contest",
    description: "Win up to ₹10,000 every match!",
    image: "linear-gradient(135deg, #0f4c38 0%, #1a7553 100%)",
    ctaText: "Join Now"
  }
};
const formatters = {
  currency: (amount) => helpers.formatCurrency(amount),
  number: (num) => helpers.formatNumber(num),
  odds: (odds) => helpers.formatOdds(odds),
  date: (date) => helpers.formatDate(date),
  time: (date) => helpers.formatTime(date),
  datetime: (date) => `${helpers.formatDate(date)}, ${helpers.formatTime(date)}`,
  betStatus: (status) => {
    const statusMap = {
      "OPEN": { label: "Open", class: "badge-info" },
      "PENDING": { label: "Pending", class: "badge-pending" },
      "WON": { label: "Won", class: "badge-success" },
      "LOST": { label: "Lost", class: "badge-danger" },
      "CASHED_OUT": { label: "Cashed Out", class: "badge-info" }
    };
    return statusMap[status] || { label: status, class: "badge" };
  },
  matchStatus: (status) => {
    const statusMap = {
      "LIVE": { label: "Live", class: "badge-live" },
      "UPCOMING": { label: "Upcoming", class: "badge-info" },
      "COMPLETED": { label: "Completed", class: "" },
      "CANCELLED": { label: "Cancelled", class: "badge-danger" }
    };
    return statusMap[status] || { label: status, class: "badge" };
  }
};
export {
  MOCK_DATA as M,
  formatters as f
};
