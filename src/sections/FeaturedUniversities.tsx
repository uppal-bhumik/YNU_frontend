import React, { useEffect, useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import { useApi } from '../hooks/useApi';
import { useNavigate } from 'react-router-dom';
import countriesData from '../pages/countries.json';
import universitiesData from '../pages/universities.json';
import programsData from '../pages/programs.json';


interface FeaturedUniversitiesProps {
  style?: React.CSSProperties;
}

export const FeaturedUniversities: React.FC<FeaturedUniversitiesProps> = ({ style }) => {
  const ref = useReveal();
  const api = useApi();
  const navigate = useNavigate();

  // State for filters
  const [country, setCountry] = useState('');
  const [universityName, setUniversityName] = useState('');
  const [programName, setProgramName] = useState('');
  const [tuitionRange, setTuitionRange] = useState<[number, number]>([0, 100000]);
  const [rangeDragging, setRangeDragging] = useState<'min' | 'max' | null>(null);

  // Use JSON files for dropdowns
  const [allCountries, setAllCountries] = useState<{ label: string; value: string }[]>([]);
  const [allUniversities, setAllUniversities] = useState<string[]>([]);
  const [allProgramNames, setAllProgramNames] = useState<string[]>([]);

  useEffect(() => {
    const countryArr = Object.entries((countriesData as any).countries || {}).map(
      ([label, value]) => ({ label, value: String(value) })
    );
    setAllCountries(countryArr);

    setAllUniversities(((universitiesData as any).universities || []));

    // Extract program names from the array in programs.json
    setAllProgramNames(Array.isArray((programsData as any).programs)
      ? (programsData as any).programs.map((p: any) => typeof p === 'string' ? p : p.name)
      : []);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!rangeDragging) return;
      
      const rangeMin = 0;
      const rangeMax = 100000;
      
      // Find the container element
      const container = document.querySelector('[style*="position: relative"][style*="height: 30px"]');
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      const percent = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
      const value = Math.round(percent * (rangeMax - rangeMin) + rangeMin);
      
      if (rangeDragging === 'min') {
        setTuitionRange([Math.min(value, tuitionRange[1]), tuitionRange[1]]);
      } else if (rangeDragging === 'max') {
        setTuitionRange([tuitionRange[0], Math.max(value, tuitionRange[0])]);
      }
    };
    
    const handleMouseUp = () => {
      setRangeDragging(null);
    };
    
    if (rangeDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [rangeDragging, tuitionRange]);

  const handleExploreClick = () => {
    // Build query params based on filters
    const params: Record<string, string | number> = {};
    if (country) {
      const countryObj = allCountries.find(c => c.value === country);
      params.country = countryObj ? countryObj.label : country;
    }
    if (universityName) params.university_name = universityName;
    if (programName) params.program_name = programName;
    if (tuitionRange[0]) params.min_fees = tuitionRange[0];
    if (tuitionRange[1]) params.max_fees = tuitionRange[1];

    const queryString = new URLSearchParams(params as any).toString();
    navigate(`/universities${queryString ? '?' + queryString : ''}`);
  };

  return (
    <section
      className="section alt reveal"
      id="universities"
      ref={ref as any}
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: 0,
        minHeight: 420,
        margin: '2.5rem auto 0 auto',
        maxWidth: 1400,
        ...style,
      }}
    >

      {/* Section content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '2.5rem',
        flexWrap: 'wrap',
        padding: '3.5rem 2.5rem 2.5rem 2.5rem',
      }}>
        {/* Left: Title and search */}
        <div style={{
          flex: 1,
          minWidth: 320,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          textAlign: 'left',
        }}>
          <h2
            style={{
              fontSize: '2.2rem',
              fontWeight: 900,
              letterSpacing: '-1.5px',
              marginBottom: '0.7rem',
              textShadow: '0 2px 16px #9F7AEA44, 0 1px 2px #5727A344',
              textTransform: 'uppercase',
              background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent'
            }}
          >
            UNIVERSITY EXPLORER
          </h2>
          <div
            style={{
              fontSize: '1.18rem',
              color: '#9F7AEA',
              fontWeight: 700,
              marginBottom: '1.5rem',
              maxWidth: 520,
              textShadow: '0 2px 12px #5727A344',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <span role="img" aria-label="globe">🌍</span> 800+ Universities. 6+ Countries. One Platform.
          </div>
          {/* Filter Controls Row */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              alignItems: 'center',
              marginBottom: '1.5rem',
              width: '100%'
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
              }}
            >
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
              }}
            >
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                <span>Min: {tuitionRange[0]}</span>
                <span style={{ flex: 1, textAlign: 'center' }}>Max: {tuitionRange[1]}</span>
              </div>
              <div 
                style={{ position: 'relative', height: '30px', display: 'flex', alignItems: 'center' }}
                onMouseDown={e => {
                  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                  const pos = (e.clientX - rect.left) / rect.width;
                  const value = pos * 100000;
                  const minDist = Math.abs(value - tuitionRange[0]);
                  const maxDist = Math.abs(value - tuitionRange[1]);
                  
                  if (minDist < maxDist) {
                    setRangeDragging('min');
                  } else {
                    setRangeDragging('max');
                  }
                }}
              >
                <div style={{
                  position: 'absolute',
                  width: '100%',
                  height: '8px',
                  background: '#e5e7eb',
                  borderRadius: '4px',
                  zIndex: 1
                }} />
                <div style={{
                  position: 'absolute',
                  height: '8px',
                  background: '#5727A3',
                  borderRadius: '4px',
                  left: `${(tuitionRange[0] / 100000) * 100}%`,
                  width: `${((tuitionRange[1] - tuitionRange[0]) / 100000) * 100}%`,
                  zIndex: 2
                }} />
                <div
                  style={{
                    position: 'absolute',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: '#5727A3',
                    left: `${(tuitionRange[0] / 100000) * 100}%`,
                    transform: 'translate(-50%, -50%)',
                    top: '50%',
                    zIndex: 3,
                    cursor: 'ew-resize',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }}
                  onMouseDown={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    setRangeDragging('min');
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: '#5727A3',
                    left: `${(tuitionRange[1] / 100000) * 100}%`,
                    transform: 'translate(-50%, -50%)',
                    top: '50%',
                    zIndex: 3,
                    cursor: 'ew-resize',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }}
                  onMouseDown={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    setRangeDragging('max');
                  }}
                />
              </div>
            </div>
          </div>
          <button
            onClick={handleExploreClick}
            style={{
              background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '1.07rem',
              border: 'none',
              borderRadius: 8,
              padding: '0.7rem 1.6rem',
              cursor: 'pointer',
              boxShadow: '0 2px 8px #9F7AEA22',
              transition: 'background 0.18s',
              width: 'fit-content',
              marginBottom: '1rem'
            }}
          >
            Explore
          </button>
          <div style={{ fontSize: '.97rem', color: '#5727A3', opacity: 0.8, marginBottom: '0.5rem' }}>
            Discover top universities, compare programs, and find your dream campus.
          </div>
        </div>
        {/* Right: Step-wise list */}
        <div style={{
          flex: 1.2,
          minWidth: 320,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 260,
        }}>
          <ol style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '1.1rem',
            width: '100%',
            maxWidth: 420
          }}>
            <li style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              background: 'rgba(255,255,255,0.7)',
              borderRadius: 12,
              padding: '1rem 1.2rem',
              fontWeight: 600,
              color: '#5727A3',
              fontSize: '1.08rem',
              boxShadow: '0 2px 8px #D6C5F011'
            }}>
              <span style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'linear-gradient(90deg,#D6C5F0 0%,#9F7AEA 100%)',
                color: '#5727A3',
                fontWeight: 900,
                fontSize: '1.18rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px #9F7AEA22',
                flexShrink: 0
              }}>1</span>
              <span>Shortlist your dream destination</span>
            </li>
            <li style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
              borderRadius: 14,
              padding: '1.1rem 1.3rem',
              fontWeight: 700,
              color: '#fff',
              fontSize: '1.13rem',
              boxShadow: '0 4px 16px #9F7AEA22, 0 2px 8px #5727A344',
              border: '2px solid #9F7AEA',
              transform: 'scale(1.04)',
              zIndex: 2
            }}>
              <span style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: '#fff',
                color: '#5727A3',
                fontWeight: 900,
                fontSize: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px #9F7AEA22',
                flexShrink: 0,
                border: '2px solid #9F7AEA'
              }}>2</span>
              <span>Find the right university &amp; course</span>
            </li>
            <li style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              background: 'rgba(255,255,255,0.7)',
              borderRadius: 12,
              padding: '1rem 1.2rem',
              fontWeight: 600,
              color: '#5727A3',
              fontSize: '1.08rem',
              boxShadow: '0 2px 8px #D6C5F011'
            }}>
              <span style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'linear-gradient(90deg,#D6C5F0 0%,#9F7AEA 100%)',
                color: '#5727A3',
                fontWeight: 900,
                fontSize: '1.18rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px #9F7AEA22',
                flexShrink: 0
              }}>3</span>
              <span>Apply, get guidance, and succeed</span>
            </li>
          </ol>
        </div>
      </div>
      <style>
        {`
          @media (max-width: 900px) {
            #universities h2 {
              font-size: 1.5rem !important;
            }
            #universities div[style*="font-size: 1.18rem"] {
              font-size: 1.01rem !important;
            }
            #universities form {
              flex-direction: column !important;
              gap: 0.7rem !important;
              padding: 0.7rem 0.5rem !important;
            }
            #universities .btn-primary {
              font-size: 0.98rem !important;
              padding: 0.7rem 1.2rem !important;
            }
            #universities .container {
              margin-top: 180px !important;
            }
            #universities > div[style*="left: 0"] {
              width: 100% !important;
              padding-left: 1.2rem !important;
              padding-right: 1.2rem !important;
              align-items: center !important;
              text-align: center !important;
            }
            #universities > div[style*="flex-direction: row"] {
              flex-direction: column !important;
              gap: 1.5rem !important;
              padding: 2rem 0.7rem 1.5rem 0.7rem !important;
            }
            #universities > div[style*="flex-direction: row"] > div:last-child {
              flex-direction: row !important;
              gap: 1rem !important;
              justify-content: flex-start !important;
              overflow-x: auto !important;
              padding: 0.5rem 0 !important;
            }
          }
          @media (max-width: 600px) {
            #universities h2 {
              font-size: 1.1rem !important;
            }
            #universities div[style*="font-size: 1.18rem"] {
              font-size: 0.89rem !important;
            }
            #universities form {
              flex-direction: column !important;
              gap: 0.5rem !important;
              padding: 0.5rem 0.2rem !important;
            }
            #universities .btn-primary {
              font-size: 0.89rem !important;
              padding: 0.5rem 0.8rem !important;
            }
            #universities .container {
              margin-top: 100px !important;
            }
            #universities > div[style*="left: 0"] {
              width: 100% !important;
              padding-left: 0.7rem !important;
              padding-right: 0.7rem !important;
              align-items: center !important;
              text-align: center !important;
            }
            #universities > div[style*="flex-direction: row"] {
              flex-direction: column !important;
              gap: 1rem !important;
              padding: 1.2rem 0.3rem 1rem 0.3rem !important;
            }
            #universities > div[style*="flex-direction: row"] > div:last-child {
              flex-direction: row !important;
              gap: 0.7rem !important;
              justify-content: flex-start !important;
              overflow-x: auto !important;
              padding: 0.5rem 0 !important;
            }
          }
        `}
      </style>
    </section>
  );
};
     