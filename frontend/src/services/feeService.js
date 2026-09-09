import api from './api';

const feeService = {
  getMy: () => api.get('/fees/my'),
  getAdminAll: () => api.get('/fees/admin/all'),
};

export default feeService;
