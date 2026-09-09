import api from './api';

const reservationService = {
  getAll: (page = 0, size = 10) =>
    api.get(`/reservations?page=${page}&size=${size}`),
  getMyReservations: (page = 0, size = 10) =>
    api.get(`/reservations/my-reservations?page=${page}&size=${size}`),
  getById: (id) => api.get(`/reservations/${id}`),
  create: (data) => api.post('/reservations', data),
  returnEquipment: (id) => api.put(`/reservations/${id}/return`),
  delete: (id) => api.delete(`/reservations/${id}`),
};

export default reservationService;
