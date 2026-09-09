import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/DashboardLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from '../components/Pagination';
import bookingService from '../services/bookingService';
import { toast } from 'react-toastify';
import { FaPlus, FaCheck, FaTimes } from 'react-icons/fa';

const BookingsPage = () => {
  const { darkMode } = useTheme();
  const { isAdmin } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ roomType: 'CLASSROOM', roomName: '', date: '', startTime: '', endTime: '', purpose: '' });

  const fetchBookings = (p = 0) => {
    setLoading(true);
    const fetchFn = isAdmin() ? bookingService.getAll(p) : bookingService.getMyBookings(p);
    fetchFn.then((res) => {
      const data = res.data?.data;
      setBookings(data?.content || []);
      setTotalPages(data?.totalPages || 0);
    }).catch(() => toast.error('Failed to load bookings'))
    .finally(() => setLoading(false));
  };

  useEffect(() => { fetchBookings(page); }, [page]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try { await bookingService.create(form); toast.success('Booking submitted!'); setShowModal(false); fetchBookings(page); }
    catch (err) { toast.error(err.response?.data?.message || 'Failed to create booking'); }
  };

  const handleStatus = async (id, status) => {
    try { await bookingService.updateStatus(id, status); toast.success(`Booking ${status.toLowerCase()}`); fetchBookings(page); }
    catch { toast.error('Failed to update'); }
  };

  const inputClass = `form-control ${darkMode ? 'bg-dark text-light border-secondary' : ''}`;
  const statusBadge = (status) => {
    const map = { PENDING: 'warning', APPROVED: 'success', REJECTED: 'danger', CANCELLED: 'secondary' };
    return map[status] || 'info';
  };

  return (
    <DashboardLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 style={{ fontWeight: 800, color: darkMode ? '#f1f5f9' : '#0f172a' }}>
            {isAdmin() ? 'All Bookings' : 'My Bookings'}
          </h3>
          <p style={{ color: darkMode ? '#94a3b8' : '#64748b' }}>
            {isAdmin() ? 'Manage room booking requests' : 'View and create room bookings'}
          </p>
        </div>
        {!isAdmin() && (
          <button className="btn px-4" onClick={() => { setForm({ roomType: 'CLASSROOM', roomName: '', date: '', startTime: '', endTime: '', purpose: '' }); setShowModal(true); }}
            style={{ background: 'linear-gradient(135deg, #3b82f6, #14b8a6)', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 600 }}>
            <FaPlus className="me-2" /> New Booking
          </button>
        )}
      </div>

      {loading ? <LoadingSpinner /> : (
        <>
          <div className="card border-0" style={{ borderRadius: 16, background: darkMode ? '#1e293b' : '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <div className="table-responsive">
              <table className={`table table-hover mb-0 ${darkMode ? 'table-dark' : ''}`}>
                <thead>
                  <tr>
                    <th>Room</th><th>Type</th><th>Date</th><th>Time</th><th>Purpose</th><th>Status</th>
                    {isAdmin() && <th>User</th>}
                    {isAdmin() && <th>Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b.id}>
                      <td style={{ fontWeight: 600 }}>{b.roomName}</td>
                      <td><span className="badge bg-info">{b.roomType}</span></td>
                      <td>{b.date}</td>
                      <td>{b.startTime} - {b.endTime}</td>
                      <td style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.purpose}</td>
                      <td><span className={`badge bg-${statusBadge(b.status)}`}>{b.status}</span></td>
                      {isAdmin() && <td>{b.userName}</td>}
                      {isAdmin() && (
                        <td>
                          {b.status === 'PENDING' && (
                            <div className="d-flex gap-1">
                              <button className="btn btn-sm btn-success" onClick={() => handleStatus(b.id, 'APPROVED')}><FaCheck /></button>
                              <button className="btn btn-sm btn-danger" onClick={() => handleStatus(b.id, 'REJECTED')}><FaTimes /></button>
                            </div>
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {bookings.length === 0 && <p className="text-center py-5" style={{ color: darkMode ? '#94a3b8' : '#64748b' }}>No bookings found</p>}
          <div className="mt-4"><Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} /></div>
        </>
      )}

      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0" style={{ borderRadius: 16, background: darkMode ? '#1e293b' : '#fff' }}>
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold" style={{ color: darkMode ? '#f1f5f9' : '#0f172a' }}>New Booking</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)} />
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold" style={{ color: darkMode ? '#e2e8f0' : '#334155' }}>Room Type</label>
                      <select className={inputClass} style={{ borderRadius: 10 }} value={form.roomType} onChange={(e) => setForm({ ...form, roomType: e.target.value })}>
                        <option value="CLASSROOM">Classroom</option><option value="LAB">Lab</option>
                        <option value="AUDITORIUM">Auditorium</option><option value="MEETING_ROOM">Meeting Room</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold" style={{ color: darkMode ? '#e2e8f0' : '#334155' }}>Room Name</label>
                      <input className={inputClass} style={{ borderRadius: 10 }} value={form.roomName} onChange={(e) => setForm({ ...form, roomName: e.target.value })} required placeholder="e.g. Room 101" />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-semibold" style={{ color: darkMode ? '#e2e8f0' : '#334155' }}>Date</label>
                      <input type="date" className={inputClass} style={{ borderRadius: 10 }} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-semibold" style={{ color: darkMode ? '#e2e8f0' : '#334155' }}>Start Time</label>
                      <input type="time" className={inputClass} style={{ borderRadius: 10 }} value={form.startTime} onChange={(e) => setForm({ ...form, startTime: e.target.value })} required />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-semibold" style={{ color: darkMode ? '#e2e8f0' : '#334155' }}>End Time</label>
                      <input type="time" className={inputClass} style={{ borderRadius: 10 }} value={form.endTime} onChange={(e) => setForm({ ...form, endTime: e.target.value })} required />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-semibold" style={{ color: darkMode ? '#e2e8f0' : '#334155' }}>Purpose</label>
                      <textarea className={inputClass} style={{ borderRadius: 10 }} rows={2} value={form.purpose} onChange={(e) => setForm({ ...form, purpose: e.target.value })} required />
                    </div>
                  </div>
                </div>
                <div className="modal-footer border-0">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)} style={{ borderRadius: 10 }}>Cancel</button>
                  <button type="submit" className="btn" style={{ background: 'linear-gradient(135deg, #3b82f6, #14b8a6)', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 600 }}>Submit Booking</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default BookingsPage;
