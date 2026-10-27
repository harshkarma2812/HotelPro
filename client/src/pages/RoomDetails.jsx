import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import LoadingSpinner from '../components/LoadingSpinner';
import {
  Users,
  BedDouble,
  Maximize2,
  Calendar,
  Star,
  ShieldCheck,
  Check,
  ArrowLeft,
  Crown,
  Sparkles,
  AlertCircle,
  MapPin,
  Clock
} from 'lucide-react';

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { searchParams, setBookingDraft, calculateNights, formatDate } = useBooking();

  const [room, setRoom] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Booking widget form state
  const [bookingForm, setBookingForm] = useState({
    checkIn: searchParams.checkIn,
    checkOut: searchParams.checkOut,
    guests: searchParams.guests || 2,
    guestName: user?.name || '',
    guestEmail: user?.email || '',
    guestPhone: user?.phone || '',
    specialRequests: ''
  });

  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState(null);

  useEffect(() => {
    const fetchRoom = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/rooms/${id}`);
        if (res.data?.success) {
          setRoom(res.data.room);
        }
      } catch (err) {
        setError(err.message || 'Room not found');
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  // Keep guest info updated if user logs in
  useEffect(() => {
    if (user) {
      setBookingForm((prev) => ({
        ...prev,
        guestName: prev.guestName || user.name,
        guestEmail: prev.guestEmail || user.email,
        guestPhone: prev.guestPhone || user.phone
      }));
    }
  }, [user]);

  const nights = calculateNights(bookingForm.checkIn, bookingForm.checkOut);
  const subtotal = (room?.price || 0) * nights;
  const taxes = Math.round(subtotal * 0.12); // 12% Heritage Luxury GST
  const grandTotal = subtotal + taxes;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleStartBooking = async (e) => {
    e.preventDefault();
    setBookingError(null);

    if (!isAuthenticated) {
      // Store intended booking draft in context and redirect to login
      setBookingDraft({
        room,
        ...bookingForm,
        nights,
        subtotal,
        taxes,
        grandTotal
      });
      navigate('/login?redirect=booking');
      return;
    }

    if (Number(bookingForm.guests) > room.capacity) {
      setBookingError(`Maximum royal capacity for this chamber is ${room.capacity} guests.`);
      return;
    }

    setBookingLoading(true);
    try {
      // Create pending booking on backend
      const res = await api.post('/bookings', {
        roomId: room._id,
        checkIn: bookingForm.checkIn,
        checkOut: bookingForm.checkOut,
        guests: Number(bookingForm.guests),
        guestName: bookingForm.guestName,
        guestEmail: bookingForm.guestEmail,
        guestPhone: bookingForm.guestPhone,
        specialRequests: bookingForm.specialRequests
      });

      if (res.data?.success) {
        const newBooking = res.data.booking;
        setBookingDraft(newBooking);
        navigate(`/payment?bookingId=${newBooking._id}`);
      }
    } catch (err) {
      setBookingError(err.message || 'Failed to initialize palace booking');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner text="Fetching royal suite specifications..." fullScreen={false} />;
  }

  if (error || !room) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-danger p-4 rounded-3 d-inline-block">
          <h4>Chamber Not Found</h4>
          <p>{error || 'The requested palace suite could not be loaded.'}</p>
          <Link to="/rooms" className="btn btn-outline-danger mt-2">
            Back to Palace Suites
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-5" style={{ backgroundColor: '#fcfaf6' }}>
      <div className="container">
        {/* Navigation Breadcrumb */}
        <div className="mb-4">
          <Link to="/rooms" className="btn btn-sm btn-outline-secondary d-inline-flex align-items-center gap-1 rounded-pill px-3">
            <ArrowLeft size={16} /> Back to Palace Chambers
          </Link>
        </div>

        {/* Room Title Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4">
          <div>
            <div className="d-flex align-items-center gap-2 mb-2">
              <span className="badge-royal">
                <Crown size={12} className="me-1" /> {room.roomType}
              </span>
              <span className="badge bg-dark text-white">Chamber #{room.roomNumber}</span>
              <span className="d-flex align-items-center gap-1 text-warning fw-bold small ms-2">
                <Star size={16} className="fill-warning text-warning" /> {room.rating || 4.9} / 5.0 (Royal Reviews)
              </span>
            </div>
            <h1 className="display-5 fw-bold text-dark font-regal mb-1">
              {room.roomType}
            </h1>
            <p className="text-muted mb-0">Floor {room.floor || 1} • Lake Pichola Waterfront Heritage Wing</p>
          </div>

          <div className="mt-3 mt-md-0 text-md-end">
            <div className="text-muted small">Royal Palace Tariff</div>
            <div className="d-flex align-items-baseline gap-1 justify-content-md-end">
              <span className="display-6 fw-bold text-dark font-regal" style={{ color: '#6e0d25' }}>
                ₹{room.price?.toLocaleString('en-IN')}
              </span>
              <span className="text-muted">/ night + GST</span>
            </div>
          </div>
        </div>

        {/* Images Gallery */}
        <div className="row g-3 mb-5">
          <div className="col-12 col-lg-8">
            <div className="position-relative rounded-4 overflow-hidden shadow-sm" style={{ height: '460px' }}>
              <img
                src={room.images?.[selectedImage] || room.images?.[0]}
                alt={room.roomType}
                className="w-100 h-100"
                style={{ objectFit: 'cover' }}
              />
              <div className="position-absolute bottom-0 start-0 m-3 badge bg-dark bg-opacity-75 text-white px-3 py-2 rounded-pill">
                Heritage Jharokha View • Hand-Painted Frescoes
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-4 d-flex flex-column gap-3 justify-content-between">
            {room.images?.slice(0, 3).map((img, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`rounded-3 overflow-hidden border ${selectedImage === idx ? 'border-warning border-3 shadow' : 'opacity-75'} cursor-pointer`}
                style={{ height: '140px', cursor: 'pointer' }}
              >
                <img src={img} alt="Thumbnail" className="w-100 h-100" style={{ objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Content Split: Details Left vs Booking Widget Right */}
        <div className="row g-5">
          {/* LEFT: Room Specifications */}
          <div className="col-12 col-lg-7 col-xl-8">
            {/* Quick Specs Badges */}
            <div className="card luxury-card p-4 mb-4 border-0 shadow-sm" style={{ backgroundColor: '#ffffff' }}>
              <div className="row g-3 text-center">
                <div className="col-4 border-end">
                  <Users size={24} style={{ color: '#c99a3e' }} className="mb-1" />
                  <div className="text-muted small">Guest Capacity</div>
                  <div className="fw-bold text-dark">{room.capacity} Guests Max</div>
                </div>
                <div className="col-4 border-end">
                  <BedDouble size={24} style={{ color: '#c99a3e' }} className="mb-1" />
                  <div className="text-muted small">Bedding</div>
                  <div className="fw-bold text-dark">{room.bedType}</div>
                </div>
                <div className="col-4">
                  <Maximize2 size={24} style={{ color: '#c99a3e' }} className="mb-1" />
                  <div className="text-muted small">Palace Area</div>
                  <div className="fw-bold text-dark">{room.size || 550} sq ft</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-5">
              <h4 className="fw-bold font-regal text-dark mb-3">Chamber Overview</h4>
              <p className="text-secondary leading-relaxed fs-6">
                {room.description}
              </p>
              <p className="text-secondary leading-relaxed">
                Adorned with gold-leaf inlay ceiling work, authentic Tikri mirror art, hand-woven silk draperies, and royal teakwood furnishings. Guests enjoy personalized Khidmatgar (royal butler) assistance, customized Ayurvedic wellness bath oils, and private evening tea served in your lakeside Jharokha.
              </p>
            </div>

            {/* Amenities Checklist */}
            <div className="mb-5">
              <h4 className="fw-bold font-regal text-dark mb-3">Royal Heritage Amenities & Khidmatgar Services</h4>
              <div className="row g-3">
                {room.amenities?.map((amenity, idx) => (
                  <div key={idx} className="col-6 col-sm-4">
                    <div className="d-flex align-items-center gap-2 p-3 bg-white rounded-3 border shadow-sm">
                      <Sparkles size={18} className="text-warning flex-shrink-0" />
                      <span className="small fw-semibold text-dark">{amenity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hotel Policies */}
            <div className="card p-4 rounded-4 border shadow-sm" style={{ backgroundColor: '#fffdfa', borderColor: '#e8dec8' }}>
              <h5 className="fw-bold font-regal text-dark mb-3">
                <Crown size={18} className="me-2 text-warning" /> Royal Protocol & Stay Guidance
              </h5>
              <div className="row g-3 small text-secondary">
                <div className="col-sm-6">
                  <strong className="text-dark d-block">Royal Check-in:</strong>
                  From 2:00 PM with traditional Rajasthani Aarti, Tilak & Garland welcome ceremony.
                </div>
                <div className="col-sm-6">
                  <strong className="text-dark d-block">Check-out:</strong>
                  Until 12:00 Noon (Late departure until 3:00 PM available complimentary on request).
                </div>
                <div className="col-sm-6">
                  <strong className="text-dark d-block">Cancellation Farman:</strong>
                  100% free cancellation up to 48 hours prior to arrival with instant refund.
                </div>
                <div className="col-sm-6">
                  <strong className="text-dark d-block">Dining & Shahi Dawat:</strong>
                  Complimentary Royal Breakfast buffet at the Lake Terrace with live sitar music.
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Booking Reservation Widget */}
          <div className="col-12 col-lg-5 col-xl-4">
            <div className="card luxury-card p-4 sticky-top shadow-lg" style={{ top: '100px', borderColor: '#c99a3e' }}>
              <div className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom">
                <div>
                  <span className="text-muted small">शाही आरक्षण</span>
                  <h4 className="fw-bold text-dark font-regal mb-0">Reserve Chamber</h4>
                </div>
                <span className="badge-royal">Instant Farman</span>
              </div>

              {bookingError && (
                <div className="alert alert-danger py-2 px-3 small d-flex align-items-center gap-2 mb-3">
                  <AlertCircle size={16} className="flex-shrink-0" />
                  <span>{bookingError}</span>
                </div>
              )}

              <form onSubmit={handleStartBooking}>
                {/* Dates */}
                <div className="row g-2 mb-3">
                  <div className="col-6">
                    <label className="form-label small fw-bold text-muted mb-1">Check-in</label>
                    <input
                      type="date"
                      name="checkIn"
                      className="form-control form-control-sm rounded-3"
                      value={bookingForm.checkIn}
                      onChange={handleInputChange}
                      min={formatDate(new Date())}
                      required
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label small fw-bold text-muted mb-1">Check-out</label>
                    <input
                      type="date"
                      name="checkOut"
                      className="form-control form-control-sm rounded-3"
                      value={bookingForm.checkOut}
                      min={bookingForm.checkIn}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                {/* Guests */}
                <div className="mb-3">
                  <label className="form-label small fw-bold text-muted mb-1">Royal Guests</label>
                  <select
                    name="guests"
                    className="form-select form-select-sm rounded-3"
                    value={bookingForm.guests}
                    onChange={handleInputChange}
                  >
                    {[...Array(room.capacity)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} {i + 1 === 1 ? 'Guest' : 'Guests'} (Max {room.capacity})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Guest Details */}
                <div className="mb-2">
                  <label className="form-label small fw-bold text-muted mb-1">Primary Guest Full Name</label>
                  <input
                    type="text"
                    name="guestName"
                    className="form-control form-control-sm rounded-3"
                    placeholder="e.g. Princess Gayatri Devi"
                    value={bookingForm.guestName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="row g-2 mb-3">
                  <div className="col-6">
                    <label className="form-label small fw-bold text-muted mb-1">Email</label>
                    <input
                      type="email"
                      name="guestEmail"
                      className="form-control form-control-sm rounded-3"
                      placeholder="guest@example.com"
                      value={bookingForm.guestEmail}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label small fw-bold text-muted mb-1">Mobile / WhatsApp</label>
                    <input
                      type="tel"
                      name="guestPhone"
                      className="form-control form-control-sm rounded-3"
                      placeholder="+91 98765 43210"
                      value={bookingForm.guestPhone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold text-muted mb-1">Special Royal Requests (Optional)</label>
                  <textarea
                    name="specialRequests"
                    rows="2"
                    className="form-control form-control-sm rounded-3"
                    placeholder="e.g. Lake view jharokha, vintage car transfer, wedding anniversary setup..."
                    value={bookingForm.specialRequests}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Price Breakdown */}
                <div className="bg-light p-3 rounded-3 mb-3 small border">
                  <div className="d-flex justify-content-between mb-1 text-muted">
                    <span>₹{room.price?.toLocaleString('en-IN')} x {nights} {nights === 1 ? 'night' : 'nights'}</span>
                    <span className="fw-medium text-dark">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-1 text-muted">
                    <span>Palace Heritage GST & Seva Fee (12%)</span>
                    <span className="fw-medium text-dark">₹{taxes.toLocaleString('en-IN')}</span>
                  </div>
                  <hr className="my-2" />
                  <div className="d-flex justify-content-between fs-6 fw-bold text-dark font-regal">
                    <span>Grand Total (INR)</span>
                    <span style={{ color: '#6e0d25' }}>₹{grandTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={bookingLoading || room.status !== 'Available'}
                  className="btn btn-maroon w-100 py-3 fw-bold rounded-3 shadow-sm d-flex align-items-center justify-content-center gap-2"
                >
                  {bookingLoading ? (
                    <span>Issuing Royal Farman...</span>
                  ) : room.status !== 'Available' ? (
                    <span>Chamber Unavailable ({room.status})</span>
                  ) : (
                    <span>Proceed to Royal Payment</span>
                  )}
                </button>
              </form>

              <div className="text-center mt-3">
                <span className="small text-muted d-flex align-items-center justify-content-center gap-1">
                  <ShieldCheck size={14} className="text-success" />
                  Secure RuPay & UPI Demo Gateway
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;