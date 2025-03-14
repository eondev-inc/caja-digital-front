import axiosInstance from "../axios";

export const getOpenRegister = async () => {
  try {
    const response = await axiosInstance.get("/open-register/by-cashier");
    return response;
  } catch (error) {
    return error.response.data;
  }
}