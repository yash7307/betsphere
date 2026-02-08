import { createContext, useContext, useState } from 'react';
import { api } from '../api';
import { helpers } from '../utils/helpers';
import { MOCK_DATA } from '../data/mockData';
import { useAuth } from './AuthContext';

const BetContext = createContext(null);

export const useBets = () => {
    const context = useContext(BetContext);
    if (!context) {
        throw new Error('useBets must be used within BetProvider');
    }
    return context;
};

export const BetProvider = ({ children }) => {
    const { user, updateBalance } = useAuth();
    const [bets, setBets] = useState(MOCK_DATA.myBets);
    const [activeBet, setActiveBet] = useState(null);

    const placeBet = async (betData) => {
        try {
            // Check if user has enough balance
            if (user.balance < betData.stake) {
                return {
                    success: false,
                    error: 'Insufficient balance'
                };
            }

            const response = await api.bets.place(betData);
            const newBet = response.data;

            setBets(prev => [newBet, ...prev]);
            updateBalance(user.balance - betData.stake);

            return { success: true, bet: newBet };
        } catch (error) {
            console.error('Place bet error:', error);

            // Fallback to demo mode
            if (error.code === 'ERR_NETWORK') {
                const newBet = {
                    id: Date.now(),
                    ...betData,
                    status: 'OPEN',
                    placedAt: new Date(),
                    time: 'Just now'
                };

                setBets(prev => [newBet, ...prev]);
                updateBalance(user.balance - betData.stake);

                return { success: true, bet: newBet, demo: true };
            }

            return {
                success: false,
                error: error.response?.data?.message || 'Failed to place bet'
            };
        }
    };

    const cashOut = async (betId) => {
        try {
            const bet = bets.find(b => b.id === betId);
            if (!bet || !bet.canCashOut) {
                return {
                    success: false,
                    error: 'Cannot cash out this bet'
                };
            }

            const response = await api.bets.cashout(betId);
            const cashOutAmount = response.data.amount;

            setBets(prev => prev.map(b =>
                b.id === betId
                    ? { ...b, status: 'CASHED_OUT', actualReturn: cashOutAmount }
                    : b
            ));

            updateBalance(user.balance + cashOutAmount);

            return { success: true, amount: cashOutAmount };
        } catch (error) {
            console.error('Cash out error:', error);

            // Fallback to demo mode
            if (error.code === 'ERR_NETWORK') {
                const bet = bets.find(b => b.id === betId);
                const cashOutAmount = bet?.cashOutValue || 0;

                setBets(prev => prev.map(b =>
                    b.id === betId
                        ? { ...b, status: 'CASHED_OUT', actualReturn: cashOutAmount }
                        : b
                ));

                updateBalance(user.balance + cashOutAmount);

                return { success: true, amount: cashOutAmount, demo: true };
            }

            return {
                success: false,
                error: error.response?.data?.message || 'Failed to cash out'
            };
        }
    };

    const getBetHistory = async () => {
        try {
            const response = await api.bets.getAll();
            setBets(response.data);
            return { success: true };
        } catch (error) {
            console.error('Get bet history error:', error);
            // Continue using mock data
            return { success: false };
        }
    };

    const value = {
        bets,
        activeBet,
        setActiveBet,
        placeBet,
        cashOut,
        getBetHistory
    };

    return <BetContext.Provider value={value}>{children}</BetContext.Provider>;
};
