import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const API_BASE =
  (import.meta as any)?.env?.VITE_API_BASE_URL ||
  (window as any).__API_BASE__ ||
  'https://studconnect-backend.onrender.com';

interface Booking {
  booking_id: string | number;
  slot_date?: string;
  slot_day?: string;
  start_time?: string;
  end_time?: string;
  counsellor_email?: string;
  counsellor_name?: string;
  payment_status?: string;
  meeting_link?: string;
  charges?: number;
  created_at?: string;
  [key: string]: any;
}

const StudentBookings: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems, removeFromCart, loading: cartLoading } = useCart();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [bookingsError, setBookingsError] = useState<string | null>(null);

  // Fetch confirmed bookings
  useEffect(() => {
    const fetchBookings = async () => {
      if (!user || !user.id) {
        setBookingsLoading(false);
        return;
      }

      setBookingsLoading(true);
      setBookingsError(null);
      try {
        let token =
          (window.localStorage.getItem('sc_token')) ||
          (window.sessionStorage.getItem('sc_token')) ||
          ((window as any).user?.token) ||
          '';

        const params = new URLSearchParams();
        if (user.id) {
          // Convert UUID to string if needed
          params.append('user_id', user.id.toString());
        } else if (user.email) {
          params.append('user_email', user.email);
        }

        const resp = await fetch(`${API_BASE}/peer-counsellors/student-bookings?${params.toString()}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });

        if (!resp.ok) throw new Error('Failed to load bookings');

        const data = await resp.json();
        const paidBookings = Array.isArray(data)
          ? data.filter((b: any) => b.payment_status === 'paid')
          : [];
        setBookings(paidBookings);
      } catch (e: any) {
        setBookingsError(e.message || 'Error loading bookings');
      } finally {
        setBookingsLoading(false);
      }
    };
    fetchBookings();
  }, [user]);

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

  const handleRemoveFromCart = async (cartItemId: number) => {
    if (window.confirm('Remove this peer from your cart?')) {
      await removeFromCart(cartItemId);
    }
  };



  return (
    <main style={{ minHeight: '100vh', background: '#f9fafb', fontFamily: 'Inter,system-ui,sans-serif', padding: '2.2rem 1.2rem' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', marginTop: '2.5rem' }}>
        <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.5px', color: '#111827', marginBottom: '0.5rem' }}>
          My Bookings & Payments
        </h1>
        <div style={{ fontSize: '0.95rem', color: '#6b7280', fontWeight: 500, marginBottom: '2rem' }}>
          Manage your cart and view confirmed sessions
        </div>

        {/* ==================== MY CART SECTION ==================== */}
        <section style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 16, padding: '1.8rem', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
            <h2 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 700, color: '#111827' }}>
              🛒 My Cart
            </h2>
            {cartItems.length > 0 && (
              <span style={{ background: '#2D6A7A', color: '#fff', padding: '0.3rem 0.8rem', borderRadius: 20, fontSize: '0.85rem', fontWeight: 700 }}>
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
              </span>
            )}
          </div>

          {cartLoading && (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
              Loading cart...
            </div>
          )}

          {!cartLoading && cartItems.length === 0 && (
            <div style={{ padding: '3rem 2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.8rem' }}>🛒</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem' }}>
                Your cart is empty
              </div>
              <div style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '1.5rem' }}>
                Browse peer counselors to get started
              </div>
              <button
                onClick={() => navigate('/services/peer-counselling')}
                style={{
                  background: 'linear-gradient(90deg, #2D6A7A 0%, #3D7A8A 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 10,
                  padding: '0.8rem 1.8rem',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(45,106,122,0.3)'
                }}
              >
                Browse Peers
              </button>
            </div>
          )}

          {!cartLoading && cartItems.length > 0 && (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                {cartItems.map(item => (
                  <div
                    key={item.id}
                    style={{
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: 10,
                      padding: '1.2rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1.2rem'
                    }}
                  >
                    {item.peer_profile_image_url && (
                      <img
                        src={item.peer_profile_image_url}
                        alt={item.peer_name}
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: '2px solid #e5e7eb'
                        }}
                      />
                    )}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#111827', marginBottom: '0.3rem' }}>
                        {item.peer_name}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '0.2rem' }}>
                        {item.peer_university}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
                        {item.peer_program} • {item.peer_location}
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                      <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#2D6A7A' }}>
                        ₹{item.charges}
                      </div>
                      <div style={{ display: 'flex', gap: '0.8rem' }}>
                        <button
                          onClick={() => handleRemoveFromCart(item.id)}
                          style={{
                            background: 'transparent',
                            border: '1px solid #ef4444',
                            color: '#ef4444',
                            borderRadius: 8,
                            padding: '0.5rem 1rem',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                        >
                          Remove
                        </button>
                        <button
                          onClick={() => navigate(`/services/peer-counselling?peerId=${item.peer_id}`)}
                          style={{
                            background: 'linear-gradient(90deg, #2D6A7A 0%, #3D7A8A 100%)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 8,
                            padding: '0.5rem 1.2rem',
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            boxShadow: '0 2px 8px rgba(45,106,122,0.3)'
                          }}
                        >
                          Book Session
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                borderTop: '1px solid #e5e7eb',
                paddingTop: '1.2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '0.3rem' }}>
                    Cart Total
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827' }}>
                    ₹{cartItems.reduce((sum, item) => sum + item.charges, 0)}
                  </div>
                </div>
                <div style={{ fontSize: '0.85rem', color: '#6b7280', fontStyle: 'italic' }}>
                  Select a peer above to complete booking
                </div>
              </div>
            </>
          )}
        </section>

        {/* ==================== CONFIRMED BOOKINGS SECTION ==================== */}
        <section style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 16, padding: '1.8rem', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
          <h2 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 700, color: '#111827', marginBottom: '1.2rem' }}>
            ✅ My Confirmed Bookings
          </h2>

          {bookingsLoading && (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
              Loading bookings...
            </div>
          )}

          {bookingsError && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '1rem', borderRadius: 8, fontSize: '0.9rem', fontWeight: 600 }}>
              {bookingsError}
            </div>
          )}

          {!bookingsLoading && !bookingsError && bookings.length === 0 && (
            <div style={{ padding: '3rem 2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.8rem' }}>📅</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem' }}>
                You haven't booked any sessions yet
              </div>
              <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                Complete checkout to confirm your bookings
              </div>
            </div>
          )}

          {!bookingsLoading && !bookingsError && bookings.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {bookings.map(b => (
                <div
                  key={b.booking_id}
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: 10,
                    padding: '1.2rem 1.3rem'
                  }}
                >
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#111827', marginBottom: '0.8rem' }}>
                    {formatDate(b.slot_date)}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', fontSize: '0.92rem', color: '#374151', marginBottom: '0.8rem' }}>
                    <div>
                      <span style={{ fontWeight: 600, color: '#6b7280' }}>Counsellor: </span>
                      {b.counsellor_name || b.counsellor_email || '—'}
                    </div>
                    <div>
                      <span style={{ fontWeight: 600, color: '#6b7280' }}>Charges: </span>
                      {b.charges ? `₹${b.charges}` : '₹699'}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '0.5rem' }}>
                    <div>
                      <span style={{ fontWeight: 600, color: '#6b7280' }}>Payment: </span>
                      <span style={{
                        display: 'inline-block', padding: '0.25rem 0.6rem', borderRadius: 6, fontSize: '0.8rem', fontWeight: 700,
                        background: '#ecfdf5',
                        color: '#065f46'
                      }}>
                        Paid
                      </span>
                    </div>
                    <div>
                      <span style={{ fontWeight: 600, color: '#6b7280' }}>Meeting Link: </span>
                      {b.meeting_link ? (
                        <a href={b.meeting_link} target="_blank" rel="noopener noreferrer" style={{ color: '#2D6A7A', fontWeight: 600 }}>Join</a>
                      ) : (
                        <span style={{ color: '#6b7280' }}>Not available yet</span>
                      )}
                    </div>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
                    Booked on {formatDate(b.created_at)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <div style={{ marginTop: '2rem', fontSize: '0.85rem', color: '#6b7280', textAlign: 'center' }}>
          Questions? <a href="mailto:hello@yournextuniversity.com" style={{ color: '#2D6A7A', textDecoration: 'underline', fontWeight: 600 }}>Contact support</a>
        </div>
      </div>
    </main>
  );
};

export default StudentBookings;
