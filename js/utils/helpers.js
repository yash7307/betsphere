// Utility Helper Functions

const helpers = {
    // Format currency
    formatCurrency(amount, currency = '₹') {
        return `${currency}${parseFloat(amount).toLocaleString('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`;
    },

    // Format currency without decimals
    formatCurrencyShort(amount, currency = '₹') {
        return `${currency}${parseFloat(amount).toLocaleString('en-IN', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        })}`;
    },

    // Format odds
    formatOdds(odds) {
        return parseFloat(odds).toFixed(2);
    },

    // Format date and time
    formatDateTime(date) {
        const d = new Date(date);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        const timeStr = d.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });

        if (d.toDateString() === today.toDateString()) {
            return `Today, ${timeStr}`;
        } else if (d.toDateString() === yesterday.toDateString()) {
            return `Yesterday, ${timeStr}`;
        } else {
            const dateStr = d.toLocaleDateString('en-IN', {
                month: 'short',
                day: 'numeric'
            });
            return `${dateStr}, ${timeStr}`;
        }
    },

    // Format relative time
    formatRelativeTime(date) {
        const d = new Date(date);
        const now = new Date();
        const diff = Math.floor((now - d) / 1000); // seconds

        if (diff < 60) return 'Just now';
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
        if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
        return this.formatDateTime(date);
    },

    // Calculate potential return
    calculateReturn(stake, odds) {
        return parseFloat(stake) * parseFloat(odds);
    },

    // Calculate profit
    calculateProfit(stake, odds) {
        return this.calculateReturn(stake, odds) - parseFloat(stake);
    },

    // Generate random ID
    generateId() {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    },

    // Show loading overlay
    showLoading() {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) overlay.classList.remove('hidden');
    },

    // Hide loading overlay
    hideLoading() {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) overlay.classList.add('hidden');
    },

    // Show toast notification
    showToast(message, type = 'info') {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 80px;
            left: 50%;
            transform: translateX(-50%);
            background: ${type === 'success' ? '#00ff87' : type === 'error' ? '#ff3b5c' : '#29b6f6'};
            color: ${type === 'success' ? '#000' : '#fff'};
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 600;
            z-index: 1000;
            animation: slideDown 0.3s ease;
            max-width: 90%;
            text-align: center;
        `;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideUp 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },

    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Truncate text
    truncate(text, length = 50) {
        if (text.length <= length) return text;
        return text.substr(0, length) + '...';
    },

    // Get status badge class
    getStatusClass(status) {
        const statusMap = {
            'LIVE': 'badge-live',
            'OPEN': 'badge-info',
            'PENDING': 'badge-pending',
            'WON': 'badge-success',
            'LOST': 'badge-danger',
            'SETTLED': 'badge-info'
        };
        return statusMap[status] || 'badge-info';
    },

    // Validate bet amount
    validateBetAmount(amount, balance) {
        const numAmount = parseFloat(amount);
        if (isNaN(numAmount) || numAmount <= 0) {
            return { valid: false, message: 'Please enter a valid amount' };
        }
        if (numAmount < 10) {
            return { valid: false, message: 'Minimum bet is ₹10' };
        }
        if (numAmount > balance) {
            return { valid: false, message: 'Insufficient balance' };
        }
        if (numAmount > 100000) {
            return { valid: false, message: 'Maximum bet is ₹1,00,000' };
        }
        return { valid: true };
    },

    // Local storage helpers
    storage: {
        set(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
            } catch (e) {
                console.error('Storage set error:', e);
            }
        },
        get(key, defaultValue = null) {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : defaultValue;
            } catch (e) {
                console.error('Storage get error:', e);
                return defaultValue;
            }
        },
        remove(key) {
            try {
                localStorage.removeItem(key);
            } catch (e) {
                console.error('Storage remove error:', e);
            }
        }
    }
};

// Add CSS animations for toast
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            transform: translate(-50%, -100%);
            opacity: 0;
        }
        to {
            transform: translate(-50%, 0);
            opacity: 1;
        }
    }
    @keyframes slideUp {
        from {
            transform: translate(-50%, 0);
            opacity: 1;
        }
        to {
            transform: translate(-50%, -100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Export helpers
if (typeof window !== 'undefined') {
    window.helpers = helpers;
}
