import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

type PaymentState = 'success' | 'failed' | 'cancelled' | 'processing' | 'unknown';

const BACKEND_BASE =
  (import.meta as any)?.env?.VITE_API_BASE_URL ||
  (window as any).__API_BASE__ ||
  'https://studconnect-backend.onrender.com';

const statusColor: Record<PaymentState, { bg: string; border: string; text: string }> = {
  success: { bg: '#ecfdf5', border: '#10b981', text: '#065f46' },
  failed: { bg: '#fef2f2', border: '#ef4444', text: '#991b1b' },
  cancelled: { bg: '#fff7ed', border: '#fb923c', text: '#9a3412' },
  processing: { bg: '#f0f9ff', border: '#0ea5e9', text: '#075985' },
  unknown: { bg: '#f3f4f6', border: '#6b7280', text: '#374151' }
};

const normalize = (raw?: string | null): PaymentState => {
  if (!raw) return 'processing';
  const v = raw.toLowerCase();
  if (['succeeded', 'success', 'completed', 'paid'].includes(v)) return 'success';
  if (['failed', 'error'].includes(v)) return 'failed';
  if (['canceled', 'cancelled'].includes(v)) return 'cancelled';
  if (['processing', 'pending'].includes(v)) return 'processing';
  return 'unknown';
};

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const [sp] = useSearchParams();

  const bookingId = sp.get('bookingId') || '';
  const paymentId = sp.get('payment_id') || sp.get('paymentId') || '';
  const rawStatus = sp.get('status');
  const [status, setStatus] = useState<PaymentState>(normalize(rawStatus));
  const [polling, setPolling] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [meetingLink, setMeetingLink] = useState<string | null>(null);
  const [pollError, setPollError] = useState<string | null>(null);
  const [timedOut, setTimedOut] = useState(false);

  const MAX_ATTEMPTS = 30; // ~2 minutes (30 * 4s)
  const POLL_INTERVAL_MS = 4000;

  useEffect(() => {
    if (!bookingId) return;

    let interval: number | undefined;
    let aborted = false;

    const poll = async () => {
      if (timedOut || status === 'failed' || (status === 'success' && meetingLink)) return;
      setPolling(true);
      setPollError(null);
      try {
        const url = `${BACKEND_BASE}/peer-counsellors/booking-status?booking_id=${encodeURIComponent(bookingId)}`;
        const resp = await fetch(url, { method: 'GET' });
        const txt = await resp.text();
        let data: any = {};
        try { data = txt ? JSON.parse(txt) : {}; } catch {}
        if (!resp.ok) {
          throw new Error(data?.detail || txt || `Status check failed (${resp.status})`);
        }

        const paymentStatus = (data.payment_status || '').toLowerCase();
        const link = data.meeting_link || null;

        if (paymentStatus) {
          if (['paid', 'success', 'succeeded', 'completed'].includes(paymentStatus)) {
            setStatus('success');
          } else if (['failed', 'error'].includes(paymentStatus)) {
            setStatus('failed');
          } else if (['pending', 'processing'].includes(paymentStatus)) {
            setStatus('processing');
          } else {
            setStatus('unknown');
          }
        }

        if (link) setMeetingLink(link);

        if (paymentStatus === 'paid' && link) {
          return;
        }

        if (paymentStatus === 'failed') {
          return;
        }

      } catch (e: any) {
        setPollError(e.message || 'Polling error');
      } finally {
        setPolling(false);
        setAttempts(a => {
          const next = a + 1;
            if (next >= MAX_ATTEMPTS && !meetingLink && status !== 'failed') {
            setTimedOut(true);
          }
          return next;
        });
      }
    };

    if (!(status === 'success' && meetingLink)) {
      poll();
      interval = window.setInterval(poll, POLL_INTERVAL_MS);
    }

    return () => {
      aborted = true;
      if (interval) clearInterval(interval);
    };
  }, [bookingId, status, meetingLink, timedOut]);

  const meta = statusColor[status];

  const icon = (() => {
    if (status === 'success' && meetingLink) return '✓';
    switch (status) {
      case 'success': return '⏳';
      case 'failed': return '✗';
      case 'cancelled': return '✗';
      case 'processing': return '…';
      default: return '?';
    }
  })();

  const titleMap: Record<PaymentState, string> = {
    success: meetingLink ? 'Payment Confirmed' : 'Payment Confirmed - Awaiting Link',
    failed: 'Payment Failed',
    cancelled: 'Payment Cancelled',
    processing: 'Payment Processing',
    unknown: 'Payment Status Unknown'
  };

  const descMap: Record<PaymentState, string> = {
    success: meetingLink
      ? 'Your session is confirmed. Use the meeting link below at the scheduled time.'
      : 'Your payment is complete. Waiting for counsellor to provide meeting link.'
    ,
    failed: 'Payment failed. You can retry below.',
    cancelled: 'You cancelled the payment. You can restart below.',
    processing: 'Waiting for payment confirmation...',
    unknown: 'Status unclear. You may retry or wait.'
  };

  const handleRetry = () => {
    if (!bookingId) return;
    navigate(`/services/peer-counselling-billing?bookingId=${encodeURIComponent(bookingId)}`);
  };

  const handleViewBooking = () => {
    if (!bookingId) return;
    navigate(`/student-bookings`);
  };

  const handleSupport = () => {
  window.location.href = "mailto:hello@yournextuniversity.com";
};

  const handleBookAnother = () => navigate('/services/peer-counselling');
  const manualRefresh = () => {
    setAttempts(0);
    setTimedOut(false);
    setPollError(null);
  };

  return (
    <main style={{ minHeight:'100vh',background:'#f9fafb',fontFamily:'Inter,system-ui,sans-serif',display:'flex',alignItems:'center',justifyContent:'center',padding:'2.5rem 1rem' }}>
      <div style={{ width:'100%',maxWidth:640,background:'#ffffff',border:'1px solid #e5e7eb',borderRadius:16,padding:'2.2rem 2.2rem 2.6rem',boxShadow:'0 4px 32px rgba(0,0,0,0.06)',position:'relative' }}>
        <div style={{ position:'absolute',top:-28,left:24,background:meta.bg,border:`2px solid ${meta.border}`,color:meta.text,fontSize:'1.9rem',width:64,height:64,borderRadius:16,display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 4px 20px rgba(0,0,0,0.08)',fontWeight:700 }}>
          {icon}
        </div>

        <h1 style={{ margin:'1.2rem 0 0.75rem',fontSize:'1.75rem',fontWeight:800,letterSpacing:'-0.5px',color:'#111827' }}>
          {titleMap[status]}
        </h1>

        <p style={{ margin:'0 0 1.4rem',fontSize:'.95rem',lineHeight:1.6,color:'#374151',fontWeight:500 }}>
          {descMap[status]}
        </p>

        <div style={{ background:meta.bg,border:`1px solid ${meta.border}`,color:meta.text,padding:'0.9rem 1rem',borderRadius:12,fontSize:'.75rem',fontWeight:600,lineHeight:1.5,marginBottom:'1.2rem',display:'grid',rowGap:'.4rem' }}>
          <div>Booking ID: {bookingId || 'N/A'}</div>
          <div>Payment ID: {paymentId || 'N/A'}</div>
          <div>Status: {status}{status==='success' && !meetingLink ? ' (awaiting link)' : ''}</div>
          <div>Attempts: {attempts}/{MAX_ATTEMPTS}</div>
          {polling && <div>Polling...</div>}
          {pollError && <div style={{ color:'#dc2626' }}>Poll error: {pollError}</div>}
          {timedOut && <div style={{ color:'#b45309' }}>Timed out waiting for confirmation.</div>}
          {meetingLink && (
            <div style={{ marginTop:'.4rem' }}>
              Meeting Link: <a href={meetingLink} target="_blank" rel="noopener noreferrer" style={{ color:'#2563eb',textDecoration:'underline' }}>Join Session</a>
            </div>
          )}
        </div>

        <div style={{ display:'flex',gap:'.75rem',flexWrap:'wrap',marginBottom:'1.5rem' }}>
          {(status === 'failed' || timedOut) && bookingId && (
            <button onClick={handleRetry} style={btn('#111827','#fff')}>Retry Payment</button>
          )}
          {status === 'success' && meetingLink && (
            <button onClick={handleViewBooking} style={btn('#10b981','#fff')}>View Booking</button>
          )}
          <button onClick={handleSupport} style={btn('#ffffff','#374151',true)}>Contact Support</button>
          <button onClick={handleBookAnother} style={btn('#f3f4f6','#111827',true)}>Book Another</button>
          {(status === 'processing' || (status==='success' && !meetingLink) || status==='unknown') && !timedOut && (
            <button onClick={manualRefresh} style={btn('#2563eb','#fff')}>Refresh</button>
          )}
        </div>

        {status === 'processing' && !timedOut && (
          <div style={{ fontSize:'.65rem',color:'#0c4a6e',background:'#f0f9ff',border:'1px dashed #38bdf8',padding:'.6rem .75rem',borderRadius:8,fontWeight:600 }}>
            Waiting for final confirmation. This page is auto-updating every {POLL_INTERVAL_MS/1000}s.
          </div>
        )}
        <div style={{ marginTop:'2rem',fontSize:'.6rem',lineHeight:1.4,color:'#6b7280',fontWeight:500 }}>
          If the status does not update after a few minutes, retry payment or contact support with Booking & Payment IDs.
        </div>
      </div>
    </main>
  );
};

function btn(bg:string, fg:string, outline?:boolean): React.CSSProperties {
  return {
    background:bg,
    color:fg,
    padding:'.7rem 1.2rem',
    borderRadius:8,
    border:outline?'1px solid #d1d5db':'none',
    fontSize:'.8rem',
    fontWeight:600,
    cursor:'pointer'
  };
}

export default PaymentSuccess;
