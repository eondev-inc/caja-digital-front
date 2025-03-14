import axiosInstance from '../axios';

export const createOpenRegister = async (data) => {
  try {
    const response = await axiosInstance.post('/open-register', data);
    return response;
  } catch (error) {
    return error.response.data;
  }
}