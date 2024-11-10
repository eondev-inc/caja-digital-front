import axios from 'axios';
import { apiKey, apiUrl } from '../../config';
export const registerUser = async (token, data) => {
  try {
    console.log(data.nidType.toUpperCase());
    const response = await axios({
      method: 'POST',
      url: `${apiUrl}/api/v1/open-register`,
      data : {
        ...data,
      },
      headers: {
        'Content-Type': 'application/json',
        apikey: apiKey,
        'Authorization': 'Bearer ' + token
      }
    });

    return response.data;
  } catch (error) {
    return error.response ? error.response.data : error;
  }
}