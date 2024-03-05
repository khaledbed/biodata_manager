import apiService from './endPoint';

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
