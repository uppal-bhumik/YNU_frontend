import React from "react";
import { useNavigate } from "react-router-dom";

const sectionStyle: React.CSSProperties = {
  margin: '2.5rem auto',
  padding: '2.2rem 1.5rem 2.5rem 1.5rem',
  background: 'linear-gradient(90deg,#fff 0%,#D0E8EC 100%)',
  borderRadius: '1.5rem',
  boxShadow: '0 8px 32px 0 #4A8A9A11, 0 2px 8px 0 #D0E8EC11',
  color: '#0F2A36',
  fontSize: '1.08rem',
  lineHeight: 1.7,
  marginBottom: '2.5rem',
  width: '100%',
  boxSizing: 'border-box',
  position: 'relative',
  overflow: 'visible'
};

const PinGraphic: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <div style={{
    position: 'absolute',
    top: '-24px',
    left: '-14px', // Overlapping the corner
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
      <circle cx="16" cy="10" r="9" fill="url(#pinGradient)" />
      {/* Highlight */}
      <ellipse cx="13" cy="7" rx="3" ry="2" fill="white" fillOpacity="0.4" transform="rotate(-45 13 7)" />
      {/* Gradient Definition */}
      <defs>
        <radialGradient id="pinGradient" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(14 8) rotate(51.3402) scale(18.5742)">
          <stop stopColor="#FB7185" />
          <stop offset="1" stopColor="#E11D48" />
        </radialGradient>
      </defs>
    </svg>
  </div>
);

const stepData = [
  {
    title: "Initial Consultation",
    desc: "Understanding your goals, background, and preferred destination.",
    img: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=400&q=80" // student and counselor talking
  },
  {
    title: "University & Course Selection",
    desc: "Tailored recommendations from globally recognised institutions.",
    img: "https://pub-e63ee2f49d7e4f94b98011a5350eea0f.r2.dev/school_photos/original/53290107561_347528b3d3_k_-2.jpg" // university campus
  },
  {
    title: "Document Collection & Review",
    desc: "We check, format, and ensure everything is compliant.",
    img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80" // document review
  },
  {
    title: "Application Submission",
    desc: "We manage the process directly with institutions for faster results.",
    img: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80" // application submission
  },
  {
    title: "Offer Letter & Acceptance",
    desc: "Once successful, we assist with GTE/Genuine Intent statements if required.",
    img: "https://images.unsplash.com/photo-1517520287167-4bbf64a00d66?auto=format&fit=crop&w=400&q=80" // offer letter/acceptance
  },
  {
    title: "Visa Assistance & Pre-departure Support",
    desc: "Guidance for visa, travel, and settling in your new country.",
    img: "https://pub-e63ee2f49d7e4f94b98011a5350eea0f.r2.dev/school_photos/original/308597795_10159867060511195_7794074239140869476_n.jpg" // visa/travel
  }
];

const docList = [
  "Valid passport",
  "Academic transcripts & certificates (10th, 12th, Bachelor's, etc.)",
  "English language test results (IELTS/PTE/TOEFL/Duolingo)",
  "Statement of Purpose (SOP)",
  "Letters of Recommendation (LORs)",
  "CV/Resume",
  "Work experience documents (if applicable)",
  "Financial documents for visa purposes",
  "Portfolio (for creative courses)"
];

const checklist = [
  "Professionally formatted",
  "Free from missing or incorrect information",
  "Backed with strong supporting documents",
  "Submitted before deadlines",
  "Compliant with the institution's specific requirements"
];

const countryFlags = [
  { name: "Australia", url: "https://flagcdn.com/au.svg" },
  { name: "Canada", url: "https://flagcdn.com/ca.svg" },
  { name: "Germany", url: "https://flagcdn.com/de.svg" },
  { name: "United Kingdom", url: "https://flagcdn.com/gb.svg" },
  { name: "Ireland", url: "https://flagcdn.com/ie.svg" },
  { name: "Singapore", url: "https://flagcdn.com/sg.svg" }
];

const Section: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <section style={{ ...sectionStyle, ...style }}>{children}</section>
);

