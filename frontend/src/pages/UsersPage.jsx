import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import DashboardLayout from '../components/DashboardLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from '../components/Pagination';
import userService from '../services/userService';
import { toast } from 'react-toastify';
import { FaToggleOn, FaToggleOff, FaTrash } from 'react-icons/fa';

const UsersPage = () => {
  const { darkMode } = useTheme();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetch = (p = 0) => {
    setLoading(true);
    userService.getAll(p).then((res) => { const d = res.data?.data; setUsers(d?.content || []); setTotalPages(d?.totalPages || 0); })
    .catch(() => toast.error('Failed')).finally(() => setLoading(false));
  };

  useEffect(() => { fetch(page); }, [page]);

  const handleToggle = async (id) => {
    try { await userService.toggleEnabled(id); toast.success('Updated'); fetch(page); } catch {}
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try { await userService.delete(id); toast.success('Deleted'); fetch(page); } catch {}
  };

  return (
    <DashboardLayout>
      <div className="mb-4">
        <h3 style={{ fontWeight: 800, color: darkMode ? '#f1f5f9' : '#0f172a' }}>User Management</h3>
        <p style={{ color: darkMode ? '#94a3b8' : '#64748b' }}>Manage campus users and their access</p>
      </div>

      {loading ? <LoadingSpinner /> : (
        <>
          <div className="card border-0" style={{ borderRadius: 16, background: darkMode ? '#1e293b' : '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <div className="table-responsive">
              <table className={`table table-hover mb-0 ${darkMode ? 'table-dark' : ''}`}>
                <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Department</th><th>Student ID</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td><div className="d-flex align-items-center gap-2">
                        <div className="rounded-circle d-flex align-items-center justify-content-center" style={{
                          width: 32, height: 32, background: 'linear-gradient(135deg, #3b82f6, #14b8a6)', color: '#fff', fontSize: '0.7rem', fontWeight: 700,
                        }}>{u.firstName?.[0]}{u.lastName?.[0]}</div>
                        <span style={{ fontWeight: 600 }}>{u.firstName} {u.lastName}</span>
                      </div></td>
                      <td>{u.email}</td>
                      <td><span className={`badge bg-${u.role === 'ADMIN' ? 'danger' : 'primary'}`}>{u.role}</span></td>
                      <td>{u.department || '-'}</td>
                      <td>{u.studentId || '-'}</td>
                      <td><span className={`badge bg-${u.enabled !== false ? 'success' : 'secondary'}`}>{u.enabled !== false ? 'Active' : 'Disabled'}</span></td>
                      <td><div className="d-flex gap-1">
                        <button className="btn btn-sm btn-outline-warning" onClick={() => handleToggle(u.id)} title="Toggle status">{u.enabled !== false ? <FaToggleOff /> : <FaToggleOn />}</button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(u.id)} title="Delete"><FaTrash /></button>
                      </div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {users.length === 0 && <p className="text-center py-5" style={{ color: darkMode ? '#94a3b8' : '#64748b' }}>No users found</p>}
          <div className="mt-4"><Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} /></div>
        </>
      )}
    </DashboardLayout>
  );
};

export default UsersPage;
