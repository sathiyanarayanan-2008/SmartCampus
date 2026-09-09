import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/DashboardLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from '../components/Pagination';
import complaintService from '../services/complaintService';
import { toast } from 'react-toastify';
import { FaPlus } from 'react-icons/fa';

const ComplaintsPage = () => {
  const { darkMode } = useTheme();
  const { isAdmin } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', category: 'INFRASTRUCTURE', priority: 'MEDIUM' });

  const fetchComplaints = (p = 0) => {
    setLoading(true);
    const fn = isAdmin() ? complaintService.getAll(p) : complaintService.getMyComplaints(p);
    fn.then((res) => { const d = res.data?.data; setComplaints(d?.content || []); setTotalPages(d?.totalPages || 0); })
    .catch(() => toast.error('Failed to load')).finally(() => setLoading(false));
  };

  useEffect(() => { fetchComplaints(page); }, [page]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try { await complaintService.create(form); toast.success('Complaint submitted'); setShowModal(false); fetchComplaints(page); }
    catch { toast.error('Failed'); }
  };

  const handleResolve = async (id) => {
    const resolution = window.prompt('Enter resolution details:');
    if (!resolution) return;
    try { await complaintService.updateStatus(id, 'RESOLVED', resolution); toast.success('Resolved'); fetchComplaints(page); }
    catch { toast.error('Failed'); }
  };

  const inputClass = `form-control ${darkMode ? 'bg-dark text-light border-secondary' : ''}`;
  const statusBadge = (s) => ({ OPEN: 'danger', IN_PROGRESS: 'warning', RESOLVED: 'success', CLOSED: 'secondary' }[s] || 'info');
  const priorityBadge = (p) => ({ LOW: 'info', MEDIUM: 'warning', HIGH: 'danger', CRITICAL: 'dark' }[p] || 'secondary');

  return (
    <DashboardLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 style={{ fontWeight: 800, color: darkMode ? '#f1f5f9' : '#0f172a' }}>{isAdmin() ? 'All Complaints' : 'My Complaints'}</h3>
          <p style={{ color: darkMode ? '#94a3b8' : '#64748b' }}>{isAdmin() ? 'Manage and resolve complaints' : 'Track your complaints'}</p>
        </div>
        {!isAdmin() && (
          <button className="btn px-4" onClick={() => { setForm({ title: '', description: '', category: 'INFRASTRUCTURE', priority: 'MEDIUM' }); setShowModal(true); }}
            style={{ background: 'linear-gradient(135deg, #3b82f6, #14b8a6)', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 600 }}>
            <FaPlus className="me-2" /> Raise Complaint
          </button>
        )}
      </div>

      {loading ? <LoadingSpinner /> : (
        <>
          <div className="row g-3">
            {complaints.map((c) => (
              <div key={c.id} className="col-md-6">
                <div className="card border-0" style={{ borderRadius: 16, background: darkMode ? '#1e293b' : '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h6 className="mb-0" style={{ fontWeight: 700, color: darkMode ? '#f1f5f9' : '#0f172a' }}>{c.title}</h6>
                      <div className="d-flex gap-1">
                        <span className={`badge bg-${priorityBadge(c.priority)}`}>{c.priority}</span>
                        <span className={`badge bg-${statusBadge(c.status)}`}>{c.status}</span>
                      </div>
                    </div>
                    <p style={{ color: darkMode ? '#94a3b8' : '#64748b', fontSize: '0.85rem' }}>{c.description}</p>
                    <div className="d-flex justify-content-between align-items-center" style={{ fontSize: '0.8rem', color: darkMode ? '#64748b' : '#94a3b8' }}>
                      <span>Category: {c.category}</span>
                      {c.resolvedBy && <span>Resolved by: {c.resolvedBy}</span>}
                    </div>
                    {isAdmin() && c.status !== 'RESOLVED' && c.status !== 'CLOSED' && (
                      <button className="btn btn-sm btn-success mt-2" onClick={() => handleResolve(c.id)} style={{ borderRadius: 8 }}>
                        Resolve
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {complaints.length === 0 && <p className="text-center py-5" style={{ color: darkMode ? '#94a3b8' : '#64748b' }}>No complaints found</p>}
          <div className="mt-4"><Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} /></div>
        </>
      )}

      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0" style={{ borderRadius: 16, background: darkMode ? '#1e293b' : '#fff' }}>
              <div className="modal-header border-0 pb-0"><h5 className="modal-title fw-bold" style={{ color: darkMode ? '#f1f5f9' : '#0f172a' }}>Raise Complaint</h5><button type="button" className="btn-close" onClick={() => setShowModal(false)} /></div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body"><div className="row g-3">
                  <div className="col-12"><label className="form-label fw-semibold" style={{ color: darkMode ? '#e2e8f0' : '#334155' }}>Title</label><input className={inputClass} style={{ borderRadius: 10 }} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></div>
                  <div className="col-12"><label className="form-label fw-semibold" style={{ color: darkMode ? '#e2e8f0' : '#334155' }}>Description</label><textarea className={inputClass} style={{ borderRadius: 10 }} rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required /></div>
                  <div className="col-md-6"><label className="form-label fw-semibold" style={{ color: darkMode ? '#e2e8f0' : '#334155' }}>Category</label><select className={inputClass} style={{ borderRadius: 10 }} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}><option value="INFRASTRUCTURE">Infrastructure</option><option value="IT">IT</option><option value="FACULTY">Faculty</option><option value="HOSTEL">Hostel</option><option value="OTHER">Other</option></select></div>
                  <div className="col-md-6"><label className="form-label fw-semibold" style={{ color: darkMode ? '#e2e8f0' : '#334155' }}>Priority</label><select className={inputClass} style={{ borderRadius: 10 }} value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}><option value="LOW">Low</option><option value="MEDIUM">Medium</option><option value="HIGH">High</option><option value="CRITICAL">Critical</option></select></div>
                </div></div>
                <div className="modal-footer border-0"><button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)} style={{ borderRadius: 10 }}>Cancel</button><button type="submit" className="btn" style={{ background: 'linear-gradient(135deg, #3b82f6, #14b8a6)', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 600 }}>Submit</button></div>
              </form>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ComplaintsPage;
