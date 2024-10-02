import axios from 'axios';
import { apiKey, apiUrl } from '../../config';
export const registerUser = async (data) => {
  try {
    console.log(data.nidType.toUpperCase());
    const response = await axios({
      method: 'POST',
      url: `${apiUrl}/api/v1/auth/register`,
      data : {
        nidType: data.nidType.toUpperCase(),
        ...data,
      },
      headers: {
        'Content-Type': 'application/json',
        apikey: apiKey,
      }
    });

    return response.data;
  } catch (error) {
    return error.response ? error.response.data : error;
  }
}