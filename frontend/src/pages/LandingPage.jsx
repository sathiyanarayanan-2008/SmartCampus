import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import {
  FaCalendarAlt, FaBuilding, FaTools, FaShieldAlt, FaBullhorn, FaChartBar,
  FaArrowRight, FaCheck, FaRocket, FaCog, FaUserShield
} from 'react-icons/fa';

// Animated Counter Hook
const useCounter = (end, duration = 2000) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const num = parseInt(end) || 0;
    const steps = 40;
    const inc = num / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setCount(Math.min(Math.round(inc * step), num));
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, end, duration]);

  return { count, ref };
};

const LandingPage = () => {
  const { isAuthenticated, user } = useAuth();
  const { darkMode } = useTheme();
  const [typedText, setTypedText] = useState('');
  const fullText = 'Automate. Manage. Excel.';

  // Typewriter effect
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setTypedText(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) clearInterval(timer);
    }, 60);
    return () => clearInterval(timer);
  }, []);

  const features = [
    { icon: <FaCalendarAlt />, title: 'Event Management', desc: 'Create, manage, and register for campus events seamlessly with real-time updates.', color: '#3b82f6' },
    { icon: <FaBuilding />, title: 'Room Booking', desc: 'Book classrooms, labs, auditoriums with real-time availability tracking.', color: '#14b8a6' },
    { icon: <FaTools />, title: 'Equipment Reservation', desc: 'Reserve projectors, laptops, and cameras with easy tracking and returns.', color: '#8b5cf6' },
    { icon: <FaShieldAlt />, title: 'Complaint Management', desc: 'Raise and track complaints with priority-based resolution workflow.', color: '#f59e0b' },
    { icon: <FaBullhorn />, title: 'Announcements', desc: 'Stay updated with campus-wide announcements, alerts, and notifications.', color: '#ef4444' },
    { icon: <FaChartBar />, title: 'Reports & Analytics', desc: 'Generate comprehensive reports with data-driven insights and charts.', color: '#22c55e' },
  ];

  const howItWorks = [
    { icon: <FaUserShield />, step: '01', title: 'Register & Login', desc: 'Create your account and sign in with your campus credentials.' },
    { icon: <FaCog />, step: '02', title: 'Access Services', desc: 'Book rooms, register for events, reserve equipment — all in one place.' },
    { icon: <FaRocket />, step: '03', title: 'Track & Manage', desc: 'Monitor your bookings, complaints, and get real-time notifications.' },
  ];

  const stats = [
    { value: '500', suffix: '+', label: 'Active Students' },
    { value: '50', suffix: '+', label: 'Campus Events' },
    { value: '100', suffix: '+', label: 'Daily Bookings' },
    { value: '99', suffix: '%', label: 'Uptime' },
  ];

  const getDashboardLink = () => {
    if (!isAuthenticated()) return '/register';
    return user?.role === 'ADMIN' ? '/admin/dashboard' : '/student/dashboard';
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <div style={{ overflow: 'hidden' }}>
      {/* ========== HERO SECTION ========== */}
      <section className="position-relative" style={{
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        background: darkMode
          ? '#0a0f1e'
          : 'linear-gradient(135deg, #f8faff 0%, #f0fdf4 50%, #faf5ff 100%)',
      }}>
        {/* Animated Background Blobs */}
        <motion.div
          animate={{ x: [0, 30, -20, 0], y: [0, -40, 20, 0], scale: [1, 1.1, 0.95, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: '5%', right: '5%',
            width: 500, height: 500, borderRadius: '50%',
            background: darkMode
              ? 'radial-gradient(circle, rgba(59,130,246,0.12), transparent 70%)'
              : 'radial-gradient(circle, rgba(59,130,246,0.1), transparent 70%)',
            filter: 'blur(40px)',
            pointerEvents: 'none',
          }}
        />
        <motion.div
          animate={{ x: [0, -30, 20, 0], y: [0, 30, -20, 0], scale: [1, 0.95, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', bottom: '10%', left: '0%',
            width: 400, height: 400, borderRadius: '50%',
            background: darkMode
              ? 'radial-gradient(circle, rgba(139,92,246,0.1), transparent 70%)'
              : 'radial-gradient(circle, rgba(139,92,246,0.08), transparent 70%)',
            filter: 'blur(40px)',
            pointerEvents: 'none',
          }}
        />
        <motion.div
          animate={{ x: [0, 20, -10, 0], y: [0, -20, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: '40%', left: '30%',
            width: 300, height: 300, borderRadius: '50%',
            background: darkMode
              ? 'radial-gradient(circle, rgba(20,184,166,0.08), transparent 70%)'
              : 'radial-gradient(circle, rgba(20,184,166,0.06), transparent 70%)',
            filter: 'blur(40px)',
            pointerEvents: 'none',
          }}
        />

        {/* Grid Pattern Overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: darkMode
            ? 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)'
            : 'linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }} />

        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row align-items-center">
            <motion.div
              className="col-lg-6 mb-5 mb-lg-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-4"
              >
                <span className="badge rounded-pill px-4 py-2" style={{
                  background: darkMode
                    ? 'rgba(59,130,246,0.15)'
                    : 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(20,184,166,0.08))',
                  color: '#3b82f6',
                  border: '1px solid rgba(59,130,246,0.2)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                }}>
                  🎓 SDG 4 — Quality Education
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: 900,
                  lineHeight: 1.05,
                  color: darkMode ? '#f1f5f9' : '#0f172a',
                  marginBottom: '1rem',
                  letterSpacing: '-0.03em',
                }}
              >
                Smart Campus
                <br />
                <span className="gradient-text">Service Hub</span>
              </motion.h1>

              {/* Typewriter */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mb-3"
                style={{
                  fontSize: '1.3rem',
                  fontWeight: 600,
                  color: darkMode ? '#94a3b8' : '#475569',
                  minHeight: '2rem',
                }}
              >
                {typedText}
                <span style={{
                  borderRight: '3px solid #3b82f6',
                  paddingRight: 2,
                  animation: 'blink 1s infinite',
                }} />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                style={{
                  fontSize: '1.05rem',
                  color: darkMode ? '#94a3b8' : '#64748b',
                  lineHeight: 1.8,
                  maxWidth: 500,
                  marginBottom: '2rem',
                }}
              >
                A centralized digital platform that automates campus services, empowering students
                and administrators with seamless event management, resource booking, and real-time analytics.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="d-flex gap-3 flex-wrap"
              >
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link to={getDashboardLink()} className="btn btn-premium btn-lg d-flex align-items-center gap-2">
                    {isAuthenticated() ? 'Go to Dashboard' : 'Get Started'}
                    <FaArrowRight size={14} />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link to="/about" className="btn btn-glass btn-lg">
                    Learn More
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Stats Card */}
            <motion.div
              className="col-lg-6 text-center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="glass-card p-4 p-lg-5" style={{
                borderRadius: 28,
                position: 'relative',
              }}>
                {/* Decorative corner */}
                <div style={{
                  position: 'absolute', top: -2, right: -2,
                  width: 80, height: 80,
                  background: 'linear-gradient(135deg, #3b82f6, #14b8a6)',
                  borderRadius: '0 28px 0 28px',
                  opacity: 0.8,
                }} />

                <div className="row g-4">
                  {stats.map((stat, i) => {
                    const counter = useCounter(stat.value);
                    return (
                      <div key={i} className="col-6" ref={counter.ref}>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                          className="p-3 rounded-4"
                          style={{
                            background: darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)',
                            border: `1px solid ${darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'}`,
                          }}
                        >
                          <div style={{
                            fontSize: '2.2rem',
                            fontWeight: 900,
                            letterSpacing: '-0.02em',
                          }}>
                            <span className="gradient-text">{counter.count}{stat.suffix}</span>
                          </div>
                          <div style={{
                            fontSize: '0.82rem',
                            color: darkMode ? '#94a3b8' : '#64748b',
                            fontWeight: 500,
                          }}>
                            {stat.label}
                          </div>
                        </motion.div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== FEATURES SECTION ========== */}
      <section className="py-5" style={{
        background: darkMode ? '#111827' : '#ffffff',
        position: 'relative',
      }}>
        <div className="container py-5">
          <motion.div
            className="text-center mb-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <span className="badge rounded-pill px-3 py-2 mb-3" style={{
                background: darkMode ? 'rgba(59,130,246,0.15)' : 'rgba(59,130,246,0.08)',
                color: '#3b82f6',
                fontWeight: 600,
                fontSize: '0.78rem',
              }}>
                Features
              </span>
            </motion.div>
            <motion.h2 variants={itemVariants} style={{
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              fontWeight: 800,
              color: darkMode ? '#f1f5f9' : '#0f172a',
              letterSpacing: '-0.02em',
            }}>
              Everything You Need,{' '}
              <span className="gradient-text">In One Platform</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="mt-2" style={{
              color: darkMode ? '#94a3b8' : '#64748b',
              maxWidth: 550,
              margin: '0.5rem auto 0',
              fontSize: '1rem',
            }}>
              Streamline your campus experience with our comprehensive suite of digital services.
            </motion.p>
          </motion.div>

          <motion.div
            className="row g-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={containerVariants}
          >
            {features.map((feature, i) => (
              <motion.div key={i} className="col-md-6 col-lg-4" variants={itemVariants}>
                <motion.div
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="card h-100 border-0 p-4"
                  style={{
                    borderRadius: 20,
                    background: darkMode ? '#1a1f36' : '#f8fafc',
                    border: `1px solid ${darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'}`,
                    cursor: 'default',
                    transition: 'box-shadow 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 20px 60px ${feature.color}15`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="rounded-3 d-flex align-items-center justify-content-center mb-3"
                    style={{
                      width: 52,
                      height: 52,
                      background: `${feature.color}15`,
                      color: feature.color,
                      fontSize: '1.3rem',
                      borderRadius: 14,
                    }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h5 style={{
                    fontWeight: 700,
                    color: darkMode ? '#f1f5f9' : '#0f172a',
                    fontSize: '1.05rem',
                  }}>
                    {feature.title}
                  </h5>
                  <p style={{
                    color: darkMode ? '#94a3b8' : '#64748b',
                    fontSize: '0.88rem',
                    lineHeight: 1.6,
                    marginBottom: 0,
                  }}>
                    {feature.desc}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section className="py-5" style={{
        background: darkMode ? '#0a0f1e' : '#f1f5f9',
      }}>
        <div className="container py-5">
          <motion.div
            className="text-center mb-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <span className="badge rounded-pill px-3 py-2 mb-3" style={{
                background: darkMode ? 'rgba(20,184,166,0.15)' : 'rgba(20,184,166,0.08)',
                color: '#14b8a6',
                fontWeight: 600,
                fontSize: '0.78rem',
              }}>
                How It Works
              </span>
            </motion.div>
            <motion.h2 variants={itemVariants} style={{
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              fontWeight: 800,
              color: darkMode ? '#f1f5f9' : '#0f172a',
              letterSpacing: '-0.02em',
            }}>
              Get Started in{' '}
              <span className="gradient-text">3 Simple Steps</span>
            </motion.h2>
          </motion.div>

          <motion.div
            className="row g-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {howItWorks.map((step, i) => (
              <motion.div key={i} className="col-md-4" variants={itemVariants}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="text-center p-4"
                  style={{
                    borderRadius: 20,
                    background: darkMode ? '#1a1f36' : '#fff',
                    border: `1px solid ${darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'}`,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: 16,
                    right: 20,
                    fontSize: '3.5rem',
                    fontWeight: 900,
                    color: darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                    lineHeight: 1,
                  }}>
                    {step.step}
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="mx-auto rounded-circle d-flex align-items-center justify-content-center mb-3"
                    style={{
                      width: 64,
                      height: 64,
                      background: 'linear-gradient(135deg, #3b82f6, #14b8a6)',
                      color: '#fff',
                      fontSize: '1.4rem',
                      boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)',
                    }}
                  >
                    {step.icon}
                  </motion.div>
                  <h5 style={{
                    fontWeight: 700,
                    color: darkMode ? '#f1f5f9' : '#0f172a',
                    marginBottom: 8,
                  }}>
                    {step.title}
                  </h5>
                  <p style={{
                    color: darkMode ? '#94a3b8' : '#64748b',
                    fontSize: '0.88rem',
                    marginBottom: 0,
                  }}>
                    {step.desc}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section className="py-5" style={{
        background: darkMode ? '#111827' : '#fff',
      }}>
        <div className="container py-5">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center p-5 position-relative overflow-hidden"
            style={{
              borderRadius: 28,
              background: 'linear-gradient(135deg, #3b82f6 0%, #14b8a6 50%, #8b5cf6 100%)',
              backgroundSize: '200% 200%',
              animation: 'gradientShift 8s ease infinite',
              boxShadow: '0 20px 60px rgba(59,130,246,0.3)',
            }}
          >
            {/* Decorative elements */}
            <div style={{
              position: 'absolute', top: -40, right: -40,
              width: 150, height: 150,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)',
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute', bottom: -30, left: -30,
              width: 100, height: 100,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.08)',
              pointerEvents: 'none',
            }} />

            <h2 style={{
              fontSize: 'clamp(1.6rem, 3vw, 2.3rem)',
              fontWeight: 800,
              color: '#fff',
              marginBottom: 16,
              position: 'relative',
              zIndex: 1,
            }}>
              Ready to Transform Your Campus Experience?
            </h2>
            <p style={{
              color: 'rgba(255,255,255,0.85)',
              fontSize: '1.05rem',
              maxWidth: 500,
              margin: '0 auto 24px',
              position: 'relative',
              zIndex: 1,
            }}>
              Join hundreds of students already using SmartCampus to streamline their campus life.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ position: 'relative', zIndex: 1 }}
            >
              <Link to={getDashboardLink()} className="btn btn-lg px-5 py-3 d-inline-flex align-items-center gap-2" style={{
                background: '#fff',
                color: '#3b82f6',
                borderRadius: 14,
                fontWeight: 700,
                border: 'none',
                boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
              }}>
                {isAuthenticated() ? 'Go to Dashboard' : 'Get Started Free'}
                <FaArrowRight />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ========== TECH STACK ========== */}
      <section className="py-5" style={{
        background: darkMode ? '#0a0f1e' : '#f8fafc',
      }}>
        <div className="container py-4">
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p style={{
              color: darkMode ? '#475569' : '#94a3b8',
              fontSize: '0.82rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: 20,
            }}>
              Built With Modern Technologies
            </p>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              {['Java 21', 'Spring Boot 3', 'MongoDB', 'React 19', 'Vite', 'Bootstrap 5'].map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="badge rounded-pill px-4 py-2"
                  style={{
                    background: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                    color: darkMode ? '#94a3b8' : '#64748b',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    border: `1px solid ${darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
                    cursor: 'default',
                  }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="py-5" style={{
        background: darkMode ? '#0a0f1e' : '#0f172a',
        borderTop: `1px solid ${darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.08)'}`,
      }}>
        <div className="container">
          <div className="row g-4 mb-4">
            <div className="col-md-4">
              <div className="d-flex align-items-center gap-2 mb-3">
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: 'linear-gradient(135deg, #3b82f6, #14b8a6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.9rem',
                }}>
                  🎓
                </div>
                <span style={{ color: '#f1f5f9', fontWeight: 800, fontSize: '1.1rem' }}>
                  SmartCampus
                </span>
              </div>
              <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.7 }}>
                A comprehensive digital platform for modern campus management, aligned with UN SDG 4.
              </p>
            </div>
            <div className="col-md-2">
              <h6 style={{ color: '#e2e8f0', fontWeight: 700, fontSize: '0.85rem', marginBottom: 16 }}>Product</h6>
              <div className="d-flex flex-column gap-2">
                {['Events', 'Bookings', 'Equipment', 'Complaints'].map(item => (
                  <span key={item} style={{ color: '#64748b', fontSize: '0.85rem', cursor: 'default' }}>{item}</span>
                ))}
              </div>
            </div>
            <div className="col-md-2">
              <h6 style={{ color: '#e2e8f0', fontWeight: 700, fontSize: '0.85rem', marginBottom: 16 }}>Company</h6>
              <div className="d-flex flex-column gap-2">
                {['About', 'Contact', 'Privacy', 'Terms'].map(item => (
                  <span key={item} style={{ color: '#64748b', fontSize: '0.85rem', cursor: 'default' }}>{item}</span>
                ))}
              </div>
            </div>
            <div className="col-md-4">
              <h6 style={{ color: '#e2e8f0', fontWeight: 700, fontSize: '0.85rem', marginBottom: 16 }}>Stay Updated</h6>
              <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Get the latest campus updates and announcements.</p>
              <div className="d-flex gap-2">
                <input type="email" placeholder="your@email.com" className="form-control form-control-sm"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#e2e8f0',
                    borderRadius: 10,
                    padding: '8px 14px',
                  }}
                />
                <button className="btn btn-sm px-3" style={{
                  background: 'linear-gradient(135deg, #3b82f6, #14b8a6)',
                  color: '#fff',
                  borderRadius: 10,
                  fontWeight: 600,
                  border: 'none',
                  whiteSpace: 'nowrap',
                }}>
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            paddingTop: 20,
          }}>
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
              <p className="mb-0" style={{ fontSize: '0.8rem', color: '#475569' }}>
                © 2026 Smart Campus Service Hub • SDG 4 — Quality Education
              </p>
              <p className="mb-0" style={{ fontSize: '0.8rem', color: '#475569' }}>
                Built with ❤️ for campus communities worldwide
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
