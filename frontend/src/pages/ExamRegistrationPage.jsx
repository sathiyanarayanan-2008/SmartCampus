import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import DashboardLayout from '../components/DashboardLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import examRegistrationService from '../services/examRegistrationService';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { FaClipboardList, FaCheckCircle } from 'react-icons/fa';

const ExamRegistrationPage = () => {
  const { darkMode } = useTheme();
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    examRegistrationService.getMy()
      .then(res => setRegistrations(res.data?.data || []))
      .catch(() => toast.error('Failed to load registrations'))
      .finally(() => setLoading(false));
  }, []);

  const textPrimary = darkMode ? '#f1f5f9' : '#0f172a';
  const textSecondary = darkMode ? '#94a3b8' : '#64748b';
  const cardBg = darkMode ? '#1e293b' : '#fff';

  return (
    <DashboardLayout>
      <div className="mb-4">
        <h3 style={{ fontWeight: 800, color: textPrimary }}>
          <FaClipboardList className="me-2" style={{ color: '#8b5cf6' }} />Exam Registration
        </h3>
        <p style={{ color: textSecondary }}>Your registered exams for the current semester</p>
      </div>

      {loading ? <LoadingSpinner /> : (
        <div className="card border-0" style={{ borderRadius: 16, background: cardBg }}>
          <div className="card-body p-4">
            {registrations.length === 0 ? (
              <div className="text-center py-5">
                <FaClipboardList size={50} style={{ color: textSecondary, opacity: 0.3 }} />
                <p className="mt-3" style={{ color: textSecondary }}>No exam registrations found</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className={`table mb-0 ${darkMode ? 'table-dark' : ''}`}>
                  <thead>
                    <tr style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: textSecondary }}>
                      <th>Course</th><th>Exam Type</th><th>Semester</th><th>Registered On</th><th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.map((r, i) => (
                      <motion.tr key={r.id || i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}>
                        <td>
                          <div style={{ fontWeight: 600, color: textPrimary }}>{r.courseCode}</div>
                          <div style={{ fontSize: '0.75rem', color: textSecondary }}>{r.courseName}</div>
                        </td>
                        <td>
                          <span className="badge rounded-pill" style={{ background: '#8b5cf615', color: '#8b5cf6', fontWeight: 600 }}>
                            {r.examType}
                          </span>
                        </td>
                        <td>{r.semester}</td>
                        <td style={{ color: textSecondary, fontSize: '0.88rem' }}>
                          {r.registeredAt ? new Date(r.registeredAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}
                        </td>
                        <td>
                          <span className="badge rounded-pill d-flex align-items-center gap-1" style={{ background: '#22c55e15', color: '#22c55e', fontWeight: 600, width: 'fit-content' }}>
                            <FaCheckCircle size={10} /> {r.status}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ExamRegistrationPage;
