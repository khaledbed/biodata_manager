import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

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

export const getCounts = async () => {
  try {
    const response = await apiService.get('/counts');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getProjectCount = async () => {
  try {
    const response = await apiService.get('/projects/count');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getSampleCount = async () => {
  try {
    const response = await apiService.get('/samples/count');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getAllProjects = async () => {
  try {
    const response = await apiService.get('/projects/');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getProjectById = async (projectId) => {
  try {
    const response = await apiService.get(`/projects/${projectId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createProject = async (projectData) => {
  try {
    const response = await apiService.post('/projects', projectData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateProject = async (projectId, projectData) => {
  try {
    const response = await apiService.put(`/projects/${projectId}`, projectData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteProject = async (projectId) => {
  try {
    const response = await apiService.delete(`/projects/${projectId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getAllSamples = async () => {
  try {
    const response = await apiService.get('/samples/');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getSampleById = async (sampleId) => {
  try {
    const response = await apiService.get(`/samples/${sampleId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createSample = async (sampleData) => {
  try {
    const response = await apiService.post('/samples', sampleData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateSample = async (sampleId, sampleData) => {
  try {
    const response = await apiService.put(`/samples/${sampleId}`, sampleData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteSample = async (sampleId) => {
  try {
    const response = await apiService.delete(`/samples/${sampleId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

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

export const getAllMethods = async () => {
  try {
    const response = await apiService.get('/methods');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getMethodById = async (methodId) => {
  try {
    const response = await apiService.get(`/methods/${methodId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createMethod = async (methodData) => {
  try {
    const response = await apiService.post('/methods', methodData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateMethod = async (methodId, methodData) => {
  try {
    const response = await apiService.put(`/methods/${methodId}`, methodData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteMethod = async (methodId) => {
  try {
    const response = await apiService.delete(`/methods/${methodId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

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
