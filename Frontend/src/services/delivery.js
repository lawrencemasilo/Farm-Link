import axiosInstance from '../axiosConfig';


export const planDelivery = async (userData) => {
    try {
      const response = await axiosInstance.post('api/v1/', userData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
};

export const getDelivery = async () => {
    try {
      const response = await axiosInstance.get('api/v1/');
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
};