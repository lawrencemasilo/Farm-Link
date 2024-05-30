import axiosInstance from '../axiosConfig';

export const placeOrder = async (orderData) => {
    try {
      const response = await axiosInstance.post('api/v1/order', orderData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
};

export const getOrder = async (userId) => {
    try {
      const response = await axiosInstance.get(`api/v1/order/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
};