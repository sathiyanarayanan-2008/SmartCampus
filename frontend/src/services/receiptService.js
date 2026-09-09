import api from './api';

const receiptService = {
  getMy: () => api.get('/receipts/my'),
  getAdminAll: () => api.get('/receipts/admin/all'),
};

export default receiptService;
