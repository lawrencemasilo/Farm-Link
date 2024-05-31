import axiosInstance from '../axiosConfig';

export const addCrop = async (userData) => {
  //handles adding crops to the database
    try {
      const response = await axiosInstance.post('api/v1/profile/farm/crops', userData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
};