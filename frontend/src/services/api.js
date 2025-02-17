import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL // definir en el .env, por ejemplo: VITE_API_URL=http://localhost:5000/api
});

api.interceptors.request.use(
  config => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default api;
