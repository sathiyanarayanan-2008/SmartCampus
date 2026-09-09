import api from './api';

const eventService = {
  getAll: (page = 0, size = 10, sortBy = 'createdAt', sortDir = 'desc') =>
    api.get(`/events?page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}`),
  getById: (id) => api.get(`/events/${id}`),
  create: (data) => api.post('/events', data),
  update: (id, data) => api.put(`/events/${id}`, data),
  delete: (id) => api.delete(`/events/${id}`),
  register: (id) => api.post(`/events/${id}/register`),
};

export default eventService;
