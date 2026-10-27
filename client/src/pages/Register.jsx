import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, Lock, ArrowRight, AlertCircle, CheckCircle2, Crown, Sparkles } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-5" style={{ minHeight: '85vh', backgroundColor: '#fcfaf6' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-9 col-lg-6">
            <div className="card luxury-card p-4 p-md-5 border-0 shadow-lg" style={{ backgroundColor: '#ffffff', borderColor: '#e8dec8' }}>
              {/* Header */}
              <div className="text-center mb-4">
                <div
                  className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3 shadow"
                  style={{ width: '64px', height: '64px', backgroundColor: '#6e0d25', color: '#c99a3e', border: '2px solid #c99a3e' }}
                >
                  <Crown size={32} />
                </div>
                <div className="badge-royal mb-2">
                  <Sparkles size={12} className="me-1" /> शाही अतिथि पंजीकरण
                </div>
                <h3 className="fw-bold font-regal text-dark mb-1">Join The Royal Circle</h3>
                <p className="text-muted small">Register as an honored guest for privileged tariffs and bespoke butler concierge</p>
              </div>

              {/* Error Alert */}
              {error && (
                <div className="alert alert-danger py-2 px-3 small d-flex align-items-center gap-2 mb-3">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label small fw-bold text-muted">Full Name / Royal Title</label>
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0">
                      <User size={16} className="text-muted" />
                    </span>
                    <input
                      type="text"
                      name="name"
                      className="form-control border-start-0 ps-0 py-2 rounded-end-3"
                      placeholder="e.g. Princess Gayatri Devi"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="row g-3 mb-3">
                  <div className="col-12 col-sm-6">
                    <label className="form-label small fw-bold text-muted">Email Address</label>
                    <div className="input-group">
                      <span className="input-group-text bg-white border-end-0">
                        <Mail size={16} className="text-muted" />
                      </span>
                      <input
                        type="email"
                        name="email"
                        className="form-control border-start-0 ps-0 py-2 rounded-end-3"
                        placeholder="guest@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-12 col-sm-6">
                    <label className="form-label small fw-bold text-muted">Mobile Number / WhatsApp</label>
                    <div className="input-group">
                      <span className="input-group-text bg-white border-end-0">
                        <Phone size={16} className="text-muted" />
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        className="form-control border-start-0 ps-0 py-2 rounded-end-3"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="row g-3 mb-4">
                  <div className="col-12 col-sm-6">
                    <label className="form-label small fw-bold text-muted">Security Password</label>
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

                  <div className="col-12 col-sm-6">
                    <label className="form-label small fw-bold text-muted">Confirm Password</label>
                    <div className="input-group">
                      <span className="input-group-text bg-white border-end-0">
                        <Lock size={16} className="text-muted" />
                      </span>
                      <input
                        type="password"
                        name="confirmPassword"
                        className="form-control border-start-0 ps-0 py-2 rounded-end-3"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-maroon w-100 py-3 fw-bold rounded-3 shadow-sm d-flex align-items-center justify-content-center gap-2"
                >
                  {loading ? 'Creating Royal Account...' : (
                    <>
                      <span>Complete Guest Registration</span> <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>

              {/* Footer text */}
              <div className="text-center mt-4 pt-3 border-top">
                <span className="text-muted small">Already a registered royal member? </span>
                <Link to="/login" className="small fw-bold text-decoration-none" style={{ color: '#6e0d25' }}>
                  Sign In to Darbar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;