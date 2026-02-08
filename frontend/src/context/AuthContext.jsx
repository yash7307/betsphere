import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api';
import { helpers } from '../utils/helpers';
import { MOCK_DATA } from '../data/mockData';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if user is already logged in
        const savedUser = helpers.storage.get('user');
        const token = localStorage.getItem('token');

        if (savedUser && token) {
            setUser(savedUser);
            setIsAuthenticated(true);
        } else {
            // Load demo user for development
            setUser(MOCK_DATA.user);
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const login = async (credentials) => {
        try {
            const response = await api.auth.login(credentials);
            const { token, user: userData } = response.data;

            localStorage.setItem('token', token);
            helpers.storage.set('user', userData);

            setUser(userData);
            setIsAuthenticated(true);

            return { success: true };
        } catch (error) {
            console.error('Login error:', error);

            // Fallback to demo mode if backend is unavailable
            if (error.code === 'ERR_NETWORK') {
                const demoUser = { ...MOCK_DATA.user, ...credentials };
                helpers.storage.set('user', demoUser);
                setUser(demoUser);
                setIsAuthenticated(true);
                return { success: true, demo: true };
            }

            return {
                success: false,
                error: error.response?.data?.message || 'Login failed'
            };
        }
    };

    const register = async (userData) => {
        try {
            const response = await api.auth.register(userData);
            const { token, user: newUser } = response.data;

            localStorage.setItem('token', token);
            helpers.storage.set('user', newUser);

            setUser(newUser);
            setIsAuthenticated(true);

            return { success: true };
        } catch (error) {
            console.error('Registration error:', error);

            // Fallback to demo mode
            if (error.code === 'ERR_NETWORK') {
                const demoUser = { ...MOCK_DATA.user, ...userData };
                helpers.storage.set('user', demoUser);
                setUser(demoUser);
                setIsAuthenticated(true);
                return { success: true, demo: true };
            }

            return {
                success: false,
                error: error.response?.data?.message || 'Registration failed'
            };
        }
    };

    const logout = () => {
        api.auth.logout();
        setUser(null);
        setIsAuthenticated(false);
    };

    const updateBalance = (newBalance) => {
        if (user) {
            const updatedUser = { ...user, balance: newBalance };
            setUser(updatedUser);
            helpers.storage.set('user', updatedUser);
        }
    };

    const value = {
        user,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
        updateBalance
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
