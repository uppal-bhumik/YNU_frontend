import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

declare global {
  interface Window {
    google: any;
  }
}

interface ImportMetaEnv {
  readonly VITE_GOOGLE_CLIENT_ID?: string;
  readonly VITE_GOOGLE_OAUTH_CLIENT_ID?: string;
}



const AuthLoginPage: React.FC = () => {
  const { login, loading, user } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [err, setErr] = useState<string | null>(null);

  // --- Google One Tap: Load script if not present ---
  useEffect(() => {
    if (!window.google || !window.google.accounts || !window.google.accounts.id) {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  if (user) return <Navigate to="/" replace />;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    try {
      await login(form.email, form.password);
    } catch (e: any) {
      setErr(e.message || 'Login failed');
    }
  }

  // --- Google Auth Handler ---
  async function handleGoogleLogin() {
    const GOOGLE_CLIENT_ID =
      (import.meta as any).env.VITE_GOOGLE_CLIENT_ID ||
      (import.meta as any).env.VITE_GOOGLE_OAUTH_CLIENT_ID;
    if (!GOOGLE_CLIENT_ID) {
      alert("Google Client ID is not set. Please check your .env file and restart the dev server.");
      return;
    }
    // Wait for the script to be loaded
    function waitForGoogleScript(retries = 10) {
      return new Promise<void>((resolve, reject) => {
        if (
          typeof window !== "undefined" &&
          window.google &&
          window.google.accounts &&
          window.google.accounts.id
        ) {
          resolve();
        } else if (retries > 0) {
          setTimeout(() => resolve(waitForGoogleScript(retries - 1)), 300);
        } else {
          reject();
        }
      });
    }
    try {
      await waitForGoogleScript();
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: async (response: any) => {
          if (response.credential) {
            // Send the token to backend
            const API_BASE = (import.meta as any).env.VITE_API_BASE_URL || 'https://ynu-backend.onrender.com';
            const res = await fetch(`${API_BASE}/api/auth/google`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ token: response.credential })
            });
            if (res.ok) {
              const data = await res.json();
              // Save access token in localStorage
              if (data.access_token) {
                localStorage.setItem('access_token', data.access_token);
              }
              // Save user info if present
              if (data.user) {
                localStorage.setItem('user', JSON.stringify(data.user));
              }
              if (typeof window !== "undefined") {
                window.location.href = "/";
              }
            } else {
              const msg = await res.text();
              alert('Google login failed: ' + msg);
            }
          }
        }
      });
      window.google.accounts.id.prompt();
    } catch {
      alert(
        "Google login is not available. Please ensure you have included the Google Identity script in your index.html:\n\n<script src=\"https://accounts.google.com/gsi/client\" async defer></script>"
      );
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
        }}>Login</h2>
        {/* OAuth Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', marginBottom: '1.2rem' }}>
          <button
            type="button"
            style={{
              background: '#fff',
              color: '#0F2A36',
              border: '2px solid #2D6A7A',
              borderRadius: 10,
              fontWeight: 700,
              fontSize: '1.07rem',
              padding: '0.7rem 0',
              boxShadow: '0 2px 8px #4A8A9A11',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              transition: 'background 0.18s'
            }}
            onClick={handleGoogleLogin}
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              style={{
                width: '20px',
                height: '20px',
                objectFit: 'contain'
              }}
            />
            Continue with Google
          </button>
        </div>
        {/* Divider */}
        <div style={{
          textAlign: 'center',
          margin: '1.2rem 0 1.2rem 0',
          color: '#4A8A9A',
          fontWeight: 600,
          fontSize: '1rem'
        }}>
          or
        </div>
        <form onSubmit={submit} className="auth-form">
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
            type="password"
            placeholder="Password"
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
              marginBottom: '0.5rem',
              boxSizing: 'border-box'
            }}
          />
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
            {loading ? 'Please wait...' : 'Login'}
          </button>
        </form>
        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: 14 }}>
          Don't have an account?{' '}
          <a href="/auth/register" style={{
            color: '#1A3A4A',
            textDecoration: 'underline',
            fontWeight: 600
          }}>Sign up</a>
          <div style={{ marginTop: 8 }}>
            <a href="/auth/forgot-password" style={{
              color: '#4A8A9A',
              textDecoration: 'underline',
              fontWeight: 600
            }}>Forgot password?</a>
          </div>
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

export default AuthLoginPage;


