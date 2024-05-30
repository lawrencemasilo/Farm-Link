import axiosInstance from '../axiosConfig';

/*const API_URL = 'http://localhost:3001/api/v1';

export const getFarmers = async () => {
  try {
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching farmers data:', error);
    throw error;
  }
};*/


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
  try {
    const response = await axiosInstance.get(`/api/v1/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const farmerDelete = async (userId) => {
  try {
    const response = await axiosInstance.delete(`/api/v1/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};


export const allFarmerDatails =  async () => {
  try {
    const response = await axiosInstance.get('/api/v1/profile/farm');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export const updateFarmerDatails =  async (userData) => {
  try {
    const response = await axiosInstance.put('/api/v1/profile/farm', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}