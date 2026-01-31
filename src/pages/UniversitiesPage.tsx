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

const BASE_URL = "https://studconnect-backend.onrender.com"; 
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

  const tuitionRangeTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const countryArr = Object.entries((countriesData as any).countries || {}).map(
      ([label, value]) => ({ label, value })
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
        background: 'linear-gradient(90deg,#D6C5F0 0%,#fff 100%)',
        minHeight: '100vh',
        paddingBottom: '2rem',
        position: 'relative',
        zIndex: 1,
        paddingTop: '90px', // Add space for fixed header
      }}
    >
      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        marginTop: '2.5rem',
        borderRadius: '2.2rem',
        boxShadow: '0 8px 32px 0 #9F7AEA22, 0 1.5px 8px 0 #D6C5F022',
        position: 'relative',
        padding: '10px',
        zIndex: 2,
        background: 'linear-gradient(120deg, #fff 60%, #D6C5F0 100%)'
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
                border: '1px solid #e5e7eb',
                fontWeight: 500,
                minWidth: 140,
                background: '#f8fafc',
                flex: '1 1 180px',
                maxWidth: 260
              }}>
              <option value="">All Countries</option>
              {allCountries.map(c => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
            <select
              value={universityName}
              onChange={e => setUniversityName(e.target.value)}
              style={{
                padding: '.55rem 1.1rem',
                borderRadius: '10px',
                border: '1px solid #e5e7eb',
                fontWeight: 500,
                minWidth: 180,
                background: '#f8fafc',
                flex: '1 1 220px',
                maxWidth: 320
              }}>
              <option value="">All Universities</option>
              {allUniversities.map(u => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Search Program"
              value={programName}
              onChange={e => setProgramName(e.target.value)}
              style={{
                padding: '.55rem 1.1rem',
                borderRadius: '10px',
                border: '1px solid #e5e7eb',
                fontWeight: 500,
                minWidth: 180,
                background: '#f8fafc',
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
              <label style={{ fontWeight: 600, color: '#5727A3', marginBottom: '.5rem', display: 'block' }}>
                Tuition Range (₹)
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <input
                  type="range"
                  min={0}
                  max={100000}
                  step={1000}
                  value={tuitionRange[0]}
                  onChange={e => setTuitionRange([Number(e.target.value), tuitionRange[1]])}
                  style={{ flex: 1 }}
                />
                <span>Min: {tuitionRange[0]}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '.5rem' }}>
                <input
                  type="range"
                  min={0}
                  max={100000}
                  step={1000}
                  value={tuitionRange[1]}
                  onChange={e => setTuitionRange([tuitionRange[0], Number(e.target.value)])}
                  style={{ flex: 1 }}
                />
                <span>Max: {tuitionRange[1]}</span>
              </div>
            </div>
          </div>
          <style>
            {`
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
                  background: 'linear-gradient(120deg, #fff 60%, #D6C5F0 100%)',
                  borderRadius: '2rem',
                  boxShadow: '0 4px 24px 0 #9F7AEA22, 0 2px 8px 0 #D6C5F022',
                  border: '1.5px solid #D6C5F0',
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
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 40px 0 #9F7AEA33, 0 2px 12px 0 #D6C5F044';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = '';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 24px 0 #9F7AEA22, 0 2px 8px 0 #D6C5F022';
                }}
              >
                {/* Accent bar */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: 7,
                  borderTopLeftRadius: '2rem',
                  borderTopRightRadius: '2rem',
                  opacity: 0.18,
                  zIndex: 1
                }} />
                {/* Floating logo */}
                <div style={{
                  position: 'absolute',
                  top: -32,
                  right: 24,
                  zIndex: 3,
                  background: '#fff',
                  borderRadius: '50%',
                  boxShadow: '0 2px 12px #9F7AEA22',
                  width: 64,
                  height: 64,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2.5px solid #D6C5F0'
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
                      color: '#5727A3',
                      lineHeight: 1.2,
                      cursor: 'pointer',
                      textUnderlineOffset: '2px',
                      background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
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
                  <div style={{ fontSize: '.97rem', color: '#1B0044', fontWeight: 600, marginTop: '.2rem' }}>
                    {location}
                  </div>
                </div>
                {/* Program Title */}
                <div style={{ marginBottom: '.7rem' }}>
                  <h2 style={{
                    fontSize: '1.13rem',
                    fontWeight: 700,
                    color: '#1B0044',
                    margin: 0,
                    lineHeight: 1.25,
                    wordBreak: 'break-word'
                  }}>
                    {programName}
                  </h2>
                  <div style={{ fontSize: '.98rem', color: '#9F7AEA', marginTop: '.2rem', fontWeight: 600 }}>
                    {programLevel
                      ? programLevel
                          .replace(/_/g, ' ')
                          .replace(/\b\w/g, c => c.toUpperCase())
                      : ''}
                  </div>
                </div>
                {/* Details */}
                <dl style={{
                  fontSize: '.98rem',
                  lineHeight: '1.7',
                  margin: 0,
                  marginBottom: '.7rem',
                  color: '#1B0044',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '.2rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <dt style={{ fontWeight: 600, color: '#5727A3', flex: 1, textAlign: 'left' }}>Location:</dt>
                    <dd style={{ margin: 0, flex: 1, textAlign: 'right', color: '#1B0044', fontWeight: 500 }}>{location}</dd>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <dt style={{ fontWeight: 600, color: '#5727A3', flex: 1, textAlign: 'left' }}>Campus city:</dt>
                    <dd style={{ margin: 0, flex: 1, textAlign: 'right', color: '#1B0044', fontWeight: 500 }}>{campusCity}</dd>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <dt style={{ fontWeight: 600, color: '#5727A3', flex: 1, textAlign: 'left' }}>Tuition (1st year):</dt>
                    <dd style={{ margin: 0, flex: 1, textAlign: 'right', color: '#5727A3', fontWeight: 700 }}>{tuitionFee}</dd>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <dt style={{ fontWeight: 600, color: '#5727A3', flex: 1, textAlign: 'left' }}>Application fee:</dt>
                    <dd style={{ margin: 0, flex: 1, textAlign: 'right', color: '#22c55e', fontWeight: 700 }}>{applicationFee}</dd>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <dt style={{ fontWeight: 600, color: '#5727A3', flex: 1, textAlign: 'left' }}>Duration:</dt>
                    <dd style={{ margin: 0, flex: 1, textAlign: 'right', color: '#1B0044', fontWeight: 500 }}>{duration}</dd>
                  </div>
                </dl>
                {/* View Details Button */}
                <button
                  style={{
                    marginTop: 'auto',
                    background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
                    color: '#fff',
                    borderRadius: 14,
                    padding: '.7rem 1.5rem',
                    fontWeight: 700,
                    fontSize: '1.08rem',
                    border: 'none',
                    boxShadow: '0 2px 8px #9F7AEA22',
                    cursor: 'pointer',
                    transition: 'background 0.18s, box-shadow 0.18s'
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
            background: 'rgba(214,197,240,0.13)',
            borderRadius: '1.2rem',
            padding: '0.6rem 1.2rem',
            boxShadow: '0 2px 8px #9F7AEA11'
          }}>
            <label htmlFor="items-per-page" style={{ fontSize: '.98rem', color: '#5727A3', fontWeight: 600 }}>
              Items per page:
            </label>
            <select
              id="items-per-page"
              value={rowsPerPage}
              onChange={e => { setRowsPerPage(Number(e.target.value)); setPage(1); }}
              style={{
                padding: '.4rem .9rem',
                borderRadius: '8px',
                border: '1.5px solid #9F7AEA',
                fontWeight: 600,
                minWidth: 70,
                background: 'linear-gradient(90deg,#fff 60%,#D6C5F0 100%)',
                color: '#5727A3',
                boxShadow: '0 1px 4px #9F7AEA11'
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
                background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                fontSize: '1.3rem',
                padding: '0 .9rem',
                fontWeight: 700,
                cursor: page > 1 ? 'pointer' : 'not-allowed',
                boxShadow: '0 2px 8px #9F7AEA22',
                transition: 'background 0.18s',
                opacity: page > 1 ? 1 : 0.6
              }}
            >‹</button>
            <span style={{ fontSize: '.98rem', color: '#5727A3', fontWeight: 700 }}>{page} / {totalPages || 1}</span>
            <button
              aria-label="Next page"
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
              style={{
                background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                fontSize: '1.3rem',
                padding: '0 .9rem',
                fontWeight: 700,
                cursor: page < totalPages ? 'pointer' : 'not-allowed',
                boxShadow: '0 2px 8px #9F7AEA22',
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
                    background: 'linear-gradient(90deg, rgb(55, 81, 138) 0%, rgb(96, 165, 250) 100%)',
                    color: '#fff',
                    borderRadius: '8px',
                    padding: '.7rem 1.5rem',
                    fontWeight: 600,
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 16px 0 rgba(37,99,235,0.18), 0 1.5px 8px 0 #93c5fd'
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
              `}
            </style>
          </div>
        )}
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
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#2563eb' }}>
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
                          background: key === 'overall' ? '#2563eb' : key === 'high' ? 'green' : key === 'average' ? 'orange' : 'red',
                          position: 'absolute', top: 0, left: 0
                        }} />
                        <span style={{ fontSize: '.8rem', fontWeight: 600, color: '#fff', position: 'relative', zIndex: 1 }}>
                          {value}
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
                  {intake.details && intake.details.map((detail, idx) => (
                    <li key={idx} style={{ paddingLeft: '1.2rem', position: 'relative', marginBottom: '.4rem' }}>
                      <div style={{
                        position: 'absolute',
                        left: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: '#2563eb',
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