import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { Modal } from '../components/Modal';
import programsData from './programs.json';
import countriesData from './countries.json';
import universitiesData from './universities.json';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
// import Slider from 'rc-slider';
// import 'rc-slider/assets/index.css';

const BASE_URL = "https://ynu-backend.onrender.com";
// const BASE_URL = "http://127.0.0.1:8000";

interface ProgramItem {
  id: string;
  attributes: any;
  program_basic: any;
  school_id: string;
  school: any;
  program: any;
  program_requirements: any;
}

// Skeleton Card Component for Loading State
const SkeletonCard: React.FC = () => {
  return (
    <article
      style={{
        background: 'linear-gradient(145deg, #1A3A4A 0%, #2D6A7A 100%)',
        borderRadius: '2rem',
        boxShadow: '0 8px 32px 0 rgba(15, 23, 42, 0.25)',
        border: '1px solid rgba(208, 232, 236, 0.2)',
        padding: '3.5rem 1.7rem 1.7rem 1.7rem',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 440,
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Pulsing overlay animation */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
          animation: 'shimmer 2s infinite',
          pointerEvents: 'none',
        }}
      />

      {/* Floating logo skeleton */}
      <div style={{
        position: 'absolute',
        top: -32,
        right: 24,
        zIndex: 3,
        background: '#fff',
        borderRadius: '50%',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
        width: 64,
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '3px solid #7dd3e8'
      }}>
        <div style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          background: '#e0e0e0',
        }} />
      </div>

      {/* University Name skeleton */}
      <div style={{ marginBottom: '.7rem', marginTop: '1.5rem' }}>
        <div style={{
          height: 24,
          background: 'rgba(255,255,255,0.15)',
          borderRadius: 8,
          width: '75%',
          marginBottom: 8
        }} />
        <div style={{
          height: 16,
          background: 'rgba(255,255,255,0.1)',
          borderRadius: 6,
          width: '50%'
        }} />
      </div>

      {/* Program title skeleton */}
      <div style={{ marginBottom: '.7rem' }}>
        <div style={{
          height: 20,
          background: 'rgba(255,255,255,0.15)',
          borderRadius: 8,
          width: '90%',
          marginBottom: 8
        }} />
        <div style={{
          height: 16,
          background: 'rgba(125,211,232,0.2)',
          borderRadius: 6,
          width: '40%'
        }} />
      </div>

      {/* Details skeleton */}
      <div style={{ marginBottom: '.7rem', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{
              height: 14,
              background: 'rgba(255,255,255,0.1)',
              borderRadius: 6,
              width: '35%'
            }} />
            <div style={{
              height: 14,
              background: 'rgba(255,255,255,0.12)',
              borderRadius: 6,
              width: '40%'
            }} />
          </div>
        ))}
      </div>

      {/* Button skeleton */}
      <div style={{
        marginTop: 'auto',
        height: 44,
        background: 'rgba(255,255,255,0.2)',
        borderRadius: 14,
      }} />

      {/* Shimmer animation */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </article>
  );
};

