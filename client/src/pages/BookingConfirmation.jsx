import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import {
  CheckCircle2,
  Calendar,
  BedDouble,
  CreditCard,
  MapPin,
  ArrowRight,
  Printer,
  ShieldCheck,
  Crown,
  Sparkles
} from 'lucide-react';

const BookingConfirmation = () => {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get('bookingId');
  const paymentId = searchParams.get('paymentId');

  const [booking, setBooking] = useState(null);
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConfirmedBooking = async () => {
      if (!bookingId) {
        setLoading(false);
        return;
      }
      try {
        const res = await api.get(`/bookings/${bookingId}`);
        if (res.data?.success) {
          setBooking(res.data.booking);
          setPayment(res.data.payment);
        }
      } catch (err) {
        console.error('Failed to load confirmation details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchConfirmedBooking();
  }, [bookingId]);

  if (loading) {
    return <LoadingSpinner text="Generating royal confirmation voucher (शाही फरमान)..." />;
  }

  return (
    <div className="py-5" style={{ backgroundColor: '#fcfaf6' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="card luxury-card p-4 p-md-5 border-0 shadow-lg text-center" style={{ backgroundColor: '#ffffff' }}>
              {/* Celebration Icon */}
              <div className="mb-4">
                <div
                  className="rounded-circle d-inline-flex align-items-center justify-content-center text-warning mb-3 shadow"
                  style={{ width: '84px', height: '84px', backgroundColor: '#fff9ed', border: '3px solid #c99a3e' }}
                >
                  <Crown size={46} style={{ color: '#c99a3e' }} />
                </div>
                <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
                  <span className="badge-royal">
                    <Sparkles size={14} className="me-1" /> शाही फरमान जारी • Reservation Confirmed
                  </span>
                </div>
                <h1 className="display-5 fw-bold font-regal text-dark mb-2">
                  पधारो म्हारे देश! Welcome to HotelPro
                </h1>
                <p className="text-secondary lead mx-auto" style={{ maxWidth: '620px' }}>
                  It is our supreme honor to host you at our heritage palace on Lake Pichola. A formal royal stay voucher has been issued.
                </p>
              </div>

              {/* Reference ID Pill */}
              <div className="bg-light p-3 rounded-4 border d-inline-block mx-auto mb-4" style={{ minWidth: '340px' }}>
                <div className="small text-muted text-uppercase tracking-wider">Royal Farman Reference</div>
                <div className="fs-3 fw-bold text-dark font-monospace" style={{ color: '#6e0d25' }}>
                  {booking?.bookingId || 'HP-ROYAL-CONFIRMED'}
                </div>
                {paymentId && (
                  <div className="text-muted small mt-1">
                    RuPay/UPI Transaction ID: <span className="font-monospace text-dark">{paymentId}</span>
                  </div>
                )}
              </div>

              {/* Booking Highlights Card */}
              {booking && (
                <div className="card bg-white border rounded-4 p-4 text-start mb-4 shadow-sm" style={{ borderColor: '#e8dec8' }}>
                  <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
                    <h5 className="fw-bold font-regal text-dark mb-0">
                      Palace Chamber Highlights
                    </h5>
                    <span className="badge-royal">Guaranteed</span>
                  </div>
                  <div className="row g-3">
                    <div className="col-12 col-sm-6">
                      <div className="text-muted small">Palace Suite</div>
                      <div className="fw-bold text-dark fs-6">
                        {booking.room?.roomType} (Chamber #{booking.room?.roomNumber})
                      </div>
                      <div className="text-muted small">Bed: {booking.room?.bedType}</div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="text-muted small">Honored Guest</div>
                      <div className="fw-bold text-dark">{booking.guestName}</div>
                      <div className="text-muted small">{booking.guestEmail} • {booking.guestPhone}</div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="text-muted small">Stay Itinerary</div>
                      <div className="fw-bold text-dark">
                        {new Date(booking.checkIn).toLocaleDateString()} &rarr; {new Date(booking.checkOut).toLocaleDateString()}
                      </div>
                      <div className="text-muted small">
                        {booking.nights} {booking.nights === 1 ? 'night' : 'nights'} • {booking.guests} Guests
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="text-muted small">Tariff Paid (INR)</div>
                      <div className="fs-4 fw-bold font-regal" style={{ color: '#6e0d25' }}>
                        ₹{booking.totalAmount?.toLocaleString('en-IN')}
                      </div>
                      <span className="badge bg-success-subtle text-success">
                        Status: Paid via {payment?.paymentMethod || 'RuPay Demo'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Arrival Guidelines */}
              <div className="p-3 bg-light rounded-3 text-start small text-secondary mb-4 border">
                <div className="d-flex align-items-center gap-2 fw-bold text-dark mb-1 font-regal">
                  <MapPin size={16} className="text-warning" /> Royal Estate Address & Arrival Protocol
                </div>
                <div>HotelPro Heritage Palace, Lake Pichola, City Palace Complex, Udaipur, Rajasthan 313001</div>
                <div className="mt-1">
                  Complimentary royal solar boat transfers depart every 15 minutes from the City Palace Badi Ghat jetty directly to the palace water gate. Traditional Aarti & Tilak reception begins upon arrival.
                </div>
              </div>

              {/* Action Buttons */}
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                {booking && (
                  <Link
                    to={`/bookings/${booking._id}`}
                    className="btn btn-maroon px-4 py-2 d-flex align-items-center gap-2"
                  >
                    View Royal Farman & Voucher <ArrowRight size={16} />
                  </Link>
                )}
                <Link to="/my-bookings" className="btn btn-outline-dark px-4 py-2">
                  My Reservations
                </Link>
                <Link to="/" className="btn btn-link text-muted text-decoration-none">
                  Return to Palace Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;