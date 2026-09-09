import { useTheme } from '../context/ThemeContext';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const StatsCard = ({ title, value, icon, gradient, subtitle }) => {
  const { darkMode } = useTheme();
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  // Animated counter
  useEffect(() => {
    if (!isVisible) return;
    const numValue = typeof value === 'number' ? value : parseInt(value) || 0;
    if (numValue === 0) { setDisplayValue(0); return; }

    const duration = 1200;
    const steps = 30;
    const increment = numValue / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), numValue);
      setDisplayValue(current);
      if (step >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, isVisible]);

  // Intersection observer for triggering animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.3 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const isGradient = !!gradient;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="card border-0 h-100"
      style={{
        background: isGradient ? gradient : (darkMode ? '#1a1f36' : '#ffffff'),
        borderRadius: 18,
        boxShadow: isGradient
          ? '0 8px 32px rgba(0,0,0,0.2)'
          : (darkMode ? '0 2px 12px rgba(0,0,0,0.2)' : '0 2px 12px rgba(0,0,0,0.04)'),
        border: isGradient ? 'none' : `1px solid ${darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'}`,
        overflow: 'hidden',
        position: 'relative',
        cursor: 'default',
      }}
    >
      {/* Decorative background circle */}
      <div style={{
        position: 'absolute',
        top: -20,
        right: -20,
        width: 100,
        height: 100,
        borderRadius: '50%',
        background: isGradient ? 'rgba(255,255,255,0.08)' : 'rgba(59, 130, 246, 0.03)',
        pointerEvents: 'none',
      }} />

      <div className="card-body d-flex align-items-center gap-3 p-4 position-relative">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 10 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="rounded-3 d-flex align-items-center justify-content-center"
          style={{
            width: 54,
            height: 54,
            minWidth: 54,
            background: isGradient ? 'rgba(255,255,255,0.2)' : 'linear-gradient(135deg, #3b82f6, #14b8a6)',
            backdropFilter: isGradient ? 'blur(10px)' : 'none',
            color: '#fff',
            fontSize: '1.3rem',
            borderRadius: 14,
          }}
        >
          {icon}
        </motion.div>
        <div>
          <div style={{
            fontSize: '1.9rem',
            fontWeight: 800,
            lineHeight: 1.1,
            color: isGradient ? '#fff' : (darkMode ? '#f1f5f9' : '#0f172a'),
            letterSpacing: '-0.02em',
          }}>
            {typeof value === 'number' ? displayValue : value}
          </div>
          <div style={{
            fontSize: '0.82rem',
            fontWeight: 500,
            color: isGradient ? 'rgba(255,255,255,0.8)' : (darkMode ? '#94a3b8' : '#64748b'),
            marginTop: 3,
          }}>
            {title}
          </div>
          {subtitle && (
            <div style={{
              fontSize: '0.72rem',
              color: isGradient ? 'rgba(255,255,255,0.6)' : (darkMode ? '#64748b' : '#94a3b8'),
              marginTop: 2,
            }}>
              {subtitle}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;
