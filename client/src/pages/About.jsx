import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Compass, HeartHandshake, Leaf, ShieldCheck, Sparkles, ArrowRight, Crown } from 'lucide-react';

const About = () => {
  const leaders = [
    {
      name: 'Maharajadhiraj Alexander Singh',
      role: 'Custodian & Managing Trustee',
      bio: 'Direct descendant of the Mewar noble line with over 28 years dedicated to preserving historical Rajputana architecture and royal hospitality.',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Princess Gayatri Devi',
      role: 'Chief Palace Architect & Conservator',
      bio: 'Award-winning heritage conservationist renowned for meticulously restoring 19th-century Jharokhas, fresco paintings, and Tikri mirror craftsmanship.',
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Ustad Imtiaz Khan',
      role: 'Grand Master of Shahi Dawat',
      bio: 'Master chef with ancestral lineage in royal Mewari and Awadhi kitchens, curating 32-spice heirloom recipes passed down through generations.',
      img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
    }
  ];

  const milestones = [
    { year: '1888', title: 'Foundation of Pichola Haveli', desc: 'Commissioned as a regal summer sanctuary on the tranquil waters of Lake Pichola by the Mewar nobility.' },
    { year: '1952', title: 'Heritage Sanctuary Transition', desc: 'Opened its royal gates to discerning world travelers seeking authentic Indian palace living.' },
    { year: '2021', title: 'UNESCO Heritage Citation', desc: 'Recognized for pioneering structural restoration of stone jharokhas and ancient Baoli stepwell pools.' },
    { year: '2026', title: 'HotelPro Digital Farman Era', desc: 'Pioneered real-time algorithmic room overlap availability and digital Shahi Farman reservation systems.' }
  ];

  return (
    <div className="py-5" style={{ backgroundColor: '#fcfaf6' }}>
      <div className="container">
        {/* Hero Section */}
        <div className="row align-items-center g-5 mb-5 pb-4">
          <div className="col-12 col-lg-6">
            <span className="badge-royal mb-2">
              <Crown size={12} className="me-1" /> हमारी धरोहर • Our Royal Heritage
            </span>
            <h1 className="display-4 fw-bold font-regal text-dark mb-4">
              Where Rajputana Royalty Meets Timeless Indian Hospitality
            </h1>
            <p className="lead text-secondary mb-4" style={{ fontFamily: 'Cinzel, serif', color: '#6e0d25' }}>
              "अतिथि देवो भव — The Guest is the Living Embodiment of the Divine."
            </p>
            <p className="text-secondary">
              Perched peacefully upon the banks of Lake Pichola in Udaipur, HotelPro is more than a hotel — it is a living monument to Rajasthan's heroic history and artistic majesty. From hand-chiseled Jodhpur sandstone arches to private courtyard baolis, every stone carries the whisper of an imperial era.
            </p>
            <p className="text-secondary">
              We seamlessly combine this 130-year ancestral legacy with state-of-the-art digital ease: verified instant room reservations, private khidmatgar butler service, and an authentic taste of royalty.
            </p>
          </div>
          <div className="col-12 col-lg-6">
            <div className="position-relative">
              <img
                src="https://images.unsplash.com/photo-1590059390046-67a731b7af27?auto=format&fit=crop&w=900&q=80"
                alt="HotelPro Palace Architecture"
                className="img-fluid rounded-4 shadow-lg w-100"
                style={{ height: '440px', objectFit: 'cover', border: '3px solid #c99a3e' }}
              />
              <div className="card position-absolute bottom-0 start-0 m-4 p-3 bg-white rounded-3 shadow border-0" style={{ maxWidth: '300px' }}>
                <div className="d-flex align-items-center gap-2 mb-1">
                  <Award size={22} style={{ color: '#c99a3e' }} />
                  <span className="fw-bold text-dark font-regal">Heritage Grand Palace</span>
                </div>
                <div className="small text-muted">Voted India's Top Royal Destination Sanctuary 2026</div>
              </div>
            </div>
          </div>
        </div>

        {/* Pillars / Values */}
        <div className="mb-5 pb-4">
          <div className="text-center mb-5">
            <span className="badge-royal mb-2">
              <Sparkles size={12} className="me-1" /> राजपूताना संस्कार
            </span>
            <h2 className="display-6 fw-bold font-regal text-dark">The Pillars of Royal Grandeur</h2>
          </div>

          <div className="row g-4">
            <div className="col-12 col-md-6 col-lg-3">
              <div className="card luxury-card h-100 p-4 border-0 shadow-sm" style={{ backgroundColor: '#ffffff' }}>
                <div className="stat-icon mb-3" style={{ backgroundColor: '#fff9ed', color: '#c99a3e' }}>
                  <Crown size={26} />
                </div>
                <h5 className="fw-bold font-regal text-dark mb-2">Regal Splendor</h5>
                <p className="text-muted small mb-0">
                  Gold leaf inlays, hand-loomed Banarasi silks, and museum-grade artifacts adorn every private suite.
                </p>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3">
              <div className="card luxury-card h-100 p-4 border-0 shadow-sm" style={{ backgroundColor: '#ffffff' }}>
                <div className="stat-icon mb-3" style={{ backgroundColor: '#fff9ed', color: '#c99a3e' }}>
                  <HeartHandshake size={26} />
                </div>
                <h5 className="fw-bold font-regal text-dark mb-2">अतिथि देवो भव</h5>
                <p className="text-muted small mb-0">
                  Devoted Khidmatgar butler care that treats every guest with reverent dignity and royal courtesy.
                </p>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3">
              <div className="card luxury-card h-100 p-4 border-0 shadow-sm" style={{ backgroundColor: '#ffffff' }}>
                <div className="stat-icon mb-3" style={{ backgroundColor: '#fff9ed', color: '#c99a3e' }}>
                  <Compass size={26} />
                </div>
                <h5 className="fw-bold font-regal text-dark mb-2">Shahi Dawat</h5>
                <p className="text-muted small mb-0">
                  Gastronomic feasts honoring recipes cooked in copper handis under the supervision of royal ustad chefs.
                </p>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3">
              <div className="card luxury-card h-100 p-4 border-0 shadow-sm" style={{ backgroundColor: '#ffffff' }}>
                <div className="stat-icon mb-3" style={{ backgroundColor: '#fff9ed', color: '#c99a3e' }}>
                  <Leaf size={26} />
                </div>
                <h5 className="fw-bold font-regal text-dark mb-2">Ayurvedic Wellness</h5>
                <p className="text-muted small mb-0">
                  Panchakarma therapies using rare Himalayan botanicals, pure brass massage vessels, and lake meditation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Milestones Timeline */}
        <div className="bg-white p-5 rounded-4 shadow-sm border mb-5" style={{ borderColor: '#e8dec8' }}>
          <div className="text-center mb-5">
            <span className="badge-royal mb-2">
              <Crown size={12} className="me-1" /> 130+ Years of Glory
            </span>
            <h2 className="display-6 fw-bold font-regal text-dark">Our Royal Chronicle</h2>
          </div>

          <div className="row g-4">
            {milestones.map((m, idx) => (
              <div key={idx} className="col-12 col-sm-6 col-lg-3">
                <div className="border-start border-warning border-3 ps-3">
                  <div className="fs-3 fw-bold font-regal mb-1" style={{ color: '#c99a3e' }}>{m.year}</div>
                  <h6 className="fw-bold text-dark mb-1 font-regal">{m.title}</h6>
                  <p className="text-muted small mb-0">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Executive Leadership Team */}
        <div className="mb-5">
          <div className="text-center mb-5">
            <span className="badge-royal mb-2">
              <Sparkles size={12} className="me-1" /> Custodians of Heritage
            </span>
            <h2 className="display-6 fw-bold font-regal text-dark">The Royal Trustees</h2>
          </div>

          <div className="row g-4">
            {leaders.map((leader, idx) => (
              <div key={idx} className="col-12 col-md-4">
                <div className="card luxury-card h-100 border-0 shadow-sm overflow-hidden text-center" style={{ backgroundColor: '#ffffff' }}>
                  <img
                    src={leader.img}
                    alt={leader.name}
                    className="w-100"
                    style={{ height: '300px', objectFit: 'cover' }}
                  />
                  <div className="card-body p-4">
                    <h5 className="fw-bold font-regal text-dark mb-1">{leader.name}</h5>
                    <div className="badge-royal mb-3">{leader.role}</div>
                    <p className="text-muted small mb-0">{leader.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center py-5 rounded-4 border p-5 shadow-sm" style={{ backgroundColor: '#fffbf2', borderColor: '#e8dec8' }}>
          <h3 className="fw-bold font-regal text-dark mb-2">Experience Life Like a Maharaja</h3>
          <p className="text-muted mb-4 mx-auto" style={{ maxWidth: '560px' }}>
            Book your royal sojourn today and discover why global travelers call HotelPro Rajasthan's most authentic palace retreat.
          </p>
          <Link to="/rooms" className="btn btn-maroon px-4 py-2 d-inline-flex align-items-center gap-2">
            Explore Royal Suites <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;