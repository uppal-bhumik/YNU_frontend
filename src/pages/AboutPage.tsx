import React, { useEffect, useRef, useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';

// Custom 3D Globe Component (simple animated sphere with world map texture)
const Globe: React.FC = () => (
  <Float speed={2} rotationIntensity={1.2} floatIntensity={1.5}>
    <mesh>
      <sphereGeometry args={[1.6, 64, 64]} />
      <meshStandardMaterial
        color="#2D6A7A"
        roughness={0.5}
        metalness={0.2}
      // Optionally, add a world map texture here for more realism
      />
    </mesh>
    <ambientLight intensity={0.7} />
    <directionalLight position={[5, 5, 5]} intensity={0.7} />
  </Float>
);

const CountUp: React.FC<{ value: number; duration?: number; suffix?: string; label: string }> = ({ value, duration = 1400, suffix = '', label }) => {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const animate = (t: number) => {
            const prog = Math.min(1, (t - start) / duration);
            setDisplay(Math.round(value * prog));
            if (prog < 1) requestAnimationFrame(animate); else setDisplay(value);
          };
          requestAnimationFrame(animate);
          obs.disconnect();
        }
      });
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, duration]);
  return (
    <div ref={ref} className="about-counter" aria-label={label} title={label}>
      <strong>{display.toLocaleString()}{display === value ? suffix : ''}</strong>
      <span>{label}</span>
    </div>
  );
};

// Enhanced Feature3DCard: image fills top half, text is always visible, card is interactive and visually balanced
const Feature3DCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  desc: string;
  to: string;
}> = ({ icon, title, desc, to }) => {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);

  // Parallax tilt effect
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      card.style.transform = `rotateY(${x / 18}deg) rotateX(${-y / 18}deg) scale(1.045)`;
      card.style.boxShadow = '0 16px 48px 0 #2D6A7A33, 0 2px 8px 0 #5A9AAA22';
    };
    const handleMouseLeave = () => {
      card.style.transform = '';
      card.style.boxShadow = '0 4px 24px 0 #2D6A7A22';
    };
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      tabIndex={0}
      onClick={() => navigate(to)}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') navigate(to); }}
      style={{
        background: 'rgba(255,255,255,0.92)',
        borderRadius: '1.7rem',
        boxShadow: '0 4px 24px 0 #2D6A7A22',
        padding: 0,
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'transform 0.18s cubic-bezier(.4,2,.6,1), box-shadow 0.18s cubic-bezier(.4,2,.6,1)',
        outline: 'none',
        willChange: 'transform',
        userSelect: 'none',
        height: 320,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        position: 'relative',
        border: '2.5px solid rgba(74, 138, 154, 0.13)',
        backdropFilter: 'blur(7px) saturate(1.2)',
        WebkitBackdropFilter: 'blur(7px) saturate(1.2)',
      }}
      onFocus={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 48px 0 #2D6A7A33, 0 2px 8px 0 #5A9AAA22';
        (e.currentTarget as HTMLElement).style.transform = 'scale(1.045)';
        (e.currentTarget as HTMLElement).style.border = '2.5px solid #2D6A7A55';
      }}
      onBlur={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px 0 #2D6A7A22';
        (e.currentTarget as HTMLElement).style.transform = '';
        (e.currentTarget as HTMLElement).style.border = '2.5px solid rgba(74, 138, 154, 0.13)';
      }}
      aria-label={title}
    >
      {/* Top image area */}
      <div
        style={{
          width: '100%',
          height: 250,
          background: '#e0e7ff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderTopLeftRadius: '1.7rem',
          borderTopRightRadius: '1.7rem',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Ensure icon is always an image that fills the area */}
        {React.isValidElement(icon) && icon.type === 'img'
          ? React.cloneElement(icon, {
            style: {
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 0,
              display: 'block'
            }
          })
          : icon}
        {/* Subtle overlay for 3D effect */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg,rgba(90, 154, 170, 0.07) 0%,rgba(45, 106, 122, 0.04) 100%)',
          pointerEvents: 'none'
        }} />
      </div>
      {/* Content area */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '1.1rem 1.1rem 1.1rem 1.1rem',
        background: 'transparent'
      }}>
        <h3 style={{
          fontSize: '1.18rem',
          fontWeight: 700,
          color: '#1A3A4A',
          marginBottom: '.6rem',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>{title}</h3>
        <p style={{
          fontSize: '1.01rem',
          color: '#334155',
          fontWeight: 500,
          margin: 0,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical'
        }}>{desc}</p>
      </div>
      {/* Animated arrow on hover/focus */}
      <span
        className="feature-arrow"
        style={{
          position: 'absolute',
          right: 24,
          bottom: 18,
          opacity: 0,
          transition: 'opacity 0.18s cubic-bezier(.4,2,.6,1), transform 0.18s cubic-bezier(.4,2,.6,1)',
          fontSize: 22,
          color: '#2D6A7A',
          zIndex: 3,
          pointerEvents: 'none'
        }}
      >→</span>
      <style>{`
        .feature-card-hover .feature-arrow,
        .feature-card:focus .feature-arrow {
          opacity: 1 !important;
          transform: translateX(6px);
        }
      `}</style>
    </div>
  );
};

