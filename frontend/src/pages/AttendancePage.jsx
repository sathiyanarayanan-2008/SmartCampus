import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import DashboardLayout from '../components/DashboardLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import attendanceService from '../services/attendanceService';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { FaChartBar, FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';

const AttendancePage = () => {
  const { darkMode } = useTheme();
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    attendanceService.getMy()
      .then(res => setAttendance(res.data?.data || []))
      .catch(() => toast.error('Failed to load attendance'))
      .finally(() => setLoading(false));
  }, []);

  const textPrimary = darkMode ? '#f1f5f9' : '#0f172a';
  const textSecondary = darkMode ? '#94a3b8' : '#64748b';
  const cardBg = darkMode ? '#1e293b' : '#fff';

  const getBarColor = (pct) => {
    if (pct >= 90) return '#22c55e';
    if (pct >= 75) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <DashboardLayout>
      <div className="mb-4">
        <h3 style={{ fontWeight: 800, color: textPrimary }}>
          <FaChartBar className="me-2" style={{ color: '#8b5cf6' }} />My Attendance
        </h3>
        <p style={{ color: textSecondary }}>Subject-wise attendance summary</p>
      </div>

      {loading ? <LoadingSpinner /> : (
        <>
          {/* Summary Cards */}
          <div className="row g-3 mb-4">
            {(() => {
              const totalClasses = attendance.reduce((s, a) => s + (a.totalClasses || 0), 0);
              const totalPresent = attendance.reduce((s, a) => s + (a.present || 0), 0);
              const totalAbsent = attendance.reduce((s, a) => s + (a.absent || 0), 0);
              const overallPct = totalClasses > 0 ? Math.round((totalPresent / totalClasses) * 100) : 0;
              return [
                { label: 'Overall Attendance', value: `${overallPct}%`, icon: <FaChartBar />, color: getBarColor(overallPct) },
                { label: 'Total Present', value: totalPresent, icon: <FaCheckCircle />, color: '#22c55e' },
                { label: 'Total Absent', value: totalAbsent, icon: <FaTimesCircle />, color: '#ef4444' },
                { label: 'Total Classes', value: totalClasses, icon: <FaClock />, color: '#3b82f6' },
              ].map((card, i) => (
                <div key={i} className="col-md-6 col-xl-3">
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                    className="card border-0 p-3" style={{ borderRadius: 16, background: cardBg }}>
                    <div className="d-flex align-items-center gap-3">
                      <div style={{ width: 48, height: 48, borderRadius: 14, background: `${card.color}15`, color: card.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                        {card.icon}
                      </div>
                      <div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: textPrimary }}>{card.value}</div>
                        <div style={{ fontSize: '0.78rem', color: textSecondary }}>{card.label}</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ));
            })()}
          </div>

          {/* Subject-wise Table */}
          <div className="card border-0" style={{ borderRadius: 16, background: cardBg }}>
            <div className="card-body p-4">
              <h5 className="mb-4" style={{ fontWeight: 700, color: textPrimary }}>Subject-wise Breakdown</h5>
              <div className="table-responsive">
                <table className={`table mb-0 ${darkMode ? 'table-dark' : ''}`}>
                  <thead>
                    <tr style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: textSecondary }}>
                      <th>Course</th><th>Total</th><th>Present</th><th>Absent</th><th>Late</th><th>Attendance %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendance.map((a, i) => {
                      const color = getBarColor(a.percentage);
                      return (
                        <motion.tr key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}>
                          <td>
                            <div style={{ fontWeight: 600, color: textPrimary }}>{a.courseCode}</div>
                            <div style={{ fontSize: '0.78rem', color: textSecondary }}>{a.courseName}</div>
                          </td>
                          <td style={{ fontWeight: 600 }}>{a.totalClasses}</td>
                          <td><span style={{ color: '#22c55e', fontWeight: 600 }}>{a.present}</span></td>
                          <td><span style={{ color: '#ef4444', fontWeight: 600 }}>{a.absent}</span></td>
                          <td><span style={{ color: '#f59e0b', fontWeight: 600 }}>{a.late}</span></td>
                          <td style={{ minWidth: 180 }}>
                            <div className="d-flex align-items-center gap-2">
                              <div style={{ flex: 1, height: 8, borderRadius: 10, background: darkMode ? 'rgba(255,255,255,0.06)' : '#f1f5f9', overflow: 'hidden' }}>
                                <motion.div initial={{ width: 0 }} animate={{ width: `${a.percentage}%` }} transition={{ duration: 1, delay: i * 0.05 }}
                                  style={{ height: '100%', borderRadius: 10, background: `linear-gradient(90deg, ${color}, ${color}cc)` }} />
                              </div>
                              <span style={{ fontWeight: 700, color, fontSize: '0.88rem', minWidth: 42 }}>{a.percentage}%</span>
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default AttendancePage;
