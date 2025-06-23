import axiosInstance from '../axios';
export const registerUser = async (data) => {
  try {
    const response = await axiosInstance.post('/auth/register', data);

    return response.data;
  } catch (error) {
    console.error('Error registering user', error);
    return error.response ? error.response.data : error;
  }
}