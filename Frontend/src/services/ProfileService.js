import axiosInstance from '../axiosConfig';

export const profile = async () => {
    try {
      const response = await axiosInstance.get('api/v1/profile');
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
};