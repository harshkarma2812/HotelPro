import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import api from '../services/api';
import {
  BedDouble,
  PlusCircle,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Crown,
  Sparkles
} from 'lucide-react';

const AddRoom = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    roomNumber: '',
    roomType: 'Maharani Royal Suite',
    description: '',
    price: 28000,
    capacity: 2,
    bedType: 'Royal Four-Poster King',
    amenities: ['Jharokha Balcony View', 'Khidmatgar Butler Service', 'WiFi', 'AC', 'Breakfast', 'Swimming Pool (Baoli)'],
    images: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
    status: 'Available',
    size: 550,
    floor: 2
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const availableAmenities = [
    'Jharokha Balcony View',
    'Royal Lake Pichola View',
    'Khidmatgar Butler Service',
    'Ayurvedic Bath Menu',
    'WiFi',
    'AC',
    'TV',
    'Room Service',
    'Breakfast',
    'Swimming Pool (Baoli)',
    'Safe',
    'Mini Bar'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAmenityToggle = (amenity) => {
    setFormData((prev) => {
      const exists = prev.amenities.includes(amenity);
      return {
        ...prev,
        amenities: exists
          ? prev.amenities.filter((a) => a !== amenity)
          : [...prev.amenities, amenity]
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const imagesArray = formData.images
        .split('\n')
        .map((url) => url.trim())
        .filter((url) => url.length > 0);

      const res = await api.post('/rooms', {
        ...formData,
        price: Number(formData.price),
        capacity: Number(formData.capacity),
        size: Number(formData.size),
        floor: Number(formData.floor),
        images: imagesArray.length > 0 ? imagesArray : [
          'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80'
        ]
      });

      if (res.data?.success) {
        navigate('/admin/rooms');
      }
    } catch (err) {
      setError(err.message || 'Failed to create suite');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex min-vh-100 bg-light">
      <AdminSidebar />

      <div className="flex-grow-1 p-4 p-md-5 overflow-auto" style={{ maxHeight: '100vh' }}>
        {/* Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 pb-3 border-bottom">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <span className="badge-royal">
                <Crown size={12} className="me-1" /> नया कक्ष निर्माण
              </span>
              <span className="text-muted small">Suite Inventory Expansion</span>
            </div>
            <h1 className="display-6 fw-bold font-regal text-dark mb-1">Add New Palace Suite</h1>
            <p className="text-muted mb-0">Publish a new royal suite to the HotelPro live reservation inventory</p>
          </div>
          <Link to="/admin/rooms" className="btn btn-outline-secondary rounded-3 d-flex align-items-center gap-1 mt-3 mt-md-0">
            <ArrowLeft size={16} /> Cancel & Back
          </Link>
        </div>

        {error && (
          <div className="alert alert-danger py-2 px-3 small d-flex align-items-center gap-2 mb-4">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <div className="row g-4">
          <div className="col-12 col-lg-8">
            <div className="card luxury-card p-4 p-md-5 border-0 shadow-sm" style={{ backgroundColor: '#ffffff' }}>
              <form onSubmit={handleSubmit}>
                {/* Basic Info */}
                <h5 className="fw-bold font-regal text-dark mb-3">General Suite Specifications</h5>

                <div className="row g-3 mb-3">
                  <div className="col-12 col-sm-6">
                    <label className="form-label small fw-bold text-muted">Chamber / Suite Number *</label>
                    <input
                      type="text"
                      name="roomNumber"
                      className="form-control rounded-3 py-2"
                      placeholder="e.g. 501"
                      value={formData.roomNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-12 col-sm-6">
                    <label className="form-label small fw-bold text-muted">Royal Category *</label>
                    <select
                      name="roomType"
                      className="form-select rounded-3 py-2"
                      value={formData.roomType}
                      onChange={handleChange}
                      required
                    >
                      <option value="Maharaja Presidential Suite">Maharaja Presidential Suite</option>
                      <option value="Maharani Royal Suite">Maharani Royal Suite</option>
                      <option value="Yuvraj Heritage Suite">Yuvraj Heritage Suite</option>
                      <option value="Rajputana Deluxe Room">Rajputana Deluxe Room</option>
                      <option value="Haveli Courtyard Room">Haveli Courtyard Room</option>
                    </select>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold text-muted">Description & Architecture *</label>
                  <textarea
                    name="description"
                    rows="3"
                    className="form-control rounded-3 py-2"
                    placeholder="Describe suite features, jharokha lake views, teakwood furnishings, and royal heritage ambiance..."
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="row g-3 mb-4">
                  <div className="col-6 col-sm-3">
                    <label className="form-label small fw-bold text-muted">Tariff / Night (₹ INR) *</label>
                    <input
                      type="number"
                      name="price"
                      min="1000"
                      step="500"
                      className="form-control rounded-3 py-2"
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-6 col-sm-3">
                    <label className="form-label small fw-bold text-muted">Max Guests *</label>
                    <input
                      type="number"
                      name="capacity"
                      min="1"
                      max="10"
                      className="form-control rounded-3 py-2"
                      value={formData.capacity}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-6 col-sm-3">
                    <label className="form-label small fw-bold text-muted">Bed Type *</label>
                    <select
                      name="bedType"
                      className="form-select rounded-3 py-2"
                      value={formData.bedType}
                      onChange={handleChange}
                    >
                      <option value="Royal Four-Poster King">Royal Four-Poster King</option>
                      <option value="King">King Bed</option>
                      <option value="Queen">Queen Bed</option>
                      <option value="Twin">Twin Beds</option>
                    </select>
                  </div>

                  <div className="col-6 col-sm-3">
                    <label className="form-label small fw-bold text-muted">Initial Status</label>
                    <select
                      name="status"
                      className="form-select rounded-3 py-2"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="Available">Available</option>
                      <option value="Maintenance">Maintenance</option>
                      <option value="Occupied">Occupied</option>
                    </select>
                  </div>
                </div>

                <div className="row g-3 mb-4">
                  <div className="col-6">
                    <label className="form-label small fw-bold text-muted">Floor Level</label>
                    <input
                      type="number"
                      name="floor"
                      min="1"
                      max="10"
                      className="form-control rounded-3 py-2"
                      value={formData.floor}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label small fw-bold text-muted">Palace Area (sq ft)</label>
                    <input
                      type="number"
                      name="size"
                      min="200"
                      className="form-control rounded-3 py-2"
                      value={formData.size}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-4">
                  <label className="form-label small fw-bold text-muted d-block mb-2">
                    Heritage Amenities & Khidmatgar Services
                  </label>
                  <div className="row g-2">
                    {availableAmenities.map((amenity) => (
                      <div key={amenity} className="col-6 col-sm-4">
                        <div
                          onClick={() => handleAmenityToggle(amenity)}
                          className={`p-2 rounded-3 border small cursor-pointer d-flex align-items-center gap-2 ${
                            formData.amenities.includes(amenity)
                              ? 'bg-warning bg-opacity-10 border-warning fw-bold text-dark'
                              : 'bg-light text-muted'
                          }`}
                          style={{ cursor: 'pointer' }}
                        >
                          <input
                            type="checkbox"
                            checked={formData.amenities.includes(amenity)}
                            readOnly
                            className="form-check-input mt-0"
                          />
                          <span>{amenity}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Images */}
                <div className="mb-4">
                  <label className="form-label small fw-bold text-muted">
                    Photo URLs (One per line)
                  </label>
                  <textarea
                    name="images"
                    rows="3"
                    className="form-control rounded-3 py-2 font-monospace small"
                    value={formData.images}
                    onChange={handleChange}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-maroon px-5 py-3 fw-bold rounded-3 shadow-sm d-flex align-items-center gap-2"
                >
                  <PlusCircle size={18} />
                  {loading ? 'Publishing Suite...' : 'Publish Palace Suite to Inventory'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRoom;