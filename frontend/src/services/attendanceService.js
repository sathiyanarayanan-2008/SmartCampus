import api from './api';

const attendanceService = {
  getMy: () => api.get('/attendance/my'),
  getMyAll: () => api.get('/attendance/my/all'),
  getAdminAll: () => api.get('/attendance/admin/all'),
};

export default attendanceService;
