import React from 'react';

const PinGraphic: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <div style={{
    position: 'absolute',
    top: '-24px',
    left: '-14px',
    zIndex: 10,
    filter: 'drop-shadow(0 6px 8px rgba(0,0,0,0.3))',
    ...style
  }}>
    <svg width="44" height="44" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(-20deg)' }}>
      {/* Needle */}
      <path d="M16 16L16 28" stroke="#64748B" strokeWidth="3" strokeLinecap="round" />
      {/* Pin Body Shadow */}
      <circle cx="16" cy="11" r="9" fill="#9F1239" />
      {/* Pin Body Main */}
      <circle cx="16" cy="10" r="9" fill="url(#pinGradientRepCounselling)" />
      {/* Highlight */}
      <ellipse cx="13" cy="7" rx="3" ry="2" fill="white" fillOpacity="0.4" transform="rotate(-45 13 7)" />
      {/* Gradient Definition */}
      <defs>
        <radialGradient id="pinGradientRepCounselling" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(14 8) rotate(51.3402) scale(18.5742)">
          <stop stopColor="#FB7185" />
          <stop offset="1" stopColor="#E11D48" />
        </radialGradient>
      </defs>
    </svg>
  </div>
);

const UniversityRepresentativeCounsellingPage: React.FC = () => (
  <main
    style={{
      paddingTop: '0',
      minHeight: '100vh',
      background: '#fff',
      position: 'relative',
      overflow: 'hidden'
    }}
  >
    {/* 3D Animated Gradient Blobs */}
    <div style={{
      position: 'absolute',
      top: '-120px',
      left: '-120px',
      width: 400,
      height: 400,
      zIndex: 0,
      filter: 'blur(60px) brightness(1.1)',
      pointerEvents: 'none',
      opacity: 0.5,
      animation: 'blobMove1 12s ease-in-out infinite alternate'
    }}>
      <div style={{
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        background: 'radial-gradient(circle at 60% 40%, #D0E8EC 0%, #4A8A9A 80%, transparent 100%)'
      }} />
    </div>
    <div style={{
      position: 'absolute',
      bottom: '-100px',
      right: '-100px',
      width: 320,
      height: 320,
      zIndex: 0,
      filter: 'blur(50px) brightness(1.1)',
      pointerEvents: 'none',
      opacity: 0.4,
      animation: 'blobMove2 14s ease-in-out infinite alternate'
    }}>
      <div style={{
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        background: 'radial-gradient(circle at 40% 60%, #4A8A9A 0%, #D0E8EC 80%, transparent 100%)'
      }} />
    </div>
    <style>{`
      @keyframes blobMove1 {
        0% { transform: translateY(0) scale(1);}
        100% { transform: translateY(40px) scale(1.08);}
      }
      @keyframes blobMove2 {
        0% { transform: translateY(0) scale(1);}
        100% { transform: translateY(-30px) scale(1.04);}
      }
    `}</style>

    {/* Coming Soon Banner */}
    <div style={{
      width: '100%',
      background: '#0F172A',
      color: '#CBD5E1',
      textAlign: 'center',
      padding: '0.7rem 0',
      fontWeight: 600,
      fontSize: '0.9rem',
      letterSpacing: '0.5px',
      position: 'relative',
      zIndex: 10,
      borderBottom: '1px solid #1e293b'
    }}>
      University Representative Counselling — <span style={{ color: '#fff', fontWeight: 700 }}>Coming Soon</span>
    </div>

    {/* Hero Section */}
    <section style={{
      background: 'linear-gradient(135deg, #0F172A 0%, #1A3A4A 100%)',
      padding: '100px 1.5rem 80px 1.5rem',
      textAlign: 'center',
      position: 'relative',
      marginBottom: '0'
    }}>
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '3rem',
        textAlign: 'left'
      }}>
        <div style={{ flex: 1, minWidth: 320 }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 900,
            color: '#fff',
            marginBottom: '1.2rem',
            letterSpacing: '-1px',
            lineHeight: 1.1
          }}>
            Meet Your Future University, Directly
          </h1>
          <p style={{
            fontSize: '1.18rem',
            color: '#CBD5E1',
            fontWeight: 500,
            marginBottom: '1.5rem',
            lineHeight: 1.6
          }}>
            Get exclusive access to official university representatives. Ask questions, get real answers, and make informed decisions — all in one place.
          </p>
        </div>

        <div style={{ flex: 1, minWidth: 320, textAlign: 'center', position: 'relative' }}>
          {/* Card */}
          <div style={{
            width: '100%',
            maxWidth: 400,
            aspectRatio: '4/3',
            borderRadius: 24,
            overflow: 'hidden',
            boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3)',
            border: '4px solid rgba(255,255,255,0.1)',
            margin: '0 auto'
          }}>
            <img
              src="https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80"
              alt="Counselling Session"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>
    </section>

    {/* Content Wrapper */}
    <div style={{
      maxWidth: 1100,
      margin: '-3rem auto 0 auto',
      position: 'relative',
      zIndex: 5,
      padding: '0 1.5rem 3rem 1.5rem'
    }}>
      {/* What You Get Section */}
      <section style={{
        width: '100%',
        background: '#fff',
        borderRadius: 24,
        boxShadow: '0 4px 24px rgba(15, 23, 42, 0.08)',
        padding: '2.5rem',
        border: '3px solid #4A8A9A',
        textAlign: 'left',
        position: 'relative',
        marginBottom: '2rem',
        overflow: 'visible'
      }}>
        <PinGraphic />
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 800,
          color: '#1A3A4A',
          marginBottom: '1.1rem',
          letterSpacing: '-.5px'
        }}>
          What Will This Service Offer?
        </h2>
        <ul style={{
          fontSize: '1.13rem',
          color: '#1A3A4A',
          marginBottom: '1.5rem',
          paddingLeft: '1.2rem',
          lineHeight: 1.7
        }}>
          <li><b>Direct Q&A:</b> Ask university officials about admissions, scholarships, and campus life.</li>
          <li><b>Personalized Guidance:</b> Get advice tailored to your goals and background.</li>
          <li><b>Virtual & In-Person Events:</b> Join webinars, info sessions, and meetups with university representatives.</li>
          <li><b>Application Support:</b> Clarify requirements and get tips for a successful application.</li>
          <li><b>Real Stories:</b> Hear from current students and alumni about their experiences.</li>
        </ul>
      </section>

      {/* Why Meet University Representatives? */}
      <section style={{
        width: '100%',
        background: '#fff',
        borderRadius: 24,
        boxShadow: '0 4px 24px rgba(15, 23, 42, 0.08)',
        padding: '2.5rem',
        border: '3px solid #4A8A9A',
        textAlign: 'left',
        position: 'relative',
        marginBottom: '2rem',
        overflow: 'visible'
      }}>
        <PinGraphic />
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 800,
          color: '#1A3A4A',
          marginBottom: '1.1rem',
          letterSpacing: '-.5px'
        }}>
          Why Meet University Representatives?
        </h2>
        <ul style={{
          fontSize: '1.13rem',
          color: '#0F2A36',
          marginBottom: '1.5rem',
          paddingLeft: '1.2rem',
          lineHeight: 1.7
        }}>
          <li>Get the most accurate, up-to-date information — straight from the source.</li>
          <li>Build connections that can help your application stand out.</li>
          <li>Discover hidden scholarships, programs, and opportunities.</li>
          <li>Feel confident about your choices before you apply or accept an offer.</li>
        </ul>
      </section>

      {/* Coming Soon Highlight Section */}
      <section style={{
        width: '100%',
        background: 'linear-gradient(135deg, #1A3A4A 0%, #0F172A 100%)',
        borderRadius: 24,
        boxShadow: '0 10px 30px -5px rgba(15, 23, 42, 0.2)',
        padding: '3rem 2.5rem',
        textAlign: 'center',
        position: 'relative',
        color: '#fff'
      }}>
        <h2 style={{
          fontSize: '1.6rem',
          fontWeight: 900,
          color: '#fff',
          marginBottom: '1.1rem',
          letterSpacing: '-.5px'
        }}>
          This Service is Launching Soon
        </h2>
        <p style={{
          fontSize: '1.13rem',
          color: '#CBD5E1',
          fontWeight: 500,
          marginBottom: '0',
          maxWidth: 700,
          margin: '0 auto'
        }}>
          We are working with top universities to bring you direct access to their representatives. Stay tuned for updates and be the first to know when this service goes live.
        </p>
      </section>
    </div>
  </main>
);

export default UniversityRepresentativeCounsellingPage;

