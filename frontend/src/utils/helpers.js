// Helper utility functions
export const helpers = {
    // Storage utilities
    storage: {
        get: (key) => {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : null;
            } catch (error) {
                console.error('Error reading from localStorage:', error);
                return null;
            }
        },
        set: (key, value) => {
            try {
                localStorage.setItem(key, JSON.stringify(value));
            } catch (error) {
                console.error('Error writing to localStorage:', error);
            }
        },
        remove: (key) => {
            try {
                localStorage.removeItem(key);
            } catch (error) {
                console.error('Error removing from localStorage:', error);
            }
        }
    },

    // Number formatting
    formatCurrency: (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2
        }).format(amount);
    },

    formatNumber: (num) => {
        return new Intl.NumberFormat('en-IN').format(num);
    },

    // Date formatting
    formatDate: (date) => {
        const d = new Date(date);
        const now = new Date();
        const diff = now - d;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (days === 0) {
            const hours = Math.floor(diff / (1000 * 60 * 60));
            if (hours === 0) {
                const minutes = Math.floor(diff / (1000 * 60));
                return minutes === 0 ? 'Just now' : `${minutes}m ago`;
            }
            return `${hours}h ago`;
        }

        if (days === 1) return 'Yesterday';
        if (days < 7) return `${days} days ago`;

        return d.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    },

    formatTime: (date) => {
        return new Date(date).toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
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
        return re.test(phone.replace(/\s+/g, ''));
    },

    // Show toast notification
    showToast: (message, type = 'info') => {
        // This will be replaced by ToastContext later
        console.log(`[${type.toUpperCase()}]`, message);
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

export default helpers;
