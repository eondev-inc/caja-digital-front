import axiosInstance from "../axios";

export const getPaymentMethods = async () => {
  try {
    const response = await axiosInstance.get('general-settings/payment-methods');
    return response.data;
  } catch (error) {
    console.error('Error getting payment methods:', error);
    return [];
  }
}