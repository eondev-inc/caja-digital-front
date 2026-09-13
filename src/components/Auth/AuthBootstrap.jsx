import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance, { resetAuthExpiredFlag } from '../../api/axios';
import { useStore } from '../../app/store';

// Module guard: refresh POST is idempotent, but StrictMode double-mount
// must still issue exactly one bootstrap request per app load.
let didInit = false;

/**
 * Session bootstrap fetch. Module-local so this file only exports the
 * component (react-refresh). Retry arrives via the `auth:retry` event below.
 * Never navigates and never dispatches auth:expired; network failures
 * settle as authStatus 'error'.
 */
const runAuthBootstrap = async () => {
  const {
    setAccessToken,
    setIsAuthenticated,
    setUserInfo,
    setAuthStatus,
    setBootstrapError,
  } = useStore.getState();
  setAuthStatus('pending');
  setBootstrapError(null);
  try {
    // Bypasses the 401-retry interceptor (URL guard) by design.
    // Backend returns {accessToken} only; userInfo stays {} until next login.
    const { data } = await axiosInstance.post('/auth/refresh');
    if (data?.accessToken) {
      setAccessToken(data.accessToken);
      setIsAuthenticated(true);
      setAuthStatus('authed');
      setBootstrapError(null);
      resetAuthExpiredFlag();
    } else {
      setAccessToken('');
      setIsAuthenticated(false);
      setUserInfo({});
      setAuthStatus('guest');
    }
  } catch (error) {
    if (error?.response) {
      // HTTP error incl. 401: existing guest path unchanged.
      setAccessToken('');
      setIsAuthenticated(false);
      setUserInfo({});
      setAuthStatus('guest');
    } else {
      // Network error (no response): surface retry UI, never redirect.
      setAccessToken('');
      setIsAuthenticated(false);
      setUserInfo({});
      setBootstrapError(
        'Sin conexión. Revisá tu conexión e intentá nuevamente.',
      );
      setAuthStatus('error');
    }
  }
};

/**
 * Restores the session once per app load via the HttpOnly refresh cookie
 * and bridges router-free axios failures back into SPA navigation.
 * Mount first inside <Router>; renders nothing.
 */
export const AuthBootstrap = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleExpired = () => navigate('/login', { replace: true });
    const handleRetry = () => runAuthBootstrap();
    window.addEventListener('auth:expired', handleExpired);
    window.addEventListener('auth:retry', handleRetry);

    if (didInit) {
      return () => {
        window.removeEventListener('auth:expired', handleExpired);
        window.removeEventListener('auth:retry', handleRetry);
      };
    }
    didInit = true;

    runAuthBootstrap();

    return () => {
      window.removeEventListener('auth:expired', handleExpired);
      window.removeEventListener('auth:retry', handleRetry);
    };
  }, [navigate]);

  return null;
};
