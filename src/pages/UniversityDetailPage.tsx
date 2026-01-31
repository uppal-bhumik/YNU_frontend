import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

// Color palette
const PRIMARY = "#5727A3";
const SECONDARY = "#9F7AEA";
const BG = "linear-gradient(90deg,#D6C5F0 0%,#fff 100%)";
const CARD_BG = "#fff";
const TEXT = "#1B0044";
const SUBTEXT = "#9F7AEA";
const BORDER = "#D6C5F0";

const BASE_URL = "https://studconnect-backend.onrender.com";

// Add keyframes and global styles for 3D, glass, and animation effects
const globalStyles = `
@keyframes fadeInUp {
  0% { opacity: 0; transform: translateY(40px) scale(0.98); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes gradientMove {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}
.glass {
  background: rgba(255,255,255,0.25);
  box-shadow: 0 8px 32px 0 rgba(217, 191, 247, 0.18);
  backdrop-filter: blur(12px);
  border-radius: 18px;
  border: 1.5px solid rgba(255,255,255,0.18);
}
.section-animate {
  animation: fadeInUp 0.8s cubic-bezier(.23,1.02,.43,1.01) both;
}
.gradient-animated {
  background: linear-gradient(120deg, #e0e7ff 0%, #f8fafc 50%, #dbeafe 100%);
  background-size: 200% 200%;
  animation: gradientMove 4s ease-in-out infinite alternate;
}
.card-3d {
  transition: transform 0.3s cubic-bezier(.23,1.02,.43,1.01), box-shadow 0.3s;
  box-shadow: 0 8px 32px 0 #2563eb22, 0 1.5px 8px 0 #2563eb22;
  will-change: transform;
}
.card-3d:hover {
  transform: translateY(-8px) scale(1.03) rotateX(3deg) rotateY(-2deg);
  box-shadow: 0 16px 48px 0 #2563eb33, 0 3px 16px 0 #2563eb33;
}
.badge-3d {
  position: absolute;
  top: -38px;
  right: 32px;
  z-index: 10;
  background: linear-gradient(120deg, #2563eb 60%, #a5b4fc 100%);
  color: #fff;
  font-weight: 900;
  font-size: 1.15rem;
  padding: 1rem 2.2rem;
  border-radius: 2rem 2rem 2rem 0.5rem;
  box-shadow: 0 8px 32px 0 #2563eb44, 0 1.5px 8px 0 #a5b4fc55;
  letter-spacing: 1.5px;
  transform: rotate(-6deg) scale(1.05);
  text-shadow: 0 2px 8px #1b2e4b44;
  animation: fadeInUp 1.2s cubic-bezier(.23,1.02,.43,1.01) both;
  user-select: none;
  pointer-events: none;
}
::-webkit-scrollbar-thumb {
  background: #dbeafe;
  border-radius: 8px;
}
::-webkit-scrollbar {
  width: 8px;
  background: #f8fafc;
}
`;

const FactCard: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div
    className="card-3d"
    style={{
      background: '#f8fafc',
      borderRadius: 14,
      boxShadow: '0 2px 8px #2563eb11',
      border: '1.5px solid #e0e7ff',
      padding: '1.1rem 1.2rem',
      minHeight: 70,
      fontSize: '1.05rem',
      fontWeight: 500,
      color: '#1e293b',
      wordBreak: 'break-word',
      display: 'flex',
      flexDirection: 'column',
      gap: '.3rem',
      alignItems: 'flex-start',
      justifyContent: 'center'
    }}
  >
    <div style={{
      fontWeight: 700,
      color: PRIMARY,
      fontSize: '1.05rem',
      marginBottom: '.1rem',
      letterSpacing: '.2px',
      lineHeight: '1.7'
    }}>{label}</div>
    <div style={{
      color: '#334155',
      fontWeight: 600,
      fontSize: '1.05rem', // consistent value size
      lineHeight: '1.7'
    }}>{value}</div>
  </div>
);

