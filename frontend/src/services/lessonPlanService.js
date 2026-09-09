import api from './api';

const lessonPlanService = {
  getByCourse: (courseId) => api.get(`/lesson-plans/${courseId}`),
  getAll: () => api.get('/lesson-plans'),
};

export default lessonPlanService;
