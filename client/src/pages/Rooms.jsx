import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import RoomCard from '../components/RoomCard';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import api from '../services/api';
import { useBooking } from '../context/BookingContext';
import { Filter, SlidersHorizontal, Calendar, Users, RotateCcw, BedDouble, Crown, Sparkles } from 'lucide-react';

const Rooms = () => {
  const [searchParamsUrl, setSearchParamsUrl] = useSearchParams();
  const { searchParams, updateSearch, formatDate, calculateNights } = useBooking();

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters state with INR price range (₹5,000 to ₹60,000)
  const [filters, setFilters] = useState({
    checkIn: searchParamsUrl.get('checkIn') || searchParams.checkIn,
    checkOut: searchParamsUrl.get('checkOut') || searchParams.checkOut,
    guests: searchParamsUrl.get('guests') || searchParams.guests || 2,
    roomType: searchParamsUrl.get('roomType') || searchParams.roomType || 'All',
    bedType: 'All',
    maxPrice: 60000,
    sort: 'price_asc'
  });

  const nights = calculateNights(filters.checkIn, filters.checkOut);

  // Fetch rooms whenever filters change
  const fetchRooms = async () => {
    setLoading(true);
    setError(null);
    try {
      let endpoint = '';
      const params = new URLSearchParams();

      if (filters.checkIn && filters.checkOut) {
        endpoint = '/rooms/available';
        params.append('checkIn', filters.checkIn);
        params.append('checkOut', filters.checkOut);
        if (filters.guests) params.append('guests', filters.guests);
        if (filters.roomType && filters.roomType !== 'All') params.append('roomType', filters.roomType);
      } else {
        endpoint = '/rooms';
        if (filters.roomType && filters.roomType !== 'All') params.append('roomType', filters.roomType);
        if (filters.guests) params.append('capacity', filters.guests);
        if (filters.sort) params.append('sort', filters.sort);
      }

      const res = await api.get(`${endpoint}?${params.toString()}`);
      if (res.data?.success) {
        let fetchedRooms = res.data.rooms || [];

        // Apply client-side bedType & maxPrice filter if necessary
        if (filters.bedType && filters.bedType !== 'All') {
          fetchedRooms = fetchedRooms.filter((r) => r.bedType === filters.bedType);
        }
        if (filters.maxPrice) {
          fetchedRooms = fetchedRooms.filter((r) => r.price <= Number(filters.maxPrice));
        }

        // Apply sorting
        if (filters.sort === 'price_asc') {
          fetchedRooms.sort((a, b) => a.price - b.price);
        } else if (filters.sort === 'price_desc') {
          fetchedRooms.sort((a, b) => b.price - a.price);
        } else if (filters.sort === 'rating_desc') {
          fetchedRooms.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        }

        setRooms(fetchedRooms);
      }
    } catch (err) {
      setError(err.message || 'Failed to load available palace suites');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [filters.checkIn, filters.checkOut, filters.guests, filters.roomType, filters.bedType, filters.maxPrice, filters.sort]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleResetFilters = () => {
    const today = new Date();
    const dIn = new Date(today);
    dIn.setDate(today.getDate() + 1);
    const dOut = new Date(dIn);
    dOut.setDate(dIn.getDate() + 3);

    const reset = {
      checkIn: formatDate(dIn),
      checkOut: formatDate(dOut),
      guests: 2,
      roomType: 'All',
      bedType: 'All',
      maxPrice: 60000,
      sort: 'price_asc'
    };
    setFilters(reset);
    updateSearch(reset);
  };

  return (
    <div className="py-5" style={{ backgroundColor: '#fcfaf6' }}>
      <div className="container">
        {/* Header */}
        <div className="mb-4 text-center text-md-start">
          <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-2 mb-2">
            <span className="badge-royal">
              <Crown size={12} className="me-1" /> शाही महल आवास
            </span>
            <span className="text-muted small fst-italic">Royal Palace Quarters</span>
          </div>
          <h1 className="display-5 fw-bold text-dark font-regal mb-2">
            Suites & Heritage Chambers
          </h1>
          <p className="text-muted mx-auto mx-md-0" style={{ maxWidth: '780px' }}>
            Experience the royal grandeur of Udaipur & Rajputana. Every suite features verified live date-overlap availability, ornate hand-carved jharokhas, 24/7 royal butler (khidmatgar) service, and breathtaking lake vistas.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="card luxury-card p-4 mb-4 border-0 shadow-sm" style={{ backgroundColor: '#ffffff' }}>
          <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom">
            <div className="d-flex align-items-center gap-2 fw-bold text-dark font-regal">
              <SlidersHorizontal size={18} style={{ color: '#c99a3e' }} />
              <span>Palace Availability & Filters</span>
            </div>
            <button
              onClick={handleResetFilters}
              className="btn btn-sm btn-link text-muted text-decoration-none d-flex align-items-center gap-1"
            >
              <RotateCcw size={14} /> Reset Filters
            </button>
          </div>

          <div className="row g-3 align-items-end">
            {/* Check-In */}
            <div className="col-12 col-sm-6 col-lg-2">
              <label className="form-label small fw-bold text-muted mb-1">Check-in Date</label>
              <input
                type="date"
                name="checkIn"
                className="form-control rounded-3"
                value={filters.checkIn}
                onChange={handleFilterChange}
              />
            </div>

            {/* Check-Out */}
            <div className="col-12 col-sm-6 col-lg-2">
              <label className="form-label small fw-bold text-muted mb-1">Check-out Date</label>
              <input
                type="date"
                name="checkOut"
                className="form-control rounded-3"
                value={filters.checkOut}
                min={filters.checkIn}
                onChange={handleFilterChange}
              />
            </div>

            {/* Guests */}
            <div className="col-6 col-sm-4 col-lg-2">
              <label className="form-label small fw-bold text-muted mb-1">Guests</label>
              <select
                name="guests"
                className="form-select rounded-3"
                value={filters.guests}
                onChange={handleFilterChange}
              >
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
                <option value="5">5+ Guests</option>
              </select>
            </div>

            {/* Category */}
            <div className="col-6 col-sm-4 col-lg-2">
              <label className="form-label small fw-bold text-muted mb-1">Palace Suite Category</label>
              <select
                name="roomType"
                className="form-select rounded-3"
                value={filters.roomType}
                onChange={handleFilterChange}
              >
                <option value="All">All Royal Quarters</option>
                <option value="Maharaja Presidential Suite">Maharaja Presidential Suite</option>
                <option value="Maharani Royal Suite">Maharani Royal Suite</option>
                <option value="Yuvraj Heritage Suite">Yuvraj Heritage Suite</option>
                <option value="Rajputana Deluxe Room">Rajputana Deluxe Room</option>
                <option value="Haveli Courtyard Room">Haveli Courtyard Room</option>
              </select>
            </div>

            {/* Bed Type */}
            <div className="col-6 col-sm-4 col-lg-2">
              <label className="form-label small fw-bold text-muted mb-1">Bed Configuration</label>
              <select
                name="bedType"
                className="form-select rounded-3"
                value={filters.bedType}
                onChange={handleFilterChange}
              >
                <option value="All">All Bed Types</option>
                <option value="Royal Four-Poster King">Royal Four-Poster King</option>
                <option value="King">King Bed</option>
                <option value="Queen">Queen Bed</option>
                <option value="Twin">Twin Beds</option>
              </select>
            </div>

            {/* Sort */}
            <div className="col-6 col-sm-6 col-lg-2">
              <label className="form-label small fw-bold text-muted mb-1">Sort Tariff By</label>
              <select
                name="sort"
                className="form-select rounded-3"
                value={filters.sort}
                onChange={handleFilterChange}
              >
                <option value="price_asc">Tariff: Low to High</option>
                <option value="price_desc">Tariff: High to Low</option>
                <option value="rating_desc">Highest Royal Rating</option>
              </select>
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="mt-3 pt-3 border-top d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3">
            <div className="d-flex align-items-center gap-3 w-100" style={{ maxWidth: '480px' }}>
              <span className="small text-muted fw-bold text-nowrap">
                Max Tariff: <span className="text-dark fw-bold">₹{Number(filters.maxPrice).toLocaleString('en-IN')}</span> / night
              </span>
              <input
                type="range"
                className="form-range"
                min="5000"
                max="60000"
                step="2500"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
              />
            </div>
            <div className="small text-muted">
              Dates: <strong className="text-dark">{filters.checkIn}</strong> to <strong className="text-dark">{filters.checkOut}</strong> ({nights} {nights === 1 ? 'night' : 'nights'})
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div className="fw-semibold text-secondary">
            Showing <span className="text-dark fw-bold font-regal">{rooms.length}</span> royal chambers available for your chosen dates
          </div>
        </div>

        {/* Room Grid */}
        {loading ? (
          <LoadingSpinner text="Searching palace chambers with date-overlap availability engine..." />
        ) : error ? (
          <div className="alert alert-danger rounded-3 p-4 text-center">
            <h5>Unable to Load Suites</h5>
            <p className="mb-3">{error}</p>
            <button onClick={fetchRooms} className="btn btn-maroon btn-sm">
              Try Again
            </button>
          </div>
        ) : rooms.length === 0 ? (
          <EmptyState
            title="No Royal Chambers Available"
            description="All suites matching your selected dates, guest count, or category are currently reserved by patrons. Please adjust your travel dates or category."
            actionText="Reset All Filters"
            onAction={handleResetFilters}
          />
        ) : (
          <div className="row g-4">
            {rooms.map((room) => (
              <div key={room._id} className="col-12 col-md-6 col-lg-4">
                <RoomCard room={room} nights={nights} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Rooms;