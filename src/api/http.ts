import axios from 'axios';
import Cookies from 'cookies-ts';

const cookies = new Cookies();

const axiosR = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT',
    'Access-Control-Allow-Headers': 'Content-Type, x-requested-with',
    'Access-Control-Allow-Credentials': true,
  },
});

axiosR.interceptors.request.use(
  (config) => {
    if (cookies.get('token')) {
      config.headers['Authorization'] = `Bearer ${cookies.get('token')}`;
      config.headers['X-Requested-With'] = 'XMLHttpRequest';
    }
    return config;
  },
  (error) => {
    throw new Error('Ошибка подключения аксиос', error);
  },
);

export default axiosR;
