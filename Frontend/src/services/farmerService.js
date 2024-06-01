import axiosInstance from '../axiosConfig';

export const usersData = async (params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const response = await axiosInstance.get(`/api/v1/users?${queryString}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};


export const farmerDatails = async (userId) => {
  //pulls farmer's details by ID
  try {
    const response = await axiosInstance.get(`/api/v1/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const farmerDelete = async (userId) => {
  //deletes a farmer from the system
  try {
    const response = await axiosInstance.delete(`/api/v1/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};


export const allFarmerDatails =  async () => {
  //gets all the information for the farmer
  try {
    const response = await axiosInstance.get('/api/v1/profile/farm');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export const updateFarmerDatails =  async (userData) => {
  //handles the updating of the Farmer details
  try {
    const response = await axiosInstance.put('/api/v1/profile/farm', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}