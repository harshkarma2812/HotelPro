import React, { useState, useEffect } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  Users,
  Search,
  ShieldCheck,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Crown
} from 'lucide-react';

const ManageUsers = () => {
  const { user: currentAdmin } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/users');
      if (res.data?.success) {
        setUsers(res.data.users || []);
      }
    } catch (err) {
      setError(err.message || 'Failed to retrieve user accounts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleToggle = async (userId, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    if (!window.confirm(`Are you sure you want to change this member's role to ${newRole.toUpperCase()}?`)) {
      return;
    }

    try {
      const res = await api.patch(`/admin/users/${userId}/role`, { role: newRole });
      if (res.data?.success) {
        setMessage(`User role updated to ${newRole}`);
        setUsers(
          users.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
        );
      }
    } catch (err) {
      setError(err.message || 'Failed to update user role');
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    if (!window.confirm(`Are you sure you want to permanently delete user account "${userName}"?`)) {
      return;
    }

    try {
      const res = await api.delete(`/admin/users/${userId}`);
      if (res.data?.success) {
        setMessage(`User account "${userName}" was removed.`);
        setUsers(users.filter((u) => u._id !== userId));
      }
    } catch (err) {
      setError(err.message || 'Failed to delete user');
    }
  };

  const filteredUsers = users.filter((u) => {
    return (
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      (u.phone && u.phone.includes(search))
    );
  });

  return (
    <div className="d-flex min-vh-100 bg-light">
      <AdminSidebar />

      <div className="flex-grow-1 p-4 p-md-5 overflow-auto" style={{ maxHeight: '100vh' }}>
        {/* Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 pb-3 border-bottom">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <span className="badge-royal">
                <Crown size={12} className="me-1" /> शाही नामावली
              </span>
              <span className="text-muted small">Account Governance</span>
            </div>
            <h1 className="display-6 fw-bold font-regal text-dark mb-1">Guest Directory & Roles</h1>
            <p className="text-muted mb-0">Total of {users.length} registered royal patrons and palace dewan accounts</p>
          </div>
        </div>

        {/* Alerts */}
        {message && (
          <div className="alert alert-success py-2 px-3 small d-flex align-items-center gap-2 mb-4">
            <CheckCircle2 size={16} />
            <span>{message}</span>
          </div>
        )}
        {error && (
          <div className="alert alert-danger py-2 px-3 small d-flex align-items-center gap-2 mb-4">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Search */}
        <div className="card luxury-card p-3 mb-4 border-0 shadow-sm" style={{ backgroundColor: '#ffffff' }}>
          <div className="row g-3">
            <div className="col-12 col-md-8">
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <Search size={16} className="text-muted" />
                </span>
                <input
                  type="text"
                  className="form-control border-start-0 ps-0"
                  placeholder="Search by royal title, name, email address, or phone..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="col-12 col-md-4 d-flex align-items-center justify-content-end">
              <span className="badge bg-light text-secondary border p-2">
                Showing {filteredUsers.length} Users
              </span>
            </div>
          </div>
        </div>

        {/* Users Table */}
        {loading ? (
          <LoadingSpinner text="Retrieving royal patron roster..." />
        ) : filteredUsers.length === 0 ? (
          <EmptyState
            title="No Users Match"
            description="No user records were found for your search term."
            actionText="Clear Search"
            onAction={() => setSearch('')}
          />
        ) : (
          <div className="card luxury-card border-0 p-3 shadow-sm" style={{ backgroundColor: '#ffffff' }}>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr className="small text-muted text-uppercase">
                    <th>Royal Member</th>
                    <th>Contact Phone</th>
                    <th>Role</th>
                    <th>Stays Booked</th>
                    <th>Total Tariff Spent (INR)</th>
                    <th>Joined</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u) => {
                    const isSelf = u._id === currentAdmin?._id;
                    return (
                      <tr key={u._id}>
                        <td>
                          <div className="d-flex align-items-center gap-3">
                            <div
                              className="rounded-circle fw-bold d-flex align-items-center justify-content-center"
                              style={{ width: '38px', height: '38px', backgroundColor: '#6e0d25', color: '#c99a3e' }}
                            >
                              {u.name?.charAt(0) || 'U'}
                            </div>
                            <div>
                              <div className="fw-bold text-dark font-regal">
                                {u.name} {isSelf && <span className="badge badge-royal ms-1 small">You</span>}
                              </div>
                              <div className="text-muted small">{u.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="small text-secondary">{u.phone || 'N/A'}</td>
                        <td>
                          <span className={`badge ${u.role === 'admin' ? 'bg-dark text-warning border border-warning' : 'bg-secondary-subtle text-secondary'}`}>
                            {u.role === 'admin' ? 'Palace Dewan (Admin)' : 'Honored Guest'}
                          </span>
                        </td>
                        <td className="small">
                          <span className="badge bg-light text-dark border">
                            {u.totalBookings || 0} Stays
                          </span>
                        </td>
                        <td className="fw-bold text-dark font-regal" style={{ color: '#6e0d25' }}>
                          ₹{(u.totalSpent || 0).toLocaleString('en-IN')}
                        </td>
                        <td className="small text-muted">
                          {new Date(u.createdAt).toLocaleDateString()}
                        </td>
                        <td className="text-end">
                          <div className="d-flex justify-content-end gap-2">
                            {!isSelf ? (
                              <>
                                <button
                                  type="button"
                                  onClick={() => handleRoleToggle(u._id, u.role)}
                                  className="btn btn-sm btn-outline-secondary py-1 px-2 small"
                                  title="Toggle User/Admin Role"
                                >
                                  {u.role === 'admin' ? 'Demote to Guest' : 'Promote to Dewan'}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteUser(u._id, u.name)}
                                  className="btn btn-sm btn-outline-danger p-1 px-2"
                                  title="Delete User"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </>
                            ) : (
                              <span className="text-muted small fst-italic">Active Dewan Session</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;