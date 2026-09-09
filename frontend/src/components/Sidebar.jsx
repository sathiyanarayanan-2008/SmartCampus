import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaUser, FaBook, FaCalendarAlt, FaChartBar, FaBookOpen, FaTrophy,
  FaMoneyBillWave, FaClipboardList, FaGraduationCap, FaCommentDots, FaReceipt,
  FaHome, FaBuilding, FaTools, FaExclamationTriangle, FaBullhorn,
  FaUsers, FaChartLine, FaCog, FaBell, FaChevronRight, FaChevronDown
} from 'react-icons/fa';

const Sidebar = ({ collapsed }) => {
  const { isAdmin } = useAuth();
  const [expandedMenus, setExpandedMenus] = useState({});

  const toggleMenu = (key) => {
    setExpandedMenus(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // SRM-style academic links for students
  const academicLinks = [
    { path: '/profile', icon: <FaUser />, label: 'My Profile' },
    { path: '/courses', icon: <FaBook />, label: 'Course Enrollment' },
    {
      label: 'Timetable', icon: <FaCalendarAlt />, key: 'timetable',
      children: [
        { path: '/timetable', label: 'Weekly View' },
      ]
    },
    { path: '/attendance', icon: <FaChartBar />, label: 'My Attendance' },
    { path: '/lesson-plans', icon: <FaBookOpen />, label: 'Lesson Plan' },
    {
      label: 'Score', icon: <FaTrophy />, key: 'score',
      children: [
        { path: '/scores', label: 'View Marks' },
        { path: '/results', label: 'Semester Result' },
      ]
    },
    { path: '/fee-details', icon: <FaMoneyBillWave />, label: 'My Fee Details' },
    { path: '/exam-registration', icon: <FaClipboardList />, label: 'Exam Registration' },
    { path: '/results', icon: <FaGraduationCap />, label: 'Result' },
    { path: '/feedback', icon: <FaCommentDots />, label: 'Feedback' },
    { path: '/receipts', icon: <FaReceipt />, label: 'My Receipts' },
  ];

  // Campus Services links
  const campusLinks = [
    { path: '/student/dashboard', icon: <FaHome />, label: 'Dashboard' },
    { path: '/events', icon: <FaCalendarAlt />, label: 'Events' },
    { path: '/bookings', icon: <FaBuilding />, label: 'Bookings' },
    { path: '/equipment', icon: <FaTools />, label: 'Equipment' },
    { path: '/complaints', icon: <FaExclamationTriangle />, label: 'Complaints' },
    { path: '/notifications', icon: <FaBell />, label: 'Notifications' },
  ];

  // Admin links
  const adminLinks = [
    { path: '/admin/dashboard', icon: <FaHome />, label: 'Dashboard' },
    { path: '/admin/users', icon: <FaUsers />, label: 'Users' },
    { path: '/admin/announcements', icon: <FaBullhorn />, label: 'Announcements' },
    { path: '/admin/reports', icon: <FaChartLine />, label: 'Reports' },
    { path: '/admin/audit-logs', icon: <FaCog />, label: 'Audit Logs' },
  ];

  const renderLink = (link, index) => {
    if (link.children) {
      const isExpanded = expandedMenus[link.key];
      return (
        <div key={link.key}>
          <div
            onClick={() => toggleMenu(link.key)}
            className="d-flex align-items-center justify-content-between px-3 py-2 mx-2 mb-1 rounded-3 sidebar-link"
            style={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: '0.88rem',
              fontWeight: 450,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
          >
            <div className="d-flex align-items-center gap-3">
              <span style={{ fontSize: '1.05rem', minWidth: 22, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {link.icon}
              </span>
              {!collapsed && <span>{link.label}</span>}
            </div>
            {!collapsed && (
              <motion.span animate={{ rotate: isExpanded ? 90 : 0 }} transition={{ duration: 0.2 }}>
                <FaChevronRight size={10} />
              </motion.span>
            )}
          </div>
          <AnimatePresence>
            {isExpanded && !collapsed && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ overflow: 'hidden' }}
              >
                {link.children.map((child, ci) => (
                  <NavLink key={child.path} to={child.path}
                    className={({ isActive }) => `d-flex align-items-center gap-2 px-3 py-2 mx-2 mb-1 rounded-3 text-decoration-none ${isActive ? 'active' : ''}`}
                    style={({ isActive }) => ({
                      color: isActive ? '#fff' : 'rgba(255,255,255,0.55)',
                      background: isActive ? 'rgba(255,255,255,0.12)' : 'transparent',
                      fontSize: '0.82rem',
                      fontWeight: isActive ? 600 : 400,
                      paddingLeft: 52,
                      transition: 'all 0.2s',
                    })}
                  >
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'currentColor', opacity: 0.5 }} />
                    {child.label}
                  </NavLink>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }

    return (
      <motion.div key={link.path} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.02, duration: 0.3 }}>
        <NavLink to={link.path}
          className={({ isActive }) => `d-flex align-items-center gap-3 px-3 py-2 mx-2 mb-1 rounded-3 text-decoration-none sidebar-link ${isActive ? 'active' : ''}`}
          style={({ isActive }) => ({
            color: isActive ? '#fff' : 'rgba(255,255,255,0.7)',
            background: isActive ? 'rgba(255,255,255,0.12)' : 'transparent',
            fontSize: '0.88rem',
            fontWeight: isActive ? 600 : 450,
            transition: 'all 0.2s ease',
            borderLeft: isActive ? '3px solid #14b8a6' : '3px solid transparent',
          })}
        >
          <span style={{ fontSize: '1.05rem', minWidth: 22, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {link.icon}
          </span>
          {!collapsed && <span>{link.label}</span>}
        </NavLink>
      </motion.div>
    );
  };

  const SectionLabel = ({ label }) => (
    !collapsed && (
      <div style={{
        padding: '16px 20px 8px',
        fontSize: '0.68rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: 'rgba(255,255,255,0.35)',
      }}>
        {label}
      </div>
    )
  );

  return (
    <motion.div
      className={`sidebar ${collapsed ? 'collapsed' : ''}`}
      animate={{ width: collapsed ? 65 : 270 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      style={{
        minHeight: 'calc(100vh - 60px)',
        background: 'linear-gradient(180deg, #003C43 0%, #00565e 50%, #003C43 100%)',
        borderRight: '1px solid rgba(255,255,255,0.08)',
        overflowX: 'hidden',
        overflowY: 'auto',
        position: 'sticky',
        top: 60,
        zIndex: 100,
      }}
    >
      {isAdmin() ? (
        <>
          <SectionLabel label="Administration" />
          <nav className="py-2">
            {adminLinks.map((link, i) => renderLink(link, i))}
          </nav>
          <SectionLabel label="Academic" />
          <nav className="py-1">
            {academicLinks.map((link, i) => renderLink(link, i))}
          </nav>
          <SectionLabel label="Campus Services" />
          <nav className="py-1">
            {campusLinks.filter(l => l.path !== '/student/dashboard').map((link, i) => renderLink(link, i))}
          </nav>
        </>
      ) : (
        <>
          <SectionLabel label="Academic" />
          <nav className="py-2">
            {academicLinks.map((link, i) => renderLink(link, i))}
          </nav>
          <SectionLabel label="Campus Services" />
          <nav className="py-1">
            {campusLinks.map((link, i) => renderLink(link, i))}
          </nav>
        </>
      )}

      {/* Bottom */}
      {!collapsed && (
        <div style={{
          padding: '16px',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          marginTop: 'auto',
        }}>
          <div className="d-flex align-items-center gap-2 px-2" style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px rgba(34, 197, 94, 0.4)' }} />
            System Online
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Sidebar;
