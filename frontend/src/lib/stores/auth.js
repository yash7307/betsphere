import { writable, get } from 'svelte/store';
import { api } from '$lib/api.js';
import { helpers } from '$lib/utils/helpers.js';
import { MOCK_DATA } from '$lib/data/mockData.js';

export const user = writable(null);
export const isAuthenticated = writable(false);
export const authLoading = writable(true);

export function initAuth() {
    const savedUser = helpers.storage.get('user');
    const token = localStorage.getItem('token');

    if (savedUser && token) {
        user.set(savedUser);
        isAuthenticated.set(true);
    } else {
        user.set(null);
        isAuthenticated.set(false);
    }
    authLoading.set(false);
}

export async function login(credentials) {
    try {
        const response = await api.auth.login(credentials);
        const { token, user: userData } = response.data;

        localStorage.setItem('token', token);
        helpers.storage.set('user', userData);

        user.set(userData);
        isAuthenticated.set(true);

        return { success: true };
    } catch (error) {
        console.error('Login error:', error);

        if (error.code === 'ERR_NETWORK') {
            const demoUser = { ...MOCK_DATA.user, ...credentials };
            helpers.storage.set('user', demoUser);
            user.set(demoUser);
            isAuthenticated.set(true);
            return { success: true, demo: true };
        }

        return {
            success: false,
            error: error.response?.data?.message || 'Login failed'
        };
    }
}

export async function register(userData) {
    try {
        const response = await api.auth.register(userData);
        const { token, user: newUser } = response.data;

        localStorage.setItem('token', token);
        helpers.storage.set('user', newUser);

        user.set(newUser);
        isAuthenticated.set(true);

        return { success: true };
    } catch (error) {
        console.error('Registration error:', error);

        if (error.code === 'ERR_NETWORK') {
            const demoUser = { ...MOCK_DATA.user, ...userData };
            helpers.storage.set('user', demoUser);
            user.set(demoUser);
            isAuthenticated.set(true);
            return { success: true, demo: true };
        }

        return {
            success: false,
            error: error.response?.data?.message || 'Registration failed'
        };
    }
}

export function logout() {
    localStorage.removeItem('token');
    helpers.storage.remove('user');
    user.set(null);
    isAuthenticated.set(false);
    window.location.href = '/login';
}

export function updateBalance(newBalance) {
    user.update(u => {
        if (u) {
            const updated = { ...u, balance: newBalance };
            helpers.storage.set('user', updated);
            return updated;
        }
        return u;
    });
}
