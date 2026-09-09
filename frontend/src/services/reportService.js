import api from './api';

const reportService = {
  exportReport: (type) =>
    api.get(`/reports/export?type=${type}`, { responseType: 'blob' }),
  getReportTypes: () => api.get('/reports/types'),
};

export default reportService;
