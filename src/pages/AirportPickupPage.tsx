import React from 'react';

const AirportPickupPage: React.FC = () => (
  <main
    style={{
      paddingTop: '90px',
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at 70% 0%, #e0c3fc 0%, #f0e6ff 70%, #fff 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}
  >
    {/* 3D Animated Gradient Blobs */}
    <div style={{
      position: 'absolute',
      top: '-120px',
      left: '-120px',
      width: 400,
      height: 400,
      zIndex: 0,
      filter: 'blur(60px) brightness(1.1)',
      pointerEvents: 'none',
      opacity: 0.5,
      animation: 'blobMove1 12s ease-in-out infinite alternate'
    }}>
      <div style={{
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        background: 'radial-gradient(circle at 60% 40%, #D6C5F0 0%, #9F7AEA 80%, transparent 100%)'
      }} />
    </div>
    <div style={{
      position: 'absolute',
      bottom: '-100px',
      right: '-100px',
      width: 320,
      height: 320,
      zIndex: 0,
      filter: 'blur(50px) brightness(1.1)',
      pointerEvents: 'none',
      opacity: 0.4,
      animation: 'blobMove2 14s ease-in-out infinite alternate'
    }}>
      <div style={{
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        background: 'radial-gradient(circle at 40% 60%, #9F7AEA 0%, #D6C5F0 80%, transparent 100%)'
      }} />
    </div>
    <style>{`
      @keyframes blobMove1 {
        0% { transform: translateY(0) scale(1);}
        100% { transform: translateY(40px) scale(1.08);}
      }
      @keyframes blobMove2 {
        0% { transform: translateY(0) scale(1);}
        100% { transform: translateY(-30px) scale(1.04);}
      }
    `}</style>

    {/* Coming Soon Banner */}
    <div style={{
      width: '100%',
      background: 'linear-gradient(90deg,#9F7AEA 0%,#D6C5F0 100%)',
      color: '#fff',
      textAlign: 'center',
      padding: '0.7rem 0',
      fontWeight: 800,
      fontSize: '1.25rem',
      letterSpacing: '1px',
      marginBottom: '2rem',
      boxShadow: '0 2px 12px #9F7AEA33',
      position: 'relative',
      zIndex: 2
    }}>
      Airport Pickup Service — <span style={{ color: '#5727A3', background: '#fff', borderRadius: 8, padding: '0.2rem 0.7rem', marginLeft: 8 }}>Coming Soon</span>
    </div>

    {/* Hero Section */}
    <section style={{
      width: '100%',
      maxWidth: 1100,
      margin: '0 auto 2.5rem auto',
      background: '#fff',
      borderRadius: 32,
      boxShadow: '0 12px 48px #9F7AEA22, 0 2px 8px #D6C5F044',
      padding: '2.5rem 2.5rem 2rem 2.5rem',
      border: '2px solid #D6C5F0',
      textAlign: 'center',
      position: 'relative',
      zIndex: 2,
      overflow: 'hidden'
    }}>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2.5rem'
      }}>
        <div style={{ flex: 1, minWidth: 320, textAlign: 'left' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 900,
            color: '#5727A3',
            marginBottom: '1.2rem',
            letterSpacing: '-1px',
            background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Arrive with Confidence
          </h1>
          <p style={{
            fontSize: '1.18rem',
            color: '#1B0044',
            fontWeight: 600,
            marginBottom: '1.5rem'
          }}>
            Our airport pickup service ensures a smooth, safe, and welcoming transition from the airport to your new home. No stress, no confusion—just a warm welcome and reliable support.
          </p>
        </div>
        <div style={{ flex: 1, minWidth: 320, textAlign: 'center', position: 'relative' }}>
          {/* 3D Card with floating effect */}
          <div style={{
            display: 'inline-block',
            perspective: 900,
            width: 340,
            height: 260,
            margin: '0 auto',
            position: 'relative'
          }}>
            <div style={{
              width: 340,
              height: 220,
              borderRadius: 28,
              background: 'linear-gradient(120deg,#D6C5F0 60%,#fff 100%)',
              boxShadow: '0 8px 32px #9F7AEA33, 0 2px 8px #D6C5F044',
              border: '4px solid #fff',
              transform: 'rotateY(-12deg) rotateX(6deg) scale(1.03)',
              transition: 'transform 0.7s cubic-bezier(.4,2,.6,1)',
              overflow: 'hidden',
              position: 'relative',
              zIndex: 2,
              animation: 'floatCard 3.2s infinite alternate cubic-bezier(.4,2,.6,1)'
            }}>
              <img
                src="https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&w=800&q=80"
                alt="Airport Pickup"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: 24,
                  filter: 'brightness(1.07) saturate(1.1)'
                }}
              />
            </div>
            {/* Decorative ring */}
            <div style={{
              position: 'absolute',
              top: -30,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 380,
              height: 80,
              borderRadius: 40,
              background: 'radial-gradient(circle at 50% 50%, #D6C5F0 0%, #9F7AEA33 80%, transparent 100%)',
              opacity: 0.18,
              zIndex: 1,
              pointerEvents: 'none'
            }} />
            <style>{`
              @keyframes floatCard {
                0% { transform: rotateY(-12deg) rotateX(6deg) scale(1.03) translateY(0);}
                100% { transform: rotateY(-12deg) rotateX(6deg) scale(1.07) translateY(-12px);}
              }
            `}</style>
          </div>
        </div>
      </div>
    </section>

    {/* What You Get Section */}
    <section style={{
      width: '100%',
      maxWidth: 1100,
      margin: '0 auto 2.5rem auto',
      background: 'linear-gradient(90deg,#f0e6ff 0%,#fff 100%)',
      borderRadius: 32,
      boxShadow: '0 4px 16px #9F7AEA11',
      padding: '2.5rem 2.5rem 1.5rem 2.5rem',
      border: '2px solid #D6C5F0',
      textAlign: 'left',
      position: 'relative',
      zIndex: 2
    }}>
      <h2 style={{
        fontSize: '1.5rem',
        fontWeight: 800,
        color: '#5727A3',
        marginBottom: '1.1rem',
        letterSpacing: '-.5px'
      }}>
        What Does Our Airport Pickup Include?
      </h2>
      <ul style={{
        fontSize: '1.13rem',
        color: '#5727A3',
        marginBottom: '1.5rem',
        paddingLeft: '1.2rem',
        lineHeight: 1.7
      }}>
        <li><b>Meet & Greet:</b> Friendly representative waiting for you at arrivals.</li>
        <li><b>Safe Transport:</b> Comfortable, pre-arranged ride to your accommodation.</li>
        <li><b>Luggage Assistance:</b> Help with bags and settling in.</li>
        <li><b>24/7 Support:</b> We're here for unexpected delays or issues.</li>
        <li><b>Peace of Mind:</b> For both students and parents.</li>
      </ul>
    </section>

    {/* Why Book With Us? */}
    <section style={{
      width: '100%',
      maxWidth: 1100,
      margin: '0 auto 2.5rem auto',
      background: '#fff',
      borderRadius: 32,
      boxShadow: '0 4px 16px #9F7AEA11',
      padding: '2.5rem 2.5rem 1.5rem 2.5rem',
      border: '2px solid #D6C5F0',
      textAlign: 'left',
      position: 'relative',
      zIndex: 2
    }}>
      <h2 style={{
        fontSize: '1.5rem',
        fontWeight: 800,
        color: '#5727A3',
        marginBottom: '1.1rem',
        letterSpacing: '-.5px'
      }}>
        Why Book With Us?
      </h2>
      <ul style={{
        fontSize: '1.13rem',
        color: '#1B0044',
        marginBottom: '1.5rem',
        paddingLeft: '1.2rem',
        lineHeight: 1.7
      }}>
        <li>Trusted, verified drivers and representatives.</li>
        <li>Transparent pricing, no hidden fees.</li>
        <li>Personalized service for your arrival time and needs.</li>
        <li>Local knowledge and support for a smooth start.</li>
      </ul>
    </section>

    {/* Coming Soon Highlight Section */}
    <section style={{
      width: '100%',
      maxWidth: 1100,
      margin: '0 auto 2.5rem auto',
      background: 'linear-gradient(90deg,#9F7AEA 0%,#D6C5F0 100%)',
      borderRadius: 32,
      boxShadow: '0 4px 16px #9F7AEA33',
      padding: '2.5rem 2.5rem 1.5rem 2.5rem',
      border: '2px solid #D6C5F0',
      textAlign: 'center',
      position: 'relative',
      zIndex: 2
    }}>
      <h2 style={{
        fontSize: '1.6rem',
        fontWeight: 900,
        color: '#fff',
        marginBottom: '1.1rem',
        letterSpacing: '-.5px'
      }}>
        This Service is Launching Soon
      </h2>
      <p style={{
        fontSize: '1.13rem',
        color: '#fff',
        fontWeight: 600,
        marginBottom: '1.5rem'
      }}>
        We are finalizing partnerships and logistics to ensure the best experience for you. Stay tuned for updates and be the first to know when airport pickup is available!
      </p>
    </section>
  </main>
);

export default AirportPickupPage;
