import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBox from '../components/SearchBox';
import RoomCard from '../components/RoomCard';
import LoadingSpinner from '../components/LoadingSpinner';
import api from '../services/api';
import {
  Crown,
  Sparkles,
  Waves,
  Utensils,
  Flower2,
  Car,
  Wine,
  ShieldCheck,
  Clock,
  Award,
  CheckCircle2,
  Star,
  ArrowRight,
  Music
} from 'lucide-react';

const Home = () => {
  const [featuredRooms, setFeaturedRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await api.get('/rooms?sort=rating_desc');
        if (res.data?.success) {
          // Take top 3 palace suites
          setFeaturedRooms(res.data.rooms.slice(0, 3));
        }
      } catch (err) {
        console.error('Failed to load featured rooms:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  const royalFacilities = [
    {
      icon: Waves,
      title: 'Baoli Stepwell & Marble Pool',
      desc: 'Architectural royal stepwell pool overlooking Lake Pichola with evening marigold floating ceremonies.'
    },
    {
      icon: Utensils,
      title: 'Shahi Dawat & Royal Thali',
      desc: 'Centuries-old secret Mewari, Rajput, and Awadhi recipes prepared by royal khansamas in silver thalis.'
    },
    {
      icon: Flower2,
      title: 'Ayurvedic Panchakarma Spa',
      desc: 'Restorative Vedic massages using cold-pressed saffron oils, sandalwood pastes, and Himalayan herbs.'
    },
    {
      icon: Car,
      title: 'Royal Vintage Car Fleet',
      desc: 'Chauffeured arrival in heritage 1934 Rolls-Royce and vintage Buicks with ceremonial trumpets.'
    },
    {
      icon: Music,
      title: 'Jharokha Sitar & Sunset Tea',
      desc: 'Evening sitar and sarangi recitals on palace jharokha balconies as dusk settles over the Aravallis.'
    },
    {
      icon: Clock,
      title: '24/7 Shahi Khidmatgar Butler',
      desc: 'A dedicated personal royal attendant trained in traditional Rajputana courtly hospitality.'
    }
  ];

  const categories = [
    {
      name: 'Maharaja Presidential Suite',
      desc: 'The former royal chambers with gold ceiling leafing, private plunge pool, and silver swing.',
      price: 'From ₹48,000/night',
      img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=600&q=80',
      type: 'Maharaja Presidential Suite'
    },
    {
      name: 'Maharani Royal Suite',
      desc: 'Adorned in pink Udaipur marble, peacock mosaic inlays, and private fragrant jasmine balcony.',
      price: 'From ₹32,000/night',
      img: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=600&q=80',
      type: 'Maharani Royal Suite'
    },
    {
      name: 'Yuvraj Heritage Suite',
      desc: 'Opulent archways, hand-painted frescoes, Burma teak furniture, and drawing room.',
      price: 'From ₹24,000/night',
      img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
      type: 'Yuvraj Heritage Suite'
    },
    {
      name: 'Rajputana Deluxe Room',
      desc: 'Private carved stone jali jharokha balcony overlooking the lake waters and courtyard.',
      price: 'From ₹14,500/night',
      img: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=600&q=80',
      type: 'Rajputana Deluxe Room'
    }
  ];

  const testimonials = [
    {
      name: 'Maharani Radhika Raje',
      role: 'Heritage Connoisseur & Royal Patron',
      quote: 'The traditional Aarti and Tika welcome with rose petals, the scent of midnight jasmine, and the serene beauty of the Sheesh Mahal suites make HotelPro a living tribute to Indian regal splendour.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'Lord Alistair Sterling',
      role: 'Diplomat & Art Historian, London',
      quote: 'Staying at the Maharaja Suite on the shores of Lake Pichola was like stepping directly into an 18th-century miniature painting. The Shahi Khansama dining and vintage car transfer were utterly unmatched.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'Ananya Birla-Singhania',
      role: 'Cultural Entrepreneur, Mumbai',
      quote: 'The Ayurvedic rejuvenation rituals followed by evening sitar recitals in the marble courtyard created a state of pure tranquility. True Indian hospitality at its greatest height.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'
    }
  ];

  return (
    <div>
      {/* 1. HERO SECTION WITH ROYAL PALACE THEME */}
      <section
        className="hero-wrapper position-relative text-white py-5"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=2000&q=85")'
        }}
      >
        <div className="hero-overlay" />
        <div className="container position-relative z-1 py-5">
          <div className="row justify-content-center text-center">
            <div className="col-lg-10 col-xl-9">
              <span className="badge badge-royal mb-3 text-uppercase px-4 py-2 shadow">
                <Crown size={15} className="me-1 text-warning" /> पधारो म्हारे देश ✦ The Royal Heritage Experience
              </span>
              <h1 className="display-3 fw-bold mb-3 font-regal text-white text-shadow">
                Live Like a Maharaja
              </h1>
              <p className="lead mb-4 text-light opacity-95 mx-auto" style={{ maxWidth: '740px', fontWeight: '400' }}>
                Immerse yourself in centuries of Rajputana grandeur and timeless royal Indian hospitality. Handcrafted marble pavilions, Shahi Dawat dining, and serene lakeside retreats await your arrival.
              </p>
            </div>
          </div>

          {/* Floating Search Form */}
          <div className="row justify-content-center">
            <div className="col-12 col-xl-11">
              <div className="hero-search-card shadow-lg">
                <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom">
                  <div className="d-flex align-items-center gap-2">
                    <Crown size={20} className="text-warning" />
                    <span className="fw-bold text-dark fs-5 font-serif">Reserve Your Royal Quarters</span>
                  </div>
                  <span className="badge bg-warning text-dark small fw-bold">
                    Real-Time Guaranteed Availability
                  </span>
                </div>
                <SearchBox />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ATITHI DEVO BHAVA - ROYAL HIGHLIGHTS */}
      <section className="py-5 bg-white border-bottom position-relative">
        <div className="container">
          <div className="row g-4 text-center">
            <div className="col-6 col-md-3">
              <div className="p-3">
                <Crown size={38} className="text-warning mb-2" />
                <h4 className="fw-bold text-dark font-serif mb-1">अतिथि देवो भव</h4>
                <p className="text-muted small mb-0">Guest is Revered as God in Royal Tradition</p>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="p-3">
                <Flower2 size={38} className="text-warning mb-2" />
                <h4 className="fw-bold text-dark font-serif mb-1">Shahi Welcome</h4>
                <p className="text-muted small mb-0">Garland, Tika, Aarti & Rose Petal Shower</p>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="p-3">
                <Award size={38} className="text-warning mb-2" />
                <h4 className="fw-bold text-dark font-serif mb-1">Heritage Grandeur</h4>
                <p className="text-muted small mb-0">Restored 18th Century Palace Haveli</p>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="p-3">
                <ShieldCheck size={38} className="text-warning mb-2" />
                <h4 className="fw-bold text-dark font-serif mb-1">Instant Farman</h4>
                <p className="text-muted small mb-0">Instant Royal Stay Voucher & Ref ID</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED ROYAL SUITES */}
      <section className="py-5">
        <div className="container">
          <div className="d-flex flex-column flex-md-row align-items-md-end justify-content-between mb-4">
            <div>
              <span className="section-tag">Imperial Quarters</span>
              <h2 className="display-6 fw-bold text-dark font-serif mb-0">Featured Palace Suites</h2>
            </div>
            <Link to="/rooms" className="btn btn-outline-gold mt-3 mt-md-0 d-inline-flex align-items-center gap-2">
              Explore All Royal Suites <ArrowRight size={16} />
            </Link>
          </div>

          {loading ? (
            <LoadingSpinner text="Summoning royal suite inventory..." />
          ) : (
            <div className="row g-4">
              {featuredRooms.map((room) => (
                <div key={room._id} className="col-12 col-md-6 col-lg-4">
                  <RoomCard room={room} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. POPULAR PALACE CATEGORIES */}
      <section className="py-5" style={{ backgroundColor: '#f9f5ed' }}>
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-tag">Royal Residences</span>
            <h2 className="display-6 fw-bold text-dark font-serif mb-2">Palace Suite Collections</h2>
            <p className="text-muted mx-auto" style={{ maxWidth: '640px' }}>
              From the majestic heights of the Maharaja Presidential Suite to peaceful garden haveli courtyards, each chamber is steeped in Rajputana royalty.
            </p>
          </div>

          <div className="row g-4">
            {categories.map((cat, idx) => (
              <div key={idx} className="col-12 col-sm-6 col-lg-3">
                <div className="card luxury-card h-100 overflow-hidden border-0 shadow-sm">
                  <div className="position-relative" style={{ height: '240px' }}>
                    <img src={cat.img} alt={cat.name} className="room-gallery-img" />
                    <div className="position-absolute bottom-0 start-0 p-3 text-white" style={{ background: 'linear-gradient(transparent, rgba(10,17,40,0.92))', width: '100%' }}>
                      <span className="badge badge-gold small mb-1">{cat.price}</span>
                      <h5 className="fw-bold font-serif mb-0 text-white">{cat.name}</h5>
                    </div>
                  </div>
                  <div className="card-body p-3 d-flex flex-column justify-content-between">
                    <p className="text-muted small mb-3">{cat.desc}</p>
                    <Link to={`/rooms?roomType=${encodeURIComponent(cat.type)}`} className="btn btn-sm btn-outline-dark w-100 rounded-3">
                      View Palace Chambers
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ROYAL EXPERIENCES & FACILITIES */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-tag">Bespoke Shahi Experiences</span>
            <h2 className="display-6 fw-bold text-dark font-serif mb-2">Royal Indian Hospitality</h2>
            <p className="text-muted mx-auto" style={{ maxWidth: '640px' }}>
              Every stay is an authentic royal celebration. Delight in traditional folk dances, classical sitar soirées, and ancient Ayurvedic wellness therapies.
            </p>
          </div>

          <div className="row g-4">
            {royalFacilities.map((fac, idx) => {
              const IconComponent = fac.icon;
              return (
                <div key={idx} className="col-12 col-md-6 col-lg-4">
                  <div className="p-4 rounded-4 border h-100 transition-all hover-shadow" style={{ backgroundColor: '#fcfbfa' }}>
                    <div className="stat-icon mb-3" style={{ backgroundColor: '#fbf7f2', color: '#c99a3e', border: '1px solid #ebdcc4' }}>
                      <IconComponent size={28} />
                    </div>
                    <h5 className="fw-bold font-serif text-dark mb-2">{fac.title}</h5>
                    <p className="text-muted small mb-0">{fac.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. ROYAL TESTIMONIALS */}
      <section className="py-5" style={{ backgroundColor: '#f9f5ed' }}>
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-tag">Diwan Testimonials</span>
            <h2 className="display-6 fw-bold text-dark font-serif mb-2">Honoured by Royal Patrons</h2>
            <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>
              Read the memoirs of distinguished royalty, nobility, and cultural travelers who have graced the halls of HotelPro.
            </p>
          </div>

          <div className="row g-4">
            {testimonials.map((t, idx) => (
              <div key={idx} className="col-12 col-lg-4">
                <div className="card luxury-card h-100 p-4 border-0 shadow-sm">
                  <div className="d-flex align-items-center gap-1 text-warning mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-warning text-warning" />
                    ))}
                  </div>
                  <p className="fst-italic text-secondary mb-4 flex-grow-1 small leading-relaxed">
                    "{t.quote}"
                  </p>
                  <div className="d-flex align-items-center gap-3 pt-3 border-top">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="rounded-circle shadow-sm"
                      style={{ width: '48px', height: '48px', objectFit: 'cover', border: '1.5px solid #c99a3e' }}
                    />
                    <div>
                      <div className="fw-bold text-dark font-serif">{t.name}</div>
                      <div className="text-muted small">{t.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. ROYAL CALL TO ACTION */}
      <section
        className="py-5 text-white text-center position-relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #4a0818 0%, #6e0d25 50%, #0a1128 100%)' }}
      >
        <div className="container py-5 position-relative z-1">
          <span className="badge badge-gold mb-3 text-uppercase px-4 py-2">
            ✦ Shahi Darbar Invitation ✦
          </span>
          <h2 className="display-4 fw-bold font-regal mb-3 text-white">
            Experience the Regal Hospitality of India
          </h2>
          <p className="lead text-light opacity-90 mx-auto mb-4" style={{ maxWidth: '680px' }}>
            Direct palace reservations receive complimentary Shahi Aarti welcome, Marwar saffron tea service, and personalized vintage car escort from the airport.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link to="/rooms" className="btn btn-gold px-5 py-3 fs-6 d-flex align-items-center gap-2 shadow-lg">
              Reserve Your Royal Suite <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="btn btn-outline-light px-4 py-3 fs-6">
              Connect with Royal Concierge
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
