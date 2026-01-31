import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface PeerCounsellor {
  id: number;
  name: string;
  university: string;
  profile_image_url: string;
  location: string;
  program: string;
  about?: string;
  charges?: number;
  languages?: string;
  achievements?: string[];
}

const PeerProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [counsellor, setCounsellor] = useState<PeerCounsellor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch peer counsellor data based on ID
    const fetchPeerCounsellor = async () => {
      try {
        const response = await fetch(`https://studconnect-backend.onrender.com/peer-counsellors/${id}`);
        if (response.ok) {
          const data = await response.json();
          setCounsellor(data);
        } else {
          console.error('Failed to fetch peer counsellor');
          navigate('/services/peer-counselling');
        }
      } catch (error) {
        console.error('Error fetching peer counsellor:', error);
        navigate('/services/peer-counselling');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPeerCounsellor();
    }
  }, [id, navigate]);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
        background: 'linear-gradient(135deg, #f0e6ff 0%, #d6c5f0 100%)',
      }}>
        <div style={{
          fontSize: '1.2rem',
          color: '#5727A3',
          fontWeight: 600,
        }}>
          Loading peer profile...
        </div>
      </div>
    );
  }

  if (!counsellor) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
        background: 'linear-gradient(135deg, #f0e6ff 0%, #d6c5f0 100%)',
      }}>
        <div style={{
          textAlign: 'center',
          color: '#5727A3',
          fontSize: '1.2rem',
        }}>
          <h2>Peer counsellor not found</h2>
          <button
            onClick={() => navigate('/services/peer-counselling')}
            style={{
              background: 'linear-gradient(90deg, #5727A3 0%, #9F7AEA 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '0.8rem 1.5rem',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              marginTop: '1rem',
            }}
          >
            Back to Peer Counselling
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem 1.5rem',
      background: 'linear-gradient(135deg, #f0e6ff 0%, #d6c5f0 100%)',
      minHeight: '100vh',
    }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          background: 'rgba(255, 255, 255, 0.7)',
          border: 'none',
          borderRadius: '8px',
          padding: '0.6rem 1.2rem',
          fontSize: '1rem',
          fontWeight: 600,
          cursor: 'pointer',
          marginBottom: '1.5rem',
          boxShadow: '0 2px 8px #9F7AEA22',
        }}
      >
        ← Back
      </button>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'white',
        borderRadius: '24px',
        padding: '2.5rem',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        marginBottom: '2rem',
      }}>
        {/* Profile header */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          marginBottom: '2rem',
        }}>
          <div style={{
            width: '140px',
            height: '140px',
            borderRadius: '24px',
            overflow: 'hidden',
            border: '4px solid #e0c3fc',
            marginBottom: '1.5rem',
          }}>
            <img
              src={counsellor.profile_image_url}
              alt={counsellor.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>

          <h1 style={{
            fontSize: '2.2rem',
            fontWeight: 800,
            color: '#5727A3',
            margin: '0.5rem 0',
            textAlign: 'center',
          }}>
            {counsellor.name}
          </h1>

          <p style={{
            fontSize: '1.2rem',
            color: '#1B0044',
            fontWeight: 600,
            margin: '0.3rem 0',
            textAlign: 'center',
          }}>
            {counsellor.program}
          </p>

          <p style={{
            fontSize: '1.1rem',
            color: '#9F7AEA',
            fontWeight: 500,
            margin: '0.3rem 0',
            textAlign: 'center',
          }}>
            {counsellor.university}
          </p>

          <p style={{
            fontSize: '1rem',
            color: '#334155',
            margin: '0.5rem 0',
            textAlign: 'center',
          }}>
            {counsellor.location}
          </p>
        </div>

        {/* Profile details */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          width: '100%',
        }}>
          {/* Left column - Bio and details */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#5727A3',
              marginBottom: '1rem',
              borderBottom: '2px solid #e0c3fc',
              paddingBottom: '0.5rem',
            }}>
              About
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: '#334155',
              lineHeight: '1.7',
              marginBottom: '2rem',
            }}>
              {counsellor.about || 'This peer counsellor has not provided a detailed bio yet. They are an experienced student who can provide valuable insights about studying abroad.'}
            </p>

            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#5727A3',
              marginBottom: '1rem',
              borderBottom: '2px solid #e0c3fc',
              paddingBottom: '0.5rem',
            }}>
              Details
            </h2>
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0.8rem 0',
                borderBottom: '1px solid #eee',
              }}>
                <span style={{ fontWeight: 600, color: '#1B0044' }}>Languages:</span>
                <span style={{ color: '#334155' }}>{counsellor.languages || 'English'}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0.8rem 0',
                borderBottom: '1px solid #eee',
              }}>
                <span style={{ fontWeight: 600, color: '#1B0044' }}>Session Fee:</span>
                <span style={{ color: '#334155' }}>${counsellor.charges || '30'}/session</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0.8rem 0',
                borderBottom: '1px solid #eee',
              }}>
                <span style={{ fontWeight: 600, color: '#1B0044' }}>Current Status:</span>
                <span style={{ color: '#334155' }}>Active Student</span>
              </div>
            </div>
          </div>

          {/* Right column - Achievements and booking */}
          <div>
            {counsellor.achievements && counsellor.achievements.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#5727A3',
                  marginBottom: '1rem',
                  borderBottom: '2px solid #e0c3fc',
                  paddingBottom: '0.5rem',
                }}>
                  Achievements
                </h2>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                }}>
                  {counsellor.achievements.map((achievement, index) => (
                    <li
                      key={index}
                      style={{
                        padding: '0.8rem',
                        backgroundColor: '#F0E6FF',
                        borderRadius: '12px',
                        marginBottom: '0.8rem',
                        color: '#5727A3',
                        fontWeight: 500,
                      }}
                    >
                      ✓ {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div style={{
              background: 'linear-gradient(135deg, #f0e6ff 0%, #d6c5f0 100%)',
              borderRadius: '16px',
              padding: '1.5rem',
              boxShadow: '0 4px 16px #9F7AEA22',
            }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#5727A3',
                marginBottom: '1rem',
                textAlign: 'center',
              }}>
                Book a Session
              </h2>
              <p style={{
                fontSize: '1.1rem',
                color: '#334155',
                textAlign: 'center',
                marginBottom: '1.5rem',
              }}>
                Connect directly with {counsellor.name.split(' ')[0]} for personalized guidance
              </p>
              
              <button
                onClick={() => navigate('/mock-payment', { state: { peer: counsellor } })}
                style={{
                  background: 'linear-gradient(90deg, #5727A3 0%, #9F7AEA 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '1rem 1.8rem',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  width: '100%',
                  boxShadow: '0 4px 12px #9F7AEA33',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px #9F7AEA44';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px #9F7AEA33';
                }}
              >
                Book Session for ${counsellor.charges || '30'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeerProfilePage;