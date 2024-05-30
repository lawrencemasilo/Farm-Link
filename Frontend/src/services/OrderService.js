import axiosInstance from '../axiosConfig';

export const placeOrder = async (orderData) => {
  //posts orders into the database
    try {
      const response = await axiosInstance.post('api/v1/order', orderData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
};

export const getOrder = async (userId) => {
  //gets all the orders for a particular user
    try {
      const response = await axiosInstance.get(`api/v1/order/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
};