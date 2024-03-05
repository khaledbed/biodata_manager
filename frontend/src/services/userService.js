import axios from 'axios';

const BASE_URL = 'http://localhost:5000';
const BASE_URL_PRIAMOS = 'http://10.96.10.241:5000';

const apiService = axios.create({
  baseURL: BASE_URL,
});

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
