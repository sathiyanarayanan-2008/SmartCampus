import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/DashboardLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from '../components/Pagination';
import equipmentService from '../services/equipmentService';
import reservationService from '../services/reservationService';
import { toast } from 'react-toastify';
import { FaPlus, FaEdit, FaTrash, FaTools } from 'react-icons/fa';

const EquipmentPage = () => {
  const { darkMode } = useTheme();
  const { isAdmin } = useAuth();
  const [equipment, setEquipment] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showEquipModal, setShowEquipModal] = useState(false);
  const [showReserveModal, setShowReserveModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [selectedEquip, setSelectedEquip] = useState(null);
  const [equipForm, setEquipForm] = useState({ name: '', type: 'PROJECTOR', totalQuantity: 1, description: '', condition: 'Good', location: '' });
  const [reserveForm, setReserveForm] = useState({ equipmentId: '', reservedDate: '', returnDate: '', quantity: 1, purpose: '' });

  const fetchEquipment = (p = 0) => {
    setLoading(true);
    equipmentService.getAll(p).then((res) => {
      const data = res.data?.data;
      setEquipment(data?.content || []);
      setTotalPages(data?.totalPages || 0);
    }).catch(() => toast.error('Failed to load equipment'))
    .finally(() => setLoading(false));
  };

  useEffect(() => { fetchEquipment(page); }, [page]);

  const handleEquipSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editItem) { await equipmentService.update(editItem.id, equipForm); toast.success('Equipment updated'); }
      else { await equipmentService.create(equipForm); toast.success('Equipment added'); }
      setShowEquipModal(false); setEditItem(null); fetchEquipment(page);
    } catch { toast.error('Operation failed'); }
  };

  const handleReserve = async (e) => {
    e.preventDefault();
    try { await reservationService.create(reserveForm); toast.success('Equipment reserved!'); setShowReserveModal(false); fetchEquipment(page); }
    catch (err) { toast.error(err.response?.data?.message || 'Reservation failed'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this equipment?')) return;
    try { await equipmentService.delete(id); toast.success('Deleted'); fetchEquipment(page); }
    catch { toast.error('Failed to delete'); }
  };

  const openReserve = (equip) => {
    setSelectedEquip(equip);
    setReserveForm({ equipmentId: equip.id, reservedDate: '', returnDate: '', quantity: 1, purpose: '' });
    setShowReserveModal(true);
  };

  const inputClass = `form-control ${darkMode ? 'bg-dark text-light border-secondary' : ''}`;
  const cardBg = darkMode ? '#1e293b' : '#fff';

  return (
    <DashboardLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 style={{ fontWeight: 800, color: darkMode ? '#f1f5f9' : '#0f172a' }}>Equipment</h3>
          <p style={{ color: darkMode ? '#94a3b8' : '#64748b' }}>Browse and reserve campus equipment</p>
        </div>
        {isAdmin() && (
          <button className="btn px-4" onClick={() => { setEditItem(null); setEquipForm({ name: '', type: 'PROJECTOR', totalQuantity: 1, description: '', condition: 'Good', location: '' }); setShowEquipModal(true); }}
            style={{ background: 'linear-gradient(135deg, #3b82f6, #14b8a6)', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 600 }}>
            <FaPlus className="me-2" /> Add Equipment
          </button>
        )}
      </div>

      {loading ? <LoadingSpinner /> : (
        <>
          <div className="row g-4">
            {equipment.map((item) => (
              <div key={item.id} className="col-md-6 col-lg-4">
                <div className="card border-0 h-100" style={{ borderRadius: 16, background: cardBg, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', transition: 'transform 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <div className="rounded-circle d-flex align-items-center justify-content-center" style={{
                        width: 48, height: 48, background: 'linear-gradient(135deg, #8b5cf6, #6366f1)', color: '#fff', fontSize: '1.2rem',
                      }}><FaTools /></div>
                      <div>
                        <h6 className="mb-0" style={{ fontWeight: 700, color: darkMode ? '#f1f5f9' : '#0f172a' }}>{item.name}</h6>
                        <span className="badge bg-info" style={{ fontSize: '0.7rem' }}>{item.type}</span>
                      </div>
                    </div>
                    <p style={{ color: darkMode ? '#94a3b8' : '#64748b', fontSize: '0.85rem' }}>{item.description || 'No description'}</p>
                    <div className="d-flex justify-content-between mb-3" style={{ fontSize: '0.85rem' }}>
                      <span style={{ color: darkMode ? '#94a3b8' : '#64748b' }}>Available: <strong style={{ color: item.availableQuantity > 0 ? '#22c55e' : '#ef4444' }}>{item.availableQuantity}</strong> / {item.totalQuantity}</span>
                      <span style={{ color: darkMode ? '#94a3b8' : '#64748b' }}>{item.location}</span>
                    </div>
                    <div className="d-flex gap-2">
                      {!isAdmin() && item.availableQuantity > 0 && (
                        <button className="btn btn-sm btn-primary flex-grow-1" onClick={() => openReserve(item)} style={{ borderRadius: 8 }}>Reserve</button>
                      )}
                      {isAdmin() && (
                        <>
                          <button className="btn btn-sm btn-outline-primary" onClick={() => { setEditItem(item); setEquipForm({ name: item.name, type: item.type, totalQuantity: item.totalQuantity, description: item.description || '', condition: item.condition || '', location: item.location || '' }); setShowEquipModal(true); }} style={{ borderRadius: 8 }}><FaEdit /></button>
                          <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(item.id)} style={{ borderRadius: 8 }}><FaTrash /></button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {equipment.length === 0 && <p className="text-center py-5" style={{ color: darkMode ? '#94a3b8' : '#64748b' }}>No equipment found</p>}
          <div className="mt-4"><Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} /></div>
        </>
      )}

      {/* Equipment Create/Edit Modal */}
      {showEquipModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0" style={{ borderRadius: 16, background: cardBg }}>
              <div className="modal-header border-0 pb-0"><h5 className="modal-title fw-bold" style={{ color: darkMode ? '#f1f5f9' : '#0f172a' }}>{editItem ? 'Edit Equipment' : 'Add Equipment'}</h5><button type="button" className="btn-close" onClick={() => setShowEquipModal(false)} /></div>
              <form onSubmit={handleEquipSubmit}>
                <div className="modal-body"><div className="row g-3">
                  <div className="col-md-8"><label className="form-label fw-semibold" style={{ color: darkMode ? '#e2e8f0' : '#334155' }}>Name</label><input className={inputClass} style={{ borderRadius: 10 }} value={equipForm.name} onChange={(e) => setEquipForm({ ...equipForm, name: e.target.value })} required /></div>
                  <div className="col-md-4"><label className="form-label fw-semibold" style={{ color: darkMode ? '#e2e8f0' : '#334155' }}>Type</label><select className={inputClass} style={{ borderRadius: 10 }} value={equipForm.type} onChange={(e) => setEquipForm({ ...equipForm, type: e.target.value })}><option value="PROJECTOR">Projector</option><option value="LAPTOP">Laptop</option><option value="CAMERA">Camera</option></select></div>
                  <div className="col-md-4"><label className="form-label fw-semibold" style={{ color: darkMode ? '#e2e8f0' : '#334155' }}>Quantity</label><input type="number" min="1" className={inputClass} style={{ borderRadius: 10 }} value={equipForm.totalQuantity} onChange={(e) => setEquipForm({ ...equipForm, totalQuantity: parseInt(e.target.value) })} required /></div>
                  <div className="col-md-4"><label className="form-label fw-semibold" style={{ color: darkMode ? '#e2e8f0' : '#334155' }}>Condition</label><input className={inputClass} style={{ borderRadius: 10 }} value={equipForm.condition} onChange={(e) => setEquipForm({ ...equipForm, condition: e.target.value })} /></div>
                  <div className="col-md-4"><label className="form-label fw-semibold" style={{ color: darkMode ? '#e2e8f0' : '#334155' }}>Location</label><input className={inputClass} style={{ borderRadius: 10 }} value={equipForm.location} onChange={(e) => setEquipForm({ ...equipForm, location: e.target.value })} /></div>
                  <div className="col-12"><label className="form-label fw-semibold" style={{ color: darkMode ? '#e2e8f0' : '#334155' }}>Description</label><textarea className={inputClass} style={{ borderRadius: 10 }} rows={2} value={equipForm.description} onChange={(e) => setEquipForm({ ...equipForm, description: e.target.value })} /></div>
                </div></div>
                <div className="modal-footer border-0"><button type="button" className="btn btn-secondary" onClick={() => setShowEquipModal(false)} style={{ borderRadius: 10 }}>Cancel</button><button type="submit" className="btn" style={{ background: 'linear-gradient(135deg, #3b82f6, #14b8a6)', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 600 }}>{editItem ? 'Update' : 'Add'}</button></div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Reserve Modal */}
      {showReserveModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0" style={{ borderRadius: 16, background: cardBg }}>
              <div className="modal-header border-0 pb-0"><h5 className="modal-title fw-bold" style={{ color: darkMode ? '#f1f5f9' : '#0f172a' }}>Reserve: {selectedEquip?.name}</h5><button type="button" className="btn-close" onClick={() => setShowReserveModal(false)} /></div>
              <form onSubmit={handleReserve}>
                <div className="modal-body"><div className="row g-3">
                  <div className="col-md-6"><label className="form-label fw-semibold" style={{ color: darkMode ? '#e2e8f0' : '#334155' }}>From Date</label><input type="date" className={inputClass} style={{ borderRadius: 10 }} value={reserveForm.reservedDate} onChange={(e) => setReserveForm({ ...reserveForm, reservedDate: e.target.value })} required /></div>
                  <div className="col-md-6"><label className="form-label fw-semibold" style={{ color: darkMode ? '#e2e8f0' : '#334155' }}>Return Date</label><input type="date" className={inputClass} style={{ borderRadius: 10 }} value={reserveForm.returnDate} onChange={(e) => setReserveForm({ ...reserveForm, returnDate: e.target.value })} required /></div>
                  <div className="col-md-6"><label className="form-label fw-semibold" style={{ color: darkMode ? '#e2e8f0' : '#334155' }}>Quantity (max: {selectedEquip?.availableQuantity})</label><input type="number" min="1" max={selectedEquip?.availableQuantity} className={inputClass} style={{ borderRadius: 10 }} value={reserveForm.quantity} onChange={(e) => setReserveForm({ ...reserveForm, quantity: parseInt(e.target.value) })} required /></div>
                  <div className="col-12"><label className="form-label fw-semibold" style={{ color: darkMode ? '#e2e8f0' : '#334155' }}>Purpose</label><textarea className={inputClass} style={{ borderRadius: 10 }} rows={2} value={reserveForm.purpose} onChange={(e) => setReserveForm({ ...reserveForm, purpose: e.target.value })} /></div>
                </div></div>
                <div className="modal-footer border-0"><button type="button" className="btn btn-secondary" onClick={() => setShowReserveModal(false)} style={{ borderRadius: 10 }}>Cancel</button><button type="submit" className="btn" style={{ background: 'linear-gradient(135deg, #3b82f6, #14b8a6)', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 600 }}>Reserve</button></div>
              </form>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default EquipmentPage;
