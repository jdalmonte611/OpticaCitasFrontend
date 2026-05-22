import axios from 'axios';

const API_BASE_URL = 'https://opticacitas-production.up.railway.app/api/';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para manejar errores
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('Error de API:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default api;
