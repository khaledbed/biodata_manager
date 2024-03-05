import axios from 'axios';

const BASE_URL = 'http://localhost:5000';
const BASE_URL_PRIAMOS = 'http://10.96.10.241:5000';

const apiService = axios.create({
  baseURL: BASE_URL,
});


export const registerDataset = async (datasetInfo) => {
  try {
    const response = await apiService.post('/datasets', datasetInfo);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const annotateMetadata = async (datasetId, metadata) => {
  try {
    const response = await apiService.post(`/datasets/${datasetId}/metadata`, metadata);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getAllDatasets = async () => {
  try {
    const response = await apiService.get('/datasets/');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const searchDatasets = async (query) => {
  try {
    const response = await apiService.get(`/datasets/search?query=${query}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getDatasetMetadata = async (datasetId) => {
  try {
    const response = await apiService.get(`/datasets/${datasetId}/metadata`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};


export const getDatasetById = async (datasetId) => {
  try {
    const response = await apiService.get(`/datasets/${datasetId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateDataset = async (datasetId, updatedInfo) => {
  try {
    const response = await apiService.put(`/datasets/${datasetId}`, updatedInfo);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteDataset = async (datasetId) => {
  try {
    const response = await apiService.delete(`/datasets/${datasetId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getAllDatasetsMetadata = async () => {
  try {
    const response = await apiService.get('/datasets/metadata');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteMetadataFromDataset = async (datasetId) => {
  try {
    const response = await apiService.delete(`/datasets/${datasetId}/metadata`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};


