import React from 'react';

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
}

interface PeerCounsellorModalProps {
  isOpen: boolean;
  onClose: () => void;
  counsellor: PeerCounsellor;
  onConnect: () => void;
}

const PeerCounsellorModal: React.FC<PeerCounsellorModalProps> = ({
  isOpen,
  onClose,
  counsellor,
  onConnect,
}) => {
  if (!isOpen) return null;

  // Generate credibility tags based on available information
  const credibilityTags = [
    counsellor.program ? `${counsellor.program.split(' ')[0]} Student` : '',
    counsellor.location ? `${counsellor.location.split(',')[0]}` : '',
    counsellor.charges ? `${counsellor.charges}$ per session` : '',
  ].filter(tag => tag !== '');

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        backdropFilter: 'blur(4px)',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '1.5rem',
          width: '90%',
          maxWidth: '420px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
          position: 'relative',
          overflow: 'hidden',
          transform: 'scale(1)',
          animation: 'modalAppear 0.3s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            color: '#999',
            zIndex: 10,
          }}
        >
          &times;
        </button>

        {/* Modal content */}
        <div style={{ textAlign: 'center', padding: '1rem 0.5rem 0' }}>
          {/* Profile photo */}
          <div style={{
            width: '100px',
            height: '100px',
            borderRadius: '20px',
            overflow: 'hidden',
            margin: '0 auto 1rem',
            border: '3px solid #e0c3fc',
          }}>
            <img
              src={counsellor.profile_image_url}
              alt={counsellor.name}
              referrerPolicy="no-referrer"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>

          {/* Name and university */}
          <h3 style={{
            fontSize: '1.4rem',
            fontWeight: 700,
            color: '#5727A3',
            margin: '0.5rem 0',
          }}>
            {counsellor.name}
          </h3>

          <p style={{
            fontSize: '1rem',
            color: '#1B0044',
            fontWeight: 500,
            margin: '0.2rem 0',
          }}>
            {counsellor.university}
          </p>

          <p style={{
            fontSize: '0.9rem',
            color: '#9F7AEA',
            fontWeight: 500,
            margin: '0.2rem 0',
          }}>
            {counsellor.location}
          </p>

          {/* Credibility tags */}
          <div style={{ margin: '1.2rem 0' }}>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.5rem',
            }}>
              {credibilityTags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  style={{
                    backgroundColor: '#F0E6FF',
                    color: '#5727A3',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* One-line intro */}
          <p style={{
            fontSize: '0.95rem',
            color: '#334155',
            margin: '0.8rem 0',
            fontStyle: 'italic',
          }}>
            {counsellor.about || 'Experienced peer with insights on studying abroad'}
          </p>

          {/* Connect button */}
          <button
            onClick={onConnect}
            style={{
              background: 'linear-gradient(90deg, #5727A3 0%, #9F7AEA 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '0.9rem 1.8rem',
              fontSize: '1.05rem',
              fontWeight: 700,
              cursor: 'pointer',
              width: '100%',
              marginTop: '1rem',
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
            Connect with {counsellor.name.split(' ')[0]}
          </button>
        </div>

        <style>{`
          @keyframes modalAppear {
            from {
              opacity: 0;
              transform: scale(0.8);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default PeerCounsellorModal;