import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import DashboardLayout from '../components/DashboardLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import lessonPlanService from '../services/lessonPlanService';
import courseService from '../services/courseService';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { FaBookOpen, FaCheckCircle, FaHourglass } from 'react-icons/fa';

const LessonPlanPage = () => {
  const { darkMode } = useTheme();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [plansLoading, setPlansLoading] = useState(false);

  const textPrimary = darkMode ? '#f1f5f9' : '#0f172a';
  const textSecondary = darkMode ? '#94a3b8' : '#64748b';
  const cardBg = darkMode ? '#1e293b' : '#fff';

  useEffect(() => {
    courseService.getEnrolled()
      .then(res => {
        const data = res.data?.data || [];
        setCourses(data);
        if (data.length > 0) {
          setSelectedCourse(data[0].id);
        }
      })
      .catch(() => toast.error('Failed to load courses'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedCourse) return;
    setPlansLoading(true);
    lessonPlanService.getByCourse(selectedCourse)
      .then(res => setPlans(res.data?.data || []))
      .catch(() => {})
      .finally(() => setPlansLoading(false));
  }, [selectedCourse]);

  return (
    <DashboardLayout>
      <div className="mb-4">
        <h3 style={{ fontWeight: 800, color: textPrimary }}>
          <FaBookOpen className="me-2" style={{ color: '#f59e0b' }} />Lesson Plan
        </h3>
        <p style={{ color: textSecondary }}>Week-by-week curriculum for your courses</p>
      </div>

      {loading ? <LoadingSpinner /> : (
        <>
          <div className="mb-4">
            <select className="form-select" value={selectedCourse} onChange={e => setSelectedCourse(e.target.value)}
              style={{ maxWidth: 400, borderRadius: 12, background: cardBg, color: textPrimary, border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`, padding: '10px 16px' }}>
              {courses.map(c => (
                <option key={c.id} value={c.id}>{c.courseCode} — {c.courseName}</option>
              ))}
            </select>
          </div>

          {plansLoading ? <LoadingSpinner /> : (
            <div className="position-relative">
              <div style={{ position: 'absolute', top: 0, bottom: 0, left: 24, width: 3, background: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)', borderRadius: 4 }} />
              {plans.map((plan, i) => (
                <motion.div key={plan.id || i} className="position-relative ps-5 mb-4"
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                  <div style={{
                    position: 'absolute', left: 16, top: 20, width: 18, height: 18, borderRadius: '50%',
                    background: plan.completed ? '#22c55e' : darkMode ? '#334155' : '#e2e8f0',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: `3px solid ${darkMode ? '#1e293b' : '#fff'}`, zIndex: 2,
                  }}>
                    {plan.completed && <FaCheckCircle size={10} color="#fff" />}
                  </div>
                  <div className="card border-0" style={{ borderRadius: 16, background: cardBg, border: `1px solid ${darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'}` }}>
                    <div className="card-body p-4">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div>
                          <span className="badge rounded-pill me-2" style={{ background: '#3b82f615', color: '#3b82f6', fontWeight: 600 }}>
                            Week {plan.weekNumber}
                          </span>
                          {plan.completed ? (
                            <span className="badge rounded-pill" style={{ background: '#22c55e15', color: '#22c55e' }}>Completed</span>
                          ) : (
                            <span className="badge rounded-pill" style={{ background: '#f59e0b15', color: '#f59e0b' }}>
                              <FaHourglass size={10} className="me-1" />Upcoming
                            </span>
                          )}
                        </div>
                        {plan.completedDate && <span style={{ fontSize: '0.78rem', color: textSecondary }}>{plan.completedDate}</span>}
                      </div>
                      <h6 style={{ fontWeight: 700, color: textPrimary, marginBottom: 6 }}>{plan.topic}</h6>
                      <p style={{ color: textSecondary, fontSize: '0.88rem', margin: 0 }}>{plan.description}</p>
                      {plan.resources && (
                        <div className="mt-2" style={{ fontSize: '0.8rem', color: '#8b5cf6' }}>📖 {plan.resources}</div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </>
      )}
    </DashboardLayout>
  );
};

export default LessonPlanPage;
