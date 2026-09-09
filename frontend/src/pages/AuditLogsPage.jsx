import { useTheme } from '../context/ThemeContext';
import DashboardLayout from '../components/DashboardLayout';
import { FaClipboardList } from 'react-icons/fa';

const AuditLogsPage = () => {
  const { darkMode } = useTheme();

  return (
    <DashboardLayout>
      <div className="mb-4">
        <h3 style={{ fontWeight: 800, color: darkMode ? '#f1f5f9' : '#0f172a' }}>Audit Logs</h3>
        <p style={{ color: darkMode ? '#94a3b8' : '#64748b' }}>Track all administrative actions on the platform</p>
      </div>
      <div className="card border-0 text-center p-5" style={{
        borderRadius: 16, background: darkMode ? '#1e293b' : '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
      }}>
        <FaClipboardList style={{ fontSize: '4rem', color: '#94a3b8', margin: '0 auto 1rem' }} />
        <h5 style={{ fontWeight: 700, color: darkMode ? '#f1f5f9' : '#0f172a' }}>Audit Logging Active</h5>
        <p style={{ color: darkMode ? '#94a3b8' : '#64748b', maxWidth: 400, margin: '0 auto' }}>
          All admin actions (create, update, delete) are being recorded by the backend AuditLogService.
          Connect this view to the audit log API endpoint for full log browsing.
        </p>
      </div>
    </DashboardLayout>
  );
};

export default AuditLogsPage;
