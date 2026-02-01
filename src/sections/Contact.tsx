import React, { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import { API_BASE_URL } from '../apiBase';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';





// 3D Globe for Contact page
const ContactGlobe: React.FC = () => (
  <Canvas style={{
    width: 180,
    height: 180,
    position: 'absolute',
    top: -70,
    right: 40,
    zIndex: 0,
    pointerEvents: 'none'
  }}>
    <ambientLight intensity={0.7} />
    <directionalLight position={[3, 3, 3]} intensity={0.7} />
    <Float speed={2} rotationIntensity={1.2} floatIntensity={1.5}>
      <mesh>
        <sphereGeometry args={[1.3, 48, 48]} />
        <meshStandardMaterial color="#2D6A7A" roughness={0.38} metalness={0.18} />
      </mesh>
    </Float>
    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.7} />
  </Canvas>
);

interface ContactProps {
  style?: React.CSSProperties;
}

export const Contact: React.FC<ContactProps> = ({ style }) => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted'>('idle');
  const [errors, setErrors] = useState<{ phone?: string; email?: string }>({});
  const [phone, setPhone] = useState("");
  const ref = useReveal();

  // Calculate tomorrow's date for the min attribute
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  // Add state for form fields
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    dial_code: '+91',
    nationality: 'India',
    preferred_destination: '',
    preferred_study_level: '',
    preferred_start_date: '', // Changed from year to date
  });

  async function submitConsultationToExcel(data: Record<string, any>) {
    const apiUrl = `${API_BASE_URL}/api/consultation-excel`;
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString()
      })
    });
    if (!res.ok) throw new Error('Failed to submit consultation');
    return await res.json();
  }

  function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  }

  function validatePhone(phone: string, dial: string) {
    const digits = phone.replace(/\D/g, '');
    if (dial === '+91') {
      return /^[6-9]\d{9}$/.test(digits);
    }
    return digits.length >= 7;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status !== 'idle') return;
    const form = e.currentTarget;
    const phoneInput = form.elements.namedItem('phone') as HTMLInputElement;
    const dialInput = form.elements.namedItem('dial_code') as HTMLSelectElement;
    const emailInput = form.elements.namedItem('email') as HTMLInputElement;
    const firstNameInput = form.elements.namedItem('first_name') as HTMLInputElement;
    const lastNameInput = form.elements.namedItem('last_name') as HTMLInputElement;
    const nationalityInput = form.elements.namedItem('nationality') as HTMLSelectElement;
    // New fields
    const destinationInput = form.elements.namedItem('preferred_destination') as HTMLSelectElement;
    const studyLevelInput = form.elements.namedItem('preferred_study_level') as HTMLSelectElement;
    const startDateInput = form.elements.namedItem('preferred_start_date') as HTMLInputElement;

    const phoneVal = phoneInput.value.trim();
    const emailVal = emailInput.value.trim();
    const dialVal = dialInput.value;
    const firstNameVal = firstNameInput.value.trim();
    const lastNameVal = lastNameInput.value.trim();
    const nationalityVal = nationalityInput.value;
    const preferredDestinationVal = destinationInput.value;
    const preferredStudyLevelVal = studyLevelInput.value;
    const preferredStartDateVal = startDateInput.value;

    const nextErrors: { phone?: string; email?: string } = {};
    if (!validatePhone(phoneVal, dialVal)) {
      nextErrors.phone = dialVal === '+91' ? 'Enter a valid 10-digit Indian mobile starting 6-9' : 'Enter a valid phone number';
    }
    if (!validateEmail(emailVal)) {
      nextErrors.email = 'Enter a valid email address';
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return; // abort

    setStatus('submitting');
    // Send to backend for Excel storage
    submitConsultationToExcel({
      first_name: firstNameVal,
      last_name: lastNameVal,
      email: emailVal,
      phone: phoneVal,
      dial_code: dialVal,
      nationality: nationalityVal,
      preferred_destination: preferredDestinationVal,
      preferred_study_level: preferredStudyLevelVal,
      // Map date to year field for backend compatibility
      preferred_start_year: preferredStartDateVal,
    })
      .then(() => setStatus('submitted'))
      .catch(() => setStatus('idle'));
  }

  return (
    <section
      className="section reveal"
      id="contact"
      ref={ref as any}
      style={{
        position: 'relative',
        zIndex: 1,
        margin: '2.5rem auto 0 auto',
        padding: '2.5rem 0',
        overflow: 'hidden',
        width: '100%',
        maxWidth: 900,
        background: 'linear-gradient(135deg, #1A3A4A 0%, #2D6A7A 100%)',
        borderRadius: 24,
        ...style,
      }}
    >
      {/* 3D Globe background */}
      <div style={{ position: 'absolute', top: 0, right: 0, zIndex: 0, pointerEvents: 'none' }}>
        <ContactGlobe />
      </div>
      {/* Blurred glassy blobs */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '-100px',
          left: '-100px',
          width: 320,
          height: 320,
          background: 'radial-gradient(circle at 30% 30%, #D0E8EC88 0%, #2D6A7A33 100%)',
          filter: 'blur(60px)',
          borderRadius: '50%',
          opacity: 0.7,
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '-80px',
          right: '-80px',
          width: 220,
          height: 220,
          background: 'radial-gradient(circle at 70% 70%, #4A8A9A99 0%, #D0E8EC33 100%)',
          filter: 'blur(60px)',
          borderRadius: '50%',
          opacity: 0.6,
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />
      <div className="container contact-container" style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: 600,
        margin: '0 auto',
        padding: '0 1.2rem',
        width: '100%',
        boxSizing: 'border-box',
        overflow: 'visible' // <-- add this to prevent grid overflow
      }}>
        <h2
          className="section__title"
          style={{
            textAlign: 'center',
            marginTop: 0,
            marginBottom: '2rem',
            fontWeight: 900,
            fontSize: '2.3rem',
            letterSpacing: '-1px',
            lineHeight: 1.13,
            color: '#fff',
            textShadow: '0 2px 16px rgba(0, 0, 0, 0.3)',
            borderRadius: 8,
            padding: '0.2em 0',
            display: 'inline-block',
            width: '100%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          Book Your Consultation
        </h2>
        <form
          className="consultation"
          onSubmit={handleSubmit}
          noValidate
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #E8F4F6 100%)',
            borderRadius: 22,
            boxShadow: '0 8px 40px rgba(0, 0, 0, 0.15), 0 2px 12px rgba(0, 0, 0, 0.1)',
            padding: '2.2rem 1.7rem 2.3rem 1.7rem',
            color: '#0F2A36',
            maxWidth: 600,
            margin: '0 auto',
            border: '3px solid #1A3A4A',
            position: 'relative',
            zIndex: 2,
            width: '100%',
            boxSizing: 'border-box',
            overflow: 'visible' // <-- add this to prevent grid overflow
          }}
        >
          <div className="consultation__grid" style={{
            display: 'grid',
            gap: '1.3rem 1.2rem',
            gridTemplateColumns: '1fr 1fr',
            marginBottom: '1.3rem',
            width: '100%',
            boxSizing: 'border-box'
          }}>
            <div className="field">
              <label style={{ color: '#1A3A4A', fontWeight: 800, fontSize: '1.08rem', marginBottom: 6, display: 'block', letterSpacing: '-0.01em' }}>
                FIRST NAME
                {!formData.first_name && <span style={{ color: '#E75480' }}>*</span>}
              </label>
              <input
                required
                name="first_name"
                placeholder=""
                style={{ background: '#E8F4F6', color: '#0F2A36', border: '2px solid #2D6A7A', borderRadius: 10, padding: '0.7em 1em', fontSize: '1rem', transition: 'border 0.18s, box-shadow 0.18s', boxShadow: '0 1px 6px #B8D8DE22', fontWeight: 600 }}
                value={formData.first_name}
                onChange={e => setFormData(f => ({ ...f, first_name: e.target.value }))}
              />
            </div>
            <div className="field">
              <label style={{ color: '#1A3A4A', fontWeight: 800, fontSize: '1.08rem', marginBottom: 6, display: 'block', letterSpacing: '-0.01em' }}>
                LAST NAME
                {!formData.last_name && <span style={{ color: '#E75480' }}>*</span>}
              </label>
              <input
                required
                name="last_name"
                placeholder=""
                style={{ background: '#E8F4F6', color: '#0F2A36', border: '2px solid #2D6A7A', borderRadius: 10, padding: '0.7em 1em', fontSize: '1rem', transition: 'border 0.18s, box-shadow 0.18s', boxShadow: '0 1px 6px #B8D8DE22', fontWeight: 600 }}
                value={formData.last_name}
                onChange={e => setFormData(f => ({ ...f, last_name: e.target.value }))}
              />
            </div>
            <div className="field phone">
              <label style={{ color: '#1A3A4A', fontWeight: 800, fontSize: '1.08rem', marginBottom: 6, display: 'block', letterSpacing: '-0.01em' }}>
                PHONE NUMBER
                {(!phone || errors.phone) && <span style={{ color: '#E75480' }}>*</span>}
              </label>
              <div className="phone__inner">
                <select
                  name="dial_code"
                  defaultValue="+91"
                  aria-label="Country code"
                  style={{ background: '#E8F4F6', color: '#1A3A4A', border: '2px solid #2D6A7A', borderRadius: 10, padding: '0.7em 1em', fontSize: '1rem', transition: 'border 0.18s, box-shadow 0.18s', boxShadow: '0 1px 6px #B8D8DE22', fontWeight: 600 }}
                  value={formData.dial_code}
                  onChange={e => setFormData(f => ({ ...f, dial_code: e.target.value }))}
                >
                  <option value="+91">+91</option>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                  <option value="+61">+61</option>
                  <option value="+65">+65</option>
                  <option value="+49">+49</option>
                  <option value="+33">+33</option>
                  <option value="+31">+31</option>
                  <option value="+46">+46</option>
                  <option value="+81">+81</option>
                  <option value="+86">+86</option>
                  <option value="+82">+82</option>
                  <option value="+7">+7</option>
                  <option value="+39">+39</option>
                  <option value="+34">+34</option>
                  <option value="+351">+351</option>
                  <option value="+41">+41</option>
                  <option value="+43">+43</option>
                  <option value="+32">+32</option>
                  <option value="+420">+420</option>
                  <option value="+48">+48</option>
                  <option value="+358">+358</option>
                  <option value="+47">+47</option>
                  <option value="+45">+45</option>
                  <option value="+36">+36</option>
                  <option value="+386">+386</option>
                  <option value="+420">+420</option>
                  <option value="+421">+421</option>
                  <option value="+353">+353</option>
                  <option value="+380">+380</option>
                  <option value="+90">+90</option>
                  <option value="+971">+971</option>
                  <option value="+966">+966</option>
                  <option value="+62">+62</option>
                  <option value="+63">+63</option>
                  <option value="+60">+60</option>
                  <option value="+64">+64</option>
                  <option value="+27">+27</option>
                  <option value="+234">+234</option>
                  <option value="+254">+254</option>
                  <option value="+20">+20</option>
                  <option value="+55">+55</option>
                  <option value="+52">+52</option>
                  <option value="+54">+54</option>
                  <option value="+353">+353</option>
                  <option value="+380">+380</option>
                  <option value="+351">+351</option>
                  <option value="+386">+386</option>
                  <option value="+420">+420</option>
                  <option value="+421">+421</option>
                  {/* ...add more as needed */}
                </select>
                <input
                  required
                  name="phone"
                  placeholder=""
                  aria-invalid={!!errors.phone}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={10}
                  value={phone}
                  onChange={e => {
                    let digits = e.target.value.replace(/\D/g, '');
                    if (digits.length === 1 && digits === '0') return;
                    if (digits.length > 10) digits = digits.slice(0, 10);
                    setPhone(digits);
                    setFormData(f => ({ ...f, phone: digits }));
                    setErrors(prev => ({ ...prev, phone: undefined }));
                  }}
                  style={{ background: '#E8F4F6', color: '#0F2A36', border: '2px solid #2D6A7A', borderRadius: 10, padding: '0.7em 1em', fontSize: '1rem', transition: 'border 0.18s, box-shadow 0.18s', boxShadow: '0 1px 6px #B8D8DE22', fontWeight: 600 }}
                />
              </div>
              {errors.phone && <span className="field-error" role="alert" style={{ color: '#dc2626', fontWeight: 600 }}>{errors.phone}</span>}
            </div>
            <div className="field">
              <label style={{ color: '#1A3A4A', fontWeight: 800, fontSize: '1.08rem', marginBottom: 6, display: 'block', letterSpacing: '-0.01em' }}>
                EMAIL
                {(!formData.email || errors.email) && <span style={{ color: '#E75480' }}>*</span>}
              </label>
              <input
                required
                name="email"
                type="email"
                placeholder=""
                aria-invalid={!!errors.email}
                style={{ background: '#E8F4F6', color: '#0F2A36', border: '2px solid #2D6A7A', borderRadius: 10, padding: '0.7em 1em', fontSize: '1rem', transition: 'border 0.18s, box-shadow 0.18s', boxShadow: '0 1px 6px #B8D8DE22', fontWeight: 600 }}
                value={formData.email}
                onChange={e => setFormData(f => ({ ...f, email: e.target.value }))}
              />
              {errors.email && <span className="field-error" role="alert" style={{ color: '#dc2626', fontWeight: 600 }}>{errors.email}</span>}
            </div>
            <div className="field">
              <label style={{ color: '#1A3A4A', fontWeight: 800, fontSize: '1.08rem', marginBottom: 6, display: 'block', letterSpacing: '-0.01em' }}>
                Nationality
                {!formData.nationality && <span style={{ color: '#E75480' }}>*</span>}
              </label>
              <select
                required
                name="nationality"
                defaultValue="India"
                style={{ background: '#E8F4F6', color: '#1A3A4A', border: '2px solid #2D6A7A', borderRadius: 10, padding: '0.7em 1em', fontSize: '1rem', transition: 'border 0.18s, box-shadow 0.18s', boxShadow: '0 1px 6px #B8D8DE22', fontWeight: 600 }}
                value={formData.nationality}
                onChange={e => setFormData(f => ({ ...f, nationality: e.target.value }))}
              >
                <option value="India">India</option>
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Australia">Australia</option>
                <option value="Singapore">Singapore</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="Netherlands">Netherlands</option>
                <option value="Sweden">Sweden</option>
                <option value="Sweden">Sweden</option>
                <option value="Japan">Japan</option>
                <option value="China">China</option>
                <option value="South Korea">South Korea</option>
                <option value="Russia">Russia</option>
                <option value="Italy">Italy</option>
                <option value="Spain">Spain</option>
                <option value="Portugal">Portugal</option>
                <option value="Switzerland">Switzerland</option>
                <option value="Austria">Austria</option>
                <option value="Belgium">Belgium</option>
                <option value="Czech Republic">Czech Republic</option>
                <option value="Poland">Poland</option>
                <option value="Finland">Finland</option>
                <option value="Norway">Norway</option>
                <option value="Denmark">Denmark</option>
                <option value="Hungary">Hungary</option>
                <option value="Slovenia">Slovenia</option>
                <option value="Slovakia">Slovakia</option>
                <option value="Ireland">Ireland</option>
                <option value="Ukraine">Ukraine</option>
                <option value="Turkey">Turkey</option>
                <option value="UAE">UAE</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="Indonesia">Indonesia</option>
                <option value="Philippines">Philippines</option>
                <option value="Malaysia">Malaysia</option>
                <option value="New Zealand">New Zealand</option>
                <option value="South Africa">South Africa</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Kenya">Kenya</option>
                <option value="Egypt">Egypt</option>
                <option value="Brazil">Brazil</option>
                <option value="Mexico">Mexico</option>
                <option value="Argentina">Argentina</option>
              </select>
            </div>
            <div className="field" style={{ gridColumn: '1 / -1' }}>
              <label style={{ color: '#1A3A4A', fontWeight: 800, fontSize: '1.08rem', marginBottom: 6, display: 'block', letterSpacing: '-0.01em' }}>
                PREFERRED DESTINATION
                {!formData.preferred_destination && <span style={{ color: '#E75480' }}>*</span>}
              </label>
              <select
                required
                name="preferred_destination"
                defaultValue=""
                style={{
                  background: '#E8F4F6',
                  color: '#1A3A4A',
                  border: '2px solid #2D6A7A',
                  borderRadius: 10,
                  padding: '0.7em 1em',
                  fontSize: '1.05rem',
                  marginTop: 2,
                  width: '100%',
                  transition: 'border 0.18s, box-shadow 0.18s',
                  boxShadow: '0 1px 6px #B8D8DE22',
                  fontWeight: 600
                }}
                value={formData.preferred_destination}
                onChange={e => setFormData(f => ({ ...f, preferred_destination: e.target.value }))}
              >
                <option value="" disabled>Select destination</option>
                <option value="Australia">Australia</option>
                <option value="Canada">Canada</option>
                <option value="Germany">Germany</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Ireland">Ireland</option>
                <option value="Singapore">Singapore</option>
              </select>
            </div>
            <div className="field" style={{ gridColumn: '1 / -1' }}>
              <label style={{ color: '#1A3A4A', fontWeight: 800, fontSize: '1.08rem', marginBottom: 6, display: 'block', letterSpacing: '-0.01em' }}>
                PREFERRED STUDY LEVEL
                {!formData.preferred_study_level && <span style={{ color: '#E75480' }}>*</span>}
              </label>
              <select
                required
                name="preferred_study_level"
                defaultValue=""
                style={{
                  background: '#E8F4F6',
                  color: '#1A3A4A',
                  border: '2px solid #2D6A7A',
                  borderRadius: 10,
                  padding: '0.7em 1em',
                  fontSize: '1.05rem',
                  marginTop: 2,
                  width: '100%',
                  transition: 'border 0.18s, box-shadow 0.18s',
                  boxShadow: '0 1px 6px #B8D8DE22',
                  fontWeight: 600
                }}
                value={formData.preferred_study_level}
                onChange={e => setFormData(f => ({ ...f, preferred_study_level: e.target.value }))}
              >
                <option value="" disabled>Select study level</option>
                <option value="Graduation">Graduation</option>
                <option value="Post Graduation">Post Graduation</option>
                <option value="Research">Research</option>
              </select>
            </div>
            <div className="field" style={{ gridColumn: '1 / -1' }}>
              <label style={{ color: '#1A3A4A', fontWeight: 800, fontSize: '1.08rem', marginBottom: 6, display: 'block', letterSpacing: '-0.01em' }}>
                WHEN WOULD YOU LIKE TO START STUDYING?
                {!formData.preferred_start_date && <span style={{ color: '#E75480' }}>*</span>}
              </label>
              <input
                required
                name="preferred_start_date"
                type="date"
                min={minDate}
                style={{
                  background: '#E8F4F6',
                  color: '#1A3A4A',
                  border: '2px solid #2D6A7A',
                  borderRadius: 10,
                  padding: '0.7em 1em',
                  fontSize: '1.05rem',
                  marginTop: 2,
                  width: '100%',
                  transition: 'border 0.18s, box-shadow 0.18s',
                  boxShadow: '0 1px 6px #B8D8DE22',
                  fontWeight: 600,
                  fontFamily: 'inherit'
                }}
                value={formData.preferred_start_date}
                onChange={e => setFormData(f => ({ ...f, preferred_start_date: e.target.value }))}
              />
            </div>
          </div>
          {/* Divider */}
          <div style={{
            height: 1,
            background: 'linear-gradient(90deg,#B8D8DE 0%,#fff 100%)',
            opacity: 0.7,
            margin: '1.2rem 0 1.7rem 0',
            borderRadius: 2,
          }} />
          <div className="consultation__actions" style={{ display: 'flex', justifyContent: 'center', marginTop: '0' }}>
            <button
              className="btn btn-primary"
              disabled={status !== 'idle'}
              type="submit"
              style={{
                background: 'linear-gradient(90deg,#1A3A4A 0%,#2D6A7A 100%)',
                color: '#fff',
                borderRadius: 16,
                fontWeight: 800,
                fontSize: '1.13rem',
                padding: '.8rem 2.5rem',
                border: 'none',
                boxShadow: '0 2px 12px #2D6A7A33',
                cursor: status === 'idle' ? 'pointer' : 'not-allowed',
                transition: 'background 0.18s, box-shadow 0.18s, transform 0.18s',
                letterSpacing: '.01em',
              }}
              onMouseOver={e => {
                e.currentTarget.style.background = 'linear-gradient(90deg,#2D6A7A 0%,#1A3A4A 100%)';
                e.currentTarget.style.boxShadow = '0 4px 18px #2D6A7A44';
                e.currentTarget.style.transform = 'scale(1.04)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = 'linear-gradient(90deg,#1A3A4A 0%,#2D6A7A 100%)';
                e.currentTarget.style.boxShadow = '0 2px 12px #2D6A7A33';
                e.currentTarget.style.transform = '';
              }}
            >
              {status === 'submitting' ? 'Submitting...' : status === 'submitted' ? 'Submitted!' : 'Submit'}
            </button>
          </div>
          {status === 'submitted' && (
            <div style={{ textAlign: 'center', marginTop: '.7rem' }}>
              <span className="form-success" style={{ color: '#22c55e', fontWeight: 700 }}>Thanks! We will contact you soon.</span>
            </div>
          )}
        </form>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .contact-container {
            max-width: 98vw !important;
            padding: 0 0.5rem !important;
          }
          .consultation {
            padding: 1.2rem 0.5rem 1.5rem 0.5rem !important;
            border-radius: 1rem !important;
            box-shadow: 0 2px 8px #4A8A9A22, 0 1px 4px #D0E8EC11 !important;
          }
          .consultation__grid {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
        }
        @media (max-width: 600px) {
          .contact-container {
            max-width: 100vw !important;
            padding: 0 !important;
          }
          .consultation {
            padding: 0.7rem 0.9rem 1rem 0.9rem !important;
            border-radius: 0.7rem !important;
            box-shadow: 0 1px 4px #4A8A9A22, 0 1px 2px #D0E8EC11 !important;
          }
          .consultation__grid {
            grid-template-columns: 1fr !important;
            gap: 0.7rem !important;
          }
          .section__title {
            font-size: 1.35rem !important;
            padding: 0.1em 0 !important;
          }
        }
        /* Fix input overflow in grid for all screens */
        .consultation__grid > .field {
          min-width: 0;
        }
        .consultation__grid input,
        .consultation__grid select {
          width: 100%;
          min-width: 0;
          box-sizing: border-box;
        }
        
        /* Force background color for autofill */
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus, 
        input:-webkit-autofill:active {
            -webkit-box-shadow: 0 0 0 30px #E8F4F6 inset !important;
            -webkit-text-fill-color: #0F2A36 !important;
            transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>
    </section>
  );
};


