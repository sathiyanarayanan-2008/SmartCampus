import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import DashboardLayout from '../components/DashboardLayout';
import reportService from '../services/reportService';
import { toast } from 'react-toastify';
import { FaDownload, FaFileExcel, FaUsers, FaCalendarAlt, FaBuilding, FaExclamationTriangle, FaTools } from 'react-icons/fa';

const ReportsPage = () => {
  const { darkMode } = useTheme();
  const [downloading, setDownloading] = useState('');

  const reports = [
    { type: 'users', icon: <FaUsers />, title: 'Users Report', desc: 'All registered users with roles and departments', color: '#3b82f6' },
    { type: 'events', icon: <FaCalendarAlt />, title: 'Events Report', desc: 'All events with registration counts and statuses', color: '#14b8a6' },
    { type: 'bookings', icon: <FaBuilding />, title: 'Bookings Report', desc: 'Room bookings with approval statuses', color: '#8b5cf6' },
    { type: 'complaints', icon: <FaExclamationTriangle />, title: 'Complaints Report', desc: 'All complaints with resolution details', color: '#f59e0b' },
    { type: 'reservations', icon: <FaTools />, title: 'Reservations Report', desc: 'Equipment reservations and returns', color: '#ef4444' },
  ];

  const handleDownload = async (type) => {
    setDownloading(type);
    try {
      const res = await reportService.exportReport(type);
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${type}_report.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success(`${type} report downloaded`);
    } catch { toast.error('Download failed'); }
    finally { setDownloading(''); }
  };

  return (
    <DashboardLayout>
      <div className="mb-4">
        <h3 style={{ fontWeight: 800, color: darkMode ? '#f1f5f9' : '#0f172a' }}>Reports & Exports</h3>
        <p style={{ color: darkMode ? '#94a3b8' : '#64748b' }}>Download CSV reports for campus data analysis</p>
      </div>

      <div className="row g-4">
        {reports.map((r) => (
          <div key={r.type} className="col-md-6 col-lg-4">
            <div className="card border-0 h-100" style={{
              borderRadius: 16, background: darkMode ? '#1e293b' : '#fff',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)', transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div className="card-body p-4 d-flex flex-column">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="rounded-circle d-flex align-items-center justify-content-center" style={{
                    width: 48, height: 48, background: r.color, color: '#fff', fontSize: '1.2rem',
                  }}>{r.icon}</div>
                  <div>
                    <h6 className="mb-0" style={{ fontWeight: 700, color: darkMode ? '#f1f5f9' : '#0f172a' }}>{r.title}</h6>
                    <FaFileExcel className="me-1" style={{ color: '#22c55e', fontSize: '0.8rem' }} />
                    <span style={{ fontSize: '0.75rem', color: darkMode ? '#64748b' : '#94a3b8' }}>CSV Format</span>
                  </div>
                </div>
                <p className="flex-grow-1" style={{ color: darkMode ? '#94a3b8' : '#64748b', fontSize: '0.85rem' }}>{r.desc}</p>
                <button className="btn w-100" onClick={() => handleDownload(r.type)} disabled={downloading === r.type} style={{
                  background: downloading === r.type ? '#94a3b8' : 'linear-gradient(135deg, #3b82f6, #14b8a6)',
                  color: '#fff', border: 'none', borderRadius: 10, fontWeight: 600,
                }}>
                  {downloading === r.type ? (
                    <span className="spinner-border spinner-border-sm me-2" />
                  ) : (
                    <FaDownload className="me-2" />
                  )}
                  {downloading === r.type ? 'Downloading...' : 'Download'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default ReportsPage;
