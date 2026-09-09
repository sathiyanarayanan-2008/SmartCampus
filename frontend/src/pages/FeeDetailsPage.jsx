import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import DashboardLayout from '../components/DashboardLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import feeService from '../services/feeService';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { FaMoneyBillWave, FaCheckCircle, FaTimesCircle, FaExclamationTriangle } from 'react-icons/fa';

const FeeDetailsPage = () => {
  const { darkMode } = useTheme();
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    feeService.getMy()
      .then(res => setFees(res.data?.data || []))
      .catch(() => toast.error('Failed to load fee details'))
      .finally(() => setLoading(false));
  }, []);

  const textPrimary = darkMode ? '#f1f5f9' : '#0f172a';
  const textSecondary = darkMode ? '#94a3b8' : '#64748b';
  const cardBg = darkMode ? '#1e293b' : '#fff';

  const totalAmount = fees.reduce((s, f) => s + f.amount, 0);
  const paidAmount = fees.filter(f => f.status === 'PAID').reduce((s, f) => s + f.amount, 0);
  const unpaidAmount = fees.filter(f => f.status === 'UNPAID').reduce((s, f) => s + f.amount, 0);

  const statusConfig = {
    PAID: { color: '#22c55e', icon: <FaCheckCircle />, bg: '#22c55e15' },
    UNPAID: { color: '#ef4444', icon: <FaTimesCircle />, bg: '#ef444415' },
    PARTIAL: { color: '#f59e0b', icon: <FaExclamationTriangle />, bg: '#f59e0b15' },
  };

  return (
    <DashboardLayout>
      <div className="mb-4">
        <h3 style={{ fontWeight: 800, color: textPrimary }}>
          <FaMoneyBillWave className="me-2" style={{ color: '#22c55e' }} />My Fee Details
        </h3>
        <p style={{ color: textSecondary }}>Fee breakdown and payment status</p>
      </div>

      {loading ? <LoadingSpinner /> : (
        <>
          <div className="row g-3 mb-4">
            {[
              { label: 'Total Fees', value: `₹${totalAmount.toLocaleString()}`, color: '#3b82f6', icon: <FaMoneyBillWave /> },
              { label: 'Paid', value: `₹${paidAmount.toLocaleString()}`, color: '#22c55e', icon: <FaCheckCircle /> },
              { label: 'Unpaid', value: `₹${unpaidAmount.toLocaleString()}`, color: '#ef4444', icon: <FaTimesCircle /> },
            ].map((card, i) => (
              <div key={i} className="col-md-4">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="card border-0 p-4" style={{ borderRadius: 16, background: cardBg }}>
                  <div className="d-flex align-items-center gap-3">
                    <div style={{ width: 52, height: 52, borderRadius: 14, background: `${card.color}15`, color: card.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>
                      {card.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: '1.6rem', fontWeight: 800, color: textPrimary }}>{card.value}</div>
                      <div style={{ fontSize: '0.8rem', color: textSecondary }}>{card.label}</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

          <div className="card border-0" style={{ borderRadius: 16, background: cardBg }}>
            <div className="card-body p-4">
              <div className="table-responsive">
                <table className={`table mb-0 ${darkMode ? 'table-dark' : ''}`}>
                  <thead>
                    <tr style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: textSecondary }}>
                      <th>Fee Type</th><th>Semester</th><th>Amount</th><th>Due Date</th><th>Paid Date</th><th>Status</th><th>Transaction ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fees.map((f, i) => {
                      const cfg = statusConfig[f.status] || statusConfig.UNPAID;
                      return (
                        <motion.tr key={f.id || i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}>
                          <td style={{ fontWeight: 600, color: textPrimary }}>{f.feeType}</td>
                          <td>{f.semester}</td>
                          <td style={{ fontWeight: 700, color: textPrimary }}>₹{f.amount?.toLocaleString()}</td>
                          <td style={{ color: textSecondary }}>{f.dueDate || '-'}</td>
                          <td style={{ color: textSecondary }}>{f.paidDate || '-'}</td>
                          <td>
                            <span className="badge rounded-pill d-flex align-items-center gap-1" style={{ background: cfg.bg, color: cfg.color, fontWeight: 600, width: 'fit-content' }}>
                              {cfg.icon} {f.status}
                            </span>
                          </td>
                          <td style={{ fontSize: '0.82rem', color: textSecondary, fontFamily: 'monospace' }}>{f.transactionId || '-'}</td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default FeeDetailsPage;
