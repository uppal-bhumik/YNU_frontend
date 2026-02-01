import React from 'react';
import { useReveal } from '../hooks/useReveal';
import { useNavigate } from 'react-router-dom';

interface FeaturedUniversitiesProps {
  style?: React.CSSProperties;
}

export const FeaturedUniversities: React.FC<FeaturedUniversitiesProps> = ({ style }) => {
  const ref = useReveal();
  const navigate = useNavigate();

  return (
    <section
      className="section alt reveal"
      id="universities"
      ref={ref as any}
      style={{
        position: 'relative',
        padding: 0,
        minHeight: 420,
        margin: '2.5rem auto',
        width: '95%',
        maxWidth: 1400,
        border: '4px solid #1A3A4A',
        borderRadius: '24px',
        boxSizing: 'border-box',
        ...style,
      }}
    >

      {/* Section content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '2rem',
        flexWrap: 'wrap',
        padding: '3.5rem',
      }}>
        {/* Left: Title and buttons */}
        <div style={{
          flex: 1,
          minWidth: 320,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          textAlign: 'left',
        }}>
          <h2
            style={{
              fontSize: '2.2rem',
              fontWeight: 900,
              letterSpacing: '-1.5px',
              marginBottom: '0.7rem',
              textShadow: '0 2px 16px #4A8A9A44, 0 1px 2px #1A3A4A44',
              textTransform: 'uppercase',
              background: 'linear-gradient(90deg,#1A3A4A 0%,#4A8A9A 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent'
            }}
          >
            UNIVERSITY EXPLORER
          </h2>
          <div
            style={{
              fontSize: '1.25rem',
              color: '#4A8A9A',
              fontWeight: 700,
              marginBottom: '1.5rem',
              maxWidth: 520,
              textShadow: '0 2px 12px #1A3A4A44',
            }}
          >
            Find your match from 800+ universities.
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem', alignItems: 'center' }}>
            <button
              onClick={() => navigate('/universities')}
              style={{
                background: 'linear-gradient(90deg,#1A3A4A 0%,#4A8A9A 100%)',
                color: '#fff',
                fontWeight: 700,
                fontSize: '1.07rem',
                border: 'none',
                borderRadius: 8,
                padding: '0.7rem 1.6rem',
                cursor: 'pointer',
                boxShadow: '0 4px 12px #4A8A9A33',
                transition: 'transform 0.18s, box-shadow 0.18s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px #4A8A9A55';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px #4A8A9A33';
              }}
            >
              Explore Universities
            </button>
            <button
              onClick={() => navigate('/universities/recommendations')}
              style={{
                background: '#fff',
                color: '#1A3A4A',
                fontWeight: 700,
                fontSize: '1.07rem',
                border: '2px solid #1A3A4A',
                borderRadius: 8,
                padding: '0.7rem 1.6rem',
                cursor: 'pointer',
                boxShadow: '0 2px 8px #4A8A9A22',
                transition: 'all 0.18s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#1A3A4A';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#fff';
                e.currentTarget.style.color = '#1A3A4A';
              }}
            >
              Get Recommendations
            </button>
            <button
              onClick={() => navigate('/compare-universities')}
              style={{
                background: 'transparent',
                color: '#1A3A4A',
                fontWeight: 600,
                fontSize: '1.07rem',
                border: '2px solid transparent',
                borderRadius: 8,
                padding: '0.7rem 1rem',
                cursor: 'pointer',
                transition: 'all 0.18s',
                textDecoration: 'underline',
                textUnderlineOffset: '4px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#4A8A9A';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#1A3A4A';
              }}
            >
              Compare Universities
            </button>
          </div>
        </div>

        {/* Right: Step-wise list */}
        <div style={{
          flex: 1.2,
          minWidth: 320,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 260,
        }}>
          <ol style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '1.1rem',
            width: '100%',
            maxWidth: 420
          }}>
            <li style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              background: 'rgba(255,255,255,0.7)',
              borderRadius: 12,
              padding: '1rem 1.2rem',
              fontWeight: 600,
              color: '#1A3A4A',
              fontSize: '1.08rem',
              boxShadow: '0 2px 8px #D0E8EC11'
            }}>
              <span style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'linear-gradient(90deg,#D0E8EC 0%,#4A8A9A 100%)',
                color: '#1A3A4A',
                fontWeight: 900,
                fontSize: '1.18rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px #4A8A9A22',
                flexShrink: 0
              }}>1</span>
              <span>Shortlist your dream destination</span>
            </li>
            <li style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              background: 'linear-gradient(90deg,#1A3A4A 0%,#4A8A9A 100%)',
              borderRadius: 14,
              padding: '1.1rem 1.3rem',
              fontWeight: 700,
              color: '#fff',
              fontSize: '1.13rem',
              boxShadow: '0 4px 16px #4A8A9A22, 0 2px 8px #1A3A4A44',
              border: '2px solid #4A8A9A',
              transform: 'scale(1.04)',
              zIndex: 2
            }}>
              <span style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: '#fff',
                color: '#1A3A4A',
                fontWeight: 900,
                fontSize: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px #4A8A9A22',
                flexShrink: 0,
                border: '2px solid #4A8A9A'
              }}>2</span>
              <span>Find the right university &amp; course</span>
            </li>
            <li style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              background: 'rgba(255,255,255,0.7)',
              borderRadius: 12,
              padding: '1rem 1.2rem',
              fontWeight: 600,
              color: '#1A3A4A',
              fontSize: '1.08rem',
              boxShadow: '0 2px 8px #D0E8EC11'
            }}>
              <span style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'linear-gradient(90deg,#D0E8EC 0%,#4A8A9A 100%)',
                color: '#1A3A4A',
                fontWeight: 900,
                fontSize: '1.18rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px #4A8A9A22',
                flexShrink: 0
              }}>3</span>
              <span>Apply, get guidance, and succeed</span>
            </li>
          </ol>
        </div>
      </div>
      <style>
        {`
          @media (max-width: 900px) {
            #universities h2 {
              font-size: 1.5rem !important;
            }
            #universities .btn-primary {
              font-size: 0.98rem !important;
              padding: 0.7rem 1.2rem !important;
            }
            #universities > div[style*="flex-direction: row"] {
              flex-direction: column !important;
              gap: 1.5rem !important;
              padding: 2rem 0.7rem 1.5rem 0.7rem !important;
            }
          }
        `}
      </style>
    </section>
  );
};
