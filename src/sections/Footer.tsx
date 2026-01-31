import React from 'react';
import { Instagram, Twitter, Linkedin, Phone, MessageCircle, Globe, Send } from 'lucide-react';

export const Footer: React.FC = () => {

  return (
    <footer
      style={{
        position: 'relative',
        background: '#842DD8',
        width: '100%',
        minHeight: '400px',
        overflow: 'hidden',
        color: '#e3e7f3',
        padding: 0,
        marginTop: 0,
        fontSize: '1.05rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {/* Background Image Layer */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
        }}
        aria-hidden
      >
        <img
          src="https://framerusercontent.com/images/ukku4U0V7GWMAm5lemDMK2mjCzM.png?lossless=1"
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            borderRadius: 0,
            display: 'block',
          }}
          loading="lazy"
          decoding="async"
        />
        {/* Unique blurred orb */}
        <div
          style={{
            position: 'absolute',
            left: '60%',
            top: '60%',
            width: 340,
            height: 340,
            background: 'radial-gradient(circle at 60% 40%, #fff 0%, #9F7AEA 60%, #842DD8 100%)',
            opacity: 0.18,
            borderRadius: '50%',
            filter: 'blur(60px)',
            zIndex: 1,
            pointerEvents: 'none',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>
      {/* Main Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 1200,
          margin: 'auto',
          padding: '2rem 1.5rem 1rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          flex: 1,
          justifyContent: 'center',
        }}
      >
        {/* Heading */}
        <h2
          style={{
            color: '#e3e7f3',
            fontWeight: 900,
            fontSize: '1.8rem',
            margin: 0,
            marginBottom: '0.5rem',
            letterSpacing: '-1px',
          }}
        >
          Your Journey. Your Dreams. <br />Your Next University.
        </h2>



      </div>
      {/* Divider */}
      <div
        style={{
          width: '100%',
          height: 1,
          background: 'rgba(227,231,243,0.1)',
          margin: 0,
          border: 'none',
          zIndex: 2,
          position: 'relative',
        }}
      />
      {/* Lower Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 1300,
          width: '100%',
          padding: '1rem 1.5rem 0.8rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'nowrap',
          gap: '1.2rem',
        }}
      >
        {/* Left: Social Icons */}
        <div style={{
          display: 'flex',
          gap: '.7rem',
          alignItems: 'center',
          flex: '0 0 auto',
          justifyContent: 'flex-start',
          minWidth: 100,
          padding: '0.4rem 0',
        }}>
          <a href="https://www.instagram.com/yournextuniversity/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ opacity: 0.9, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: '7px', background: '#fff', boxShadow: '0 2px 8px #9F7AEA22' }}>
            <Instagram size={20} color="#842DD8" />
          </a>
          {/* LinkedIn */}
          <a href="https://www.linkedin.com/company/your-next-university" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ opacity: 0.9, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: '7px', background: '#fff', boxShadow: '0 2px 8px #9F7AEA22' }}>
            <Linkedin size={20} color="#842DD8" />
          </a>
          {/* Reddit */}
          <a href="https://www.reddit.com/user/YourNextUniversity/" target="_blank" rel="noopener noreferrer" aria-label="Reddit" style={{ opacity: 0.7, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: '50%', background: '#fff' }}>
            <Globe size={20} color="#842DD8" />
          </a>
          {/* Quora */}
          <a href="https://www.quora.com/profile/Your-Next-University" target="_blank" rel="noopener noreferrer" aria-label="Quora" style={{ opacity: 0.7, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: '50%', background: '#fff' }}>
            <MessageCircle size={20} color="#842DD8" />
          </a>
          {/* Telegram */}
          <a href="https://t.me/YourNextUniversity" target="_blank" rel="noopener noreferrer" aria-label="Telegram" style={{ opacity: 0.7, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: '50%', background: '#fff' }}>
            <Send size={20} color="#842DD8" />
          </a>
          <a href="https://x.com/YourNextUni" target="_blank" rel="noopener noreferrer" aria-label="X" style={{ opacity: 0.9, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: '7px', background: '#fff', boxShadow: '0 2px 8px #9F7AEA22' }}>
            <Twitter size={20} color="#842DD8" />
          </a>
          <a
            href="tel:+917985162538"
            aria-label="Phone"
            style={{ opacity: 0.9, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: '7px', background: '#fff', boxShadow: '0 2px 8px #9F7AEA22' }}
          >
            <Phone size={20} color="#842DD8" />
          </a>
        </div>
        {/* Center: Legal Links */}
        <div style={{
          display: 'flex',
          gap: '.9rem',
          alignItems: 'center',
          flex: '0 0 auto',
          justifyContent: 'center',
          minWidth: 100,
          flexWrap: 'nowrap',
          whiteSpace: 'nowrap',
        }}>
          <a
            href="/career"
            style={{
              color: '#e3e7f3',
              textDecoration: 'none',
              fontWeight: 500,
              opacity: 0.8,
              whiteSpace: 'nowrap'
            }}
          >
            Career
          </a>
          <a
            href="/privacy-policy"
            style={{
              color: '#e3e7f3',
              textDecoration: 'none',
              fontWeight: 500,
              opacity: 0.8,
              whiteSpace: 'nowrap'
            }}
          >
            Privacy Policy
          </a>
          <a
            href="/terms-of-service"
            style={{
              color: '#e3e7f3',
              textDecoration: 'none',
              fontWeight: 500,
              opacity: 0.8,
              whiteSpace: 'nowrap'
            }}
          >
            Terms of Service
          </a>
        </div>
        {/* Right: Copyright and Address */}
        <div
          style={{
            color: '#e1e6f2',
            fontSize: '.85rem',
            letterSpacing: '.01em',
            opacity: 0.85,
            textAlign: 'right',
            fontWeight: 500,
            flex: '0 0 auto',
            minWidth: 120,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          <span>
            © {new Date().getFullYear()} <span style={{ color: '#fff', fontWeight: 700, marginLeft: 4, marginRight: 4 }}>yournextuniversity</span>. All rights reserved.
          </span>
          <span style={{ color: '#e3e7f3', fontSize: '.8rem', fontWeight: 500, opacity: 0.8, marginTop: '0.1em' }}>
            100, Green Park, New Delhi
          </span>
        </div>
      </div>
      <style>
        {`
          @media (max-width: 900px) {
            footer > div[style*="max-width: 1200px"]:not(:first-of-type) {
              flex-direction: column !important;
              align-items: stretch !important;
              gap: 1.2rem !important;
              text-align: center !important;
            }
            footer > div[style*="max-width: 1200px"]:not(:first-of-type) > div {
              justify-content: center !important;
              margin-bottom: 0.5rem;
            }
          }
          @media (max-width: 600px) {
            footer > div[style*="max-width: 1200px"]:not(:first-of-type) {
              padding: 1.5rem 1rem !important;
              flex-direction: column !important;
              gap: 1.2rem !important;
            }
            footer h2 {
              font-size: 1.3rem !important;
            }
            /* Stack links and copyright on mobile for no overlap */
            footer > div[style*="max-width: 1200px"]:not(:first-of-type) > div {
              justify-content: center !important;
              margin-bottom: 0.5rem;
              flex-wrap: wrap !important;
              white-space: normal !important;
            }
          }
          @media (max-width: 1100px) {
            footer > div[style*="max-width: 1300px"] {
              flex-direction: column !important;
              align-items: center !important;
              gap: 0.8rem !important;
              padding: 1.5rem 1rem 1rem 1rem !important;
            }
            footer > div[style*="max-width: 1300px"] > div {
              justify-content: center !important;
              margin-bottom: 0.2rem;
              width: 100% !important;
              min-width: 0 !important;
              text-align: center !important;
            }
          }
          @media (max-width: 700px) {
            footer > div[style*="max-width: 1300px"] {
              flex-direction: column !important;
              align-items: stretch !important;
              gap: 0.7rem !important;
              padding: 1.2rem 0.5rem 0.7rem 0.5rem !important;
            }
            footer > div[style*="max-width: 1300px"] > div {
              justify-content: center !important;
              margin-bottom: 0.2rem;
              width: 100% !important;
              min-width: 0 !important;
              text-align: center !important;
              flex-wrap: wrap !important;
              white-space: normal !important;
            }
          }
          @media (max-width: 500px) {
            footer > div[style*="max-width: 1300px"] {
              padding: 1rem 0.2rem 0.5rem 0.2rem !important;
            }
            footer h2 {
              font-size: 1.1rem !important;
            }
            footer > div[style*="max-width: 1300px"] > div {
              font-size: .93rem !important;
              gap: .5rem !important;
            }
          }
        `}
      </style>
    </footer>
  );
};
export default Footer;
