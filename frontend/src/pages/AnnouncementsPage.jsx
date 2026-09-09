import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import DashboardLayout from '../components/DashboardLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from '../components/Pagination';
import announcementService from '../services/announcementService';
import { toast } from 'react-toastify';
import { FaPlus, FaEdit, FaTrash, FaToggleOn, FaToggleOff } from 'react-icons/fa';

const AnnouncementsPage = () => {
  const { darkMode } = useTheme();
  const [announcements, setAnnouncements] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ title: '', content: '', priority: 'MEDIUM', startDate: '', endDate: '' });

  const fetch = (p = 0) => {
    setLoading(true);
    announcementService.getAll(p).then((res) => { const d = res.data?.data; setAnnouncements(d?.content || []); setTotalPages(d?.totalPages || 0); })
    .catch(() => toast.error('Failed')).finally(() => setLoading(false));
  };

  useEffect(() => { fetch(page); }, [page]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editItem) { await announcementService.update(editItem.id, form); toast.success('Updated'); }
      else { await announcementService.create(form); toast.success('Created'); }
      setShowModal(false); setEditItem(null); fetch(page);
    } catch { toast.error('Failed'); }
  };

  const handleToggle = async (id) => {
    try { await announcementService.toggle(id); fetch(page); } catch { toast.error('Failed'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete?')) return;
    try { await announcementService.delete(id); toast.success('Deleted'); fetch(page); } catch {}
  };

  const inputClass = `form-control ${darkMode ? 'bg-dark text-light border-secondary' : ''}`;

  return (
    <DashboardLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div><h3 style={{ fontWeight: 800, color: darkMode ? '#f1f5f9' : '#0f172a' }}>Announcements</h3><p style={{ color: darkMode ? '#94a3b8' : '#64748b' }}>Manage campus-wide announcements</p></div>
        <button className="btn px-4" onClick={() => { setEditItem(null); setForm({ title: '', content: '', priority: 'MEDIUM', startDate: '', endDate: '' }); setShowModal(true); }}
          style={{ background: 'linear-gradient(135deg, #3b82f6, #14b8a6)', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 600 }}>
          <FaPlus className="me-2" /> New Announcement
        </button>
      </div>

      {loading ? <LoadingSpinner /> : (
        <>
          <div className="row g-3">
            {announcements.map((a) => (
              <div key={a.id} className="col-md-6">
                <div className="card border-0" style={{ borderRadius: 16, background: darkMode ? '#1e293b' : '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', opacity: a.active ? 1 : 0.6 }}>
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h6 style={{ fontWeight: 700, color: darkMode ? '#f1f5f9' : '#0f172a' }}>{a.title}</h6>
                      <div className="d-flex gap-1">
                        <span className={`badge bg-${a.priority === 'HIGH' ? 'danger' : a.priority === 'MEDIUM' ? 'warning' : 'info'}`}>{a.priority}</span>
                        <span className={`badge bg-${a.active ? 'success' : 'secondary'}`}>{a.active ? 'Active' : 'Inactive'}</span>
                      </div>
                    </div>
                    <p style={{ color: darkMode ? '#94a3b8' : '#64748b', fontSize: '0.85rem' }}>{a.content}</p>
                    <div className="d-flex gap-2">
                      <button className="btn btn-sm btn-outline-primary" onClick={() => { setEditItem(a); setForm({ title: a.title, content: a.content, priority: a.priority, startDate: a.startDate || '', endDate: a.endDate || '' }); setShowModal(true); }} style={{ borderRadius: 8 }}><FaEdit /></button>
                      <button className="btn btn-sm btn-outline-warning" onClick={() => handleToggle(a.id)} style={{ borderRadius: 8 }}>{a.active ? <FaToggleOff /> : <FaToggleOn />}</button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(a.id)} style={{ borderRadius: 8 }}><FaTrash /></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {announcements.length === 0 && <p className="text-center py-5" style={{ color: darkMode ? '#94a3b8' : '#64748b' }}>No announcements</p>}
          <div className="mt-4"><Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} /></div>
        </>
      )}

      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0" style={{ borderRadius: 16, background: darkMode ? '#1e293b' : '#fff' }}>
              <div className="modal-header border-0 pb-0"><h5 className="modal-title fw-bold" style={{ color: darkMode ? '#f1f5f9' : '#0f172a' }}>{editItem ? 'Edit' : 'New'} Announcement</h5><button type="button" className="btn-close" onClick={() => setShowModal(false)} /></div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body"><div className="row g-3">
                  <div className="col-12"><label className="form-label fw-semibold" style={{ color: darkMode ? '#e2e8f0' : '#334155' }}>Title</label><input className={inputClass} style={{ borderRadius: 10 }} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></div>
                  <div className="col-12"><label className="form-label fw-semibold" style={{ color: darkMode ? '#e2e8f0' : '#334155' }}>Content</label><textarea className={inputClass} style={{ borderRadius: 10 }} rows={3} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required /></div>
                  <div className="col-md-4"><label className="form-label fw-semibold" style={{ color: darkMode ? '#e2e8f0' : '#334155' }}>Priority</label><select className={inputClass} style={{ borderRadius: 10 }} value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}><option value="LOW">Low</option><option value="MEDIUM">Medium</option><option value="HIGH">High</option></select></div>
                  <div className="col-md-4"><label className="form-label fw-semibold" style={{ color: darkMode ? '#e2e8f0' : '#334155' }}>Start Date</label><input type="date" className={inputClass} style={{ borderRadius: 10 }} value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} /></div>
                  <div className="col-md-4"><label className="form-label fw-semibold" style={{ color: darkMode ? '#e2e8f0' : '#334155' }}>End Date</label><input type="date" className={inputClass} style={{ borderRadius: 10 }} value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} /></div>
                </div></div>
                <div className="modal-footer border-0"><button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)} style={{ borderRadius: 10 }}>Cancel</button><button type="submit" className="btn" style={{ background: 'linear-gradient(135deg, #3b82f6, #14b8a6)', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 600 }}>{editItem ? 'Update' : 'Create'}</button></div>
              </form>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default AnnouncementsPage;
