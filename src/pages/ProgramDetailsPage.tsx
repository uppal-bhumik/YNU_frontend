import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';

const labelize = (str: string) =>
  str
    .replace(/_/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());

export const ProgramDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const [programState, setProgramState] = useState<any>(location.state || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scholarships, setScholarships] = useState<any[]>([]);
  const [scholarshipLoading, setScholarshipLoading] = useState(false);
  const [scholarshipError, setScholarshipError] = useState<string | null>(null);
  const [descExpanded, setDescExpanded] = useState(false);

  // Destructure programState early so it's available for useEffect dependencies
  const {
    id: programId,
    attributes,
    program_basic,
    school_id,
    school,
    program,
    program_requirements,
  } = programState || {};

  useEffect(() => {
    // Try to get state from sessionStorage if opened in new tab
    if (!programState) {
      const params = new URLSearchParams(window.location.search);
      const stateKey = params.get('stateKey');
      if (stateKey) {
        const stateStr = sessionStorage.getItem(stateKey);
        if (stateStr) {
          setProgramState(JSON.parse(stateStr));
        }
      }
    }
    // If still no state, fetch from API using id
    if (!programState && id) {
      setLoading(true);
      setError(null);
      fetch(`https://studconnect-backend.onrender.com/api/programs/${id}`)
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch program details');
          return res.json();
        })
        .then(data => setProgramState(data))
        .catch(e => setError(e.message || 'Failed to load program details'))
        .finally(() => setLoading(false));
    }
    // eslint-disable-next-line
  }, [location.state, id]);

  // Fetch scholarships if program_basic.tags contains 'scholarships_available'
  useEffect(() => {
    const schoolId =
      program_basic?.school?.id ||
      program_basic?.school_id ||
      attributes?.school_id ||
      school_id;
    if (
      program_basic &&
      Array.isArray(program_basic.tags) &&
      program_basic.tags.includes('scholarships_available') &&
      schoolId
    ) {
      setScholarshipLoading(true);
      setScholarshipError(null);
      fetch(`https://studconnect-backend.onrender.com/scholarships/${schoolId}`)
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch scholarships');
          return res.json();
        })
        .then(data => setScholarships(Array.isArray(data) ? data : []))
        .catch(e => setScholarshipError(e.message || 'Failed to load scholarships'))
        .finally(() => setScholarshipLoading(false));
    }
    // eslint-disable-next-line
  }, [program_basic, attributes, school_id]);

  if (loading) {
    return (
      <main style={{ padding: '2rem', maxWidth: 700, margin: '0 auto', color: '#334155' }}>
        <h1 style={{ color: '#2563eb', fontWeight: 800, fontSize: '2rem' }}>Program Details</h1>
        <p>Loading program details...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main style={{ padding: '2rem', maxWidth: 700, margin: '0 auto', color: '#334155' }}>
        <h1 style={{ color: '#2563eb', fontWeight: 800, fontSize: '2rem' }}>Program Details</h1>
        <p>Error: {error}</p>
        <button
          style={{
            marginTop: '1.5rem',
            background: 'linear-gradient(90deg,#2563eb 0%,#60a5fa 100%)',
            color: '#fff',
            borderRadius: 10,
            padding: '.7rem 1.5rem',
            fontWeight: 700,
            fontSize: '1.08rem',
            border: 'none',
            boxShadow: '0 2px 8px #2563eb22',
            cursor: 'pointer'
          }}
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </main>
    );
  }

  if (!programId) {
    return (
      <main style={{ padding: '2rem', maxWidth: 700, margin: '0 auto', color: '#334155' }}>
        <h1 style={{ color: '#2563eb', fontWeight: 800, fontSize: '2rem' }}>Program Details</h1>
        <p>Sorry, program details are not available. Please go back and select a program.</p>
        <button
          style={{
            marginTop: '1.5rem',
            background: 'linear-gradient(90deg,#2563eb 0%,#60a5fa 100%)',
            color: '#fff',
            borderRadius: 10,
            padding: '.7rem 1.5rem',
            fontWeight: 700,
            fontSize: '1.08rem',
            border: 'none',
            boxShadow: '0 2px 8px #2563eb22',
            cursor: 'pointer'
          }}
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </main>
    );
  }

  const attrs = program_basic || attributes || {};
  const schoolObj = school || {};

  const logoUrl =
    schoolObj.logoThumbnailUrl ||
    (schoolObj.logo && (schoolObj.logo.url_thumbnail || schoolObj.logo.url)) ||
    '/placeholder.png';
  const flagUrl = schoolObj.flag || null;
  const schoolBanner =
    (schoolObj.banner && (schoolObj.banner.url || schoolObj.banner.url_thumbnail)) ||
    schoolObj.banner_url ||
    '';

  const universityName = schoolObj.name || '';
  const locationStr = [schoolObj.province || schoolObj.state, schoolObj.countryCode || schoolObj.country].filter(Boolean).join(', ');
  const campusCity = schoolObj.city || '';
  const tuitionFee =
    attrs.tuition
      ? `${attrs.currency === 'AUD' ? 'A$' : attrs.currency === 'USD' ? '$' : '£'}${attrs.tuition}${attrs.currency ? ' ' + attrs.currency : ''}`
      : attributes?.tuition
        ? `${attributes.currency === 'AUD' ? 'A$' : attributes.currency === 'USD' ? '$' : '£'}${attributes.tuition}${attributes.currency ? ' ' + attrs.currency : ''}`
        : 'N/A';
  const applicationFee =
    attrs.application_fee !== undefined
      ? (attrs.application_fee ? `${attrs.currency === 'AUD' ? 'A$' : attrs.currency === 'USD' ? '$' : '£'}${attrs.application_fee}` : 'Free')
      : attributes?.application_fee !== undefined
        ? (attributes.application_fee ? `${attributes.currency === 'AUD' ? 'A$' : attributes.currency === 'USD' ? '$' : '£'}${attributes.application_fee}` : 'Free')
        : 'Free';
  const duration =
    attrs.maxLength && attrs.minLength
      ? attrs.maxLength === attrs.minLength
        ? `${attrs.maxLength} months`
        : `${attrs.minLength} - ${attrs.maxLength} months`
      : attrs.duration || attributes?.length_breakdown || 'N/A';
  const programName = attrs.name || attributes?.name || '';
  const programLevel = attrs.programLevel || attrs.level || attributes?.level_text || '';
  const description = attributes?.description || attrs.description || '';
  const intakes = attrs.programIntakes || attributes?.programIntakes || [];
  const tags = attrs.tags || [];
  const metaTitle = attributes?.meta_title || '';
  const metaDesc = attributes?.meta_description || '';
  const metaKeywords = attributes?.meta_keywords || '';
  const deliveryMethod = attributes?.delivery_method || '';
  const lengthBreakdown = attributes?.length_breakdown || '';
  const updatedAt = attributes?.updated_at || '';
  const published = attributes?.published;
  const pgwpVisible = attributes?.pgwp_visible;
  const pgwpParticipating = attributes?.pgwp_participating;
  const bypassEligibility = attributes?.bypass_eligibility;
  const coopParticipating = attributes?.coop_participating;
  const programRank = attributes?.program_rank;
  const schoolAbout = schoolObj.about || '';
  const programDetails = program || {};
  const schoolFlag = schoolObj.flag || '';
  const schoolWebsite = schoolObj.website || '';
  const schoolEmail = schoolObj.email || '';
  const schoolPhone = schoolObj.phone || '';
  const schoolAddress = schoolObj.address || '';
  const schoolCountry = schoolObj.country || '';
  const schoolProvince = schoolObj.province || '';
  const schoolCity = schoolObj.city || '';
  const schoolPostalCode = schoolObj.postal_code || '';
  const schoolRank = schoolObj.school_rank;
  const schoolFounded = schoolObj.founded_in;
  const schoolType = schoolObj.institution_type;
  const schoolFacebook = schoolObj.facebook;
  const schoolLinkedin = schoolObj.linkedin;
  const schoolTwitter = schoolObj.twitter;
  const schoolLatitude = schoolObj.latitude;
  const schoolLongitude = schoolObj.longitude;
  const schoolVideo = schoolObj.video_link;
  const costOfLiving = schoolObj.cost_of_living;
  const totalStudents = schoolObj.total_number_of_students;
  const canWorkAndStudy = schoolObj.can_work_and_study;
  const conditionalAcceptance = schoolObj.conditional_acceptance;
  const conditionalAcceptanceText = schoolObj.conditional_acceptance_text;
  const tuitionDeposit = schoolObj.tuition_deposit;
  const currency = schoolObj.currency || attrs.currency || attributes?.currency || '';
  const programSlug = attrs.slug || attributes?.slug || '';

  // --- Helper for pretty field rows with better alignment and consistent text styles ---
  const PrettyField = ({ label, value }: { label: string; value: any }) =>
    value !== undefined && value !== null && value !== '' ? (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr',
          alignItems: 'center',
          padding: '.5rem 0',
          borderBottom: '1px solid #f1f5f9',
          gap: '1.2rem',
        }}
      >
        <span style={{
          color: '#64748b',
          fontWeight: 600,
          textAlign: 'left',
          whiteSpace: 'nowrap',
          fontSize: '1.05rem',
          lineHeight: '1.7'
        }}>{label}</span>
        <span style={{
          color: '#334155',
          fontWeight: 700,
          textAlign: 'right',
          wordBreak: 'break-word',
          fontSize: '1.05rem', // consistent font size for values
          lineHeight: '1.7'
        }}>{value}</span>
      </div>
    ) : null;

  // --- Social Media Icon Helper ---
  const SocialIcon = ({ type }: { type: string }) => {
    switch (type) {
      case 'facebook':
        return (
          <svg width="22" height="22" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#2563eb"/><path d="M18.5 17.5H21L21.5 14.5H18.5V13C18.5 12.17 18.5 11.5 19.5 11.5H21.5V9.02C21.338 8.993 20.675 8.93 19.964 8.93C17.928 8.93 16.5 10.09 16.5 12.36V14.5H14V17.5H16.5V24.5H18.5V17.5Z" fill="#fff"/></svg>
        );
      case 'linkedin':
        return (
          <svg width="22" height="22" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#2563eb"/><path d="M12.5 13.5H10V22H12.5V13.5ZM11.25 12.5C12.05 12.5 12.5 11.95 12.5 11.25C12.5 10.55 12.05 10 11.25 10C10.45 10 10 10.55 10 11.25C10 11.95 10.45 12.5 11.25 12.5ZM22 17.5C22 15.5 21.5 13.5 18.5 13.5C17.25 13.5 16.5 14.25 16.25 14.75V13.5H13.75V22H16.25V17.75C16.25 16.75 16.5 15.75 17.75 15.75C19 15.75 19 16.75 19 17.75V22H21.5V17.5H22Z" fill="#fff"/></svg>
        );
      case 'twitter':
        return (
          <svg width="22" height="22" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#2563eb"/><path d="M24 12.1C23.4 12.4 22.8 12.6 22.1 12.7C22.8 12.3 23.3 11.7 23.5 10.9C22.9 11.3 22.2 11.5 21.5 11.7C20.9 11.1 20 10.7 19.1 10.7C17.3 10.7 15.9 12.1 15.9 13.9C15.9 14.2 15.9 14.5 16 14.7C13.5 14.6 11.3 13.4 9.8 11.6C9.5 12.1 9.4 12.7 9.4 13.3C9.4 14.3 9.9 15.2 10.7 15.7C10.2 15.7 9.7 15.6 9.3 15.4C9.3 16.9 10.4 18.1 11.9 18.3C11.6 18.4 11.3 18.4 11 18.4C10.8 18.4 10.6 18.4 10.4 18.3C10.8 19.5 12 20.3 13.4 20.3C12.3 21.1 10.9 21.6 9.4 21.6C9.1 21.6 8.7 21.6 8.4 21.5C9.8 22.3 11.4 22.8 13.1 22.8C19.1 22.8 22.2 18.5 22.2 14.2C22.2 14.1 22.2 14 22.2 13.9C22.8 13.5 23.4 12.9 24 12.1Z" fill="#fff"/></svg>
        );
      default:
        return null;
    }
  };

  // --- Section Card ---
  const SectionCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <section
      style={{
        marginBottom: '2.2rem',
        background: 'linear-gradient(90deg,#D6C5F0 0%,#fff 100%)',
        borderRadius: 18,
        boxShadow: '0 2px 12px #9F7AEA11',
        padding: '1.5rem 2rem',
        border: '1.5px solid #D6C5F0'
      }}
    >
      <h2 style={{
        color: '#5727A3',
        fontWeight: 900,
        fontSize: '1.18rem',
        marginBottom: '1.1rem',
        letterSpacing: '.01em',
        background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        lineHeight: '1.3'
      }}>{title}</h2>
      <div style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>
        {children}
      </div>
    </section>
  );

  // Helper to render intake details with scores
  const IntakeCard = ({ intake }: { intake: any }) => (
    <div
      style={{
        background: 'linear-gradient(90deg,#D6C5F0 0%,#fff 100%)',
        borderRadius: 12,
        border: '1.5px solid #D6C5F0',
        boxShadow: '0 2px 8px #9F7AEA11',
        padding: '1rem 1.2rem',
        marginBottom: 14,
        minWidth: 0,
        fontSize: '1.05rem',
        lineHeight: '1.7'
      }}
    >
      <div style={{ fontWeight: 700, color: '#5727A3', fontSize: '1.08rem', marginBottom: 6 }}>
        {intake.startDate ? new Date(intake.startDate).toLocaleString('default', { month: 'short', year: 'numeric' }) : 'Intake'}
      </div>
      <PrettyField label="Open Date" value={intake.openDate ? new Date(intake.openDate).toLocaleDateString() : 'N/A'} />
      <PrettyField label="Deadline" value={intake.submissionDeadline ? new Date(intake.submissionDeadline).toLocaleDateString() : 'N/A'} />
      <PrettyField label="Overall Score" value={intake.overallScore?.value} />
      {Array.isArray(intake.scoreDetails) && intake.scoreDetails.length > 0 && (
        <div style={{ marginTop: 6 }}>
          <div style={{ color: '#64748b', fontWeight: 600, marginBottom: 2 }}>Score Details:</div>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', fontSize: '.98rem', color: '#334155' }}>
            {intake.scoreDetails.map((score: any, i: number) => (
              <li key={i} style={{ marginLeft: 0, marginBottom: 2 }}>
                <span style={{ fontWeight: 600 }}>{score.scoreTypeLabel}:</span>{' '}
                <span
                  style={{
                    color:
                      score.intent === 'positive'
                        ? '#16a34a'
                        : score.intent === 'warning'
                        ? '#eab308'
                        : score.intent === 'negative'
                        ? '#dc2626'
                        : score.intent === 'primary'
                        ? '#2563eb'
                        : score.intent === 'secondary'
                        ? '#64748b'
                        : '#334155',
                    fontWeight: 700,
                  }}
                >
                  {score.value}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  // --- Main Render ---
  return (
    <main
      style={{
        background: 'linear-gradient(90deg,#D6C5F0 0%,#fff 100%)',
        minHeight: '100vh',
        paddingBottom: '2rem',
        position: 'relative',
        zIndex: 1,
        overflow: 'hidden',
        fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
        paddingTop: '90px', // Add space for fixed header
      }}
    >
      {/* --- 3D/Glassmorphism/Animated Background Elements --- */}
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
        {/* Blurred glassy blobs */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            left: '-120px',
            width: 400,
            height: 400,
            background: 'radial-gradient(circle at 30% 30%, #D6C5F088 0%, #9F7AEA33 100%)',
            filter: 'blur(60px)',
            borderRadius: '50%',
            opacity: 0.7,
            animation: 'float1 12s ease-in-out infinite alternate'
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            right: '-100px',
            width: 320,
            height: 320,
            background: 'radial-gradient(circle at 70% 70%, #9F7AEA99 0%, #D6C5F033 100%)',
            filter: 'blur(60px)',
            borderRadius: '50%',
            opacity: 0.6,
            animation: 'float2 14s ease-in-out infinite alternate'
          }}
        />
        {/* 3D gradient ring */}
        <svg
          width="320"
          height="320"
          viewBox="0 0 320 320"
          style={{
            position: 'absolute',
            top: '60%',
            left: '-120px',
            opacity: 0.18,
            filter: 'blur(1.5px)',
            transform: 'rotate(-18deg)',
            animation: 'spin 24s linear infinite'
          }}
        >
          <defs>
            <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#5727A3" />
              <stop offset="100%" stopColor="#9F7AEA" />
            </linearGradient>
          </defs>
          <ellipse
            cx="160"
            cy="160"
            rx="120"
            ry="48"
            fill="none"
            stroke="url(#ring)"
            strokeWidth="18"
          />
        </svg>
        {/* Floating cubes */}
        <div
          style={{
            position: 'absolute',
            left: '60vw',
            top: '10vh',
            width: 60,
            height: 60,
            perspective: 200,
            opacity: 0.25,
            animation: 'cubeFloat 10s ease-in-out infinite alternate'
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg,#5727A3 60%,#9F7AEA 100%)',
              borderRadius: 12,
              boxShadow: '0 8px 32px #9F7AEA33',
              transform: 'rotateY(30deg) rotateX(20deg)'
            }}
          />
        </div>
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
            .program-section-title {
              font-size: 1.5rem;
              font-weight: 900;
              color: #5727A3;
              margin-bottom: 1.2rem;
              letter-spacing: 0.01em;
              text-shadow: 0 2px 8px #9F7AEA11;
            }
            .program-card-glass {
              background: linear-gradient(90deg,#D6C5F0 0%,#fff 100%);
              box-shadow: 0 8px 32px 0 #9F7AEA22, 0 1.5px 8px 0 #D6C5F022;
              border-radius: 2.2rem;
              border: 1.5px solid #D6C5F0;
            }
            .program-highlight {
              background: linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%);
              color: #fff;
              border-radius: 8px;
              padding: .3rem 1rem;
              font-weight: 700;
              font-size: 1.05rem;
              margin-right: .5rem;
              box-shadow: 0 2px 8px #9F7AEA22;
              display: inline-block;
            }
            .program-cta-btn {
              background: linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%);
              color: #fff;
              border-radius: 10px;
              padding: .7rem 2rem;
              font-weight: 700;
              fontSize: 1.13rem;
              border: none;
              box-shadow: 0 2px 8px #9F7AEA22;
              cursor: pointer;
              margin-top: 1.5rem;
              transition: background 0.2s, transform 0.2s;
            }
            .program-cta-btn:hover {
              background: linear-gradient(90deg,#9F7AEA 0%,#5727A3 100%);
              transform: scale(1.04);
            }
          `}
        </style>
      </div>
      {/* --- End 3D/Glassmorphism/Animated Background Elements --- */}

      <div
        className="program-card-glass"
        style={{
          margin: '2.5rem auto',
          borderRadius: '2.2rem',
          padding: 0,
          position: 'relative',
          zIndex: 2,
          maxWidth: 1200,
        }}
      >
        {/* Banner and Logo */}
        {schoolBanner && schoolBanner !== '/placeholder.png' && (
          <div style={{
            position: 'relative',
            width: '100%',
            height: 180,
            borderRadius: '2.2rem 2.2rem 0 0',
            marginBottom: 40,
            background: '#e0e7ef',
            padding: 0
          }}>
            <img
              src={schoolBanner}
              alt="School Banner"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
              onError={e => {
                if (
                  schoolObj.banner &&
                  schoolObj.banner.url_thumbnail &&
                  (e.currentTarget as HTMLImageElement).src !== schoolObj.banner.url_thumbnail
                ) {
                  (e.currentTarget as HTMLImageElement).src = schoolObj.banner.url_thumbnail;
                }
              }}
            />
            <div style={{
              position: 'absolute',
              left: 32,
              bottom: -36,
              background: '#fff',
              borderRadius: '50%',
              boxShadow: '0 2px 12px #2563eb22',
              width: 80,
              height: 80,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2.5px solid #e0e7ef'
            }}>
              <img
                src={logoUrl}
                alt={universityName}
                style={{ width: 64, height: 64, objectFit: 'contain', borderRadius: '50%' }}
              />
            </div>
          </div>
        )}

        {/* Main content wrapper with responsive padding */}
        <div
          style={{
            padding: '0 2.2rem 2.5rem 2.2rem',
            boxSizing: 'border-box',
            width: '100%',
            maxWidth: '100%',
          }}
        >
          {/* Responsive layout for main content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '2.5rem',
              alignItems: 'flex-start',
              marginTop: 24,
              flexWrap: 'wrap',
            }}
            className="program-details-flex"
          >
            {/* --- Left Column: About this Program + University Overview --- */}
            <div
              style={{
                flex: 1,
                minWidth: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
                maxWidth: '100%',
              }}
              className="program-details-left"
            >
              {/* Program Title & Tags */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h1 style={{
                  fontSize: '2.2rem',
                  fontWeight: 900,
                  color: '#5727A3',
                  marginBottom: '.5rem',
                  letterSpacing: '.01em',
                  background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>{programName}</h1>
                <div style={{ fontSize: '1.13rem', color: '#5727A3', fontWeight: 700, marginBottom: '1.1rem',
                  background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  {programLevel ? labelize(programLevel) : ''}
                </div>
                {tags && tags.length > 0 && (
                  <div style={{ marginBottom: '1rem', display: 'flex', gap: '.7rem', flexWrap: 'wrap' }}>
                    {tags.map((tag: string) => (
                      <span key={tag} className="program-highlight">{labelize(tag)}</span>
                    ))}
                  </div>
                )}
              </div>
              {/* About this Program */}
              <SectionCard title="About this Program">
                <div style={{ fontSize: '1.08rem', color: '#334155', lineHeight: 1.7 }}>
                  {description
                    ? <div dangerouslySetInnerHTML={{ __html: description }} />
                    : <span style={{ color: '#64748b' }}>No description available.</span>}
                </div>
              </SectionCard>
              {/* University Overview */}
              <SectionCard title="University Overview">
                <PrettyField label="University" value={universityName} />
                <PrettyField label="Location" value={locationStr} />
                <PrettyField label="City" value={schoolObj.city} />
                <PrettyField label="Type" value={schoolObj.institution_type} />
                <PrettyField label="Founded" value={schoolObj.founded_in} />
                <PrettyField label="Rank" value={schoolObj.school_rank} />
                <PrettyField label="Total Students" value={schoolObj.total_number_of_students} />
                <PrettyField label="International Students" value={schoolObj.number_of_international_students} />
                <PrettyField label="Can Work & Study" value={schoolObj.can_work_and_study !== undefined ? (schoolObj.can_work_and_study ? 'Yes' : 'No') : undefined} />
                <PrettyField label="Submission Through" value={schoolObj.submission_through} />
                <PrettyField label="Conditional Acceptance" value={schoolObj.conditional_acceptance !== undefined ? (schoolObj.conditional_acceptance ? 'Yes' : 'No') : undefined} />
                {schoolObj.conditional_acceptance_text && (
                  <div style={{ margin: '.5rem 0', color: '#64748b', fontSize: '.97rem' }}>
                    <b>Conditional Acceptance Info:</b> {schoolObj.conditional_acceptance_text}
                  </div>
                )}
                <PrettyField label="Email" value={schoolObj.email} />
                <PrettyField label="Phone" value={schoolObj.phone} />
                <PrettyField label="Website" value={schoolObj.website ? <a href={schoolObj.website} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>{schoolObj.website}</a> : undefined} />
                <div style={{ marginTop: 8, display: 'flex', gap: 16 }}>
                  {schoolObj.facebook && (
                    <a href={schoolObj.facebook} target="_blank" rel="noopener noreferrer" title="Facebook" style={{ display: 'inline-flex', alignItems: 'center' }}>
                      <SocialIcon type="facebook" />
                    </a>
                  )}
                  {schoolObj.linkedin && (
                    <a href={schoolObj.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn" style={{ display: 'inline-flex', alignItems: 'center' }}>
                      <SocialIcon type="linkedin" />
                    </a>
                  )}
                  {schoolObj.twitter && (
                    <a href={schoolObj.twitter} target="_blank" rel="noopener noreferrer" title="Twitter" style={{ display: 'inline-flex', alignItems: 'center' }}>
                      <SocialIcon type="twitter" />
                    </a>
                  )}
                </div>
              </SectionCard>
            </div>

            {/* --- Right Column: Program Fees + Program Details --- */}
            <div
              style={{
                flex: '0 0 340px',
                maxWidth: 340,
                minWidth: 260,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
              }}
              className="program-details-right"
            >
              {/* Program Fees */}
              <div
                className="MuiPaper-root MuiCard-root sc-cOFTSb cggQXi MuiPaper-outlined MuiPaper-rounded"
                style={{
                  border: '1px solid #e0e7ef',
                  borderRadius: 16,
                  boxShadow: '0 2px 8px #2563eb11',
                  background: '#f8fafc',
                  padding: '1.2rem 1.2rem 1.5rem 1.2rem',
                  width: '100%',
                  marginBottom: 0,
                }}
              >
                <div style={{
                  fontWeight: 700,
                  fontSize: '1.15rem',
                  color: '#5727A3',
                  marginBottom: 18,
                  textAlign: 'center',
                  background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Program Fees
                </div>
                <PrettyField label="Tuition (1st year)" value={tuitionFee} />
                <PrettyField label="Application Fee" value={applicationFee} />
                <PrettyField label="Cost of Living" value={costOfLiving ? `${currency === 'AUD' ? 'A$' : currency === 'USD' ? '$' : '£'}${costOfLiving} ${currency}` : 'N/A'} />
              </div>
              {/* Program Details */}
              <SectionCard title="Program Details">
                <PrettyField label="Duration" value={duration} />
                <PrettyField label="Length Breakdown" value={lengthBreakdown} />
                <PrettyField label="Degree Level" value={programLevel ? labelize(programLevel) : undefined} />
                <PrettyField label="Success Score" value={attrs.successScore?.label} />
                <PrettyField label="Delivery Method" value={deliveryMethod} />
                <PrettyField label="Intakes" value={intakes && intakes.length > 0 ? intakes.map((i: any) => i.startDate ? new Date(i.startDate).toLocaleString('default', { month: 'short', year: 'numeric' }) : '').join(', ') : 'N/A'} />
                <PrettyField label="Location" value={campusCity} />
                {/* Show intake cards with scores */}
                {intakes && intakes.length > 0 && (
                  <div style={{ marginTop: 14 }}>
                    <div style={{ color: '#5727A3', fontWeight: 700, marginBottom: 6 }}>Upcoming Intakes</div>
                    {intakes.map((intake: any) => (
                      <IntakeCard key={intake.id} intake={intake} />
                    ))}
                  </div>
                )}
              </SectionCard>
            </div>
          </div>
          {/* Scholarships */}
          {program_basic?.tags?.includes('scholarships_available') &&
            !scholarshipLoading &&
            !scholarshipError &&
            scholarships.length > 0 && (
              <SectionCard title="Scholarships">
                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                  {scholarships.map((sch: any, idx: number) => (
                    <div
                      key={sch.id || idx}
                      style={{
                        background: '#f8fafc',
                        borderRadius: 12,
                        boxShadow: '0 2px 8px #2563eb11',
                        border: '1px solid #e0e7ef',
                        padding: '1.1rem 1.3rem',
                        minWidth: 260,
                        maxWidth: 340,
                        flex: '1 1 260px',
                        marginBottom: 12
                      }}
                    >
                      <div style={{ fontWeight: 700, fontSize: '1.08rem', color: '#2563eb', marginBottom: 4 }}>{sch.title}</div>
                      <PrettyField label="Amount" value={`${sch.awardAmountCurrencySymbol || ''}${sch.awardAmountFrom}${sch.awardAmountTo ? ` - ${sch.awardAmountTo}` : ''} ${sch.awardAmountType ? sch.awardAmountType.replace('_', ' ') : ''}`} />
                      <PrettyField label="Eligible Levels" value={sch.eligibleLevels?.join(', ')} />
                      <PrettyField label="Eligible Nationalities" value={sch.eligibleNationalities?.join(', ')} />
                      {sch.sourceUrl && (
                        <div style={{ marginTop: 8 }}>
                          <a href={sch.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'underline' }}>
                            Learn more
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </SectionCard>
            )}
        </div>
      </div>
      {/* Floating scroll-to-top button */}
      <button
        style={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          zIndex: 50,
          background: 'linear-gradient(90deg,#2563eb 0%,#60a5fa 100%)',
          color: '#fff',
          border: 'none',
          borderRadius: '50%',
          width: 64,
          height: 64,
          boxShadow: '0 4px 24px #2563eb55',
          fontSize: '2rem',
          fontWeight: 900,
          cursor: 'pointer',
          transition: 'transform 0.2s',
          outline: 'none'
        }}
        title="Scroll to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.12)')}
        onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
      >
        ↑
      </button>

      {/* Disclaimer */}
      <div style={{
        margin: '2.5rem auto 1.5rem auto',
        maxWidth: 700,
        background: '#f8fafc',
        borderLeft: '4px solid #9F7AEA',
        borderRadius: 10,
        padding: '1rem 1.3rem',
        fontStyle: 'italic',
        color: '#5727A3',
        fontSize: '1.05rem',
        textAlign: 'center'
      }}>
        <b>Disclaimer:</b> These details might not be 100% correct as per current analytics. Please verify from the program's official website for the most updated and accurate information.
      </div>

      {/* Responsive styles */}
      <style>
        {`
          @media (max-width: 900px) {
            .program-details-flex {
              flex-direction: column;
              gap: 1.5rem !important;
            }
            .program-details-left,
            .program-details-right {
              max-width: 100% !important;
              min-width: 0 !important;
              width: 100% !important;
            }
            .MuiPaper-root.MuiCard-root {
              max-width: 100% !important;
            }
          }
          @media (max-width: 600px) {
            .program-card-glass {
              border-radius: 1.1rem !important;
              margin: 1rem 0 !important;
            }
            .program-details-flex {
              flex-direction: column !important;
              gap: 1.1rem !important;
            }
            .program-details-left,
            .program-details-right {
              max-width: 100% !important;
              min-width: 0 !important;
              width: 100% !important;
            }
            .MuiPaper-root.MuiCard-root {
              padding: 1rem !important;
              border-radius: 1rem !important;
            }
            .program-section-title {
              font-size: 1.2rem !important;
            }
            .program-highlight {
              font-size: .95rem !important;
              padding: .2rem .7rem !important;
            }
            .program-card-glass > div[style*="height: 180px"] {
              height: 120px !important;
            }
            .program-card-glass > div[style*="height: 240px"] {
              height: 120px !important;
            }
          }
        `}
      </style>
    </main>
  );
};

export default ProgramDetailsPage;
