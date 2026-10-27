import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Crown,
  User, 
  CalendarCheck, 
  LayoutDashboard, 
  LogOut, 
  ShieldCheck, 
  Menu, 
  X,
  BedDouble,
  Sparkles
} from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg glass-nav sticky-top py-3">
      <div className="container">
        {/* Brand Logo with Royal Indian Crest */}
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
          <div
            className="p-2 rounded-3 d-flex align-items-center justify-content-center shadow-sm"
            style={{
              width: '42px',
              height: '42px',
              background: 'linear-gradient(135deg, #6e0d25 0%, #3d0514 100%)',
              border: '1.5px solid #c99a3e'
            }}
          >
            <Crown size={22} className="text-warning" />
          </div>
          <div>
            <div className="d-flex align-items-baseline gap-1">
              <span className="fs-4 fw-bold font-regal text-dark tracking-tight">Hotel<span style={{ color: '#c99a3e' }}>Pro</span></span>
            </div>
            <div className="text-uppercase fw-bold text-muted" style={{ fontSize: '0.62rem', letterSpacing: '0.22em', color: '#6e0d25' }}>
              Royal Heritage Haveli & Palaces
            </div>
          </div>
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler border-0 shadow-none p-1"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Navbar Links */}
        <div className={`collapse navbar-collapse ${isOpen ? 'show mt-3 mt-lg-0' : ''}`}>
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-1 gap-lg-3 fw-medium">
            <li className="nav-item">
              <NavLink to="/" className={({ isActive }) => `nav-link px-3 ${isActive ? 'text-dark fw-bold' : 'text-secondary'}`} onClick={() => setIsOpen(false)}>
                The Palace
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/rooms" className={({ isActive }) => `nav-link px-3 ${isActive ? 'text-dark fw-bold' : 'text-secondary'}`} onClick={() => setIsOpen(false)}>
                Royal Suites
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className={({ isActive }) => `nav-link px-3 ${isActive ? 'text-dark fw-bold' : 'text-secondary'}`} onClick={() => setIsOpen(false)}>
                Heritage Legacy
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contact" className={({ isActive }) => `nav-link px-3 ${isActive ? 'text-dark fw-bold' : 'text-secondary'}`} onClick={() => setIsOpen(false)}>
                Royal Concierge
              </NavLink>
            </li>
          </ul>

          {/* Right Action / Profile Menu */}
          <div className="d-flex align-items-center gap-2">
            {!isAuthenticated ? (
              <div className="d-flex align-items-center gap-2 w-100">
                <Link to="/login" className="btn btn-outline-secondary px-3 py-2 fw-medium rounded-3" onClick={() => setIsOpen(false)}>
                  Darbar Login
                </Link>
                <Link to="/register" className="btn btn-gold px-3 py-2 rounded-3" onClick={() => setIsOpen(false)}>
                  Join Shahi Club
                </Link>
                <Link to="/admin/login" className="btn btn-sm btn-link text-muted text-decoration-none d-none d-xl-inline-block ps-2" title="Royal Administration">
                  <ShieldCheck size={16} className="me-1 text-warning" /> Staff
                </Link>
              </div>
            ) : (
              <div className="dropdown w-100">
                <button
                  className="btn btn-light dropdown-toggle d-flex align-items-center gap-2 border px-3 py-2 rounded-3 w-100 justify-content-between"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ border: '1px solid #c99a3e' }}
                >
                  <div className="d-flex align-items-center gap-2">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center text-white"
                      style={{
                        width: '32px',
                        height: '32px',
                        background: 'linear-gradient(135deg, #6e0d25, #0a1128)',
                        overflow: 'hidden',
                        border: '1.5px solid #c99a3e'
                      }}
                    >
                      {user?.avatar ? (
                        <img src={user.avatar} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <User size={18} />
                      )}
                    </div>
                    <div className="text-start d-none d-sm-block">
                      <div className="fw-semibold text-dark small leading-none">{user?.name}</div>
                      <div className="text-muted" style={{ fontSize: '0.72rem' }}>
                        {isAdmin ? 'Maharaja Admin' : 'Royal Patron'}
                      </div>
                    </div>
                  </div>
                </button>

                <ul className="dropdown-menu dropdown-menu-end shadow-lg border-0 rounded-3 mt-2 py-2" style={{ minWidth: '220px' }}>
                  <li className="px-3 py-2 border-bottom mb-1 bg-light">
                    <p className="fw-bold mb-0 text-dark font-serif">{user?.name}</p>
                    <p className="text-muted small mb-0">{user?.email}</p>
                    <span className="badge badge-royal mt-1">✦ Shahi Club Member</span>
                  </li>

                  {isAdmin ? (
                    <>
                      <li>
                        <Link to="/admin/dashboard" className="dropdown-item d-flex align-items-center gap-2 py-2" onClick={() => setIsOpen(false)}>
                          <LayoutDashboard size={18} className="text-primary" /> Palace Command Center
                        </Link>
                      </li>
                      <li>
                        <Link to="/admin/rooms" className="dropdown-item d-flex align-items-center gap-2 py-2" onClick={() => setIsOpen(false)}>
                          <BedDouble size={18} className="text-warning" /> Royal Suite Inventory
                        </Link>
                      </li>
                      <li>
                        <Link to="/admin/bookings" className="dropdown-item d-flex align-items-center gap-2 py-2" onClick={() => setIsOpen(false)}>
                          <CalendarCheck size={18} className="text-success" /> Guest Stays & Diwan
                        </Link>
                      </li>
                      <li>
                        <Link to="/admin/profile" className="dropdown-item d-flex align-items-center gap-2 py-2" onClick={() => setIsOpen(false)}>
                          <ShieldCheck size={18} className="text-info" /> Royal Administrator
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link to="/dashboard" className="dropdown-item d-flex align-items-center gap-2 py-2" onClick={() => setIsOpen(false)}>
                          <LayoutDashboard size={18} className="text-primary" /> Royal Guest Diwan
                        </Link>
                      </li>
                      <li>
                        <Link to="/my-bookings" className="dropdown-item d-flex align-items-center gap-2 py-2" onClick={() => setIsOpen(false)}>
                          <CalendarCheck size={18} className="text-success" /> My Palace Reservations
                        </Link>
                      </li>
                      <li>
                        <Link to="/profile" className="dropdown-item d-flex align-items-center gap-2 py-2" onClick={() => setIsOpen(false)}>
                          <User size={18} className="text-secondary" /> Royal Member Profile
                        </Link>
                      </li>
                    </>
                  )}

                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item text-danger d-flex align-items-center gap-2 py-2" onClick={handleLogout}>
                      <LogOut size={18} /> Sign Out (Alvida)
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
