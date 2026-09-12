import axios from 'axios';
import { apiKey, apiUrl } from '../config';
import { useStore } from '../app/store';

let isRefreshing = false;
let failedQueue = [];

/**
 * Drena la cola de requests que esperaban el refresh.
 * @param {string|null} error - Si hay error, rechaza todas. Si no, las resuelve con el nuevo token.
 * @param {string|null} token - Nuevo access token tras el refresh exitoso.
 */
const drainQueue = (error, token = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  failedQueue = [];
};

const redirectToLogin = () => {
  if (typeof window === 'undefined') return;
  // clear queue before redirect to avoid dangling promises
  drainQueue(new Error('redirect to login'), null);
  const loginUrl = new URL('/login', window.location.origin);
  window.location.replace(loginUrl.toString());
};

function getCsrfToken() {
  if (typeof document === 'undefined') return null;
  // 1) cookie csrf_token
  const match = document.cookie.match(/(?:^|; )csrf_token=([^;]*)/);
  if (match) {
    try {
      return decodeURIComponent(match[1]);
    } catch {
      return match[1];
    }
  }
  // 2) <meta name="csrf-token" content="...">
  const meta = document.querySelector('meta[name="csrf-token"]');
  if (meta) return meta.getAttribute('content');
  return null;
}

function buildHeaders() {
  const headers = {
    'Content-Type': 'application/json',
  };
  if (apiKey) {
    headers.apikey = apiKey;
  }
  const csrf = getCsrfToken();
  if (csrf) {
    headers['X-CSRF-Token'] = csrf;
  }
  return headers;
}

const axiosInstance = axios.create({
  baseURL: `${apiUrl}/api/v1/`,
  timeout: 8000,
  withCredentials: true,
  headers: buildHeaders(),
});

// ── Request interceptor: adjuntar access token en cada request ────────────
axiosInstance.interceptors.request.use((config) => {
  const { accessToken } = useStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  // attach CSRF if available and not already set (H-04 gated: only if backend issues token)
  const csrf = getCsrfToken();
  if (csrf && !config.headers['X-CSRF-Token']) {
    config.headers['X-CSRF-Token'] = csrf;
  }
  // ensure apikey omitted when empty (C-01 fail-secure)
  if (!apiKey && config.headers.apikey) {
    delete config.headers.apikey;
  }
  return config;
});

// ── Response interceptor: manejar 401 con refresh automático ─────────────
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si no es 401, o ya reintentamos, o es el propio endpoint de refresh → propagar
    if (
      !error.response ||
      error.response.status !== 401 ||
      originalRequest._retry ||
      originalRequest.url?.includes('/auth/refresh')
    ) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      // Encolar la request mientras hay un refresh en curso
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((newToken) => {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      // El refresh token viaja en la cookie httpOnly — no necesitamos enviarlo manualmente
      const { data } = await axiosInstance.post('/auth/refresh');
      const newToken = data.accessToken;

      // Actualizar el store con el nuevo access token
      useStore.getState().setAccessToken(newToken);

      // Resolver todas las requests encoladas con el nuevo token
      drainQueue(null, newToken);

      // Reintentar la request original con el nuevo token
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      drainQueue(refreshError, null);

      // Limpiar estado de auth y redirigir a login
      useStore.getState().setAccessToken('');
      useStore.getState().setIsAuthenticated(false);
      useStore.getState().setUserInfo({});
      redirectToLogin();

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default axiosInstance;
