import React from 'react';
import { Link } from 'react-router-dom';
import { Crown, Mail, Phone, MapPin, Award, ShieldCheck, Heart, Sparkles } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="text-white pt-5 pb-4 mt-5 border-top" style={{ background: 'linear-gradient(180deg, #0a1128 0%, #060a17 100%)', borderTop: '2px solid #c99a3e' }}>
      <div className="container">
        <div className="row g-4 mb-5">
          {/* Brand & Overview */}
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center gap-2 mb-3">
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
                <span className="fs-3 fw-bold font-regal text-white tracking-tight">Hotel<span style={{ color: '#c99a3e' }}>Pro</span></span>
              </div>
            </div>
            <p className="text-secondary mb-3 pe-lg-4 small leading-relaxed">
              <strong>अतिथि देवो भव (Atithi Devo Bhava)</strong> — Experience the timeless grandeur of India’s royal dynasties. From the shimmering waters of Lake Pichola to the Pink City sandstone courtyards, our restored heritage havelis offer an unparalleled royal sanctuary.
            </p>
            <div className="d-flex align-items-center gap-2 text-warning small">
              <Award size={18} />
              <span className="text-light">National Heritage & Palace Excellence Award 2026</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="text-uppercase tracking-wider fw-bold text-warning mb-3 small font-regal">Darbar Links</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 text-secondary small">
              <li><Link to="/" className="text-secondary text-decoration-none hover-light">The Grand Palace</Link></li>
              <li><Link to="/rooms" className="text-secondary text-decoration-none hover-light">Royal Suites</Link></li>
              <li><Link to="/about" className="text-secondary text-decoration-none hover-light">Dynasty History</Link></li>
              <li><Link to="/contact" className="text-secondary text-decoration-none hover-light">Royal Concierge</Link></li>
              <li><Link to="/login" className="text-secondary text-decoration-none hover-light">Patron Sign In</Link></li>
            </ul>
          </div>

          {/* Room Categories */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="text-uppercase tracking-wider fw-bold text-warning mb-3 small font-regal">Palace Quarters</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 text-secondary small">
              <li><Link to="/rooms?type=Maharaja+Presidential+Suite" className="text-secondary text-decoration-none hover-light">Maharaja Suite</Link></li>
              <li><Link to="/rooms?type=Maharani+Royal+Suite" className="text-secondary text-decoration-none hover-light">Maharani Suite</Link></li>
              <li><Link to="/rooms?type=Yuvraj+Heritage+Suite" className="text-secondary text-decoration-none hover-light">Yuvraj Suite</Link></li>
              <li><Link to="/rooms?type=Rajputana+Deluxe+Room" className="text-secondary text-decoration-none hover-light">Rajputana Deluxe</Link></li>
              <li><Link to="/rooms?type=Haveli+Courtyard+Room" className="text-secondary text-decoration-none hover-light">Haveli Courtyard</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="col-lg-4 col-md-6">
            <h6 className="text-uppercase tracking-wider fw-bold text-warning mb-3 small font-regal">Royal Concierge</h6>
            <ul className="list-unstyled d-flex flex-column gap-3 text-secondary small">
              <li className="d-flex align-items-start gap-3">
                <MapPin size={20} className="text-warning flex-shrink-0 mt-1" />
                <span>Palace Road, Near Lake Pichola, Udaipur, Rajasthan 313001, India</span>
              </li>
              <li className="d-flex align-items-center gap-3">
                <Phone size={20} className="text-warning flex-shrink-0" />
                <span>+91 (294) 555-ROYAL (7692) / 1800 111 2026</span>
              </li>
              <li className="d-flex align-items-center gap-3">
                <Mail size={20} className="text-warning flex-shrink-0" />
                <span>shahi-concierge@hotelpro-heritage.in</span>
              </li>
              <li className="d-flex align-items-center gap-3">
                <ShieldCheck size={20} className="text-success flex-shrink-0" />
                <span>Guaranteed Direct Royal Palace Reservations</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-secondary opacity-25 my-4" />

        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 text-secondary small">
          <div>
            &copy; {new Date().getFullYear()} HotelPro Royal Heritage Palaces & Resorts Ltd. All rights reserved.
          </div>
          <div className="d-flex gap-4">
            <Link to="/about" className="text-secondary text-decoration-none">Privacy & Royal Discretion</Link>
            <Link to="/about" className="text-secondary text-decoration-none">Heritage Terms</Link>
            <Link to="/admin/login" className="text-warning text-decoration-none">Staff / Diwan Access</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
