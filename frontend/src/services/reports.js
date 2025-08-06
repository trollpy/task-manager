import api from './api';

export const getPerformanceReport = async (params = {}) => {
  const response = await api.get('/reports/performance', { params });
  return response.data;
};

export const getTaskAnalytics = async (params = {}) => {
  const response = await api.get('/reports/task-analytics', { params });
  return response.data;
};

export const exportReport = async (format, params = {}) => {
  const response = await api.get('/reports/export', { 
    params: { ...params, format },
    responseType: 'blob'
  });
  return response.data;
};

export const generateAISummary = async (params = {}) => {
  const response = await api.get('/reports/ai-summary', { params });
  return response.data;
};