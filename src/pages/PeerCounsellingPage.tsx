import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const valuePoints = [
  { title:'Real Student Insights', text:'Current international students share up‑to‑date campus & lifestyle realities.' },
  { title:'Profile Alignment', text:'Get candid feedback on goals, competitiveness & strategic positioning.' },
  { title:'Country & Program Clarity', text:'Compare destinations on cost, outcomes, culture & career pathways.' },
  { title:'Actionable Next Steps', text:'Leave every session with prioritized, time‑bound tasks.' }
];

// Update the flow array to match your actual peer counselling flow
const flow = [
  {
    step: 1,
    title: 'Choose Mentor',
    text: 'Browse our directory and select a peer counsellor whose background matches your goals, country, or university of interest.',
  },
  {
    step: 2,
    title: 'Pick Time Slot',
    text: 'View the mentor’s available slots and choose a date and time that works best for you.',
  },
  {
    step: 3,
    title: 'Book Session',
    text: 'Confirm your booking and complete payment. You’ll receive a confirmation email with your session details and Google Meet link.',
  },
  {
    step: 4,
    title: 'Connect & Learn',
    text: 'Join the session using the meeting link sent to your email. Have a candid conversation, get real insights, and actionable advice from your peer mentor.',
  },
];


const faqs = [
  { q:'Who are the peers?', a:'Vetted current international students / recent grads matched by destination & discipline.' },
  { q:'How fast is matching?', a:'Usually under 24 hours; niche profiles may take a bit longer.' },
  { q:'Can I change mentor?', a:'Yes—one complimentary rematch with reason provided.' },
  { q:'Do peers edit SOP/essays?', a:'They give directional feedback only; drafting sits in Application Assistance.' }
];

const testimonials = [
  { name:'Ishika • CS Canada', text:'Gave me realistic insight on co‑ops & budgeting I never saw on blogs.' },
  { name:'Daniel • MS Germany', text:'Helped me choose between two programs with a clear ROI perspective.' },
  { name:'Fatima • UK Health', text:'Left with a concrete 6‑week prep checklist. Removed uncertainty.' }
];

const API_BASE = 'https://studconnect-backend.onrender.com'; 
// const API_BASE = 'http://localhost:8000';

