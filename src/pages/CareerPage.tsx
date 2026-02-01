import React from 'react';

const roles = [
  "Marketing & Brand Strategy Interns",
  "Social Media Strategists",
  "Influencers looking for roles",
  "Professional Education Counsellors",
  "Frontend / Backend Developers",
  "Partnerships & University Relations Executives"
];

const CareerPage: React.FC = () => (
  <main
    style={{
      minHeight: '100vh',
      background: '#fff',
      paddingTop: '0',
      paddingBottom: '2rem',
      fontFamily: 'Inter, Arial, sans-serif',
      position: 'relative'
    }}
  >
    {/* Dark Hero Section */}
    <section style={{
      background: 'linear-gradient(135deg, #0F172A 0%, #1A3A4A 100%)', // Dark Graphite
      padding: '120px 1.5rem 80px 1.5rem',
      textAlign: 'center',
      position: 'relative',
      marginBottom: '0'
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
      }}>Join Our Mission</h1>
      <p style={{
        fontSize: '1.25rem',
        color: '#CBD5E1',
        fontWeight: 500,
        maxWidth: 600,
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        Help us reimagine international education. Use your skills to make a global impact.
      </p>
    </section>

    {/* Content Container */}
    <div style={{
      maxWidth: 1000,
      margin: '0 auto',
      marginTop: '-3rem',
      borderRadius: '2.2rem',
      boxShadow: '0 20px 60px -10px rgba(15, 23, 42, 0.15)',
      position: 'relative',
      padding: '3rem',
      zIndex: 2,
      background: '#fff',
      border: '1px solid var(--border)'
    }}>
      <section
        style={{
          color: '#0F2A36',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Why Work With Us */}
        <h2 style={{
          fontSize: '1.35rem',
          fontWeight: 800,
          color: '#4A8A9A',
          marginBottom: '1.1rem',
          textAlign: 'left',
          letterSpacing: '-1px'
        }}>
          Why Work With Us
        </h2>
        <ul style={{
          fontSize: '1.18rem',
          fontWeight: 500,
          color: '#0F2A36',
          paddingLeft: '1.2rem',
          margin: '0 0 2.2rem 0',
          lineHeight: 1.8,
          textAlign: 'left'
        }}>
          <li><b>Global Impact:</b> Help students across the world find their ideal academic path.</li>
          <li><b>Innovative Environment:</b> Work with cutting-edge tools in AI, analytics, and student success.</li>
          <li><b>Collaborative Culture:</b> We believe in open ideas, shared growth, and mutual respect.</li>
          <li><b>Growth Opportunities:</b> Whether you’re a creator, strategist, or tech enthusiast you’ll grow faster here.</li>
        </ul>
        {/* Open Roles */}
        <h2 style={{
          fontSize: '1.35rem',
          fontWeight: 800,
          color: '#1A3A4A',
          marginBottom: '1.1rem',
          textAlign: 'left',
          letterSpacing: '-1px'
        }}>
          Open Roles
        </h2>
        <ul style={{
          fontSize: '1.18rem',
          fontWeight: 500,
          color: '#0F2A36',
          paddingLeft: '0',
          margin: '0 0 2.2rem 0',
          lineHeight: 1.8,
          textAlign: 'left',
          listStyle: 'none'
        }}>
          {roles.map(role => (
            <li
              key={role}
              style={{
                background: 'linear-gradient(90deg,#E8F4F6 0%,#D0E8EC 100%)',
                borderRadius: 12,
                marginBottom: '1rem',
                padding: '1rem 1.3rem',
                boxShadow: '0 2px 12px #4A8A9A11',
                fontWeight: 600,
                fontSize: '1.13rem',
                color: '#1A3A4A',
                display: 'flex',
                alignItems: 'center',
                gap: '0.7rem',
                borderLeft: '5px solid #4A8A9A'
              }}
            >
              <span style={{
                display: 'inline-block',
                width: 24,
                height: 24,
                background: 'linear-gradient(135deg,#4A8A9A 60%,#D0E8EC 100%)',
                borderRadius: '50%',
                marginRight: '0.7rem',
                textAlign: 'center',
                color: '#fff',
                fontWeight: 700,
                fontSize: '1.1rem',
                lineHeight: '24px'
              }}>•</span>
              {role}
            </li>
          ))}
        </ul>
        {/* Call to Action */}
        <div style={{
          background: 'linear-gradient(90deg,#1A3A4A 0%,#4A8A9A 100%)',
          color: '#fff',
          borderRadius: 20,
          padding: '1.7rem 2.2rem',
          fontWeight: 700,
          fontSize: '1.28rem',
          margin: '2.2rem 0 0 0',
          boxShadow: '0 2px 8px #4A8A9A22',
          textAlign: 'center',
          letterSpacing: '.01em',
          border: 'none'
        }}>
          To Apply: Send your resume and a short note about why you’d like to join us at <a href="mailto:Hello@yournextuniversity.com" style={{ color: '#fff', textDecoration: 'underline' }}>Hello@yournextuniversity.com</a>
        </div>
      </section>
    </div>
    <style>{`
      @media (max-width: 900px) {
        section {
          padding: 2rem 1rem 2rem 1rem !important;
        }
        h1 {
          font-size: 2rem !important;
        }
      }
      @media (max-width: 600px) {
        section {
          padding: 1.2rem .7rem 1.2rem .7rem !important;
        }
        h1 {
          font-size: 1.3rem !important;
        }
        h2 {
          font-size: 1.08rem !important;
        }
        div {
          font-size: .98rem !important;
        }
      }
    `}</style>
  </main>
);

export default CareerPage;