// Features with image icons, ensure images are displayed properly in the card
const features = [
  {
    icon: (
      <img
        src="https://pub-e63ee2f49d7e4f94b98011a5350eea0f.r2.dev/school_photos/original/101521_CampusScenes_05_-1.jpg"
        alt="Explore Universities"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: 18,
          display: 'block'
        }}
      />
    ),
    title: 'Explore Universities',
    desc: "Explore universities across 8+ countries, like you’re shopping for your dream course.",
    to: '/universities'
  },
  {
    icon: (
      <img
        src="https://pub-e63ee2f49d7e4f94b98011a5350eea0f.r2.dev/school_photos/original/Screenshot%202025-08-26%20at%201.15.52%E2%80%AFPM.png"
        alt="Book Mentors"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: 18,
          display: 'block'
        }}
      />
    ),
    title: 'Peer Coun',
    desc: "Book real students and alumni as mentors—people who’ve lived the journey, not just sold it.",
    to: '/services/peer-counselling'
  },
  {
    icon: (
      <img
        src="https://pub-e63ee2f49d7e4f94b98011a5350eea0f.r2.dev/school_photos/original/1_-_LakeheadU_Simcoe_Hall_Orillia_Campus.jpg"
        alt="Verified Housing"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: 18,
          display: 'block'
        }}
      />
    ),
    title: 'Verified Housing',
    desc: "Secure verified housing before you even board the flight.",
    to: '/accommodation'
  },
  {
    icon: (
      <img
        src="https://pub-e63ee2f49d7e4f94b98011a5350eea0f.r2.dev/school_photos/original/image-from-rawpixel-id-17439769-jpeg.jpg"
        alt="Scholarships & Loans"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: 18,
          display: 'block'
        }}
      />
    ),
    title: 'Scholarships & Loans',
    desc: "Compare loans, find scholarships, and manage your finances smartly.",
    to: '/financial-services'
  }
];

// Animated "3D" Globe Image (as before)
const AnimatedGlobeImage: React.FC = () => {
  const globeRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    let frame = 0;
    let raf: number;
    const animate = () => {
      frame++;
      const y = Math.sin(frame * 0.025) * 10;
      const scale = 1 + Math.sin(frame * 0.018) * 0.07;
      if (globeRef.current) {
        globeRef.current.style.transform = `translateY(${y}px) scale(${scale})`;
        globeRef.current.style.transition = 'transform 0.12s cubic-bezier(.4,2,.6,1)';
      }
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <img
      ref={globeRef}
      src="https://pub-e63ee2f49d7e4f94b98011a5350eea0f.r2.dev/Adobe%20Express%20-%20file.png"
      alt="Dreaming of Abroad"
      style={{
        width: 110,
        height: 110,
        objectFit: 'contain',
        position: 'absolute',
        left: 380,
        top: 0,
        zIndex: 3,
        filter: 'drop-shadow(0 4px 16px #2D6A7A22)',
        willChange: 'transform',
        pointerEvents: 'none'
      }}
    />
  );
};

