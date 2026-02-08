import { helpers } from './helpers';

export const formatters = {
    // Currency formatters
    currency: (amount) => helpers.formatCurrency(amount),

    // Number formatters
    number: (num) => helpers.formatNumber(num),

    // Odds formatter
    odds: (odds) => helpers.formatOdds(odds),

    // Date/Time formatters
    date: (date) => helpers.formatDate(date),
    time: (date) => helpers.formatTime(date),
    datetime: (date) => `${helpers.formatDate(date)}, ${helpers.formatTime(date)}`,

    // Bet status formatter
    betStatus: (status) => {
        const statusMap = {
            'OPEN': { label: 'Open', class: 'badge-info' },
            'PENDING': { label: 'Pending', class: 'badge-pending' },
            'WON': { label: 'Won', class: 'badge-success' },
            'LOST': { label: 'Lost', class: 'badge-danger' },
            'CASHED_OUT': { label: 'Cashed Out', class: 'badge-info' }
        };
        return statusMap[status] || { label: status, class: 'badge' };
    },

    // Match status formatter
    matchStatus: (status) => {
        const statusMap = {
            'LIVE': { label: 'Live', class: 'badge-live' },
            'UPCOMING': { label: 'Upcoming', class: 'badge-info' },
            'COMPLETED': { label: 'Completed', class: '' },
            'CANCELLED': { label: 'Cancelled', class: 'badge-danger' }
        };
        return statusMap[status] || { label: status, class: 'badge' };
    }
};

export default formatters;
