import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const BASE_URL = "https://ynu-backend.onrender.com";


// Country options (reusing existing data)
const COUNTRIES = [
    { label: 'Australia', value: 'Australia' },
    { label: 'Canada', value: 'Canada' },
    { label: 'Germany', value: 'Germany' },
    { label: 'United Kingdom', value: 'United Kingdom' },
    { label: 'Ireland', value: 'Ireland' },
    { label: 'United States', value: 'United States' },
];

// Degree levels
const DEGREE_LEVELS = [
    { label: 'Diploma', value: 'diploma' },
    { label: "Bachelor's", value: 'bachelors' },
    { label: "Master's", value: 'masters' },
];

// Current year for intake options
const currentYear = new Date().getFullYear();
const INTAKE_YEARS = [currentYear, currentYear + 1, currentYear + 2];

// Budget bands (numeric)
const BUDGET_OPTIONS = [
    { label: 'Under $10,000/year', value: 'very_low' },
    { label: '$10,000 – $20,000/year', value: 'low' },
    { label: '$20,000 – $35,000/year', value: 'moderate' },
    { label: '$35,000 – $50,000/year', value: 'high' },
    { label: 'Above $50,000/year', value: 'very_high' },
];

// Academic percentage ranges
const PERCENTAGE_RANGES = [
    { label: 'Above 90%', value: 'excellent' },
    { label: '80% – 90%', value: 'very_good' },
    { label: '70% – 80%', value: 'good' },
    { label: '60% – 70%', value: 'average' },
    { label: '50% – 60%', value: 'below_average' },
    { label: 'Below 50%', value: 'low' },
];

// 12th Grade Streams (for Bachelor's)
const STREAM_OPTIONS = [
    { label: 'Science (PCM/PCB)', value: 'science' },
    { label: 'Commerce', value: 'commerce' },
    { label: 'Arts/Humanities', value: 'arts' },
];

// Bachelor's Degree Types (for Master's)
const BACHELORS_TYPES = [
    { label: 'B.Tech / B.E.', value: 'btech' },
    { label: 'B.Sc', value: 'bsc' },
    { label: 'B.Com', value: 'bcom' },
    { label: 'B.A.', value: 'ba' },
    { label: 'BBA', value: 'bba' },
    { label: 'BCA', value: 'bca' },
    { label: 'Other', value: 'other' },
];

// Field relevance options
const RELEVANCE_OPTIONS = [
    { label: 'Yes, directly related', value: 'high' },
    { label: 'Partially related', value: 'partial' },
    { label: 'No, different field', value: 'low' },
];

// Work experience options
const WORK_EXPERIENCE_OPTIONS = [
    { label: 'No work experience', value: 'none' },
    { label: 'Less than 1 year', value: '0-1' },
    { label: '1 – 3 years', value: '1-3' },
    { label: 'More than 3 years', value: '3+' },
];

// Gap years options
const GAP_YEARS_OPTIONS = [
    { label: 'No gap', value: '0' },
    { label: '1 year', value: '1' },
    { label: '2 years', value: '2' },
    { label: '3+ years', value: '3+' },
];

// English test options
const ENGLISH_TEST_OPTIONS = [
    { label: 'Not yet taken', value: '' },
    { label: 'IELTS 7.5+', value: 'excellent' },
    { label: 'IELTS 7.0', value: 'very_good' },
    { label: 'IELTS 6.5', value: 'good' },
    { label: 'IELTS 6.0', value: 'adequate' },
    { label: 'IELTS below 6.0', value: 'low' },
    { label: 'TOEFL 100+', value: 'excellent' },
    { label: 'TOEFL 90-99', value: 'very_good' },
    { label: 'TOEFL 80-89', value: 'good' },
    { label: 'TOEFL below 80', value: 'adequate' },
];

interface FormData {
    // Common fields
    degreeLevel: string;
    countries: string[];
    intakeYear: string;
    budget: string;
    englishTest: string;

    // Bachelor's specific
    twelfthPercentage: string;
    twelfthStream: string;
    hasMaths: string;
    gapYearsAfter12th: string;

    // Master's specific
    bachelorsPercentage: string;
    bachelorsDegreeType: string;
    fieldOfStudy: string;
    fieldRelevance: string;
    workExperience: string;
    gapYearsAfterBachelors: string;
}

const initialFormData: FormData = {
    degreeLevel: '',
    countries: [],
    intakeYear: String(currentYear + 1),
    budget: '',
    englishTest: '',
    twelfthPercentage: '',
    twelfthStream: '',
    hasMaths: '',
    gapYearsAfter12th: '0',
    bachelorsPercentage: '',
    bachelorsDegreeType: '',
    fieldOfStudy: '',
    fieldRelevance: '',
    workExperience: '',
    gapYearsAfterBachelors: '0',
};

