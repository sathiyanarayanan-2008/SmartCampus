import api from './api';

const dashboardService = {
  getAdminStats: () => api.get('/dashboard/admin'),
  getStudentStats: () => api.get('/dashboard/student'),
};

export default dashboardService;
