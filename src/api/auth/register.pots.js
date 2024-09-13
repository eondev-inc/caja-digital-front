import axios from 'axios';

export const registerUser = async (data) => {
  try {
    const response = await axios.post('http://localhost:3001/api/auth/register', data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      }
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}