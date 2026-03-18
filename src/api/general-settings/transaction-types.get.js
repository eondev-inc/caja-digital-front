import axiosInstance from "../axios";

export const getTransactionTypes = async () => {
  try {
    const response = await axiosInstance.get('general-settings/transaction-types');
    return response.data;
  } catch (error) {
    console.error('Error getting transaction types:', error);
    return [];
  }
}
