import axiosInstance from '../axios';

export const logout = async () => {
  try {
    const response = await axiosInstance.post('/auth/logout');

    return response.data;
  } catch (error) {
    console.error('Error logging out user', error);
    return error.response ? error.response.data : error;
  }
}