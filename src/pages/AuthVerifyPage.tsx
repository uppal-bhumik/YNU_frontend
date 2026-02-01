import React, { useState } from 'react';
import { useSearchParams, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthVerifyPage: React.FC = () => {
  const { verify, loading, user, pendingEmail } = useAuth();
  const [sp] = useSearchParams();
  const email = sp.get('email') || pendingEmail || '';
  const [code, setCode] = useState('');
  const [err, setErr] = useState<string | null>(null);

  if (!email) return <Navigate to="/auth/register" replace />;
  if (user) return <Navigate to="/" replace />;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    try {
      await verify(email, code);
    } catch (e: any) { setErr(e.message || 'Verification failed'); }
  }

  return (
    <main className="auth-layout">
      <div className="auth-card">
        <h1 style={{ color: '#0F2A36' }}>Email Verification</h1>
        <p className="auth-info" style={{ color: '#1A3A4A' }}>Enter the 6‑digit OTP sent to <strong>{email}</strong>.</p>
        <form onSubmit={submit} className="auth-form">
          <input
            required
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            placeholder="Enter OTP"
            value={code}
            onChange={e => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
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
          {err && <div className="auth-error">{err}</div>}
          <button
            className="btn btn-primary"
            disabled={loading || code.length !== 6}
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
            {loading ? 'Verifying...' : 'Verify & Continue'}
          </button>
        </form>
        <p className="auth-alt"><a href="/auth/register">Back to Register</a></p>
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
    </main>
  );
};

export default AuthVerifyPage;

