import axiosInstance from '../axios';

export const createTransaction = async (data) => {
  try {
    const response = await axiosInstance.post('/transactions/create', data);
    return response;
  } catch (error) {
    return error.response.data;
  }
}; 