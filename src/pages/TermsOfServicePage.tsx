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

const TermsOfServicePage: React.FC = () => (
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
      <h1 style={headerStyle}>Terms of Service</h1>
      <div style={lastUpdatedStyle}>Effective Date: November 2025</div>
      <p style={{ ...paragraphStyle, textAlign: 'center' }}>
        Welcome to Your Next University. By accessing or using our website, you agree to comply with and be bound by the following Terms of Service.
      </p>
      <h2 style={sectionTitleStyle}>1. Use of Website</h2>
      <ul style={sectionListStyle}>
        <li style={pointStyle}>
          <span style={iconStyle}>✓</span>
          The website is intended to provide information and guidance about global universities and programs. You agree to use it only for lawful purposes and in accordance with these Terms.
        </li>
      </ul>
      <h2 style={sectionTitleStyle}>2. Account Registration</h2>
      <ul style={sectionListStyle}>
        <li style={pointStyle}>
          <span style={iconStyle}>✓</span>
          You agree to provide accurate, complete, and current data.
        </li>
        <li style={pointStyle}>
          <span style={iconStyle}>✓</span>
          You are responsible for maintaining the confidentiality of your account.
        </li>
      </ul>
      <h2 style={sectionTitleStyle}>3. Intellectual Property</h2>
      <ul style={sectionListStyle}>
        <li style={pointStyle}>
          <span style={iconStyle}>✓</span>
          All content, design, logos, and materials on YourNextUniversity.com are owned by Your Next University or its licensors. Unauthorized use, reproduction, or distribution is prohibited.
        </li>
      </ul>
      <h2 style={sectionTitleStyle}>4. Third-Party Links</h2>
      <ul style={sectionListStyle}>
        <li style={pointStyle}>
          <span style={iconStyle}>✓</span>
          Our website may contain links to external websites. We are not responsible for the content or privacy practices of those sites.
        </li>
      </ul>
      <h2 style={sectionTitleStyle}>5. Limitation of Liability</h2>
      <ul style={sectionListStyle}>
        <li style={pointStyle}>
          <span style={iconStyle}>✓</span>
          Your Next University is not liable for any direct or indirect damages resulting from misuse of the website or data.
        </li>
        <li style={pointStyle}>
          <span style={iconStyle}>✓</span>
          Inaccuracies in university or program information.
        </li>
        <li style={pointStyle}>
          <span style={iconStyle}>✓</span>
          Technical interruptions or loss of service.
        </li>
      </ul>
      <h2 style={sectionTitleStyle}>6. Termination</h2>
      <ul style={sectionListStyle}>
        <li style={pointStyle}>
          <span style={iconStyle}>✓</span>
          We reserve the right to suspend or terminate accounts that violate our policies or misuse our services.
        </li>
      </ul>
      <h2 style={sectionTitleStyle}>7. Governing Law</h2>
      <ul style={sectionListStyle}>
        <li style={pointStyle}>
          <span style={iconStyle}>✓</span>
          These Terms are governed by and construed in accordance with the laws of India.
        </li>
      </ul>
      <h2 style={sectionTitleStyle}>8. Contact Us</h2>
      <ul style={sectionListStyle}>
        <li style={pointStyle}>
          <span style={iconStyle}>✓</span>
          For questions about these Terms, contact us at <a href="mailto:Hello@yournextuniversity.com" style={{ color: '#5727A3', textDecoration: 'underline' }}>Hello@yournextuniversity.com</a>.
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
          font-size: 1.08rem !important;
        }
        div, ul, p {
          font-size: .98rem !important;
        }
      }
    `}</style>
  </main>
);

export default TermsOfServicePage;
