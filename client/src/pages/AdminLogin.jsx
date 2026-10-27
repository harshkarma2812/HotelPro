import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Mail, Lock, ArrowRight, AlertCircle, Sparkles, Crown } from 'lucide-react';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFillDemoAdmin = () => {
    setFormData({
      email: 'admin@hotelpro.com',
      password: 'AdminPassword@123'
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const user = await login(formData.email, formData.password);
      if (user.role !== 'admin') {
        setError('Access denied: You do not possess Palace Dewan / Administrator clearance.');
        return;
      }
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid administrator credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-5" style={{ minHeight: '85vh', backgroundColor: '#0a1128' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-5">
            <div className="card luxury-card p-4 p-md-5 border-0 shadow-lg bg-white" style={{ border: '2px solid #c99a3e' }}>
              {/* Header */}
              <div className="text-center mb-4">
                <div
                  className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3 shadow"
                  style={{ width: '64px', height: '64px', backgroundColor: '#6e0d25', color: '#c99a3e', border: '2px solid #c99a3e' }}
                >
                  <Crown size={34} />
                </div>
                <div className="badge-royal mb-2">
                  शाही दरबार प्रशासन • Dewan Portal
                </div>
                <h3 className="fw-bold font-regal text-dark mb-1">Palace Administration</h3>
                <p className="text-muted small">Restricted executive access for HotelPro estate operations</p>
              </div>

              {/* Demo Helper */}
              <div className="bg-light border rounded-3 p-3 mb-4">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span className="small fw-bold text-dark font-regal">Local Evaluator Access</span>
                  <span className="badge-royal small">Dewan Master</span>
                </div>
                <button
                  type="button"
                  onClick={handleFillDemoAdmin}
                  className="btn btn-sm btn-outline-warning text-dark w-100 d-flex align-items-center justify-content-center gap-2 fw-semibold"
                >
                  <Sparkles size={14} className="text-warning" /> Auto-Fill Palace Admin Credentials
                </button>
              </div>

              {/* Error */}
              {error && (
                <div className="alert alert-danger py-2 px-3 small d-flex align-items-center gap-2 mb-3">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label small fw-bold text-muted">Dewan Email Address</label>
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0">
                      <Mail size={16} className="text-muted" />
                    </span>
                    <input
                      type="email"
                      name="email"
                      className="form-control border-start-0 ps-0 py-2 rounded-end-3"
                      placeholder="admin@hotelpro.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label small fw-bold text-muted">Master Darbar Password</label>
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0">
                      <Lock size={16} className="text-muted" />
                    </span>
                    <input
                      type="password"
                      name="password"
                      className="form-control border-start-0 ps-0 py-2 rounded-end-3"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-maroon w-100 py-3 fw-bold rounded-3 shadow-sm d-flex align-items-center justify-content-center gap-2"
                >
                  {loading ? 'Verifying Dewan Authorization...' : (
                    <>
                      <span>Enter Palace Darbar</span> <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>

              <div className="text-center mt-4 pt-3 border-top">
                <Link to="/login" className="small text-muted text-decoration-none">
                  &larr; Return to Guest Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;