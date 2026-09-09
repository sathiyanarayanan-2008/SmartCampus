import api from './api';

const scoreService = {
  getMy: () => api.get('/scores/my'),
  getMyBySemester: (semester) => api.get(`/scores/my/semester/${semester}`),
  getAdminAll: () => api.get('/scores/admin/all'),
};

export default scoreService;
