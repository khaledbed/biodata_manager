import axios from 'axios';

const BASE_URL = 'http://localhost:5000';
const BASE_URL_PRIAMOS = 'http://10.96.10.241:5000';

const apiService = axios.create({
  baseURL: BASE_URL,
});


export const getAllReferences = async () => {
  try {
    const response = await apiService.get('/references');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getReferenceById = async (referenceId) => {
  try {
    const response = await apiService.get(`/references/${referenceId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createReference = async (referenceData) => {
  try {
    const response = await apiService.post('/references', referenceData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateReference = async (referenceId, referenceData) => {
  try {
    const response = await apiService.put(`/references/${referenceId}`, referenceData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteReference = async (referenceId) => {
  try {
    const response = await apiService.delete(`/references/${referenceId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
