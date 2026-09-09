import api from './api';

const userService = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  getAll: (page = 0, size = 10) =>
    api.get(`/users?page=${page}&size=${size}`),
  getById: (id) => api.get(`/users/${id}`),
  toggleEnabled: (id) => api.put(`/users/${id}/toggle-enabled`),
  delete: (id) => api.delete(`/users/${id}`),
};

export default userService;
