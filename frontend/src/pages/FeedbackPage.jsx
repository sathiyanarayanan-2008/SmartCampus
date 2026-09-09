import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import DashboardLayout from '../components/DashboardLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import feedbackService from '../services/feedbackService';
import courseService from '../services/courseService';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { FaCommentDots, FaStar, FaPaperPlane } from 'react-icons/fa';

const FeedbackPage = () => {
  const { darkMode } = useTheme();
  const [feedbacks, setFeedbacks] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comments, setComments] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const textPrimary = darkMode ? '#f1f5f9' : '#0f172a';
  const textSecondary = darkMode ? '#94a3b8' : '#64748b';
  const cardBg = darkMode ? '#1e293b' : '#fff';

  useEffect(() => {
    Promise.all([feedbackService.getMy(), courseService.getEnrolled()])
      .then(([fbRes, courseRes]) => {
        setFeedbacks(fbRes.data?.data || []);
        setCourses(courseRes.data?.data || []);
      })
      .catch(() => toast.error('Failed to load data'))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCourse || !rating) { toast.warning('Select a course and rating'); return; }
    const course = courses.find(c => c.id === selectedCourse);
    setSubmitting(true);
    try {
      await feedbackService.submit({ courseId: selectedCourse, courseCode: course?.courseCode, courseName: course?.courseName, rating, comments, semester: course?.semester || 3 });
      toast.success('Feedback submitted!');
      setSelectedCourse(''); setRating(0); setComments('');
      const res = await feedbackService.getMy();
      setFeedbacks(res.data?.data || []);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit');
    }
    setSubmitting(false);
  };

  const submittedCourseIds = feedbacks.map(f => f.courseId);
  const availableCourses = courses.filter(c => !submittedCourseIds.includes(c.id));

  return (
    <DashboardLayout>
      <div className="mb-4">
        <h3 style={{ fontWeight: 800, color: textPrimary }}>
          <FaCommentDots className="me-2" style={{ color: '#ec4899' }} />Feedback
        </h3>
        <p style={{ color: textSecondary }}>Submit course feedback and view past submissions</p>
      </div>

      {loading ? <LoadingSpinner /> : (
        <div className="row g-4">
          {/* Submit Feedback */}
          <div className="col-lg-5">
            <div className="card border-0" style={{ borderRadius: 20, background: cardBg, position: 'sticky', top: 80 }}>
              <div className="card-body p-4">
                <h5 className="mb-4" style={{ fontWeight: 700, color: textPrimary }}>Submit Feedback</h5>
                {availableCourses.length === 0 ? (
                  <p style={{ color: textSecondary }}>You've submitted feedback for all courses! ✅</p>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, color: textSecondary, marginBottom: 6 }}>Select Course</label>
                      <select className="form-select" value={selectedCourse} onChange={e => setSelectedCourse(e.target.value)}
                        style={{ borderRadius: 12, background: darkMode ? '#0f172a' : '#f8fafc', color: textPrimary, border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}` }}>
                        <option value="">Choose a course...</option>
                        {availableCourses.map(c => <option key={c.id} value={c.id}>{c.courseCode} — {c.courseName}</option>)}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, color: textSecondary, marginBottom: 6 }}>Rating</label>
                      <div className="d-flex gap-2">
                        {[1, 2, 3, 4, 5].map(star => (
                          <motion.div key={star} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}
                            onClick={() => setRating(star)} onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)}
                            style={{ cursor: 'pointer' }}>
                            <FaStar size={28} color={star <= (hoverRating || rating) ? '#f59e0b' : darkMode ? '#334155' : '#e2e8f0'} />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, color: textSecondary, marginBottom: 6 }}>Comments</label>
                      <textarea className="form-control" rows={4} value={comments} onChange={e => setComments(e.target.value)} placeholder="Share your experience..."
                        style={{ borderRadius: 12, background: darkMode ? '#0f172a' : '#f8fafc', color: textPrimary, border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`, resize: 'none' }} />
                    </div>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={submitting}
                      className="btn w-100 d-flex align-items-center justify-content-center gap-2"
                      style={{ borderRadius: 12, background: 'linear-gradient(135deg, #ec4899, #8b5cf6)', color: '#fff', fontWeight: 700, padding: '12px', border: 'none' }}>
                      <FaPaperPlane /> {submitting ? 'Submitting...' : 'Submit Feedback'}
                    </motion.button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Past Feedbacks */}
          <div className="col-lg-7">
            <h5 className="mb-3" style={{ fontWeight: 700, color: textPrimary }}>Past Submissions</h5>
            {feedbacks.length === 0 ? (
              <p style={{ color: textSecondary }}>No feedback submitted yet</p>
            ) : feedbacks.map((fb, i) => (
              <motion.div key={fb.id || i} className="card border-0 mb-3" style={{ borderRadius: 16, background: cardBg }}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <span className="badge rounded-pill me-2" style={{ background: '#8b5cf615', color: '#8b5cf6', fontWeight: 600 }}>{fb.courseCode}</span>
                      <span style={{ fontWeight: 600, color: textPrimary }}>{fb.courseName}</span>
                    </div>
                    <div className="d-flex gap-1">
                      {[1, 2, 3, 4, 5].map(s => <FaStar key={s} size={14} color={s <= fb.rating ? '#f59e0b' : darkMode ? '#334155' : '#e2e8f0'} />)}
                    </div>
                  </div>
                  {fb.comments && <p style={{ color: textSecondary, fontSize: '0.88rem', margin: 0, marginTop: 8 }}>{fb.comments}</p>}
                  {fb.submittedAt && <div className="mt-2" style={{ fontSize: '0.75rem', color: textSecondary }}>{new Date(fb.submittedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</div>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default FeedbackPage;
