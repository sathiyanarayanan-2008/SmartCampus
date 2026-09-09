import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaSignInAlt, FaArrowRight } from 'react-icons/fa';

const LoginPage = () => {
  const { login } = useAuth();
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(formData);
      navigate(user.role === 'ADMIN' ? '/admin/dashboard' : '/student/dashboard');
    } catch {
      // Error handled in AuthContext
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex" style={{
      background: darkMode ? '#0a0f1e' : '#f8fafc',
    }}>
      {/* Left Side — Decorative */}
      <div className="d-none d-lg-flex col-lg-5" style={{
        background: 'linear-gradient(135deg, #3b82f6 0%, #14b8a6 50%, #8b5cf6 100%)',
        backgroundSize: '200% 200%',
        animation: 'gradientShift 8s ease infinite',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* Decorative circles */}
        <motion.div
          animate={{ y: [-20, 20, -20], rotate: [0, 5, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: '15%', left: '15%',
            width: 200, height: 200, borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
          }}
        />
        <motion.div
          animate={{ y: [20, -20, 20], rotate: [0, -5, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', bottom: '15%', right: '10%',
            width: 150, height: 150, borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)',
          }}
        />

        <div className="text-center px-5" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div style={{ fontSize: '4rem', marginBottom: 20 }}>🎓</div>
            <h2 style={{ color: '#fff', fontWeight: 800, fontSize: '2rem', marginBottom: 16 }}>
              SmartCampus
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem', lineHeight: 1.7 }}>
              Your one-stop platform for campus services. Manage events, book resources,
              and stay connected — all in one place.
            </p>
            <div className="d-flex justify-content-center gap-4 mt-4">
              {[
                { value: '500+', label: 'Students' },
                { value: '50+', label: 'Events' },
                { value: '99%', label: 'Uptime' },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div style={{ color: '#fff', fontWeight: 800, fontSize: '1.4rem' }}>{s.value}</div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side — Login Form */}
      <div className="col-12 col-lg-7 d-flex align-items-center justify-content-center p-4">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          style={{ width: '100%', maxWidth: 440 }}
        >
          <div className="mb-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 style={{
                fontWeight: 800,
                color: darkMode ? '#f1f5f9' : '#0f172a',
                fontSize: '2rem',
                letterSpacing: '-0.02em',
              }}>
                Welcome Back 👋
              </h2>
              <p style={{ color: darkMode ? '#94a3b8' : '#64748b', marginTop: 8 }}>
                Sign in to continue to SmartCampus
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-4 p-md-5"
            style={{
              borderRadius: 24,
              background: darkMode ? 'rgba(26, 31, 54, 0.6)' : 'rgba(255, 255, 255, 0.8)',
            }}
          >
            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="mb-4">
                <label className="form-label d-flex align-items-center gap-2"
                       style={{ fontWeight: 600, color: darkMode ? '#e2e8f0' : '#334155', fontSize: '0.88rem' }}>
                  <FaEnvelope size={14} style={{ color: '#3b82f6' }} /> Email Address
                </label>
                <motion.div animate={focused.email ? { scale: 1.01 } : { scale: 1 }}>
                  <input
                    type="email"
                    className="form-control form-control-lg glass-input"
                    style={{
                      borderRadius: 14,
                      padding: '14px 18px',
                      fontSize: '0.95rem',
                      color: darkMode ? '#f1f5f9' : '#0f172a',
                      borderColor: focused.email ? '#3b82f6' : undefined,
                    }}
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    onFocus={() => setFocused({ ...focused, email: true })}
                    onBlur={() => setFocused({ ...focused, email: false })}
                    required
                  />
                </motion.div>
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="form-label d-flex align-items-center gap-2"
                       style={{ fontWeight: 600, color: darkMode ? '#e2e8f0' : '#334155', fontSize: '0.88rem' }}>
                  <FaLock size={14} style={{ color: '#3b82f6' }} /> Password
                </label>
                <motion.div animate={focused.password ? { scale: 1.01 } : { scale: 1 }}>
                  <input
                    type="password"
                    className="form-control form-control-lg glass-input"
                    style={{
                      borderRadius: 14,
                      padding: '14px 18px',
                      fontSize: '0.95rem',
                      color: darkMode ? '#f1f5f9' : '#0f172a',
                      borderColor: focused.password ? '#3b82f6' : undefined,
                    }}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    onFocus={() => setFocused({ ...focused, password: true })}
                    onBlur={() => setFocused({ ...focused, password: false })}
                    required
                  />
                </motion.div>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="btn btn-lg w-100 mb-4 d-flex align-items-center justify-content-center gap-2"
                disabled={loading}
                style={{
                  background: 'linear-gradient(135deg, #3b82f6, #14b8a6)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 14,
                  fontWeight: 600,
                  padding: '14px',
                  boxShadow: '0 8px 25px rgba(59,130,246,0.3)',
                  fontSize: '1rem',
                }}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <FaSignInAlt /> Sign In <FaArrowRight size={12} />
                  </>
                )}
              </motion.button>
            </form>

            <p className="text-center mb-0" style={{ color: darkMode ? '#94a3b8' : '#64748b' }}>
              Don't have an account?{' '}
              <Link to="/register" style={{ color: '#3b82f6', fontWeight: 600, textDecoration: 'none' }}>
                Register here
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
