import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../../utils/loginSchema';
import { useStore } from '../../../app/store';
import { useNavigate } from 'react-router-dom';
import { getEntities, login } from '../../../api';

/**
 * Map HTTP error status to Spanish error message.
 * Backend returns 401/404 for invalid credentials, 429 for login-lock.
 */
const getErrorMessage = (error) => {
  const status = error?.response?.status ?? error?.statusCode;

  if (status === 429) {
    const msg = error?.response?.data?.message ?? '';
    return msg || 'Cuenta bloqueada por demasiados intentos. Intentá más tarde.';
  }
  if (status === 401 || status === 404) {
    return 'Credenciales incorrectas. Verificá tu email y contraseña.';
  }
  if (status >= 500) {
    return 'Error del servidor. Intentá nuevamente en unos minutos.';
  }
  return 'Ocurrió un error inesperado. Intentá nuevamente.';
};

/**
 * Hook that manages all Login page state and side-effects:
 * form handling, entity loading, authentication, and error mapping.
 */
export const useLogin = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [entities, setEntities] = useState([]);
  const navigateTo = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });

  const { setAccessToken, setIsAuthenticated, isAuthenticated, setUserInfo, accessToken } =
    useStore();

  const onSubmit = async (data) => {
    setErrorMessage('');
    try {
      const response = await login(data);
      setAccessToken(response.accessToken);
      setUserInfo(response.user);
      setIsAuthenticated(true);
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  };

  useEffect(() => {
    const fetchEntities = async () => {
      try {
        const response = await getEntities();
        setEntities(response);
      } catch {
        // Entity load failure should not block login
      }
    };
    fetchEntities();
  }, []);

  useEffect(() => {
    if (isAuthenticated || accessToken) {
      navigateTo('/dashboard');
    }
  }, [isAuthenticated, accessToken, navigateTo]);

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    entities,
    errorMessage,
    onSubmit,
  };
};
