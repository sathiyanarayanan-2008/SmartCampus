import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/DashboardLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import userService from '../services/userService';
import { toast } from 'react-toastify';
import { FaUser, FaEnvelope, FaPhone, FaBuilding, FaIdCard, FaSave } from 'react-icons/fa';

const ProfilePage = () => {
  const { darkMode } = useTheme();
  const { user: authUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    userService.getProfile().then((res) => setProfile(res.data?.data))
    .catch(() => toast.error('Failed to load profile')).finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try { await userService.updateProfile(profile); toast.success('Profile updated!'); }
    catch { toast.error('Failed to update'); }
    finally { setSaving(false); }
  };

  const inputClass = `form-control ${darkMode ? 'bg-dark text-light border-secondary' : ''}`;

  if (loading) return <DashboardLayout><LoadingSpinner /></DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="mb-4">
        <h3 style={{ fontWeight: 800, color: darkMode ? '#f1f5f9' : '#0f172a' }}>My Profile</h3>
        <p style={{ color: darkMode ? '#94a3b8' : '#64748b' }}>Manage your account information</p>
      </div>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="card border-0 text-center p-4" style={{ borderRadius: 16, background: darkMode ? '#1e293b' : '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <div className="mx-auto rounded-circle d-flex align-items-center justify-content-center mb-3" style={{
              width: 100, height: 100, background: 'linear-gradient(135deg, #3b82f6, #14b8a6)', color: '#fff', fontSize: '2.5rem', fontWeight: 800,
            }}>{profile?.firstName?.[0]}{profile?.lastName?.[0]}</div>
            <h5 style={{ fontWeight: 700, color: darkMode ? '#f1f5f9' : '#0f172a' }}>{profile?.firstName} {profile?.lastName}</h5>
            <span className={`badge bg-${profile?.role === 'ADMIN' ? 'danger' : 'primary'} mx-auto`}>{profile?.role}</span>
            <p className="mt-2 mb-0" style={{ color: darkMode ? '#94a3b8' : '#64748b', fontSize: '0.85rem' }}>{profile?.email}</p>
            {profile?.department && <p style={{ color: darkMode ? '#94a3b8' : '#64748b', fontSize: '0.85rem' }}>{profile?.department}</p>}
          </div>
        </div>
        <div className="col-md-8">
          <div className="card border-0 p-4" style={{ borderRadius: 16, background: darkMode ? '#1e293b' : '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <h5 className="mb-4" style={{ fontWeight: 700, color: darkMode ? '#f1f5f9' : '#0f172a' }}>Edit Profile</h5>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold" style={{ color: darkMode ? '#e2e8f0' : '#334155' }}><FaUser className="me-1" /> First Name</label>
                <input className={inputClass} style={{ borderRadius: 10 }} value={profile?.firstName || ''} onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold" style={{ color: darkMode ? '#e2e8f0' : '#334155' }}><FaUser className="me-1" /> Last Name</label>
                <input className={inputClass} style={{ borderRadius: 10 }} value={profile?.lastName || ''} onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold" style={{ color: darkMode ? '#e2e8f0' : '#334155' }}><FaEnvelope className="me-1" /> Email</label>
                <input className={inputClass} style={{ borderRadius: 10 }} value={profile?.email || ''} disabled />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold" style={{ color: darkMode ? '#e2e8f0' : '#334155' }}><FaPhone className="me-1" /> Phone</label>
                <input className={inputClass} style={{ borderRadius: 10 }} value={profile?.phone || ''} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold" style={{ color: darkMode ? '#e2e8f0' : '#334155' }}><FaBuilding className="me-1" /> Department</label>
                <input className={inputClass} style={{ borderRadius: 10 }} value={profile?.department || ''} onChange={(e) => setProfile({ ...profile, department: e.target.value })} />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold" style={{ color: darkMode ? '#e2e8f0' : '#334155' }}><FaIdCard className="me-1" /> Student ID</label>
                <input className={inputClass} style={{ borderRadius: 10 }} value={profile?.studentId || ''} disabled />
              </div>
            </div>
            <button className="btn mt-4 px-4" onClick={handleSave} disabled={saving} style={{
              background: 'linear-gradient(135deg, #3b82f6, #14b8a6)', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 600,
            }}><FaSave className="me-2" />{saving ? 'Saving...' : 'Save Changes'}</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
