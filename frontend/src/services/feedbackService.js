import api from './api';

const feedbackService = {
  getMy: () => api.get('/feedback/my'),
  submit: (data) => api.post('/feedback', data),
  getAdminAll: () => api.get('/feedback/admin/all'),
};

export default feedbackService;
