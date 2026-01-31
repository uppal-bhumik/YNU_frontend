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
      background: 'linear-gradient(135deg, #fff 0%, #D6C5F0 100%)',
      paddingTop: '140px', // Add space for fixed header
      paddingBottom: '140px' // Add space for bottom to prevent touching footer
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.98)',
        padding: '2.5rem 2rem',
        borderRadius: '1.5rem',
        boxShadow: '0 8px 32px #9F7AEA22, 0 2px 8px #D6C5F044',
        minWidth: 340,
        maxWidth: 400,
        width: '100%',
        border: '2px solid #D6C5F0'
      }}>
        <h2 style={{
          textAlign: 'center',
          marginBottom: '1.5rem',
          background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontWeight: 800
        }}>Forgot Password</h2>
        {step === 'request' && (
          <form onSubmit={requestOtp} className="auth-form">
            <input
              required
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            {error && <div className="auth-error">{error}</div>}
            {message && <div className="auth-success">{message}</div>}
            <button
              className="btn btn-primary"
              type="submit"
              style={{
                background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
                color: '#fff',
                borderRadius: 14,
                fontWeight: 700,
                border: 'none',
                boxShadow: '0 4px 16px #9F7AEA33, 0 1.5px 8px #5727A322',
                marginTop: 8,
                transition: 'background 0.2s, transform 0.2s'
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
            />
            <input
              required
              minLength={6}
              type="password"
              placeholder="New password (min 6 chars)"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />
            {error && <div className="auth-error">{error}</div>}
            {message && <div className="auth-success">{message}</div>}
            <button
              className="btn btn-primary"
              type="submit"
              style={{
                background: 'linear-gradient(90deg,#5727A3 0%,#9F7AEA 100%)',
                color: '#fff',
                borderRadius: 14,
                fontWeight: 700,
                border: 'none',
                boxShadow: '0 4px 16px #9F7AEA33, 0 1.5px 8px #5727A322',
                marginTop: 8,
                transition: 'background 0.2s, transform 0.2s'
              }}
            >
              Reset Password
            </button>
          </form>
        )}
        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: 14 }}>
          Remembered your password?{' '}
          <a href="/auth/login" style={{
            color: '#5727A3',
            textDecoration: 'underline',
            fontWeight: 600
          }}>Login</a>
        </div>
      </div>
    </div>
  );
};

export default AuthForgotPasswordPage;