export const UniversitiesPage: React.FC = () => {
  const api = useApi();
  const navigate = useNavigate();
  const [programs, setPrograms] = useState<ProgramItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [openIntakes, setOpenIntakes] = useState<any | null>(null); // <-- Add this line at the top-level of the component
  const [rowsPerPage, setRowsPerPage] = useState(12);

  const [minTuition, setMinTuition] = useState('');
  const [maxTuition, setMaxTuition] = useState('');
  const [programName, setProgramName] = useState('');
  const [universityName, setUniversityName] = useState('');
  const [country, setCountry] = useState('');

  // Use JSON files for dropdowns
  const [allCountries, setAllCountries] = useState<{ label: string; value: string }[]>([]);
  const [allUniversities, setAllUniversities] = useState<string[]>([]);
  const [allProgramNames, setAllProgramNames] = useState<string[]>([]);

  const programsCache = useRef<Map<string, { items: ProgramItem[]; total: number }>>(new Map());

  const [tuitionRange, setTuitionRange] = useState<[number, number]>([0, 100000]);

  const tuitionRangeTimeout = useRef<any | null>(null);

  useEffect(() => {
    const countryArr = Object.entries((countriesData as any).countries || {}).map(
      ([label, value]) => ({ label, value: value as string })
    );
    setAllCountries(countryArr);

    setAllUniversities(((universitiesData as any).universities || []));

    // Ensure we extract program names from the array in programs.json
    // If programs.json is an array of objects with a "name" property:
    // setAllProgramNames(((programsData as any).programs || []).map((p: any) => p.name));
    // If programs.json is just an array of strings:
    setAllProgramNames(Array.isArray((programsData as any).programs)
      ? (programsData as any).programs.map((p: any) => typeof p === 'string' ? p : p.name)
      : []);
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    // Build params for cache key
    const params: Record<string, string | number> = {
      page,
      page_size: rowsPerPage,
    };
    // Use tuitionRange for min/max fees
    if (tuitionRange[0]) params.min_fees = tuitionRange[0];
    if (tuitionRange[1]) params.max_fees = tuitionRange[1];
    if (programName) params.program_name = programName;
    if (universityName) params.university_name = universityName;
    if (country) {
      const countryObj = allCountries.find(c => c.value === country);
      params.country = countryObj ? countryObj.label : country;
    }
    const cacheKey = JSON.stringify(params);

    // Debounce API call for tuitionRange
    if (tuitionRangeTimeout.current) clearTimeout(tuitionRangeTimeout.current);

    tuitionRangeTimeout.current = setTimeout(() => {
      // Check cache first
      if (programsCache.current.has(cacheKey)) {
        const cached = programsCache.current.get(cacheKey)!;
        setPrograms(cached.items);
        setTotal(cached.total);
        setLoading(false);
        return;
      }

      fetch(`${BASE_URL}/api/program-details?${new URLSearchParams(params as any).toString()}`)
        .then(res => res.json())
        .then(res => {
          setPrograms(res.items || []);
          setTotal(res.total || 0);
          programsCache.current.set(cacheKey, { items: res.items || [], total: res.total || 0 });
        })
        .catch(e => setError(e.message || 'Failed loading programs'))
        .finally(() => setLoading(false));
    }, 1000);

    // Cleanup on unmount or param change
    return () => {
      if (tuitionRangeTimeout.current) clearTimeout(tuitionRangeTimeout.current);
    };
    // Only debounce on tuitionRange change, others can be instant
  }, [tuitionRange, programName, universityName, country, page, rowsPerPage, allCountries]);

  const totalPages = Math.ceil(total / rowsPerPage);

  // Add a handler to go to program details page with program data and query params
  const handleViewProgramDetails = (program: ProgramItem) => {
    // Build query params string for current filters
    const params: Record<string, string | number> = {
      page,
      page_size: rowsPerPage,
    };
    if (minTuition) params.min_fees = minTuition;
    if (maxTuition) params.max_fees = maxTuition;
    if (programName) params.program_name = programName;
    if (universityName) params.university_name = universityName;
    // For country, send the label (not the code)
    if (country) {
      const countryObj = allCountries.find(c => c.value === country);
      params.country = countryObj ? countryObj.label : country;
    }

    const queryString = new URLSearchParams(params as any).toString();
    navigate(`/programs/${program.id}?${queryString}`, { state: { program } });
  };

  return (
    <main
      style={{
        background: '#fff',
        minHeight: '100vh',
        paddingBottom: '2rem',
        position: 'relative',
        zIndex: 1,
        paddingTop: '0', // Full bleed
      }}
    >
      {/* Dark Hero for Universities */}
      <section style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1A3A4A 100%)', // Dark Graphite
        padding: '120px 1.5rem 80px 1.5rem',
        textAlign: 'center',
        position: 'relative',
        marginBottom: '0'
      }}>
        {/* Decor */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at 50% 100%, rgba(45, 106, 122, 0.2), transparent 50%)',
          pointerEvents: 'none'
        }} />

        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: 900,
          color: '#fff',
          marginBottom: '1rem',
          letterSpacing: '-2px',
          lineHeight: 1.1,
          position: 'relative',
          zIndex: 1
        }}>Explore Universities</h1>
        <p style={{
          fontSize: '1.25rem',
          color: '#CBD5E1',
          fontWeight: 500,
          maxWidth: 600,
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          Find your dream program from our curated list of top institutions.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1.5rem', position: 'relative', zIndex: 1 }}>
          <button
            onClick={() => navigate('/universities/recommendations')}
            style={{
              background: 'linear-gradient(90deg, #fff 0%, #D0E8EC 100%)',
              color: '#1A3A4A',
              fontWeight: 700,
              fontSize: '1.1rem',
              border: 'none',
              borderRadius: 12,
              padding: '0.9rem 2rem',
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
              transition: 'transform 0.18s, box-shadow 0.18s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.04)';
              e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)';
            }}
          >
            Get Recommendations
          </button>
          <button
            onClick={() => navigate('/compare-universities')}
            style={{
              background: 'transparent',
              color: '#fff',
              fontWeight: 700,
              fontSize: '1.1rem',
              border: '2px solid rgba(255,255,255,0.5)',
              borderRadius: 12,
              padding: '0.9rem 2rem',
              cursor: 'pointer',
              transition: 'all 0.18s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.borderColor = '#fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
            }}
          >
            Compare Universities
          </button>
        </div>
      </section>

      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        marginTop: '-3rem', // Overlap effect
        borderRadius: '2.2rem',
        boxShadow: '0 20px 60px -10px rgba(15, 23, 42, 0.15)',
        position: 'relative',
        padding: '2rem',
        zIndex: 2,
        background: '#fff',
        border: '1px solid var(--border)'
      }}>
        {/* Filters */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '2.2rem',
            gap: '1.5rem'
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '.9rem',
              flexWrap: 'wrap',
              alignItems: 'center',
              width: '100%',
              rowGap: '1rem',
              marginTop: '1.5rem'
            }}
            className="uni-filters-row"
          >
            <select
              value={country}
              onChange={e => setCountry(e.target.value)}
              style={{
                padding: '.55rem 1.1rem',
                borderRadius: '10px',
                border: '1px solid rgba(208, 232, 236, 0.3)',
                fontWeight: 500,
                minWidth: 140,
                background: 'linear-gradient(135deg, #1A3A4A 0%, #2D6A7A 100%)',
                color: '#fff',
                flex: '1 1 180px',
                maxWidth: 260
              }}>
              <option value="" style={{ background: '#1A3A4A', color: '#fff' }}>All Countries</option>
              {allCountries.map(c => (
                <option key={c.value} value={c.value} style={{ background: '#1A3A4A', color: '#fff' }}>{c.label}</option>
              ))}
            </select>
            <select
              value={universityName}
              onChange={e => setUniversityName(e.target.value)}
              style={{
                padding: '.55rem 1.1rem',
                borderRadius: '10px',
                border: '1px solid rgba(208, 232, 236, 0.3)',
                fontWeight: 500,
                minWidth: 180,
                background: 'linear-gradient(135deg, #1A3A4A 0%, #2D6A7A 100%)',
                color: '#fff',
                flex: '1 1 220px',
                maxWidth: 320
              }}>
              <option value="" style={{ background: '#1A3A4A', color: '#fff' }}>All Universities</option>
              {allUniversities.map(u => (
                <option key={u} value={u} style={{ background: '#1A3A4A', color: '#fff' }}>{u}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Search Program"
              value={programName}
              onChange={e => setProgramName(e.target.value)}
              className="uni-search-input"
              style={{
                padding: '.55rem 1.1rem',
                borderRadius: '10px',
                border: '1px solid rgba(208, 232, 236, 0.3)',
                fontWeight: 500,
                minWidth: 180,
                background: 'linear-gradient(135deg, #1A3A4A 0%, #2D6A7A 100%)',
                color: '#fff',
                flex: '1 1 220px',
                maxWidth: 320
              }}
              list="program-names-list"
              autoComplete="off"
            />
            <datalist id="program-names-list">
              {allProgramNames.map(p => (
                <option key={p} value={p} />
              ))}
            </datalist>
            {/* Tuition Range Slider */}
            <div style={{ minWidth: 220, maxWidth: 320, flex: '1 1 220px', marginTop: '1.2rem' }}>
              <label style={{ fontWeight: 600, color: '#1A3A4A', marginBottom: '.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Budget</span>
                <span style={{ color: '#4A8A9A' }}>Max: ₹{tuitionRange[1].toLocaleString()}</span>
              </label>

              <div style={{ position: 'relative', height: '30px', display: 'flex', alignItems: 'center', marginTop: '0.2rem' }}>
                {/* Background Track */}
                <div style={{
                  position: 'absolute',
                  width: '100%',
                  height: '6px',
                  background: '#e5e7eb',
                  borderRadius: '3px',
                  zIndex: 0
                }} />
                {/* Active Range Track */}
                <div style={{
                  position: 'absolute',
                  height: '6px',
                  background: '#1A3A4A',
                  borderRadius: '3px',
                  zIndex: 0,
                  left: 0,
                  width: `${(tuitionRange[1] / 100000) * 100}%`,
                }} />

                {/* Single Max Slider Input */}
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="1000"
                  value={tuitionRange[1]}
                  onChange={(e) => {
                    setTuitionRange([0, Number(e.target.value)]);
                  }}
                  className="thumb"
                  style={{ zIndex: 4 }}
                />
              </div>

              <style>{`
                .thumb {
                  -webkit-appearance: none;
                  -moz-appearance: none;
                  appearance: none; 
                  position: absolute;
                  height: 0;
                  width: 100%;
                  outline: none;
                  background: transparent;
                }
                .thumb::-webkit-slider-thumb {
                  -webkit-appearance: none;
                  pointer-events: all;
                  width: 22px;
                  height: 22px;
                  border-radius: 50%;
                  background-color: #1A3A4A;
                  cursor: grab;
                  margin-top: -8px; /* Offset to center on track */
                  box-shadow: 0 3px 8px rgba(0,0,0,0.2);
                  border: 2px solid #fff;
                  transition: transform 0.1s;
                }
                .thumb::-moz-range-thumb {
                  pointer-events: all;
                  width: 22px;
                  height: 22px;
                  border-radius: 50%;
                  background-color: #1A3A4A;
                  cursor: grab;
                  border: none;
                  box-shadow: 0 3px 8px rgba(0,0,0,0.2);
                  border: 2px solid #fff;
                }
                .thumb::-webkit-slider-thumb:active {
                  cursor: grabbing;
                  transform: scale(1.15);
                }
              `}</style>
            </div>
          </div>
          <style>
            {`
              .uni-search-input::placeholder {
                color: rgba(255, 255, 255, 0.7);
              }
              .dark-range-slider {
                -webkit-appearance: none;
                height: 6px;
                border-radius: 5px;
                background: linear-gradient(90deg, #1A3A4A 0%, #4A8A9A 100%);
              }
              .dark-range-slider::-webkit-slider-thumb {
                -webkit-appearance: none;
                width: 18px;
                height: 18px;
                border-radius: 50%;
                background: #1A3A4A;
                cursor: pointer;
                border: 2px solid #fff;
                box-shadow: 0 2px 6px rgba(0,0,0,0.2);
              }
              .dark-range-slider::-moz-range-thumb {
                width: 18px;
                height: 18px;
                border-radius: 50%;
                background: #1A3A4A;
                cursor: pointer;
                border: 2px solid #fff;
                box-shadow: 0 2px 6px rgba(0,0,0,0.2);
              }
              @media (max-width: 900px) {
                .uni-filters-row {
                  flex-direction: column !important;
                  align-items: stretch !important;
                  gap: 1rem !important;
                }
                .uni-filters-row > * {
                  min-width: 0 !important;
                  max-width: 100% !important;
                  width: 100% !important;
                  flex: 1 1 100% !important;
                }
              }
              @media (max-width: 600px) {
                .uni-filters-row {
                  flex-direction: column !important;
                  align-items: stretch !important;
                  gap: 0.7rem !important;
                }
                .uni-filters-row > * {
                  min-width: 0 !important;
                  max-width: 100% !important;
                  width: 100% !important;
                  font-size: 0.97rem !important;
                }
              }
            `}
          </style>
        </div>
        {/* Program Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2.7rem 2.2rem',
            alignItems: 'stretch',
            marginTop: '2.7rem'
          }}
        >
          {loading && <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#64748b' }}>Loading programs...</div>}
          {error && <div style={{ gridColumn: '1/-1', color: '#dc2626', textAlign: 'center' }}>Error: {error}</div>}
          {!loading && !error && programs.length === 0 && (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#64748b' }}>No programs found.</div>
          )}
          {!loading && !error && programs.map((p, idx) => {
            const attrs = p.program_basic || {};
            const school = attrs.school || {};
            const logoUrl = school.logoThumbnailUrl || '/placeholder.png';
            const universityName = school.name || '';
            const location = [school.province || school.state, school.countryCode || school.country].filter(Boolean).join(', ');
            const campusCity = school.city || '';
            const tuitionFee = attrs.tuition ? `$${attrs.tuition}${attrs.currency ? ' ' + attrs.currency : ''}` : 'N/A';
            const applicationFee = attrs.applicationFee !== undefined ? (attrs.applicationFee ? `$${attrs.applicationFee}` : 'Free') : (attrs.application_fee ? `$${attrs.application_fee}` : 'Free');
            const duration = attrs.maxLength && attrs.minLength
              ? attrs.maxLength === attrs.minLength
                ? `${attrs.maxLength} months`
                : `${attrs.minLength} - ${attrs.maxLength} months`
              : attrs.duration || 'N/A';
            const programName = attrs.name || '';
            const programLevel = attrs.programLevel || attrs.level || '';
            const intakes = attrs.programIntakes || [];
            const schoolId = school.id || p.school_id;

            return (
              <article
                key={p.id}
                className="program-card"
                style={{
                  background: 'linear-gradient(145deg, #1A3A4A 0%, #2D6A7A 100%)',
                  borderRadius: '2rem',
                  boxShadow: '0 8px 32px 0 rgba(15, 23, 42, 0.25)',
                  border: '1px solid rgba(208, 232, 236, 0.2)',
                  padding: '3.5rem 1.7rem 1.7rem 1.7rem',
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: 440,
                  height: '100%',
                  position: 'relative',
                  overflow: 'visible',
                  transition: 'box-shadow 0.18s, transform 0.18s',
                  animation: 'fadein 0.7s cubic-bezier(.4,2,.6,1) both',
                  cursor: 'pointer'
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.025)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 16px 48px 0 rgba(26, 58, 74, 0.4), 0 0 30px rgba(125, 211, 232, 0.1)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = '';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px 0 rgba(15, 23, 42, 0.25)';
                }}
              >
                {/* Floating logo */}
                <div style={{
                  position: 'absolute',
                  top: -32,
                  right: 24,
                  zIndex: 3,
                  background: '#fff',
                  borderRadius: '50%',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                  width: 64,
                  height: 64,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '3px solid #7dd3e8'
                }}>
                  <img
                    src={logoUrl}
                    alt={universityName}
                    style={{ width: 48, height: 48, objectFit: 'contain', borderRadius: '50%' }}
                  />
                </div>
                {/* University Name and Location */}
                <div style={{ marginBottom: '.7rem', marginTop: '1.5rem' }}>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: '1.18rem',
                      fontWeight: 800,
                      color: '#fff',
                      lineHeight: 1.2,
                      cursor: 'pointer',
                      textUnderlineOffset: '2px',
                    }}
                    onClick={e => {
                      e.stopPropagation();
                      if (schoolId) {
                        window.open(`/universities/${schoolId}`, '_blank', 'noopener,noreferrer');
                      }
                    }}
                    title={`View details for ${universityName}`}
                  >
                    {universityName}
                  </h3>
                  <div style={{ fontSize: '.97rem', color: 'rgba(255, 255, 255, 0.8)', fontWeight: 600, marginTop: '.2rem' }}>
                    {location}
                  </div>
                </div>
                {/* Program Title */}
                <div style={{ marginBottom: '.7rem' }}>
                  <h2 style={{
                    fontSize: '1.13rem',
                    fontWeight: 700,
                    color: '#fff',
                    margin: 0,
                    lineHeight: 1.25,
                    wordBreak: 'break-word'
                  }}>
                    {programName}
                  </h2>
                  <div style={{ fontSize: '.98rem', color: '#7dd3e8', marginTop: '.2rem', fontWeight: 600 }}>
                    {programLevel
                      ? programLevel
                        .replace(/_/g, ' ')
                        .replace(/\b\w/g, (c: string) => c.toUpperCase())
                      : ''}
                  </div>
                </div>
                {/* Details */}
                <dl style={{
                  fontSize: '.98rem',
                  lineHeight: '1.7',
                  margin: 0,
                  marginBottom: '.7rem',
                  color: 'rgba(255, 255, 255, 0.9)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '.2rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <dt style={{ fontWeight: 600, color: 'rgba(255, 255, 255, 0.7)', flex: 1, textAlign: 'left' }}>Location:</dt>
                    <dd style={{ margin: 0, flex: 1, textAlign: 'right', color: '#fff', fontWeight: 500 }}>{location}</dd>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <dt style={{ fontWeight: 600, color: 'rgba(255, 255, 255, 0.7)', flex: 1, textAlign: 'left' }}>Campus city:</dt>
                    <dd style={{ margin: 0, flex: 1, textAlign: 'right', color: '#fff', fontWeight: 500 }}>{campusCity}</dd>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <dt style={{ fontWeight: 600, color: 'rgba(255, 255, 255, 0.7)', flex: 1, textAlign: 'left' }}>Tuition (1st year):</dt>
                    <dd style={{ margin: 0, flex: 1, textAlign: 'right', color: '#fff', fontWeight: 700 }}>{tuitionFee}</dd>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <dt style={{ fontWeight: 600, color: 'rgba(255, 255, 255, 0.7)', flex: 1, textAlign: 'left' }}>Application fee:</dt>
                    <dd style={{ margin: 0, flex: 1, textAlign: 'right', color: '#4ade80', fontWeight: 700 }}>{applicationFee}</dd>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <dt style={{ fontWeight: 600, color: 'rgba(255, 255, 255, 0.7)', flex: 1, textAlign: 'left' }}>Duration:</dt>
                    <dd style={{ margin: 0, flex: 1, textAlign: 'right', color: '#fff', fontWeight: 500 }}>{duration}</dd>
                  </div>
                </dl>
                {/* View Details Button */}
                <button
                  style={{
                    marginTop: 'auto',
                    background: 'linear-gradient(90deg, #fff 0%, #D0E8EC 100%)',
                    color: '#1A3A4A',
                    borderRadius: 14,
                    padding: '.7rem 1.5rem',
                    fontWeight: 700,
                    fontSize: '1.08rem',
                    border: 'none',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
                    cursor: 'pointer',
                    transition: 'background 0.18s, box-shadow 0.18s, transform 0.18s'
                  }}
                  onClick={e => {
                    e.stopPropagation();
                    const url = `/program-details/${p.id}`;
                    const state = {
                      id: p.id,
                      attributes: p.attributes,
                      program_basic: p.program_basic,
                      school_id: p.school_id,
                      school: p.school,
                      program: p.program,
                      program_requirements: p.program_requirements
                    };
                    // Pass state via window.open using sessionStorage
                    const stateKey = `program-details-state-${p.id}`;
                    sessionStorage.setItem(stateKey, JSON.stringify(state));
                    window.open(`${url}?stateKey=${stateKey}`, '_blank', 'noopener,noreferrer');
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.02)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.transform = '';
                  }}
                >
                  View Details
                </button>
                {/* Fade-in animation */}
                <style>{`
                  @keyframes fadein {
                    0% { opacity: 0; transform: translateY(30px);}
                    100% { opacity: 1; transform: none;}
                  }
                `}</style>
              </article>
            );
          })}
        </div>
        {/* Results summary and pagination - moved below programs */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem', marginTop: '1.2rem' }}>
          <div>
            <span className="css-9fpggw" aria-live="polite" aria-atomic="true" data-testid="temp">
              {programs.length > 0
                ? `${(page - 1) * rowsPerPage + 1} - ${Math.min(page * rowsPerPage, total)} of ${total} items`
                : '0 items'}
            </span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.2rem',
            background: 'rgba(208,232,236,0.13)',
            borderRadius: '1.2rem',
            padding: '0.6rem 1.2rem',
            boxShadow: '0 2px 8px #4A8A9A11'
          }}>
            <label htmlFor="items-per-page" style={{ fontSize: '.98rem', color: '#1A3A4A', fontWeight: 600 }}>
              Items per page:
            </label>
            <select
              id="items-per-page"
              value={rowsPerPage}
              onChange={e => { setRowsPerPage(Number(e.target.value)); setPage(1); }}
              style={{
                padding: '.4rem .9rem',
                borderRadius: '8px',
                border: '1.5px solid #4A8A9A',
                fontWeight: 600,
                minWidth: 70,
                background: '#fff',
                color: '#1A3A4A',
                boxShadow: '0 2px 8px rgba(15,23,42,0.06)'
              }}
            >
              <option value={12}>12</option>
              <option value={24}>24</option>
              <option value={48}>48</option>
            </select>
            {/* Pagination buttons */}
            <button
              aria-label="Previous page"
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              style={{
                background: 'linear-gradient(90deg,#1A3A4A 0%,#4A8A9A 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                fontSize: '1.3rem',
                padding: '0 .9rem',
                fontWeight: 700,
                cursor: page > 1 ? 'pointer' : 'not-allowed',
                boxShadow: '0 2px 8px #4A8A9A22',
                transition: 'background 0.18s',
                opacity: page > 1 ? 1 : 0.6
              }}
            >‹</button>
            <span style={{ fontSize: '.98rem', color: '#1A3A4A', fontWeight: 700 }}>{page} / {totalPages || 1}</span>
            <button
              aria-label="Next page"
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
              style={{
                background: 'linear-gradient(90deg,#1A3A4A 0%,#4A8A9A 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                fontSize: '1.3rem',
                padding: '0 .9rem',
                fontWeight: 700,
                cursor: page < totalPages ? 'pointer' : 'not-allowed',
                boxShadow: '0 2px 8px #4A8A9A22',
                transition: 'background 0.18s',
                opacity: page < totalPages ? 1 : 0.6
              }}
            >›</button>
          </div>
        </div>
        {/* Modal for Success Prediction Details */}
        {openIntakes && (
          <div
            role="dialog"
            aria-modal="true"
            className="css-19pzjof"
            tabIndex={-1}
            style={{
              pointerEvents: 'auto',
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(0,0,0,0.25)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={() => setOpenIntakes(null)}
          >
            <div
              className="css-14yws4s"
              style={{
                background: '#fff',
                borderRadius: '18px',
                maxWidth: 552,
                width: '95vw',
                maxHeight: '80vh',
                boxShadow: '0 8px 32px 0 rgba(31,41,55,0.18)',
                padding: '2rem 2rem 1.5rem 2rem',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                pointerEvents: 'auto',
              }}
              onClick={e => e.stopPropagation()}
            >
              {/* Heading at top */}
              <h2 className="css-j24ftc" style={{ margin: 0, marginBottom: '1.2rem', textAlign: 'center' }}>
                <div className="css-1xh2rw1">
                  <div className="css-anbbrp">Success prediction</div>
                </div>
              </h2>
              {/* Scrollable content */}
              <IntakeAccordion intakes={openIntakes.intakes} />
              {/* Close button at bottom */}
              <div className="css-14tan51" style={{ textAlign: 'right', marginTop: '1.5rem' }}>
                <button
                  aria-disabled="false"
                  rel="noopener"
                  type="button"
                  className="css-22x0p3"
                  style={{
                    background: 'linear-gradient(90deg, #1A3A4A 0%, #4A8A9A 100%)',
                    color: '#fff',
                    borderRadius: '8px',
                    padding: '.7rem 1.5rem',
                    fontWeight: 600,
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 16px 0 #1A3A4A22, 0 1.5px 8px 0 #4A8A9A44'
                  }}
                  onClick={() => setOpenIntakes(null)}
                >
                  Close
                </button>
              </div>
            </div>
            <style>
              {`
                @media (min-width: 600px) {
                  .css-19pzjof > .css-14yws4s {
                    max-width: 552px;
                    max-height: calc(-48px + 100vh);
                  }
                }
                @media (min-width: 0px) {
                  .css-19pzjof > .css-14yws4s {
                    max-width: calc(-32px + 100vw);
                    max-height: calc(-48px + 100vh);
                  }
                }
              `}</style>
          </div>
        )}

        {/* Dark Stats Section - Visual Rhythm Break */}
        <section
          style={{
            background: 'linear-gradient(135deg, #0F172A 0%, #1A3A4A 100%)',
            padding: '3rem 1.5rem',
            marginTop: '2.5rem',
            borderRadius: 24,
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Decorative glow */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            height: 400,
            background: 'radial-gradient(circle, rgba(45, 106, 122, 0.25) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: 900,
              color: '#fff',
              marginBottom: '2rem',
              letterSpacing: '-1px'
            }}>
              Why Choose Your Next University?
            </h2>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '3rem',
              flexWrap: 'wrap'
            }}>
              <div style={{ textAlign: 'center' }}>
                <strong style={{
                  fontSize: '2rem',
                  fontWeight: 900,
                  background: 'linear-gradient(90deg, #4A8A9A 0%, #5A9AAA 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'block'
                }}>800+</strong>
                <span style={{ color: '#CBD5E1', fontWeight: 500, fontSize: '0.9rem' }}>Universities</span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <strong style={{
                  fontSize: '2rem',
                  fontWeight: 900,
                  background: 'linear-gradient(90deg, #4A8A9A 0%, #5A9AAA 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'block'
                }}>50k+</strong>
                <span style={{ color: '#CBD5E1', fontWeight: 500, fontSize: '0.9rem' }}>Programs</span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <strong style={{
                  fontSize: '2rem',
                  fontWeight: 900,
                  background: 'linear-gradient(90deg, #4A8A9A 0%, #5A9AAA 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'block'
                }}>8+</strong>
                <span style={{ color: '#CBD5E1', fontWeight: 500, fontSize: '0.9rem' }}>Countries</span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <strong style={{
                  fontSize: '2rem',
                  fontWeight: 900,
                  background: 'linear-gradient(90deg, #4A8A9A 0%, #5A9AAA 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'block'
                }}>₹0</strong>
                <span style={{ color: '#CBD5E1', fontWeight: 500, fontSize: '0.9rem' }}>Application Help</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

