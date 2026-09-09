import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import {
  FaHome, FaCalendarAlt, FaBuilding, FaTools, FaExclamationTriangle,
  FaBullhorn, FaChartBar, FaUsers, FaCog, FaClipboardList
} from 'react-icons/fa';

const Sidebar = ({ collapsed, onToggle }) => {
  const { isAdmin } = useAuth();
  const { darkMode } = useTheme();

  const studentLinks = [
    { path: '/student/dashboard', icon: <FaHome />, label: 'Dashboard' },
    { path: '/events', icon: <FaCalendarAlt />, label: 'Events' },
    { path: '/bookings', icon: <FaBuilding />, label: 'Bookings' },
    { path: '/equipment', icon: <FaTools />, label: 'Equipment' },
    { path: '/complaints', icon: <FaExclamationTriangle />, label: 'Complaints' },
    { path: '/notifications', icon: <FaBullhorn />, label: 'Notifications' },
    { path: '/profile', icon: <FaCog />, label: 'Profile' },
  ];

  const adminLinks = [
    { path: '/admin/dashboard', icon: <FaHome />, label: 'Dashboard' },
    { path: '/events', icon: <FaCalendarAlt />, label: 'Events' },
    { path: '/bookings', icon: <FaBuilding />, label: 'Bookings' },
    { path: '/equipment', icon: <FaTools />, label: 'Equipment' },
    { path: '/complaints', icon: <FaExclamationTriangle />, label: 'Complaints' },
    { path: '/admin/announcements', icon: <FaBullhorn />, label: 'Announcements' },
    { path: '/admin/users', icon: <FaUsers />, label: 'Users' },
    { path: '/admin/reports', icon: <FaChartBar />, label: 'Reports' },
    { path: '/admin/audit-logs', icon: <FaClipboardList />, label: 'Audit Logs' },
    { path: '/profile', icon: <FaCog />, label: 'Profile' },
  ];

  const links = isAdmin() ? adminLinks : studentLinks;

  return (
    <motion.div
      className={`sidebar ${collapsed ? 'collapsed' : ''}`}
      animate={{ width: collapsed ? 65 : 260 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      style={{
        minHeight: 'calc(100vh - 60px)',
        background: darkMode
          ? 'linear-gradient(180deg, #0a0f1e 0%, #111827 50%, #0a0f1e 100%)'
          : 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
        borderRight: `1px solid ${darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
        overflowX: 'hidden',
        overflowY: 'auto',
        position: 'sticky',
        top: 60,
        zIndex: 100,
      }}
    >
      {/* Section Label */}
      {!collapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          style={{
            padding: '16px 20px 8px',
            fontSize: '0.7rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: darkMode ? '#475569' : '#94a3b8',
          }}
        >
          Navigation
        </motion.div>
      )}

      <nav className="py-2">
        {links.map((link, index) => (
          <motion.div
            key={link.path}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.03, duration: 0.3 }}
          >
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `d-flex align-items-center gap-3 px-3 py-2 mx-2 mb-1 rounded-3 text-decoration-none sidebar-link ${
                  isActive ? 'active' : ''
                }`
              }
              style={({ isActive }) => ({
                color: isActive
                  ? '#fff'
                  : darkMode ? '#94a3b8' : '#64748b',
                background: isActive
                  ? 'linear-gradient(135deg, #3b82f6, #14b8a6)'
                  : 'transparent',
                fontSize: '0.88rem',
                fontWeight: isActive ? 600 : 450,
                transition: 'all 0.2s ease',
                boxShadow: isActive ? '0 4px 15px rgba(59, 130, 246, 0.25)' : 'none',
              })}
            >
              <motion.span
                whileHover={{ scale: 1.15, rotate: 5 }}
                style={{
                  fontSize: '1.05rem',
                  minWidth: 22,
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {link.icon}
              </motion.span>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {link.label}
                </motion.span>
              )}
            </NavLink>
          </motion.div>
        ))}
      </nav>

      {/* Bottom Section */}
      {!collapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '16px',
            borderTop: `1px solid ${darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
          }}
        >
          <div className="d-flex align-items-center gap-2 px-2" style={{
            fontSize: '0.75rem',
            color: darkMode ? '#475569' : '#94a3b8',
          }}>
            <div style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#22c55e',
              boxShadow: '0 0 8px rgba(34, 197, 94, 0.4)',
            }} />
            System Online
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Sidebar;
