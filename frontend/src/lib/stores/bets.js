import { writable, get } from 'svelte/store';
import { api } from '$lib/api.js';
import { MOCK_DATA } from '$lib/data/mockData.js';
import { user, updateBalance } from './auth.js';

export const bets = writable(MOCK_DATA.myBets);
export const activeBet = writable(null);

export async function placeBet(betData) {
    const currentUser = get(user);
    try {
        if (currentUser.balance < betData.stake) {
            return { success: false, error: 'Insufficient balance' };
        }

        const response = await api.bets.place(betData);
        const newBet = response.data;

        bets.update(prev => [newBet, ...prev]);
        updateBalance(currentUser.balance - betData.stake);

        return { success: true, bet: newBet };
    } catch (error) {
        console.error('Place bet error:', error);

        if (error.code === 'ERR_NETWORK') {
            const newBet = {
                id: Date.now(),
                ...betData,
                status: 'OPEN',
                placedAt: new Date(),
                time: 'Just now'
            };

            bets.update(prev => [newBet, ...prev]);
            updateBalance(currentUser.balance - betData.stake);

            return { success: true, bet: newBet, demo: true };
        }

        return {
            success: false,
            error: error.response?.data?.message || 'Failed to place bet'
        };
    }
}

export async function cashOut(betId) {
    const currentUser = get(user);
    const currentBets = get(bets);
    try {
        const bet = currentBets.find(b => b.id === betId);
        if (!bet || !bet.canCashOut) {
            return { success: false, error: 'Cannot cash out this bet' };
        }

        const response = await api.bets.cashout(betId);
        const cashOutAmount = response.data.amount;

        bets.update(prev => prev.map(b =>
            b.id === betId
                ? { ...b, status: 'CASHED_OUT', actualReturn: cashOutAmount }
                : b
        ));

        updateBalance(currentUser.balance + cashOutAmount);

        return { success: true, amount: cashOutAmount };
    } catch (error) {
        console.error('Cash out error:', error);

        if (error.code === 'ERR_NETWORK') {
            const bet = currentBets.find(b => b.id === betId);
            const cashOutAmount = bet?.cashOutValue || 0;

            bets.update(prev => prev.map(b =>
                b.id === betId
                    ? { ...b, status: 'CASHED_OUT', actualReturn: cashOutAmount }
                    : b
            ));

            updateBalance(currentUser.balance + cashOutAmount);

            return { success: true, amount: cashOutAmount, demo: true };
        }

        return {
            success: false,
            error: error.response?.data?.message || 'Failed to cash out'
        };
    }
}

export async function getBetHistory() {
    try {
        const response = await api.bets.getAll();
        bets.set(response.data);
        return { success: true };
    } catch (error) {
        console.error('Get bet history error:', error);
        return { success: false };
    }
}
