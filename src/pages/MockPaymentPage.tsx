import React, { useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const MockPaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);

  const bookingId = params.get('booking_id') || '';
  const amount = params.get('amount') || '0';
  const email = params.get('email') || '';
  const name = params.get('name') || '';

  const [isPaying, setIsPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Decide backend base (Vite env fallback)
  const API_BASE =
    (import.meta as any)?.env?.VITE_API_BASE_URL ||
    (window as any).__API_BASE__ ||
    'https://studconnect-backend.onrender.com';

  const handlePay = async () => {
    setError(null);
    if (!bookingId) {
      setError('Missing booking ID.');
      return;
    }
    setIsPaying(true);
    try {
      const res = await fetch(`${API_BASE}/api/mock-payment-success`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ booking_id: bookingId })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.detail || `Payment failed (${res.status})`);
      }
      // Navigate to success page
      navigate(`/payment-success?bookingId=${encodeURIComponent(bookingId)}`);
    } catch (e: any) {
      setError(e.message || 'Payment failed. Please try again.');
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#f9fafb',
        fontFamily: 'Inter, system-ui, sans-serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 520,
          background: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: 12,
          padding: '2rem 2rem 2.2rem',
          boxShadow: '0 4px 24px rgba(0,0,0,0.04)'
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#111827',
            letterSpacing: '-0.5px'
          }}
        >
          Mock Payment
        </h1>
        <p style={{ margin: '0.75rem 0 1.25rem', color: '#6b7280', fontSize: '.95rem', lineHeight: 1.5 }}>
          This is a test payment screen simulating the external checkout.
        </p>

        <div
          style={{
            background: '#f8fafc',
            border: '1px solid #e5e7eb',
            borderRadius: 10,
            padding: '1rem 1rem 0.85rem',
            marginBottom: '1.4rem'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.6rem' }}>
            <span style={{ fontSize: '.85rem', color: '#6b7280', fontWeight: 500 }}>Booking ID</span>
            <span style={{ fontSize: '.85rem', color: '#111827', fontWeight: 600 }}>{bookingId || '—'}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.6rem' }}>
            <span style={{ fontSize: '.85rem', color: '#6b7280', fontWeight: 500 }}>Customer</span>
            <span style={{ fontSize: '.85rem', color: '#111827', fontWeight: 600 }}>{name || '—'}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.6rem' }}>
            <span style={{ fontSize: '.85rem', color: '#6b7280', fontWeight: 500 }}>Email</span>
            <span style={{ fontSize: '.85rem', color: '#111827', fontWeight: 600, wordBreak: 'break-all' }}>
              {email || '—'}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '.4rem', paddingTop: '.65rem', borderTop: '1px solid #e5e7eb' }}>
            <span style={{ fontSize: '.9rem', color: '#111827', fontWeight: 600 }}>Amount</span>
            <span style={{ fontSize: '1.05rem', color: '#111827', fontWeight: 700 }}>₹{Number(amount).toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={handlePay}
          disabled={isPaying}
          style={{
            width: '100%',
            background: isPaying ? '#6b7280' : '#111827',
            color: '#fff',
            border: 'none',
            padding: '0.85rem 1.1rem',
            fontSize: '.95rem',
            fontWeight: 600,
            borderRadius: 8,
            cursor: isPaying ? 'not-allowed' : 'pointer',
            transition: 'background .15s',
            marginBottom: '.85rem'
          }}
        >
          {isPaying ? 'Processing...' : `Pay ₹${Number(amount).toFixed(2)}`}
        </button>

        {error && (
          <div
            style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#b91c1c',
              fontSize: '.75rem',
              padding: '.6rem .7rem',
              borderRadius: 6,
              marginBottom: '.9rem',
              lineHeight: 1.3
            }}
          >
            {error}
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '.75rem' }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              flex: 1,
              background: '#f3f4f6',
              color: '#374151',
              border: '1px solid #e5e7eb',
              padding: '.7rem .9rem',
              fontSize: '.8rem',
              fontWeight: 600,
              borderRadius: 8,
              cursor: 'pointer'
            }}
          >
            Go Back
          </button>
          <button
            onClick={() => navigate('/payment-success' + (bookingId ? `?bookingId=${bookingId}` : ''))}
            style={{
              flex: 1,
              background: '#fff',
              color: '#111827',
              border: '1px solid #e5e7eb',
              padding: '.7rem .9rem',
              fontSize: '.8rem',
              fontWeight: 600,
              borderRadius: 8,
              cursor: 'pointer'
            }}
          >
            Skip (Success)
          </button>
        </div>

        <div
          style={{
            marginTop: '1.4rem',
            fontSize: '.65rem',
            color: '#6b7280',
            lineHeight: 1.4,
            textAlign: 'center'
          }}
        >
          This mock screen simulates external payment. In production you will be redirected to the real payment provider.
        </div>
      </div>
    </main>
  );
};

export default MockPaymentPage;
