import axiosInstance from '../axios';

/**
 * Envía las credenciales al endpoint de autenticación.
 * Lanza el error en vez de tragárselo — el componente decide cómo manejarlo.
 * @param {{ email: string, password: string }} data
 * @returns {{ accessToken: string, user: object }}
 * @throws {AxiosError} con error.response.status para distinguir 401 / 429 / 5xx
 */
export const login = async (data) => {
  const response = await axiosInstance.post('/auth/authenticate', data);
  return response.data;
};
