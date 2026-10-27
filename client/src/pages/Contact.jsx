import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageSquare, Crown, Sparkles } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Royal Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const faqs = [
    {
      q: 'How do I reach the Palace from Udaipur Airport or Railway Station?',
      a: 'We arrange private transfers in our vintage automobile fleet (including a restored 1948 Rolls-Royce Silver Wraith) or luxury AC sedans directly from Maharana Pratap Airport (UDR). Upon arriving at the City Palace Badi Ghat jetty, a private royal solar boat whisks you across Lake Pichola to our water entrance.'
    },
    {
      q: 'What is the traditional royal welcome ceremony?',
      a: 'Every guest is greeted with the resounding beat of ceremonial nagadas (drums), an Aarti with fragrant marigold garlands, and the sacred kumkum tilak, followed by chilled saffron-infused thandai or fresh tender coconut water.'
    },
    {
      q: 'Can HotelPro host Royal Destination Weddings and Sangeet celebrations?',
      a: 'Yes, our lake-facing courtyards, Manak Chowk amphitheater, and Sheesh Mahal ballroom can accommodate regal wedding festivities for up to 500 guests with custom royal catering by our culinary masters.'
    },
    {
      q: 'What is the booking and cancellation policy for palace suites?',
      a: 'Reservations can be modified or cancelled free of charge up to 48 hours prior to 2:00 PM on your arrival date. Any eligible refund is instantaneously processed back to your original payment method.'
    }
  ];

  return (
    <div className="py-5" style={{ backgroundColor: '#fcfaf6' }}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <span className="badge-royal mb-2">
            <Crown size={12} className="me-1" /> शाही दरबान • 24/7 Royal Concierge
          </span>
          <h1 className="display-4 fw-bold font-regal text-dark mb-2">Connect with HotelPro Palace</h1>
          <p className="text-muted mx-auto" style={{ maxWidth: '640px' }}>
            Our Shahi Concierge (दरबान) team is at your humble service around the clock to organize private boat cruises, vintage car transfers, imperial dining feasts, and tailor-made desert safari excursions.
          </p>
        </div>

        <div className="row g-5 mb-5">
          {/* Contact Details & Cards */}
          <div className="col-12 col-lg-5">
            <h4 className="fw-bold font-regal text-dark mb-4">Shahi Concierge Desk</h4>

            <div className="d-flex flex-column gap-3 mb-4">
              <div className="card luxury-card p-4 border-0 shadow-sm" style={{ backgroundColor: '#ffffff' }}>
                <div className="d-flex align-items-center gap-3">
                  <div className="stat-icon" style={{ backgroundColor: '#fff9ed', color: '#c99a3e' }}>
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h6 className="fw-bold font-regal text-dark mb-1">Palace Estate Location</h6>
                    <p className="text-muted small mb-0">Lake Pichola, City Palace Complex, Udaipur, Rajasthan 313001, India</p>
                  </div>
                </div>
              </div>

              <div className="card luxury-card p-4 border-0 shadow-sm" style={{ backgroundColor: '#ffffff' }}>
                <div className="d-flex align-items-center gap-3">
                  <div className="stat-icon" style={{ backgroundColor: '#fff9ed', color: '#c99a3e' }}>
                    <Phone size={24} />
                  </div>
                  <div>
                    <h6 className="fw-bold font-regal text-dark mb-1">Direct Royal Telephony</h6>
                    <p className="text-muted small mb-0">+91 (294) 242-8800 / +91 98765 43210</p>
                  </div>
                </div>
              </div>

              <div className="card luxury-card p-4 border-0 shadow-sm" style={{ backgroundColor: '#ffffff' }}>
                <div className="d-flex align-items-center gap-3">
                  <div className="stat-icon" style={{ backgroundColor: '#fff9ed', color: '#c99a3e' }}>
                    <Mail size={24} />
                  </div>
                  <div>
                    <h6 className="fw-bold font-regal text-dark mb-1">Electronic Inquiries (शाही डाक)</h6>
                    <p className="text-muted small mb-0">darbar@hotelpro-palace.in / concierge@hotelpro-palace.in</p>
                  </div>
                </div>
              </div>

              <div className="card luxury-card p-4 border-0 shadow-sm" style={{ backgroundColor: '#ffffff' }}>
                <div className="d-flex align-items-center gap-3">
                  <div className="stat-icon" style={{ backgroundColor: '#fff9ed', color: '#c99a3e' }}>
                    <Clock size={24} />
                  </div>
                  <div>
                    <h6 className="fw-bold font-regal text-dark mb-1">Darbar Hours</h6>
                    <p className="text-muted small mb-0">Open 24 Hours / 7 Days a Week, 365 Days a Year</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-12 col-lg-7">
            <div className="card luxury-card p-4 p-md-5 border-0 shadow-sm" style={{ backgroundColor: '#ffffff' }}>
              <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom">
                <h4 className="fw-bold font-regal text-dark mb-0">Dispatch a Message to Darbar</h4>
                <span className="badge-royal">
                  <Sparkles size={12} className="me-1" /> Quick Reply
                </span>
              </div>
              <p className="text-muted small mb-4">
                Please submit your royal inquiry below. A senior concierge officer will attend to your request within two hours.
              </p>

              {submitted ? (
                <div className="alert alert-success p-4 rounded-4 text-center my-4">
                  <CheckCircle2 size={42} className="text-success mb-2" />
                  <h5 className="fw-bold text-dark font-regal">सन्देश प्राप्त हुआ • Message Received</h5>
                  <p className="text-secondary small mb-3">
                    Your request has been received by our senior palace concierge. We look forward to assisting your royal highness.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', subject: 'General Royal Inquiry', message: '' });
                    }}
                    className="btn btn-maroon btn-sm px-4"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="row g-3 mb-3">
                    <div className="col-12 col-sm-6">
                      <label className="form-label small fw-bold text-muted">Honored Guest Name</label>
                      <input
                        type="text"
                        className="form-control rounded-3 py-2"
                        placeholder="e.g. Maharajadhiraj Singh"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-12 col-sm-6">
                      <label className="form-label small fw-bold text-muted">Email Address</label>
                      <input
                        type="email"
                        className="form-control rounded-3 py-2"
                        placeholder="guest@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col-12 col-sm-6">
                      <label className="form-label small fw-bold text-muted">Contact Phone / WhatsApp</label>
                      <input
                        type="tel"
                        className="form-control rounded-3 py-2"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div className="col-12 col-sm-6">
                      <label className="form-label small fw-bold text-muted">Inquiry Subject</label>
                      <select
                        className="form-select rounded-3 py-2"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      >
                        <option value="General Royal Inquiry">General Royal Inquiry</option>
                        <option value="Royal Destination Wedding & Sangeet">Royal Destination Wedding & Sangeet</option>
                        <option value="Vintage Rolls-Royce Transfer">Vintage Rolls-Royce Transfer</option>
                        <option value="Shahi Dawat Private Dining Table">Shahi Dawat Private Dining Table</option>
                        <option value="Ayurvedic Wellness & Spa Retreat">Ayurvedic Wellness & Spa Retreat</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label small fw-bold text-muted">Your Inquiry / Royal Request</label>
                    <textarea
                      rows="4"
                      className="form-control rounded-3 py-2"
                      placeholder="How may our royal concierge team assist you with your upcoming visit?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-maroon w-100 py-3 fw-bold rounded-3 d-flex align-items-center justify-content-center gap-2"
                  >
                    <Send size={18} /> Submit Concierge Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-5 pt-4">
          <div className="text-center mb-5">
            <span className="badge-royal mb-2">
              <Crown size={12} className="me-1" /> जिज्ञासा और समाधान
            </span>
            <h2 className="display-6 fw-bold font-regal text-dark">Royal Guest Inquiries & Protocol</h2>
          </div>

          <div className="row justify-content-center">
            <div className="col-12 col-lg-10">
              <div className="accordion accordion-flush" id="faqAccordion">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="accordion-item mb-3 border rounded-3 overflow-hidden shadow-sm" style={{ borderColor: '#e8dec8' }}>
                    <h2 className="accordion-header" id={`flush-heading${idx}`}>
                      <button
                        className="accordion-button collapsed fw-bold text-dark font-regal"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#flush-collapse${idx}`}
                        aria-expanded="false"
                        aria-controls={`flush-collapse${idx}`}
                      >
                        {faq.q}
                      </button>
                    </h2>
                    <div
                      id={`flush-collapse${idx}`}
                      className="accordion-collapse collapse"
                      aria-labelledby={`flush-heading${idx}`}
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body text-secondary small leading-relaxed">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;