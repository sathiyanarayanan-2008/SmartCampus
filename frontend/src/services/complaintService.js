import api from './api';

const complaintService = {
  getAll: (page = 0, size = 10) =>
    api.get(`/complaints?page=${page}&size=${size}`),
  getMyComplaints: (page = 0, size = 10) =>
    api.get(`/complaints/my-complaints?page=${page}&size=${size}`),
  getById: (id) => api.get(`/complaints/${id}`),
  create: (data) => api.post('/complaints', data),
  updateStatus: (id, status, resolution = '') =>
    api.put(`/complaints/${id}/status?status=${status}&resolution=${resolution}`),
  delete: (id) => api.delete(`/complaints/${id}`),
};

export default complaintService;
