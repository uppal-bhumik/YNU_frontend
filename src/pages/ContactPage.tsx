import React from 'react';
import { Contact } from '../sections/Contact';

export const ContactPage: React.FC = () => (
  <main
    style={{
      position: 'relative',
      minHeight: '100vh',
      background: '#fff',
      overflow: 'hidden',
      paddingTop: '0', // Full bleed
    }}
  >
    {/* Dark Hero Section */}
    <section style={{
      background: 'linear-gradient(135deg, #0F172A 0%, #1A3A4A 100%)', // Dark Graphite
      padding: '120px 1.5rem 80px 1.5rem',
      textAlign: 'center',
      position: 'relative',
      zIndex: 1
    }}>
      {/* Decor */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 50% 100%, rgba(45, 106, 122, 0.2), transparent 50%)',
        pointerEvents: 'none'
      }} />

      <h1 style={{
        fontSize: '3.5rem',
        fontWeight: 900,
        color: '#fff',
        marginBottom: '1rem',
        letterSpacing: '-2px',
        lineHeight: 1.1,
        position: 'relative',
        zIndex: 1
      }}>Contact Us</h1>
      <p style={{
        fontSize: '1.25rem',
        color: '#CBD5E1',
        fontWeight: 500,
        maxWidth: 600,
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        Have questions? We're here to help you on your journey.
      </p>
    </section>
    {/* 3D/Luxury Background Elements */}
    <div
      aria-hidden
      style={{
        position: 'fixed',
        zIndex: 0,
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
    >
      {/* Blurred luxury glassy blobs */}
      <div
        style={{
          position: 'absolute',
          top: '-120px',
          left: '-120px',
          width: 420,
          height: 420,
          background: 'radial-gradient(circle at 30% 30%, #4A8A9A99 0%, #1A3A4A33 100%)', // teal theme
          filter: 'blur(70px)',
          borderRadius: '50%',
          opacity: 0.75,
          animation: 'float1 13s ease-in-out infinite alternate'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-120px',
          right: '-120px',
          width: 340,
          height: 340,
          background: 'radial-gradient(circle at 70% 70%, #B8D8DEbb 0%, #4A8A9A55 100%)', // lighter teal
          filter: 'blur(70px)',
          borderRadius: '50%',
          opacity: 0.7,
          animation: 'float2 15s ease-in-out infinite alternate'
        }}
      />
      {/* 3D golden ring */}
      <svg
        width="320"
        height="320"
        viewBox="0 0 320 320"
        style={{
          position: 'absolute',
          top: '60%',
          left: '-100px',
          opacity: 0.22,
          filter: 'blur(1.5px)',
          transform: 'rotate(-18deg)',
          animation: 'spin 28s linear infinite'
        }}
      >
        <defs>
          <linearGradient id="goldring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#F59E42" />
          </linearGradient>
        </defs>
        <ellipse
          cx="160"
          cy="160"
          rx="120"
          ry="48"
          fill="none"
          stroke="url(#goldring)"
          strokeWidth="18"
        />
      </svg>
      {/* Floating glass cube */}
      <div
        style={{
          position: 'absolute',
          left: '65vw',
          top: '12vh',
          width: 70,
          height: 70,
          perspective: 200,
          opacity: 0.23,
          animation: 'cubeFloat 11s ease-in-out infinite alternate'
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg,#1A3A4A 60%,#2D6A7A 100%)', // teal gradient
            borderRadius: 16,
            boxShadow: '0 8px 32px #2D6A7A33, 0 0 0 2px #FBBF2440',
            transform: 'rotateY(30deg) rotateX(20deg)'
          }}
        />
      </div>
      {/* Subtle stars for luxury */}
      {[...Array(18)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: 2 + Math.random() * 2,
            height: 2 + Math.random() * 2,
            background: 'linear-gradient(90deg,#FBBF24 0%,#fff 100%)',
            borderRadius: '50%',
            opacity: 0.18 + Math.random() * 0.18,
            filter: 'blur(0.5px)'
          }}
        />
      ))}
      {/* CSS Animations */}
      <style>
        {`
          @keyframes float1 {
            0% { transform: translateY(0) scale(1);}
            100% { transform: translateY(60px) scale(1.08);}
          }
          @keyframes float2 {
            0% { transform: translateY(0) scale(1);}
            100% { transform: translateY(-40px) scale(1.12);}
          }
          @keyframes spin {
            100% { transform: rotate(342deg);}
          }
          @keyframes cubeFloat {
            0% { transform: translateY(0) rotateY(30deg) rotateX(20deg);}
            100% { transform: translateY(-40px) rotateY(60deg) rotateX(40deg);}
          }
        `}
      </style>
    </div>
    <div style={{ position: 'relative', zIndex: 2 }}>
      <Contact />
      {/* Global Button Style */}
      <style>
        {`
          button, .global-btn {
            background: linear-gradient(90deg,#1A3A4A 0%,#2D6A7A 100%) !important; /* teal gradient */
            box-shadow: 0 4px 16px #2D6A7A33, 0 1.5px 8px #1A3A4A22 !important;
            color: #fff !important;
            border-radius: 14px !important;
            font-weight: 700 !important;
            border: none !important;
            transition: background 0.2s, transform 0.2s;
          }
          button:hover, .global-btn:hover {
            background: linear-gradient(90deg,#2D6A7A 0%,#1A3A4A 100%) !important;
            transform: scale(1.04);
          }
        `}
      </style>
    </div>
  </main>
);