const StepCard: React.FC<{ step: number; title: string; desc: string; img: string; isDark?: boolean }> = ({ step, title, desc, img, isDark }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    marginBottom: '2.2rem',
    background: isDark ? 'linear-gradient(90deg, #1A3A4A 0%, #0F172A 100%)' : 'linear-gradient(90deg,#fff 0%,#D0E8EC 100%)',
    borderRadius: 18,
    boxShadow: isDark ? '0 4px 16px rgba(0,0,0,0.4)' : '0 2px 12px 0 #4A8A9A11',
    padding: '1.2rem 1.2rem 1.2rem 1.2rem',
    color: isDark ? '#fff' : '#0F2A36',
    border: isDark ? '1px solid rgba(255,255,255,0.1)' : 'none'
  }}>
    <img src={img} alt={title} style={{
      width: 80,
      height: 80,
      borderRadius: 12,
      objectFit: 'cover',
      boxShadow: '0 2px 8px #4A8A9A22'
    }} />
    <div>
      <div style={{
        fontWeight: 700,
        color: isDark ? '#4A8A9A' : '#1A3A4A',
        fontSize: '1.1rem',
        marginBottom: '.2rem'
      }}>Step {step}</div>
      <div style={{ fontWeight: 800, fontSize: '1.13rem', marginBottom: '.2rem', color: isDark ? '#fff' : '#1A3A4A' }}>{title}</div>
      <div style={{ color: isDark ? '#CBD5E1' : '#0F2A36', fontSize: '1.01rem' }}>{desc}</div>
    </div>
  </div>
);