const PeerCounsellingPage: React.FC = () => {
  const nav = useNavigate();
  const { user } = useAuth(); // <-- Get user from AuthContext
  // Add ref for counsellor section
  const counsellorSectionRef = useRef<HTMLDivElement>(null);
  // Directory state
  const [counsellors, setCounsellors] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);
  const [bookingStep, setBookingStep] = useState<'profile'|'slot'|'payment'|'confirmed'|null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [slots, setSlots] = useState<any[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<any | null>(null);
  const [bookingId, setBookingId] = useState<number | null>(null);
  const [meetingLink, setMeetingLink] = useState<string>('');
  const [bookingLoading, setBookingLoading] = useState(false);
  // Stripe loader
  const [stripeLoaded, setStripeLoaded] = useState(false);
  const [showDetails, setShowDetails] = useState<any | null>(null);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [razorpayOrderId, setRazorpayOrderId] = useState<string | null>(null);

  useEffect(() => {
    // Load Stripe.js script if not already present
    if (!window.Stripe) {
      const script = document.createElement('script');
      script.src = 'https://js.stripe.com/v3/';
      script.async = true;
      script.onload = () => setStripeLoaded(true);
      document.body.appendChild(script);
    } else {
      setStripeLoaded(true);
    }
  }, []);

  // Fetch peer counsellors from API
  useEffect(() => {
    fetch(`${API_BASE}/peer-counsellors`)
      .then(r => r.json())
      .then(setCounsellors);
  }, []);

  // Helper: get next available date with future slots
  const getNextAvailableDate = async (counsellorId: number) => {
    const res = await fetch(`${API_BASE}/peer-counsellors/${counsellorId}/available-slots`);
    const data = await res.json();
    const now = new Date();
    // Find the first slot whose date+start_time is in the future
    for (const slot of data) {
      const slotDateTime = new Date(`${slot.date}T${slot.start_time}`);
      if (slotDateTime > now) {
        return slot.date;
      }
    }
    return ''; // No future slots
  };

  // Modified startBooking: preselect next available date with future slots and first slot
  const startBooking = async (c: any) => {
    setSelected(c);
    setBookingStep('slot');
    setBookingId(null);
    setMeetingLink('');
    setSlots([]); // clear previous slots
    setSelectedSlot(null);
    // Find next available date with future slot
    const res = await fetch(`${API_BASE}/peer-counsellors/${c.id}/available-slots`);
    const data = await res.json();
    const now = new Date();
    // Find the first slot whose date+start_time is in the future
    const nextSlot = data.find((slot: any) => new Date(`${slot.date}T${slot.start_time}`) > now);
    if (nextSlot) {
      setSelectedDate(nextSlot.date);
      setSlots(data.filter((s: any) => s.date === nextSlot.date));
      setSelectedSlot(nextSlot);
    } else {
      setSelectedDate('');
      setSlots([]);
      setSelectedSlot(null);
    }
  };

  // Fetch available slots when counsellor or date changes (but don't auto-select slot if already set)
  useEffect(() => {
    if (selected && bookingStep === 'slot' && selectedDate) {
      setSlotsLoading(true);
      fetch(`${API_BASE}/peer-counsellors/${selected.id}/available-slots`)
        .then(r => r.json())
        .then(data => {
          const filtered = data.filter((s:any) => s.date === selectedDate);
          setSlots(filtered);
          // If user changed date, auto-select first slot for that date
          if (filtered.length > 0 && (!selectedSlot || filtered.every((s:any) => s.slot_id !== selectedSlot.slot_id))) {
            setSelectedSlot(filtered[0]);
          } else if (filtered.length === 0) {
            setSelectedSlot(null);
          }
        })
        .finally(() => setSlotsLoading(false));
    }
  }, [selected, bookingStep, selectedDate]);

  // Book slot (status: pending)
  const handleBookSlot = async () => {
    setBookingLoading(true);
    if (!user || !user.id || !user.email) {
      alert('Please log in to book a session.');
      setBookingLoading(false);
      return;
    }
    const payload = {
      user_id: String(user.id),
      user_email: user.email,
      counsellor_id: Number(selected.id),
      counsellor_email: selected.email,
      slot_id: Number(selectedSlot.slot_id),
      slot_date: `${selectedSlot.date}T${selectedSlot.start_time}`,
      payment_status: 'pending'
    };
    try {
      const res = await fetch(`${API_BASE}/peer-counsellors/book-slot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Server error: ${res.status} - ${errText}`);
      }
      const data = await res.json();
      setBookingId(data.id);
      const amount = selected.charges;
      nav(`/services/peer-counselling-billing?bookingId=${data.id}&amount=${amount}`, {
        state: {
          counsellor: selected,
          slot: selectedSlot,
          bookingId: data.id,
          user,
        }
      });
    } catch (err) {
      alert('Booking failed. Please try again.');
    }
    setBookingLoading(false);
  };

  const handleRazorpayPayment = async () => {
    setBookingLoading(true);
    if (!user || !user.email) {
      alert('Please log in to continue payment.');
      setBookingLoading(false);
      return;
    }
    if (!bookingId) {
      alert('Booking not found. Please try again.');
      setBookingLoading(false);
      return;
    }
    try {
      const orderRes = await fetch(`${API_BASE}/payments/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: selected.charges, // in INR
          currency: 'INR',
          receipt: `booking_${bookingId}`,
          notes: { booking_id: bookingId }
        })
      });
      if (!orderRes.ok) throw new Error('Failed to create payment order');
      const orderData = await orderRes.json();
      setRazorpayOrderId(orderData.order_id);

      // 2. Open Razorpay checkout
      const razorpayKey = process.env.REACT_APP_RAZORPAY_KEY_ID || 'rzp_test_xxxxxxxx';
      const options = {
        key: razorpayKey,
        amount: orderData.amount, // in paise
        currency: orderData.currency,
        name: 'Peer Counselling Session',
        description: 'Session Fee',
        order_id: orderData.order_id,
        handler: async function (response: any) {
          // 3. Verify payment signature via backend
          try {
            const verifyRes = await fetch(`${API_BASE}/payments/verify`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                booking_id: bookingId
              })
            });
            if (!verifyRes.ok) throw new Error('Payment verification failed');
            setBookingStep('confirmed');
          } catch (err) {
            alert('Payment verification failed. Please contact support.');
          }
          setBookingLoading(false);
        },
        prefill: {
          email: user.email
        },
        notes: { booking_id: bookingId }
      };
      // Load Razorpay script if not loaded
      if (!(window as any).Razorpay) {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
          const rzp = new (window as any).Razorpay(options);
          rzp.open();
        };
        document.body.appendChild(script);
      } else {
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      }
    } catch (err) {
      alert('Payment initiation failed. Please try again.');
      setBookingLoading(false);
    }
  };

  // Scroll to counsellor section on Book Session click
  const goContact = () => {
    window.location.href = 'mailto:hello@yournextuniversity.com';
  };

  // Handle Stripe redirect result
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('payment') === 'success') {
      setBookingStep('confirmed');
      setSelected(selected => selected); // keep selected
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  return (
    <main
      className="peer-page"
      style={{
        background: 'radial-gradient(at 70% 0%, rgb(224, 195, 252) 0%, rgb(223 196 255) 35%, rgb(240, 230, 255) 70%, rgb(255, 255, 255) 100%)',
        minHeight: '100vh',
        paddingTop: '90px',
      }}
    >
      {/* --- HERO BANNER --- */}
      <section className="peer-hero" style={{
        background: 'linear-gradient(100deg, #5727A3 0%, #9F7AEA 70%, #7c3aed 100%)',
        color: '#fff',
        padding: '4.5rem 0 3.5rem 0',
        borderRadius: '0 0 48px 48px',
        boxShadow: '0 12px 64px #9F7AEA33',
        marginBottom: '2.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* 3D Animated Blobs and Sparkles */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            zIndex: 0,
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            overflow: 'hidden'
          }}
        >
          {/* Main floating blob */}
          <div style={{
            position: 'absolute',
            top: '-120px',
            left: '-120px',
            width: 420,
            height: 420,
            background: 'radial-gradient(circle at 30% 30%, #A78BFA99 0%, #6D28D933 100%)',
            filter: 'blur(90px)',
            borderRadius: '50%',
            opacity: 0.55,
            animation: 'floatHero1 16s ease-in-out infinite alternate'
          }} />
          {/* Purple ring */}
          <svg
            width="320"
            height="320"
            viewBox="0 0 320 320"
            style={{
              position: 'absolute',
              top: '60%',
              left: '-100px',
              opacity: 0.13,
              filter: 'blur(2.5px)',
              transform: 'rotate(-18deg)',
              animation: 'spinHero 28s linear infinite'
            }}
          >
            <ellipse
              cx="160"
              cy="160"
              rx="120"
              ry="48"
              fill="none"
              stroke="#a78bfa"
              strokeWidth="18"
            />
          </svg>
          {/* Sparkle */}
          {/* Keyframes */}
          <style>
            {`
              @keyframes floatHero1 {
                0% { transform: translateY(0) scale(1);}
                100% { transform: translateY(60px) scale(1.08);}
              }
              @keyframes spinHero {
                100% { transform: rotate(342deg);}
              }
              @keyframes sparkleHero {
                0% { opacity: 0.7; transform: scale(1);}
                100% { opacity: 1; transform: scale(1.18);}
              }
              /* 3D entrance animations for hero elements */
              @keyframes heroFadeInUp {
                0% { opacity: 0; transform: translate3d(0, 60px, 0) scale3d(0.95,0.95,1) rotateX(18deg);}
                80% { opacity: 1; transform: translate3d(0, -8px, 0) scale3d(1.03,1.03,1) rotateX(-2deg);}
                100% { opacity: 1; transform: translate3d(0, 0, 0) scale3d(1,1,1) rotateX(0);}
              }
              @keyframes heroFadeIn {
                0% { opacity: 0; transform: scale3d(0.95,0.95,1) rotateY(-18deg);}
                80% { opacity: 1; transform: scale3d(1.03,1.03,1) rotateY(2deg);}
                100% { opacity: 1; transform: scale3d(1,1,1) rotateY(0);}
              }
              @keyframes heroFadeInRight {
                0% { opacity: 0; transform: translate3d(60px,0,0) scale3d(0.95,0.95,1) rotateY(-18deg);}
                80% { opacity: 1; transform: translate3d(-8px,0,0) scale3d(1.03,1.03,1) rotateY(2deg);}
                100% { opacity: 1; transform: translate3d(0,0,0) scale3d(1,1,1) rotateY(0);}
              }
              @keyframes heroFadeInLeft {
                0% { opacity: 0; transform: translate3d(-60px,0,0) scale3d(0.95,0.95,1) rotateY(18deg);}
                80% { opacity: 1; transform: translate3d(8px,0,0) scale3d(1.03,1.03,1) rotateY(-2deg);}
                100% { opacity: 1; transform: translate3d(0,0,0) scale3d(1,1,1) rotateY(0);}
              }
            `}
          </style>
        </div>
        <div className="peer-hero__inner" style={{
          maxWidth: 900,
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1
        }}>
          <h1
            style={{
              fontWeight: 900,
              fontSize: '2.9rem',
              letterSpacing: '-1.5px',
              marginBottom: '1.1rem',
              lineHeight: 1.1,
              background: 'linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(222 211 255) 30%, rgb(255 255 255) 100%) text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block',
              animation: 'heroFadeInUp 1.1s cubic-bezier(.4,1.6,.6,1) both'
            }}
          >
            India’s 1<sup style={{fontSize:'1.3rem', color:'#a78bfa', verticalAlign:'top'}}>st</sup> Peer Counselling Platform
          </h1>
          <div
            style={{
              fontWeight: 700,
              fontSize: '1.45rem',
              margin: '0 0 1.7rem 0',
              color: '#f3e8ff',
              textShadow: '0 2px 16px #a78bfa44',
              animation: 'heroFadeIn 1.3s 0.2s cubic-bezier(.4,1.6,.6,1) both'
            }}
          >
            Talk to Real Students. Get Unfiltered Advice. <br />
            <span style={{color:'#d0c1fbff', fontWeight:900}}>No Agents. No Guesswork. Just Real Experience.</span>
          </div>
          <div
            style={{
              fontWeight: 500,
              fontSize: '1.13rem',
              margin: '0 0 2.2rem 0',
              color: '#e0e7ff',
              textShadow: '0 1px 8px #9F7AEA33',
              animation: 'heroFadeInLeft 1.1s 0.4s cubic-bezier(.4,1.6,.6,1) both'
            }}
          >
            <span style={{background:'#fff', color:'#7c3aed', borderRadius:8, padding:'0.2em 0.7em', fontWeight:700, fontSize:'1.08rem', marginRight:'.7em'}}>New</span>
            <span>
              Book a 1:1 video session with a current international student and get honest, actionable guidance for your study abroad journey.
            </span>
          </div>
          <div
            className="peer-cta-group"
            style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              marginBottom: '1.5rem',
              animation: 'heroFadeInRight 1.1s 0.6s cubic-bezier(.4,1.6,.6,1) both'
            }}
          >
            <button className="btn btn-primary" style={{
              background: '#fff',
              color: '#5727A3',
              border: 'none',
              borderRadius: 16,
              fontWeight: 800,
              fontSize: '1.18rem',
              padding: '1rem 2.6rem',
              boxShadow: '0 2px 12px #a78bfa33',
              cursor: 'pointer',
              letterSpacing: '0.5px'
            }} onClick={goContact}>Book Session Now</button>
            <button className="btn btn-small" style={{
              background: 'linear-gradient(90deg, #a78bfa 0%, #9F7AEA 100%)',
              color: '#5727A3',
              border: '1.5px solid #a78bfa',
              borderRadius: 16,
              fontWeight: 700,
              fontSize: '1.13rem',
              padding: '1rem 2.2rem',
              cursor: 'pointer'
            }} onClick={()=>nav('/services')}>See All Services</button>
          </div>
          <div
            className="peer-stats"
            style={{
              display: 'flex',
              gap: '2.5rem',
              justifyContent: 'center',
              marginTop: '2.2rem',
              animation: 'heroFadeInUp 1.1s 0.8s cubic-bezier(.4,1.6,.6,1) both'
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <strong style={{ fontSize: '2.2rem', color: '#fff', fontWeight: 900, textShadow: '0 2px 12px #a78bfa44' }}>3k+</strong>
              <span style={{ display: 'block', color: '#e0e7ff', fontWeight: 500 }}>Peer Sessions</span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <strong style={{ fontSize: '2.2rem', color: '#fff', fontWeight: 900, textShadow: '0 2px 12px #a78bfa44' }}>800+</strong>
              <span style={{ display: 'block', color: '#e0e7ff', fontWeight: 500 }}>Universities</span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <strong style={{ fontSize: '2.2rem', color: '#fff', fontWeight: 900, textShadow: '0 2px 12px #a78bfa44' }}>6</strong>
              <span style={{ display: 'block', color: '#e0e7ff', fontWeight: 500 }}>Countries</span>
            </div>
          </div>
        </div>
      </section>


      {/* --- Peer Counsellor Directory --- */}
      <section
        className="peer-section"
        ref={counsellorSectionRef}
        style={{
          background: 'linear-gradient(120deg, #f8e8ff 0%, #e0c3fc 100%)',
          borderRadius: 32,
          boxShadow: '0 8px 48px #9F7AEA22',
          maxWidth: 1200,
          margin: '2.5rem auto 0 auto',
          padding: '3.5rem 1.5rem 2.5rem 1.5rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
        {/* Animated Glow Behind Heading */}
        <div style={{
          position: 'absolute',
          top: 30,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 320,
          height: 80,
          background: 'radial-gradient(circle at 50% 50%, #c084fc55 0%, #fff0 80%)',
          filter: 'blur(18px)',
          zIndex: 0,
          pointerEvents: 'none',
          animation: 'glowPulse 3s infinite alternate'
        }} />
        {/* Gradient Animated Heading */}
        <h2 className="peer-heading" style={{
          color: '#5727A3',
          fontWeight: 900,
          fontSize: '2.5rem',
          marginBottom: '1.2rem',
          letterSpacing: '-1px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
          background: 'linear-gradient(90deg, #a21caf 0%, #7c3aed 50%, #f472b6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Meet Our Peer Counsellors
        </h2>
        {/* Decorative Underline */}
        <div style={{
          width: 90,
          height: 7,
          borderRadius: 8,
          margin: '0 auto 2.2rem auto',
          background: 'linear-gradient(90deg, #a21caf 0%, #7c3aed 50%, #f472b6 100%)',
          opacity: 0.7,
          boxShadow: '0 2px 12px #a21caf33'
        }} />
        {/* Subtle pattern overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'1.5\' fill=\'%239F7AEA\' fill-opacity=\'0.13\'/%3E%3C/svg%3E") repeat',
          opacity: 0.25,
          zIndex: 0,
          pointerEvents: 'none'
        }} />
        <div className="peer-directory" style={{
          display:'flex',
          flexWrap:'wrap',
          gap:'2.2rem',
          justifyContent:'center',
          position: 'relative',
          zIndex: 1
        }}>
          {counsellors.map(c => (
            <div
              key={c.id}
              className="peer-profile-card"
              tabIndex={0}
              style={{
                background:'linear-gradient(135deg,#fff 60%,#e0c3fc 100%)',
                borderRadius:20,
                boxShadow:'0 4px 24px #a78bfa33, 0 1.5px 8px #f472b633',
                padding:'2rem 1.5rem 1.5rem 1.5rem',
                width:320,
                display:'flex',
                flexDirection:'column',
                alignItems:'center',
                transition: 'transform 0.18s cubic-bezier(.4,2,.6,1), box-shadow 0.18s',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-7px) scale(1.025)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px #a78bfa55, 0 2px 16px #f472b655';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = '';
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 24px #a78bfa33, 0 1.5px 8px #f472b633';
              }}
            >
              {/* Card Glow Accent */}
              <div style={{
                position: 'absolute',
                top: -30,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 120,
                height: 60,
                background: 'radial-gradient(circle at 50% 50%, #f472b655 0%, #fff0 80%)',
                filter: 'blur(12px)',
                zIndex: 0,
                pointerEvents: 'none'
              }} />
              <img
                src={c.profile_image_url}
                alt={c.name}
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginBottom: '.8rem',
                  border: '4px solid #a21caf',
                  boxShadow: '0 2px 12px #f472b655',
                  flexShrink: 0
                }}
              />
              <h3 style={{
                marginBottom:'.2rem',
                color:'#7c3aed',
                fontWeight:900,
                fontSize:'1.25rem',
                letterSpacing:'-0.5px'
              }}>{c.name}</h3>
              <div style={{
                fontSize:'.99rem',
                color:'#a21caf',
                marginBottom:'.2rem',
                fontWeight:700
              }}>{c.university}</div>
              <div style={{
                fontSize:'.93rem',
                color:'#1B0044',
                marginBottom:'.2rem'
              }}>{c.program}</div>
              {/* Only show minimal info here */}
              <div style={{
                fontSize:'.93rem',
                color:'#475569',
                marginBottom:'.5rem'
              }}>{c.location}</div>
              <div style={{
                marginBottom:'.7rem',
                color:'#a21caf',
                fontWeight:700,
                fontSize:'.98rem'
              }}>
                Fee: <span style={{color:'#7c3aed'}}>₹{c.charges}</span>
              </div>
              <div style={{display: 'flex', gap: '0.7rem', marginTop: '.5rem'}}>
                <button className="btn btn-primary btn-small" style={{
                  background: 'linear-gradient(90deg, #a21caf 0%, #7c3aed 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 10,
                  fontWeight: 800,
                  fontSize: '1.07rem',
                  padding: '0.7rem 1.6rem',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px #a21caf33'
                }} onClick={() => {
                  if (!user || !user.id) {
                    nav('/auth/login', { state: { from: '/peer-counselling' } });
                  } else {
                    startBooking(c);
                  }
                }}>
                  Book Session
                </button>
                <button
                  className="btn btn-secondary btn-small"
                  style={{
                    background: '#fff',
                    color: '#a21caf',
                    border: '1.5px solid #a21caf',
                    borderRadius: 10,
                    fontWeight: 700,
                    fontSize: '1.07rem',
                    padding: '0.7rem 1.6rem',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    if (!user || !user.id) {
                      nav('/auth/login', { state: { from: '/peer-counselling' } });
                    } else {
                      setShowDetails(c);
                    }
                  }}
                >
                  Show Details
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Details Modal */}
        {showDetails && (
          <div className="modal-overlay" style={{
            position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(87,39,163,0.13)', zIndex:2000, display:'flex', alignItems:'center', justifyContent:'center'
          }} onClick={()=>setShowDetails(null)}>
            <div className="modal peer-modal-3d" style={{
              background:'linear-gradient(135deg,#fff 60%,#e0c3fc 100%)',
              borderRadius:22,
              boxShadow:'0 8px 48px #9F7AEA22, 0 2px 16px #9F7AEA33',
              padding:'2.5rem 2.2rem 2.2rem 2.2rem',
              minWidth:360,
              maxWidth:540,
              position:'relative',
              overflow:'auto',
              maxHeight:'92vh',
              border: '2.5px solid #9F7AEA'
            }} onClick={e=>e.stopPropagation()}>
              {/* Profile Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.3rem',
                marginBottom: '1.5rem'
              }}>
                <img
                  src={showDetails.profile_image_url}
                  alt={showDetails.name}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '4px solid #9F7AEA',
                    boxShadow: '0 2px 12px #9F7AEA33',
                    flexShrink: 0
                  }}
                />
                <div>
                  <h2 style={{
                    color:'#5727A3',
                    fontWeight:900,
                    fontSize:'1.7rem',
                    margin:0,
                    letterSpacing:'-1px'
                  }}>{showDetails.name}</h2>
                  <div style={{color:'#7c3aed', fontWeight:700, fontSize: '1.08rem', marginTop:'.2rem'}}>{showDetails.university}</div>
                  <div style={{color:'#1B0044', fontWeight:500, fontSize:'.98rem'}}>{showDetails.program}</div>
                  <div style={{color:'#475569', fontWeight:500, fontSize:'.97rem'}}>{showDetails.location}</div>
                </div>
              </div>
              {/* Charges */}
              <div style={{
                background: 'linear-gradient(90deg,#ede9fe 0%,#c7d2fe 100%)',
                color: '#5727A3',
                fontWeight: 800,
                fontSize: '1.08rem',
                borderRadius: 10,
                padding: '0.5rem 1.2rem',
                display: 'inline-block',
                marginBottom: '1.2rem',
                boxShadow: '0 1px 8px #9F7AEA22'
              }}>
                Fee: <span style={{color:'#7c3aed'}}>₹{showDetails.charges}</span>
              </div>
              {/* About Section */}
              <section style={{
                marginBottom: '1.2rem',
                background: '#f8fafc',
                borderRadius: 12,
                padding: '1.1rem 1.2rem',
                boxShadow: '0 1px 8px #9F7AEA11'
              }}>
                <h3 style={{
                  color:'#7c3aed',
                  fontWeight:800,
                  fontSize:'1.13rem',
                  margin:'0 0 .5rem 0',
                  letterSpacing:'-0.5px'
                }}>About</h3>
                <div style={{color:'#475569', fontSize:'1.01rem', fontWeight:500}}>{showDetails.about}</div>
              </section>
              {/* Expertise & Languages */}
              <section style={{
                marginBottom: '1.2rem',
                display: 'flex',
                gap: '1.5rem',
                flexWrap: 'wrap'
              }}>
                <div style={{flex:1, minWidth:120}}>
                  <h4 style={{color:'#7c3aed', fontWeight:700, fontSize:'.99rem', margin:'0 0 .3rem 0'}}>Expertise</h4>
                  <div style={{display:'flex', flexWrap:'wrap', gap:'.4rem'}}>
                    {showDetails.expertise && showDetails.expertise.split(',').map((a:string) =>
                      <span key={a} style={{
                        background:'linear-gradient(90deg,#ede9fe 0%,#c7d2fe 100%)',
                        color:'#5727A3',
                        borderRadius:8,
                        padding:'2px 10px',
                        fontSize:'.87rem',
                        fontWeight:700,
                        boxShadow:'0 1px 4px #9F7AEA22'
                      }}>{a}</span>
                    )}
                  </div>
                </div>
                <div style={{flex:1, minWidth:120}}>
                  <h4 style={{color:'#7c3aed', fontWeight:700, fontSize:'.99rem', margin:'0 0 .3rem 0'}}>Languages</h4>
                  <div style={{color:'#7c3aed', fontWeight:600, fontSize:'.97rem'}}>{showDetails.languages}</div>
                </div>
              </section>
              {/* Experience Section */}
              <section style={{
                marginBottom: '1.2rem',
                background: '#f8fafc',
                borderRadius: 12,
                padding: '1.1rem 1.2rem',
                boxShadow: '0 1px 8px #9F7AEA11'
              }}>
                <h3 style={{
                  color:'#7c3aed',
                  fontWeight:800,
                  fontSize:'1.13rem',
                  margin:'0 0 .5rem 0'
                }}>Experience & Journey</h3>
                <div style={{color:'#475569', fontSize:'.99rem', marginBottom:'.3rem'}}><b>Work:</b> {showDetails.work_experience}</div>
                <div style={{color:'#475569', fontSize:'.99rem', marginBottom:'.3rem'}}><b>Peer Support:</b> {showDetails.peer_support_experience}</div>
                <div style={{color:'#475569', fontSize:'.99rem', marginBottom:'.3rem'}}><b>Projects:</b> {showDetails.projects}</div>
                <div style={{color:'#475569', fontSize:'.99rem'}}><b>Journey:</b> {showDetails.journey}</div>
              </section>
              {/* Book/Close Buttons */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.2rem', // Increased gap for better spacing
                marginTop: '1.5rem',
                margin: '0.3rem',
              }}>
                <button
                  className="btn btn-primary btn-small"
                  style={{
                    background: 'linear-gradient(90deg, #5727A3 0%, #2d1457 100%)',
                    color: '#fff',
                    border: 'none',
                    fontWeight: 800
                  }}
                  onClick={() => {
                    setShowDetails(null);
                    startBooking(showDetails);
                  }}
                >
                  Book Session
                </button>
                <button
                  className="btn btn-secondary btn-small"
                  style={{}}
                  onClick={()=>setShowDetails(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Keyframes for glow animation */}
        <style>
          {`
            @keyframes glowPulse {
              0% { opacity: 0.7; }
              100% { opacity: 1; }
            }
            .peer-profile-card {
              will-change: transform;
              transition: box-shadow 0.18s, transform 0.18s;
            }
            .peer-profile-card:focus {
              outline: 2px solid #a21caf;
              outline-offset: 2px;
            }
            .peer-profile-card:hover, .peer-profile-card:focus {
              transform: perspective(900px) rotateY(8deg) scale(1.04);
              box-shadow: 0 12px 36px #a78bfa55, 0 4px 16px #f472b655;
              z-index: 2;
            }
            .peer-modal-3d {
              will-change: transform;
              transition: box-shadow 0.18s, transform 0.18s;
            }
            .peer-modal-3d:hover, .peer-modal-3d:focus {
              transform: perspective(1200px) rotateX(4deg) scale(1.01);
              box-shadow: 0 12px 36px #9F7AEA33, 0 4px 16px #a21caf33;
              z-index: 10;
            }
          `}
        </style>
      </section>

      {/* --- Booking Modal --- */}
      {selected && bookingStep && (
        <div className="modal-overlay" style={{
          position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(87,39,163,0.13)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center'
        }} onClick={()=>{setSelected(null); setBookingStep(null);}}>
          <div className="modal peer-modal-3d" style={{
            background:'linear-gradient(135deg,#fff 60%,#e0c3fc 100%)',
            borderRadius:16,
            boxShadow:'0 2px 24px #9F7AEA22',
            padding:'2rem',
            minWidth:320,
            maxWidth:400,
            position:'relative'
          }} onClick={e=>e.stopPropagation()}>
            {/* Remove the profile step/modal entirely */}
            {bookingStep === 'slot' && (
              <>
                <div style={{
                  background: 'linear-gradient(90deg,#ede9fe 0%,#c7d2fe 100%)',
                  borderRadius: 12,
                  boxShadow: '0 2px 12px #9F7AEA11',
                  padding: '1.2rem 1.1rem 1.7rem 1.1rem',
                  marginBottom: '1.2rem',
                  marginTop: '-1rem'
                }}>
                  <h3 style={{
                    color:'#5727A3',
                    fontWeight:900,
                    fontSize:'1.25rem',
                    marginBottom:'.7rem',
                    letterSpacing:'-0.5px',
                    textAlign:'center'
                  }}>Select a Date</h3>
                  <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:'1.1rem'}}>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={e => { setSelectedDate(e.target.value); setSelectedSlot(null); }}
                      style={{
                        marginBottom: 0,
                        padding: '0.7rem 1.2rem',
                        borderRadius: 8,
                        border: '1.5px solid #9F7AEA',
                        fontSize: '1.09rem',
                        fontWeight: 600,
                        color: '#5727A3',
                        background: '#fff',
                        boxShadow: '0 1px 4px #9F7AEA11',
                        outline: 'none',
                        width: '100%',
                        maxWidth: 220,
                        letterSpacing: '1px'
                      }}
                      placeholder="dd/mm/yyyy"
                      disabled={slotsLoading}
                    />
                    <span style={{
                      fontSize: '.97rem',
                      color: '#64748b',
                      fontWeight: 500,
                      marginTop: '-0.5rem'
                    }}>
                      {selectedDate ? new Date(selectedDate).toLocaleDateString('en-GB') : 'dd/mm/yyyy'}
                    </span>
                  </div>
                  {/* Slot Picker */}
                  <div style={{
                    marginTop: '1.5rem',
                    marginBottom: '1.2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}>
                    <div style={{
                      fontWeight: 700,
                      color: '#7c3aed',
                      fontSize: '1.08rem',
                      marginBottom: '.7rem'
                    }}>
                      Available Time Slots
                    </div>
                    {slotsLoading ? (
                      <div style={{margin: '1.2rem 0'}}>
                        <div className="slot-spinner" style={{
                          width: 32, height: 32, border: '4px solid #e9d5ff', borderTop: '4px solid #a21caf',
                          borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto'
                        }} />
                        <style>
                          {`@keyframes spin { 100% { transform: rotate(360deg); } }`}
                        </style>
                      </div>
                    ) : (
                      <div
                        style={{
                          display:'flex',
                          flexWrap:'wrap',
                          gap:'.7rem',
                          justifyContent:'center',
                          marginBottom:'1rem',
                          opacity: slotsLoading ? 0 : 1,
                          transition: 'opacity 0.3s'
                        }}
                        className="slot-fadein"
                      >
                        {selectedDate && slots.length === 0 && (
                          <span style={{color:'#64748b', fontWeight:500, fontSize:'.98rem'}}>No slots available for this date.</span>
                        )}
                        {slots.map(slot => (
                          <button
                            key={slot.slot_id}
                            disabled={slotsLoading}
                            style={{
                              padding: '.7rem 1.3rem',
                              borderRadius: 10,
                              border: selectedSlot && selectedSlot.slot_id === slot.slot_id ? '2px solid #9F7AEA' : '1.5px solid #e5e7eb',
                              background: selectedSlot && selectedSlot.slot_id === slot.slot_id ? 'linear-gradient(90deg,#7c3aed 0%,#a21caf 100%)' : '#fff',
                              color: selectedSlot && selectedSlot.slot_id === slot.slot_id ? '#fff' : '#5727A3',
                              fontWeight: 700,
                              fontSize: '1.07rem',
                              cursor: slotsLoading ? 'not-allowed' : 'pointer',
                              boxShadow: selectedSlot && selectedSlot.slot_id === slot.slot_id ? '0 2px 8px #a21caf33' : '0 1px 4px #9F7AEA11',
                              transition: 'all 0.16s'
                            }}
                            onClick={() => setSelectedSlot(slot)}
                          >
                            {slot.start_time} - {slot.end_time}
                          </button>
                        ))}
                      </div>
                    )}
                    {selectedSlot && !slotsLoading && (
                      <div style={{
                        marginTop: '.7rem',
                        background: 'linear-gradient(90deg,#ede9fe 0%,#c7d2fe 100%)',
                        borderRadius: 8,
                        padding: '0.7rem 1.2rem',
                        color: '#5727A3',
                        fontWeight: 700,
                        fontSize: '1.05rem',
                        boxShadow: '0 1px 4px #9F7AEA11'
                      }}>
                        <span>
                          <b>Date:</b> {selectedDate ? new Date(selectedDate).toLocaleDateString('en-GB') : ''} &nbsp; | &nbsp;
                          <b>Time:</b> {selectedSlot.start_time} - {selectedSlot.end_time}
                        </span>
                      </div>
                    )}
                  </div>
                  <div style={{
                    display: 'flex',
                    gap: '1.1rem',
                    justifyContent: 'center',
                    marginTop: '1.2rem'
                  }}>
                    <button
                      className="btn btn-primary"
                      style={{
                        background: 'linear-gradient(90deg, #5727A3 0%, #2d1457 100%)',
                        color: '#fff',
                        border: 'none',
                        fontWeight: 800,
                        fontSize: '1.09rem',
                        padding: '0.8rem 2.2rem',
                        borderRadius: 10,
                        minWidth: 170
                      }}
                      onClick={handleBookSlot}
                      disabled={!selectedSlot || bookingLoading || slotsLoading}
                    >
                      {bookingLoading ? 'Booking...' : 'Proceed to Payment'}
                    </button>
                    <button
                      className="btn btn-secondary"
                      style={{
                        background: '#fff',
                        color: '#5727A3',
                        border: '1.5px solid #9F7AEA',
                        borderRadius: 10,
                        fontWeight: 700,
                        fontSize: '1.09rem',
                        padding: '0.8rem 2.2rem',
                        minWidth: 110
                      }}
                      onClick={()=>{setSelected(null); setBookingStep(null); setSelectedDate(''); setSelectedSlot(null); setMeetingLink('');}}
                      disabled={slotsLoading}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </>
            )}
            
          </div>
        </div>
      )}

      <section className="peer-section" style={{
        background: 'rgba(255,255,255,0.93)',
        borderRadius: 28,
        boxShadow: '0 4px 24px #9F7AEA11',
        maxWidth: 1100,
        margin: '2.5rem auto 0 auto',
        padding: '2.5rem 1.5rem'
      }}>
        <h2 className="peer-heading" style={{
          color: '#5727A3',
          fontWeight: 900,
          fontSize: '2rem',
          marginBottom: '2rem',
          letterSpacing: '-1px',
          textAlign: 'center'
        }}>Session Flow</h2>
        <ol className="peer-flow" style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
          justifyContent: 'center',
          listStyle: 'none',
          padding: 0,
          margin: 0
        }}>
          {flow.map(f=>(
            <li key={f.step} style={{
              background: 'linear-gradient(135deg, rgb(238 229 253) 60%, rgb(235 199 254) 100%)',
              borderRadius: 16,
              boxShadow: '0 2px 12px #9F7AEA11',
              padding: '1.5rem 1.2rem',
              minWidth: 200,
              maxWidth: 260,
              textAlign: 'center',
              flex: '1 1 200px',
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
              whiteSpace: 'normal',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <div className="peer-flow__num" style={{
                width: 38,
                height: 38,
                background: 'linear-gradient(135deg,#5727A3 0%,#9F7AEA 100%)',
                color: '#fff',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1.2rem',
                margin: '0 auto 1rem auto',
                boxShadow: '0 2px 8px #9F7AEA22'
              }}>{f.step}</div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.7rem',
                marginBottom: '.7rem',
                width: '100%',
                flexWrap: 'nowrap'
              }}>
                {/* Hide the number here, since it's above */}
                <h3 style={{
                  color: '#5727A3',
                  fontWeight: 800,
                  fontSize: '1.13rem',
                  margin: 0,
                  wordBreak: 'break-word',
                  whiteSpace: 'normal',
                  flex: 1,
                  textAlign: 'center'
                }}>{f.title}</h3>
              </div>
              <p style={{
                color: '#1B0044',
                fontSize: '1.01rem',
                fontWeight: 500,
                margin: 0,
                wordBreak: 'break-word',
                whiteSpace: 'normal'
              }}>{f.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="peer-section" style={{
        background: 'rgba(255,255,255,0.93)',
        borderRadius: 28,
        boxShadow: '0 4px 24px #9F7AEA11',
        maxWidth: 1100,
        margin: '2.5rem auto 0 auto',
        padding: '2.5rem 1.5rem'
      }}>
        <h2 className="peer-heading" style={{
          color: '#5727A3',
          fontWeight: 900,
          fontSize: '2rem',
          marginBottom: '2rem',
          letterSpacing: '-1px',
          textAlign: 'center'
        }}>Real Outcomes</h2>
        <div className="peer-testimonials" style={{
          display: 'flex',
          gap: '2rem',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {testimonials.map(t=>(
            <div key={t.name} className="peer-testimonial" style={{
              background: 'linear-gradient(135deg,#e7c7fe 40%,#fff 100%)',
              borderRadius: 16,
              boxShadow: '0 2px 12px #9F7AEA11',
              padding: '1.5rem 1.2rem',
              minWidth: 220,
              maxWidth: 320,
              textAlign: 'center',
              color: '#5727A3',
              fontWeight: 600
            }}>
              <p style={{ fontStyle: 'italic', color: '#1B0044', fontWeight: 500 }}>"{t.text}"</p>
              <span style={{ color: '#9F7AEA', fontWeight: 700 }}>{t.name}</span>
            </div>
          ))}
        </div>
      </section>


      <section className="peer-section" style={{
        background: 'rgba(255,255,255,0.93)',
        borderRadius: 28,
        boxShadow: '0 4px 24px #9F7AEA11',
        maxWidth: 1100,
        margin: '2.5rem auto 2.5rem auto',
        padding: '2.5rem 1.5rem'
      }}>
        <h2 className="peer-heading" style={{
          color: '#5727A3',
          fontWeight: 900,
          fontSize: '2rem',
          marginBottom: '2rem',
          letterSpacing: '-1px',
          textAlign: 'center'
        }}>FAQs</h2>
        <div className="peer-faq">
          {faqs.map(f=>(
            <details key={f.q} style={{
              background: '#f8fafc',
              borderRadius: 10,
              marginBottom: '.9rem',
              padding: '.7rem 1rem',
              color: '#1B0044',
              border: '1.5px solid #e0e7ff'
            }}>
              <summary style={{ color: '#5727A3', fontWeight: 700, cursor: 'pointer' }}>{f.q}</summary>
              <p style={{ margin: '.5rem 0 0 0', color: '#334155' }}>{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
};

export default PeerCounsellingPage;
