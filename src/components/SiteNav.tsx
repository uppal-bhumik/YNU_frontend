import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './SiteNav.css';
import { useAuth } from '../context/AuthContext';

const servicesDropdown = [
  {
    name: 'Peer Counselling',
    path: '/services/peer-counselling',
  },
  {
    name: 'Accommodation Assistance',
    path: '/accommodation',
  },
  {
    name: 'Financial Services / Education Loans',
    path: '/financial-services',
  },
  {
    name: 'International Study Application Process',
    path: '/services/international-application-process',
  },
  {
    name: 'Airport Pickup',
    path: '/services/airport-pickup',
  },
  {
    name: 'University Representative Counselling',
    path: '/services/university-representative-counselling',
  },
];

export const SiteNav: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [navIn, setNavIn] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const [visible, setVisible] = useState(true);
  const [navOffset, setNavOffset] = useState(0);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const navHeight = 110; // px, should match the CSS
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    setTimeout(() => setNavIn(true), 80);
  }, []);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener('resize', close);
    return () => window.removeEventListener('resize', close);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          if (currentY > 10) {
            setShowSticky(true);
            // Calculate new offset
            let diff = currentY - lastScrollY.current;
            setNavOffset(prev => {
              let next = prev + diff;
              if (next < 0) next = 0;
              if (next > navHeight) next = navHeight;
              return next;
            });
          } else {
            setShowSticky(false);
            setNavOffset(0);
          }
          lastScrollY.current = currentY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`site-nav${navIn ? ' site-nav-3d-in' : ''} site-nav-sticky`}
      role="navigation"
      aria-label="Main Navigation"
      style={{
        background: 'linear-gradient(90deg, #D6C5F0 0%, #9F7AEA 100%)',
        color: '#1B0044',
        borderRadius: '22px',
        margin: '1.2rem auto 1.5rem auto',
        maxWidth: '1200px',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        boxShadow: '0 8px 32px 0 #5727A355, 0 1.5px 8px 0 #9F7AEA33',
        zIndex: 100,
        transition: 'box-shadow 0.3s, transform 0.7s cubic-bezier(.33,1,.68,1)',
        transform: `translateY(-${navOffset}px)`,
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px) scale(1.01)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 36px 0 #5727A388, 0 2px 12px 0 #9F7AEA44';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = '';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px 0 #5727A355, 0 1.5px 8px 0 #9F7AEA33';
      }}
    >
      <div className="container site-nav__inner" style={{
        WebkitBackdropFilter:'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div className="site-nav__left" style={{
          flex: '0 0 auto',
          justifyContent: 'flex-start',
          alignItems: 'center',
          display: 'flex'
        }}>
          <NavLink
            to="/"
            className="logo"
            onClick={() => setOpen(false)}
            style={{
              fontWeight: 800,
              fontSize: '1.7rem',
              letterSpacing: '-1px',
              color: '#5727A3',
              background: 'none',
              WebkitBackgroundClip: 'initial',
              WebkitTextFillColor: 'initial',
              backgroundClip: 'initial',
              textShadow: '0 2px 12px #fff3, 0 1px 2px #5727A311'
            }}
          >
            Your Next University
          </NavLink>
        </div>
        {/* Hamburger moved here for mobile right alignment */}
        <button
          className="hamburger"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
          style={{
            background: '#fff',
            boxShadow: open ? '0 2px 12px 0 #9F7AEA44' : '0 1px 4px 0 #5727A322',
            borderRadius: '50%',
            border: 'none',
            transition: 'box-shadow 0.3s, background 0.3s',
            outline: open ? '2px solid #9F7AEA' : 'none',
            marginLeft: 'auto',
            display: 'none' // default hidden, shown in mobile via CSS
          }}
        >
          <span /><span /><span />
        </button>
        <div
          className={`links ${open ? 'links--open' : ''}`}
          style={{
            gap: '.5rem',
            alignItems: 'center',
            flex: '1 1 auto',
            justifyContent: 'flex-end',
            display: 'flex',
            flexWrap: 'nowrap'
          }}
        >
          <NavLink
            to="/about"
            onClick={()=>setOpen(false)}
            style={{
              background: 'none',
              color: '#5727A3',
              borderRadius: '18px',
              fontWeight: 700,
              fontSize: '1.05rem',
              padding: '.65rem 1.2rem',
              boxShadow: 'none',
              border: 'none',
              transition: 'all 0.25s'
            }}
          >About</NavLink>
          <div
            className="nav-services-dropdown"
            style={{ position: 'relative', display: 'inline-block' }}
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <NavLink
              to="/services"
              onClick={()=>setOpen(false)}
              style={{
                background: 'none',
                color: '#5727A3',
                borderRadius: '18px',
                fontWeight: 700,
                fontSize: '1.05rem',
                padding: '.65rem 1.2rem',
                boxShadow: 'none',
                border: 'none',
                transition: 'all 0.25s',
                position: 'relative',
                zIndex: 2
              }}
            >
              Services
              <svg style={{ marginLeft: 6, verticalAlign: 'middle' }} width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path d="M6 8l4 4 4-4" stroke="#5727A3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </NavLink>
            {servicesOpen && (
              <div
                className="services-dropdown-menu"
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  minWidth: 240,
                  background: '#fff',
                  borderRadius: 16,
                  boxShadow: '0 8px 32px #9F7AEA22, 0 2px 8px #D6C5F022',
                  padding: '0.5rem 0',
                  zIndex: 100,
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  animation: 'fadein .18s cubic-bezier(.4,2,.6,1)'
                }}
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                {servicesDropdown.map((item) => (
                  <div
                    key={item.path}
                    style={{
                      padding: '0.85rem 1.3rem',
                      color: '#5727A3',
                      fontWeight: 600,
                      fontSize: '1.03rem',
                      textDecoration: 'none',
                      border: 'none',
                      background: 'none',
                      borderRadius: 12,
                      transition: 'background 0.15s, color 0.15s',
                      margin: '0 0.2rem',
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                    tabIndex={0}
                    aria-label={item.name}
                    onClick={() => {
                      setOpen(false);
                      setServicesOpen(false);
                      navigate(item.path);
                    }}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setOpen(false);
                        setServicesOpen(false);
                        navigate(item.path);
                      }
                    }}
                    onMouseOver={e => {
                      (e.currentTarget as HTMLDivElement).style.background = 'linear-gradient(90deg,#D6C5F0 0%,#9F7AEA22 100%)';
                      (e.currentTarget as HTMLDivElement).style.color = '#9F7AEA';
                    }}
                    onMouseOut={e => {
                      (e.currentTarget as HTMLDivElement).style.background = 'none';
                      (e.currentTarget as HTMLDivElement).style.color = '#5727A3';
                    }}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          <NavLink
            to="/universities"
            onClick={()=>setOpen(false)}
            style={{
              background: 'none',
              color: '#5727A3',
              borderRadius: '18px',
              fontWeight: 700,
              fontSize: '1.05rem',
              padding: '.65rem 1.2rem',
              boxShadow: 'none',
              border: 'none',
              transition: 'all 0.25s'
            }}
          >Universities</NavLink>
          <NavLink
            to="/contact"
            onClick={()=>setOpen(false)}
            style={{
              background: 'none',
              color: '#5727A3',
              borderRadius: '18px',
              fontWeight: 700,
              fontSize: '1.05rem',
              padding: '.65rem 1.2rem',
              boxShadow: 'none',
              border: 'none',
              transition: 'all 0.25s'
            }}
          >Contact</NavLink>
          {/* <ThemeToggle /> */}
          {user ? (
            <div style={{display:'flex',alignItems:'center',gap:'.5rem', flexWrap: 'nowrap', position: 'relative'}}>
              {/* Profile Icon */}
              <div
                className="site-nav-profile-icon"
                tabIndex={0}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  background: '#E9D8FD',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 1px 6px #9F7AEA22',
                  color: '#5727A3',
                  fontWeight: 900,
                  fontSize: '1.15rem',
                  position: 'relative',
                  outline: 'none',
                  border: '2px solid #D6C5F0'
                }}
                onClick={e => {
                  setShowProfileMenu(v => !v);
                }}
                onBlur={e => {
                  setTimeout(() => {
                    const active = document.activeElement as HTMLElement | null;
                    const menu = document.querySelector('.site-nav-profile-menu');
                    const icon = document.querySelector('.site-nav-profile-icon');
                    if (
                      active &&
                      menu &&
                      icon &&
                      !menu.contains(active) &&
                      !icon.contains(active)
                    ) {
                      setShowProfileMenu(false);
                    }
                  }, 120);
                }}
                // Only open on hover, do not close on mouse leave if opened by click
                onMouseEnter={() => setShowProfileMenu(true)}
                aria-label="Profile"
              >
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <circle cx="11" cy="11" r="11" fill="#9F7AEA" />
                  <ellipse cx="11" cy="8.2" rx="3.2" ry="3.2" fill="#fff" />
                  <ellipse cx="11" cy="15.2" rx="5.2" ry="2.2" fill="#fff" />
                </svg>
                {/* Profile dropdown menu */}
                {showProfileMenu && (
                  <div
                    className="site-nav-profile-menu"
                    tabIndex={0}
                    style={{
                      position: 'absolute',
                      top: 46,
                      right: 0,
                      minWidth: 210,
                      background: '#fff',
                      borderRadius: 14,
                      boxShadow: '0 8px 32px #9F7AEA22, 0 2px 8px #D6C5F022',
                      padding: '1rem 1.2rem',
                      zIndex: 200,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '.6rem',
                      animation: 'fadein .18s cubic-bezier(.4,2,.6,1)'
                    }}
                    // Do not close on mouse leave if opened by click
                    onMouseLeave={e => {
                      // Only close if it was opened by hover, not by click
                      if (!document.activeElement || !document.querySelector('.site-nav-profile-menu')?.contains(document.activeElement)) {
                        setShowProfileMenu(false);
                      }
                    }}
                    onBlur={e => {
                      setTimeout(() => {
                        const active = document.activeElement as HTMLElement | null;
                        const menu = document.querySelector('.site-nav-profile-menu');
                        const icon = document.querySelector('.site-nav-profile-icon');
                        if (
                          active &&
                          menu &&
                          icon &&
                          !menu.contains(active) &&
                          !icon.contains(active)
                        ) {
                          setShowProfileMenu(false);
                        }
                      }, 120);
                    }}
                  >
                    <div style={{ fontWeight: 800, color: '#5727A3', fontSize: '1.08rem', marginBottom: 2 }}>
                      {user.full_name || 'User'}
                    </div>
                    <div style={{ color: '#64748b', fontSize: '.97rem', marginBottom: 6 }}>
                      {user.email}
                    </div>
                    <button
                      className="btn btn-small"
                      type="button"
                      style={{
                        background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '10px',
                        fontWeight: 700,
                        fontSize: '1.01rem',
                        padding: '.55rem 1.1rem',
                        boxShadow: '0 6px 18px -4px #5727A355, 0 2px 8px 0 #9F7AEA33',
                        transition: 'all 0.25s',
                        marginTop: 4,
                        width: '100%',
                        textAlign: 'center'
                      }}
                      onClick={() => {
                        setShowProfileMenu(false);
                        navigate('/student-bookings');
                      }}
                    >My Bookings & Payments</button>
                    <button
                      className="btn btn-small"
                      type="button"
                      style={{
                        background: 'linear-gradient(90deg,#9F7AEA 0%,#5727A3 100%)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '10px',
                        fontWeight: 700,
                        fontSize: '1.01rem',
                        padding: '.55rem 1.1rem',
                        boxShadow: '0 6px 18px -4px #5727A355, 0 2px 8px 0 #9F7AEA33',
                        transition: 'all 0.25s',
                        marginTop: 4,
                        width: '100%',
                        textAlign: 'center'
                      }}
                      onClick={logout}
                    >Logout</button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div style={{display:'flex', gap:'.5rem', flexWrap: 'nowrap'}}>
              <NavLink
                to="/auth/login"
                onClick={()=>setOpen(false)}
                className={({isActive}) => 'btn btn-small' + (isActive ? ' btn-primary' : '')}
                style={({isActive}) => ({
                  background: isActive ? 'linear-gradient(90deg,#9F7AEA 0%,#5727A3 100%)' : '#fff',
                  color: isActive ? '#fff' : '#5727A3',
                  borderRadius: '18px',
                  fontWeight: 700,
                  fontSize: '1.05rem',
                  padding: '.55rem 1.1rem',
                  boxShadow: isActive
                    ? '0 6px 18px -4px #5727A355, 0 2px 8px 0 #9F7AEA33'
                    : '0 2px 8px 0 #e0e7ef',
                  border: isActive ? 'none' : '1px solid #e0e7ef',
                  transition: 'all 0.25s',
                  whiteSpace: 'nowrap'
                })}
              >Login</NavLink>
              <NavLink
                to="/auth/register"
                onClick={()=>setOpen(false)}
                className={({isActive}) => 'btn btn-small' + (isActive ? ' btn-primary' : '')}
                style={({isActive}) => ({
                  background: isActive ? 'linear-gradient(90deg,#9F7AEA 0%,#5727A3 100%)' : '#fff',
                  color: isActive ? '#fff' : '#5727A3',
                  borderRadius: '18px',
                  fontWeight: 700,
                  fontSize: '1.05rem',
                  padding: '.55rem 1.1rem',
                  boxShadow: isActive
                    ? '0 6px 18px -4px #5727A355, 0 2px 8px 0 #9F7AEA33'
                    : '0 2px 8px 0 #e0e7ef',
                  border: isActive ? 'none' : '1px solid #e0e7ef',
                  transition: 'all 0.25s',
                  whiteSpace: 'nowrap'
                })}
              >Sign Up</NavLink>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes fadein {
          0% { opacity: 0; transform: translateY(10px);}
          100% { opacity: 1; transform: none;}
        }
        .services-dropdown-menu a:active {
          background: linear-gradient(90deg,#D6C5F0 0%,#9F7AEA22 100%) !important;
          color: #9F7AEA !important;
        }
        @media (max-width: 900px) {
          .nav-services-dropdown .services-dropdown-menu {
            position: static !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            margin-top: 0 !important;
            min-width: 0 !important;
          }
        }
        .site-nav {
          opacity: 0;
          transform: perspective(900px) translateY(-80px) rotateX(18deg) scale3d(0.97,0.97,1);
          transition: transform 0.85s cubic-bezier(.4,2,.6,1), opacity 0.85s cubic-bezier(.4,2,.6,1);
        }
        .site-nav.site-nav-3d-in {
          opacity: 1;
          transform: none;
        }
        .site-nav-sticky {
          animation: navStickyFadeIn .4s;
        }
        .site-nav.site-nav-hidden,
        .site-nav.site-nav-visible {
          pointer-events: auto;
        }
        @keyframes navStickyFadeIn {
          from { opacity: 0; transform: translateY(-24px);}
          to { opacity: 1; transform: none;}
        }
        /* Responsive nav layout */
        @media (max-width: 900px) {
          .site-nav__inner {
            flex-direction: row !important;
            align-items: center !important;
            justify-content: space-between !important;
          }
          .site-nav__left {
            flex: 1 1 auto !important;
            justify-content: flex-start !important;
          }
          .logo {
            margin-left: 0 !important;
          }
          .hamburger {
            display: flex !important;
            margin-left: auto !important;
            margin-right: 0 !important;
            align-items: center;
            justify-content: center;
          }
          .links {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: #ceacf5ff;
            flex-direction: column;
            align-items: flex-start;
            gap: 0;
            padding: 1rem 1.5rem;
            border-radius: 0 0 18px 18px;
            box-shadow: 0 8px 32px #9F7AEA22, 0 2px 8px #D6C5F022;
            z-index: 99;
            display: none !important;
          }
          .links.links--open {
            display: flex !important;
          }
        }
        @media (min-width: 901px) {
          .hamburger {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
};