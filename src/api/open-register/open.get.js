import axiosInstance from "../axios";

export const getOpenRegister = async (entityId) => {
  try {
    const response = await axiosInstance.get(`/open-register/by-cashier/${entityId}`);
    return response;
  } catch (error) {
    return error.response.data;
  }
}