import axios from 'axios';

// Base configuration for Axios
const API = axios.create({
    baseURL: 'https://backendhackathon-production.up.railway.app', // Backend API base URL
});



export default API;
