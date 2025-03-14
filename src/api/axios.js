import axios from 'axios';
import { apiKey, apiUrl } from '../config';
import { useStore } from '../app/store';

let isRefreshing = false;
let failedRequests = [];

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: `${apiUrl}/api/v1/`,
  timeout: 5000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    apikey: apiKey
  }
});

axiosInstance.interceptors.request.use((config) => {
  const { accessToken } = useStore.getState();
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => Promise.resolve(response),
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          failedRequests.push(() => resolve(axios(originalRequest)));
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await axiosInstance.post('/auth/refresh')
        // Lógica para refrescar
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
        failedRequests.forEach((cb) => cb());
        failedRequests = [];
        return axios(originalRequest);
      } catch (refreshError) {
        // Redirigir a login si el refresh falla
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;