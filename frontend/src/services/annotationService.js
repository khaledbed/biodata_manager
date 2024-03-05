import axios from 'axios';

const BASE_URL = 'http://localhost:5000';
const BASE_URL_PRIAMOS = 'http://10.96.10.241:5000';

const apiService = axios.create({
  baseURL: BASE_URL,
});


export const getAllAnnotations = async () => {
  try {
    const response = await apiService.get('/annotations');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getAnnotationById = async (annotationId) => {
  try {
    const response = await apiService.get(`/annotations/${annotationId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createAnnotation = async (annotationData) => {
  try {
    const response = await apiService.post('/annotations', annotationData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateAnnotation = async (annotationId, annotationData) => {
  try {
    const response = await apiService.put(`/annotations/${annotationId}`, annotationData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteAnnotation = async (annotationId) => {
  try {
    const response = await apiService.delete(`/annotations/${annotationId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
