import axiosInstance from '../axiosConfig';

export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post('api/v1/register', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axiosInstance.post('api/v1/login', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};


export const forgotPassword = async (userData) => {
  try {
    const response = await axiosInstance.post('api/v1/forgot/password', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};