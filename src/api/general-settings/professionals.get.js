import  axiosInstance from '../axios';

export const getProfessionals = async () => {
  try {
    const response = await axiosInstance.get('/general-settings/professionals');
    return response.data;
  } catch (error) {
    console.error('Error fetching professionals:', error);
    throw error;
  }
};
