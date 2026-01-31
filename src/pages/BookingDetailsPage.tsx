import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API_BASE =
  (import.meta as any)?.env?.VITE_API_BASE_URL ||
  (window as any).__API_BASE__ ||
  'https://studconnect-backend.onrender.com';

interface BookingData {
  id?: number | string;
  slot_date?: string;
  counsellor_email?: string;
  user_email?: string;
  payment_status?: string;
  meeting_link?: string;
  [key: string]: any;
}
interface DodoConfig {
  dodo_api_key_configured?: boolean;
  dodo_api_key_length?: number;
  dodo_api_key_preview?: string;
  frontend_url?: string;
  backend_url?: string;
  correct_endpoint?: string;
  actual_product_id?: string;
  webhook_url?: string;
  setup_status?: string[];
  environment_variables_needed?: string[];
  api_documentation?: string;
  [k: string]: any;
}

const BookingDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [apiConfig, setApiConfig] = useState<DodoConfig | null>(null);
  const [apiConfigError, setApiConfigError] = useState<string | null>(null);
  const [showConfig, setShowConfig] = useState(false);

  useEffect(() => {
    if (!id) {
      setError('No booking ID provided');
      setLoading(false);
      return;
    }
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const bookingData = await fetchJSONWithFallback([
          // Ordered by likelihood
          `${API_BASE}/peer-counsellor-bookings/${id}`,
          `${API_BASE}/api/peer-counsellor-bookings/${id}`,
          `${API_BASE}/bookings/${id}`
        ]);
        setBooking(bookingData);
      } catch (e: any) {
        if (String(e.message).startsWith('404')) {
          setError('Booking not found (404). It may have been deleted or the ID is incorrect.');
        } else {
          setError(e.message || 'Error loading booking');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    let aborted = false;
    const loadConfig = async () => {
      try {
        const cfg = await fetchJSONWithFallback([
          `${API_BASE}/debug/dodo-config`,
          `${API_BASE}/api/debug/dodo-config`,
          `${API_BASE}/config/dodo`
        ]);
        if (!aborted) setApiConfig(cfg);
      } catch (e: any) {
        if (!aborted) {
          if (String(e.message).startsWith('404')) {
            setApiConfigError('Config endpoint not found (404). Backend may not expose /debug/dodo-config in this environment.');
          } else {
            setApiConfigError(e.message || 'Config fetch error');
          }
        }
      }
    };
    loadConfig();
    return () => { aborted = true; };
  }, []);

  const formatDate = (d?: string) => {
    if (!d) return '—';
    const dt = new Date(d);
    if (isNaN(dt.getTime())) return d;
    return dt.toLocaleString(undefined, {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // FIX: unified booking id for actions (prevents ReferenceError)
  const bookingIdForActions = (booking?.id ?? id) ? String(booking?.id ?? id) : '';

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#f9fafb',
        fontFamily: 'Inter, system-ui, sans-serif',
        padding: '2.2rem 1.2rem',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 720,
          background: '#fff',
          border: '1px solid #e5e7eb',
          borderRadius: 16,
          padding: '2rem 2rem 2.4rem',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)'
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: '1.6rem',
            fontWeight: 800,
            letterSpacing: '-0.5px',
            color: '#111827'
          }}
        >
            Booking Details
        </h1>
        <div style={{ marginTop: '.6rem', fontSize: '.75rem', color: '#6b7280', fontWeight: 600 }}>
          ID: {id || '—'}
        </div>

        {loading && (
          <div style={{ marginTop: '1.5rem', fontSize: '.85rem', color: '#374151' }}>Loading...</div>
        )}

        {error && (
          <div
            style={{
              marginTop: '1.5rem',
              background: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#b91c1c',
              padding: '.8rem .95rem',
              borderRadius: 8,
              fontSize: '.75rem',
              fontWeight: 600,
              lineHeight: 1.4
            }}
          >
            {error}
          </div>
        )}

        {!loading && !error && booking && (
          <div
            style={{
              marginTop: '1.4rem',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem'
            }}
          >
            <Card label="Student Email" value={booking.user_email || '—'} />
            <Card label="Counsellor Email" value={booking.counsellor_email || '—'} />
            <Card label="Slot Date" value={formatDate(booking.slot_date)} />
            <Card
              label="Payment Status"
              value={
                <span
                  style={{
                    display: 'inline-block',
                    padding: '.25rem .6rem',
                    borderRadius: 6,
                    fontSize: '.65rem',
                    fontWeight: 700,
                    background: badgeBg(booking.payment_status),
                    color: badgeColor(booking.payment_status)
                  }}
                >
                  {booking.payment_status || '—'}
                </span>
              }
            />
            <Card
              label="Meeting Link"
              value={
                booking.meeting_link ? (
                  <a
                    href={booking.meeting_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#2563eb', fontWeight: 600, wordBreak: 'break-all' }}
                  >
                    Join
                  </a>
                ) : (
                  'Not available'
                )
              }
            />
            <Card label="Raw ID" value={String(booking.id || id)} />
            <FullWidthArea title="Raw JSON">
              <pre
                style={{
                  margin: 0,
                  fontSize: '.65rem',
                  lineHeight: 1.4,
                  background: '#f8fafc',
                  padding: '.75rem .9rem',
                  borderRadius: 8,
                  border: '1px solid #e2e8f0',
                  overflowX: 'auto'
                }}
              >
                {JSON.stringify(booking, null, 2)}
              </pre>
            </FullWidthArea>
          </div>
        )}

        {booking && (
          <div style={{ marginTop:'1.4rem' }}>
            <button
              onClick={() => setShowConfig(s => !s)}
              style={{
                background:'#111827',
                color:'#fff',
                padding:'.55rem .85rem',
                borderRadius:8,
                border:'none',
                fontSize:'.65rem',
                fontWeight:600,
                cursor:'pointer'
              }}
            >
              {showConfig ? 'Hide Payment Integration Info' : 'Show Payment Integration Info'}
            </button>
            {showConfig && (
              <div style={{ marginTop:'.8rem',background:'#f8fafc',border:'1px solid #e2e8f0',borderRadius:10,padding:'0.9rem 1rem' }}>
                {!apiConfig && !apiConfigError && (
                  <div style={{ fontSize:'.65rem',fontWeight:600,color:'#374151' }}>Loading integration data...</div>
                )}
                {apiConfigError && (
                  <div style={{ fontSize:'.65rem',fontWeight:600,color:'#b91c1c' }}>{apiConfigError}</div>
                )}
                {apiConfig && (
                  <div style={{ display:'grid',gap:'.55rem',fontSize:'.62rem',lineHeight:1.4 }}>
                    <div><strong>API Key Configured:</strong> {apiConfig.dodo_api_key_configured ? 'Yes' : 'No'}</div>
                    <div><strong>API Key Preview:</strong> {apiConfig.dodo_api_key_preview}</div>
                    <div><strong>Frontend URL:</strong> {apiConfig.frontend_url}</div>
                    <div><strong>Backend URL:</strong> {apiConfig.backend_url}</div>
                    <div><strong>Checkout Endpoint:</strong> {apiConfig.correct_endpoint}</div>
                    <div><strong>Product ID:</strong> {apiConfig.actual_product_id}</div>
                    <div><strong>Webhook URL:</strong> {apiConfig.webhook_url}</div>
                    {apiConfig.setup_status && (
                      <div>
                        <strong>Setup Status:</strong>
                        <ul style={{ margin:'.3rem 0 0',paddingLeft:'1rem' }}>
                          {apiConfig.setup_status.map(s => <li key={s}>{s}</li>)}
                        </ul>
                      </div>
                    )}
                    {apiConfig.environment_variables_needed && (
                      <div>
                        <strong>Env Vars Needed:</strong>
                        <ul style={{ margin:'.3rem 0 0',paddingLeft:'1rem' }}>
                          {apiConfig.environment_variables_needed.map(s => <li key={s}>{s}</li>)}
                        </ul>
                      </div>
                    )}
                    {apiConfig.api_documentation && (
                      <div>
                        <strong>Docs:</strong>{' '}
                        <a href={apiConfig.api_documentation} target="_blank" rel="noopener noreferrer" style={{ color:'#2563eb',fontWeight:600 }}>Reference</a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div
          style={{
            marginTop: '2rem',
            display: 'flex',
            gap: '.75rem',
            flexWrap: 'wrap'
          }}
        >
          <button
            onClick={() => navigate('/services/peer-counselling')}
            style={btnStyle('#111827', '#fff')}
          >
            New Booking
          </button>
          {bookingIdForActions && (
            <button
              onClick={() =>
                navigate(`/services/peer-counselling-billing?bookingId=${encodeURIComponent(bookingIdForActions)}`)
              }
              style={btnStyle('#f3f4f6', '#111827', true)}
            >
              Retry Payment
            </button>
          )}
          <button
            onClick={() => navigate('/student')}
            style={btnStyle('#fff', '#374151', true)}
          >
            Dashboard
          </button>
        </div>

        <div
          style={{
            marginTop: '1.8rem',
            fontSize: '.6rem',
            color: '#6b7280',
            lineHeight: 1.4
          }}
        >
          If any details seem incorrect, please contact support mentioning the booking ID above.
        </div>
      </div>
    </main>
  );
};

// Reusable small card
const Card: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div
    style={{
      background: '#f8fafc',
      border: '1px solid #e2e8f0',
      borderRadius: 10,
      padding: '.75rem .9rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '.35rem',
      minHeight: 78
    }}
  >
    <div style={{ fontSize: '.65rem', fontWeight: 700, letterSpacing: '.5px', color: '#6b7280' }}>{label}</div>
    <div style={{ fontSize: '.75rem', fontWeight: 600, color: '#111827', wordBreak: 'break-word' }}>{value}</div>
  </div>
);

const FullWidthArea: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div
    style={{
      gridColumn: '1 / -1',
      background: '#fff',
      border: '1px solid #e2e8f0',
      borderRadius: 10,
      padding: '.9rem .95rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '.55rem'
    }}
  >
    <div style={{ fontSize: '.65rem', fontWeight: 700, letterSpacing: '.5px', color: '#6b7280' }}>{title}</div>
    {children}
  </div>
);

// Helper: try a list of endpoints, return first successful JSON or throw last error
async function fetchJSONWithFallback(possible: string[], init?: RequestInit) {
  let lastErr: any = null;
  for (const u of possible) {
    try {
      const r = await fetch(u, init);
      if (r.ok) return await r.json();
      // capture structured 404
      const text = await r.text();
      if (r.status === 404) {
        throw new Error('404: Not Found');
      }
      throw new Error(text || `Request failed (${r.status})`);
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr || new Error('All endpoints failed');
}

function badgeBg(status?: string) {
  if (!status) return '#f3f4f6';
  const s = status.toLowerCase();
  if (s === 'paid' || s === 'success') return '#ecfdf5';
  if (s === 'failed') return '#fef2f2';
  if (s === 'pending' || s === 'processing') return '#f0f9ff';
  return '#f3f4f6';
}

function badgeColor(status?: string) {
  if (!status) return '#374151';
  const s = status.toLowerCase();
  if (s === 'paid' || s === 'success') return '#065f46';
  if (s === 'failed') return '#991b1b';
  if (s === 'pending' || s === 'processing') return '#075985';
  return '#374151';
}

function btnStyle(bg: string, fg: string, outline?: boolean): React.CSSProperties {
  return {
    background: bg,
    color: fg,
    padding: '.7rem 1.15rem',
    borderRadius: 8,
    border: outline ? '1px solid #d1d5db' : 'none',
    fontSize: '.7rem',
    fontWeight: 600,
    cursor: 'pointer'
  };
}

export default BookingDetailsPage;
