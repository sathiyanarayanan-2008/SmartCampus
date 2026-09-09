import api from './api';

const notificationService = {
  getAll: (page = 0, size = 10) =>
    api.get(`/notifications?page=${page}&size=${size}`),
  getUnread: () => api.get('/notifications/unread'),
  getUnreadCount: () => api.get('/notifications/unread-count'),
  markAsRead: (id) => api.put(`/notifications/${id}/read`),
  markAllAsRead: () => api.put('/notifications/read-all'),
  delete: (id) => api.delete(`/notifications/${id}`),
};

export default notificationService;
