import React, { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import { useAuth } from '../context/AuthContext';
import {
  ShieldCheck,
  User,
  Mail,
  Phone,
  Lock,
  CheckCircle2,
  AlertCircle,
  Crown,
  Sparkles
} from 'lucide-react';

const AdminProfile = () => {
  const { user, updateProfile } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (formData.newPassword) {
      if (formData.newPassword !== formData.confirmPassword) {
        setError('New passwords do not match');
        return;
      }
      if (formData.newPassword.length < 6) {
        setError('New password must be at least 6 characters');
        return;
      }
      if (!formData.currentPassword) {
        setError('Please enter your current password to set a new password');
        return;
      }
    }

    setLoading(true);
    try {
      await updateProfile({
        name: formData.name,
        phone: formData.phone,
        currentPassword: formData.currentPassword || undefined,
        newPassword: formData.newPassword || undefined
      });

      setSuccess('Palace Dewan credentials updated successfully!');
      setFormData((prev) => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (err) {
      setError(err.message || 'Failed to update admin profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex min-vh-100 bg-light">
      <AdminSidebar />

      <div className="flex-grow-1 p-4 p-md-5 overflow-auto" style={{ maxHeight: '100vh' }}>
        {/* Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 pb-3 border-bottom">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <span className="badge-royal">
                <Crown size={12} className="me-1" /> दीवान विवरण
              </span>
              <span className="text-muted small">Palace Security & Identity</span>
            </div>
            <h1 className="display-6 fw-bold font-regal text-dark mb-1">Dewan Profile & Security</h1>
            <p className="text-muted mb-0">Estate administrator credentials and authentication settings</p>
          </div>
        </div>

        {success && (
          <div className="alert alert-success py-2 px-3 small d-flex align-items-center gap-2 mb-4">
            <CheckCircle2 size={16} />
            <span>{success}</span>
          </div>
        )}

        {error && (
          <div className="alert alert-danger py-2 px-3 small d-flex align-items-center gap-2 mb-4">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <div className="row g-4">
          {/* Left: Form */}
          <div className="col-12 col-lg-7">
            <div className="card luxury-card p-4 p-md-5 border-0 shadow-sm" style={{ backgroundColor: '#ffffff' }}>
              <h5 className="fw-bold font-regal text-dark mb-3">Dewan Administrator Details</h5>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label small fw-bold text-muted">Legal Name / Title</label>
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0">
                      <User size={16} className="text-muted" />
                    </span>
                    <input
                      type="text"
                      name="name"
                      className="form-control border-start-0 ps-0 py-2 rounded-end-3"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="row g-3 mb-3">
                  <div className="col-sm-6">
                    <label className="form-label small fw-bold text-muted">Dewan Email (Read-Only)</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <Mail size={16} className="text-muted" />
                      </span>
                      <input
                        type="email"
                        className="form-control bg-light border-start-0 ps-0 py-2 rounded-end-3"
                        value={user?.email || ''}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <label className="form-label small fw-bold text-muted">Direct Mobile Phone</label>
                    <div className="input-group">
                      <span className="input-group-text bg-white border-end-0">
                        <Phone size={16} className="text-muted" />
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        className="form-control border-start-0 ps-0 py-2 rounded-end-3"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>
                </div>

                <hr className="my-4" />
                <h5 className="fw-bold font-regal text-dark mb-3">Update Master Password</h5>

                <div className="mb-3">
                  <label className="form-label small fw-bold text-muted">Current Master Password</label>
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0">
                      <Lock size={16} className="text-muted" />
                    </span>
                    <input
                      type="password"
                      name="currentPassword"
                      className="form-control border-start-0 ps-0 py-2 rounded-end-3"
                      placeholder="Enter current password to verify identity"
                      value={formData.currentPassword}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="row g-3 mb-4">
                  <div className="col-sm-6">
                    <label className="form-label small fw-bold text-muted">New Password</label>
                    <div className="input-group">
                      <span className="input-group-text bg-white border-end-0">
                        <Lock size={16} className="text-muted" />
                      </span>
                      <input
                        type="password"
                        name="newPassword"
                        className="form-control border-start-0 ps-0 py-2 rounded-end-3"
                        placeholder="Min 6 characters"
                        value={formData.newPassword}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <label className="form-label small fw-bold text-muted">Confirm New Password</label>
                    <div className="input-group">
                      <span className="input-group-text bg-white border-end-0">
                        <Lock size={16} className="text-muted" />
                      </span>
                      <input
                        type="password"
                        name="confirmPassword"
                        className="form-control border-start-0 ps-0 py-2 rounded-end-3"
                        placeholder="Repeat new password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-maroon px-4 py-2 fw-bold rounded-3 shadow-sm"
                >
                  {loading ? 'Saving Changes...' : 'Save Dewan Profile'}
                </button>
              </form>
            </div>
          </div>

          {/* Right: Security & Role Cards */}
          <div className="col-12 col-lg-5">
            <div className="card luxury-card p-4 border-0 mb-4 shadow-sm" style={{ backgroundColor: '#ffffff' }}>
              <div className="d-flex align-items-center gap-2 mb-3">
                <Crown size={22} style={{ color: '#c99a3e' }} />
                <h5 className="fw-bold font-regal text-dark mb-0">Palace Dewan Privileges</h5>
              </div>
              <p className="text-muted small mb-3">
                As a Dewan of HotelPro Heritage Palaces, you hold executive privileges over inventory tariffs, room status overrides, and booking management.
              </p>
              <div className="d-flex flex-column gap-2 small">
                <div className="d-flex align-items-center gap-2 text-success">
                  <CheckCircle2 size={16} /> Full CRUD authority over royal suite inventory
                </div>
                <div className="d-flex align-items-center gap-2 text-success">
                  <CheckCircle2 size={16} /> Guest check-in and departure status authorization
                </div>
                <div className="d-flex align-items-center gap-2 text-success">
                  <CheckCircle2 size={16} /> Real-time Shahi treasury and revenue ledger inspection
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;