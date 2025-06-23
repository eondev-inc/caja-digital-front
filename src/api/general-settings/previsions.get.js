import axiosInstance  from '../axios';

export const getPrevisions = async () => {
  try{
    const response = await axiosInstance.get('general-settings/previsions');
    return response.data;
  } catch (error) {
    console.error('Error getting entities:', error);
    return [];
  }
}