import api from './api';

export const getTaskRecommendations = async (taskData) => {
  const response = await api.post('/ai/task-recommendations', taskData);
  return response.data;
};

export const getPerformanceInsights = async (params = {}) => {
  const response = await api.get('/ai/performance-insights', { params });
  return response.data;
};

export const generateReportSummary = async (reportData) => {
  const response = await api.post('/ai/generate-summary', reportData);
  return response.data;
};

export const optimizeWorkload = async (workloadData) => {
  const response = await api.post('/ai/optimize-workload', workloadData);
  return response.data;
};