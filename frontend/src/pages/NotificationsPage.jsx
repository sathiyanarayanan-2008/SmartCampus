import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import DashboardLayout from '../components/DashboardLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from '../components/Pagination';
import notificationService from '../services/notificationService';
import { toast } from 'react-toastify';
import { FaBell, FaCheck, FaCheckDouble, FaTrash } from 'react-icons/fa';

const NotificationsPage = () => {
  const { darkMode } = useTheme();
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetch = (p = 0) => {
    setLoading(true);
    notificationService.getAll(p).then((res) => { const d = res.data?.data; setNotifications(d?.content || []); setTotalPages(d?.totalPages || 0); })
    .catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { fetch(page); }, [page]);

  const markRead = async (id) => {
    try { await notificationService.markAsRead(id); fetch(page); } catch {}
  };

  const markAllRead = async () => {
    try { await notificationService.markAllAsRead(); toast.success('All marked as read'); fetch(page); } catch {}
  };

  const deleteNotif = async (id) => {
    try { await notificationService.delete(id); fetch(page); } catch {}
  };

  const typeBadge = (t) => ({ BOOKING: 'primary', COMPLAINT: 'warning', EVENT: 'success', SYSTEM: 'info' }[t] || 'secondary');

  return (
    <DashboardLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div><h3 style={{ fontWeight: 800, color: darkMode ? '#f1f5f9' : '#0f172a' }}>Notifications</h3><p style={{ color: darkMode ? '#94a3b8' : '#64748b' }}>Stay updated with your activities</p></div>
        <button className="btn btn-outline-primary btn-sm" onClick={markAllRead} style={{ borderRadius: 10 }}><FaCheckDouble className="me-1" /> Mark All Read</button>
      </div>

      {loading ? <LoadingSpinner /> : (
        <>
          <div className="d-flex flex-column gap-2">
            {notifications.map((n) => (
              <div key={n.id} className="card border-0" style={{
                borderRadius: 12, background: n.read ? (darkMode ? '#1e293b' : '#fff') : (darkMode ? '#1e3a5f' : '#eff6ff'),
                boxShadow: '0 1px 6px rgba(0,0,0,0.04)', borderLeft: n.read ? 'none' : '4px solid #3b82f6',
              }}>
                <div className="card-body d-flex align-items-center justify-content-between p-3">
                  <div className="d-flex align-items-center gap-3">
                    <div className="rounded-circle d-flex align-items-center justify-content-center" style={{
                      width: 40, height: 40, minWidth: 40, background: `var(--bs-${typeBadge(n.type)})`, color: '#fff',
                    }}><FaBell /></div>
                    <div>
                      <strong style={{ color: darkMode ? '#f1f5f9' : '#0f172a', fontSize: '0.9rem' }}>{n.title}</strong>
                      <p className="mb-0" style={{ color: darkMode ? '#94a3b8' : '#64748b', fontSize: '0.8rem' }}>{n.message}</p>
                    </div>
                  </div>
                  <div className="d-flex gap-2">
                    {!n.read && <button className="btn btn-sm btn-outline-success" onClick={() => markRead(n.id)}><FaCheck /></button>}
                    <button className="btn btn-sm btn-outline-danger" onClick={() => deleteNotif(n.id)}><FaTrash /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {notifications.length === 0 && <p className="text-center py-5" style={{ color: darkMode ? '#94a3b8' : '#64748b' }}>No notifications</p>}
          <div className="mt-4"><Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} /></div>
        </>
      )}
    </DashboardLayout>
  );
};

export default NotificationsPage;
