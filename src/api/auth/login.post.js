import axiosInstance from '../axios';

export const login = async (data) => {
  try {
    const response = await axiosInstance.post('/auth/authenticate', data);

    return response.data;
  } catch (error) {
    console.error('Error authenticating user', error);
    return error.response ? error.response.data : error;
  }
}