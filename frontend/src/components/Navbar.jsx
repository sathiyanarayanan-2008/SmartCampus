import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { FaBell, FaMoon, FaSun, FaUser, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import notificationService from '../services/notificationService';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [unreadCount, setUnreadCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isAuthenticated()) {
      notificationService.getUnreadCount()
        .then((res) => setUnreadCount(res.data?.data || 0))
        .catch(() => {});
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getDashboardPath = () => {
    return user?.role === 'ADMIN' ? '/admin/dashboard' : '/student/dashboard';
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const authNavLinks = [
    { path: getDashboardPath(), label: 'Dashboard' },
    { path: '/events', label: 'Events' },
    { path: '/bookings', label: 'Bookings' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className={`navbar navbar-expand-lg sticky-top ${darkMode ? 'navbar-dark' : 'navbar-light'}`}
      style={{
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        backgroundColor: scrolled
          ? (darkMode ? 'rgba(10, 15, 30, 0.95)' : 'rgba(255, 255, 255, 0.92)')
          : (darkMode ? 'rgba(10, 15, 30, 0.8)' : 'rgba(255, 255, 255, 0.8)'),
        borderBottom: `1px solid ${darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
        boxShadow: scrolled ? '0 4px 30px rgba(0, 0, 0, 0.1)' : 'none',
        transition: 'all 0.3s ease',
        zIndex: 1030,
      }}
    >
      <div className="container">
        <Link className="navbar-brand fw-bold d-flex align-items-center gap-2 text-decoration-none" to="/">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="d-flex align-items-center gap-2"
          >
            <div style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #3b82f6, #14b8a6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.1rem',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
            }}>
              🎓
            </div>
            <span style={{
              background: 'linear-gradient(135deg, #3b82f6, #14b8a6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '1.3rem',
              fontWeight: 800,
              letterSpacing: '-0.02em',
            }}>
              SmartCampus
            </span>
          </motion.div>
        </Link>

        <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <FaBars />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {navLinks.map((link) => (
              <li key={link.path} className="nav-item">
                <Link
                  className="nav-link position-relative px-3"
                  to={link.path}
                  style={{
                    fontWeight: location.pathname === link.path ? 600 : 500,
                    color: location.pathname === link.path
                      ? (darkMode ? '#f1f5f9' : '#0f172a')
                      : (darkMode ? '#94a3b8' : '#64748b'),
                    transition: 'all 0.2s ease',
                  }}
                >
                  {link.label}
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="navIndicator"
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '60%',
                        height: 3,
                        background: 'linear-gradient(135deg, #3b82f6, #14b8a6)',
                        borderRadius: 3,
                      }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            ))}
            {isAuthenticated() && authNavLinks.map((link) => (
              <li key={link.path} className="nav-item">
                <Link
                  className="nav-link position-relative px-3"
                  to={link.path}
                  style={{
                    fontWeight: location.pathname === link.path ? 600 : 500,
                    color: location.pathname === link.path
                      ? (darkMode ? '#f1f5f9' : '#0f172a')
                      : (darkMode ? '#94a3b8' : '#64748b'),
                    transition: 'all 0.2s ease',
                  }}
                >
                  {link.label}
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="navIndicator"
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '60%',
                        height: 3,
                        background: 'linear-gradient(135deg, #3b82f6, #14b8a6)',
                        borderRadius: 3,
                      }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="d-flex align-items-center gap-3">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.15, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              className="btn btn-link p-0 border-0 shadow-none"
              onClick={toggleTheme}
              style={{
                color: darkMode ? '#fbbf24' : '#6366f1',
                fontSize: '1.2rem',
                width: 38,
                height: 38,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                background: darkMode ? 'rgba(251, 191, 36, 0.1)' : 'rgba(99, 102, 241, 0.1)',
              }}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={darkMode ? 'sun' : 'moon'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {darkMode ? <FaSun /> : <FaMoon />}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            {isAuthenticated() ? (
              <>
                {/* Notification Bell */}
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Link
                    to="/notifications"
                    className="btn btn-link p-0 border-0 position-relative shadow-none"
                    style={{
                      color: darkMode ? '#94a3b8' : '#64748b',
                      fontSize: '1.2rem',
                      width: 38,
                      height: 38,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      background: darkMode ? 'rgba(148, 163, 184, 0.08)' : 'rgba(100, 116, 139, 0.06)',
                    }}
                  >
                    <FaBell />
                    {unreadCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="position-absolute badge rounded-pill bg-danger"
                        style={{
                          fontSize: '0.6rem',
                          top: 2,
                          right: 0,
                          padding: '3px 6px',
                          boxShadow: '0 2px 8px rgba(239, 68, 68, 0.4)',
                        }}
                      >
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </motion.span>
                    )}
                  </Link>
                </motion.div>

                {/* User Dropdown */}
                <div className="dropdown">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="btn btn-link p-0 border-0 dropdown-toggle d-flex align-items-center gap-2 shadow-none"
                    data-bs-toggle="dropdown"
                    style={{ color: darkMode ? '#e2e8f0' : '#334155', textDecoration: 'none' }}
                  >
                    <div className="rounded-circle d-flex align-items-center justify-content-center"
                         style={{
                           width: 34,
                           height: 34,
                           background: 'linear-gradient(135deg, #3b82f6, #14b8a6)',
                           color: 'white',
                           fontSize: '0.8rem',
                           fontWeight: 700,
                           boxShadow: '0 2px 10px rgba(59, 130, 246, 0.3)',
                         }}>
                      {user?.firstName?.[0]}{user?.lastName?.[0]}
                    </div>
                    <span className="d-none d-md-inline" style={{ fontSize: '0.9rem', fontWeight: 500 }}>
                      {user?.firstName}
                    </span>
                  </motion.button>
                  <ul className={`dropdown-menu dropdown-menu-end ${darkMode ? 'dropdown-menu-dark' : ''}`}
                      style={{ background: darkMode ? '#1a1f36' : '#fff' }}>
                    <li>
                      <Link className="dropdown-item d-flex align-items-center gap-2" to="/profile">
                        <FaUser size={14} /> Profile
                      </Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item d-flex align-items-center gap-2 text-danger" onClick={handleLogout}>
                        <FaSignOutAlt size={14} /> Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <div className="d-flex gap-2">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link to="/login" className="btn btn-sm px-4 py-2"
                        style={{
                          borderRadius: 10,
                          fontWeight: 600,
                          border: `1.5px solid ${darkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'}`,
                          color: darkMode ? '#e2e8f0' : '#334155',
                          background: 'transparent',
                        }}>
                    Login
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link to="/register" className="btn btn-sm px-4 py-2"
                        style={{
                          background: 'linear-gradient(135deg, #3b82f6, #14b8a6)',
                          border: 'none',
                          borderRadius: 10,
                          color: '#fff',
                          fontWeight: 600,
                          boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
                        }}>
                    Register
                  </Link>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
