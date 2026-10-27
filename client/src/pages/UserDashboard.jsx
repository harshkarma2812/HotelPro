import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import {
  CalendarCheck,
  CalendarX,
  CreditCard,
  BedDouble,
  ArrowRight,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Crown,
  Sparkles
} from 'lucide-react';

const UserDashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyBookings = async () => {
      try {
        const res = await api.get('/bookings/my');
        if (res.data?.success) {
          setBookings(res.data.bookings || []);
        }
      } catch (err) {
        console.error('Failed to load my bookings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyBookings();
  }, []);

  const totalBookings = bookings.length;
  const confirmedBookings = bookings.filter((b) => b.bookingStatus === 'Confirmed' || b.bookingStatus === 'Checked-In');
  const cancelledBookings = bookings.filter((b) => b.bookingStatus === 'Cancelled');
  const totalSpent = bookings
    .filter((b) => b.paymentStatus === 'Paid')
    .reduce((sum, b) => sum + (b.totalAmount || 0), 0);

  // Find next upcoming booking
  const upcomingStay = confirmedBookings.find((b) => new Date(b.checkIn) >= new Date()) || confirmedBookings[0];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmed':
        return <span className="badge badge-available">Confirmed</span>;
      case 'Checked-In':
        return <span className="badge bg-primary-subtle text-primary border border-primary-subtle">Checked-In</span>;
      case 'Checked-Out':
        return <span className="badge bg-secondary-subtle text-secondary border">Checked-Out</span>;
      case 'Cancelled':
        return <span className="badge badge-occupied">Cancelled</span>;
      default:
        return <span className="badge badge-maintenance">{status}</span>;
    }
  };

  if (loading) {
    return <LoadingSpinner text="Opening your royal guest portal..." />;
  }

  return (
    <div className="py-5" style={{ backgroundColor: '#fcfaf6' }}>
      <div className="container">
        {/* Welcome Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 pb-3 border-bottom">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <span className="badge-royal">
                <Crown size={12} className="me-1" /> शाही अतिथि कक्ष
              </span>
              <span className="text-muted small">Royal Patron Member</span>
            </div>
            <h1 className="display-6 fw-bold font-regal text-dark mb-1">
              Welcome, {user?.name}
            </h1>
            <p className="text-muted mb-0">Royal patron since {new Date(user?.createdAt || Date.now()).toLocaleDateString()}</p>
          </div>
          <div className="mt-3 mt-md-0 d-flex gap-2">
            <Link to="/rooms" className="btn btn-maroon rounded-3 d-flex align-items-center gap-2 shadow-sm">
              <BedDouble size={16} /> Reserve Another Suite
            </Link>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="row g-4 mb-5">
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="stat-card" style={{ backgroundColor: '#ffffff' }}>
              <div>
                <span className="text-muted small fw-bold">Active Royal Stays</span>
                <h3 className="fw-bold text-dark font-regal mt-1 mb-0">{confirmedBookings.length}</h3>
              </div>
              <div className="stat-icon" style={{ backgroundColor: '#ecfdf5', color: '#059669' }}>
                <CalendarCheck size={26} />
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="stat-card" style={{ backgroundColor: '#ffffff' }}>
              <div>
                <span className="text-muted small fw-bold">Total Reservations</span>
                <h3 className="fw-bold text-dark font-regal mt-1 mb-0">{totalBookings}</h3>
              </div>
              <div className="stat-icon" style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}>
                <BedDouble size={26} />
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="stat-card" style={{ backgroundColor: '#ffffff' }}>
              <div>
                <span className="text-muted small fw-bold">Cancelled Stays</span>
                <h3 className="fw-bold text-dark font-regal mt-1 mb-0">{cancelledBookings.length}</h3>
              </div>
              <div className="stat-icon" style={{ backgroundColor: '#fef2f2', color: '#dc2626' }}>
                <CalendarX size={26} />
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="stat-card" style={{ backgroundColor: '#ffffff' }}>
              <div>
                <span className="text-muted small fw-bold">Total Tariff Spent</span>
                <h3 className="fw-bold text-dark font-regal mt-1 mb-0" style={{ color: '#6e0d25' }}>
                  ₹{totalSpent.toLocaleString('en-IN')}
                </h3>
              </div>
              <div className="stat-icon" style={{ backgroundColor: '#fff9ed', color: '#c99a3e' }}>
                <CreditCard size={26} />
              </div>
            </div>
          </div>
        </div>

        {/* Next Upcoming Stay Card (if exists) */}
        {upcomingStay && (
          <div className="card luxury-card p-4 mb-5 border-0 bg-white shadow-sm" style={{ border: '1px solid #e8dec8' }}>
            <div className="row align-items-center g-4">
              <div className="col-12 col-md-4">
                <img
                  src={upcomingStay.room?.images?.[0] || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80'}
                  alt={upcomingStay.room?.roomType}
                  className="rounded-3 w-100"
                  style={{ height: '180px', objectFit: 'cover' }}
                />
              </div>
              <div className="col-12 col-md-5">
                <span className="badge-royal mb-2">
                  <Sparkles size={12} className="me-1" /> Next Upcoming Stay
                </span>
                <h4 className="fw-bold font-regal text-dark mb-1">
                  {upcomingStay.room?.roomType} #{upcomingStay.room?.roomNumber}
                </h4>
                <p className="text-muted small mb-2 d-flex align-items-center gap-1">
                  <MapPin size={14} className="text-warning" /> HotelPro Heritage Palace, Lake Pichola, Udaipur
                </p>
                <div className="d-flex align-items-center gap-3 text-secondary small">
                  <div>
                    <strong>Check-in:</strong> {new Date(upcomingStay.checkIn).toLocaleDateString()} (2:00 PM)
                  </div>
                  <div>
                    <strong>Check-out:</strong> {new Date(upcomingStay.checkOut).toLocaleDateString()} (12:00 PM)
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-3 text-md-end">
                <div className="text-muted small">Farman Ref</div>
                <div className="fw-bold text-dark font-regal fs-5 mb-2" style={{ color: '#6e0d25' }}>
                  {upcomingStay.bookingId}
                </div>
                <Link to={`/bookings/${upcomingStay._id}`} className="btn btn-outline-dark btn-sm rounded-3">
                  View Farman & Voucher
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Recent Bookings Table */}
        <div className="card luxury-card p-4 border-0 shadow-sm" style={{ backgroundColor: '#ffffff' }}>
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div>
              <h5 className="fw-bold font-regal text-dark mb-1">Recent Palace Reservations</h5>
              <p className="text-muted small mb-0">Overview of your stay dates and current payment statuses</p>
            </div>
            <Link to="/my-bookings" className="btn btn-sm btn-outline-secondary rounded-pill px-3">
              View All Bookings
            </Link>
          </div>

          {bookings.length === 0 ? (
            <EmptyState
              title="No Reservations Recorded"
              description="You have not reserved any palace suites yet. Explore our royal quarters to plan your royal getaway."
              actionText="Explore Suites"
              actionLink="/rooms"
            />
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr className="small text-muted text-uppercase">
                    <th>Farman Ref</th>
                    <th>Chamber</th>
                    <th>Stay Dates</th>
                    <th>Guests</th>
                    <th>Total Tariff</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th className="text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.slice(0, 5).map((booking) => (
                    <tr key={booking._id}>
                      <td className="fw-bold text-dark font-monospace small">
                        {booking.bookingId}
                      </td>
                      <td>
                        <div className="fw-bold text-dark font-regal">{booking.room?.roomType}</div>
                        <div className="text-muted small">Chamber #{booking.room?.roomNumber}</div>
                      </td>
                      <td className="small text-secondary">
                        {new Date(booking.checkIn).toLocaleDateString()} &rarr; {new Date(booking.checkOut).toLocaleDateString()}
                        <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                          ({booking.nights} {booking.nights === 1 ? 'night' : 'nights'})
                        </div>
                      </td>
                      <td className="small text-secondary">{booking.guests} Guests</td>
                      <td className="fw-bold text-dark font-regal">
                        ₹{booking.totalAmount?.toLocaleString('en-IN')}
                      </td>
                      <td>
                        <span className={`badge ${booking.paymentStatus === 'Paid' ? 'bg-success-subtle text-success' : booking.paymentStatus === 'Refunded' ? 'bg-info-subtle text-info' : 'bg-warning-subtle text-warning'}`}>
                          {booking.paymentStatus}
                        </span>
                      </td>
                      <td>{getStatusBadge(booking.bookingStatus)}</td>
                      <td className="text-end">
                        <Link
                          to={`/bookings/${booking._id}`}
                          className="btn btn-sm btn-outline-dark rounded-3 px-3"
                        >
                          Farman
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;