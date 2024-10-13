import axios from 'axios';

// Crear una instancia de axios
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

// Interceptor de solicitudes para agregar el token de autorización
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptor de respuestas para manejar errores de autenticación
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Lógica para manejar el token expirado, por ejemplo, solicitar un refresh token
      console.error('Token expirado o no válido.');
      // Puedes agregar aquí la lógica para redirigir al usuario a la página de login
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;