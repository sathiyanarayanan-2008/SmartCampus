import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/DashboardLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from '../components/Pagination';
import eventService from '../services/eventService';
import { toast } from 'react-toastify';
import { FaPlus, FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaEdit, FaTrash } from 'react-icons/fa';

const EventsPage = () => {
  const { darkMode } = useTheme();
  const { isAdmin, user } = useAuth();
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editEvent, setEditEvent] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', date: '', time: '', venue: '', capacity: 50, organizer: '', category: '', status: 'UPCOMING' });

  const fetchEvents = (p = 0) => {
    setLoading(true);
    eventService.getAll(p).then((res) => {
      const data = res.data?.data;
      setEvents(data?.content || []);
      setTotalPages(data?.totalPages || 0);
    }).catch(() => toast.error('Failed to load events'))
    .finally(() => setLoading(false));
  };

  useEffect(() => { fetchEvents(page); }, [page]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editEvent) {
        await eventService.update(editEvent.id, form);
        toast.success('Event updated');
      } else {
        await eventService.create(form);
        toast.success('Event created');
      }
      setShowModal(false);
      setEditEvent(null);
      fetchEvents(page);
    } catch { toast.error('Operation failed'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this event?')) return;
    try { await eventService.delete(id); toast.success('Event deleted'); fetchEvents(page); }
    catch { toast.error('Failed to delete'); }
  };

  const handleRegister = async (id) => {
    try { await eventService.register(id); toast.success('Registered for event!'); fetchEvents(page); }
    catch (err) { toast.error(err.response?.data?.message || 'Registration failed'); }
  };

  const openEdit = (event) => {
    setEditEvent(event);
    setForm({ title: event.title, description: event.description || '', date: event.date, time: event.time || '', venue: event.venue, capacity: event.capacity, organizer: event.organizer || '', category: event.category || '', status: event.status });
    setShowModal(true);
  };

  const openCreate = () => {
    setEditEvent(null);
    setForm({ title: '', description: '', date: '', time: '', venue: '', capacity: 50, organizer: '', category: '', status: 'UPCOMING' });
    setShowModal(true);
  };

  const inputClass = `form-control ${darkMode ? 'bg-dark text-light border-secondary' : ''}`;
  const cardBg = darkMode ? '#1e293b' : '#fff';

  return (
    <DashboardLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 style={{ fontWeight: 800, color: darkMode ? '#f1f5f9' : '#0f172a' }}>Events</h3>
          <p style={{ color: darkMode ? '#94a3b8' : '#64748b' }}>Browse and manage campus events</p>
        </div>
        {isAdmin() && (
          <button className="btn px-4" onClick={openCreate} style={{
            background: 'linear-gradient(135deg, #3b82f6, #14b8a6)', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 600,
          }}>
            <FaPlus className="me-2" /> New Event
          </button>
        )}
      </div>

      {loading ? <LoadingSpinner /> : (
        <>
          <div className="row g-4">
            {events.map((event) => (
              <div key={event.id} className="col-md-6 col-lg-4">
                <div className="card border-0 h-100" style={{
                  borderRadius: 16, background: cardBg, boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                  transition: 'transform 0.2s', cursor: 'default',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                  <div className="p-1">
                    <div className="rounded-top-3" style={{
                      height: 6, background: 'linear-gradient(135deg, #3b82f6, #14b8a6)', borderRadius: '16px 16px 0 0',
                    }} />
                  </div>
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="mb-0" style={{ fontWeight: 700, color: darkMode ? '#f1f5f9' : '#0f172a' }}>{event.title}</h5>
                      <span className={`badge bg-${event.status === 'UPCOMING' ? 'primary' : event.status === 'ONGOING' ? 'success' : event.status === 'COMPLETED' ? 'secondary' : 'danger'}`}>
                        {event.status}
                      </span>
                    </div>
                    <p style={{ color: darkMode ? '#94a3b8' : '#64748b', fontSize: '0.85rem' }} className="mb-3">
                      {event.description?.substring(0, 100)}{event.description?.length > 100 ? '...' : ''}
                    </p>
                    <div className="d-flex flex-column gap-1 mb-3" style={{ fontSize: '0.85rem', color: darkMode ? '#94a3b8' : '#64748b' }}>
                      <span><FaCalendarAlt className="me-2" style={{ color: '#3b82f6' }} />{event.date}{event.time ? ` at ${event.time}` : ''}</span>
                      <span><FaMapMarkerAlt className="me-2" style={{ color: '#14b8a6' }} />{event.venue}</span>
                      <span><FaUsers className="me-2" style={{ color: '#8b5cf6' }} />{event.registeredStudents?.length || 0} / {event.capacity} registered</span>
                    </div>
                    <div className="d-flex gap-2">
                      {!isAdmin() && event.status === 'UPCOMING' && (
                        <button className="btn btn-sm btn-primary flex-grow-1" onClick={() => handleRegister(event.id)} style={{ borderRadius: 8 }}>
                          Register
                        </button>
                      )}
                      {isAdmin() && (
                        <>
                          <button className="btn btn-sm btn-outline-primary" onClick={() => openEdit(event)} style={{ borderRadius: 8 }}>
                            <FaEdit />
                          </button>
                          <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(event.id)} style={{ borderRadius: 8 }}>
                            <FaTrash />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {events.length === 0 && <p className="text-center py-5" style={{ color: darkMode ? '#94a3b8' : '#64748b' }}>No events found</p>}
          <div className="mt-4"><Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} /></div>
        </>
      )}

      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content border-0" style={{ borderRadius: 16, background: cardBg }}>
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold" style={{ color: darkMode ? '#f1f5f9' : '#0f172a' }}>
                  {editEvent ? 'Edit Event' : 'Create Event'}
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)} />
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold" style={{ color: darkMode ? '#e2e8f0' : '#334155' }}>Title</label>
                      <input className={inputClass} style={{ borderRadius: 10 }} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label fw-semibold" style={{ color: darkMode ? '#e2e8f0' : '#334155' }}>Date</label>
                      <input type="date" className={inputClass} style={{ borderRadius: 10 }} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label fw-semibold" style={{ color: darkMode ? '#e2e8f0' : '#334155' }}>Time</label>
                      <input type="time" className={inputClass} style={{ borderRadius: 10 }} value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-semibold" style={{ color: darkMode ? '#e2e8f0' : '#334155' }}>Description</label>
                      <textarea className={inputClass} style={{ borderRadius: 10 }} rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold" style={{ color: darkMode ? '#e2e8f0' : '#334155' }}>Venue</label>
                      <input className={inputClass} style={{ borderRadius: 10 }} value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} required />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label fw-semibold" style={{ color: darkMode ? '#e2e8f0' : '#334155' }}>Capacity</label>
                      <input type="number" className={inputClass} style={{ borderRadius: 10 }} value={form.capacity} onChange={(e) => setForm({ ...form, capacity: parseInt(e.target.value) })} required />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label fw-semibold" style={{ color: darkMode ? '#e2e8f0' : '#334155' }}>Status</label>
                      <select className={inputClass} style={{ borderRadius: 10 }} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                        <option value="UPCOMING">Upcoming</option>
                        <option value="ONGOING">Ongoing</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="CANCELLED">Cancelled</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold" style={{ color: darkMode ? '#e2e8f0' : '#334155' }}>Organizer</label>
                      <input className={inputClass} style={{ borderRadius: 10 }} value={form.organizer} onChange={(e) => setForm({ ...form, organizer: e.target.value })} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold" style={{ color: darkMode ? '#e2e8f0' : '#334155' }}>Category</label>
                      <input className={inputClass} style={{ borderRadius: 10 }} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="e.g. Technical, Cultural" />
                    </div>
                  </div>
                </div>
                <div className="modal-footer border-0">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)} style={{ borderRadius: 10 }}>Cancel</button>
                  <button type="submit" className="btn" style={{ background: 'linear-gradient(135deg, #3b82f6, #14b8a6)', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 600 }}>
                    {editEvent ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default EventsPage;
