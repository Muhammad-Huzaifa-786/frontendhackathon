import axios from 'axios';

// Base configuration for Axios
const API = axios.create({
    baseURL: 'https://backendhackathon-production.up.railway.app/', // Backend API base URL
});

// Add an Authorization header for protected routes if token exists
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;