const IntakeAccordion: React.FC<{ intakes: any[] }> = ({ intakes }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '.7rem' }}>
      {intakes.map((intake, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={intake.id || intake.startDate} style={{ borderRadius: '12px', overflow: 'hidden', background: '#f9fafb', border: '1px solid #e5e7eb' }}>
            {/* Summary row */}
            <div
              onClick={() => toggleOpen(index)}
              style={{
                cursor: 'pointer',
                padding: '.8rem 1.2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontWeight: 600,
                color: '#1e293b',
                position: 'relative',
                zIndex: 1
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '.8rem' }}>
                {/* Intake start date */}
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#2D6A7A' }}>
                  {intake.startDate ? new Date(intake.startDate).toLocaleString('default', { month: 'short', year: 'numeric' }) : ''}
                </div>
                {/* Arrow icon */}
                <div style={{
                  width: 8, height: 8, borderRadius: '50%', background: '#e5e7eb',
                  position: 'absolute', right: '1rem', transition: 'transform 0.3s',
                  transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)'
                }} />
              </div>
            </div>
            {/* Details row (collapsible) */}
            {isOpen && (
              <div style={{
                padding: '1rem 1.2rem',
                borderTop: '1px solid #e5e7eb',
                background: '#fff',
                color: '#334155',
                fontSize: '.95rem',
                lineHeight: 1.6,
                position: 'relative',
                zIndex: 0
              }}>
                {/* Success score circles */}
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '.8rem' }}>
                  {intake.successScores && Object.entries(intake.successScores).map(([key, value]) => (
                    <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '.4rem' }}>
                      <div style={{
                        width: 24, height: 24, borderRadius: '50%', background: '#e5e7eb',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        position: 'relative'
                      }}>
                        <div style={{
                          width: '70%', height: '70%', borderRadius: '50%',
                          background: key === 'overall' ? '#2D6A7A' : key === 'high' ? 'green' : key === 'average' ? 'orange' : 'red',
                          position: 'absolute', top: 0, left: 0
                        }} />
                        <span style={{ fontSize: '.8rem', fontWeight: 600, color: '#fff', position: 'relative', zIndex: 1 }}>
                          {value as any}
                        </span>
                      </div>
                      <div style={{ fontSize: '.9rem', color: '#334155', fontWeight: 500 }}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </div>
                    </div>
                  ))}
                </div>
                {/* Details list */}
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#334155', fontWeight: 500, lineHeight: 1.7 }}>
                  {intake.details && intake.details.map((detail: any, idx: number) => (
                    <li key={idx} style={{ paddingLeft: '1.2rem', position: 'relative', marginBottom: '.4rem' }}>
                      <div style={{
                        position: 'absolute',
                        left: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: '#2D6A7A',
                        border: '2px solid #fff'
                      }} />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

