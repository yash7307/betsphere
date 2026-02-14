import axios from 'axios';

const API_URL = '/api';

// Create axios instance with default config
const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// API endpoints
export const api = {
    auth: {
        login: (data) => axiosInstance.post('/auth/login', data),
        register: (data) => axiosInstance.post('/auth/register', data),
        me: () => axiosInstance.get('/auth/me'),
        logout: () => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return Promise.resolve();
        }
    },
    bets: {
        place: (data) => axiosInstance.post('/bets', data),
        getAll: () => axiosInstance.get('/bets'),
        getById: (id) => axiosInstance.get(`/bets/${id}`),
        cashout: (id) => axiosInstance.post(`/bets/${id}/cashout`)
    },
    payment: {
        createOrder: (amount) => axiosInstance.post('/payment/create-order', { amount }),
        verify: (data) => axiosInstance.post('/payment/verify', data),
        getTransactions: () => axiosInstance.get('/payment/transactions')
    },
    cricket: {
        getLive: () => axiosInstance.get('/cricket/live'),
        getUpcoming: () => axiosInstance.get('/cricket/upcoming'),
        getMatch: (id) => axiosInstance.get(`/cricket/match/${id}`)
    },
    user: {
        getProfile: () => axiosInstance.get('/users/profile'),
        updateProfile: (data) => axiosInstance.put('/users/profile', data),
        getBalance: () => axiosInstance.get('/users/balance')
    }
};

export default api;
