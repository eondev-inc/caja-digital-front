import axios from 'axios';
import { apiKey, apiUrl } from '../../config';
export const login = async (data) => {
  console.log('data', data);
  console.log('apiKey', apiKey);
  console.log('apiUrl', apiUrl);
  try {
    const response = await axios({
      method: 'post',
      url: `${apiUrl}/api/v1/auth/authenticate`,
      data: data,
      headers: {
        'Content-Type': 'application/json',
        apikey: apiKey,
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    });
    return response.data;
  } catch (error) {
    return error.response ? error.response.data : error;
  }
}