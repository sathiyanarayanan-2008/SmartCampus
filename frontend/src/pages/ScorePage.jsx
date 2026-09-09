import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import DashboardLayout from '../components/DashboardLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import scoreService from '../services/scoreService';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { FaTrophy, FaChartLine } from 'react-icons/fa';

const ScorePage = () => {
  const { darkMode } = useTheme();
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    scoreService.getMy()
      .then(res => setScores(res.data?.data || []))
      .catch(() => toast.error('Failed to load scores'))
      .finally(() => setLoading(false));
  }, []);

  const textPrimary = darkMode ? '#f1f5f9' : '#0f172a';
  const textSecondary = darkMode ? '#94a3b8' : '#64748b';
  const cardBg = darkMode ? '#1e293b' : '#fff';

  const filteredScores = filter === 'ALL' ? scores : scores.filter(s => s.examType === filter);

  const grouped = {};
  filteredScores.forEach(s => {
    if (!grouped[s.courseCode]) grouped[s.courseCode] = { courseName: s.courseName, scores: [] };
    grouped[s.courseCode].scores.push(s);
  });

  const getGradeColor = (grade) => {
    const map = { 'O': '#22c55e', 'A+': '#14b8a6', 'A': '#3b82f6', 'B+': '#8b5cf6', 'B': '#f59e0b', 'C': '#ef4444' };
    return map[grade] || '#64748b';
  };

  return (
    <DashboardLayout>
      <div className="d-flex justify-content-between align-items-end mb-4 flex-wrap gap-3">
        <div>
          <h3 style={{ fontWeight: 800, color: textPrimary }}>
            <FaTrophy className="me-2" style={{ color: '#f59e0b' }} />Score
          </h3>
          <p style={{ color: textSecondary, margin: 0 }}>Your marks and grades across all exams</p>
        </div>
        <div className="d-flex gap-2">
          {['ALL', 'INTERNAL', 'EXTERNAL', 'ASSIGNMENT'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className="btn btn-sm"
              style={{
                borderRadius: 10, fontWeight: 600, fontSize: '0.8rem',
                background: filter === f ? 'linear-gradient(135deg, #3b82f6, #14b8a6)' : cardBg,
                color: filter === f ? '#fff' : textSecondary,
                border: filter === f ? 'none' : `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
              }}>
              {f === 'ALL' ? 'All' : f.charAt(0) + f.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {loading ? <LoadingSpinner /> : (
        <div className="card border-0" style={{ borderRadius: 16, background: cardBg }}>
          <div className="card-body p-4">
            <div className="table-responsive">
              <table className={`table mb-0 ${darkMode ? 'table-dark' : ''}`}>
                <thead>
                  <tr style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: textSecondary }}>
                    <th>Course</th><th>Exam Type</th><th>Marks</th><th>Max Marks</th><th>Percentage</th><th>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredScores.map((s, i) => {
                    const pct = s.maxMarks > 0 ? Math.round((s.marks / s.maxMarks) * 100) : 0;
                    return (
                      <motion.tr key={s.id || i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}>
                        <td>
                          <div style={{ fontWeight: 600, color: textPrimary }}>{s.courseCode}</div>
                          <div style={{ fontSize: '0.75rem', color: textSecondary }}>{s.courseName}</div>
                        </td>
                        <td>
                          <span className="badge rounded-pill" style={{
                            background: s.examType === 'INTERNAL' ? '#3b82f615' : s.examType === 'EXTERNAL' ? '#8b5cf615' : '#14b8a615',
                            color: s.examType === 'INTERNAL' ? '#3b82f6' : s.examType === 'EXTERNAL' ? '#8b5cf6' : '#14b8a6',
                            fontWeight: 600,
                          }}>
                            {s.examType}
                          </span>
                        </td>
                        <td style={{ fontWeight: 700, color: textPrimary }}>{s.marks}</td>
                        <td style={{ color: textSecondary }}>{s.maxMarks}</td>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <div style={{ width: 60, height: 6, borderRadius: 10, background: darkMode ? 'rgba(255,255,255,0.06)' : '#f1f5f9', overflow: 'hidden' }}>
                              <div style={{ width: `${pct}%`, height: '100%', borderRadius: 10, background: pct >= 60 ? '#22c55e' : pct >= 40 ? '#f59e0b' : '#ef4444' }} />
                            </div>
                            <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>{pct}%</span>
                          </div>
                        </td>
                        <td>
                          <span className="badge rounded-pill px-3" style={{ background: `${getGradeColor(s.grade)}20`, color: getGradeColor(s.grade), fontWeight: 700, fontSize: '0.85rem' }}>
                            {s.grade}
                          </span>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ScorePage;
