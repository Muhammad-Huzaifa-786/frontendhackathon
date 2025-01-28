import axios from 'axios';

// Base configuration for Axios
const API = axios.create({
    // baseURL: 'http://localhost:5000/api', // Backend API base URL
    baseURL: 'https://backend-production-64be.up.railway.app/api', // Backend API base URL
});



export default API;