const DottedLine: React.FC = () => {
  const startX = 350; // just right of girl's head
  const startY = 100; // near top of girl's head
  const endX = 400;   // left edge of globe
  const endY = 50;    // center-top of globe
  const cpx = (startX + endX) / 2 + 10;
  const cpy = startY - 70;

  return (
    <svg
      width={endX - startX + 40}
      height={startY - endY + 40}
      style={{
        position: 'absolute',
        left: startX,
        top: endY - 20,
        zIndex: 4,
        pointerEvents: 'none'
      }}
    >
      <path
        d={`M0,${startY - endY + 20} Q${(endX - startX) / 2 + 5},${cpy - endY + 20} ${endX - startX},10`}
        stroke="#2D6A7A"
        strokeWidth={3}
        fill="none"
        strokeDasharray="8,10"
        opacity={0.7}
      />
    </svg>
  );
};

export const AboutPage: React.FC = () => {
  const aboutRef = useReveal();

  return (
    <main
      className="page container about"
      ref={aboutRef as any}
      style={{
        fontFamily: 'Inter, Roboto, Arial, sans-serif',
        background: '#F8FAFC',
        color: '#0F2A36',
        minHeight: '100vh',
        padding: 0,
        margin: 0,
        width: '100vw',
        maxWidth: '100vw',
        boxSizing: 'border-box',
        overflowX: 'hidden',
        paddingTop: '0', // Full bleed
      }}
    >
      {/* Dark Hero Section */}
      <section style={{
        width: '100%',
        background: 'linear-gradient(135deg, #0F172A 0%, #1A3A4A 100%)', // Dark Graphite
        padding: '140px 1.5rem 80px 1.5rem',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Decor */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '60%',
          height: '100%',
          background: 'radial-gradient(circle at 70% 30%, rgba(45, 106, 122, 0.15), transparent 60%)',
          pointerEvents: 'none'
        }} />

        <div style={{
          maxWidth: 1200,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '4rem',
          flexWrap: 'wrap',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{ flex: 1, minWidth: 320 }}>
            <h1
              style={{
                fontSize: '3.5rem',
                fontWeight: 900,
                color: '#fff',
                marginBottom: '1.5rem',
                letterSpacing: '-2px',
                lineHeight: 1.1,
              }}
            >
              Our Story:{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg, #4A8A9A 0%, #D0E8EC 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                The Amazon for Studying Abroad
              </span>
            </h1>

            <p
              style={{
                fontSize: '1.2rem',
                color: '#CBD5E1', // Light slate
                fontWeight: 500,
                marginBottom: '1.5rem',
                lineHeight: 1.6
              }}
            >
              We didn’t build <b style={{ color: '#fff' }}>Your Next University</b> because we wanted to be another consultancy.
              We built it because we got tired of watching students get lost in a system full of
              half-truths, hidden costs, and overhyped promises.
            </p>

            <p
              style={{
                fontSize: '1.2rem',
                color: '#CBD5E1',
                fontWeight: 500,
                marginBottom: '1.5rem',
                lineHeight: 1.6
              }}
            >
              We’ve sat in the university offices. We’ve worked as official representatives for many
              international universities. We’ve seen firsthand how students are pushed into courses they
              don’t need, charged for services they never asked for, and left clueless once they land
              abroad.
            </p>

            <p
              style={{
                fontSize: '1.2rem',
                color: '#CBD5E1',
                fontWeight: 500,
                marginBottom: '1.2rem',
                lineHeight: 1.6
              }}
            >
              <b>Your Next University</b> was founded by{' '}
              <b style={{ color: '#4A8A9A' }}>Rohan Thakur</b> – International Admissions, Australia
              (worked with multiple <b>QS Top 100</b> universities), and{' '}
              <b style={{ color: '#4A8A9A' }}>Nirmal Gautam</b> – Admissions, University of Wollongong,
              Ex–Central Queensland University. Together, they’ve helped hundreds of students build
              transparent, affordable, and successful global education journeys.
            </p>
          </div>

          <div style={{ flex: 1, minWidth: 320, textAlign: 'center', position: 'relative', minHeight: 420 }}>
            {/* Radiant effect behind the girl */}
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: 380,
                height: 380,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(74, 138, 154, 0.2) 0%, transparent 70%)',
                filter: 'blur(30px)',
                zIndex: 0,
                pointerEvents: 'none'
              }}
            />
            {/* Girl image */}
            <img
              src="https://pub-e63ee2f49d7e4f94b98011a5350eea0f.r2.dev/image-from-rawpixel-id-15542441-png.png"
              alt="Thinking Girl"
              style={{
                width: 340,
                height: 'auto',
                objectFit: 'contain',
                borderRadius: 32,
                margin: '0 auto',
                display: 'block',
                position: 'relative',
                zIndex: 2,
                filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))'
              }}
            />
          </div>
        </div>
      </section>

      {/* Enhanced Interactive Features Section */}
      <section style={{
        maxWidth: 1200,
        margin: '2.5rem auto 0 auto',
        padding: '2.5rem 1.5rem',
        background: 'linear-gradient(90deg,#D0E8EC 0%,#4A8A9A11 100%)',
        borderRadius: '2.2rem',
        boxShadow: '0 4px 24px 0 #1A3A4A22',
        position: 'relative',
        overflow: 'visible'
      }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: '2.1rem',
          fontWeight: 800,
          color: '#1A3A4A',
          marginBottom: '2.2rem'
        }}>
          Not a Consultancy—A Marketplace
        </h2>
        <p style={{
          fontSize: '1.13rem',
          color: '#1A3A4A',
          fontWeight: 500,
          marginBottom: '1.2rem',
          textAlign: 'center'
        }}>
          <b style={{ color: '#1A3A4A' }}>Your Next University</b> is not a consultancy—it’s a <span style={{ color: '#1A3A4A', fontWeight: 700 }}>marketplace</span>. Think of us as the <b style={{ color: '#1A3A4A' }}>Amazon for studying abroad</b>.
        </p>
        <div
          className="about-features-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '2.5rem',
            alignItems: 'stretch',
            width: '100%',
            position: 'relative',
            color: '#1A3A4A'
          }}
        >
          {features.map((f, i) => (
            <Feature3DCard key={f.title} {...f} />
          ))}
        </div>
        {/* Decorative animated gradient line below cards */}
        <div
          style={{
            position: 'absolute',
            left: 40,
            right: 40,
            bottom: 18,
            height: 6,
            borderRadius: 4,
            background: 'linear-gradient(90deg,#5A9AAA 0%,#2D6A7A 100%)',
            opacity: 0.13,
            filter: 'blur(2px)'
          }}
        />
        <style>{`
          @media (max-width: 700px) {
            .about-features-grid {
              grid-template-columns: 1fr !important;
              gap: 1.5rem !important;
            }
          }
        `}</style>
      </section>

      {/* Dark Stats Section - Visual Rhythm Break */}
      <section
        style={{
          width: '100vw',
          background: 'linear-gradient(135deg, #0F172A 0%, #1A3A4A 100%)',
          padding: '4rem 1.5rem',
          margin: '2.5rem 0 0 0',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Decorative glow */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '30%',
          transform: 'translate(-50%, -50%)',
          width: 300,
          height: 300,
          background: 'radial-gradient(circle, rgba(45, 106, 122, 0.25) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          top: '50%',
          right: '10%',
          transform: 'translateY(-50%)',
          width: 200,
          height: 200,
          background: 'radial-gradient(circle, rgba(74, 138, 154, 0.2) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{
          maxWidth: 1100,
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 900,
            color: '#fff',
            marginBottom: '2.5rem',
            letterSpacing: '-1px'
          }}>
            Trusted By Students Worldwide
          </h2>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '4rem',
            flexWrap: 'wrap'
          }}>
            <div style={{ textAlign: 'center' }}>
              <strong style={{
                fontSize: '2.5rem',
                fontWeight: 900,
                background: 'linear-gradient(90deg, #4A8A9A 0%, #5A9AAA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'block'
              }}>800+</strong>
              <span style={{ color: '#CBD5E1', fontWeight: 500, fontSize: '0.95rem' }}>Partner Universities</span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <strong style={{
                fontSize: '2.5rem',
                fontWeight: 900,
                background: 'linear-gradient(90deg, #4A8A9A 0%, #5A9AAA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'block'
              }}>8+</strong>
              <span style={{ color: '#CBD5E1', fontWeight: 500, fontSize: '0.95rem' }}>Countries Covered</span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <strong style={{
                fontSize: '2.5rem',
                fontWeight: 900,
                background: 'linear-gradient(90deg, #4A8A9A 0%, #5A9AAA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'block'
              }}>3000+</strong>
              <span style={{ color: '#CBD5E1', fontWeight: 500, fontSize: '0.95rem' }}>Students Helped</span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <strong style={{
                fontSize: '2.5rem',
                fontWeight: 900,
                background: 'linear-gradient(90deg, #4A8A9A 0%, #5A9AAA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'block'
              }}>₹0</strong>
              <span style={{ color: '#CBD5E1', fontWeight: 500, fontSize: '0.95rem' }}>Hidden Fees</span>
            </div>
          </div>
        </div>
      </section>

      {/* Promise Section */}
      <section
        style={{
          width: '100vw',
          margin: '2.5rem 0 0 0',
          padding: '0',
          color: '#1A3A4A',
          textAlign: 'center',
          borderRadius: 0,
          fontWeight: 600,
          position: 'relative',
        }}
      >
        {/* Decorative gradient border and subtle background effect */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.5,
            zIndex: 0,
            pointerEvents: 'none'
          }}
        />
        <div style={{
          margin: '0 auto',
          padding: '0 1.5rem',
        }}>
          <h2 style={{
            fontSize: '2.1rem',
            fontWeight: 900,
            marginBottom: '1.1rem',
            letterSpacing: '-1px',
            color: '#1A3A4A',
            background: 'linear-gradient(90deg,#1A3A4A 0%,#4A8A9A 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 2px 16px #4A8A9A22',
            lineHeight: 1.13,
            display: 'inline-block',
            padding: '0.2em 0.7em',
            borderRadius: 18,
            boxShadow: '0 2px 12px #4A8A9A22'
          }}>
            No Packages. No Pressure. No Sales Pitch.
          </h2>
          <p style={{
            fontSize: '1.18rem',
            fontWeight: 500,
            marginBottom: '1.2rem',
            color: '#1A3A4A',
            lineHeight: 1.7,
            textShadow: '0 1px 2px #fff8'
          }}>
            Just <span style={{ color: '#1A3A4A', fontWeight: 700 }}>choice</span>, <span style={{ color: '#1A3A4A', fontWeight: 700 }}>clarity</span>, and <span style={{ color: '#1A3A4A', fontWeight: 700 }}>control</span>.<br />
            We built this for the students who value honesty over hype, who want to learn from people who’ve actually been there, done that, and who want studying abroad to feel as easy as adding items to a cart.
          </p>
          <p style={{
            fontSize: '1.18rem',
            color: '#4A8A9A',
            fontWeight: 700,
            margin: '1.2rem 0 0 0',
            textShadow: '0 1px 2px #fff8'
          }}>
            We’re not here to “sell” you a dream. We’re here to help you <span style={{ textDecoration: 'underline', color: '#1A3A4A' }}>live it</span>.
          </p>
        </div>
      </section>

      {/* Enhanced Short Bio Section */}
      <section
        style={{
          maxWidth: 700,
          margin: '2.5rem auto 10px auto',
          padding: '2.8rem 2rem 2.8rem 2rem',
          background: '#fff',
          borderRadius: '2rem',
          boxShadow: '0 12px 48px 0 #1A3A4A22, 0 4px 16px 0 #4A8A9A22',
          color: '#1A3A4A',
          textAlign: 'center',
          fontWeight: 600,
          fontSize: '1.13rem',
          letterSpacing: '-0.5px',
          position: 'relative',
          overflow: 'visible',
          border: '2px solid #D0E8EC',
        }}
      >
        {/* 3D Pushpin SVG at top-left corner - tilted for realism */}
        <div
          style={{
            position: 'absolute',
            top: -18,
            left: 24,
            zIndex: 10,
            transform: 'rotate(-15deg)',
            transformOrigin: 'center bottom',
            filter: 'drop-shadow(3px 5px 8px rgba(0,0,0,0.35))',
          }}
        >
          <svg width="36" height="52" viewBox="0 0 36 52" fill="none">
            {/* Pin head - 3D sphere effect */}
            <defs>
              <radialGradient id="pinHead" cx="30%" cy="30%" r="65%">
                <stop offset="0%" stopColor="#ff6b6b" />
                <stop offset="40%" stopColor="#ef4444" />
                <stop offset="70%" stopColor="#dc2626" />
                <stop offset="100%" stopColor="#7f1d1d" />
              </radialGradient>
              <linearGradient id="pinNeedle" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e5e7eb" />
                <stop offset="30%" stopColor="#d1d5db" />
                <stop offset="70%" stopColor="#9ca3af" />
                <stop offset="100%" stopColor="#4b5563" />
              </linearGradient>
            </defs>
            {/* Pin needle - pointed */}
            <path d="M18 24L16 50L18 52L20 50L18 24Z" fill="url(#pinNeedle)" />
            {/* Pin head sphere */}
            <circle cx="18" cy="14" r="13" fill="url(#pinHead)" />
            {/* Main highlight on sphere */}
            <ellipse cx="13" cy="9" rx="5" ry="4" fill="rgba(255,255,255,0.5)" />
            {/* Secondary small highlight */}
            <circle cx="10" cy="7" r="2" fill="rgba(255,255,255,0.7)" />
          </svg>
        </div>

        {/* Animated title with glow */}
        <div style={{
          zIndex: 2,
          position: 'relative',
          marginBottom: '1.2rem',
        }}>
          <span style={{
            display: 'inline-block',
            fontSize: '1.4rem',
            fontWeight: 800,
            letterSpacing: '-1px',
            background: 'linear-gradient(90deg, #1A3A4A 0%, #4A8A9A 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            position: 'relative',
            padding: '0.3rem 0.8rem',
            borderRadius: '12px',
          }}>
            We're <b>Your Next University</b> — the Amazon for Studying Abroad.
          </span>
        </div>

        {/* Dark content box */}
        <div style={{
          zIndex: 2,
          position: 'relative',
          background: 'linear-gradient(135deg, #1A3A4A 0%, #2D6A7A 100%)',
          borderRadius: '16px',
          padding: '1.4rem 1.5rem',
          boxShadow: '0 8px 32px 0 rgba(26, 58, 74, 0.3)',
          border: '1px solid rgba(208, 232, 236, 0.2)',
          margin: '0 0.5rem'
        }}>
          <p style={{
            margin: 0,
            color: '#fff',
            fontWeight: 500,
            fontSize: '1.13rem',
            lineHeight: 1.7,
          }}>
            Tired of overpriced packages, fake promises, and confusing agents? We give you <b style={{ color: '#7dd3e8', fontWeight: 700 }}>real students</b>, <b style={{ color: '#7dd3e8', fontWeight: 700 }}>verified housing</b>, <b style={{ color: '#7dd3e8', fontWeight: 700 }}>scholarships</b>, and guidance that actually works. Pick what you need. Skip the hype. Own your journey.
          </p>
        </div>

        {/* Decorative elements */}
        <div style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          width: 30,
          height: 30,
          background: 'radial-gradient(circle, #4A8A9A22 0%, transparent 70%)',
          borderRadius: '50%',
          zIndex: 1,
          pointerEvents: 'none'
        }} />
      </section>
    </main>
  );
};


