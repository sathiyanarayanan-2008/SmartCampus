import api from './api';

const bookingService = {
  getAll: (page = 0, size = 10, sortBy = 'createdAt', sortDir = 'desc') =>
    api.get(`/bookings?page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}`),
  getMyBookings: (page = 0, size = 10) =>
    api.get(`/bookings/my-bookings?page=${page}&size=${size}`),
  getById: (id) => api.get(`/bookings/${id}`),
  create: (data) => api.post('/bookings', data),
  updateStatus: (id, status, reason = '') =>
    api.put(`/bookings/${id}/status?status=${status}&reason=${reason}`),
  delete: (id) => api.delete(`/bookings/${id}`),
};

export default bookingService;
