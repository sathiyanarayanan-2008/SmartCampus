import { useState } from 'react';
import Sidebar from './Sidebar';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const DashboardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { darkMode } = useTheme();

  return (
    <div className="d-flex" style={{ minHeight: 'calc(100vh - 60px)' }}>
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <div className="flex-grow-1" style={{
        backgroundColor: darkMode ? '#0a0f1e' : '#f1f5f9',
        transition: 'background-color 0.3s ease',
        position: 'relative',
      }}>
        {/* Mobile Toggle */}
        <div className="p-3 d-md-none">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-sm"
            onClick={() => setCollapsed(!collapsed)}
            style={{
              borderRadius: 10,
              padding: '8px 14px',
              background: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
              border: `1px solid ${darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
              color: darkMode ? '#94a3b8' : '#64748b',
            }}
          >
            {collapsed ? <FaBars /> : <FaTimes />}
          </motion.button>
        </div>

        {/* Main Content with animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key="dashboard-content"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="p-4"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DashboardLayout;
