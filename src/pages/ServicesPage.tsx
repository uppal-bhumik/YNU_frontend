import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useApi } from '../hooks/useApi';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface Service { code:string; name:string; category:string; description:string }

const allServices = [
  {
    code: 'peer-counselling',
    name: 'Peer Counselling',
    desc: 'Talk to experienced counsellors and real international students for authentic guidance.',
    path: '/services/peer-counselling',
    img: 'https://pub-e63ee2f49d7e4f94b98011a5350eea0f.r2.dev/meeting-5395615_1920.jpg'
  },
  {
    code: 'accommodation-assistance',
    name: 'Accommodation Assistance',
    desc: 'Find and secure student accommodation in your destination country.',
    path: '/accommodation', // updated path
    img: 'https://pub-e63ee2f49d7e4f94b98011a5350eea0f.r2.dev/school_photos/original/hotel-6862159_1920.jpg'
  },
  
  {
    code: 'financial',
    name: 'Financial Services / Education Loans',
    desc: 'Get help with education loans and funding options.',
    path: '/financial-services',
    img: 'https://pub-e63ee2f49d7e4f94b98011a5350eea0f.r2.dev/mentor-3512369_1920.jpg'
  },
  {
    code: 'international-application-process',
    name: 'International Study Application Process',
    desc: 'Step-by-step guidance through the entire international study application process.',
    path: '/services/international-application-process',
    img: 'https://pub-e63ee2f49d7e4f94b98011a5350eea0f.r2.dev/desk-3139127_1920.jpg'
  },
  {
    code: 'airport-pickup',
    name: 'Airport Pickup',
    desc: 'Book airport pickup and arrival support for a smooth landing.',
    path: '/services/airport-pickup',
    img: 'https://pub-e63ee2f49d7e4f94b98011a5350eea0f.r2.dev/school_photos/original/airplane-7359232.jpg'
  },
  {
    code: 'university-representative',
    name: 'University Representative Counselling',
    desc: 'Official sessions with university representatives for program clarity.',
    path: '/services/university-representative-counselling',
    img: 'https://pub-e63ee2f49d7e4f94b98011a5350eea0f.r2.dev/school_photos/original/308597795_10159867060511195_7794074239140869476_n.jpg'
  }
];

