import api from './api';

const courseService = {
  getAll: () => api.get('/courses'),
  getEnrolled: () => api.get('/courses/enrolled'),
  enroll: (courseId) => api.post(`/courses/${courseId}/enroll`),
};

export default courseService;
