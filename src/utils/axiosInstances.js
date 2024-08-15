import axios from 'axios';
import { useAuthStore } from '@/store/useAuthStore';

const baseURL = import.meta.env.VITE_API_ENDPOINT;

const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const { accessToken, refreshAccessToken } = useAuthStore.getState();
    if (accessToken) {
      const now = new Date().getTime() / 1000;
      const tokenExpiration = JSON.parse(atob(accessToken.split('.')[1])).exp;

      if (tokenExpiration < now) {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          config.headers['Authorization'] = `Bearer ${newAccessToken}`;
        }
      } else {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default axiosInstance;