export const ServicesPage: React.FC = () => {
  const { token } = useAuth();
  const api = useApi(token);
  const [data,setData] = useState<Service[]>([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState<string|null>(null);
  const [category,setCategory] = useState('');
  const [selected,setSelected] = useState<Service | null>(null);
  const nav = useNavigate();
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoading(true); setError(null);
    api.get<Service[]>(`/services${category?`?category=${category}`:''}`)
      .then(setData)
      .catch(e=>setError(e.message))
      .finally(()=>setLoading(false));
  }, [category]);

  const categories = useMemo(() => Array.from(new Set(data.map(s=>s.category))), [data]);

  return (
    <main
      className="page container"
      style={{
        paddingBottom: '3rem',
        position: 'relative',
        zIndex: 1,
        paddingTop: '90px', // Add space for fixed header
        minHeight: '100vh',
        background: 'radial-gradient(at 70% 0%, #ede9fe 0%, #fff 100%)'
      }}
    >
      {/* Removed 3D/Glassmorphism/Animated Background Elements */}
      <h1 style={{
        fontSize: '2.7rem',
        fontWeight: 900,
        color: '#5727A3',
        marginBottom: '1.2rem',
        letterSpacing: '-2px',
        lineHeight: 1.1,
        textAlign: 'center',
        background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        textShadow: '0 2px 16px #9F7AEA22'
      }}>Our Services</h1>
      <p style={{
        textAlign: 'center',
        fontSize: '1.18rem',
        color: '#1B0044',
        fontWeight: 500,
        marginBottom: '2.2rem',
        letterSpacing: '-.5px'
      }}>
        Explore our full range of support for your study abroad journey.
      </p>
      <section style={{
        maxWidth: 1400,
        padding: '2.5rem 1.5rem',
        textAlign: 'center',
        position: 'relative',
        margin: '0 auto',
        background: 'linear-gradient(120deg, #D6C5F0 0%, #fff 100%)',
        borderRadius: 40,
        boxShadow: '0 12px 48px 0 #9F7AEA22, 0 2px 8px 0 #5727A322',
        border: '2.5px solid #D6C5F0',
        overflow: 'visible'
      }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            gap: '3rem 1.5rem',
            padding: '1.5rem 0',
            marginBottom: '1.5rem'
          }}
        >
          {allServices.map((s, idx) => (
            <div
              key={s.code + idx}
              className="work-process-area landing-service-card"
              style={{
                background: 'linear-gradient(135deg, #fff 60%, #D6C5F0 100%)',
                borderRadius: 32,
                boxShadow: '0 12px 36px 0 #9F7AEA22, 0 2px 8px 0 #D6C5F022',
                border: '2.5px solid #9F7AEA22',
                overflow: 'visible',
                cursor: 'pointer',
                transition: 'box-shadow 0.18s, transform 0.18s, background 0.18s',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                animation: 'fadein 0.7s cubic-bezier(.4,2,.6,1) both',
                position: 'relative',
                minWidth: 0,
                alignItems: 'center',
                padding: 0,
                zIndex: 1
              }}
              onClick={() => nav(s.path)}
              tabIndex={0}
              aria-label={s.name}
            >
              {/* Unique floating image with shadow and border */}
              <div style={{
                position: 'absolute',
                top: -48,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 110,
                height: 110,
                zIndex: 3,
                background: 'linear-gradient(135deg,#D6C5F0 60%,#9F7AEA 100%)',
                borderRadius: '50%',
                boxShadow: '0 8px 32px #9F7AEA33, 0 2px 8px #D6C5F044',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '5px solid #fff',
                overflow: 'hidden'
              }}>
                <img
                  src={s.img}
                  alt={s.name}
                  style={{
                    width: 90,
                    height: 90,
                    objectFit: 'cover',
                    borderRadius: '50%',
                    display: 'block',
                    boxShadow: '0 2px 12px #9F7AEA22'
                  }}
                />
              </div>
              {/* Card content */}
              <div style={{
                padding: '5.5rem 1.2rem 1.7rem 1.2rem',
                textAlign: 'center',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                position: 'relative'
              }}>
                <h3 style={{
                  fontWeight: 900,
                  fontSize: '1.25rem',
                  color: '#5727A3',
                  margin: '0 0 .7rem 0',
                  letterSpacing: '-.5px',
                  background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '0 2px 8px #9F7AEA11'
                }}>{s.name}</h3>
                <div style={{
                  fontSize: '1.09rem',
                  color: '#1B0044',
                  fontWeight: 500,
                  margin: 0,
                  marginBottom: 0,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: 'vertical'
                }}>{s.desc}</div>
              </div>
              {/* Unique bottom action bar with glass effect and floating arrow */}
              <div style={{
                width: '100%',
                height: 54,
                background: 'rgba(151, 117, 234, 0.13)',
                color: '#5727A3',
                borderBottomLeftRadius: 32,
                borderBottomRightRadius: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '1.13rem',
                letterSpacing: '-.5px',
                gap: 10,
                cursor: 'pointer',
                transition: 'background 0.18s',
                position: 'relative',
                boxShadow: '0 2px 8px #9F7AEA22'
              }}>
                <span style={{
                  background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontWeight: 800
                }}>Learn More</span>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 36,
                  height: 36,
                  background: 'linear-gradient(135deg,#D6C5F0 60%,#9F7AEA 100%)',
                  borderRadius: '50%',
                  marginLeft: 6,
                  boxShadow: '0 2px 8px #9F7AEA22'
                }}>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{ transform: 'rotate(-45deg)' }}
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="12" fill="#fff2" />
                    <path d="M7 13H17M17 13L13.5 9.5M17 13L13.5 16.5" stroke="#5727A3" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
              {/* Decorative floating gradient ring */}
              <div style={{
                position: 'absolute',
                top: -60,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 140,
                height: 140,
                borderRadius: '50%',
                background: 'radial-gradient(circle at 50% 50%, #D6C5F0 0%, #9F7AEA33 80%, transparent 100%)',
                opacity: 0.25,
                zIndex: 0,
                pointerEvents: 'none'
              }} />
              <style>{`
                @keyframes fadein {
                  0% { opacity: 0; transform: translateY(30px);}
                  100% { opacity: 1; transform: none;}
                }
                .landing-service-card:hover, .landing-service-card:focus {
                  box-shadow: 0 24px 64px 0 #9F7AEA55, 0 4px 16px 0 #D6C5F033 !important;
                  transform: scale(1.06) !important;
                  border-color: #9F7AEA !important;
                  background: linear-gradient(135deg, #fff 40%, #D6C5F0 100%);
                }
                .landing-service-card:hover h3, .landing-service-card:focus h3 {
                  background: linear-gradient(90deg,#9F7AEA 0%,#5727A3 100%);
                  WebkitBackgroundClip: text;
                  WebkitTextFillColor: transparent;
                  background-clip: text;
                  color: transparent;
                  text-shadow: 0 2px 16px #fff8, 0 1px 2px #9F7AEA44;
                }
                .landing-service-card:hover .bottom-bar, .landing-service_card:focus .bottom-bar {
                  background: linear-gradient(90deg, #9F7AEA 0%, #5727A3 100%);
                }
                @media (max-width: 900px) {
                  .landing-service-card {
                    min-width: 0 !important;
                  }
                }
                @media (max-width: 700px) {
                  .landing-service-card {
                    border-radius: 18px !important;
                  }
                  .landing-service-card > div[style*="position: absolute"] {
                    width: 80px !important;
                    height: 80px !important;
                    top: -36px !important;
                  }
                  .landing-service-card img {
                    width: 65px !important;
                    height: 65px !important;
                  }
                  .landing-service-card > div[style*="padding: 5.5rem"] {
                    padding: 4.2rem 0.7rem 1.2rem 0.7rem !important;
                  }
                }
                @media (max-width: 500px) {
                  .landing-service-card {
                    border-radius: 12px !important;
                  }
                  .landing-service-card > div[style*="position: absolute"] {
                    width: 60px !important;
                    height: 60px !important;
                    top: -24px !important;
                  }
                  .landing-service-card img {
                    width: 45px !important;
                    height: 45px !important;
                  }
                  .landing-service-card > div[style*="padding: 5.5rem"] {
                    padding: 3.2rem 0.5rem 1rem 0.5rem !important;
                  }
                  .landing-service-card h3 {
                    font-size: 1.05rem !important;
                  }
                  .landing-service-card .bottom-bar {
                    font-size: .97rem !important;
                  }
                }
              `}</style>
            </div>
          ))}
        </div>
      </section>

      {/* Experience & Journey Section - Beautifully formatted */}
      <section
        style={{
          maxWidth: 800,
          margin: '3.5rem auto 2.5rem auto',
          background: 'linear-gradient(120deg, #ede9fe 0%, #fff 100%)',
          borderRadius: 32,
          boxShadow: '0 8px 32px #9F7AEA22',
          padding: '2.5rem 2rem',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <h2 style={{
          color: '#7c3aed',
          fontWeight: 900,
          fontSize: '2.1rem',
          marginBottom: '1.2rem',
          letterSpacing: '-1px',
          textAlign: 'center',
          background: 'linear-gradient(90deg, #a21caf 0%, #7c3aed 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Experience & Journey
        </h2>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2.2rem',
          justifyContent: 'center',
          marginBottom: '2.2rem'
        }}>
          {/* Work */}
          <div style={{
            flex: '1 1 320px',
            background: 'linear-gradient(135deg, #fff 60%, #e0c3fc 100%)',
            borderRadius: 18,
            boxShadow: '0 2px 12px #9F7AEA11',
            padding: '1.3rem 1.2rem',
            minWidth: 260,
            maxWidth: 370,
            margin: '0 auto'
          }}>
            <h3 style={{
              color: '#a21caf',
              fontWeight: 800,
              fontSize: '1.13rem',
              margin: '0 0 .5rem 0',
              letterSpacing: '-0.5px'
            }}>Work</h3>
            <p style={{
              color: '#475569',
              fontSize: '1.01rem',
              fontWeight: 500,
              margin: 0
            }}>
              Completed Diploma in Business (Niagara College, Toronto) and certified in Digital Marketing & Information Technology, gaining practical knowledge in communication, SEO, and Microsoft Office tools.
            </p>
          </div>
          {/* Peer Support */}
          <div style={{
            flex: '1 1 320px',
            background: 'linear-gradient(135deg, #fff 60%, #e0c3fc 100%)',
            borderRadius: 18,
            boxShadow: '0 2px 12px #9F7AEA11',
            padding: '1.3rem 1.2rem',
            minWidth: 260,
            maxWidth: 370,
            margin: '0 auto'
          }}>
            <h3 style={{
              color: '#a21caf',
              fontWeight: 800,
              fontSize: '1.13rem',
              margin: '0 0 .5rem 0',
              letterSpacing: '-0.5px'
            }}>Peer Support</h3>
            <p style={{
              color: '#475569',
              fontSize: '1.01rem',
              fontWeight: 500,
              margin: 0
            }}>
              Proactively supported peers and acquaintances by sharing practical knowledge about studying and working in Canada, helping them make informed choices.
            </p>
          </div>
        </div>
        {/* Projects */}
        <div style={{
          background: 'linear-gradient(135deg, #fff 60%, #e0c3fc 100%)',
          borderRadius: 18,
          boxShadow: '0 2px 12px #9F7AEA11',
          padding: '1.3rem 1.2rem',
          marginBottom: '2.2rem'
        }}>
          <h3 style={{
            color: '#a21caf',
            fontWeight: 800,
            fontSize: '1.13rem',
            margin: '0 0 .5rem 0',
            letterSpacing: '-0.5px'
          }}>Projects</h3>
          <ul style={{
            color: '#475569',
            fontSize: '1.01rem',
            fontWeight: 500,
            margin: 0,
            paddingLeft: '1.2rem',
            listStyle: 'disc'
          }}>
            <li style={{marginBottom:'.5rem'}}>
              Completed a climate activism project highlighting environmental awareness by designing a community campaign with public interviews, waste collection drives, and social media engagement.
            </li>
            <li>
              Participated in academic projects at Niagara College, involving financial analysis, marketing research, and group presentations that developed teamwork and problem-solving skills.
            </li>
          </ul>
        </div>
        {/* Journey */}
        <div style={{
          background: 'linear-gradient(135deg, #fff 60%, #e0c3fc 100%)',
          borderRadius: 18,
          boxShadow: '0 2px 12px #9F7AEA11',
          padding: '1.3rem 1.2rem'
        }}>
          <h3 style={{
            color: '#a21caf',
            fontWeight: 800,
            fontSize: '1.13rem',
            margin: '0 0 .5rem 0',
            letterSpacing: '-0.5px'
          }}>Journey</h3>
          <p style={{
            color: '#475569',
            fontSize: '1.01rem',
            fontWeight: 500,
            margin: 0
          }}>
            My journey is fueled by resilience, adaptability, and a strong desire to grow. From managing part-time roles in Canada to assisting students in their academic planning, I’ve learned the value of hard work, clear communication, and problem-solving. I strive to bring a positive impact wherever I contribute, with a vision of continuous learning and helping others succeed.
          </p>
        </div>
      </section>
    </main>
  );
};
