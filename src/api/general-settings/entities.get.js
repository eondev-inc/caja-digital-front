import axiosInstance  from '../axios';

export const getEntities = async () => {
  try{
    const response = await axiosInstance.get('/general-settings/entities');
    return response.data;
  } catch (error) {
    console.error('Error getting entities:', error);
    return [];
  }
}