const ProgramLevelBarChart3D: React.FC<{ data: Record<string, number> }> = ({ data }) => {
  const max = Math.max(...Object.values(data));
  const colors = ['#2563eb', '#60a5fa', '#a5b4fc', '#1e293b', '#fbbf24', '#10b981'];
  // Set a max bar height and calculate available height for bars
  const maxBarHeight = 120; // px
  const minBarHeight = 24; // px
  return (
    <div style={{
      width: '100%',
      height: maxBarHeight + minBarHeight + 40, // add extra for labels
      display: 'flex',
      alignItems: 'flex-end',
      gap: '1.2rem',
      justifyContent: 'center',
      marginTop: '1.2rem',
      overflowX: 'auto',
      paddingBottom: 8
    }}>
      {Object.entries(data).map(([level, count], i) => (
        <div key={level} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 48 }}>
          <div style={{
            width: 36,
            height: `${Math.max((count / max) * maxBarHeight, minBarHeight)}px`,
            background: `linear-gradient(120deg,${colors[i % colors.length]} 60%,#e0e7ff 100%)`,
            borderRadius: '12px 12px 8px 8px',
            boxShadow: '0 2px 12px #F0E0FF',
            marginBottom: '.5rem',
            transition: 'height 0.6s cubic-bezier(.4,2,.6,1)',
            maxHeight: maxBarHeight
          }} />
          <span style={{
            fontSize: '.93rem',
            color: '#2563eb',
            fontWeight: 700,
            marginBottom: '.2rem'
          }}>{count}</span>
          <span style={{
            fontSize: '.75rem',
            color: '#64748b',
            fontWeight: 600,
            textAlign: 'center',
            maxWidth: 60,
            wordBreak: 'break-word'
          }}>{level.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase())}</span>
        </div>
      ))}
    </div>
  );
};

const LogoDisplay: React.FC<{ logoUrl?: string }> = ({ logoUrl }) => (
  logoUrl ? (
    <img
      src={logoUrl}
      alt="Logo"
      style={{
        width: 80,
        height: 80,
        borderRadius: '50%',
        boxShadow: '0 2px 12px #2563eb33',
        border: '2.5px solid #e0e7ff',
        background: '#fff',
        objectFit: 'contain',
        margin: 0,
        display: 'block'
      }}
    />
  ) : null
);

// Utility to determine if a value is "long"
function isLongValue(value: React.ReactNode): boolean {
  if (typeof value === "string") {
    return value.length > 60 || value.split(/\s+/).length > 8;
  }
  if (React.isValidElement(value)) {
    // Try to extract text from element
    const text = (value.props && value.props.children)
      ? (typeof value.props.children === "string"
          ? value.props.children
          : Array.isArray(value.props.children)
            ? value.props.children.join(" ")
            : "")
      : "";
    return text.length > 60 || text.split(/\s+/).length > 8;
  }
  return false;
}

