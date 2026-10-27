import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import {
  Calendar,
  Users,
  BedDouble,
  CreditCard,
  Printer,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  XCircle,
  MapPin,
  Clock,
  ShieldCheck,
  Crown,
  Sparkles
} from 'lucide-react';

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelling, setCancelling] = useState(false);
  const [cancelMessage, setCancelMessage] = useState(null);

  const fetchDetails = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/bookings/${id}`);
      if (res.data?.success) {
        setBooking(res.data.booking);
        setPayment(res.data.payment);
      }
    } catch (err) {
      setError(err.message || 'Failed to retrieve palace booking information');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  const handleCancel = async () => {
    if (!window.confirm('Are you sure you want to cancel this royal reservation? An instant refund will be recorded back to your demo payment method.')) {
      return;
    }

    setCancelling(true);
    try {
      const res = await api.put(`/bookings/${booking._id}/cancel`);
      if (res.data?.success) {
        setCancelMessage('Palace reservation cancelled successfully. Full refund has been recorded.');
        fetchDetails();
      }
    } catch (err) {
      setError(err.message || 'Failed to cancel reservation');
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return <LoadingSpinner text="Generating Shahi Farman (शाही फरमान) stay voucher..." />;
  }

  if (error || !booking) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-danger p-4 rounded-3 d-inline-block">
          <h4>Unable to Load Farman</h4>
          <p>{error || 'Reservation could not be found.'}</p>
          <Link to="/my-bookings" className="btn btn-outline-danger mt-2">
            Back to My Bookings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-5" style={{ backgroundColor: '#fcfaf6' }}>
      <div className="container">
        {/* Top Controls (Hidden in Print) */}
        <div className="no-print d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 mb-4">
          <Link to="/my-bookings" className="btn btn-sm btn-outline-secondary d-inline-flex align-items-center gap-1 rounded-pill px-3">
            <ArrowLeft size={16} /> Back to Reservations
          </Link>

          <div className="d-flex gap-2">
            <button
              onClick={() => window.print()}
              className="btn btn-dark btn-sm rounded-3 d-flex align-items-center gap-2 px-3"
            >
              <Printer size={16} /> Print Shahi Farman / Invoice
            </button>

            {booking.bookingStatus !== 'Cancelled' && booking.bookingStatus !== 'Checked-Out' && (
              <button
                onClick={handleCancel}
                disabled={cancelling}
                className="btn btn-outline-danger btn-sm rounded-3 d-flex align-items-center gap-1 px-3"
              >
                <XCircle size={16} /> Cancel Reservation
              </button>
            )}

            {booking.paymentStatus === 'Pending' && booking.bookingStatus !== 'Cancelled' && (
              <Link
                to={`/payment?bookingId=${booking._id}`}
                className="btn btn-warning btn-sm rounded-3 d-flex align-items-center gap-1 px-3 fw-bold"
              >
                <CreditCard size={16} /> Complete Payment
              </Link>
            )}
          </div>
        </div>

        {cancelMessage && (
          <div className="alert alert-success py-2 px-3 small d-flex align-items-center gap-2 mb-4 no-print">
            <CheckCircle2 size={16} />
            <span>{cancelMessage}</span>
          </div>
        )}

        {/* Printable Voucher Card */}
        <div className="card luxury-card p-4 p-md-5 border-0 shadow-sm print-invoice bg-white" style={{ border: '2px solid #e8dec8' }}>
          {/* Header */}
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center pb-4 mb-4 border-bottom gap-3">
            <div className="d-flex align-items-center gap-3">
              <div
                className="p-3 rounded-3 d-flex align-items-center justify-content-center"
                style={{ backgroundColor: '#6e0d25', color: '#c99a3e' }}
              >
                <Crown size={36} />
              </div>
              <div>
                <div className="d-flex align-items-center gap-2">
                  <h3 className="fw-bold font-regal text-dark mb-0">Hotel<span style={{ color: '#c99a3e' }}>Pro</span></h3>
                  <span className="badge-royal">शाही महल</span>
                </div>
                <div className="text-muted small">Royal Heritage Haveli & Palace Stay Voucher (शाही फरमान)</div>
              </div>
            </div>

            <div className="text-sm-end">
              <span className="badge-royal px-3 py-2 fs-6 mb-1 d-inline-block">
                Farman Ref: {booking.bookingId}
              </span>
              <div className="text-muted small">
                Issued on {new Date(booking.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Status Banner */}
          <div className={`alert ${booking.bookingStatus === 'Confirmed' ? 'alert-success' : booking.bookingStatus === 'Cancelled' ? 'alert-danger' : 'alert-info'} p-3 rounded-3 d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2 mb-4`}>
            <div className="d-flex align-items-center gap-2">
              <CheckCircle2 size={20} />
              <div>
                <strong>Reservation Status: {booking.bookingStatus}</strong>
                <span className="mx-2">•</span>
                <span>Payment: {booking.paymentStatus}</span>
              </div>
            </div>
            <div className="small text-muted font-monospace">
              Royal Guarantee Code: HP-{booking.bookingId?.replace(/[^0-9]/g, '') || '7789'}
            </div>
          </div>

          {/* Booking Summary Columns */}
          <div className="row g-4 mb-5">
            {/* Guest Info */}
            <div className="col-12 col-md-6 col-lg-3">
              <h6 className="text-uppercase text-muted small fw-bold mb-3 font-regal">Honored Guest</h6>
              <div className="fw-bold text-dark fs-6">{booking.guestName}</div>
              <div className="text-secondary small">{booking.guestEmail}</div>
              <div className="text-secondary small">{booking.guestPhone}</div>
              <div className="text-muted small mt-2">Guests: {booking.guests}</div>
            </div>

            {/* Room Details */}
            <div className="col-12 col-md-6 col-lg-3">
              <h6 className="text-uppercase text-muted small fw-bold mb-3 font-regal">Palace Chamber</h6>
              <div className="fw-bold text-dark fs-6">{booking.room?.roomType}</div>
              <div className="text-secondary small">Chamber #{booking.room?.roomNumber} (Floor {booking.room?.floor || 1})</div>
              <div className="text-secondary small">Bedding: {booking.room?.bedType}</div>
              <div className="text-secondary small">Area: {booking.room?.size || 550} sq ft</div>
            </div>

            {/* Stay Dates */}
            <div className="col-12 col-md-6 col-lg-3">
              <h6 className="text-uppercase text-muted small fw-bold mb-3 font-regal">Schedule & Darshan</h6>
              <div className="small">
                <span className="text-muted d-block">Royal Check-in:</span>
                <strong className="text-dark">{new Date(booking.checkIn).toLocaleDateString()} (2:00 PM)</strong>
              </div>
              <div className="small mt-2">
                <span className="text-muted d-block">Check-out:</span>
                <strong className="text-dark">{new Date(booking.checkOut).toLocaleDateString()} (12:00 PM)</strong>
              </div>
              <div className="text-muted small mt-1">Duration: {booking.nights} {booking.nights === 1 ? 'night' : 'nights'}</div>
            </div>

            {/* Hotel Location & Security */}
            <div className="col-12 col-md-6 col-lg-3">
              <h6 className="text-uppercase text-muted small fw-bold mb-3 font-regal">Estate Address</h6>
              <div className="small text-secondary">
                <MapPin size={14} className="text-warning me-1" />
                HotelPro Heritage Palace, Lake Pichola, City Palace Complex, Udaipur, Rajasthan 313001
              </div>
              <div className="small text-secondary mt-1">
                Concierge: +91 (294) 242-8800
              </div>
              <div className="d-flex align-items-center gap-1 text-success small mt-2">
                <ShieldCheck size={16} /> Verified Palace Voucher
              </div>
            </div>
          </div>

          {/* Payment & Invoice Breakdown */}
          <div className="border rounded-3 p-4 mb-4 bg-light">
            <h5 className="fw-bold font-regal text-dark mb-3">Billing & Tax Invoice (INR)</h5>
            <div className="table-responsive">
              <table className="table table-borderless align-middle mb-0">
                <thead>
                  <tr className="border-bottom small text-muted text-uppercase">
                    <th>Description</th>
                    <th className="text-center">Rate / Night</th>
                    <th className="text-center">Nights</th>
                    <th className="text-end">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-bottom">
                    <td>
                      <div className="fw-bold text-dark">{booking.room?.roomType} Chamber #{booking.room?.roomNumber}</div>
                      <div className="text-muted small">Includes royal buffet breakfast, lakeside boat transfer, and dedicated Khidmatgar</div>
                    </td>
                    <td className="text-center">₹{booking.pricePerNight?.toLocaleString('en-IN')}</td>
                    <td className="text-center">{booking.nights}</td>
                    <td className="text-end fw-bold">₹{(booking.pricePerNight * booking.nights)?.toLocaleString('en-IN')}</td>
                  </tr>
                  <tr className="border-bottom text-muted small">
                    <td colSpan="3">Palace Heritage Luxury GST & Seva (12% included)</td>
                    <td className="text-end fw-medium text-dark">₹{Math.round(booking.totalAmount * 0.12)?.toLocaleString('en-IN')}</td>
                  </tr>
                  <tr>
                    <td colSpan="3" className="fs-5 fw-bold text-dark font-regal text-end pt-3">
                      Total Invoice Amount:
                    </td>
                    <td className="fs-4 fw-bold font-regal text-end pt-3" style={{ color: '#6e0d25' }}>
                      ₹{booking.totalAmount?.toLocaleString('en-IN')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Payment Record Details if Paid */}
            {payment && (
              <div className="mt-3 pt-3 border-top small text-secondary d-flex flex-wrap justify-content-between gap-2">
                <div>
                  <strong>Payment ID:</strong> {payment.paymentId}
                </div>
                <div>
                  <strong>Transaction ID:</strong> {payment.transactionId}
                </div>
                <div>
                  <strong>Method:</strong> {payment.paymentMethod}
                </div>
                <div>
                  <strong>Status:</strong> <span className="badge bg-success">{payment.paymentStatus}</span>
                </div>
              </div>
            )}
          </div>

          {/* Special Requests */}
          {booking.specialRequests && (
            <div className="p-3 bg-white border rounded-3 mb-4">
              <strong className="text-dark small d-block mb-1">Guest Special Royal Requests:</strong>
              <p className="text-secondary small mb-0 fst-italic">"{booking.specialRequests}"</p>
            </div>
          )}

          {/* Footer note */}
          <div className="text-center text-muted small pt-3 border-top">
            अतिथि देवो भव • Thank you for honoring HotelPro with your presence. Please present this Shahi Farman or reservation reference code upon arrival at the City Palace Jetty.
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;