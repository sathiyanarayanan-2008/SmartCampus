import api from './api';

const equipmentService = {
  getAll: (page = 0, size = 10, search = '') =>
    api.get(`/equipments?page=${page}&size=${size}${search ? `&search=${search}` : ''}`),
  getById: (id) => api.get(`/equipments/${id}`),
  create: (data) => api.post('/equipments', data),
  update: (id, data) => api.put(`/equipments/${id}`, data),
  delete: (id) => api.delete(`/equipments/${id}`),
};

export default equipmentService;
