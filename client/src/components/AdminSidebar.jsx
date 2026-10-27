import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  BedDouble,
  PlusCircle,
  CalendarCheck,
  Users,
  ShieldCheck,
  Globe,
  LogOut,
  Crown
} from 'lucide-react';

const AdminSidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className="admin-sidebar p-3 shadow-sm" style={{ backgroundColor: '#0a1128', minHeight: '100vh', width: '260px' }}>
      {/* Brand & Mode */}
      <div className="pb-3 mb-3 border-bottom border-secondary border-opacity-25">
        <Link to="/admin/dashboard" className="text-white text-decoration-none d-flex align-items-center gap-2">
          <div
            className="p-2 rounded-3 d-flex align-items-center justify-content-center"
            style={{ backgroundColor: '#6e0d25', color: '#c99a3e', border: '1px solid #c99a3e' }}
          >
            <Crown size={22} />
          </div>
          <div>
            <div className="fw-bold fs-5 text-white font-regal">Hotel<span style={{ color: '#c99a3e' }}>Pro</span></div>
            <div className="small font-monospace" style={{ fontSize: '0.72rem', letterSpacing: '0.08em', color: '#c99a3e' }}>
              शाही दरबार प्रशासन
            </div>
          </div>
        </Link>
      </div>

      {/* Admin User Info Card */}
      <div className="bg-secondary bg-opacity-25 rounded-3 p-3 mb-4 d-flex align-items-center gap-3">
        <div
          className="rounded-circle fw-bold d-flex align-items-center justify-content-center"
          style={{ width: '40px', height: '40px', backgroundColor: '#6e0d25', color: '#c99a3e', border: '1px solid #c99a3e' }}
        >
          {user?.name?.charAt(0) || 'D'}
        </div>
        <div className="overflow-hidden">
          <div className="text-white fw-bold text-truncate small font-regal">{user?.name}</div>
          <div className="text-muted text-truncate" style={{ fontSize: '0.75rem' }}>Palace Dewan (Admin)</div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="nav flex-column mb-auto">
        <span className="text-uppercase text-secondary px-3 mb-2 small fw-bold" style={{ fontSize: '0.68rem', letterSpacing: '0.1em' }}>
          Management / व्यवस्था
        </span>

        <NavLink to="/admin/dashboard" end className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>
          <LayoutDashboard size={18} />
          <span>Darbar Dashboard</span>
        </NavLink>

        <NavLink to="/admin/rooms" end className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>
          <BedDouble size={18} />
          <span>Manage Palace Suites</span>
        </NavLink>

        <NavLink to="/admin/rooms/add" className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>
          <PlusCircle size={18} />
          <span>Add New Suite</span>
        </NavLink>

        <NavLink to="/admin/bookings" className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>
          <CalendarCheck size={18} />
          <span>Manage Bookings</span>
        </NavLink>

        <NavLink to="/admin/users" className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>
          <Users size={18} />
          <span>Manage Guests</span>
        </NavLink>

        <NavLink to="/admin/profile" className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>
          <ShieldCheck size={18} />
          <span>Dewan Profile</span>
        </NavLink>
      </div>

      {/* Footer Actions */}
      <div className="pt-3 border-top border-secondary border-opacity-25 d-flex flex-column gap-2">
        <Link to="/" className="btn btn-outline-light btn-sm text-start d-flex align-items-center gap-2 py-2">
          <Globe size={16} /> Public Palace Portal
        </Link>
        <button onClick={handleLogout} className="btn btn-outline-danger btn-sm text-start d-flex align-items-center gap-2 py-2">
          <LogOut size={16} /> Sign Out of Darbar
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;