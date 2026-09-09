import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import DashboardLayout from '../components/DashboardLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import courseService from '../services/courseService';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { FaBook, FaUserTie, FaClock, FaGraduationCap } from 'react-icons/fa';

const CourseEnrollmentPage = () => {
  const { darkMode } = useTheme();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    courseService.getEnrolled()
      .then(res => setCourses(res.data?.data || []))
      .catch(() => toast.error('Failed to load courses'))
      .finally(() => setLoading(false));
  }, []);

  const cardBg = darkMode ? '#1e293b' : '#fff';
  const textPrimary = darkMode ? '#f1f5f9' : '#0f172a';
  const textSecondary = darkMode ? '#94a3b8' : '#64748b';

  const colors = ['#3b82f6', '#14b8a6', '#8b5cf6', '#f59e0b', '#ef4444', '#22c55e', '#ec4899', '#06b6d4'];

  return (
    <DashboardLayout>
      <div className="mb-4">
        <h3 style={{ fontWeight: 800, color: textPrimary }}>
          <FaBook className="me-2" style={{ color: '#3b82f6' }} />Course Enrollment
        </h3>
        <p style={{ color: textSecondary }}>Your enrolled courses for the current semester</p>
      </div>

      {loading ? <LoadingSpinner /> : (
        <div className="row g-4">
          {courses.length === 0 ? (
            <div className="text-center py-5">
              <FaGraduationCap size={60} style={{ color: textSecondary, opacity: 0.3 }} />
              <p className="mt-3" style={{ color: textSecondary }}>No courses enrolled yet</p>
            </div>
          ) : courses.map((course, i) => (
            <motion.div key={course.id || i} className="col-md-6 col-xl-4"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <motion.div whileHover={{ y: -6, boxShadow: `0 20px 40px ${colors[i % colors.length]}20` }}
                className="card border-0 h-100" style={{ borderRadius: 20, background: cardBg, overflow: 'hidden' }}>
                <div style={{ height: 6, background: `linear-gradient(90deg, ${colors[i % colors.length]}, ${colors[(i + 1) % colors.length]})` }} />
                <div className="card-body p-4">
                  <div className="d-flex align-items-start justify-content-between mb-3">
                    <span className="badge rounded-pill px-3 py-2" style={{ background: `${colors[i % colors.length]}15`, color: colors[i % colors.length], fontWeight: 700 }}>
                      {course.courseCode}
                    </span>
                    <span className="badge bg-primary rounded-pill">{course.credits} Credits</span>
                  </div>
                  <h5 style={{ fontWeight: 700, color: textPrimary, marginBottom: 16 }}>{course.courseName}</h5>
                  <div className="d-flex flex-column gap-2">
                    <div className="d-flex align-items-center gap-2">
                      <FaUserTie style={{ color: colors[i % colors.length], fontSize: '0.85rem' }} />
                      <span style={{ color: textSecondary, fontSize: '0.88rem' }}>{course.instructor}</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <FaClock style={{ color: colors[i % colors.length], fontSize: '0.85rem' }} />
                      <span style={{ color: textSecondary, fontSize: '0.88rem' }}>{course.schedule}</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <FaGraduationCap style={{ color: colors[i % colors.length], fontSize: '0.85rem' }} />
                      <span style={{ color: textSecondary, fontSize: '0.88rem' }}>Semester {course.semester}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default CourseEnrollmentPage;
