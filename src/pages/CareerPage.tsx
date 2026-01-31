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
      background: 'radial-gradient(ellipse at 70% 0%, #e0c3fc 0%, #b790f3 35%, #f0e6ff 70%, #fff 100%)',
      paddingTop: '90px',
      paddingBottom: '2rem',
      fontFamily: 'Inter, Arial, sans-serif',
      position: 'relative'
    }}
  >
    {/* Decorative floating blobs */}
    <div style={{
      position: 'absolute',
      left: '-120px',
      top: '40px',
      width: 260,
      height: 260,
      background: 'radial-gradient(circle at 60% 40%, #9F7AEA33 0%, #fff0 100%)',
      borderRadius: '50%',
      filter: 'blur(60px)',
      zIndex: 0,
      opacity: 0.6,
      pointerEvents: 'none',
    }} />
    <div style={{
      position: 'absolute',
      right: '-120px',
      bottom: '40px',
      width: 260,
      height: 260,
      background: 'radial-gradient(circle at 40% 60%, #5727A322 0%, #fff0 100%)',
      borderRadius: '50%',
      filter: 'blur(60px)',
      zIndex: 0,
      opacity: 0.5,
      pointerEvents: 'none',
    }} />
    <section
      style={{
        margin: '3rem auto 0 auto',
        borderRadius: 40,
        boxShadow: '0 16px 48px #9F7AEA33, 0 2px 8px #D6C5F033',
        padding: '3.5rem 2.5vw 3.5rem 2.5vw',
        color: '#1B0044',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <h1 style={{
        fontSize: '2.9rem',
        fontWeight: 900,
        color: '#5727A3',
        marginBottom: '1.5rem',
        letterSpacing: '-2px',
        background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        filter: 'drop-shadow(0 2px 18px #9F7AEA33)'
      }}>
        Join Our Mission
      </h1>
      <p style={{
        fontSize: '1.35rem',
        fontWeight: 500,
        marginBottom: '2.2rem',
        color: '#1B0044',
        lineHeight: 1.7,
        textShadow: '0 2px 8px #fff8, 0 1px 2px #0002'
      }}>
        At <b>Your Next University</b>, we’re reimagining how students explore, compare, and connect with global universities.<br />
        We’re transforming the international education landscape—and we’re looking for passionate people who share our vision.
      </p>
      {/* Why Work With Us */}
      <h2 style={{
        fontSize: '1.35rem',
        fontWeight: 800,
        color: '#9F7AEA',
        marginBottom: '1.1rem',
        textAlign: 'left',
        letterSpacing: '-1px'
      }}>
        Why Work With Us
      </h2>
      <ul style={{
        fontSize: '1.18rem',
        fontWeight: 500,
        color: '#1B0044',
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
        color: '#5727A3',
        marginBottom: '1.1rem',
        textAlign: 'left',
        letterSpacing: '-1px'
      }}>
        Open Roles
      </h2>
      <ul style={{
        fontSize: '1.18rem',
        fontWeight: 500,
        color: '#1B0044',
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
              background: 'linear-gradient(90deg,#f0e6ff 0%,#e0c3fc 100%)',
              borderRadius: 12,
              marginBottom: '1rem',
              padding: '1rem 1.3rem',
              boxShadow: '0 2px 12px #9F7AEA11',
              fontWeight: 600,
              fontSize: '1.13rem',
              color: '#5727A3',
              display: 'flex',
              alignItems: 'center',
              gap: '0.7rem',
              borderLeft: '5px solid #9F7AEA'
            }}
          >
            <span style={{
              display: 'inline-block',
              width: 24,
              height: 24,
              background: 'linear-gradient(135deg,#9F7AEA 60%,#D6C5F0 100%)',
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
        background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
        color: '#fff',
        borderRadius: 20,
        padding: '1.7rem 2.2rem',
        fontWeight: 700,
        fontSize: '1.28rem',
        margin: '2.2rem 0 0 0',
        boxShadow: '0 2px 8px #9F7AEA22',
        textAlign: 'center',
        letterSpacing: '.01em',
        border: 'none'
      }}>
        To Apply: Send your resume and a short note about why you’d like to join us at <a href="mailto:Hello@yournextuniversity.com" style={{color:'#fff',textDecoration:'underline'}}>Hello@yournextuniversity.com</a>
      </div>
    </section>
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
