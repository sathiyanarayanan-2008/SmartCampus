import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const LoadingSpinner = ({ message = 'Loading...' }) => {
  const { darkMode } = useTheme();

  return (
    <div className="d-flex flex-column align-items-center justify-content-center"
         style={{ minHeight: '50vh', gap: 24 }}>
      {/* Orbital Spinner */}
      <div style={{ position: 'relative', width: 60, height: 60 }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
          style={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            border: '3px solid transparent',
            borderTopColor: '#3b82f6',
            borderRightColor: '#14b8a6',
            position: 'absolute',
          }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: '3px solid transparent',
            borderBottomColor: '#8b5cf6',
            borderLeftColor: '#f59e0b',
            position: 'absolute',
            top: 10,
            left: 10,
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #3b82f6, #14b8a6)',
            position: 'absolute',
            top: 25,
            left: 25,
          }}
        />
      </div>

      {/* Loading Text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          color: darkMode ? '#94a3b8' : '#64748b',
          fontSize: '0.9rem',
          fontWeight: 500,
          letterSpacing: '0.02em',
        }}
      >
        {message}
      </motion.p>
    </div>
  );
};

export default LoadingSpinner;