export const UniversityDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [university, setUniversity] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rawResponse, setRawResponse] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("No university ID provided.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    fetch(`${BASE_URL}/universities/${id}`)
      .then(res => {
        if (!res.ok) {
          return res.json().then(err => {
            throw new Error(err.detail || "University not found");
          }).catch(() => {
            throw new Error("University not found");
          });
        }
        return res.json();
      })
      .then(data => {
        setUniversity(data);
        setRawResponse(JSON.stringify(data, null, 2));
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = globalStyles;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  // Update responsiveStyles for less logo spacing and better name visibility
  const responsiveStyles = `
  @media (max-width: 900px) {
    .univ-main {
      padding: 1.2rem 0.5rem 1.2rem 0.5rem !important;
      max-width: 100vw !important;
      border-radius: 0 !important;
    }
    .univ-section {
      padding: 1.2rem 0.7rem 1.2rem 0.7rem !important;
      margin-bottom: 1.2rem !important;
      border-radius: 14px !important;
    }
  }
  @media (max-width: 700px) {
    .univ-header-flex {
      flex-direction: column !important;
      gap: 0.5rem !important;
      align-items: stretch !important;
      text-align: center !important;
    }
    .univ-logo {
      margin-bottom: 0.2rem !important;
      align-items: center !important;
      display: flex !important;
      justify-content: center !important;
      width: 100% !important;
      min-height: unset !important;
    }
    .univ-main {
      padding: 0.5rem 0.1rem 1.2rem 0.1rem !important;
      min-height: unset !important;
    }
    .univ-section {
      padding: 1rem 0.3rem 1rem 0.3rem !important;
      margin-bottom: 1rem !important;
      border-radius: 10px !important;
    }
    .univ-gallery-flex {
      flex-direction: column !important;
      gap: 1rem !important;
      align-items: stretch !important;
    }
    .univ-gallery-img {
      width: 100% !important;
      min-width: 0 !important;
      max-width: 100vw !important;
      height: 160px !important;
    }
    .univ-title {
      font-size: 1.3rem !important;
      margin-top: 0.3rem !important;
      margin-bottom: 0.2rem !important;
    }
  }
  @media (max-width: 600px) {
    .univ-main {
      padding: 0.2rem 0rem 0.7rem 0rem !important;
      max-width: 100vw !important;
      border-radius: 0 !important;
    }
    .univ-section {
      padding: 0.7rem 0.1rem 0.7rem 0.1rem !important;
      margin-bottom: 0.7rem !important;
      border-radius: 7px !important;
    }
    .univ-keyfacts-row {
      grid-template-columns: 1fr !important;
      gap: 0.7rem !important;
    }
    .univ-gallery-img {
      height: 120px !important;
    }
    .univ-title {
      font-size: 1.05rem !important;
      margin-top: 0.2rem !important;
      margin-bottom: 0.1rem !important;
    }
  }
  `;

  // Inject responsive styles
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = responsiveStyles;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  if (loading) return <div style={{ padding: "2rem", color: PRIMARY, background: BG }}>Loading...</div>;
  if (error) return <div style={{ padding: "2rem", color: "#dc2626", background: BG }}>{error}</div>;
  if (!university) return <div style={{ padding: "2rem", background: BG }}>University not found.</div>;

  const attrs = university.attributes || {};
  const included = university.included || [];

  const accommodation = included.find((item: any) => item.type === "school_accommodation_information");
  // Find all school photos
  const photos = included.filter((item: any) => item.type === "school_photo");

  // About/Description field (prefer about, fallback to description)
  const aboutHtml = attrs.about || attrs.description || "";

  // Program categories
  const programCategories = attrs.program_categories || [];

  // Program levels
  const programLevels = attrs.program_levels || [];

  // Categories of all programs (detailed)
  const categoriesOfAllPrograms = attrs.categories_of_all_programs || [];

  // Intakes of all programs
  const intakesOfAllPrograms = attrs.intakes_of_all_programs || [];

  // Application fee range
  const applicationFeeRange = attrs.application_fee_range || {};

  // Program level counts
  const programLevelCounts = attrs.program_level_counts || {};

  // Key facts
  const keyFacts: { label: string, value: React.ReactNode }[] = [
    attrs.founded_in && { label: "Founded", value: attrs.founded_in },
    attrs.institution_type && { label: "Institution Type", value: attrs.institution_type },
    attrs.designated_learning_institution_no && { label: "Provider ID", value: attrs.designated_learning_institution_no },
    attrs.pgwp_participating !== undefined && { label: "Post-Study Work Visa", value: attrs.pgwp_participating ? "Eligible" : "Not eligible" },
    attrs.coop_participating !== undefined && { label: "Co-op/Internship", value: attrs.coop_participating ? "Available" : "Not available" },
    attrs.can_work_and_study !== undefined && { label: "Work & Study", value: attrs.can_work_and_study ? "Allowed" : "Not allowed" },
    attrs.avg_tuition && { label: "Average Tuition Fees", value: `${attrs.currency ? attrs.currency + " " : ""}${attrs.avg_tuition}` },
    attrs.cost_of_living && { label: "Cost of Living", value: `${attrs.currency ? attrs.currency + " " : ""}${attrs.cost_of_living}` },
    attrs.address && { label: "Address", value: attrs.address },
    attrs.postal_code && { label: "Postal Code", value: attrs.postal_code },
    attrs.conditional_acceptance !== undefined && { label: "Conditional Acceptance", value: attrs.conditional_acceptance ? "Available" : "Not available" },
    attrs.submission_through && { label: "Submission Through", value: attrs.submission_through },
    attrs.institution_no_type && { label: "Institution No Type", value: attrs.institution_no_type },
    attrs.common_name && { label: "Country", value: attrs.common_name },
    attrs.currency && { label: "Currency", value: attrs.currency },
    attrs.meta_description && { label: "Description", value: attrs.meta_description },
    attrs.edit_path && { label: "Edit Path", value: attrs.edit_path },
    attrs.published !== undefined && { label: "Published", value: attrs.published ? "Yes" : "No" },
    attrs.avg_program_length && { label: "Average Program Length", value: (
      <>
        {attrs.avg_program_length.undergraduate && <span>Undergraduate: {attrs.avg_program_length.undergraduate} months<br/></span>}
        {attrs.avg_program_length.graduate && <span>Graduate: {attrs.avg_program_length.graduate} months</span>}
      </>
    )},
    applicationFeeRange.minimum && { label: "Application Fee Min", value: applicationFeeRange.minimum },
    applicationFeeRange.maximum && { label: "Application Fee Max", value: applicationFeeRange.maximum },
    attrs.submission_path_note && { label: "Submission Note", value: attrs.submission_path_note },
    attrs.exceptional_submission_path && { label: "Exceptional Submission", value: attrs.exceptional_submission_path },
    attrs.conditional_acceptance_text && { label: "Conditional Acceptance", value: attrs.conditional_acceptance_text },
  ].filter(Boolean) as { label: string, value: React.ReactNode }[];

  // Helper: Section wrapper with animation and glass effect
  const Section: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
    <section className="section-animate glass card-3d"
      style={{
        padding: '2.2rem 2rem 2.2rem 2rem',
        marginBottom: '2.5rem',
        ...style
      }}>{children}</section>
  );

  // Helper: check if video link is a valid YouTube URL and get embeddable link
  const getYouTubeEmbedUrl = (url: string): string | null => {
    if (typeof url !== 'string') return null;
    // Match normal YouTube URLs and youtu.be short links
    const match = url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
    );
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    // Already an embed link
    if (/youtube\.com\/embed\//.test(url)) return url;
    return null;
  };

  // Partition keyFacts into rows: if long, 1 per row, else 2 per row
  const keyFactRows: { items: typeof keyFacts }[] = [];
  let i = 0;
  while (i < keyFacts.length) {
    const current = keyFacts[i];
    if (isLongValue(current.value)) {
      keyFactRows.push({ items: [current] });
      i += 1;
    } else {
      if (i + 1 < keyFacts.length && !isLongValue(keyFacts[i + 1].value)) {
        keyFactRows.push({ items: [current, keyFacts[i + 1]] });
        i += 2;
      } else {
        keyFactRows.push({ items: [current] });
        i += 1;
      }
    }
  }

  return (
    <main
      className="gradient-animated univ-main"
      style={{
        maxWidth: 1200,
        margin: "2.5rem auto",
        borderRadius: 32,
        boxShadow: "0 16px 64px 0 #9F7AEA22, 0 3px 16px 0 #9F7AEA33",
        padding: "2.5rem 2.5rem 2rem 2.5rem",
        fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif",
        color: TEXT,
        position: 'relative',
        overflow: 'hidden',
        border: `2.5px solid ${BORDER}`,
        minHeight: 800,
        background: BG,
        paddingTop: '90px', // Add space for fixed header
      }}
    >

      {/* Header Section with logo only */}
      <Section
        style={{
          alignItems: 'center',
          gap: '1.2rem',
          marginBottom: '2.5rem',
          background: 'linear-gradient(90deg,#D6C5F0 0%,#fff 100%)',
          boxShadow: '0 8px 32px 0 #9F7AEA22, 0 1.5px 8px 0 #9F7AEA33',
          border: `2px solid ${BORDER}`,
          position: 'relative',
          zIndex: 1,
        }}
        className="univ-section univ-header-flex"
      >
        <div
          style={{
            flex: '0 0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            filter: 'drop-shadow(0 4px 24px #9F7AEA33)',
            width: 90,
            minWidth: 70,
            margin: '0 auto'
          }}
          className="univ-logo"
        >
          <LogoDisplay logoUrl={attrs.logo?.url_thumbnail || attrs.logoThumbnailUrl} />
        </div>
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h1
            className="univ-title"
            style={{
              fontSize: "2rem",
              fontWeight: 900,
              margin: 0,
              color: PRIMARY,
              letterSpacing: '-1.5px',
              lineHeight: 1.1,
              textShadow: '0 2px 12px #9F7AEA33',
              wordBreak: 'break-word',
              marginTop: '.2rem',
              marginBottom: '.2rem',
              textAlign: 'center',
              background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            {attrs.name || "University Details"}
          </h1>
          <div style={{
            fontSize: "1.1rem",
            color: SECONDARY,
            fontWeight: 700,
            marginTop: ".1rem",
            letterSpacing: '.5px',
            textShadow: '0 1px 4px #9F7AEA55',
            wordBreak: 'break-word',
            textAlign: 'center',
            background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            {[attrs.city, attrs.state, attrs.country].filter(Boolean).join(', ')}
          </div>
          <div style={{ marginTop: '.5rem', color: SECONDARY, fontWeight: 400, wordBreak: 'break-word', textAlign: 'left' }}>
            {attrs.website && (
              <a href={attrs.website} target="_blank" rel="noopener noreferrer" style={{
                color: SECONDARY,
                fontWeight: 700,
                textDecoration: "underline",
                textUnderlineOffset: "2px",
                transition: 'color 0.2s',
                filter: 'drop-shadow(0 1px 4px #9F7AEA55)',
                wordBreak: 'break-all'
              }}>{attrs.website}</a>
            )}
          </div>
        </div>
      </Section>

      {/* Gallery Section */}
      {photos.length > 0 && (
        <Section
          style={{
            background: 'linear-gradient(90deg,#fff 0%,#D6C5F0 100%)',
            marginBottom: '2.5rem',
            border: `2px solid ${BORDER}`,
          }}
          className="univ-section"
        >
          <div style={{
            fontWeight: 700,
            color: PRIMARY,
            marginBottom: ".7rem",
            fontSize: '1.18rem',
            letterSpacing: '.5px',
            background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Campus Gallery</div>
          <div
            className="univ-gallery-flex"
            style={{
              display: "flex",
              gap: "1.5rem",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "flex-start"
            }}
          >
            {photos.map((photo: any) => (
              <div
                key={photo.id}
                className="card-3d univ-gallery-img"
                style={{
                  width: 180,
                  minWidth: 120,
                  maxWidth: 260,
                  height: 120,
                  borderRadius: 16,
                  overflow: 'hidden',
                  border: `2px solid ${BORDER}`,
                  background: BG,
                  boxShadow: '0 2px 16px #2563eb22',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  willChange: 'transform',
                  cursor: 'pointer',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <img
                  src={photo.attributes.url}
                  alt="School"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: "cover",
                    borderRadius: 16,
                    transition: 'transform 0.3s',
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '30%',
                  background: 'linear-gradient(0deg, #2563eb33 80%, transparent 100%)',
                  borderRadius: '0 0 16px 16px',
                }} />
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* About Section */}
      {aboutHtml && (
        <Section>
          <div style={{
            fontWeight: 700,
            color: PRIMARY,
            marginBottom: ".7rem",
            fontSize: '1.13rem', // consistent heading size
            letterSpacing: '.5px',
            background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>About</div>
          <div
            style={{
              color: TEXT,
              fontSize: "1.05rem", // consistent body text size
              lineHeight: 1.7,
              textShadow: '0 1px 4px #9F7AEA22'
            }}
            dangerouslySetInnerHTML={{ __html: aboutHtml }}
          />
        </Section>
      )}

      {/* Key Facts Section with dynamic row layout */}
      <Section className="univ-section">
        <div style={{
          fontWeight: 700,
          color: 'PRIMARY',
          marginBottom: ".7rem",
          fontSize: '1.18rem',
          letterSpacing: '.5px',
          background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>Key Facts</div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.1rem'
        }}>
          {keyFactRows.map((row, idx) => (
            <div
              key={idx}
              className="univ-keyfacts-row"
              style={{
                display: 'grid',
                gridTemplateColumns: row.items.length === 2 ? '1fr 1fr' : '1fr',
                gap: '1.1rem 1.5rem',
                alignItems: 'stretch',
              }}
            >
              {row.items.map(fact => (
                <FactCard key={fact.label} label={fact.label} value={fact.value} />
              ))}
            </div>
          ))}
        </div>
      </Section>

      
      {/* Program Categories Section */}
      {programCategories.length > 0 && (
        <Section>
          <div style={{
            fontWeight: 700,
            color: PRIMARY,
            marginBottom: ".7rem",
            fontSize: '1.18rem',
            letterSpacing: '.5px',
            background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Program Categories</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: ".7rem" }}>
            {programCategories.map((cat: any) => (
              <span key={cat.name} className="card-3d" style={{
                background: 'linear-gradient(90deg, rgb(236 224 255) 0%, rgb(248, 250, 252) 100%)',
                color: SECONDARY,
                border: `1.5px solid ${BORDER}`,
                borderRadius: 12,
                padding: ".5rem 1.2rem",
                fontSize: "1.01rem",
                fontWeight: 700,
                boxShadow: '0 2px 8px #2563eb11',
                transition: 'transform 0.3s, box-shadow 0.3s',
                willChange: 'transform',
                cursor: 'pointer'
              }}>
                {cat.name} {cat.count ? `(${cat.count})` : ""}
              </span>
            ))}
          </div>
        </Section>
      )}


      {/* Program Level Counts */}
      {programLevelCounts && Object.keys(programLevelCounts).length > 0 && (
        <Section>
          <div style={{
            fontWeight: 700,
            color: PRIMARY,
            marginBottom: ".7rem",
            fontSize: '1.18rem',
            letterSpacing: '.5px',
            background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Program Level Counts</div>
          <ProgramLevelBarChart3D data={programLevelCounts} />
        </Section>
      )}

      {/* Categories of All Programs */}
      {categoriesOfAllPrograms && categoriesOfAllPrograms.length > 0 && (
        <Section>
          <div style={{
            fontWeight: 700,
            color: PRIMARY,
            marginBottom: ".7rem",
            fontSize: '1.18rem',
            letterSpacing: '.5px',
            background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>All Program Categories</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: ".7rem" }}>
            {categoriesOfAllPrograms.map((cat: any) => (
              <span key={cat[0] + cat[1]} className="card-3d" style={{
                background: 'linear-gradient(90deg, rgb(236 224 255) 0%, rgb(248, 250, 252) 100%)',
                color: SECONDARY,
                border: `1.5px solid ${BORDER}`,
                borderRadius: 12,
                padding: ".5rem 1.2rem",
                fontSize: "1.01rem",
                fontWeight: 700,
                boxShadow: '0 2px 8px #2563eb11',
                transition: 'transform 0.3s, box-shadow 0.3s',
                willChange: 'transform',
                cursor: 'pointer'
              }}>
                {cat[1]}
              </span>
            ))}
          </div>
        </Section>
      )}

      {/* Intakes of All Programs */}
      {intakesOfAllPrograms && intakesOfAllPrograms.length > 0 && (
        <Section>
          <div style={{
            fontWeight: 700,
            color: PRIMARY,
            marginBottom: ".7rem",
            fontSize: '1.18rem',
            letterSpacing: '.5px',
            background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Upcoming Intakes</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: ".7rem" }}>
            {intakesOfAllPrograms.map((date: string) => (
              <span key={date} className="card-3d" style={{
                background: 'linear-gradient(90deg, rgb(236 224 255) 0%, rgb(248, 250, 252) 100%)',
                color: SECONDARY,
                border: `1.5px solid ${BORDER}`,
                borderRadius: 12,
                padding: ".5rem 1.2rem",
                fontSize: "1.01rem",
                fontWeight: 700,
                boxShadow: '0 2px 8px #2563eb11',
                transition: 'transform 0.3s, box-shadow 0.3s',
                willChange: 'transform',
                cursor: 'pointer'
              }}>
                {new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
              </span>
            ))}
          </div>
        </Section>
      )}

      {/* Accommodation Section */}
      {accommodation && (
        <Section>
          <div style={{
            fontWeight: 700,
            color: PRIMARY,
            marginBottom: ".7rem",
            fontSize: '1.18rem',
            letterSpacing: '.5px',
            background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Accommodation</div>
          <div
            style={{
              color: TEXT,
              fontSize: "1.13rem",
              lineHeight: 1.7,
              textShadow: '0 1px 4px #9F7AEA22'
            }}
            dangerouslySetInnerHTML={{ __html: accommodation.attributes.description }}
          />
          <div style={{ marginTop: '1.2rem', display: 'flex', gap: '1.2rem', flexWrap: 'wrap' }}>
            {accommodation.attributes.homestay_url && (
              <a href={accommodation.attributes.homestay_url} target="_blank" rel="noopener noreferrer"
                className="card-3d"
                style={{
                  background: 'linear-gradient(90deg,#2563eb 60%,#a5b4fc 100%)',
                  color: '#fff',
                  borderRadius: 12,
                  padding: '.7rem 1.5rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: '0 2px 8px #2563eb22',
                  border: 'none',
                  fontSize: '1.05rem',
                  letterSpacing: '.5px',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  willChange: 'transform',
                  cursor: 'pointer'
                }}>Homestay Info</a>
            )}
            {accommodation.attributes.off_campus_url && (
              <a href={accommodation.attributes.off_campus_url} target="_blank" rel="noopener noreferrer"
                className="card-3d"
                style={{
                  background: 'linear-gradient(90deg,#60a5fa 60%,#a5b4fc 100%)',
                  color: '#fff',
                  borderRadius: 12,
                  padding: '.7rem 1.5rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: '0 2px 8px #2563eb22',
                  border: 'none',
                  fontSize: '1.05rem',
                  letterSpacing: '.5px',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  willChange: 'transform',
                  cursor: 'pointer'
                }}>Off-Campus Housing</a>
            )}
          </div>
        </Section>
      )}
      {/* Google Map Section */}
      {attrs.latitude && attrs.longitude && (
        <Section>
          <div style={{
            fontWeight: 700,
            color: PRIMARY,
            marginBottom: ".7rem",
            fontSize: '1.18rem',
            letterSpacing: '.5px',
            background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Location</div>
          <div style={{
            width: '100%',
            height: 0,
            paddingBottom: '40%',
            position: 'relative',
            borderRadius: 18,
            overflow: 'hidden',
            boxShadow: '0 4px 24px #2563eb33',
            border: '2px solid #e0e7ff',
            marginBottom: '1.2rem'
          }}>
            <iframe
              title="Google Map"
              src={`https://www.google.com/maps?q=${attrs.latitude},${attrs.longitude}&z=15&output=embed`}
              style={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100%',
                border: 0, borderRadius: 18
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div style={{ color: SUBTEXT, fontSize: ".98rem" }}>
            {attrs.address && <div>{attrs.address}</div>}
            <div>Latitude: {attrs.latitude}, Longitude: {attrs.longitude}</div>
          </div>
        </Section>
      )}

      {/* Video Section */}
      {attrs.video_link && getYouTubeEmbedUrl(attrs.video_link) && (
        <Section>
          <div style={{
            fontWeight: 700,
            color: PRIMARY,
            marginBottom: ".7rem",
            fontSize: '1.18rem',
            letterSpacing: '.5px',
            background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Campus Video</div>
          <div style={{
            position: 'relative',
            paddingBottom: '56.25%',
            height: 0,
            marginBottom: '1.2rem',
            borderRadius: 18,
            overflow: 'hidden',
            boxShadow: '0 4px 24px #2563eb33',
            border: '2px solid #e0e7ff'
          }}>
            <iframe
              src={getYouTubeEmbedUrl(attrs.video_link) as string}
              title="Campus Video"
              style={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100%',
                border: 0, borderRadius: 18
              }}
              allowFullScreen
            />
          </div>
        </Section>
      )}

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
        <b>Disclaimer:</b> These details might not be 100% correct as per current analytics. Please verify from the university's official website for the most updated and accurate information.
      </div>
    </main>
  );
};

export default UniversityDetailPage;
