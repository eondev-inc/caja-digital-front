import axiosInstance from '../axios';

export const registerUser = async (data) => {
  const response = await axiosInstance.post('/auth/register', data);
  return response;
};