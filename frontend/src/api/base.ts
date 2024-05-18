
import axios from 'axios';

export const base = axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
});

// Interceptar las solicitudes antes de que se envíen
base.interceptors.request.use(
    config => {
      // Obtener el token JWT del almacenamiento local
      const token = localStorage.getItem('access_token');
  
      // Si el token está disponible, agregarlo a la cabecera de autorización
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
  
      return config;
    },
    error => {
      // Manejar errores de solicitud
      return Promise.reject(error);
    }
  );