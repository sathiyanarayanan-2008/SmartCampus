import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/DashboardLayout';
import StatsCard from '../components/StatsCard';
import LoadingSpinner from '../components/LoadingSpinner';
import dashboardService from '../services/dashboardService';
import announcementService from '../services/announcementService';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaBuilding, FaTools, FaExclamationCircle, FaBell, FaBullhorn, FaCheck, FaExclamationTriangle } from 'react-icons/fa';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

const StudentDashboard = () => {
  const { darkMode } = useTheme();
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      dashboardService.getStudentStats(),
      announcementService.getCurrent(),
    ]).then(([statsRes, annRes]) => {
      setStats(statsRes.data?.data);
      setAnnouncements(annRes.data?.data || []);
    }).catch(() => {})
    .finally(() => setLoading(false));
  }, []);

  if (loading) return <DashboardLayout><LoadingSpinner message="Loading dashboard..." /></DashboardLayout>;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Dummy activity data for the chart
  const activityChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Campus Activity',
      data: [3, 5, 2, 8, 4, 1, 6], // Dummy values
      fill: true,
      borderColor: '#3b82f6',
      backgroundColor: darkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.1)',
      tension: 0.4,
      pointBackgroundColor: '#fff',
      pointBorderColor: '#3b82f6',
      pointBorderWidth: 2,
    }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { color: darkMode ? '#94a3b8' : '#64748b' } },
      y: { display: false },
    },
    interaction: { intersect: false, mode: 'index' },
  };

  const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

  return (
    <DashboardLayout>
      <motion.div initial="hidden" animate="visible" variants={containerVariants}>
        
        {/* Welcome Banner */}
        <motion.div variants={itemVariants} className="mb-5 position-relative overflow-hidden" style={{
          borderRadius: 24,
          background: darkMode ? 'linear-gradient(135deg, #1e293b, #0f172a)' : 'linear-gradient(135deg, #3b82f6, #14b8a6)',
          color: '#fff',
          padding: '40px',
          boxShadow: darkMode ? '0 10px 30px rgba(0,0,0,0.3)' : '0 10px 30px rgba(59,130,246,0.2)',
        }}>
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            style={{ position: 'absolute', top: -100, right: -50, width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontWeight: 800, fontSize: '2.2rem', marginBottom: 8, letterSpacing: '-0.02em' }}>
              {getGreeting()}, {user?.firstName}! <motion.span animate={{ rotate: [0, 20, 0, -20, 0] }} transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }} style={{ display: 'inline-block', transformOrigin: 'bottom right' }}>👋</motion.span>
            </h2>
            <p style={{ opacity: 0.85, fontSize: '1.05rem', margin: 0, maxWidth: 500 }}>
              Here's what's happening around campus today. You have {stats?.unreadNotifications || 0} unread notifications.
            </p>
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div variants={containerVariants} className="row g-4 mb-5">
          <motion.div variants={itemVariants} className="col-md-6 col-xl-3"><StatsCard title="Upcoming Events" value={stats?.upcomingEvents || 0} icon={<FaCalendarAlt />} gradient="linear-gradient(135deg, #3b82f6, #2563eb)" subtitle="Registered events" /></motion.div>
          <motion.div variants={itemVariants} className="col-md-6 col-xl-3"><StatsCard title="My Bookings" value={stats?.totalBookings || 0} icon={<FaBuilding />} gradient="linear-gradient(135deg, #14b8a6, #0d9488)" subtitle="Active bookings" /></motion.div>
          <motion.div variants={itemVariants} className="col-md-6 col-xl-3"><StatsCard title="My Reservations" value={stats?.totalReservations || 0} icon={<FaTools />} gradient="linear-gradient(135deg, #8b5cf6, #7c3aed)" subtitle="Equipment requests" /></motion.div>
          <motion.div variants={itemVariants} className="col-md-6 col-xl-3"><StatsCard title="My Complaints" value={stats?.totalComplaints || 0} icon={<FaExclamationCircle />} gradient="linear-gradient(135deg, #f59e0b, #d97706)" subtitle="Total filed" /></motion.div>
        </motion.div>

        <div className="row g-4">
          {/* Announcements Timeline */}
          <motion.div variants={itemVariants} className="col-lg-7">
            <div className="card border-0 h-100 premium-card">
              <div className="card-body p-4 p-xl-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 style={{ fontWeight: 800, color: darkMode ? '#f1f5f9' : '#0f172a', margin: 0 }}>
                    <FaBullhorn className="me-2" style={{ color: '#3b82f6' }} /> Recent Announcements
                  </h5>
                </div>
                
                {announcements.length === 0 ? (
                  <div className="text-center py-5">
                    <FaCheck size={40} style={{ color: '#22c55e', opacity: 0.5, marginBottom: 16 }} />
                    <p style={{ color: darkMode ? '#94a3b8' : '#64748b', margin: 0 }}>You're all caught up!</p>
                  </div>
                ) : (
                  <div className="position-relative">
                    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 15, width: 2, background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }} />
                    {announcements.slice(0, 4).map((a, i) => (
                      <motion.div key={a.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="position-relative ps-5 mb-4">
                        <div style={{ position: 'absolute', left: 11, top: 4, width: 10, height: 10, borderRadius: '50%', background: a.priority === 'HIGH' ? '#ef4444' : a.priority === 'MEDIUM' ? '#f59e0b' : '#3b82f6', border: `2px solid ${darkMode ? '#1e293b' : '#fff'}`, boxShadow: '0 0 0 3px rgba(0,0,0,0.02)' }} />
                        <div className="p-3 rounded-4" style={{ background: darkMode ? 'rgba(255,255,255,0.03)' : '#f8fafc', border: `1px solid ${darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'}`, transition: 'all 0.2s', cursor: 'pointer' }}
                             onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateX(5px)'; e.currentTarget.style.background = darkMode ? 'rgba(255,255,255,0.06)' : '#fff'; e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.03)'; }}
                             onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateX(0)'; e.currentTarget.style.background = darkMode ? 'rgba(255,255,255,0.03)' : '#f8fafc'; e.currentTarget.style.boxShadow = 'none'; }}>
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <h6 style={{ color: darkMode ? '#e2e8f0' : '#1e293b', fontWeight: 700, margin: 0 }}>{a.title}</h6>
                            <span className="badge rounded-pill" style={{ background: `${a.priority === 'HIGH' ? '#ef4444' : a.priority === 'MEDIUM' ? '#f59e0b' : '#3b82f6'}15`, color: a.priority === 'HIGH' ? '#ef4444' : a.priority === 'MEDIUM' ? '#f59e0b' : '#3b82f6', fontSize: '0.65rem' }}>{a.priority}</span>
                          </div>
                          <p style={{ color: darkMode ? '#94a3b8' : '#64748b', fontSize: '0.85rem', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{a.content}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Quick Stats & Activity Chart */}
          <motion.div variants={itemVariants} className="col-lg-5 d-flex flex-column gap-4">
            <div className="card border-0 premium-card">
              <div className="card-body p-4">
                <h6 className="mb-4" style={{ fontWeight: 700, color: darkMode ? '#f1f5f9' : '#0f172a' }}><FaBell className="me-2" style={{ color: '#14b8a6' }} /> Action Required</h6>
                <div className="d-flex flex-column gap-3">
                  {[
                    { label: 'Unread Notifications', value: stats?.unreadNotifications || 0, icon: <FaBell />, color: '#ef4444' },
                    { label: 'Open Complaints', value: stats?.openComplaints || 0, icon: <FaExclamationTriangle />, color: '#f59e0b' },
                    { label: 'Pending Bookings', value: stats?.pendingBookings || 0, icon: <FaBuilding />, color: '#8b5cf6' },
                  ].map((item, i) => (
                    <motion.div key={i} whileHover={{ x: 5 }} className="d-flex justify-content-between align-items-center p-3 rounded-3" style={{ background: darkMode ? 'rgba(255,255,255,0.03)' : '#f8fafc', border: `1px solid ${darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'}` }}>
                      <div className="d-flex align-items-center gap-3">
                        <div style={{ width: 32, height: 32, borderRadius: '50%', background: `${item.color}15`, color: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.icon}</div>
                        <span style={{ color: darkMode ? '#e2e8f0' : '#334155', fontSize: '0.9rem', fontWeight: 500 }}>{item.label}</span>
                      </div>
                      {item.value > 0 ? (
                        <span className="badge rounded-pill" style={{ background: item.color, color: '#fff', fontSize: '0.8rem' }}>{item.value}</span>
                      ) : (
                        <FaCheck style={{ color: '#22c55e' }} />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card border-0 premium-card flex-grow-1">
              <div className="card-body p-4 d-flex flex-column">
                <h6 className="mb-4" style={{ fontWeight: 700, color: darkMode ? '#f1f5f9' : '#0f172a' }}>Weekly Activity</h6>
                <div className="flex-grow-1" style={{ minHeight: 150 }}>
                  <Line data={activityChartData} options={chartOptions} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </motion.div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
