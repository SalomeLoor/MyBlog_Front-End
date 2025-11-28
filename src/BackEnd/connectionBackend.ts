import axios from 'axios';
import { CONEXTION_URL } from './config';

export const connectionBackend = axios.create({
    baseURL: CONEXTION_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})


 //interceptor para incluir el token siempre actualizado
connectionBackend.interceptors.request.use(
    (config) => {
        const tokenGuardado = localStorage.getItem('token'); // aquise obtiene el token desde Local Strogae

        if (tokenGuardado) {
            config.headers.Authorization = `Bearer ${tokenGuardado}`;
        }
        else {
            delete config.headers['Authorization'];
        }
        return config;
    },
    (error) => Promise.reject(error)
);