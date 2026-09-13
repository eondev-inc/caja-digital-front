import axios from 'axios';
import { apiKey, apiUrl } from '../config';
import { useStore } from '../app/store';

let isRefreshing = false;
let failedQueue = [];

// Router-free bridge: axios cannot useNavigate, so a confirmed session
// death is signaled once per cascade via CustomEvent. AuthBootstrap
// (inside <Router>) consumes it with a single SPA navigate.
let authExpiredDispatched = false;

export const resetAuthExpiredFlag = () => {
  authExpiredDispatched = false;
};

const notifyAuthExpired = () => {
  if (typeof window === 'undefined' || authExpiredDispatched) return;
  authExpiredDispatched = true;
  window.dispatchEvent(new CustomEvent('auth:expired'));
};

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
      useStore.getState().setIsAuthenticated(true);
      useStore.getState().setAuthStatus('authed');
      useStore.getState().setBootstrapError(null);
      resetAuthExpiredFlag();

      // Resolver todas las requests encoladas con el nuevo token
      drainQueue(null, newToken);

      // Reintentar la request original con el nuevo token
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      drainQueue(refreshError, null);

      // Only a confirmed 401 means the session is dead. Network errors
      // (no response) reject so the caller can retry — never redirect.
      if (refreshError?.response?.status === 401) {
        useStore.getState().setAccessToken('');
        useStore.getState().setIsAuthenticated(false);
        useStore.getState().setUserInfo({});
        useStore.getState().setAuthStatus('guest');
        notifyAuthExpired();
      }

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default axiosInstance;
