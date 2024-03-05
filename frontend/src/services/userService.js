import apiService from './endPoint';

export const login = async (credentials) => {
  try {
    const response = await apiService.post('/users/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const register = async (userData) => {
  try {
    const response = await apiService.post('/users/register', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
