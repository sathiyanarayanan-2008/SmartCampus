import api from './api';

const announcementService = {
  getAll: (page = 0, size = 10) =>
    api.get(`/announcements?page=${page}&size=${size}`),
  getCurrent: () => api.get('/announcements/current'),
  getById: (id) => api.get(`/announcements/${id}`),
  create: (data) => api.post('/announcements', data),
  update: (id, data) => api.put(`/announcements/${id}`, data),
  toggle: (id) => api.put(`/announcements/${id}/toggle`),
  delete: (id) => api.delete(`/announcements/${id}`),
};

export default announcementService;
