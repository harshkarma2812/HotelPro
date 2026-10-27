import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import LoadingSpinner from '../components/LoadingSpinner';
import api from '../services/api';
import {
  Users,
  BedDouble,
  CalendarCheck,
  CalendarX,
  CreditCard,
  TrendingUp,
  PlusCircle,
  Eye,
  CheckCircle2,
  Clock,
  ArrowRight,
  Crown,
  Sparkles
} from 'lucide-react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/admin/dashboard');
        if (res.data?.success) {
          setDashboardData(res.data);
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch dashboard metrics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="d-flex">
        <AdminSidebar />
        <div className="flex-grow-1 p-5">
          <LoadingSpinner text="Computing real-time palace analytics & royal KPIs..." />
        </div>
      </div>
    );
  }

  const { stats, charts, recentBookings } = dashboardData || {};

  // Monthly Revenue & Bookings Bar Chart config
  const monthlyLabels = charts?.monthlyChartData?.map((item) => item.month) || [];
  const monthlyRevenues = charts?.monthlyChartData?.map((item) => item.revenue) || [];
  const monthlyBookingsCount = charts?.monthlyChartData?.map((item) => item.bookings) || [];

  const revenueChartData = {
    labels: monthlyLabels,
    datasets: [
      {
        label: 'Revenue (₹ INR)',
        data: monthlyRevenues,
        backgroundColor: 'rgba(201, 154, 62, 0.85)',
        borderColor: '#c99a3e',
        borderWidth: 1,
        borderRadius: 6,
        yAxisID: 'y'
      },
      {
        label: 'Palace Bookings',
        data: monthlyBookingsCount,
        backgroundColor: 'rgba(110, 13, 37, 0.85)',
        borderColor: '#6e0d25',
        borderWidth: 1,
        borderRadius: 6,
        yAxisID: 'y1'
      }
    ]
  };

  const revenueChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' }
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: { display: true, text: 'Revenue (₹ INR)' },
        grid: { color: '#f1f5f9' }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: { display: true, text: 'Bookings' },
        grid: { drawOnChartArea: false }
      }
    }
  };

  // Status Distribution Doughnut Chart config
  const statusLabels = charts?.statusDistribution?.map((s) => s.status) || [];
  const statusCounts = charts?.statusDistribution?.map((s) => s.count) || [];

  const doughnutData = {
    labels: statusLabels,
    datasets: [
      {
        data: statusCounts,
        backgroundColor: [
          '#10b981', // Confirmed (Emerald)
          '#3b82f6', // Checked-In (Blue)
          '#64748b', // Checked-Out (Slate)
          '#ef4444', // Cancelled (Red)
          '#c99a3e'  // Pending (Gold)
        ],
        borderWidth: 2,
        borderColor: '#ffffff'
      }
    ]
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' }
    }
  };

  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Admin Content */}
      <div className="flex-grow-1 p-4 p-md-5 overflow-auto" style={{ maxHeight: '100vh' }}>
        {/* Top Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 pb-3 border-bottom">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <span className="badge-royal">
                <Crown size={12} className="me-1" /> शाही दीवानखाना
              </span>
              <span className="text-muted small">Palace Operations & Treasury</span>
            </div>
            <h1 className="display-6 fw-bold font-regal text-dark mb-1">
              Darbar Analytics & Operations
            </h1>
            <p className="text-muted mb-0">Live MongoDB system statistics, palace occupancy, and royal revenue streams</p>
          </div>
          <div className="d-flex gap-2 mt-3 mt-md-0">
            <Link to="/admin/rooms/add" className="btn btn-maroon rounded-3 d-flex align-items-center gap-1 shadow-sm">
              <PlusCircle size={16} /> Add Suite
            </Link>
            <Link to="/admin/bookings" className="btn btn-outline-dark rounded-3 d-flex align-items-center gap-1">
              <CalendarCheck size={16} /> Manage Bookings
            </Link>
          </div>
        </div>

        {/* 8 Primary KPI Cards */}
        <div className="row g-3 mb-5">
          {/* Total Revenue */}
          <div className="col-12 col-sm-6 col-xl-3">
            <div className="stat-card" style={{ backgroundColor: '#ffffff' }}>
              <div>
                <span className="text-muted small fw-bold text-uppercase">Shahi Treasury (Revenue)</span>
                <h3 className="fw-bold font-regal mt-1 mb-0" style={{ color: '#6e0d25' }}>
                  ₹{stats?.totalRevenue?.toLocaleString('en-IN') || 0}
                </h3>
                <span className="text-success small fw-semibold d-flex align-items-center gap-1 mt-1">
                  <TrendingUp size={14} /> Paid Bookings
                </span>
              </div>
              <div className="stat-icon" style={{ backgroundColor: '#fff9ed', color: '#c99a3e' }}>
                <CreditCard size={26} />
              </div>
            </div>
          </div>

          {/* Total Bookings */}
          <div className="col-12 col-sm-6 col-xl-3">
            <div className="stat-card" style={{ backgroundColor: '#ffffff' }}>
              <div>
                <span className="text-muted small fw-bold text-uppercase">Total Farman Bookings</span>
                <h3 className="fw-bold text-dark font-regal mt-1 mb-0">{stats?.totalBookings}</h3>
                <span className="text-muted small">All Time Volume</span>
              </div>
              <div className="stat-icon" style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}>
                <CalendarCheck size={26} />
              </div>
            </div>
          </div>

          {/* Available Rooms */}
          <div className="col-12 col-sm-6 col-xl-3">
            <div className="stat-card" style={{ backgroundColor: '#ffffff' }}>
              <div>
                <span className="text-muted small fw-bold text-uppercase">Available Suites</span>
                <h3 className="fw-bold text-success font-regal mt-1 mb-0">{stats?.availableRooms}</h3>
                <span className="text-muted small">Out of {stats?.totalRooms} Palace Chambers</span>
              </div>
              <div className="stat-icon" style={{ backgroundColor: '#ecfdf5', color: '#059669' }}>
                <BedDouble size={26} />
              </div>
            </div>
          </div>

          {/* Occupied Rooms */}
          <div className="col-12 col-sm-6 col-xl-3">
            <div className="stat-card" style={{ backgroundColor: '#ffffff' }}>
              <div>
                <span className="text-muted small fw-bold text-uppercase">Occupied / Maint.</span>
                <h3 className="fw-bold text-danger font-regal mt-1 mb-0">
                  {stats?.occupiedRooms} / {stats?.maintenanceRooms}
                </h3>
                <span className="text-muted small">Active occupancy</span>
              </div>
              <div className="stat-icon" style={{ backgroundColor: '#fef2f2', color: '#dc2626' }}>
                <BedDouble size={26} />
              </div>
            </div>
          </div>

          {/* Total Users */}
          <div className="col-12 col-sm-6 col-xl-3">
            <div className="stat-card" style={{ backgroundColor: '#ffffff' }}>
              <div>
                <span className="text-muted small fw-bold text-uppercase">Registered Guests</span>
                <h3 className="fw-bold text-dark font-regal mt-1 mb-0">{stats?.totalUsers}</h3>
                <span className="text-muted small">Royal circle members</span>
              </div>
              <div className="stat-icon" style={{ backgroundColor: '#fbf7f2', color: '#8b5cf6' }}>
                <Users size={26} />
              </div>
            </div>
          </div>

          {/* Confirmed Bookings */}
          <div className="col-12 col-sm-6 col-xl-3">
            <div className="stat-card" style={{ backgroundColor: '#ffffff' }}>
              <div>
                <span className="text-muted small fw-bold text-uppercase">Confirmed Stays</span>
                <h3 className="fw-bold text-success font-regal mt-1 mb-0">{stats?.confirmedBookings}</h3>
                <span className="text-muted small">Ready for check-in</span>
              </div>
              <div className="stat-icon" style={{ backgroundColor: '#ecfdf5', color: '#10b981' }}>
                <CheckCircle2 size={26} />
              </div>
            </div>
          </div>

          {/* Cancelled Bookings */}
          <div className="col-12 col-sm-6 col-xl-3">
            <div className="stat-card" style={{ backgroundColor: '#ffffff' }}>
              <div>
                <span className="text-muted small fw-bold text-uppercase">Cancelled Stays</span>
                <h3 className="fw-bold text-danger font-regal mt-1 mb-0">{stats?.cancelledBookings}</h3>
                <span className="text-muted small">Refunded stays</span>
              </div>
              <div className="stat-icon" style={{ backgroundColor: '#fef2f2', color: '#ef4444' }}>
                <CalendarX size={26} />
              </div>
            </div>
          </div>

          {/* Occupancy Rate */}
          <div className="col-12 col-sm-6 col-xl-3">
            <div className="stat-card" style={{ backgroundColor: '#ffffff' }}>
              <div>
                <span className="text-muted small fw-bold text-uppercase">Palace Occupancy</span>
                <h3 className="fw-bold text-dark font-regal mt-1 mb-0">
                  {stats?.totalRooms ? Math.round(((stats.occupiedRooms || 0) / stats.totalRooms) * 100) : 0}%
                </h3>
                <span className="text-muted small">Live utilization</span>
              </div>
              <div className="stat-icon" style={{ backgroundColor: '#eff6ff', color: '#3b82f6' }}>
                <TrendingUp size={26} />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="row g-4 mb-5">
          {/* Revenue & Bookings Bar Chart */}
          <div className="col-12 col-xl-8">
            <div className="card luxury-card p-4 border-0 shadow-sm" style={{ backgroundColor: '#ffffff' }}>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="fw-bold font-regal text-dark mb-0">Monthly Revenue & Bookings Overview</h5>
                <span className="badge-royal small">Past 6 Months</span>
              </div>
              <div style={{ height: '320px' }}>
                {monthlyLabels.length > 0 ? (
                  <Bar data={revenueChartData} options={revenueChartOptions} />
                ) : (
                  <div className="d-flex h-100 align-items-center justify-content-center text-muted">
                    No historical chart data available yet.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Status Distribution Doughnut Chart */}
          <div className="col-12 col-xl-4">
            <div className="card luxury-card p-4 border-0 shadow-sm" style={{ backgroundColor: '#ffffff' }}>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="fw-bold font-regal text-dark mb-0">Booking Status Ratio</h5>
                <span className="badge bg-light text-secondary border small">Live</span>
              </div>
              <div style={{ height: '320px' }}>
                {statusCounts.length > 0 ? (
                  <Doughnut data={doughnutData} options={doughnutOptions} />
                ) : (
                  <div className="d-flex h-100 align-items-center justify-content-center text-muted">
                    No booking status records available.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Bookings Table */}
        <div className="card luxury-card p-4 border-0 shadow-sm" style={{ backgroundColor: '#ffffff' }}>
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div>
              <h5 className="fw-bold font-regal text-dark mb-1">Recent Palace Reservations</h5>
              <p className="text-muted small mb-0">Latest bookings placed across web and front-desk channels</p>
            </div>
            <Link to="/admin/bookings" className="btn btn-sm btn-outline-secondary rounded-pill px-3">
              View All Bookings &rarr;
            </Link>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr className="small text-muted text-uppercase">
                  <th>Farman Ref</th>
                  <th>Guest Name</th>
                  <th>Palace Suite</th>
                  <th>Dates</th>
                  <th>Tariff (INR)</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th className="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings?.map((b) => (
                  <tr key={b._id}>
                    <td className="fw-bold font-monospace small text-dark">
                      {b.bookingId}
                    </td>
                    <td>
                      <div className="fw-semibold text-dark">{b.guestName}</div>
                      <div className="text-muted small">{b.guestEmail}</div>
                    </td>
                    <td>
                      <div className="fw-semibold text-dark font-regal">{b.room?.roomType}</div>
                      <div className="text-muted small">Chamber #{b.room?.roomNumber}</div>
                    </td>
                    <td className="small text-secondary">
                      {new Date(b.checkIn).toLocaleDateString()} &rarr; {new Date(b.checkOut).toLocaleDateString()}
                    </td>
                    <td className="fw-bold text-dark font-regal">
                      ₹{b.totalAmount?.toLocaleString('en-IN')}
                    </td>
                    <td>
                      <span className={`badge ${b.paymentStatus === 'Paid' ? 'bg-success-subtle text-success' : b.paymentStatus === 'Refunded' ? 'bg-info-subtle text-info' : 'bg-warning-subtle text-warning'}`}>
                        {b.paymentStatus}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${b.bookingStatus === 'Confirmed' ? 'badge-available' : b.bookingStatus === 'Cancelled' ? 'badge-occupied' : 'badge-maintenance'}`}>
                        {b.bookingStatus}
                      </span>
                    </td>
                    <td className="text-end">
                      <Link
                        to={`/bookings/${b._id}`}
                        className="btn btn-sm btn-outline-dark p-1 px-2"
                        title="View Voucher"
                      >
                        <Eye size={14} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;