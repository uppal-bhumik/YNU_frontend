import React from 'react';

const sectionTitleStyle = {
  fontSize: '1.35rem',
  color: '#5727A3',
  fontWeight: 800,
  margin: '2.2rem 0 1.2rem 0',
  letterSpacing: '-1px',
  padding: '0.5rem 0',
  borderBottom: '2px solid #e0c3fc',
  background: 'linear-gradient(90deg,#fff 80%,#e0c3fc 100%)',
  borderRadius: '8px',
  boxShadow: '0 1px 6px #e0c3fc22',
};

const sectionListStyle = {
  fontSize: '1.13rem',
  fontWeight: 500,
  color: '#1B0044',
  paddingLeft: '0',
  margin: '0 0 1.5rem 0',
  lineHeight: 1.8,
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
};

const pointStyle = {
  background: 'linear-gradient(90deg,#f0e6ff 0%,#e0c3fc 100%)',
  borderRadius: 14,
  padding: '1.1rem 1.4rem',
  boxShadow: '0 2px 12px #9F7AEA11',
  fontWeight: 600,
  color: '#5727A3',
  display: 'flex',
  alignItems: 'center',
  gap: '0.9rem',
  borderLeft: '5px solid #9F7AEA',
  minHeight: 44,
};

const iconStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 28,
  height: 28,
  background: 'linear-gradient(135deg,#9F7AEA 60%,#D6C5F0 100%)',
  borderRadius: '50%',
  marginRight: '0.7rem',
  color: '#fff',
  fontWeight: 700,
  fontSize: '1.2rem',
  boxShadow: '0 1px 6px #9F7AEA22',
};

const sectionStyle = {
  borderRadius: 40,
  boxShadow: '0 16px 48px #9F7AEA33, 0 2px 8px #D6C5F033',
  padding: '3.5rem 2vw 3.5rem 2vw',
  color: '#1B0044',
  textAlign: 'left',
  position: 'relative',
  overflow: 'hidden',
  background: 'linear-gradient(120deg,#fff 60%,#e0c3fc 100%)',
  margin: '3rem auto 0 auto',
};

const paragraphStyle = {
  fontSize: '1.13rem',
  marginBottom: '1.5rem',
  lineHeight: 1.7,
  color: '#1B0044',
  background: 'linear-gradient(90deg,#fff 80%,#f0e6ff 100%)',
  borderRadius: '12px',
  boxShadow: '0 2px 12px #9F7AEA11',
  padding: '1rem 1.3rem',
};

const headerStyle = {
  fontSize: '2.7rem',
  fontWeight: 900,
  color: '#5727A3',
  marginBottom: '1.2rem',
  letterSpacing: '-2px',
  background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  filter: 'drop-shadow(0 2px 18px #9F7AEA33)',
  textAlign: 'center',
};

const lastUpdatedStyle = {
  fontSize: '1.13rem',
  marginBottom: '2.2rem',
  color: '#5727A3',
  fontWeight: 700,
  textAlign: 'center',
  background: 'linear-gradient(90deg,#fff 80%,#e0c3fc 100%)',
  borderRadius: '12px',
  boxShadow: '0 2px 12px #9F7AEA11',
  padding: '0.7rem 1.3rem',
};

