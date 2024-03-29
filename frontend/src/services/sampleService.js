import apiService from './endPoint';


export const getSampleCount = async () => {
  try {
    const response = await apiService.get('/samples/count');
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
