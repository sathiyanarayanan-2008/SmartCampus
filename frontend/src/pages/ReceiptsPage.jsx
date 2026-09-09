import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import DashboardLayout from '../components/DashboardLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import receiptService from '../services/receiptService';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { FaReceipt, FaDownload } from 'react-icons/fa';

const ReceiptsPage = () => {
  const { darkMode } = useTheme();
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    receiptService.getMy()
      .then(res => setReceipts(res.data?.data || []))
      .catch(() => toast.error('Failed to load receipts'))
      .finally(() => setLoading(false));
  }, []);

  const textPrimary = darkMode ? '#f1f5f9' : '#0f172a';
  const textSecondary = darkMode ? '#94a3b8' : '#64748b';
  const cardBg = darkMode ? '#1e293b' : '#fff';

  const paymentMethodColors = {
    ONLINE: '#3b82f6', UPI: '#8b5cf6', CARD: '#14b8a6', CASH: '#22c55e', CHEQUE: '#f59e0b',
  };

  return (
    <DashboardLayout>
      <div className="mb-4">
        <h3 style={{ fontWeight: 800, color: textPrimary }}>
          <FaReceipt className="me-2" style={{ color: '#06b6d4' }} />My Receipts
        </h3>
        <p style={{ color: textSecondary }}>Payment receipt history</p>
      </div>

      {loading ? <LoadingSpinner /> : (
        receipts.length === 0 ? (
          <div className="text-center py-5">
            <FaReceipt size={60} style={{ color: textSecondary, opacity: 0.3 }} />
            <p className="mt-3" style={{ color: textSecondary }}>No receipts found</p>
          </div>
        ) : (
          <div className="row g-3">
            {receipts.map((r, i) => {
              const pmColor = paymentMethodColors[r.paymentMethod] || '#64748b';
              return (
                <motion.div key={r.id || i} className="col-md-6 col-xl-4"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <motion.div whileHover={{ y: -4, boxShadow: '0 15px 40px rgba(0,0,0,0.08)' }}
                    className="card border-0 h-100" style={{ borderRadius: 20, background: cardBg, overflow: 'hidden' }}>
                    <div style={{ height: 5, background: `linear-gradient(90deg, ${pmColor}, ${pmColor}88)` }} />
                    <div className="card-body p-4">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                          <div style={{ fontSize: '0.72rem', color: textSecondary, fontFamily: 'monospace', marginBottom: 4 }}>{r.receiptNumber}</div>
                          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: textPrimary }}>₹{r.amount?.toLocaleString()}</div>
                        </div>
                        <motion.button whileHover={{ scale: 1.1 }} className="btn btn-sm"
                          style={{ width: 36, height: 36, borderRadius: 10, background: `${pmColor}15`, color: pmColor, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none' }}>
                          <FaDownload size={14} />
                        </motion.button>
                      </div>
                      <p style={{ color: textPrimary, fontWeight: 600, fontSize: '0.9rem', marginBottom: 12 }}>{r.description}</p>
                      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                        <span className="badge rounded-pill" style={{ background: `${pmColor}15`, color: pmColor, fontWeight: 600 }}>
                          {r.paymentMethod}
                        </span>
                        <span style={{ fontSize: '0.8rem', color: textSecondary }}>
                          {r.paymentDate ? new Date(r.paymentDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}
                        </span>
                      </div>
                      <div className="mt-2" style={{ fontSize: '0.78rem', color: textSecondary }}>Semester {r.semester}</div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        )
      )}
    </DashboardLayout>
  );
};

export default ReceiptsPage;
