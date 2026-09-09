import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { FaHome, FaArrowLeft } from 'react-icons/fa';

const NotFoundPage = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center position-relative overflow-hidden" style={{
      background: darkMode ? '#0a0f1e' : '#f8fafc',
    }}>
      {/* Floating Background Shapes */}
      <motion.div animate={{ rotate: 360, scale: [1, 1.2, 1] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'absolute', top: '10%', left: '15%', width: 300, height: 300, borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%', background: darkMode ? 'rgba(59, 130, 246, 0.05)' : 'rgba(59, 130, 246, 0.08)', filter: 'blur(40px)', zIndex: 0 }} />
      
      <motion.div animate={{ rotate: -360, scale: [1, 1.3, 1] }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'absolute', bottom: '15%', right: '15%', width: 250, height: 250, borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%', background: darkMode ? 'rgba(20, 184, 166, 0.05)' : 'rgba(20, 184, 166, 0.08)', filter: 'blur(40px)', zIndex: 0 }} />

      <div className="container text-center" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <motion.div animate={{ y: [-15, 15, -15] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ fontSize: 'clamp(8rem, 15vw, 12rem)', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.05em', background: 'linear-gradient(135deg, #3b82f6, #14b8a6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textShadow: darkMode ? '0 10px 40px rgba(59,130,246,0.2)' : '0 10px 40px rgba(59,130,246,0.3)' }}
          >
            404
          </motion.div>
          
          <h2 className="mt-4 mb-3" style={{ fontWeight: 800, color: darkMode ? '#f1f5f9' : '#0f172a', fontSize: '2rem', letterSpacing: '-0.02em' }}>
            Oops! Page Not Found
          </h2>
          
          <p style={{ color: darkMode ? '#94a3b8' : '#64748b', fontSize: '1.1rem', maxWidth: 450, margin: '0 auto 2.5rem' }}>
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>

          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => navigate(-1)} className="btn btn-glass d-flex align-items-center gap-2" style={{ borderRadius: 12, padding: '12px 24px', fontWeight: 600 }}>
              <FaArrowLeft size={14} /> Go Back
            </motion.button>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/" className="btn btn-premium d-flex align-items-center gap-2" style={{ borderRadius: 12, padding: '12px 24px' }}>
                <FaHome size={16} /> Back to Home
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;
