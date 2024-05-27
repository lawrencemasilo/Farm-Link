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


export const usersData = async () => {
  try {
    const response = await axiosInstance.get('/api/v1/users');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};