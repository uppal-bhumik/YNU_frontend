import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';

const AuthRegisterPage: React.FC = () => {
  const { register, loading, pendingEmail, user } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', full_name: '', role: 'student' });
  const [err, setErr] = useState<string | null>(null);

  if (user) return <Navigate to="/" replace />;
  if (pendingEmail) return <Navigate to={`/auth/verify?email=${encodeURIComponent(pendingEmail)}`} replace />;


  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    try {
      await register(form.email, form.password, form.role as any, form.full_name);
      nav(`/auth/verify?email=${encodeURIComponent(form.email)}`);
    } catch (e: any) { setErr(e.message || 'Registration failed'); }
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
        }}>Register</h2>
        <form onSubmit={submit} className="auth-form">
          <input
            required
            placeholder="Full name"
            value={form.full_name}
            onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))}
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
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
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
            placeholder="Password (min 6 chars)"
            value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
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
          <select
            value={form.role}
            onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
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
              marginBottom: '0.5rem',
              boxSizing: 'border-box'
            }}
          >
            <option value="student">Student</option>
            <option value="counsellor">Counsellor</option>
          </select>
          {err && <div className="auth-error">{err}</div>}
          <button
            className="btn btn-primary"
            disabled={loading}
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
            {loading ? 'Please wait...' : 'Register'}
          </button>
        </form>
        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: 14 }}>
          Already have an account?{' '}
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

export default AuthRegisterPage;


