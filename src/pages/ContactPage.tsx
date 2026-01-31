import React from 'react';
import { Contact } from '../sections/Contact';

export const ContactPage: React.FC = () => (
  <main
    style={{
      position: 'relative',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, rgb(255 255 255) 0%, rgb(197 185 234) 100%)', // Updated to hero section theme
      overflow: 'hidden',
      paddingTop: '45px', // Add space for fixed header
    }}
  >
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
          background: 'radial-gradient(circle at 30% 30%, #A78BFA99 0%, #6D28D933 100%)', // purple theme
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
          background: 'radial-gradient(circle at 70% 70%, #C4B5FDbb 0%, #A78BFA55 100%)', // lighter purple
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
            background: 'linear-gradient(135deg,#6D28D9 60%,#A78BFA 100%)', // purple gradient
            borderRadius: 16,
            boxShadow: '0 8px 32px #A78BFA33, 0 0 0 2px #FBBF2440',
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
            background: linear-gradient(90deg,#6D28D9 0%,#A78BFA 100%) !important; /* purple gradient */
            box-shadow: 0 4px 16px #A78BFA33, 0 1.5px 8px #6D28D922 !important;
            color: #fff !important;
            border-radius: 14px !important;
            font-weight: 700 !important;
            border: none !important;
            transition: background 0.2s, transform 0.2s;
          }
          button:hover, .global-btn:hover {
            background: linear-gradient(90deg,#A78BFA 0%,#6D28D9 100%) !important;
            transform: scale(1.04);
          }
        `}
      </style>
    </div>
  </main>
);
