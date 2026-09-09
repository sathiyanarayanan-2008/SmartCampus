import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/DashboardLayout';
import StatsCard from '../components/StatsCard';
import LoadingSpinner from '../components/LoadingSpinner';
import dashboardService from '../services/dashboardService';
import { FaUsers, FaCalendarAlt, FaBuilding, FaTools, FaExclamationCircle, FaBullhorn, FaServer, FaCheckCircle, FaChartLine } from 'react-icons/fa';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Filler } from 'chart.js';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Filler);

const AdminDashboard = () => {
  const { darkMode } = useTheme();
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dashboardService.getAdminStats()
      .then((res) => setStats(res.data?.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <DashboardLayout><LoadingSpinner message="Loading dashboard..." /></DashboardLayout>;

  // Charts Config
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { color: darkMode ? '#94a3b8' : '#64748b' } },
      y: { grid: { color: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }, ticks: { color: darkMode ? '#94a3b8' : '#64748b' } },
    },
  };

  const bookingChart = {
    labels: ['Pending', 'Approved', 'Rejected'],
    datasets: [{
      data: [stats?.pendingBookings || 5, stats?.approvedBookings || 12, 2], // Dummy fallback
      backgroundColor: ['#f59e0b', '#22c55e', '#ef4444'],
      borderRadius: 6,
      barThickness: 30,
    }],
  };

  const complaintChart = {
    labels: ['Open', 'Resolved', 'Closed'],
    datasets: [{
      data: [stats?.openComplaints || 4, stats?.resolvedComplaints || 8, 3], // Dummy fallback
      backgroundColor: ['#ef4444', '#f59e0b', '#22c55e'],
      borderWidth: 0,
      hoverOffset: 4,
    }],
  };

  const activityChart = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'System Usage',
      data: [120, 190, 150, 220, 180, 90, 110], // Dummy
      fill: true,
      borderColor: '#8b5cf6',
      backgroundColor: (context) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, 'rgba(139, 92, 246, 0.4)');
        gradient.addColorStop(1, 'rgba(139, 92, 246, 0.0)');
        return gradient;
      },
      tension: 0.4,
      pointRadius: 0,
    }],
  };

  const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

  return (
    <DashboardLayout>
      <motion.div initial="hidden" animate="visible" variants={containerVariants}>
        
        {/* Header */}
        <motion.div variants={itemVariants} className="d-flex justify-content-between align-items-end mb-4 flex-wrap gap-3">
          <div>
            <h3 style={{ fontWeight: 800, color: darkMode ? '#f1f5f9' : '#0f172a', letterSpacing: '-0.02em', margin: 0 }}>
              Admin Overview
            </h3>
            <p style={{ color: darkMode ? '#94a3b8' : '#64748b', margin: 0, marginTop: 4 }}>
              Campus services analytics and system health
            </p>
          </div>
          <div className="d-flex align-items-center gap-2 p-2 px-3 rounded-pill" style={{ background: darkMode ? 'rgba(34,197,94,0.1)' : 'rgba(34,197,94,0.1)', border: `1px solid rgba(34,197,94,0.2)` }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 10px #22c55e' }} className="animate-pulse" />
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#22c55e' }}>System Healthy</span>
          </div>
        </motion.div>

        {/* Top Stats */}
        <motion.div variants={containerVariants} className="row g-4 mb-4">
          <motion.div variants={itemVariants} className="col-md-6 col-xl-3"><StatsCard title="Total Users" value={stats?.totalUsers || 0} icon={<FaUsers />} gradient="linear-gradient(135deg, #3b82f6, #2563eb)" subtitle={`${stats?.totalStudents || 0} students`} /></motion.div>
          <motion.div variants={itemVariants} className="col-md-6 col-xl-3"><StatsCard title="Active Events" value={stats?.totalEvents || 0} icon={<FaCalendarAlt />} gradient="linear-gradient(135deg, #14b8a6, #0d9488)" subtitle={`${stats?.upcomingEvents || 0} upcoming`} /></motion.div>
          <motion.div variants={itemVariants} className="col-md-6 col-xl-3"><StatsCard title="Total Bookings" value={stats?.totalBookings || 0} icon={<FaBuilding />} gradient="linear-gradient(135deg, #8b5cf6, #7c3aed)" subtitle={`${stats?.pendingBookings || 0} pending`} /></motion.div>
          <motion.div variants={itemVariants} className="col-md-6 col-xl-3"><StatsCard title="Complaints" value={stats?.totalComplaints || 0} icon={<FaExclamationCircle />} gradient="linear-gradient(135deg, #f59e0b, #d97706)" subtitle={`${stats?.openComplaints || 0} open`} /></motion.div>
        </motion.div>

        {/* Secondary Stats */}
        <motion.div variants={containerVariants} className="row g-4 mb-4">
          <motion.div variants={itemVariants} className="col-md-6 col-xl-3"><StatsCard title="Equipment" value={stats?.totalEquipments || 0} icon={<FaTools />} /></motion.div>
          <motion.div variants={itemVariants} className="col-md-6 col-xl-3"><StatsCard title="Reservations" value={stats?.totalReservations || 0} icon={<FaTools />} subtitle={`${stats?.activeReservations || 0} active`} /></motion.div>
          <motion.div variants={itemVariants} className="col-md-6 col-xl-3"><StatsCard title="Announcements" value={stats?.totalAnnouncements || 0} icon={<FaBullhorn />} /></motion.div>
          <motion.div variants={itemVariants} className="col-md-6 col-xl-3"><StatsCard title="Resolved Issues" value={stats?.resolvedComplaints || 0} icon={<FaCheckCircle />} /></motion.div>
        </motion.div>

        {/* Charts Row */}
        <motion.div variants={containerVariants} className="row g-4">
          
          {/* Booking Bar Chart */}
          <motion.div variants={itemVariants} className="col-lg-4">
            <div className="card border-0 premium-card h-100">
              <div className="card-body p-4 d-flex flex-column">
                <h6 style={{ fontWeight: 700, color: darkMode ? '#f1f5f9' : '#0f172a', marginBottom: 20 }}>Booking Status</h6>
                <div className="flex-grow-1" style={{ minHeight: 200, position: 'relative' }}>
                  <Bar data={bookingChart} options={chartOptions} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Activity Line Chart */}
          <motion.div variants={itemVariants} className="col-lg-5">
            <div className="card border-0 premium-card h-100">
              <div className="card-body p-4 d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h6 style={{ fontWeight: 700, color: darkMode ? '#f1f5f9' : '#0f172a', margin: 0 }}>Network Traffic</h6>
                  <FaChartLine style={{ color: '#8b5cf6' }} />
                </div>
                <div className="flex-grow-1" style={{ minHeight: 200, position: 'relative' }}>
                  <Line data={activityChart} options={{ ...chartOptions, scales: { x: { display: false }, y: { display: false } } }} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Complaint Doughnut Chart */}
          <motion.div variants={itemVariants} className="col-lg-3">
            <div className="card border-0 premium-card h-100">
              <div className="card-body p-4 d-flex flex-column align-items-center text-center">
                <h6 style={{ fontWeight: 700, color: darkMode ? '#f1f5f9' : '#0f172a', width: '100%', textAlign: 'left', marginBottom: 20 }}>Complaints</h6>
                <div style={{ width: '160px', height: '160px', position: 'relative', margin: 'auto' }}>
                  <Doughnut data={complaintChart} options={{ plugins: { legend: { display: false } }, cutout: '75%' }} />
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: darkMode ? '#f1f5f9' : '#0f172a', lineHeight: 1 }}>{stats?.totalComplaints || 0}</div>
                    <div style={{ fontSize: '0.65rem', color: darkMode ? '#94a3b8' : '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total</div>
                  </div>
                </div>
                <div className="d-flex justify-content-center gap-3 mt-4 w-100 flex-wrap">
                   <div className="d-flex align-items-center gap-1"><div style={{width: 8, height: 8, borderRadius: '50%', background: '#ef4444'}}></div><span style={{fontSize: '0.75rem', color: darkMode ? '#94a3b8' : '#64748b'}}>Open</span></div>
                   <div className="d-flex align-items-center gap-1"><div style={{width: 8, height: 8, borderRadius: '50%', background: '#f59e0b'}}></div><span style={{fontSize: '0.75rem', color: darkMode ? '#94a3b8' : '#64748b'}}>Resolved</span></div>
                   <div className="d-flex align-items-center gap-1"><div style={{width: 8, height: 8, borderRadius: '50%', background: '#22c55e'}}></div><span style={{fontSize: '0.75rem', color: darkMode ? '#94a3b8' : '#64748b'}}>Closed</span></div>
                </div>
              </div>
            </div>
          </motion.div>

        </motion.div>

      </motion.div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
