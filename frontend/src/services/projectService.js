import apiService from './endPoint';

export const getProjectCount = async () => {
  try {
    const response = await apiService.get('/projects/count');
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
