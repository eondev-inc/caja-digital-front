import axios from 'axios';

export const login = async (data) => {
  try {
    const response = await axios.post('http://localhost:3001/api/auth/login', data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    });
    return response.data;
  } catch (error) {
    return error.response ? error.response.data : error;
  }
}