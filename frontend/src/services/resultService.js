import api from './api';

const resultService = {
  getMy: () => api.get('/results/my'),
  getAdminAll: () => api.get('/results/admin/all'),
};

export default resultService;
