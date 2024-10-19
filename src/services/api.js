import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

export const login = (credentials) => api.post('/usuarios/login', credentials);
export const register = (userData) => api.post('/usuarios/registro', userData);
export const getProfile = () => api.get('/usuarios/perfil');
export const createContent = (contentData) => api.post('/contenido', contentData);
export const getContent = () => api.get('/contenido');

export default api;