interface ProgramRecommendation {
    rank: number;
    program_id: number;
    university_id: number;
    university_name: string;
    program_name: string;
    degree_type: string;
    country: string;
    city: string | null;
    classification: string;
    total_score: number;
    confidence_level: number;
    intake_term: string | null;
    intake_year: number | null;
    application_deadline: string | null;
    tuition_fee_band: string | null;
}

interface AIExplanation {
    summary_explanation: string;
    program_explanations: [
        {
            program_id: number;
            explanation: string;
        }
    ];
    general_guidance: string[];
}

interface RecommendationResponse {
    request_id: string;
    summary: {
        total_evaluated: number;
        total_eligible: number;
        total_recommended: number;
    };
    recommendations: ProgramRecommendation[];
    warnings: string[];
    ai_explanation?: AIExplanation;
}

export const RecommendationsPage: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [results, setResults] = useState<RecommendationResponse | null>(null);
    const [expandedSummary, setExpandedSummary] = useState(false);
    const [expandedPrograms, setExpandedPrograms] = useState<Record<number, boolean>>({});

    const handleCountryToggle = (country: string) => {
        setFormData(prev => ({
            ...prev,
            countries: prev.countries.includes(country)
                ? prev.countries.filter(c => c !== country)
                : [...prev.countries, country]
        }));
    };

    const toggleProgramExplanation = (programId: number) => {
        setExpandedPrograms(prev => ({
            ...prev,
            [programId]: !prev[programId]
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!formData.degreeLevel || formData.countries.length === 0 || !formData.intakeYear) {
            setError('Please fill in all required fields');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Determine academic score based on degree level
            const academicScore = formData.degreeLevel === 'masters'
                ? formData.bachelorsPercentage
                : formData.twelfthPercentage;

            // Determine work experience (only for masters)
            const workExp = formData.degreeLevel === 'masters'
                ? (formData.workExperience === 'none' ? 0 :
                    formData.workExperience === '0-1' ? 0.5 :
                        formData.workExperience === '1-3' ? 2 : 4)
                : 0;

            // Determine gap years
            const gapYears = formData.degreeLevel === 'masters'
                ? parseInt(formData.gapYearsAfterBachelors) || 0
                : parseInt(formData.gapYearsAfter12th) || 0;

            const payload = {
                student_profile: {
                    target_degree_level: formData.degreeLevel,
                    preferred_countries: formData.countries,
                    target_intake_year: parseInt(formData.intakeYear),
                    tuition_preference_band: formData.budget || 'unknown',
                    academic_score_band: academicScore || 'unknown',
                    language_score_band: formData.englishTest || 'unknown',
                    work_experience_years: workExp,
                    gap_years: gapYears,
                    background_field: formData.fieldOfStudy || '',
                },
                limit: 50,
                format: 'full',
                explain: true
            };

            const response = await fetch(`${BASE_URL}/recommendations`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const data = await response.json();
            setResults(data);

        } catch (err: any) {
            setError(err.message || 'Failed to get recommendations');
        } finally {
            setLoading(false);
        }
    };

    const handleViewProgram = (programId: number) => {
        const stateKey = `program-details-state-${programId}`;
        window.open(`/program-details/${programId}?stateKey=${stateKey}`, '_blank', 'noopener,noreferrer');
    };

    // Badge colors
    const getBadgeStyle = (classification: string) => {
        switch (classification) {
            case 'safe':
                return { background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', color: '#fff' };
            case 'target':
                return { background: 'linear-gradient(135deg, #4A8A9A 0%, #2D6A7A 100%)', color: '#fff' };
            case 'ambitious':
                return { background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)', color: '#fff' };
            default:
                return { background: '#64748b', color: '#fff' };
        }
    };

    return (
        <main style={{ background: '#fff', minHeight: '100vh', paddingBottom: '2rem' }}>
            {/* Dark Hero Section */}
            <section style={{
                background: 'linear-gradient(135deg, #0F172A 0%, #1A3A4A 100%)',
                padding: '120px 1.5rem 80px 1.5rem',
                textAlign: 'center',
                position: 'relative',
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, width: '100%', height: '100%',
                    background: 'radial-gradient(circle at 50% 100%, rgba(45, 106, 122, 0.2), transparent 50%)',
                    pointerEvents: 'none'
                }} />
                <h1 style={{
                    fontSize: '3rem',
                    fontWeight: 900,
                    color: '#fff',
                    marginBottom: '1rem',
                    letterSpacing: '-2px',
                    position: 'relative',
                    zIndex: 1
                }}>
                    Get University Recommendations
                </h1>
                <p style={{
                    fontSize: '1.2rem',
                    color: '#CBD5E1',
                    fontWeight: 500,
                    maxWidth: 600,
                    margin: '0 auto',
                    position: 'relative',
                    zIndex: 1
                }}>
                    Tell us about yourself and we'll find the best-fit programs for you.
                </p>
            </section>

            {/* Main Content */}
            <div style={{
                maxWidth: 1200,
                margin: '0 auto',
                marginTop: '-3rem',
                padding: '2rem',
                position: 'relative',
                zIndex: 2,
            }}>
                {/* Form Card */}
                {!results && (
                    <div style={{
                        background: '#fff',
                        borderRadius: '2rem',
                        boxShadow: '0 20px 60px -10px rgba(15, 23, 42, 0.15)',
                        border: '1px solid rgba(208, 232, 236, 0.3)',
                        padding: '2.5rem',
                        maxWidth: 700,
                        margin: '0 auto',
                    }}>
                        <h2 style={{
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            color: '#1A3A4A',
                            marginBottom: '2rem',
                            textAlign: 'center'
                        }}>
                            Your Profile
                        </h2>

                        <form onSubmit={handleSubmit}>
                            {/* Degree Level - Required */}
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', fontWeight: 600, color: '#1A3A4A', marginBottom: '.5rem' }}>
                                    Which level are you planning to study? <span style={{ color: '#dc2626' }}>*</span>
                                </label>
                                <select
                                    value={formData.degreeLevel}
                                    onChange={e => setFormData(prev => ({ ...prev, degreeLevel: e.target.value }))}
                                    style={{
                                        width: '100%',
                                        padding: '.75rem 1rem',
                                        borderRadius: '12px',
                                        border: '2px solid #e2e8f0',
                                        fontSize: '1rem',
                                        fontWeight: 500,
                                        background: '#fff',
                                        color: '#1A3A4A',
                                    }}
                                >
                                    <option value="">Select degree level...</option>
                                    {DEGREE_LEVELS.map(d => (
                                        <option key={d.value} value={d.value}>{d.label}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Countries - Required (Multi-select) */}
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', fontWeight: 600, color: '#1A3A4A', marginBottom: '.5rem' }}>
                                    Preferred Countries <span style={{ color: '#dc2626' }}>*</span>
                                </label>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.75rem' }}>
                                    {COUNTRIES.map(c => (
                                        <button
                                            key={c.value}
                                            type="button"
                                            onClick={() => handleCountryToggle(c.value)}
                                            style={{
                                                padding: '.6rem 1.2rem',
                                                borderRadius: '50px',
                                                border: formData.countries.includes(c.value)
                                                    ? '2px solid #4A8A9A'
                                                    : '2px solid #e2e8f0',
                                                background: formData.countries.includes(c.value)
                                                    ? 'linear-gradient(135deg, #4A8A9A 0%, #2D6A7A 100%)'
                                                    : '#fff',
                                                color: formData.countries.includes(c.value) ? '#fff' : '#1A3A4A',
                                                fontWeight: 600,
                                                cursor: 'pointer',
                                                transition: 'all 0.2s',
                                            }}
                                        >
                                            {c.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Intake Year - Required */}
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', fontWeight: 600, color: '#1A3A4A', marginBottom: '.5rem' }}>
                                    Intended Intake Year <span style={{ color: '#dc2626' }}>*</span>
                                </label>
                                <select
                                    value={formData.intakeYear}
                                    onChange={e => setFormData(prev => ({ ...prev, intakeYear: e.target.value }))}
                                    style={{
                                        width: '100%',
                                        padding: '.75rem 1rem',
                                        borderRadius: '12px',
                                        border: '2px solid #e2e8f0',
                                        fontSize: '1rem',
                                        fontWeight: 500,
                                        background: '#fff',
                                        color: '#1A3A4A',
                                    }}
                                >
                                    {INTAKE_YEARS.map(y => (
                                        <option key={y} value={String(y)}>{y}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Degree-specific fields */}
                            {formData.degreeLevel && (
                                <div style={{
                                    marginTop: '2rem',
                                    paddingTop: '1.5rem',
                                    borderTop: '1px solid #e2e8f0'
                                }}>
                                    <p style={{
                                        fontSize: '.9rem',
                                        color: '#64748b',
                                        marginBottom: '1.5rem',
                                        fontStyle: 'italic'
                                    }}>
                                        {formData.degreeLevel === 'bachelors'
                                            ? 'Your 12th Grade Details (for better recommendations)'
                                            : formData.degreeLevel === 'masters'
                                                ? "Your Bachelor's Degree Details (for better recommendations)"
                                                : 'Additional Details (optional)'}
                                    </p>

                                    {/* BACHELOR'S SPECIFIC FIELDS */}
                                    {formData.degreeLevel === 'bachelors' && (
                                        <>
                                            {/* 12th Percentage */}
                                            <div style={{ marginBottom: '1.5rem' }}>
                                                <label style={{ display: 'block', fontWeight: 600, color: '#1A3A4A', marginBottom: '.5rem' }}>
                                                    12th Grade Percentage
                                                </label>
                                                <select
                                                    value={formData.twelfthPercentage}
                                                    onChange={e => setFormData(prev => ({ ...prev, twelfthPercentage: e.target.value }))}
                                                    style={{
                                                        width: '100%',
                                                        padding: '.75rem 1rem',
                                                        borderRadius: '12px',
                                                        border: '2px solid #e2e8f0',
                                                        fontSize: '1rem',
                                                        fontWeight: 500,
                                                        background: '#fff',
                                                        color: '#1A3A4A',
                                                    }}
                                                >
                                                    <option value="">Select your percentage range...</option>
                                                    {PERCENTAGE_RANGES.map(p => (
                                                        <option key={p.value} value={p.value}>{p.label}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* 12th Stream */}
                                            <div style={{ marginBottom: '1.5rem' }}>
                                                <label style={{ display: 'block', fontWeight: 600, color: '#1A3A4A', marginBottom: '.5rem' }}>
                                                    12th Grade Stream
                                                </label>
                                                <select
                                                    value={formData.twelfthStream}
                                                    onChange={e => setFormData(prev => ({ ...prev, twelfthStream: e.target.value }))}
                                                    style={{
                                                        width: '100%',
                                                        padding: '.75rem 1rem',
                                                        borderRadius: '12px',
                                                        border: '2px solid #e2e8f0',
                                                        fontSize: '1rem',
                                                        fontWeight: 500,
                                                        background: '#fff',
                                                        color: '#1A3A4A',
                                                    }}
                                                >
                                                    <option value="">Select your stream...</option>
                                                    {STREAM_OPTIONS.map(s => (
                                                        <option key={s.value} value={s.value}>{s.label}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Maths in 12th */}
                                            <div style={{ marginBottom: '1.5rem' }}>
                                                <label style={{ display: 'block', fontWeight: 600, color: '#1A3A4A', marginBottom: '.5rem' }}>
                                                    Did you have Maths in 12th?
                                                </label>
                                                <div style={{ display: 'flex', gap: '1rem' }}>
                                                    {['Yes', 'No'].map(opt => (
                                                        <button
                                                            key={opt}
                                                            type="button"
                                                            onClick={() => setFormData(prev => ({ ...prev, hasMaths: opt.toLowerCase() }))}
                                                            style={{
                                                                padding: '.6rem 1.5rem',
                                                                borderRadius: '50px',
                                                                border: formData.hasMaths === opt.toLowerCase()
                                                                    ? '2px solid #4A8A9A'
                                                                    : '2px solid #e2e8f0',
                                                                background: formData.hasMaths === opt.toLowerCase()
                                                                    ? 'linear-gradient(135deg, #4A8A9A 0%, #2D6A7A 100%)'
                                                                    : '#fff',
                                                                color: formData.hasMaths === opt.toLowerCase() ? '#fff' : '#1A3A4A',
                                                                fontWeight: 600,
                                                                cursor: 'pointer',
                                                            }}
                                                        >
                                                            {opt}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Gap Years after 12th */}
                                            <div style={{ marginBottom: '1.5rem' }}>
                                                <label style={{ display: 'block', fontWeight: 600, color: '#1A3A4A', marginBottom: '.5rem' }}>
                                                    Gap Years after 12th
                                                </label>
                                                <select
                                                    value={formData.gapYearsAfter12th}
                                                    onChange={e => setFormData(prev => ({ ...prev, gapYearsAfter12th: e.target.value }))}
                                                    style={{
                                                        width: '100%',
                                                        padding: '.75rem 1rem',
                                                        borderRadius: '12px',
                                                        border: '2px solid #e2e8f0',
                                                        fontSize: '1rem',
                                                        fontWeight: 500,
                                                        background: '#fff',
                                                        color: '#1A3A4A',
                                                    }}
                                                >
                                                    {GAP_YEARS_OPTIONS.map(g => (
                                                        <option key={g.value} value={g.value}>{g.label}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </>
                                    )}

                                    {/* MASTER'S SPECIFIC FIELDS */}
                                    {formData.degreeLevel === 'masters' && (
                                        <>
                                            {/* Bachelor's Percentage */}
                                            <div style={{ marginBottom: '1.5rem' }}>
                                                <label style={{ display: 'block', fontWeight: 600, color: '#1A3A4A', marginBottom: '.5rem' }}>
                                                    Bachelor's Degree Percentage
                                                </label>
                                                <select
                                                    value={formData.bachelorsPercentage}
                                                    onChange={e => setFormData(prev => ({ ...prev, bachelorsPercentage: e.target.value }))}
                                                    style={{
                                                        width: '100%',
                                                        padding: '.75rem 1rem',
                                                        borderRadius: '12px',
                                                        border: '2px solid #e2e8f0',
                                                        fontSize: '1rem',
                                                        fontWeight: 500,
                                                        background: '#fff',
                                                        color: '#1A3A4A',
                                                    }}
                                                >
                                                    <option value="">Select your percentage range...</option>
                                                    {PERCENTAGE_RANGES.map(p => (
                                                        <option key={p.value} value={p.value}>{p.label}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Bachelor's Degree Type */}
                                            <div style={{ marginBottom: '1.5rem' }}>
                                                <label style={{ display: 'block', fontWeight: 600, color: '#1A3A4A', marginBottom: '.5rem' }}>
                                                    Bachelor's Degree Type
                                                </label>
                                                <select
                                                    value={formData.bachelorsDegreeType}
                                                    onChange={e => setFormData(prev => ({ ...prev, bachelorsDegreeType: e.target.value }))}
                                                    style={{
                                                        width: '100%',
                                                        padding: '.75rem 1rem',
                                                        borderRadius: '12px',
                                                        border: '2px solid #e2e8f0',
                                                        fontSize: '1rem',
                                                        fontWeight: 500,
                                                        background: '#fff',
                                                        color: '#1A3A4A',
                                                    }}
                                                >
                                                    <option value="">Select your degree type...</option>
                                                    {BACHELORS_TYPES.map(b => (
                                                        <option key={b.value} value={b.value}>{b.label}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Field of Study */}
                                            <div style={{ marginBottom: '1.5rem' }}>
                                                <label style={{ display: 'block', fontWeight: 600, color: '#1A3A4A', marginBottom: '.5rem' }}>
                                                    Field of Study (Bachelor's)
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="e.g., Computer Science, Mechanical Engineering"
                                                    value={formData.fieldOfStudy}
                                                    onChange={e => setFormData(prev => ({ ...prev, fieldOfStudy: e.target.value }))}
                                                    style={{
                                                        width: '100%',
                                                        padding: '.75rem 1rem',
                                                        borderRadius: '12px',
                                                        border: '2px solid #e2e8f0',
                                                        fontSize: '1rem',
                                                        fontWeight: 500,
                                                        background: '#fff',
                                                        color: '#1A3A4A',
                                                    }}
                                                />
                                            </div>

                                            {/* Field Relevance */}
                                            <div style={{ marginBottom: '1.5rem' }}>
                                                <label style={{ display: 'block', fontWeight: 600, color: '#1A3A4A', marginBottom: '.5rem' }}>
                                                    Is your field relevant to intended Master's?
                                                </label>
                                                <select
                                                    value={formData.fieldRelevance}
                                                    onChange={e => setFormData(prev => ({ ...prev, fieldRelevance: e.target.value }))}
                                                    style={{
                                                        width: '100%',
                                                        padding: '.75rem 1rem',
                                                        borderRadius: '12px',
                                                        border: '2px solid #e2e8f0',
                                                        fontSize: '1rem',
                                                        fontWeight: 500,
                                                        background: '#fff',
                                                        color: '#1A3A4A',
                                                    }}
                                                >
                                                    <option value="">Select relevance...</option>
                                                    {RELEVANCE_OPTIONS.map(r => (
                                                        <option key={r.value} value={r.value}>{r.label}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Work Experience */}
                                            <div style={{ marginBottom: '1.5rem' }}>
                                                <label style={{ display: 'block', fontWeight: 600, color: '#1A3A4A', marginBottom: '.5rem' }}>
                                                    Work Experience
                                                </label>
                                                <select
                                                    value={formData.workExperience}
                                                    onChange={e => setFormData(prev => ({ ...prev, workExperience: e.target.value }))}
                                                    style={{
                                                        width: '100%',
                                                        padding: '.75rem 1rem',
                                                        borderRadius: '12px',
                                                        border: '2px solid #e2e8f0',
                                                        fontSize: '1rem',
                                                        fontWeight: 500,
                                                        background: '#fff',
                                                        color: '#1A3A4A',
                                                    }}
                                                >
                                                    <option value="">Select experience...</option>
                                                    {WORK_EXPERIENCE_OPTIONS.map(w => (
                                                        <option key={w.value} value={w.value}>{w.label}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Gap Years after Bachelor's */}
                                            <div style={{ marginBottom: '1.5rem' }}>
                                                <label style={{ display: 'block', fontWeight: 600, color: '#1A3A4A', marginBottom: '.5rem' }}>
                                                    Gap Years after Bachelor's
                                                </label>
                                                <select
                                                    value={formData.gapYearsAfterBachelors}
                                                    onChange={e => setFormData(prev => ({ ...prev, gapYearsAfterBachelors: e.target.value }))}
                                                    style={{
                                                        width: '100%',
                                                        padding: '.75rem 1rem',
                                                        borderRadius: '12px',
                                                        border: '2px solid #e2e8f0',
                                                        fontSize: '1rem',
                                                        fontWeight: 500,
                                                        background: '#fff',
                                                        color: '#1A3A4A',
                                                    }}
                                                >
                                                    {GAP_YEARS_OPTIONS.map(g => (
                                                        <option key={g.value} value={g.value}>{g.label}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </>
                                    )}

                                    {/* COMMON FIELDS FOR ALL DEGREE LEVELS */}
                                    <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px dashed #e2e8f0' }}>
                                        {/* Budget */}
                                        <div style={{ marginBottom: '1.5rem' }}>
                                            <label style={{ display: 'block', fontWeight: 600, color: '#1A3A4A', marginBottom: '.5rem' }}>
                                                Annual Tuition Budget
                                            </label>
                                            <select
                                                value={formData.budget}
                                                onChange={e => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                                                style={{
                                                    width: '100%',
                                                    padding: '.75rem 1rem',
                                                    borderRadius: '12px',
                                                    border: '2px solid #e2e8f0',
                                                    fontSize: '1rem',
                                                    fontWeight: 500,
                                                    background: '#fff',
                                                    color: '#1A3A4A',
                                                }}
                                            >
                                                <option value="">Select budget range...</option>
                                                {BUDGET_OPTIONS.map(b => (
                                                    <option key={b.value} value={b.value}>{b.label}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* English Test */}
                                        <div style={{ marginBottom: '1.5rem' }}>
                                            <label style={{ display: 'block', fontWeight: 600, color: '#1A3A4A', marginBottom: '.5rem' }}>
                                                English Proficiency Test
                                            </label>
                                            <select
                                                value={formData.englishTest}
                                                onChange={e => setFormData(prev => ({ ...prev, englishTest: e.target.value }))}
                                                style={{
                                                    width: '100%',
                                                    padding: '.75rem 1rem',
                                                    borderRadius: '12px',
                                                    border: '2px solid #e2e8f0',
                                                    fontSize: '1rem',
                                                    fontWeight: 500,
                                                    background: '#fff',
                                                    color: '#1A3A4A',
                                                }}
                                            >
                                                {ENGLISH_TEST_OPTIONS.map(opt => (
                                                    <option key={opt.label} value={opt.value}>{opt.label}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Error Message */}
                            {error && (
                                <div style={{
                                    padding: '1rem',
                                    background: '#fef2f2',
                                    border: '1px solid #fecaca',
                                    borderRadius: '12px',
                                    color: '#dc2626',
                                    marginBottom: '1.5rem',
                                    fontWeight: 500
                                }}>
                                    {error}
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    background: loading
                                        ? '#94a3b8'
                                        : 'linear-gradient(135deg, #1A3A4A 0%, #2D6A7A 100%)',
                                    color: '#fff',
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    border: 'none',
                                    borderRadius: '14px',
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    boxShadow: '0 4px 16px rgba(26, 58, 74, 0.3)',
                                    transition: 'all 0.2s',
                                }}
                            >
                                {loading ? 'Finding Programs...' : 'Get Recommendations'}
                            </button>
                        </form>
                    </div>
                )}

                {/* Results Section */}
                {results && (
                    <div style={{ marginTop: '2rem' }}>
                        {/* Summary */}
                        <div style={{
                            background: 'linear-gradient(135deg, #1A3A4A 0%, #2D6A7A 100%)',
                            borderRadius: '1.5rem',
                            padding: '1.5rem 2rem',
                            marginBottom: '2rem',
                            color: '#fff',
                            textAlign: 'center'
                        }}>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem', margin: 0 }}>
                                Recommended Programs for You
                            </h2>
                            <p style={{ fontSize: '1.1rem', opacity: 0.9, marginTop: '0.5rem' }}>
                                Found {results.summary.total_recommended} matches based on your profile
                            </p>
                        </div>

                        {/* 🧠 AI Summary Section */}
                        {results.ai_explanation && (
                            <div style={{
                                background: '#f0f9ff',
                                border: '1px solid #bae6fd',
                                borderRadius: '1rem',
                                marginBottom: '2rem',
                                overflow: 'hidden'
                            }}>
                                <button
                                    onClick={() => setExpandedSummary(!expandedSummary)}
                                    style={{
                                        width: '100%',
                                        padding: '1rem 1.5rem',
                                        background: 'transparent',
                                        border: 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        cursor: 'pointer',
                                        textAlign: 'left'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
                                        <span style={{ fontSize: '1.2rem' }}>🧠</span>
                                        <div>
                                            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#0369a1' }}>
                                                Why these recommendations?
                                            </h3>
                                            <div style={{ fontSize: '.8rem', color: '#0ea5e9', fontWeight: 500 }}>
                                                AI-generated explanation based on your profile
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{
                                        color: '#0369a1',
                                        transform: expandedSummary ? 'rotate(180deg)' : 'rotate(0)',
                                        transition: 'transform 0.2s'
                                    }}>
                                        ▼
                                    </div>
                                </button>

                                {expandedSummary && (
                                    <div style={{
                                        padding: '0 1.5rem 1.5rem 1.5rem',
                                        color: '#334155',
                                        lineHeight: 1.6,
                                        fontSize: '.95rem'
                                    }}>
                                        <div style={{ height: '1px', background: '#bae6fd', marginBottom: '1rem' }} />
                                        {results.ai_explanation.summary_explanation}

                                        {results.ai_explanation.general_guidance.length > 0 && (
                                            <div style={{ marginTop: '1rem' }}>
                                                <strong>Tips:</strong>
                                                <ul style={{ margin: '.5rem 0 0 0', paddingLeft: '1.2rem' }}>
                                                    {results.ai_explanation.general_guidance.map((tip, i) => (
                                                        <li key={i} style={{ marginBottom: '.25rem' }}>{tip}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}



                        {/* Warnings */}
                        {results.warnings.length > 0 && (
                            <div style={{
                                background: '#fef3c7',
                                border: '1px solid #fcd34d',
                                borderRadius: '12px',
                                padding: '1rem 1.5rem',
                                marginBottom: '1.5rem',
                            }}>
                                {results.warnings.map((w, i) => (
                                    <p key={i} style={{ margin: i === 0 ? 0 : '.5rem 0 0 0', color: '#92400e', fontSize: '.95rem' }}>
                                        ⚠️ {w}
                                    </p>
                                ))}
                            </div>
                        )}



                        {/* Program Cards */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                            gap: '2rem',
                        }}>
                            {results.recommendations.length === 0 ? (
                                <div style={{
                                    gridColumn: '1 / -1',
                                    textAlign: 'center',
                                    padding: '3rem',
                                    color: '#64748b',
                                    fontSize: '1.1rem',
                                }}>
                                    No programs matched your criteria. Try adjusting your filters.
                                </div>
                            ) : (
                                results.recommendations.map((program, index) => (
                                    <article
                                        key={program.program_id}
                                        style={{
                                            background: 'linear-gradient(145deg, #1A3A4A 0%, #2D6A7A 100%)',
                                            borderRadius: '1.5rem',
                                            padding: '1.5rem',
                                            boxShadow: '0 8px 32px rgba(15, 23, 42, 0.2)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '1rem',
                                        }}
                                    >
                                        {/* Header with Badge */}
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <div>
                                                <h3 style={{
                                                    margin: 0,
                                                    fontSize: '1.1rem',
                                                    fontWeight: 700,
                                                    color: '#fff',
                                                    lineHeight: 1.3,
                                                }}>
                                                    {program.university_name}
                                                </h3>
                                                <p style={{
                                                    margin: '.25rem 0 0 0',
                                                    fontSize: '.9rem',
                                                    color: 'rgba(255,255,255,0.7)',
                                                }}>
                                                    {program.city ? `${program.city}, ` : ''}{program.country}
                                                </p>
                                            </div>
                                            <span style={{
                                                ...getBadgeStyle(program.classification),
                                                padding: '.35rem .75rem',
                                                borderRadius: '50px',
                                                fontSize: '.75rem',
                                                fontWeight: 700,
                                                textTransform: 'uppercase',
                                            }}>
                                                {program.classification}
                                            </span>
                                        </div>

                                        {/* Program Name */}
                                        <h4 style={{
                                            margin: 0,
                                            fontSize: '1rem',
                                            fontWeight: 600,
                                            color: '#7dd3e8',
                                        }}>
                                            {program.program_name}
                                        </h4>

                                        {/* Details */}
                                        <div style={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            gap: '.75rem',
                                            fontSize: '.85rem',
                                        }}>
                                            {program.intake_year && (
                                                <span style={{
                                                    background: 'rgba(255,255,255,0.1)',
                                                    padding: '.35rem .75rem',
                                                    borderRadius: '6px',
                                                    color: 'rgba(255,255,255,0.9)'
                                                }}>
                                                    Intake: {program.intake_term || ''} {program.intake_year}
                                                </span>
                                            )}
                                            {program.application_deadline && (
                                                <span style={{
                                                    background: 'rgba(255,255,255,0.1)',
                                                    padding: '.35rem .75rem',
                                                    borderRadius: '6px',
                                                    color: 'rgba(255,255,255,0.9)'
                                                }}>
                                                    Deadline: {new Date(program.application_deadline).toLocaleDateString()}
                                                </span>
                                            )}
                                            {program.tuition_fee_band && (
                                                <span style={{
                                                    background: 'rgba(255,255,255,0.1)',
                                                    padding: '.35rem .75rem',
                                                    borderRadius: '6px',
                                                    color: 'rgba(255,255,255,0.9)'
                                                }}>
                                                    Tuition: {program.tuition_fee_band}
                                                </span>
                                            )}
                                        </div>

                                        {/* AI Explanation section */}
                                        <div style={{ marginTop: 'auto' }}>
                                            {/* AI Explanation Toggle */}
                                            {results.ai_explanation && (
                                                <div style={{ marginBottom: '1rem' }}>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            toggleProgramExplanation(program.program_id);
                                                        }}
                                                        style={{
                                                            background: 'rgba(255,255,255,0.1)',
                                                            border: 'none',
                                                            borderRadius: '6px',
                                                            padding: '.4rem .8rem',
                                                            color: '#bae6fd',
                                                            fontSize: '.85rem',
                                                            cursor: 'pointer',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '.5rem'
                                                        }}
                                                    >
                                                        ✨ Why this program?
                                                    </button>

                                                    {expandedPrograms[program.program_id] && (
                                                        <div style={{
                                                            marginTop: '.75rem',
                                                            background: 'rgba(0,0,0,0.2)',
                                                            padding: '.75rem',
                                                            borderRadius: '8px',
                                                            fontSize: '.85rem',
                                                            color: '#e2e8f0',
                                                            lineHeight: 1.5
                                                        }}>
                                                            {results.ai_explanation.program_explanations.find(
                                                                p => p.program_id === program.program_id
                                                            )?.explanation || "This program aligns with your academic profile and preferences."}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        {/* View Button */}
                                        <button
                                            onClick={() => handleViewProgram(program.program_id)}
                                            style={{
                                                marginTop: '.5rem',
                                                padding: '.75rem',
                                                background: 'linear-gradient(90deg, #fff 0%, #D0E8EC 100%)',
                                                color: '#1A3A4A',
                                                fontWeight: 700,
                                                fontSize: '.95rem',
                                                border: 'none',
                                                borderRadius: '12px',
                                                cursor: 'pointer',
                                                transition: 'transform 0.2s',
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                                            onMouseLeave={e => e.currentTarget.style.transform = ''}
                                        >
                                            View Program
                                        </button>
                                    </article>
                                ))
                            )}
                        </div>

                        {/* New Search Button */}
                        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
                            <button
                                onClick={() => setResults(null)}
                                style={{
                                    padding: '.75rem 2rem',
                                    background: 'transparent',
                                    color: '#1A3A4A',
                                    fontWeight: 600,
                                    fontSize: '1rem',
                                    border: '2px solid #1A3A4A',
                                    borderRadius: '50px',
                                    cursor: 'pointer',
                                }}
                            >
                                ← Start New Search
                            </button>
                        </div>

                        {/* Disclaimer */}
                        <div style={{
                            marginTop: '3rem',
                            padding: '1.5rem',
                            background: '#f8fafc',
                            borderRadius: '12px',
                            border: '1px solid #e2e8f0',
                        }}>
                            <p style={{
                                margin: 0,
                                fontSize: '.9rem',
                                color: '#64748b',
                                textAlign: 'center',
                                lineHeight: 1.6,
                            }}>
                                <strong>Disclaimer:</strong> Recommendations are guidance-based and do not guarantee admission.
                                Results are based on your provided information and program eligibility criteria.
                                AI explanations are generated based on the information you provided.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};

export default RecommendationsPage;
