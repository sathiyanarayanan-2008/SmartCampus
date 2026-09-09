import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import DashboardLayout from '../components/DashboardLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import timetableService from '../services/timetableService';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const colors = ['#3b82f6', '#14b8a6', '#8b5cf6', '#f59e0b', '#ef4444', '#22c55e', '#ec4899', '#06b6d4'];

const TimetablePage = () => {
  const { darkMode } = useTheme();
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    timetableService.getMy()
      .then(res => setTimetable(res.data?.data || []))
      .catch(() => toast.error('Failed to load timetable'))
      .finally(() => setLoading(false));
  }, []);

  const textPrimary = darkMode ? '#f1f5f9' : '#0f172a';
  const textSecondary = darkMode ? '#94a3b8' : '#64748b';
  const cardBg = darkMode ? '#1e293b' : '#fff';

  const courseColorMap = {};
  let colorIdx = 0;
  timetable.forEach(t => {
    if (!courseColorMap[t.courseCode]) {
      courseColorMap[t.courseCode] = colors[colorIdx % colors.length];
      colorIdx++;
    }
  });

  const groupedByDay = {};
  days.forEach(d => { groupedByDay[d] = timetable.filter(t => t.dayOfWeek === d).sort((a, b) => a.startTime.localeCompare(b.startTime)); });

  return (
    <DashboardLayout>
      <div className="mb-4">
        <h3 style={{ fontWeight: 800, color: textPrimary }}>
          <FaCalendarAlt className="me-2" style={{ color: '#14b8a6' }} />Timetable
        </h3>
        <p style={{ color: textSecondary }}>Your weekly class schedule</p>
      </div>

      {loading ? <LoadingSpinner /> : (
        <div className="row g-3">
          {days.map((day, di) => (
            <motion.div key={day} className="col-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: di * 0.05 }}>
              <div className="card border-0 mb-2" style={{ borderRadius: 16, background: cardBg }}>
                <div className="card-body p-4">
                  <h5 className="mb-3" style={{ fontWeight: 700, color: textPrimary }}>
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: colors[di], display: 'inline-block', marginRight: 10 }} />
                    {day}
                  </h5>
                  {groupedByDay[day].length === 0 ? (
                    <p style={{ color: textSecondary, fontStyle: 'italic', margin: 0 }}>No classes</p>
                  ) : (
                    <div className="d-flex flex-wrap gap-3">
                      {groupedByDay[day].map((slot, si) => {
                        const color = courseColorMap[slot.courseCode] || '#3b82f6';
                        return (
                          <motion.div key={si} whileHover={{ scale: 1.02, y: -3 }} className="p-3 rounded-4 flex-fill" style={{
                            minWidth: 200, background: `${color}08`, border: `1px solid ${color}25`,
                            borderLeft: `4px solid ${color}`, transition: 'all 0.2s',
                          }}>
                            <div className="d-flex justify-content-between align-items-start mb-2">
                              <span className="badge rounded-pill" style={{ background: `${color}20`, color }}>{slot.courseCode}</span>
                              <div className="d-flex align-items-center gap-1" style={{ color: textSecondary, fontSize: '0.8rem' }}>
                                <FaClock size={10} /> {slot.startTime} - {slot.endTime}
                              </div>
                            </div>
                            <div style={{ fontWeight: 600, color: textPrimary, fontSize: '0.92rem', marginBottom: 6 }}>{slot.courseName}</div>
                            <div className="d-flex justify-content-between" style={{ fontSize: '0.8rem', color: textSecondary }}>
                              <span><FaMapMarkerAlt size={10} className="me-1" />{slot.room}</span>
                              <span>{slot.instructor}</span>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default TimetablePage;
