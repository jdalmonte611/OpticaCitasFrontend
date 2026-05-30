import axios from 'axios';

const API_BASE_URL = 'https://opticacitas-production.up.railway.app/api';

export class ApiError extends Error {
    constructor(message, status, details) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.details = details;
    }
}

const statusMessages = {
    400: 'La solicitud tiene datos invalidos. Revisa la informacion e intenta nuevamente.',
    404: 'El recurso solicitado no existe o fue eliminado.',
    500: 'El servidor no pudo procesar la solicitud. Intenta nuevamente mas tarde.',
};

const getResponseMessage = (error) => {
    const responseData = error.response?.data;

    if (typeof responseData === 'string') {
        return responseData;
    }

    if (Array.isArray(responseData?.message)) {
        return responseData.message.join(', ');
    }

    return responseData?.message || statusMessages[error.response?.status] || error.message || 'Error inesperado de API';
};

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        const message = getResponseMessage(error);

        return Promise.reject(new ApiError(message, status, error.response?.data));
    }
);

export const getErrorMessage = (error, fallback = 'Ocurrio un error inesperado') => (
    error instanceof ApiError ? error.message : error?.message || fallback
);

export default api;