const PrivacyPolicyPage: React.FC = () => (
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
    <section style={sectionStyle}>
      <h1 style={headerStyle}>Privacy Policy</h1>
      <div style={lastUpdatedStyle}>Last Updated: November 2025</div>
      <p style={{ ...paragraphStyle, textAlign: 'center' }}>
        Your Next University (“we,” “our,” “us”) respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website, platform, or services.
      </p>
      <h2 style={sectionTitleStyle}>1. Information We Collect</h2>
      <ul style={sectionListStyle}>
        <li style={pointStyle}>
          <span style={iconStyle}>✓</span>
          <b>Personal Information:</b> Name, email, contact number, nationality, academic background, etc.
        </li>
        <li style={pointStyle}>
          <span style={iconStyle}>✓</span>
          <b>Usage Data:</b> Pages visited, time spent on pages, IP address, browser type, and cookies.
        </li>
        <li style={pointStyle}>
          <span style={iconStyle}>✓</span>
          <b>Application Data:</b> Information submitted while exploring or applying to partner universities.
        </li>
      </ul>
      <h2 style={sectionTitleStyle}>2. How We Use Your Information</h2>
      <ul style={sectionListStyle}>
        <li style={pointStyle}>
          <span style={iconStyle}>✓</span>
          To match students with universities and programs that fit their profiles.
        </li>
        <li style={pointStyle}>
          <span style={iconStyle}>✓</span>
          To personalize user experiences and improve our services.
        </li>
        <li style={pointStyle}>
          <span style={iconStyle}>✓</span>
          To send updates, newsletters, or offers (only with consent).
        </li>
        <li style={pointStyle}>
          <span style={iconStyle}>✓</span>
          To comply with legal or regulatory obligations.
        </li>
      </ul>
      <h2 style={sectionTitleStyle}>3. Data Sharing</h2>
      <ul style={sectionListStyle}>
        <li style={pointStyle}>
          <span style={iconStyle}>✓</span>
          Partner universities or education consultants for application processing.
        </li>
        <li style={pointStyle}>
          <span style={iconStyle}>✓</span>
          Technology and analytics providers that help improve our platform.
        </li>
        <li style={pointStyle}>
          <span style={iconStyle}>✓</span>
          Legal authorities when required by law.
        </li>
        <li style={pointStyle}>
          <span style={iconStyle}>✓</span>
          <b>We never sell your personal information to third parties.</b>
        </li>
      </ul>
      <h2 style={sectionTitleStyle}>4. Data Retention</h2>
      <ul style={sectionListStyle}>
        <li style={pointStyle}>
          <span style={iconStyle}>✓</span>
          We retain user information as long as necessary to fulfill the purpose for which it was collected or as required by law.
        </li>
      </ul>
      <h2 style={sectionTitleStyle}>5. Your Rights</h2>
      <ul style={sectionListStyle}>
        <li style={pointStyle}>
          <span style={iconStyle}>✓</span>
          Access, update, or delete your data.
        </li>
        <li style={pointStyle}>
          <span style={iconStyle}>✓</span>
          Withdraw consent for communications.
        </li>
        <li style={pointStyle}>
          <span style={iconStyle}>✓</span>
          Request data portability or corrections.
        </li>
        <li style={pointStyle}>
          <span style={iconStyle}>✓</span>
          To exercise your rights, email <a href="mailto:privacy@yournextuniversity.com" style={{ color: '#5727A3', textDecoration: 'underline' }}>privacy@yournextuniversity.com</a>.
        </li>
      </ul>
      <h2 style={sectionTitleStyle}>6. Cookies</h2>
      <ul style={sectionListStyle}>
        <li style={pointStyle}>
          <span style={iconStyle}>✓</span>
          We use cookies to enhance your browsing experience. You can manage or disable cookies through your browser settings.
        </li>
      </ul>
      <h2 style={sectionTitleStyle}>7. Updates</h2>
      <ul style={sectionListStyle}>
        <li style={pointStyle}>
          <span style={iconStyle}>✓</span>
          We may update this Privacy Policy periodically. Updates will be reflected on this page with a revised “Last Updated” date.
        </li>
      </ul>
    </section>
    <style>{`
      section {
        transition: box-shadow 0.2s, background 0.2s;
      }
      section:hover {
        box-shadow: 0 24px 64px #9F7AEA44, 0 4px 16px #D6C5F044;
        background: linear-gradient(120deg,#fff 70%,#e0c3fc 100%);
      }
      @media (max-width: 900px) {
        section {
          padding: 2rem 1rem 2rem 1rem !important;
          max-width: 100vw !important;
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
          fontSize: 1.08rem !important;
        }
        div, ul, p {
          fontSize: .98rem !important;
        }
      }
    `}</style>
  </main>
);

export default PrivacyPolicyPage;
