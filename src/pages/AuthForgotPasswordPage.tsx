import React, { useState } from 'react';

// const BASE_URL = 'http://127.0.0.1:8000';
const BASE_URL = 'https://studconnect-backend.onrender.com';

const AuthForgotPasswordPage: React.FC = () => {
  const [step, setStep] = useState<'request' | 'reset'>('request');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function requestOtp(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    try {
      const res = await fetch(`${BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error((await res.json()).detail || 'Failed to send OTP');
      setMessage('OTP sent to your email.');
      setStep('reset');
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function resetPassword(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    try {
      const res = await fetch(`${BASE_URL}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: otp, new_password: newPassword }),
      });
      if (!res.ok) throw new Error((await res.json()).detail || 'Failed to reset password');
      setMessage('Password reset successful. You can now log in.');
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0F172A 0%, #1A3A4A 100%)', // Dark Graphite
      paddingTop: '120px',
      paddingBottom: '120px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Decor */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 50% 0%, rgba(45, 106, 122, 0.15), transparent 70%)',
        zIndex: 0
      }} />

      <div style={{
        position: 'relative',
        zIndex: 1,
        background: '#ffffff',
        padding: '2.5rem 2rem',
        borderRadius: '24px',
        boxShadow: '0 20px 60px -10px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.05)',
        minWidth: 340,
        maxWidth: 400,
        width: '100%',
      }}>
        <h2 style={{
          textAlign: 'center',
          marginBottom: '1.5rem',
          color: '#0F172A',
          fontWeight: 800,
          fontSize: '2rem',
          letterSpacing: '-0.5px'
        }}>Forgot Password</h2>
        {step === 'request' && (
          <form onSubmit={requestOtp} className="auth-form">
            <input
              required
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                background: '#E8F4F6',
                color: '#0F2A36',
                border: '2px solid #2D6A7A',
                borderRadius: 10,
                padding: '0.7em 1em',
                fontSize: '1rem',
                transition: 'border 0.18s, box-shadow 0.18s',
                boxShadow: '0 1px 6px #B8D8DE22',
                fontWeight: 600,
                width: '100%',
                marginBottom: '1rem',
                boxSizing: 'border-box'
              }}
            />
            {error && <div className="auth-error">{error}</div>}
            {message && <div className="auth-success">{message}</div>}
            <button
              className="btn btn-primary"
              type="submit"
              style={{
                background: 'linear-gradient(90deg,#1A3A4A 0%,#4A8A9A 100%)',
                color: '#fff',
                borderRadius: 14,
                fontWeight: 700,
                border: 'none',
                boxShadow: '0 4px 16px #4A8A9A33, 0 1.5px 8px #1A3A4A22',
                marginTop: 8,
                transition: 'background 0.2s, transform 0.2s',
                width: '100%',
                padding: '0.8rem'
              }}
            >
              Send OTP
            </button>
          </form>
        )}
        {step === 'reset' && (
          <form onSubmit={resetPassword} className="auth-form">
            <input
              required
              placeholder="Enter OTP"
              value={otp}
              onChange={e => setOtp(e.target.value)}
              style={{
                background: '#E8F4F6',
                color: '#0F2A36',
                border: '2px solid #2D6A7A',
                borderRadius: 10,
                padding: '0.7em 1em',
                fontSize: '1rem',
                transition: 'border 0.18s, box-shadow 0.18s',
                boxShadow: '0 1px 6px #B8D8DE22',
                fontWeight: 600,
                width: '100%',
                marginBottom: '1rem',
                boxSizing: 'border-box'
              }}
            />
            <input
              required
              minLength={6}
              type="password"
              placeholder="New password (min 6 chars)"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              style={{
                background: '#E8F4F6',
                color: '#0F2A36',
                border: '2px solid #2D6A7A',
                borderRadius: 10,
                padding: '0.7em 1em',
                fontSize: '1rem',
                transition: 'border 0.18s, box-shadow 0.18s',
                boxShadow: '0 1px 6px #B8D8DE22',
                fontWeight: 600,
                width: '100%',
                marginBottom: '1rem',
                boxSizing: 'border-box'
              }}
            />
            {error && <div className="auth-error">{error}</div>}
            {message && <div className="auth-success">{message}</div>}
            <button
              className="btn btn-primary"
              type="submit"
              style={{
                background: 'linear-gradient(90deg,#1A3A4A 0%,#4A8A9A 100%)',
                color: '#fff',
                borderRadius: 14,
                fontWeight: 700,
                border: 'none',
                boxShadow: '0 4px 16px #4A8A9A33, 0 1.5px 8px #1A3A4A22',
                marginTop: 8,
                transition: 'background 0.2s, transform 0.2s',
                width: '100%',
                padding: '0.8rem'
              }}
            >
              Reset Password
            </button>
          </form>
        )}
        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: 14 }}>
          Remembered your password?{' '}
          <a href="/auth/login" style={{
            color: '#1A3A4A',
            textDecoration: 'underline',
            fontWeight: 600
          }}>Login</a>
        </div>
      </div>
      <style>{`
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
    </div>
  );
};

export default AuthForgotPasswordPage;


