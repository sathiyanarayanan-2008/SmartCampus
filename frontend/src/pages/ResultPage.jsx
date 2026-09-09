import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import DashboardLayout from '../components/DashboardLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import resultService from '../services/resultService';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaChartLine } from 'react-icons/fa';

const ResultPage = () => {
  const { darkMode } = useTheme();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    resultService.getMy()
      .then(res => setResults(res.data?.data || []))
      .catch(() => toast.error('Failed to load results'))
      .finally(() => setLoading(false));
  }, []);

  const textPrimary = darkMode ? '#f1f5f9' : '#0f172a';
  const textSecondary = darkMode ? '#94a3b8' : '#64748b';
  const cardBg = darkMode ? '#1e293b' : '#fff';

  const getGradeColor = (grade) => {
    const map = { 'O': '#22c55e', 'A+': '#14b8a6', 'A': '#3b82f6', 'B+': '#8b5cf6', 'B': '#f59e0b', 'C': '#ef4444' };
    return map[grade] || '#64748b';
  };

  return (
    <DashboardLayout>
      <div className="mb-4">
        <h3 style={{ fontWeight: 800, color: textPrimary }}>
          <FaGraduationCap className="me-2" style={{ color: '#3b82f6' }} />Result
        </h3>
        <p style={{ color: textSecondary }}>Semester-wise academic results</p>
      </div>

      {loading ? <LoadingSpinner /> : (
        results.length === 0 ? (
          <div className="text-center py-5">
            <FaGraduationCap size={60} style={{ color: textSecondary, opacity: 0.3 }} />
            <p className="mt-3" style={{ color: textSecondary }}>No results available</p>
          </div>
        ) : results.map((result, ri) => (
          <motion.div key={result.id || ri} className="mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: ri * 0.1 }}>
            <div className="card border-0" style={{ borderRadius: 20, background: cardBg, overflow: 'hidden' }}>
              {/* Header */}
              <div className="p-4 pb-3" style={{ background: 'linear-gradient(135deg, #3b82f6, #14b8a6)', color: '#fff' }}>
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                  <div>
                    <h5 style={{ fontWeight: 700, margin: 0 }}>Semester {result.semester}</h5>
                    <span style={{ opacity: 0.85, fontSize: '0.88rem' }}>{result.totalCredits} Credits</span>
                  </div>
                  <div className="d-flex gap-4">
                    <div className="text-center">
                      <div style={{ fontSize: '2rem', fontWeight: 900, lineHeight: 1 }}>{result.sgpa}</div>
                      <div style={{ fontSize: '0.72rem', opacity: 0.85, textTransform: 'uppercase', letterSpacing: '0.05em' }}>SGPA</div>
                    </div>
                    <div className="text-center">
                      <div style={{ fontSize: '2rem', fontWeight: 900, lineHeight: 1 }}>{result.cgpa}</div>
                      <div style={{ fontSize: '0.72rem', opacity: 0.85, textTransform: 'uppercase', letterSpacing: '0.05em' }}>CGPA</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Results Table */}
              <div className="p-4">
                <div className="table-responsive">
                  <table className={`table mb-0 ${darkMode ? 'table-dark' : ''}`}>
                    <thead>
                      <tr style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: textSecondary }}>
                        <th>Course Code</th><th>Course Name</th><th>Credits</th><th>Grade</th><th>Grade Point</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(result.courseResults || []).map((cr, ci) => (
                        <tr key={ci}>
                          <td style={{ fontWeight: 600, color: textPrimary }}>{cr.courseCode}</td>
                          <td style={{ color: textSecondary }}>{cr.courseName}</td>
                          <td style={{ fontWeight: 600 }}>{cr.credits}</td>
                          <td>
                            <span className="badge rounded-pill px-3" style={{ background: `${getGradeColor(cr.grade)}20`, color: getGradeColor(cr.grade), fontWeight: 700 }}>
                              {cr.grade}
                            </span>
                          </td>
                          <td style={{ fontWeight: 700, color: textPrimary }}>{cr.gradePoint}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </motion.div>
        ))
      )}
    </DashboardLayout>
  );
};

export default ResultPage;