const StudyApplication: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: 'radial-gradient(ellipse at 70% 0%, #D0E8EC 0%, #ffffffff 35%, #E8F4F6 70%, #fff 100%)',
        minHeight: '100vh',
        paddingBottom: '2rem',
        width: '100vw',
        boxSizing: 'border-box',
        overflowX: 'hidden',
        paddingTop: '90px', // Add space for fixed header
      }}
    >
      <div
        style={{
          margin: '0 auto',
          width: '100%',
          boxSizing: 'border-box',
          paddingLeft: 'max(16px, 4vw)',
          paddingRight: 'max(16px, 4vw)'
        }}
      >
        {/* Hero Section */}
        {/* Hero Section */}
        <Section style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #1A3A4A 100%)',
          textAlign: 'center',
          marginTop: '2.5rem',
          color: '#fff',
          boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5)'
        }}>
          <h1 style={{
            fontSize: '2.3rem',
            fontWeight: 900,
            color: '#fff',
            marginBottom: '1.2rem',
            letterSpacing: '-1px'
          }}>
            International Study Application Process
          </h1>
          <h2 style={{
            fontSize: '1.3rem',
            fontWeight: 800,
            color: '#4A8A9A',
            marginBottom: '1.1rem'
          }}>
            Error-Free Applications with Higher Success Rates
          </h2>
          <p style={{ fontSize: '1.13rem', color: '#CBD5E1', fontWeight: 500, marginBottom: '1.2rem' }}>
            Our experienced team ensures your application is accurate, complete, and strategically presented to meet each institution’s expectations. We guide you every step of the way — from selecting the right institution to submitting all required documents.
          </p>
          <div style={{ margin: '1.5rem 0 1rem 0', display: 'flex', justifyContent: 'center', gap: '1.2rem', flexWrap: 'wrap' }}>
            {countryFlags.map(flag => (
              <span key={flag.name} style={{ display: 'flex', alignItems: 'center', gap: '.5rem', fontWeight: 600, fontSize: '1.08rem', color: '#fff', background: 'rgba(255,255,255,0.1)', borderRadius: 8, padding: '.3rem 1rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                <img src={flag.url} alt={flag.name} style={{ width: 28, height: 18, borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }} />
                {flag.name}
              </span>
            ))}
          </div>
          <div style={{ fontSize: '1.08rem', color: '#94A3B8', marginTop: '1.2rem' }}>
            Whether you're applying for an undergraduate, postgraduate, diploma, or research program — we guide you every step of the way.
          </div>
        </Section>

        {/* Application Process Section */}
        <Section>
          <h2 style={{ color: '#1A3A4A', fontWeight: 800, fontSize: '1.25rem', marginBottom: '1.2rem' }}>Step-by-Step Application Process</h2>
          <div>
            {stepData.map((step, idx) => (
              <StepCard key={step.title} step={idx + 1} title={step.title} desc={step.desc} img={step.img} isDark={true} />
            ))}
          </div>
        </Section>

        {/* Required Documents Section */}
        <Section style={{ border: '3px solid #4A8A9A' }}>
          <PinGraphic />
          <h2 style={{ color: '#1A3A4A', fontWeight: 800, fontSize: '1.25rem', marginBottom: '.8rem' }}>Commonly Required Documents</h2>
          <ul style={{ marginLeft: '1.2rem', marginTop: '.7rem', color: '#0F2A36', fontSize: '1.08rem', fontWeight: 500 }}>
            {docList.map(doc => <li key={doc}>{doc}</li>)}
          </ul>
        </Section>

        {/* Error-Free Submission Section */}
        <Section style={{ border: '3px solid #4A8A9A' }}>
          <PinGraphic />
          <h2 style={{ color: '#1A3A4A', fontWeight: 800, fontSize: '1.25rem', marginBottom: '.8rem' }}>Error-Free Application Submission</h2>
          <p style={{ color: '#0F2A36', fontSize: '1.08rem', marginBottom: '.7rem' }}>
            Every year, thousands of applications are rejected due to small mistakes. We ensure your application is:
          </p>
          <ul style={{ marginLeft: '1.2rem', marginBottom: '1.2rem', color: '#0F2A36', fontSize: '1.08rem', fontWeight: 500 }}>
            {checklist.map(item => <li key={item}>{item}</li>)}
          </ul>
          <div style={{
            marginTop: '1.5rem',
            background: 'linear-gradient(90deg,#1A3A4A 0%,#4A8A9A 100%)',
            color: '#fff',
            borderRadius: 16,
            padding: '1.3rem 1.2rem',
            fontWeight: 700,
            textAlign: 'center',
            fontSize: '1.13rem',
            boxShadow: '0 2px 12px 0 #4A8A9A22',
            letterSpacing: '.01em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem'
          }}>
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10" fill="#fff" fillOpacity="0.13" />
              <path d="M7 13l3 3 7-7" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>
              Our <span style={{ color: '#fff', fontWeight: 800, textDecoration: 'underline' }}>zero-error policy</span> means your application is in the best possible shape before it’s even submitted.
            </span>
          </div>
        </Section>

        {/* Call to Action Section */}
        <Section
          style={{
            background: 'linear-gradient(90deg,#E8F4F6 0%,#D0E8EC 100%)',
            color: '#0F2A36',
            textAlign: 'center',
            fontWeight: 700,
            fontSize: '1.18rem',
            cursor: 'pointer',
            transition: 'box-shadow 0.18s, transform 0.18s',
            boxShadow: '0 4px 24px 0 #4A8A9A11, 0 2px 8px 0 #D0E8EC11',
            border: 'none',
            padding: 0
          }}
        >
          <div
            onClick={() => navigate('/contact')}
            tabIndex={0}
            role="button"
            aria-label="Contact us"
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2.2rem',
              width: '100%',
              minHeight: 180,
              outline: 'none',
              cursor: 'pointer',
              borderRadius: 24,
              padding: '1.7rem 1.2rem 1.7rem 1.2rem',
              boxShadow: '0 2px 12px 0 #e0e7ef',
              userSelect: 'none',
              position: 'relative',
              overflow: 'hidden',
              transition: 'transform 0.18s, box-shadow 0.18s'
            }}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') navigate('/contact');
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.025)';
              (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 40px 0 #4A8A9A, 0 2px 12px 0 #e0e7ef';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.transform = '';
              (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 12px 0 #e0e7ef';
            }}
          >
            {/* Decorative floating image */}
            <div style={{
              flex: '0 0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              marginTop: 24
            }}>
              <img
                src="https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=400&q=80"
                alt="Start your journey"
                style={{
                  width: 110,
                  height: 110,
                  borderRadius: 22,
                  objectFit: 'cover',
                  marginBottom: '0',
                  boxShadow: '0 4px 24px #e0e7ef, 0 2px 8px #4A8A9A22',
                  border: '4px solid #fff',
                  transition: 'box-shadow 0.18s'
                }}
              />
              {/* Animated ring */}
              <span style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: 130,
                height: 130,
                borderRadius: '50%',
                border: '3px dashed #4A8A9A',
                opacity: 0.13,
                transform: 'translate(-50%,-50%)',
                animation: 'spin 6s linear infinite'
              }} />
              <style>{`
                @keyframes spin {
                  0% { transform: translate(-50%,-50%) rotate(0deg);}
                  100% { transform: translate(-50%,-50%) rotate(360deg);}
                }
              `}</style>
            </div>
            {/* Text content */}
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              minWidth: 0,
              textAlign: 'left'
            }}>
              <div style={{
                fontSize: '1.55rem',
                fontWeight: 900,
                letterSpacing: '-1px',
                marginBottom: '.5rem',
                background: 'linear-gradient(90deg,#1A3A4A 0%,#4A8A9A 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1.1
              }}>
                Start your journey
              </div>
              <div style={{
                fontSize: '1.08rem',
                fontWeight: 600,
                color: '#0F2A36',
                marginBottom: '.4rem',
                lineHeight: 1.5,
                textShadow: '0 2px 8px #e0e7ef'
              }}>
                Contact us today for a <span style={{ color: '#1A3A4A', fontWeight: 700 }}>free counselling session</span> and start your global journey with confidence!
              </div>
              <span style={{
                marginTop: '.9rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '.6rem',
                fontWeight: 700,
                color: '#fff',
                fontSize: '1.13rem',
                background: 'linear-gradient(90deg,#1A3A4A 0%,#4A8A9A 100%)',
                borderRadius: 10,
                padding: '.6rem 1.5rem',
                boxShadow: '0 2px 8px #4A8A9A22',
                transition: 'background 0.18s'
              }}>
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Contact Us
              </span>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
};

export default StudyApplication;



