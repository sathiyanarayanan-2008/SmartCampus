import api from './api';

const examRegistrationService = {
  getMy: () => api.get('/exam-registration/my'),
  register: (data) => api.post('/exam-registration', data),
  getAdminAll: () => api.get('/exam-registration/admin/all'),
};

export default examRegistrationService;
