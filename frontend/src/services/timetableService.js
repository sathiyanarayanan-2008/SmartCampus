import api from './api';

const timetableService = {
  getMy: () => api.get('/timetable/my'),
  getAll: () => api.get('/timetable'),
};

export default timetableService;
