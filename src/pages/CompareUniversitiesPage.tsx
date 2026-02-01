import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../apiBase';

interface UniversityOption {
    id: string;
    name: string;
    country: string;
}

interface University {
    id: string;
    name: string;
    country: string;
    state: string | null;
    tuition: {
        min: number;
        max: number;
        currency: string;
    };
    programs: {
        total_count: number;
        levels: string[];
    };
    scholarships: {
        count: number;
        available: boolean;
    };
    ranking: number | null;
    living_cost_aud: number | null;
}

interface CompareResponse {
    universities: University[];
    meta: {
        compared_count: number;
        generated_at: string;
    };
}

const CompareUniversitiesPage: React.FC = () => {
    const navigate = useNavigate();
    const [selectedUniversities, setSelectedUniversities] = useState<UniversityOption[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<UniversityOption[]>([]);
    const [comparisonData, setComparisonData] = useState<CompareResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showMaxWarning, setShowMaxWarning] = useState(false);

    // Debounced search for universities with real IDs
    useEffect(() => {
        if (!searchTerm || searchTerm.length < 2) {
            setSearchResults([]);
            return;
        }

        const timer = setTimeout(async () => {
            setSearchLoading(true);
            try {
                // Use the program-details endpoint to get universities with real IDs
                const response = await fetch(
                    `${API_BASE_URL}/api/program-details?university_name=${encodeURIComponent(searchTerm)}&page_size=20`
                );
                if (!response.ok) throw new Error('Search failed');
                const data = await response.json();

                // Extract unique universities from program results
                const uniqueMap = new Map<string, UniversityOption>();
                (data.items || []).forEach((item: any) => {
                    const school = item.program_basic?.school || {};
                    const schoolId = school.id || item.school_id;
                    if (schoolId && school.name) {
                        // Check if not already selected
                        const isAlreadySelected = selectedUniversities.some((u) => u.id === String(schoolId));
                        if (!isAlreadySelected && !uniqueMap.has(String(schoolId))) {
                            uniqueMap.set(String(schoolId), {
                                id: String(schoolId),
                                name: school.name,
                                country: school.countryCode || school.country || '',
                            });
                        }
                    }
                });
                setSearchResults(Array.from(uniqueMap.values()).slice(0, 10));
            } catch (err) {
                console.error('Search error:', err);
                setSearchResults([]);
            } finally {
                setSearchLoading(false);
            }
        }, 400);

        return () => clearTimeout(timer);
    }, [searchTerm, selectedUniversities]);

    // Fetch comparison data when selected universities change
    useEffect(() => {
        if (selectedUniversities.length === 0) {
            setComparisonData(null);
            return;
        }

        const fetchComparison = async () => {
            setLoading(true);
            setError(null);
            try {
                const idsParam = selectedUniversities.map((u) => u.id).join(',');
                const response = await fetch(`${API_BASE_URL}/api/compare-universities?ids=${idsParam}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch comparison data');
                }
                const data: CompareResponse = await response.json();
                setComparisonData(data);
                setError(null);
            } catch (err: any) {
                setError(err.message || 'An error occurred');
                // Show selected universities with placeholder data on error
                const placeholderData: CompareResponse = {
                    universities: selectedUniversities.map((u) => ({
                        id: u.id,
                        name: u.name,
                        country: u.country || 'Unknown',
                        state: null,
                        tuition: { min: 0, max: 0, currency: 'USD' },
                        programs: { total_count: 0, levels: [] },
                        scholarships: { count: 0, available: false },
                        ranking: null,
                        living_cost_aud: null,
                    })),
                    meta: { compared_count: selectedUniversities.length, generated_at: new Date().toISOString() },
                };
                setComparisonData(placeholderData);
            } finally {
                setLoading(false);
            }
        };

        fetchComparison();
    }, [selectedUniversities]);

    const handleSelectUniversity = (university: UniversityOption) => {
        if (selectedUniversities.length >= 4) {
            setShowMaxWarning(true);
            setTimeout(() => setShowMaxWarning(false), 3000);
            return;
        }
        setSelectedUniversities([...selectedUniversities, university]);
        setSearchTerm('');
        setSearchResults([]);
    };

    const handleRemoveUniversity = (id: string) => {
        setSelectedUniversities(selectedUniversities.filter((u) => u.id !== id));
    };

    const handleClearAll = () => {
        setSelectedUniversities([]);
        setComparisonData(null);
    };

    return (
        <main
            style={{
                background: '#fff',
                minHeight: '100vh',
                paddingBottom: '3rem',
            }}
        >
            {/* Dark Hero Section */}
            <section
                style={{
                    background: 'linear-gradient(135deg, #0F172A 0%, #1A3A4A 100%)',
                    padding: '120px 1.5rem 80px 1.5rem',
                    textAlign: 'center',
                    position: 'relative',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'radial-gradient(circle at 50% 100%, rgba(45, 106, 122, 0.25), transparent 50%)',
                        pointerEvents: 'none',
                    }}
                />
                <h1
                    style={{
                        fontSize: '3rem',
                        fontWeight: 900,
                        color: '#fff',
                        marginBottom: '1rem',
                        letterSpacing: '-2px',
                        lineHeight: 1.1,
                        position: 'relative',
                        zIndex: 1,
                    }}
                >
                    Compare Universities
                </h1>
                <p
                    style={{
                        fontSize: '1.2rem',
                        color: '#CBD5E1',
                        fontWeight: 500,
                        maxWidth: 600,
                        margin: '0 auto',
                        position: 'relative',
                        zIndex: 1,
                    }}
                >
                    Select up to 4 universities to compare side-by-side
                </p>
            </section>

            {/* Content Container */}
            <div
                style={{
                    maxWidth: 1280,
                    margin: '0 auto',
                    marginTop: '-3rem',
                    borderRadius: '2rem',
                    boxShadow: '0 20px 60px -10px rgba(15, 23, 42, 0.15)',
                    position: 'relative',
                    padding: '2rem',
                    zIndex: 2,
                    background: '#fff',
                    border: '1px solid #e2e8f0',
                }}
            >
                {/* Selection Area */}
                <div style={{ marginBottom: '2rem' }}>
                    <h2
                        style={{
                            fontSize: '1.4rem',
                            fontWeight: 700,
                            color: '#1A3A4A',
                            marginBottom: '1rem',
                        }}
                    >
                        Select Universities to Compare
                    </h2>

                    {/* Search Input */}
                    <div style={{ position: 'relative', maxWidth: 500 }}>
                        <input
                            type="text"
                            placeholder="Search universities (type at least 2 characters)..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.8rem 1rem',
                                borderRadius: '12px',
                                border: '2px solid #D0E8EC',
                                fontSize: '1rem',
                                outline: 'none',
                                transition: 'border-color 0.2s',
                                background: '#fff',
                            }}
                            onFocus={(e) => (e.target.style.borderColor = '#4A8A9A')}
                            onBlur={(e) => (e.target.style.borderColor = '#D0E8EC')}
                        />

                        {/* Loading indicator */}
                        {searchLoading && (
                            <div
                                style={{
                                    position: 'absolute',
                                    right: 12,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: '#4A8A9A',
                                    fontSize: '0.9rem',
                                }}
                            >
                                Searching...
                            </div>
                        )}

                        {/* Dropdown */}
                        {searchTerm.length >= 2 && searchResults.length > 0 && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: 0,
                                    right: 0,
                                    background: '#fff',
                                    border: '1px solid #D0E8EC',
                                    borderRadius: '12px',
                                    marginTop: '4px',
                                    maxHeight: 300,
                                    overflowY: 'auto',
                                    zIndex: 100,
                                    boxShadow: '0 8px 24px rgba(15, 23, 42, 0.12)',
                                }}
                            >
                                {searchResults.map((uni) => (
                                    <div
                                        key={uni.id}
                                        onClick={() => handleSelectUniversity(uni)}
                                        style={{
                                            padding: '0.75rem 1rem',
                                            cursor: 'pointer',
                                            borderBottom: '1px solid #E8F4F6',
                                            transition: 'background 0.15s',
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget.style.background = '#E8F4F6')}
                                        onMouseLeave={(e) => (e.currentTarget.style.background = '#fff')}
                                    >
                                        <div style={{ fontWeight: 600, color: '#1A3A4A' }}>{uni.name}</div>
                                        <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                                            {uni.country} • ID: {uni.id}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* No results message */}
                        {searchTerm.length >= 2 && !searchLoading && searchResults.length === 0 && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: 0,
                                    right: 0,
                                    background: '#fff',
                                    border: '1px solid #D0E8EC',
                                    borderRadius: '12px',
                                    marginTop: '4px',
                                    padding: '1rem',
                                    textAlign: 'center',
                                    color: '#64748b',
                                    boxShadow: '0 8px 24px rgba(15, 23, 42, 0.12)',
                                }}
                            >
                                No universities found. Try a different search term.
                            </div>
                        )}
                    </div>

                    {/* Max Warning */}
                    {showMaxWarning && (
                        <div
                            style={{
                                marginTop: '0.75rem',
                                padding: '0.6rem 1rem',
                                background: '#FEF3C7',
                                border: '1px solid #F59E0B',
                                borderRadius: '8px',
                                color: '#92400E',
                                fontSize: '0.9rem',
                                fontWeight: 500,
                                display: 'inline-block',
                            }}
                        >
                            ⚠️ Maximum 4 universities can be compared at once
                        </div>
                    )}

                    {/* Selected Universities Chips */}
                    {selectedUniversities.length > 0 && (
                        <div
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '0.75rem',
                                marginTop: '1.25rem',
                            }}
                        >
                            {selectedUniversities.map((uni) => (
                                <div
                                    key={uni.id}
                                    style={{
                                        background: 'linear-gradient(135deg, #1A3A4A 0%, #2D6A7A 100%)',
                                        color: '#fff',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '999px',
                                        fontSize: '0.9rem',
                                        fontWeight: 600,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                    }}
                                >
                                    {uni.name}
                                    <button
                                        onClick={() => handleRemoveUniversity(uni.id)}
                                        style={{
                                            background: 'rgba(255,255,255,0.2)',
                                            border: 'none',
                                            borderRadius: '50%',
                                            width: 22,
                                            height: 22,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            color: '#fff',
                                            fontSize: '1rem',
                                            fontWeight: 700,
                                        }}
                                        title="Remove"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}

                            <button
                                onClick={handleClearAll}
                                style={{
                                    background: 'transparent',
                                    border: '1px solid #dc2626',
                                    color: '#dc2626',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '999px',
                                    fontSize: '0.85rem',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = '#dc2626';
                                    e.currentTarget.style.color = '#fff';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'transparent';
                                    e.currentTarget.style.color = '#dc2626';
                                }}
                            >
                                Clear All
                            </button>
                        </div>
                    )}
                </div>

                {/* Loading State */}
                {loading && (
                    <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                        <div
                            style={{
                                width: 40,
                                height: 40,
                                border: '3px solid #D0E8EC',
                                borderTopColor: '#4A8A9A',
                                borderRadius: '50%',
                                margin: '0 auto 1rem',
                                animation: 'spin 1s linear infinite',
                            }}
                        />
                        Loading comparison data...
                        <style>{`@keyframes spin { to { transform: rotate(360deg); }}`}</style>
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <div
                        style={{
                            textAlign: 'center',
                            padding: '1rem',
                            background: '#FEF2F2',
                            border: '1px solid #FECACA',
                            borderRadius: '12px',
                            color: '#991B1B',
                            marginBottom: '1.5rem',
                        }}
                    >
                        ⚠️ {error} — Showing placeholder data
                    </div>
                )}

                {/* Empty State */}
                {!loading && selectedUniversities.length === 0 && (
                    <div
                        style={{
                            textAlign: 'center',
                            padding: '4rem 2rem',
                            background: 'linear-gradient(135deg, #E8F4F6 0%, #D0E8EC 100%)',
                            borderRadius: '1.5rem',
                            border: '2px dashed #4A8A9A',
                        }}
                    >
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎓</div>
                        <h3 style={{ color: '#1A3A4A', fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                            No Universities Selected
                        </h3>
                        <p style={{ color: '#64748b', fontSize: '1rem', maxWidth: 400, margin: '0 auto' }}>
                            Use the search bar above to find and select universities you want to compare.
                        </p>
                    </div>
                )}

                {/* Comparison Grid */}
                {!loading && comparisonData && comparisonData.universities.length > 0 && (
                    <div style={{ overflowX: 'auto' }}>
                        <table
                            style={{
                                width: '100%',
                                borderCollapse: 'separate',
                                borderSpacing: '0',
                                minWidth: 700,
                            }}
                        >
                            <thead>
                                <tr>
                                    <th
                                        style={{
                                            textAlign: 'left',
                                            padding: '1rem',
                                            background: 'linear-gradient(135deg, #0F172A 0%, #1A3A4A 100%)',
                                            color: '#fff',
                                            fontWeight: 700,
                                            fontSize: '0.85rem',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px',
                                            borderRadius: '12px 0 0 0',
                                            width: 160,
                                        }}
                                    >
                                        Attribute
                                    </th>
                                    {comparisonData.universities.map((uni, idx) => (
                                        <th
                                            key={uni.id}
                                            style={{
                                                textAlign: 'center',
                                                padding: '1rem',
                                                background: 'linear-gradient(135deg, #0F172A 0%, #1A3A4A 100%)',
                                                color: '#fff',
                                                fontWeight: 700,
                                                fontSize: '1rem',
                                                borderRadius: idx === comparisonData.universities.length - 1 ? '0 12px 0 0' : 0,
                                                minWidth: 200,
                                            }}
                                        >
                                            {uni.name}
                                            <button
                                                onClick={() => handleRemoveUniversity(uni.id)}
                                                style={{
                                                    marginLeft: '0.5rem',
                                                    background: 'rgba(255,255,255,0.2)',
                                                    border: 'none',
                                                    borderRadius: '50%',
                                                    width: 20,
                                                    height: 20,
                                                    color: '#fff',
                                                    cursor: 'pointer',
                                                    fontSize: '0.85rem',
                                                    fontWeight: 700,
                                                    verticalAlign: 'middle',
                                                }}
                                                title="Remove"
                                            >
                                                ×
                                            </button>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {/* Country */}
                                <tr>
                                    <td style={rowLabelStyle}>Country</td>
                                    {comparisonData.universities.map((uni) => (
                                        <td key={uni.id} style={cellStyle}>
                                            {uni.country || '—'}
                                        </td>
                                    ))}
                                </tr>

                                {/* State */}
                                <tr>
                                    <td style={rowLabelStyle}>State / Region</td>
                                    {comparisonData.universities.map((uni) => (
                                        <td key={uni.id} style={cellStyle}>
                                            {uni.state || '—'}
                                        </td>
                                    ))}
                                </tr>

                                {/* Tuition Range */}
                                <tr>
                                    <td style={rowLabelStyle}>Tuition Range</td>
                                    {comparisonData.universities.map((uni) => (
                                        <td key={uni.id} style={cellStyle}>
                                            {uni.tuition.min > 0 || uni.tuition.max > 0 ? (
                                                <span style={{ fontWeight: 700, color: '#1A3A4A' }}>
                                                    ${uni.tuition.min.toLocaleString()} – ${uni.tuition.max.toLocaleString()}{' '}
                                                    <span style={{ fontWeight: 400, color: '#64748b' }}>{uni.tuition.currency}</span>
                                                </span>
                                            ) : (
                                                '—'
                                            )}
                                        </td>
                                    ))}
                                </tr>

                                {/* Total Programs */}
                                <tr>
                                    <td style={rowLabelStyle}>Total Programs</td>
                                    {comparisonData.universities.map((uni) => (
                                        <td key={uni.id} style={cellStyle}>
                                            <span style={{ fontWeight: 700, fontSize: '1.2rem', color: '#2D6A7A' }}>
                                                {uni.programs.total_count}
                                            </span>
                                        </td>
                                    ))}
                                </tr>

                                {/* Degree Levels */}
                                <tr>
                                    <td style={rowLabelStyle}>Degree Levels</td>
                                    {comparisonData.universities.map((uni) => (
                                        <td key={uni.id} style={cellStyle}>
                                            {uni.programs.levels.length > 0 ? (
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', justifyContent: 'center' }}>
                                                    {uni.programs.levels.map((level) => (
                                                        <span
                                                            key={level}
                                                            style={{
                                                                background: '#E8F4F6',
                                                                color: '#1A3A4A',
                                                                padding: '0.25rem 0.6rem',
                                                                borderRadius: '6px',
                                                                fontSize: '0.8rem',
                                                                fontWeight: 600,
                                                            }}
                                                        >
                                                            {level}
                                                        </span>
                                                    ))}
                                                </div>
                                            ) : (
                                                '—'
                                            )}
                                        </td>
                                    ))}
                                </tr>

                                {/* Scholarships */}
                                <tr>
                                    <td style={rowLabelStyle}>Scholarships</td>
                                    {comparisonData.universities.map((uni) => (
                                        <td key={uni.id} style={cellStyle}>
                                            {uni.scholarships.available ? (
                                                <span style={{ color: '#16a34a', fontWeight: 700 }}>
                                                    ✓ Available ({uni.scholarships.count})
                                                </span>
                                            ) : (
                                                <span style={{ color: '#94a3b8' }}>Not Available</span>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}

                {/* CTA Section */}
                {comparisonData && comparisonData.universities.length > 0 && (
                    <div
                        style={{
                            marginTop: '2.5rem',
                            textAlign: 'center',
                            padding: '2rem',
                            background: 'linear-gradient(135deg, #E8F4F6 0%, #D0E8EC 100%)',
                            borderRadius: '1rem',
                        }}
                    >
                        <p style={{ color: '#1A3A4A', marginBottom: '1rem', fontWeight: 500 }}>
                            Ready to explore more about these universities?
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <button
                                onClick={() => navigate('/universities')}
                                style={{
                                    background: 'linear-gradient(90deg, #1A3A4A 0%, #4A8A9A 100%)',
                                    color: '#fff',
                                    padding: '0.9rem 2rem',
                                    borderRadius: '12px',
                                    border: 'none',
                                    fontWeight: 700,
                                    fontSize: '1rem',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 16px rgba(26, 58, 74, 0.3)',
                                }}
                            >
                                Explore Programs
                            </button>
                            <button
                                onClick={() => navigate('/services/peer-counselling')}
                                style={{
                                    background: '#fff',
                                    color: '#1A3A4A',
                                    padding: '0.9rem 2rem',
                                    borderRadius: '12px',
                                    border: '2px solid #1A3A4A',
                                    fontWeight: 700,
                                    fontSize: '1rem',
                                    cursor: 'pointer',
                                }}
                            >
                                Book a Session
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};

// Reusable styles
const rowLabelStyle: React.CSSProperties = {
    textAlign: 'left',
    padding: '1rem',
    background: '#F8FAFC',
    fontWeight: 600,
    color: '#1A3A4A',
    fontSize: '0.95rem',
    borderBottom: '1px solid #E2E8F0',
};

const cellStyle: React.CSSProperties = {
    textAlign: 'center',
    padding: '1rem',
    background: '#fff',
    borderBottom: '1px solid #E2E8F0',
    fontSize: '0.95rem',
    color: '#334155',
};

export default CompareUniversitiesPage;
