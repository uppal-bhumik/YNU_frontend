import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const AccommodationPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showCounsellingModal, setShowCounsellingModal] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Add BASE_URL for API calls
  const BASE_URL = "https://studconnect-backend.onrender.com";
    // const BASE_URL = "http://127.0.0.1:8000";
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch(`${BASE_URL}/api/accommodation-excel`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Failed to submit');
      setSubmitted(true);
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
    setSubmitting(false);
  };

  // Responsive styles
  const heroSectionStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '2.5rem',
    padding: '2.2rem 1.5rem 0.2rem 1.5rem',
    maxWidth: 1300,
    margin: '0 auto',
    position: 'relative'
  };

  const heroTextStyle: React.CSSProperties = {
    flex: 1,
    minWidth: 320,
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    maxWidth: 600
  };

  const heroImagesWrapper: React.CSSProperties = {
    flex: 1,
    minWidth: 320,
    textAlign: 'center',
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 600
  };

  const heroImagesInner: React.CSSProperties = {
    position: 'relative',
    width: 540,
    height: 420,
    margin: '60px auto 1.5rem auto',
    perspective: 900,
    display: 'block',
    maxWidth: '100%',
    maxHeight: '70vw'
  };

  // Responsive adjustments using a style tag for mobile/tablet
  // (You can move this to a CSS/SCSS file if you wish)
  const responsiveStyle = `
    @media (max-width: 1100px) {
      .accom-hero-images-inner {
        width: 95vw !important;
        max-width: 380px !important;
        height: 220px !important;
      }
      .accom-hero-img-center {
        width: 170px !important;
        height: 170px !important;
        left: 50% !important;
        transform: translateX(-50%) scale(1.05) !important;
      }
      .accom-hero-img-side {
        width: 110px !important;
        height: 110px !important;
        top: 40px !important;
      }
      .accom-hero-img-side.left {
        left: 10px !important;
        right: auto !important;
        transform: rotate(-18deg) scale(1.02) !important;
      }
      .accom-hero-img-side.right {
        right: 10px !important;
        left: auto !important;
        transform: rotate(18deg) scale(1.02) !important;
      }
    }

    .accom-hero-images-inner::-webkit-scrollbar {
      display: none;
    }
  `;

  // Update hero and all sections to match the blue/purple hero palette
  return (
    <main
      style={{
        background: 'radial-gradient(ellipse at 70% 0%, #e0c3fc 0%, #b790f3 35%, #f0e6ff 70%, #fff 100%)',
        minHeight: '100vh',
        paddingTop: '90px', // Add space for fixed header
      }}
    >
      <style>{responsiveStyle}</style>
      {/* Hero Section */}
      <section
        className="accom-hero-section"
        style={{
          ...heroSectionStyle,
          background: 'linear-gradient(90deg, #b790f3 0%, #FFF 100%)',
          borderRadius: '0 0 36px 36px',
          boxShadow: '0 8px 48px #ffffff',
        }}
      >
        {/* Decorative Globe/Blob */}
        <div
          style={{
            position: 'absolute',
            left: -120,
            top: -80,
            width: 320,
            height: 320,
            background: 'radial-gradient(circle at 60% 40%, #D6C5F0 0%, #9F7AEA22 100%)',
            borderRadius: '50%',
            filter: 'blur(40px)',
            zIndex: 0,
            opacity: 0.7,
            pointerEvents: 'none'
          }}
        />
        <div className="accom-hero-text" style={{
          ...heroTextStyle,
          color: '#fff'
        }}>
          <h1 style={{
            fontSize: '2.6rem',
            fontWeight: 900,
            color: '#fff',
            marginBottom: '1.2rem',
            letterSpacing: '-2px',
            lineHeight: 1.1,
            textShadow: '0 4px 24px #5727A344, 0 1px 2px #fff8'
          }}>
            Find Your Home Abroad
          </h1>
          <p style={{
            fontSize: '1.18rem',
            color: '#e0e7ff',
            fontWeight: 500,
            marginBottom: '1.2rem',
            lineHeight: 1.6
          }}>
            Landing in a new country? Don’t stress. With our accommodation partners your student housing is sorted, safe, and student-approved—before you even step on the plane.
          </p>
          <button
            onClick={() => {
              if (!user || !user.id) {
                navigate('/auth/login', { state: { from: '/accommodation' } });
              } else {
                window.open('https://www.casita.com/your-next-uni', '_blank', 'noopener,noreferrer');
              }
            }}
            style={{
              marginTop: '1.2rem',
              background: 'linear-gradient(90deg, #5727A3 0%, #9F7AEA 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 14,
              padding: '1rem 2.3rem',
              fontWeight: 700,
              fontSize: '1.13rem',
              cursor: 'pointer',
              boxShadow: '0 4px 18px #9F7AEA33',
              transition: 'background 0.18s',
              letterSpacing: '.5px'
            }}
          >
            Book Accommodation Now
          </button>
        </div>
        <div style={heroImagesWrapper}>
          <div className="accom-hero-images-inner" style={heroImagesInner}>
            {/* Show as gallery in mobile, 3 images side by side */}
            <img
              className="accom-hero-img-side left"
              src="https://pub-e63ee2f49d7e4f94b98011a5350eea0f.r2.dev/Screenshot%202025-08-27%20at%201.10.57%E2%80%AFPM.png"
              alt="Student Room"
              style={{
                position: 'absolute',
                left: 0,
                top: 70,
                width: 240,
                height: 240,
                objectFit: 'cover',
                borderRadius: 28,
                boxShadow: '0 8px 32px #2563eb22',
                border: '4px solid #fff',
                transform: 'rotate(-18deg) scale(1.06)',
                zIndex: 1,
                transition: 'transform 0.18s'
              }}
            />
            <img
              className="accom-hero-img-center"
              src="https://pub-e63ee2f49d7e4f94b98011a5350eea0f.r2.dev/Screenshot%202025-08-27%20at%201.07.41%E2%80%AFPM.png"
              alt="Student Accommodation"
              style={{
                position: 'absolute',
                left: '50%',
                top: 0,
                width: 300,
                height: 300,
                objectFit: 'cover',
                borderRadius: 36,
                boxShadow: '0 8px 32px #2563eb33',
                border: '5px solid #fff',
                transform: 'translateX(-50%) scale(1.18)',
                zIndex: 3,
                transition: 'transform 0.18s'
              }}
            />
            <img
              className="accom-hero-img-side right"
              src="https://pub-e63ee2f49d7e4f94b98011a5350eea0f.r2.dev/dillon-kydd-2keCPb73aQY-unsplash.jpg"
              alt="Student Apartment"
              style={{
                position: 'absolute',
                right: 0,
                top: 70,
                width: 240,
                height: 240,
                objectFit: 'cover',
                borderRadius: 28,
                boxShadow: '0 12px 48px #2563eb22',
                border: '4px solid #fff',
                transform: 'rotate(18deg) scale(1.06)',
                zIndex: 2,
                transition: 'transform 0.18s'
              }}
            />
          </div>
        </div>
      </section>

      {/* Why Students Love Us */}
      <section style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: '.2rem .5rem 0 .5rem',
      }}>
        <h2 style={{
          fontSize: '1.7rem',
          fontWeight: 900,
          color: '#5727A3',
          marginBottom: '2.5rem',
          textAlign: 'center',
          letterSpacing: '-1px'
        }}>
          Why Students Love Us
        </h2>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '2.5rem',
            marginBottom: '2.2rem',
            position: 'relative'
          }}
        >
          {/* Decorative connecting line */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '8%',
              right: '8%',
              height: 0,
              borderTop: '2.5px dashed #60a5fa',
              zIndex: 0,
              opacity: 0.25
            }}
            aria-hidden="true"
          />
          {/* Card 1 */}
          <div style={{
            background: 'linear-gradient(120deg,#fff 60%,#e0c3fc 100%)',
            borderRadius: 18,
            boxShadow: '0 4px 24px #9F7AEA11',
            padding: '2.2rem 1.5rem 1.5rem 1.5rem',
            minWidth: 220,
            maxWidth: 260,
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
            transition: 'transform 0.18s, box-shadow 0.18s'
          }}>
            <div style={{
              width: 54,
              height: 54,
              margin: '0 auto 1.1rem auto',
              borderRadius: '50%',
              background: 'linear-gradient(135deg,#9F7AEA 60%,#5727A3 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '2rem',
              boxShadow: '0 2px 12px #9F7AEA22'
            }}>
              ✔️
            </div>
            <b style={{ fontSize: '1.13rem', color: '#5727A3' }}>Verified Listings</b>
            <div style={{fontSize: '1.07rem', color: '#1B0044', marginTop: 8}}>Every property is checked by students who’ve actually lived there.</div>
          </div>
          {/* Card 2 */}
          <div style={{
            background: 'linear-gradient(120deg,#fff 60%,#e0c3fc 100%)',
            borderRadius: 18,
            boxShadow: '0 4px 24px #9F7AEA11',
            padding: '2.2rem 1.5rem 1.5rem 1.5rem',
            minWidth: 220,
            maxWidth: 260,
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
            transition: 'transform 0.18s, box-shadow 0.18s'
          }}>
            <div style={{
              width: 54,
              height: 54,
              margin: '0 auto 1.1rem auto',
              borderRadius: '50%',
              background: 'linear-gradient(135deg,#9F7AEA 60%,#5727A3 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '2rem',
              boxShadow: '0 2px 12px #9F7AEA22'
            }}>
              ★
            </div>
            <b style={{ fontSize: '1.13rem', color: '#5727A3' }}>Real Reviews</b>
            <div style={{fontSize: '1.07rem', color: '#1B0044', marginTop: 8}}>Honest feedback from peers, not fancy brochures.</div>
          </div>
          {/* Card 3 */}
          <div style={{
            background: 'linear-gradient(120deg,#fff 60%,#e0c3fc 100%)',
            borderRadius: 18,
            boxShadow: '0 4px 24px #9F7AEA11',
            padding: '2.2rem 1.5rem 1.5rem 1.5rem',
            minWidth: 220,
            maxWidth: 260,
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
            transition: 'transform 0.18s, box-shadow 0.18s'
          }}>
            <div style={{
              width: 54,
              height: 54,
              margin: '0 auto 1.1rem auto',
              borderRadius: '50%',
              background: 'linear-gradient(135deg,#9F7AEA 60%,#5727A3 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '2rem',
              boxShadow: '0 2px 12px #9F7AEA22'
            }}>
              ⇄
            </div>
            <b style={{ fontSize: '1.13rem', color: '#5727A3' }}>Flexible Options</b>
            <div style={{fontSize: '1.07rem', color: '#1B0044', marginTop: 8}}>Shared flats, private rooms, or everything in between.</div>
          </div>
          {/* Card 4 */}
          <div style={{
            background: 'linear-gradient(120deg,#fff 60%,#e0c3fc 100%)',
            borderRadius: 18,
            boxShadow: '0 4px 24px #9F7AEA11',
            padding: '2.2rem 1.5rem 1.5rem 1.5rem',
            minWidth: 220,
            maxWidth: 260,
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
            transition: 'transform 0.18s, box-shadow 0.18s'
          }}>
            <div style={{
              width: 54,
              height: 54,
              margin: '0 auto 1.1rem auto',
              borderRadius: '50%',
              background: 'linear-gradient(135deg,#9F7AEA 60%,#5727A3 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '2rem',
              boxShadow: '0 2px 12px #9F7AEA22'
            }}>
              🖱
            </div>
            <b style={{ fontSize: '1.13rem', color: '#5727A3' }}>Easy Booking</b>
            <div style={{fontSize: '1.07rem', color: '#1B0044', marginTop: 8}}>Reserve online without hidden fees.</div>
          </div>
          {/* Card 5 */}
          <div style={{
            background: 'linear-gradient(120deg,#fff 60%,#e0c3fc 100%)',
            borderRadius: 18,
            boxShadow: '0 4px 24px #9F7AEA11',
            padding: '2.2rem 1.5rem 1.5rem 1.5rem',
            minWidth: 220,
            maxWidth: 260,
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
            transition: 'transform 0.18s, box-shadow 0.18s'
          }}>
            <div style={{
              width: 54,
              height: 54,
              margin: '0 auto 1.1rem auto',
              borderRadius: '50%',
              background: 'linear-gradient(135deg,#9F7AEA 60%,#5727A3 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '2rem',
              boxShadow: '0 2px 12px #9F7AEA22'
            }}>
              🛡
            </div>
            <b style={{ fontSize: '1.13rem', color: '#5727A3' }}>Safe & Supportive</b>
            <div style={{fontSize: '1.07rem', color: '#1B0044', marginTop: 8}}>Because “home” should feel like home.</div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{
        maxWidth: 900,
        margin: '0 auto',
        padding: '2.5rem 1.5rem 0 1.5rem'
      }}>
        <h2 style={{
          fontSize: '1.35rem',
          fontWeight: 900,
          color: '#5727A3',
          marginBottom: '2.2rem',
          textAlign: 'center',
          letterSpacing: '-1px'
        }}>
          How It Works
        </h2>
        <ol style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '1.2rem'
        }}>
          {/* Step 1 */}
          <li style={{
            background: 'linear-gradient(90deg,#fff 0%,#e0c3fc 100%)',
            borderRadius: 16,
            boxShadow: '0 2px 12px #9F7AEA22',
            padding: '1.2rem 1.7rem',
            fontSize: '1.07rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1rem',
            borderLeft: '6px solid #9F7AEA'
          }}>
            <span style={{
              display: 'inline-block',
              minWidth: 38,
              height: 38,
              background: 'linear-gradient(135deg,#5727A3 0%,#9F7AEA 100%)',
              color: '#fff',
              borderRadius: '50%',
              fontWeight: 800,
              fontSize: '1.18rem',
              textAlign: 'center',
              lineHeight: '38px',
              boxShadow: '0 2px 8px #9F7AEA33'
            }}>1</span>
            <span>
              <b style={{ color: '#5727A3' }}>Browse Listings:</b> <span style={{ color: '#1B0044' }}>Swipe through verified housing options in your city.</span>
            </span>
          </li>
          {/* Step 2 */}
          <li style={{
            background: 'linear-gradient(90deg,#fff 0%,#e0c3fc 100%)',
            borderRadius: 16,
            boxShadow: '0 2px 12px #9F7AEA22',
            padding: '1.2rem 1.7rem',
            fontSize: '1.07rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1rem',
            borderLeft: '6px solid #9F7AEA'
          }}>
            <span style={{
              display: 'inline-block',
              minWidth: 38,
              height: 38,
              background: 'linear-gradient(135deg,#5727A3 0%,#9F7AEA 100%)',
              color: '#fff',
              borderRadius: '50%',
              fontWeight: 800,
              fontSize: '1.18rem',
              textAlign: 'center',
              lineHeight: '38px',
              boxShadow: '0 2px 8px #9F7AEA33'
            }}>2</span>
            <span>
              <b style={{ color: '#5727A3' }}>Read Student Reviews:</b> <span style={{ color: '#1B0044' }}>Get the real scoop on each place.</span>
            </span>
          </li>
          {/* Step 3 */}
          <li style={{
            background: 'linear-gradient(90deg,#fff 0%,#e0c3fc 100%)',
            borderRadius: 16,
            boxShadow: '0 2px 12px #9F7AEA22',
            padding: '1.2rem 1.7rem',
            fontSize: '1.07rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1rem',
            borderLeft: '6px solid #9F7AEA'
          }}>
            <span style={{
              display: 'inline-block',
              minWidth: 38,
              height: 38,
              background: 'linear-gradient(135deg,#5727A3 0%,#9F7AEA 100%)',
              color: '#fff',
              borderRadius: '50%',
              fontWeight: 800,
              fontSize: '1.18rem',
              textAlign: 'center',
              lineHeight: '38px',
              boxShadow: '0 2px 8px #9F7AEA33'
            }}>3</span>
            <span>
              <b style={{ color: '#5727A3' }}>Connect Directly:</b> <span style={{ color: '#1B0044' }}>Chat with roommates or hosts to clarify doubts.</span>
            </span>
          </li>
          {/* Step 4 */}
          <li style={{
            background: 'linear-gradient(90deg,#fff 0%,#e0c3fc 100%)',
            borderRadius: 16,
            boxShadow: '0 2px 12px #9F7AEA22',
            padding: '1.2rem 1.7rem',
            fontSize: '1.07rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1rem',
            borderLeft: '6px solid #9F7AEA'
          }}>
            <span style={{
              display: 'inline-block',
              minWidth: 38,
              height: 38,
              background: 'linear-gradient(135deg,#5727A3 0%,#9F7AEA 100%)',
              color: '#fff',
              borderRadius: '50%',
              fontWeight: 800,
              fontSize: '1.18rem',
              textAlign: 'center',
              lineHeight: '38px',
              boxShadow: '0 2px 8px #9F7AEA33'
            }}>4</span>
            <span>
              <b style={{ color: '#5727A3' }}>Book Confidently:</b> <span style={{ color: '#1B0044' }}>Lock in your space and start your journey stress-free.</span>
            </span>
          </li>
        </ol>
      </section>

      {/* Factors to Consider Section */}
      <section style={{
        maxWidth: 1150,
        margin: '2.5rem auto 0 auto',
        padding: '2rem 1.5rem 1.5rem 1.5rem',
        fontSize: '1.07rem',
        color: '#1B0044'
      }}>
        <h2 style={{
          fontSize: '1.25rem',
          fontWeight: 900,
          color: '#5727A3',
          marginBottom: '3rem',
          textAlign: 'center'
        }}>
          Factors to Consider before Finalizing a Student Accommodation
        </h2>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'stretch',
          gap: '1.5rem',
          margin: '0 auto',
          flexWrap: 'wrap'
        }}>
          {/* Factor 1 */}
          <div style={{
            flex: 1,
            minWidth: 220,
            background: 'linear-gradient(120deg, #fff 60%, #e0c3fc 100%)',
            borderRadius: 18,
            boxShadow: '0 4px 24px #9F7AEA11',
            padding: '2.1rem 1.5rem 1.5rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            borderLeft: '6px solid #9F7AEA'
          }}>
            <div style={{
              position: 'absolute',
              top: -28,
              left: 24,
              width: 48,
              height: 48,
              background: 'linear-gradient(135deg,#5727A3 0%,#9F7AEA 100%)',
              color: '#fff',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.3rem',
              boxShadow: '0 2px 12px #9F7AEA22',
              border: '3px solid #fff'
            }}>1</div>
            <b style={{ fontSize: '1.13rem', color: '#5727A3', marginBottom: 6 }}>Location &amp; Connectivity</b>
            <div style={{fontSize: '1.07rem', color: '#1B0044', textAlign: 'center'}}>
              Choose accommodation close to your university or with easy access to public transport, shops, and essentials.
            </div>
          </div>
          {/* Factor 2 */}
          <div style={{
            flex: 1,
            minWidth: 220,
            background: 'linear-gradient(120deg, #fff 60%, #e0c3fc 100%)',
            borderRadius: 18,
            boxShadow: '0 4px 24px #9F7AEA11',
            padding: '2.1rem 1.5rem 1.5rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            borderLeft: '6px solid #9F7AEA'
          }}>
            <div style={{
              position: 'absolute',
              top: -28,
              left: 24,
              width: 48,
              height: 48,
              background: 'linear-gradient(135deg,#5727A3 0%,#9F7AEA 100%)',
              color: '#fff',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.3rem',
              boxShadow: '0 2px 12px #9F7AEA22',
              border: '3px solid #fff'
            }}>2</div>
            <b style={{ fontSize: '1.13rem', color: '#5727A3', marginBottom: 6 }}>Safety &amp; Security</b>
            <div style={{fontSize: '1.07rem', color: '#1B0044', textAlign: 'center'}}>
              Check for secure entry, CCTV, and emergency support to ensure a safe living environment.
            </div>
          </div>
          {/* Factor 3 */}
          <div style={{
            flex: 1,
            minWidth: 220,
            background: 'linear-gradient(120deg, #fff 60%, #e0c3fc 100%)',
            borderRadius: 18,
            boxShadow: '0 4px 24px #9F7AEA11',
            padding: '2.1rem 1.5rem 1.5rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            borderLeft: '6px solid #9F7AEA'
          }}>
            <div style={{
              position: 'absolute',
              top: -28,
              left: 24,
              width: 48,
              height: 48,
              background: 'linear-gradient(135deg,#5727A3 0%,#9F7AEA 100%)',
              color: '#fff',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.3rem',
              boxShadow: '0 2px 12px #9F7AEA22',
              border: '3px solid #fff'
            }}>3</div>
            <b style={{ fontSize: '1.13rem', color: '#5727A3', marginBottom: 6 }}>Budget &amp; Inclusions</b>
            <div style={{fontSize: '1.07rem', color: '#1B0044', textAlign: 'center'}}>
              Compare costs and see what’s included—utilities, internet, furnishings, etc.—to avoid hidden expenses.
            </div>
          </div>
          {/* Factor 4 */}
          <div style={{
            flex: 1,
            minWidth: 220,
            background: 'linear-gradient(120deg, #fff 60%, #e0c3fc 100%)',
            borderRadius: 18,
            boxShadow: '0 4px 24px #9F7AEA11',
            padding: '2.1rem 1.5rem 1.5rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            borderLeft: '6px solid #9F7AEA'
          }}>
            <div style={{
              position: 'absolute',
              top: -28,
              left: 24,
              width: 48,
              height: 48,
              background: 'linear-gradient(135deg,#5727A3 0%,#9F7AEA 100%)',
              color: '#fff',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.3rem',
              boxShadow: '0 2px 12px #9F7AEA22',
              border: '3px solid #fff'
            }}>4</div>
            <b style={{ fontSize: '1.13rem', color: '#5727A3', marginBottom: 6 }}>Amenities &amp; Facilities</b>
            <div style={{fontSize: '1.07rem', color: '#1B0044', textAlign: 'center'}}>
              Look for features like laundry, kitchen, study areas, and social spaces that support both study and lifestyle.
            </div>
          </div>
          {/* Factor 5 */}
          <div style={{
            flex: 1,
            minWidth: 220,
            background: 'linear-gradient(120deg, #fff 60%, #e0c3fc 100%)',
            borderRadius: 18,
            boxShadow: '0 4px 24px #9F7AEA11',
            padding: '2.1rem 1.5rem 1.5rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            borderLeft: '6px solid #9F7AEA'
          }}>
            <div style={{
              position: 'absolute',
              top: -28,
              left: 24,
              width: 48,
              height: 48,
              background: 'linear-gradient(135deg,#5727A3 0%,#9F7AEA 100%)',
              color: '#fff',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.3rem',
              boxShadow: '0 2px 12px #9F7AEA22',
              border: '3px solid #fff'
            }}>5</div>
            <b style={{ fontSize: '1.13rem', color: '#5727A3', marginBottom: 6 }}>Contract Flexibility</b>
            <div style={{fontSize: '1.07rem', color: '#1B0044', textAlign: 'center'}}>
              Review lease terms, cancellation policies, and notice periods in case your plans change.
            </div>
          </div>
        </div>
        <div style={{
          marginTop: '1.5rem',
          background: '#f1f5fd',
          borderLeft: '4px solid #9F7AEA',
          borderRadius: 10,
          padding: '1rem 1.3rem',
          fontStyle: 'italic',
          color: '#5727A3',
          fontSize: '1.05rem'
        }}>
          <b>Tip for Students:</b> Start looking early! The best accommodations fill up fast, and having a verified place secured will make your transition smooth and stress-free.
        </div>
      </section>

      {/* Casita Partner Section */}
      <section style={{
        maxWidth: 900,
        margin: '2.5rem auto 0 auto',
        padding: '2rem 1.5rem 1.5rem 1.5rem',
        background: 'linear-gradient(120deg,#fff 60%,#e0c3fc 100%)',
        borderRadius: 18,
        boxShadow: '0 4px 24px #9F7AEA11',
        fontSize: '1.07rem',
        color: '#1B0044',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '2.18rem',
          fontWeight: 900,
          color: '#5727A3',
          marginBottom: '1.1rem'
        }}>
          Our Accommodation Partner
        </h2>
        <div
          className="partner-card"
          style={{
            background: '#fff',
            borderRadius: 16,
            boxShadow: '0 2px 12px #2563eb22',
            padding: '1.5rem 1.2rem 1.7rem 1.2rem',
            margin: '0 auto 1.2rem auto',
            maxWidth: 500,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.1rem'
          }}
        >
          <img
            decoding="async"
            src="https://assets.casita.com/_next/static/media/dark-logo.72ccd553.svg"
            alt="Casita Logo"
            style={{ width: 180, height: 'auto', marginBottom: 8 }}
          />
          <div className="features" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '.7rem',
            alignItems: 'flex-start',
            width: '100%',
            margin: '0 auto 0.5rem auto',
            fontSize: '1.05rem'
          }}>
            <div className="feature-item" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span role="img" aria-label="city" style={{ color: '#2563eb', fontSize: 20 }}></span>
              60,000+ Properties across 640 Cities Globally
            </div>
            <div className="feature-item" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span role="img" aria-label="shield" style={{ color: '#2563eb', fontSize: 20 }}></span>
              Safe &amp; Secure Options
            </div>
            <div className="feature-item" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span role="img" aria-label="check" style={{ color: '#2563eb', fontSize: 20 }}></span>
              Verified Listings
            </div>
            <div className="feature-item" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span role="img" aria-label="support" style={{ color: '#2563eb', fontSize: 20 }}></span>
              24/7 Customer Support
            </div>
          </div>
          <a
            href="https://www.casita.com/your-next-uni"
            className="cta-button"
            target="_blank"
            rel="noopener"
            style={{
              display: 'inline-block',
              background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '1.07rem',
              borderRadius: 10,
              padding: '0.9rem 2.1rem',
              textDecoration: 'none',
              marginTop: '0.5rem',
              boxShadow: '0 2px 8px #9F7AEA22',
              transition: 'background 0.18s'
            }}
            onClick={e => {
              if (!user || !user.id) {
                e.preventDefault();
                navigate('/auth/login', { state: { from: '/accommodation' } });
              }
            }}
            onMouseOver={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'linear-gradient(90deg,#9F7AEA 0%,#5727A3 100%)';
            }}
            onMouseOut={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)';
            }}
          >
            Explore Now →
          </a>
        </div>
        <div style={{ marginTop: '1.1rem', color: '#64748b', fontSize: '.98rem' }}>
          <b>Note:</b> All accommodation bookings and services are powered by <b style={{ color: '#9F7AEA' }}>Caseta</b>.
        </div>
      </section>

      {/* Book Counselling Call Section */}
      <section style={{
        maxWidth: 900,
        margin: '2.5rem auto 0 auto',
        padding: '2rem 1.5rem 2.5rem 1.5rem',
        background: 'linear-gradient(120deg,#e0c3fc 0%,#fff 100%)',
        borderRadius: 18,
        boxShadow: '0 4px 24px #9F7AEA11',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '1.18rem',
          fontWeight: 900,
          color: '#5727A3',
          marginBottom: '1.1rem'
        }}>
          Need Help Choosing Accommodation?
        </h2>
        <p style={{ fontSize: '1.07rem', color: '#1B0044', marginBottom: '1.2rem' }}>
          Book a free accommodation counselling session with our team for personalized guidance.
        </p>
        <button
          onClick={() => setShowCounsellingModal(true)}
          style={{
            display: 'inline-block',
            background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
            color: '#fff',
            fontWeight: 700,
            fontSize: '1.07rem',
            borderRadius: 10,
            padding: '0.9rem 2.1rem',
            border: 'none',
            cursor: 'pointer',
            margin: '0.5rem 0 0 0',
            boxShadow: '0 2px 8px #9F7AEA22',
            transition: 'background 0.18s'
          }}
        >
          Book Accommodation Counselling
        </button>
      </section>

      {/* Modal for Accommodation Counselling */}
      {showCounsellingModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(87,39,163,0.13)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            background: 'linear-gradient(135deg,#fff 60%,#e0c3fc 100%)',
            borderRadius: 16,
            boxShadow: '0 8px 32px #9F7AEA33',
            maxWidth: 400,
            width: '95vw',
            padding: '2.2rem 1.5rem 1.5rem 1.5rem',
            position: 'relative'
          }}>
            <button
              onClick={() => { setShowCounsellingModal(false); setSubmitted(false); setError(''); }}
              style={{
                position: 'absolute',
                top: 12,
                right: 16,
                background: 'none',
                border: 'none',
                fontSize: 22,
                color: '#64748b',
                cursor: 'pointer'
              }}
              aria-label="Close"
            >×</button>
            <h3 style={{
              fontSize: '1.18rem',
              fontWeight: 900,
              color: '#5727A3',
              marginBottom: '1.1rem',
              textAlign: 'center'
            }}>
              Book Accommodation Counselling
            </h3>
            {submitted ? (
              <div style={{
                color: '#2563eb',
                fontWeight: 700,
                textAlign: 'center',
                minHeight: 120,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span
                  style={{
                    fontSize: 48,
                    color: '#22c55e',
                    marginBottom: 12,
                    display: 'inline-block'
                  }}
                  aria-label="Success"
                  role="img"
                >✔️</span>
                Thank you! We have received your request.<br />Our team will contact you soon.
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleFormChange}
                  required
                  style={{
                    padding: '0.8rem',
                    borderRadius: 8,
                    border: '1px solid #cbd5e1',
                    fontSize: '1rem'
                  }}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={handleFormChange}
                  required
                  style={{
                    padding: '0.8rem',
                    borderRadius: 8,
                    border: '1px solid #cbd5e1',
                    fontSize: '1rem'
                  }}
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone"
                  value={form.phone}
                  onChange={handleFormChange}
                  required
                  style={{
                    padding: '0.8rem',
                    borderRadius: 8,
                    border: '1px solid #cbd5e1',
                    fontSize: '1rem'
                  }}
                />
                <textarea
                  name="message"
                  placeholder="City/Country"
                  value={form.message}
                  onChange={handleFormChange}
                  required
                  style={{
                    padding: '0.8rem',
                    borderRadius: 8,
                    border: '1px solid #cbd5e1',
                    fontSize: '1rem'
                  }}
                />
                {error && <div style={{ color: '#dc2626', fontSize: '.98rem', textAlign: 'center' }}>{error}</div>}
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '1.07rem',
                    borderRadius: 10,
                    padding: '0.9rem 2.1rem',
                    border: 'none',
                    cursor: 'pointer',
                    marginTop: '0.5rem',
                    boxShadow: '0 2px 8px #9F7AEA22',
                    transition: 'background 0.18s',
                    opacity: submitting ? 0.7 : 1
                  }}
                >
                  {submitting ? 'Submitting...' : 'Submit'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Our Promise & Testimonial */}
      <section style={{
        maxWidth: 900,
        margin: '0 auto',
        padding: '2.5rem 1.5rem 3rem 1.5rem'
      }}>
        <h2 style={{
          fontSize: '1.18rem',
          fontWeight: 900,
          color: '#5727A3',
          marginBottom: '1.2rem',
          textAlign: 'center'
        }}>
          Our Promise
        </h2>
        <div style={{
          background: 'linear-gradient(120deg,#fff 60%,#e0c3fc 100%)',
          borderRadius: 14,
          boxShadow: '0 2px 12px #9F7AEA11',
          padding: '1.3rem 1.7rem',
          marginBottom: '1.5rem',
          textAlign: 'center',
          fontWeight: 500,
          color: '#1B0044',
          fontSize: '1.07rem'
        }}>
          No hidden fees. No pressure. No surprises. Just student-approved housing, straight from those who’ve lived it.
        </div>
        <blockquote style={{
          background: '#f1f5fd',
          borderLeft: '4px solid #9F7AEA',
          borderRadius: 12,
          padding: '1.2rem 1.7rem',
          fontStyle: 'italic',
          color: '#5727A3',
          margin: 0,
          textAlign: 'center',
          fontSize: '1.08rem'
        }}>
          “Finding a place was the hardest part—until I found Your Next University. Booking my apartment was literally a 10-minute process, and I felt safe and prepared!”<br />
          <span style={{fontWeight: 700, color: '#9F7AEA'}}>– Student Ambassador</span>
        </blockquote>
      </section>
    </main>
  );
};

export default AccommodationPage;
