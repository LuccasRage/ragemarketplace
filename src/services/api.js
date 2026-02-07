import axios from 'axios';

// Create axios instance with base URL
// Using relative URL since we have vite proxy configured
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
  discordAuth: (data) => api.post('/auth/discord', data),
  googleAuth: (data) => api.post('/auth/google', data),
};

// Listings API calls
export const listingsAPI = {
  getAll: (params) => api.get('/listings', { params }),
  getById: (id) => api.get(`/listings/${id}`),
  getMy: () => api.get('/listings/my'),
  create: (data) => api.post('/listings', data),
  update: (id, data) => api.put(`/listings/${id}`, data),
  delete: (id) => api.delete(`/listings/${id}`),
};

// Orders API calls
export const ordersAPI = {
  getMy: () => api.get('/orders/my'),
  getById: (id) => api.get(`/orders/${id}`),
  buyItem: (listingId) => api.post(`/orders/buy/${listingId}`),
  markDelivered: (id) => api.put(`/orders/${id}/delivered`),
  confirmReceipt: (id) => api.put(`/orders/${id}/confirm`),
};

// Users API calls
export const usersAPI = {
  getById: (id) => api.get(`/users/${id}`),
  update: (id, data) => api.put(`/users/${id}`, data),
};

// Transactions/Wallet API calls
export const transactionsAPI = {
  getAll: () => api.get('/transactions'),
  deposit: (amount) => api.post('/transactions/deposit', { amount }),
  withdraw: (amount) => api.post('/transactions/withdraw', { amount }),
};

export default api;
