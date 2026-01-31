import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


export const FinancialServicesPage: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <main
      className="page container"
      style={{
        position: 'relative',
        zIndex: 1,
        minHeight: '100vh',
        paddingTop: '90px', // Add space for fixed header
      }}
    >
      {/* Funding & Loans Made Easy */}
      <section style={{
        background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
        borderRadius: 18,
        boxShadow: '0 4px 24px #9F7AEA22',
        padding: '2.2rem 1.5rem 1.5rem 1.5rem',
        marginBottom: '2.5rem',
        marginTop: '1.5rem',
        color: '#fff',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        alignItems: 'center',
        gap: '2.2rem',
        flexWrap: 'wrap'
      }}>
        <div style={{ flex: 1, minWidth: 260 }}>
          <h1 style={{
            fontSize: '2.3rem',
            fontWeight: 800,
            marginBottom: '0.5rem',
            background: 'linear-gradient(90deg, #fff 0%, #9F7AEA 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            <span role="img" aria-label="money">💸</span> Funding &amp; Loans Made Easy
          </h1>
          <p style={{
            fontSize: '1.15rem',
            color: '#e0e7ff',
            marginBottom: '1.2rem',
            fontWeight: 500
          }}>
            Studying abroad is a dream—but funding it shouldn't be stressful. <b style={{ color: '#fff' }}>Your Next University</b> helps you plan, compare, and secure loans and scholarships so you can focus on your journey, not your finances.
          </p>
          {/* Explore Funding Options Button */}
          <a
            href="#funding-options"
            style={{
              display: 'inline-block',
              background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '1.13rem',
              borderRadius: 12,
              padding: '1rem 2.5rem',
              textDecoration: 'none',
              margin: '0.5rem 0 0 0',
              boxShadow: '0 2px 8px #9F7AEA33',
              transition: 'background 0.18s'
            }}
            onMouseOver={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'linear-gradient(90deg,#9F7AEA 0%,#5727A3 100%)';
            }}
            onMouseOut={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)';
            }}
          >
            Explore Funding Options
          </a>
        </div>
        <div style={{ flex: 1, minWidth: 220, textAlign: 'center' }}>
          <img
            src="https://framerusercontent.com/images/B9TBGTwN0hDvfPhPzcP3N4twFpM.png"
            alt="Education Loan Illustration"
            style={{
              width: '100%',
              maxWidth: 320,
              borderRadius: 18,
              boxShadow: '0 2px 12px #9F7AEA22',
              objectFit: 'cover'
            }}
          />
        </div>
      </section>

      {/* What We Offer */}
      <section
        style={{
          margin: '0 auto 2.5rem auto',
          padding: '1.5rem',
          background: 'linear-gradient(90deg,#fff 60%,#e0c3fc 100%)',
          borderRadius: 16,
          boxShadow: '0 2px 12px #9F7AEA11',
          color: '#1B0044',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Responsive styles */}
        <style>
          {`
            .what-we-offer-cards {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 1.2rem;
              margin-bottom: 1.2rem;
            }
            @media (max-width: 900px) {
              .what-we-offer-cards {
                grid-template-columns: 1fr;
                gap: 1rem;
              }
            }
            @media (max-width: 600px) {
              .what-we-offer-cards {
                grid-template-columns: 1fr;
                gap: 0.7rem;
              }
              .what-we-offer-card h3 {
                font-size: 1.05rem !important;
              }
              .what-we-offer-card p {
                font-size: 0.97rem !important;
              }
            }
          `}
        </style>
        {/* Background image as absolute layer */}
        <div
          data-framer-background-image-wrapper="true"
          style={{
            position: 'absolute',
            borderRadius: 'inherit',
            inset: 0,
            zIndex: 0,
            pointerEvents: 'none',
            opacity: 0.13
          }}
        >
          <img
            decoding="async"
            width="3840"
            height="2731"
            sizes="900px"
            srcSet="https://framerusercontent.com/images/IVHL7o98u0JfJ9VjWa1tgUWLA.png?scale-down-to=512 512w,https://framerusercontent.com/images/IVHL7o98u0JfJ9VjWa1tgUWLA.png?scale-down-to=1024 1024w,https://framerusercontent.com/images/IVHL7o98u0JfJ9VjWa1tgUWLA.png?scale-down-to=2048 2048w,https://framerusercontent.com/images/IVHL7o98u0JfJ9VjWa1tgUWLA.png 3840w"
            src="https://framerusercontent.com/images/IVHL7o98u0JfJ9VjWa1tgUWLA.png"
            alt=""
            style={{
              display: 'block',
              width: '100%',
              height: '100%',
              borderRadius: 'inherit',
              objectPosition: 'center bottom',
              objectFit: 'contain'
            }}
          />
        </div>
        {/* Content */}
        <div style={{ flex: 1.5, minWidth: 260, zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontWeight: 600, letterSpacing: '-0.04em', color: '#5727A3', fontSize: '1rem', marginBottom: '.5rem' }}>
            AWESOME BENEFITS
          </div>
          <h2 style={{
            fontWeight: 800,
            fontSize: '2rem',
            color: '#5727A3',
            margin: 0,
            lineHeight: 1.1,
            letterSpacing: '-0.04em'
          }}>
            Get Your Study Abroad Loan
          </h2>
          <h2 style={{
            fontWeight: 800,
            fontSize: '2rem',
            color: '#9F7AEA',
            margin: 0,
            lineHeight: 1.1,
            letterSpacing: '-0.04em',
            marginBottom: '1.1rem'
          }}>
            Easily from Home
          </h2>
          <div style={{
            fontSize: '1.15rem',
            fontWeight: 500,
            color: '#5727A3',
            marginBottom: '1.4rem',
            letterSpacing: '-0.04em',
            lineHeight: '140%'
          }}>
            We've streamlined the loan process with top banks offering the best, lowest rates. Smart lending, straight to your heart.
          </div>
          <div className="what-we-offer-cards">
            {/* Fast & Easy */}
            <div className="what-we-offer-card" style={{
              background: 'linear-gradient(90deg,#e0c3fc 0%,#fff 100%)',
              borderRadius: 14,
              padding: '1.2rem 1rem',
              boxShadow: '0 2px 8px #9F7AEA22',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1.1rem',
              minWidth: 0
            }}>
              {/* Bolt SVG */}
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 38, height: 38 }}>
                <svg width="32" height="38" viewBox="0 0 32 38" fill="none"><path d="M16 2L4 21H16L12 36L28 13H16L20 2Z" fill="#9F7AEA" fillOpacity="0.87"/><path d="M16 2L4 21H16L12 36L28 13H16L20 2Z" stroke="#9F7AEA" strokeWidth="2" strokeLinejoin="round"/></svg>
              </span>
              <div>
                <h3 style={{ fontWeight: 600, fontSize: '1.18rem', margin: 0, color: '#5727A3' }}>Fast &amp; Easy</h3>
                <p style={{ margin: 0, color: '#1B0044', fontWeight: 500 }}>Get a loan in just 2 minutes with a simple one-click (or swipe) process.</p>
              </div>
            </div>
            {/* Flexible Options */}
            <div className="what-we-offer-card" style={{
              background: 'linear-gradient(90deg,#fff 0%,#e0c3fc 100%)',
              borderRadius: 14,
              padding: '1.2rem 1rem',
              boxShadow: '0 2px 8px #9F7AEA22',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1.1rem',
              minWidth: 0
            }}>
              {/* Branching Paths SVG */}
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 38, height: 38 }}>
                <svg width="38" height="38" viewBox="0 0 38 38" fill="none"><path d="M19 36V2M19 2L6 15M19 2L32 15" stroke="#9F7AEA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
              <div>
                <h3 style={{ fontWeight: 600, fontSize: '1.18rem', margin: 0, color: '#5727A3' }}>Flexible Options</h3>
                <p style={{ margin: 0, color: '#1B0044', fontWeight: 500 }}>Choose from top Banks and NBFCs aligned with market trends.</p>
              </div>
            </div>
            {/* Real-Time Tracking & Insights */}
            <div className="what-we-offer-card" style={{
              background: 'linear-gradient(90deg,#e0c3fc 0%,#fff 100%)',
              borderRadius: 14,
              padding: '1.2rem 1rem',
              boxShadow: '0 2px 8px #9F7AEA22',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1.1rem',
              minWidth: 0
            }}>
              {/* Routing SVG */}
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 38, height: 38 }}>
                <svg width="38" height="38" viewBox="0 0 38 38" fill="none"><circle cx="19" cy="19" r="17" stroke="#9F7AEA" strokeWidth="2.5"/><path d="M19 8V19L27 27" stroke="#9F7AEA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
              <div>
                <h3 style={{ fontWeight: 600, fontSize: '1.18rem', margin: 0, color: '#5727A3' }}>Real-Time Tracking &amp; Insights</h3>
                <p style={{ margin: 0, color: '#1B0044', fontWeight: 500 }}>Monitor loan status with live updates and reporting.</p>
              </div>
            </div>
            {/* Peer Guidance */}
            <div className="what-we-offer-card" style={{
              background: 'linear-gradient(90deg,#fff 0%,#e0c3fc 100%)',
              borderRadius: 14,
              padding: '1.2rem 1rem',
              boxShadow: '0 2px 8px #9F7AEA22',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1.1rem',
              minWidth: 0
            }}>
              {/* User/Chat SVG */}
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 38, height: 38 }}>
                <svg width="38" height="38" viewBox="0 0 38 38" fill="none"><circle cx="19" cy="13" r="7" stroke="#9F7AEA" strokeWidth="2.5"/><path d="M6 32c0-5.523 5.82-10 13-10s13 4.477 13 10" stroke="#9F7AEA" strokeWidth="2.5" strokeLinecap="round"/></svg>
              </span>
              <div>
                <h3 style={{ fontWeight: 600, fontSize: '1.18rem', margin: 0, color: '#5727A3' }}>Peer Guidance</h3>
                <p style={{ margin: 0, color: '#1B0044', fontWeight: 500 }}>Learn from students who’ve already navigated the financial side of studying abroad.</p>
                <a href="/services/peer-counselling"
                  style={{
                    display: 'inline-block',
                    marginTop: '.5rem',
                    background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: '1rem',
                    borderRadius: 8,
                    padding: '.5rem 1.2rem',
                    textDecoration: 'none',
                    boxShadow: '0 2px 8px #9F7AEA22',
                    transition: 'background 0.18s'
                  }}
                  onMouseOver={e => {
                    (e.currentTarget as HTMLAnchorElement).style.background = 'linear-gradient(90deg,#9F7AEA 0%,#5727A3 100%)';
                  }}
                  onMouseOut={e => {
                    (e.currentTarget as HTMLAnchorElement).style.background = 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)';
                  }}
                >
                  Ask a Peer
                </a>
              </div>
            </div>
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 220, textAlign: 'center', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src="https://framerusercontent.com/images/xZe31QYxYlY3R3uXndfdsVdc7Y8.png"
            alt="Loan Process Illustration"
            style={{
              width: '100%',
              maxWidth: 260,
              borderRadius: 16,
              boxShadow: '0 2px 12px #9F7AEA11',
              objectFit: 'cover'
            }}
          />
        </div>
      </section>
      
      {/* Partner Banks */}
      <section>
        <div
          style={{
            background: 'linear-gradient(90deg, #e0c3fc 0%, #fff 100%)',
            borderRadius: 16,
            border: '1px solid #d9d9d9',
            padding: '1.1rem 1rem 1.1rem 1rem',
            margin: '0 0 1.5rem 0',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            opacity: 1,
          }}
        >
          <div
            style={{
              fontWeight: 800,
              fontSize: '1.35rem',
              marginBottom: '.7rem',
              letterSpacing: '-0.03em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textAlign: 'center',
              gap: '.6rem'
            }}
          >
            <span role="img" aria-label="bank">🏦</span>
            Our Partner Banks &amp; NBFCs
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
              gap: '1.2rem',
              alignItems: 'center',
              justifyItems: 'center',
              overflowX: 'auto',
            }}
          >
            {/* Bank of India */}
            <div style={{
              background: '#fff',
              borderRadius: 12,
              border: '1px solid #dbdbdb',
              boxShadow: '0 0 16px 0 rgba(0,0,0,0.04)',
              padding: '1rem .5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textDecoration: 'none',
              color: '#1e293b',
              minWidth: 110,
              transition: 'box-shadow .15s'
            }}>
              <img src="https://framerusercontent.com/images/pnrcAvqYHiL4EGmFRwEm8D3x22Y.png" alt="Bank of India" style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }} />
              <span style={{ fontSize: 15, fontWeight: 500, textAlign: 'center', letterSpacing: '-0.04em' }}>Bank of India</span>
            </div>
            {/* Punjab National Bank */}
            <div style={{
              background: '#fff',
              borderRadius: 12,
              border: '1px solid #dbdbdb',
              boxShadow: '0 0 16px 0 rgba(0,0,0,0.04)',
              padding: '1rem .5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textDecoration: 'none',
              color: '#1e293b',
              minWidth: 110,
              transition: 'box-shadow .15s'
            }}>
              <img src="https://framerusercontent.com/images/9bnCNN9JC4zodgwmRW7QVZqlQRs.png" alt="Punjab National Bank" style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }} />
              <span style={{ fontSize: 15, fontWeight: 500, textAlign: 'center', letterSpacing: '-0.04em' }}>Punjab National Bank</span>
            </div>
            {/* Bank of Maharashtra */}
            <div style={{
              background: '#fff',
              borderRadius: 12,
              border: '1px solid #dbdbdb',
              boxShadow: '0 0 16px 0 rgba(0,0,0,0.04)',
              padding: '1rem .5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textDecoration: 'none',
              color: '#1e293b',
              minWidth: 110,
              transition: 'box-shadow .15s'
            }}>
              <img src="https://framerusercontent.com/images/LtAg8KaEuIyS6GzfMSGuGkOf6E.png" alt="Bank of Maharashtra" style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }} />
              <span style={{ fontSize: 15, fontWeight: 500, textAlign: 'center', letterSpacing: '-0.04em' }}>Bank of Maharashtra</span>
            </div>
            {/* Bank of Baroda */}
            <div style={{
              background: '#fff',
              borderRadius: 12,
              border: '1px solid #dbdbdb',
              boxShadow: '0 0 16px 0 rgba(0,0,0,0.04)',
              padding: '1rem .5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textDecoration: 'none',
              color: '#1e293b',
              minWidth: 110,
              transition: 'box-shadow .15s'
            }}>
              <img src="https://framerusercontent.com/images/OTI8KjM7YMqNLl4AJKlkYdeMLZs.png" alt="Bank of Baroda" style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }} />
              <span style={{ fontSize: 15, fontWeight: 500, textAlign: 'center', letterSpacing: '-0.04em' }}>Bank of Baroda</span>
            </div>
            {/* Union Bank of India */}
            <div style={{
              background: '#fff',
              borderRadius: 12,
              border: '1px solid #dbdbdb',
              boxShadow: '0 0 16px 0 rgba(0,0,0,0.04)',
              padding: '1rem .5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textDecoration: 'none',
              color: '#1e293b',
              minWidth: 110,
              transition: 'box-shadow .15s'
            }}>
              <img src="https://framerusercontent.com/images/sR4martDokWyDYXuP6dgIiWCJk0.png" alt="Union Bank of India" style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }} />
              <span style={{ fontSize: 15, fontWeight: 500, textAlign: 'center', letterSpacing: '-0.04em' }}>Union Bank of India</span>
            </div>
            {/* State Bank of India */}
            <div style={{
              background: '#fff',
              borderRadius: 12,
              border: '1px solid #dbdbdb',
              boxShadow: '0 0 16px 0 rgba(0,0,0,0.04)',
              padding: '1rem .5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textDecoration: 'none',
              color: '#1e293b',
              minWidth: 110,
              transition: 'box-shadow .15s'
            }}>
              <img src="https://framerusercontent.com/images/nKrsZ25sbMcxfh2OF83P4X9DGWI.png" alt="State Bank of India" style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }} />
              <span style={{ fontSize: 15, fontWeight: 500, textAlign: 'center', letterSpacing: '-0.04em' }}>State Bank of India</span>
            </div>
            {/* MPower Financing */}
            <div style={{
              background: '#fff',
              borderRadius: 12,
              border: '1px solid #dbdbdb',
              boxShadow: '0 0 16px 0 rgba(0,0,0,0.04)',
              padding: '1rem .5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textDecoration: 'none',
              color: '#1e293b',
              minWidth: 110,
              transition: 'box-shadow .15s'
            }}>
              <img src="https://framerusercontent.com/images/fKN6SakWdLFVLEYSOtSr1eeNaFM.png" alt="MPower Financing" style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }} />
              <span style={{ fontSize: 15, fontWeight: 500, textAlign: 'center', letterSpacing: '-0.04em' }}>MPower Financing</span>
            </div>
            {/* Prodigy Finance */}
            <div style={{
              background: '#fff',
              borderRadius: 12,
              border: '1px solid #dbdbdb',
              boxShadow: '0 0 16px 0 rgba(0,0,0,0.04)',
              padding: '1rem .5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textDecoration: 'none',
              color: '#1e293b',
              minWidth: 110,
              transition: 'box-shadow .15s'
            }}>
              <img src="https://framerusercontent.com/images/N4ujbId7eTBtfnM2rXq4LSrRY.png" alt="Prodigy Finance" style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }} />
              <span style={{ fontSize: 15, fontWeight: 500, textAlign: 'center', letterSpacing: '-0.04em' }}>Prodigy Finance</span>
            </div>
            {/* Avanse Global */}
            <div style={{
              background: '#fff',
              borderRadius: 12,
              border: '1px solid #dbdbdb',
              boxShadow: '0 0 16px 0 rgba(0,0,0,0.04)',
              padding: '1rem .5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textDecoration: 'none',
              color: '#1e293b',
              minWidth: 110,
              transition: 'box-shadow .15s'
            }}>
              <img src="https://framerusercontent.com/images/vOiWo2sc2ycx4bv1B3tsruQeYGw.png" alt="Avanse Global" style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }} />
              <span style={{ fontSize: 15, fontWeight: 500, textAlign: 'center', letterSpacing: '-0.04em' }}>Avanse Global</span>
            </div>
            {/* IDFC First Bank */}
            <div style={{
              background: '#fff',
              borderRadius: 12,
              border: '1px solid #dbdbdb',
              boxShadow: '0 0 16px 0 rgba(0,0,0,0.04)',
              padding: '1rem .5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textDecoration: 'none',
              color: '#1e293b',
              minWidth: 110,
              transition: 'box-shadow .15s'
            }}>
              <img src="https://framerusercontent.com/images/a300mMgfMmpH6TV5Z0NT0R8XAAI.png" alt="IDFC First Bank" style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }} />
              <span style={{ fontSize: 15, fontWeight: 500, textAlign: 'center', letterSpacing: '-0.04em' }}>IDFC First Bank</span>
            </div>
            {/* Axis Bank */}
            <div style={{
              background: '#fff',
              borderRadius: 12,
              border: '1px solid #dbdbdb',
              boxShadow: '0 0 16px 0 rgba(0,0,0,0.04)',
              padding: '1rem .5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textDecoration: 'none',
              color: '#1e293b',
              minWidth: 110,
              transition: 'box-shadow .15s'
            }}>
              <img src="https://framerusercontent.com/images/wCqqbT8gRAprZQfkyO9ExayTzg.png" alt="Axis Bank" style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }} />
              <span style={{ fontSize: 15, fontWeight: 500, textAlign: 'center', letterSpacing: '-0.04em' }}>Axis Bank</span>
            </div>
            {/* ICICI Bank */}
            <div style={{
              background: '#fff',
              borderRadius: 12,
              border: '1px solid #dbdbdb',
              boxShadow: '0 0 16px 0 rgba(0,0,0,0.04)',
              padding: '1rem .5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textDecoration: 'none',
              color: '#1e293b',
              minWidth: 110,
              transition: 'box-shadow .15s'
            }}>
              <img src="https://framerusercontent.com/images/xnz5iwGEzPTl9AYAvH3OKn4q5e4.png" alt="ICICI Bank" style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }} />
              <span style={{ fontSize: 15, fontWeight: 500, textAlign: 'center', letterSpacing: '-0.04em' }}>ICICI Bank</span>
            </div>
            {/* Yes Bank */}
            <div style={{
              background: '#fff',
              borderRadius: 12,
              border: '1px solid #dbdbdb',
              boxShadow: '0 0 16px 0 rgba(0,0,0,0.04)',
              padding: '1rem .5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textDecoration: 'none',
              color: '#1e293b',
              minWidth: 110,
              transition: 'box-shadow .15s'
            }}>
              <img src="https://framerusercontent.com/images/K2DjcIyk3AtIycmbQDQM6tJiV4.png" alt="Yes Bank" style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }} />
              <span style={{ fontSize: 15, fontWeight: 500, textAlign: 'center', letterSpacing: '-0.04em' }}>Yes Bank</span>
            </div>
            {/* Credila */}
            <div style={{
              background: '#fff',
              borderRadius: 12,
              border: '1px solid #dbdbdb',
              boxShadow: '0 0 16px 0 rgba(0,0,0,0.04)',
              padding: '1rem .5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textDecoration: 'none',
              color: '#1e293b',
              minWidth: 110,
              transition: 'box-shadow .15s'
            }}>
              <img src="https://framerusercontent.com/images/EZijcqgZEmADwJDAmCXmyv5XI.png" alt="Credila" style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }} />
              <span style={{ fontSize: 15, fontWeight: 500, textAlign: 'center', letterSpacing: '-0.04em' }}>Credila</span>
            </div>
            {/* Avanse */}
            <div style={{
              background: '#fff',
              borderRadius: 12,
              border: '1px solid #dbdbdb',
              boxShadow: '0 0 16px 0 rgba(0,0,0,0.04)',
              padding: '1rem .5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textDecoration: 'none',
              color: '#1e293b',
              minWidth: 110,
              transition: 'box-shadow .15s'
            }}>
              <img src="https://framerusercontent.com/images/vOiWo2sc2ycx4bv1B3tsruQeYGw.png" alt="Avanse" style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }} />
              <span style={{ fontSize: 15, fontWeight: 500, textAlign: 'center', letterSpacing: '-0.04em' }}>Avanse</span>
            </div>
            {/* Incred */}
            <div style={{
              background: '#fff',
              borderRadius: 12,
              border: '1px solid #dbdbdb',
              boxShadow: '0 0 16px 0 rgba(0,0,0,0.04)',
              padding: '1rem .5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textDecoration: 'none',
              color: '#1e293b',
              minWidth: 110,
              transition: 'box-shadow .15s'
            }}>
              <img src="https://framerusercontent.com/images/ddHfKK2QwWo6VAgwr6JTZ248GzM.png" alt="Incred" style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }} />
              <span style={{ fontSize: 15, fontWeight: 500, textAlign: 'center', letterSpacing: '-0.04em' }}>Incred</span>
            </div>
            {/* Auxilo */}
            <div style={{
              background: '#fff',
              borderRadius: 12,
              border: '1px solid #dbdbdb',
              boxShadow: '0 0 16px 0 rgba(0,0,0,0.04)',
              padding: '1rem .5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textDecoration: 'none',
              color: '#1e293b',
              minWidth: 110,
              transition: 'box-shadow .15s'
            }}>
              <img src="https://framerusercontent.com/images/9ISe0CbmNRBF0EO14z8RfGPgkA.png" alt="Auxilo" style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }} />
              <span style={{ fontSize: 15, fontWeight: 500, textAlign: 'center', letterSpacing: '-0.04em' }}>Auxilo</span>
            </div>
            {/* Tata Capital */}
            <div style={{
              background: '#fff',
              borderRadius: 12,
              border: '1px solid #dbdbdb',
              boxShadow: '0 0 16px 0 rgba(0,0,0,0.04)',
              padding: '1rem .5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textDecoration: 'none',
              color: '#1e293b',
              minWidth: 110,
              transition: 'box-shadow .15s'
            }}>
              <img src="https://framerusercontent.com/images/M6zUrrd1bvOV2fBqXL47qMOZ0Vo.png" alt="Tata Capital" style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }} />
              <span style={{ fontSize: 15, fontWeight: 500, textAlign: 'center', letterSpacing: '-0.04em' }}>Tata Capital</span>
            </div>
            {/* Propelld */}
            <div style={{
              background: '#fff',
              borderRadius: 12,
              border: '1px solid #dbdbdb',
              boxShadow: '0 0 16px 0 rgba(0,0,0,0.04)',
              padding: '1rem .5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textDecoration: 'none',
              color: '#1e293b',
              minWidth: 110,
              transition: 'box-shadow .15s'
            }}>
              <img src="https://framerusercontent.com/images/JxNDywcvwxLs9yPBKXwxcWNFmg.png" alt="Propelld" style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }} />
              <span style={{ fontSize: 15, fontWeight: 500, textAlign: 'center', letterSpacing: '-0.04em' }}>Propelld</span>
            </div>
            {/* Poonawalla Fincorp */}
            <div style={{
              background: '#fff',
              borderRadius: 12,
              border: '1px solid #dbdbdb',
              boxShadow: '0 0 16px 0 rgba(0,0,0,0.04)',
              padding: '1rem .5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textDecoration: 'none',
              color: '#1e293b',
              minWidth: 110,
              transition: 'box-shadow .15s'
            }}>
              <img src="https://framerusercontent.com/images/L4rXvu1MsEySvYQrIELyeQbKihw.png" alt="Poonawalla Fincorp" style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }} />
              <span style={{ fontSize: 15, fontWeight: 500, textAlign: 'center', letterSpacing: '-0.04em' }}>Poonawalla Fincorp</span>
            </div>
          </div>
        </div>
        {/* End Partner Banks */}

      </section>
      {/* How It Works */}
      <section
        style={{
          margin: '0 auto 2.5rem auto',
          padding: '2.2rem 1.5rem',
          background: 'linear-gradient(90deg,#e0c3fc 0%,#fff 100%)',
          borderRadius: 20,
          boxShadow: '0 2px 16px #9F7AEA11',
          color: '#1e293b',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2.5rem',
          alignItems: 'flex-start'
        }}
      >
        <div style={{ flex: 1, minWidth: 240, alignSelf: 'flex-start' }}>
          <div
            style={{
              fontWeight: 900,
              fontSize: '1.35rem',
              letterSpacing: '-0.03em',
              background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1.2rem'
            }}
          >
            How It Works
          </div>
          <div style={{
            display: 'grid',
            gap: '1.1rem',
            gridTemplateColumns: '1fr',
            marginTop: '.5rem'
          }}>
            {/* Step 1 */}
            <div style={{
              background: 'linear-gradient(90deg,#fff 0%,#e0c3fc 100%)',
              borderRadius: 14,
              boxShadow: '0 2px 8px #9F7AEA22',
              padding: '1.1rem 1.2rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1.1rem'
            }}>
              <div style={{
                width: 38,
                height: 38,
                background: 'linear-gradient(135deg,#5727A3 0%,#9F7AEA 100%)',
                color: '#fff',
                fontWeight: 800,
                fontSize: '1.18rem',
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px -2px #9F7AEA33',
                flexShrink: 0
              }}>1</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.08rem', color: '#5727A3' }}>Explore Options</div>
                <div style={{ color: '#1B0044', fontWeight: 500, fontSize: '1rem', marginTop: 4 }}>
                  Check out scholarships, grants, and loans tailored for your destination and course.
                </div>
              </div>
            </div>
            {/* Step 2 */}
            <div style={{
              background: 'linear-gradient(90deg,#fff 0%,#e0c3fc 100%)',
              borderRadius: 14,
              boxShadow: '0 2px 8px #9F7AEA22',
              padding: '1.1rem 1.2rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1.1rem'
            }}>
              <div style={{
                width: 38,
                height: 38,
                background: 'linear-gradient(135deg,#5727A3 0%,#9F7AEA 100%)',
                color: '#fff',
                fontWeight: 800,
                fontSize: '1.18rem',
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px -2px #9F7AEA33',
                flexShrink: 0
              }}>2</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.08rem', color: '#5727A3' }}>Compare &amp; Choose</div>
                <div style={{ color: '#1B0044', fontWeight: 500, fontSize: '1rem', marginTop: 4 }}>
                  Evaluate loan terms, interest rates, and repayment options.
                </div>
              </div>
            </div>
            {/* Step 3 */}
            <div style={{
              background: 'linear-gradient(90deg,#fff 0%,#e0c3fc 100%)',
              borderRadius: 14,
              boxShadow: '0 2px 8px #9F7AEA22',
              padding: '1.1rem 1.2rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1.1rem'
            }}>
              <div style={{
                width: 38,
                height: 38,
                background: 'linear-gradient(135deg,#5727A3 0%,#9F7AEA 100%)',
                color: '#fff',
                fontWeight: 800,
                fontSize: '1.18rem',
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px -2px #9F7AEA33',
                flexShrink: 0
              }}>3</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.08rem', color: '#5727A3' }}>Apply Confidently</div>
                <div style={{ color: '#1B0044', fontWeight: 500, fontSize: '1rem', marginTop: 4 }}>
                  Get guided steps to apply through our verified loan partners.
                </div>
              </div>
            </div>
            {/* Step 4 */}
            <div style={{
              background: 'linear-gradient(90deg,#fff 0%,#e0c3fc 100%)',
              borderRadius: 14,
              boxShadow: '0 2px 8px #9F7AEA22',
              padding: '1.1rem 1.2rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1.1rem'
            }}>
              <div style={{
                width: 38,
                height: 38,
                background: 'linear-gradient(135deg,#5727A3 0%,#9F7AEA 100%)',
                color: '#fff',
                fontWeight: 800,
                fontSize: '1.18rem',
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px -2px #9F7AEA33',
                flexShrink: 0
              }}>4</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.08rem', color: '#5727A3' }}>Manage &amp; Track</div>
                <div style={{ color: '#1B0044', fontWeight: 500, fontSize: '1rem', marginTop: 4 }}>
                  Keep tabs on your spending and stay on top of your budget.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 240, alignSelf: 'flex-start' }}>
          <div
            style={{
              fontWeight: 900,
              fontSize: '1.35rem',
              letterSpacing: '-0.03em',
              background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1.2rem'
            }}
          >
            Quick Funding Tips
          </div>
          <div style={{
            display: 'grid',
            gap: '1.1rem',
            gridTemplateColumns: '1fr',
            marginTop: '.5rem'
          }}>
            {/* Tip 1 */}
            <div style={{
              background: 'linear-gradient(90deg,#fff 0%,#e0c3fc 100%)',
              borderRadius: 14,
              boxShadow: '0 2px 8px #9F7AEA22',
              padding: '1.1rem 1.2rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1.1rem'
            }}>
              <div style={{
                width: 38,
                height: 38,
                background: 'linear-gradient(135deg,#5727A3 0%,#9F7AEA 100%)',
                color: '#fff',
                fontWeight: 800,
                fontSize: '1.18rem',
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px -2px #9F7AEA33',
                flexShrink: 0
              }}>1</div>
              <div>
                <div style={{ color: '#5727A3', fontWeight: 500, fontSize: '1rem', marginTop: 4 }}>
                   Apply early for scholarships and loans.
                </div>
              </div>
            </div>
            {/* Tip 2 */}
            <div style={{
              background: 'linear-gradient(90deg,#fff 0%,#e0c3fc 100%)',
              borderRadius: 14,
              boxShadow: '0 2px 8px #9F7AEA22',
              padding: '1.1rem 1.2rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1.1rem'
            }}>
              <div style={{
                width: 38,
                height: 38,
                background: 'linear-gradient(135deg,#5727A3 0%,#9F7AEA 100%)',
                color: '#fff',
                fontWeight: 800,
                fontSize: '1.18rem',
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px -2px #9F7AEA33',
                flexShrink: 0
              }}>2</div>
              <div>
                <div style={{ color: '#5727A3', fontWeight: 500, fontSize: '1rem', marginTop: 4 }}>
                  Use budgeting tools to track expenses.
                </div>
              </div>
            </div>
            {/* Tip 3 */}
            <div style={{
              background: 'linear-gradient(90deg,#fff 0%,#e0c3fc 100%)',
              borderRadius: 14,
              boxShadow: '0 2px 8px #9F7AEA22',
              padding: '1.1rem 1.2rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1.1rem'
            }}>
              <div style={{
                width: 38,
                height: 38,
                background: 'linear-gradient(135deg,#5727A3 0%,#9F7AEA 100%)',
                color: '#fff',
                fontWeight: 800,
                fontSize: '1.18rem',
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px -2px #9F7AEA33',
                flexShrink: 0
              }}>3</div>
              <div>
                <div style={{ color: '#5727A3', fontWeight: 500, fontSize: '1rem', marginTop: 4 }}>
                  Ask peers for real-world advice.
                </div>
              </div>
            </div>
            {/* Tip 4 */}
            <div style={{
              background: 'linear-gradient(90deg,#fff 0%,#e0c3fc 100%)',
              borderRadius: 14,
              boxShadow: '0 2px 8px #9F7AEA22',
              padding: '1.1rem 1.2rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1.1rem'
            }}>
              <div style={{
                width: 38,
                height: 38,
                background: 'linear-gradient(135deg,#5727A3 0%,#9F7AEA 100%)',
                color: '#fff',
                fontWeight: 800,
                fontSize: '1.18rem',
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px -2px #9F7AEA33',
                flexShrink: 0
              }}>4</div>
              <div>
                <div style={{ color: '#5727A3', fontWeight: 500, fontSize: '1rem', marginTop: 4 }}>
                  Always have an emergency fund.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Funding Options Table/Content */}
      <div id="funding-options" style={{
        margin:'2rem',
        display:'grid',
        gap:'2rem',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{
          padding:'1.5rem',
          borderRadius:'1.5rem',
          background: '#f8fafc',
          boxShadow: '0 8px 32px 0 #9F7AEA22, 0 1.5px 8px 0 #9F7AEA22',
          border: '1.5px solid #e0e7ef',
        }}>
          <h3 style={{ color: '#5727A3', fontWeight: 700, fontSize: '1.15rem', marginBottom: '.7rem' }}>ForeignAdmits</h3>
          <ul style={{ fontSize: '1.02rem', color: '#334155', marginBottom: '.7rem', paddingLeft: '1.1rem' }}>
            <li>Compare 15+ banks &amp; NBFCs</li>
            <li>Secured &amp; unsecured loan options</li>
            <li>Fast, digital process</li>
            <li>Personalized support for study abroad</li>
          </ul>
          <a
            href="https://www.foreignadmits.com/"
            target="_blank"
            rel="noopener"
            style={{
              color: '#fff',
              background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
              borderRadius: 8,
              padding: '.7rem 1.5rem',
              fontWeight: 700,
              textDecoration: 'none',
              display: 'inline-block'
            }}
            onClick={e => {
              if (!user || !user.id) {
                e.preventDefault();
                navigate('/auth/login', { state: { from: '/financial-services' } });
              }
            }}
          >
            Apply with ForeignAdmits
          </a>
        </div>
        {/* Example: Multiple Lenders/Providers */}
        <div style={{
          padding:'1.5rem',
          borderRadius:'1.5rem',
          background: '#f8fafc',
          boxShadow: '0 8px 32px 0 #9F7AEA22, 0 1.5px 8px 0 #9F7AEA22',
          border: '1.5px solid #e0e7ef',
        }}>
          <h3 style={{ color: '#5727A3', fontWeight: 700, fontSize: '1.15rem', marginBottom: '.7rem' }}>Leap Finance</h3>
          <ul style={{ fontSize: '1.02rem', color: '#334155', marginBottom: '.7rem', paddingLeft: '1.1rem' }}>
            <li>No-cosigner, collateral-free loans</li>
            <li>Competitive interest rates</li>
            <li>Fast approval process</li>
            <li>For international students</li>
          </ul>
          <a
            href="https://www.leapfinance.com/"
            target="_blank"
            rel="noopener"
            style={{
              color: '#fff',
              background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
              borderRadius: 8,
              padding: '.7rem 1.5rem',
              fontWeight: 700,
              textDecoration: 'none',
              display: 'inline-block'
            }}
            onClick={e => {
              if (!user || !user.id) {
                e.preventDefault();
                navigate('/auth/login', { state: { from: '/financial-services' } });
              }
            }}
          >
            Apply with Leap Finance
          </a>
        </div>
        
        {/* ...existing code for university scholarships... */}
        {data.map((uni, idx) => (
          <div
            key={uni.university + idx}
            className="card"
            style={{
              padding:'1.5rem',
              borderRadius:'1.5rem',
              background: 'rgba(255,255,255,0.7)',
              boxShadow: '0 8px 32px 0 rgba(37,99,235,0.10), 0 1.5px 8px 0 #fbbf24',
              backdropFilter: 'blur(8px)',
              border: '1.5px solid #e0e7ef',
              transition: 'transform .18s, box-shadow .18s',
              cursor: 'pointer'
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.03) rotateY(4deg)';
              (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 40px 0 #fbbf24, 0 2px 12px 0 #60a5fa';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.transform = '';
              (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px 0 rgba(37,99,235,0.10), 0 1.5px 8px 0 #fbbf24';
            }}
          >
            <h2 style={{
              margin:'0 0 .5rem',
              fontWeight: 700,
              fontSize: '1.3rem',
              color: '#1e293b'
            }}>{uni.university}</h2>
            <div style={{fontSize:'.95rem', color:'#64748b', marginBottom:'.5rem'}}>
              {uni.type} University, {uni.state}
            </div>
            {uni.scholarships && uni.scholarships.length > 0 && (
              <>
                <h3 style={{margin:'1rem 0 .5rem', fontSize:'1.1rem', color:'#2563eb'}}>University Scholarships</h3>
                <ul>
                  {uni.scholarships.map((s: any, i: number) => (
                    <li
                      key={s.scholarship_name + i}
                      style={{
                        marginBottom: '.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '.6rem',
                        transition: 'color .18s'
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#fbbf24')}
                      onMouseLeave={e => (e.currentTarget.style.color = '')}
                    >
                      <span style={{fontSize:'1.1em'}}>💰</span>
                      <span>
                        <strong>{s.scholarship_name}</strong> — {s.value} ({s.level})<br />
                        <span style={{fontSize:'.85em', color:'#475569'}}>{s.notes}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {uni.common_programs && uni.common_programs.length > 0 && (
              <>
                <h3 style={{margin:'1rem 0 .5rem', fontSize:'1.1rem', color:'#2563eb'}}>Common National/External Scholarships</h3>
                <ul>
                  {uni.common_programs.map((s: any, i: number) => (
                    <li
                      key={s.scholarship_name + i}
                      style={{
                        marginBottom: '.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '.6rem',
                        transition: 'color .18s'
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#2563eb')}
                      onMouseLeave={e => (e.currentTarget.style.color = '')}
                    >
                      <span style={{fontSize:'1.1em'}}>🏦</span>
                      <span>
                        <strong>{s.scholarship_name}</strong> — {s.value} ({s.level})<br />
                        <span style={{fontSize:'.85em', color:'#475569'}}>{s.notes}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Why Our Funding Services Rock */}
      <section
        style={{
          margin: '0 auto 2.5rem auto',
          padding: '2.2rem 1.5rem',
          background: 'linear-gradient(90deg,#fff 0%,#e0c3fc 100%)',
          borderRadius: 20,
          boxShadow: '0 2px 16px #9F7AEA11',
          color: '#1e293b',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2.5rem',
          alignItems: 'flex-start'
        }}
      >
        <div style={{ flex: 1, minWidth: 240, alignSelf: 'flex-start' }}>
          <div
            style={{
              fontWeight: 900,
              fontSize: '1.35rem',
              letterSpacing: '-0.03em',
              background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1.2rem'
            }}
          >
            Why Our Funding Services Rock
          </div>
          <div style={{
            display: 'grid',
            gap: '1.1rem',
            gridTemplateColumns: '1fr',
            marginTop: '.5rem'
          }}>
            <div style={{
              background: 'linear-gradient(90deg,#fff 0%,#e0c3fc 100%)',
              borderRadius: 14,
              boxShadow: '0 2px 8px #9F7AEA22',
              padding: '1.1rem 1.2rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1.1rem'
            }}>
              <div style={{
                width: 38,
                height: 38,
                background: 'linear-gradient(135deg,#5727A3 0%,#9F7AEA 100%)',
                color: '#fff',
                fontWeight: 800,
                fontSize: '1.18rem',
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px -2px #9F7AEA33',
                flexShrink: 0
              }}>1</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.08rem', color: '#5727A3' }}>Transparent &amp; Student-Friendly</div>
                <div style={{ color: '#1B0044', fontWeight: 500, fontSize: '1rem', marginTop: 4 }}>
                  No confusing jargon, no hidden fees.
                </div>
              </div>
            </div>
            <div style={{
              background: 'linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(254 249 238) 20%, rgb(224, 231, 255) 100%)',
              borderRadius: 14,
              boxShadow: '0 2px 8px #fbbf2411',
              padding: '1.1rem 1.2rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1.1rem'
            }}>
              <div style={{
                width: 38,
                height: 38,
                background: 'linear-gradient(135deg,#fbbf24 0%,#f59e42 100%)',
                color: '#fff',
                fontWeight: 800,
                fontSize: '1.18rem',
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px -2px #fbbf2433',
                flexShrink: 0
              }}>2</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.08rem', color: '#5727A3' }}>Third-Party Loan Partner</div>
                <div style={{ color: '#1B0044', fontWeight: 500, fontSize: '1rem', marginTop: 4 }}>
                  Secure, reliable, and tailored for international students.
                </div>
              </div>
            </div>
            <div style={{
              background: 'linear-gradient(90deg,#fff 0%,#22c55e22 100%)',
              borderRadius: 14,
              boxShadow: '0 2px 8px #22c55e22',
              padding: '1.1rem 1.2rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1.1rem'
            }}>
              <div style={{
                width: 38,
                height: 38,
                background: 'linear-gradient(135deg,#22c55e 0%,#4ade80 100%)',
                color: '#fff',
                fontWeight: 800,
                fontSize: '1.18rem',
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px -2px #22c55e33',
                flexShrink: 0
              }}>3</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.08rem', color: '#22c55e' }}>Peer-Powered Insights</div>
                <div style={{ color: '#1B0044', fontWeight: 500, fontSize: '1rem', marginTop: 4 }}>
                  Real tips from students who’ve been there.
                </div>
              </div>
            </div>
          </div>
          <blockquote style={{
            background: '#f1f5fd',
            borderLeft: '4px solid #9F7AEA',
            borderRadius: 12,
            padding: '1.2rem 1.7rem',
            fontStyle: 'italic',
            color: '#5727A3',
            margin: '1.2rem 0 0 0',
            textAlign: 'center',
            fontSize: '1.08rem'
          }}>
            “I was stressed about paying for my course abroad, but Your Next University guided me through loans and scholarships. The process was fast and easy thanks to their partnered loan provider!”<br />
            <span style={{fontWeight: 700, color: '#9F7AEA'}}>– Student Ambassador</span>
          </blockquote>
        </div>
      </section>
      
    </main>
  );
};
