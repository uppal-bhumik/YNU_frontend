import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

const PeerCounsellingBillingPage = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  // Billing form state
  const [fullName, setFullName] = useState(user?.full_name || ''); // updated to use user
  const [email, setEmail] = useState(user?.email || ''); // updated to use user
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('US');
  const [country, setCountry] = useState('United States');
  const [address, setAddress] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [business, setBusiness] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [envWarning, setEnvWarning] = useState<string | null>(null);

  const priceINR = 699;
  const usdRate = 88.7;
  const taxINR = 0;
  const subtotalINR = priceINR;
  const totalINR = priceINR - (discountApplied ? 50 : 0);
  const totalUSD = (totalINR / usdRate).toFixed(2);

  // Derive bookingId & charges if passed in state or URL
  const stateBookingId = (location.state && (location.state as any).bookingId) || null;
  const params = new URLSearchParams(location.search);
  const queryBookingId = params.get('bookingId');
  const bookingId = stateBookingId || queryBookingId || null;
  const passedAmount = (location.state && (location.state as any).amount) || params.get('amount');
  // Use counsellor’s charge if provided, else the page price (699)
  const counsellorCharges = Number(passedAmount) || priceINR;

  const API_BASE_FALLBACK = 'https://studconnect-backend.onrender.com';
  const apiBase =
    (import.meta as any)?.env?.VITE_API_BASE_URL ||
    (window as any).__API_BASE__ ||
    API_BASE_FALLBACK;

  useEffect(() => {
    // Update when user becomes available (e.g. after async auth load)
    if (user?.email && !email) setEmail(user.email);
    if (user?.full_name && !fullName) setFullName(user.full_name);
  }, [user]); // added

  // useEffect(() => {
  //   if (!(import.meta as any)?.env?.VITE_API_BASE_URL) {
  //     setEnvWarning(`VITE_API_BASE_URL not set. Using fallback: ${API_BASE_FALLBACK}`);
  //   }
  // }, []);

  const handleApplyDiscount = () => {
    if (discountCode.trim().toLowerCase() === 'save50') {
      setDiscountApplied(true);
    } else {
      alert('Invalid discount code');
    }
  };

  const PRODUCT_ID = 'pdt_isuaGsszAodjHrUaplbG4';
  const allowedPaymentMethodTypes = ['credit','debit','upi']; // upi optional, keep credit/debit fallback

  // Replace previous handleContinue with handlePayment (keep validation & red borders)
  const handlePayment = async () => {
    setPaymentError(null);
    setNameError(false);
    setEmailError(false);
    let hasError = false;
    if (!fullName.trim()) { setNameError(true); hasError = true; }
    if (!email.trim()) { setEmailError(true); hasError = true; }
    if (hasError) return;
    if (!bookingId) { setPaymentError('Missing booking ID. Please restart your booking.'); return; }
    setIsProcessingPayment(true);
    try {
      const userToken = (user as any)?.token || localStorage.getItem('token') || '';
      const safePhone = phone.trim() || undefined;
      const returnUrl = `${window.location.origin}/payment-success?bookingId=${encodeURIComponent(bookingId)}`;
      const safeAddress = address.trim() || 'Address Not Provided';

      const payload: any = {
        // REQUIRED top-level fields (missing before)
        amount: Number(totalINR),
        booking_id: String(bookingId),
        product_cart: [{ product_id: PRODUCT_ID, quantity: 1 }],
        billing_address: {
          line1: safeAddress,
          country: country
        },
        customer: {
          name: fullName.trim(),
          email: email.trim(),
          phone: safePhone
        },
        allowed_payment_method_types: allowedPaymentMethodTypes,
        metadata: {
          booking_id: String(bookingId),
          user_id: user?.id || null,
          business: business ? 'true' : 'false',
          original_amount_inr: priceINR,
          final_amount_inr: totalINR
        },
        currency: 'INR',
        tax_inclusive_pricing: true,
        confirm: true,
        return_url: returnUrl,
        show_saved_payment_methods: false
      };

      // Only include discount_code if applied (avoid null → string_type error)
      if (discountApplied && discountCode.trim()) {
        payload.discount_code = discountCode.trim().toLowerCase();
      }

      const res = await fetch(`${apiBase}/api/create-dodo-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(userToken ? { Authorization: `Bearer ${userToken}` } : {})
        },
        body: JSON.stringify(payload)
      });

      const raw = await res.text();
      let data: any = {};
      try { data = raw ? JSON.parse(raw) : {}; } catch {}
      if (!res.ok) throw new Error(data?.detail || raw || `Payment init failed (${res.status})`);
      const url = data.checkout_url;
      if (!url || typeof url !== 'string') throw new Error('Invalid checkout URL returned.');
      if (url.includes('/error/')) throw new Error('Payment provider returned error URL.');
      if (url.includes('/mock-payment')) throw new Error('Mock payment URL received — backend must call live Checkout Sessions API.');
      window.location.href = url;
    } catch (err: any) {
      setPaymentError(err.message || 'Payment failed. Please try again.');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return (
    <div
      className="pc-billing-root"
      style={{
        minHeight: '100vh',
        background: '#fafafa',
        padding: '2rem 1rem',
        paddingTop: '120px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", sans-serif'
      }}
    >
      <div
        className="pc-billing-grid"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          alignItems: 'start'
        }}
      >
        {/* Left Side - Order Summary */}
        <div className="pc-summary" style={{ top: '2rem' }}>
          {/* Header with Pay in USD */}
          <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  background: '#e9d5ff',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  fontSize: '1.1rem',
                  color: '#7c3aed'
                }}
              >
                Y
              </div>
              <span style={{ fontWeight: '600', fontSize: '1rem', color: '#1f2937' }}>
                YourNextUniversity
              </span>
            </div>
            <select
              style={{
                padding: '0.5rem 2rem 0.5rem 0.75rem',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                fontSize: '0.875rem',
                color: '#374151',
                background: 'white',
                cursor: 'pointer',
                appearance: 'none',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.5rem center'
              }}
            >
              <option>Pay in USD</option>
              <option>Pay in INR</option>
            </select>
          </div>

          {/* Product Info */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
              <div style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827' }}>
                Peer Counseling Booking
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#111827' }}>
                ₹699.00 <span style={{ fontSize: '0.875rem', fontWeight: '400', color: '#6b7280' }}>(tax incl.)</span>
              </div>
            </div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              To book sessions for peer counseling.
            </div>
          </div>

          {/* Discount Code */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                Have a discount code?
              </div>
              <button
                style={{
                  padding: '0.5rem 1rem',
                  background: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  color: '#111827',
                  cursor: 'pointer',
                  fontWeight: '500',
                  whiteSpace: 'nowrap'
                }}
                onClick={() => {
                  const code = prompt('Enter discount code:');
                  if (code) {
                    setDiscountCode(code);
                    handleApplyDiscount();
                  }
                }}
              >
                Apply discount code
              </button>
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.875rem' }}>
              <span style={{ color: '#6b7280' }}>Subtotal</span>
              <span style={{ color: '#111827', fontWeight: '500' }}>₹{subtotalINR.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.875rem' }}>
              <span style={{ color: '#6b7280' }}>Tax</span>
              <span style={{ color: '#111827', fontWeight: '500' }}>₹{taxINR.toFixed(2)}</span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '1rem',
                borderTop: '1px solid #e5e7eb',
                fontSize: '1rem'
              }}
            >
              <span style={{ color: '#111827', fontWeight: '600' }}>Total</span>
              <span style={{ color: '#111827', fontWeight: '700' }}>₹{totalINR.toFixed(2)}</span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '0.5rem',
                fontSize: '0.875rem'
              }}
            >
              <span style={{ color: '#6b7280' }}>Total in USD</span>
              <span style={{ color: '#111827', fontWeight: '600' }}>${totalUSD}</span>
            </div>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="pc-form" style={{ background: 'white', borderRadius: '12px', padding: '2rem', border: '1px solid #e5e7eb' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827', marginBottom: '1.5rem' }}>
            Contact Information
          </h2>

          <div>
            {/* Full Name */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                Full Name <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={e => { setFullName(e.target.value); if (nameError) setNameError(false); }}
                placeholder="eg. John Doe"
                required
                style={{
                  width: '100%',
                  padding: '0.625rem 0.875rem',
                  borderRadius: '6px',
                  border: `1px solid ${nameError ? '#ef4444' : '#d1d5db'}`,
                  fontSize: '0.875rem',
                  color: '#111827',
                  boxSizing: 'border-box',
                  outline: 'none'
                }}
              />
              {nameError && (
                <div style={{ marginTop: '0.4rem', fontSize: '0.75rem', color: '#ef4444', fontWeight: 500 }}>
                  Please enter your full name.
                </div>
              )}
            </div>

            {/* Email and Phone */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                  Email <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); if (emailError) setEmailError(false); }}
                  placeholder={user?.email ? '' : ''}
                 
                  style={{
                    width: '100%',
                    padding: '0.625rem 0.875rem',
                    borderRadius: '6px',
                    border: `1px solid ${emailError ? '#ef4444' : '#d1d5db'}`,
                    fontSize: '0.875rem',
                    color: '#111827',
                    boxSizing: 'border-box',
                    outline: 'none'
                  }}
                />
                {emailError && (
                  <div style={{ marginTop: '0.4rem', fontSize: '0.75rem', color: '#ef4444', fontWeight: 500 }}>
                    Please enter your email address.
                  </div>
                )}
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                  Phone (optional)
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <select
                    value={countryCode}
                    onChange={e => setCountryCode(e.target.value)}
                    style={{
                      padding: '0.625rem 1.5rem 0.625rem 0.5rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '0.875rem',
                      background: 'white',
                      cursor: 'pointer',
                      appearance: 'none',
                      backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'10\' height=\'10\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%23374151\' d=\'M6 9L1 4h10z\'/%3E%3C/svg%3E")',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.375rem center',
                      minWidth: '70px'
                    }}
                  >
                    <option value="US">🇺🇸</option>
                    <option value="IN">🇮🇳</option>
                    <option value="GB">🇬🇧</option>
                  </select>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+1"
                    style={{
                      flex: 1,
                      padding: '0.625rem 0.875rem',
                      borderRadius: '6px',
                      border: '1px solid #d1d5db',
                      fontSize: '0.875rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Billing Address */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                Billing address <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <select
                value={country}
                onChange={e => setCountry(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.625rem 0.875rem',
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  fontSize: '0.875rem',
                  background: 'white',
                  marginBottom: '0.75rem',
                  cursor: 'pointer',
                  boxSizing: 'border-box'
                }}
              >
                <option>United States</option>
                <option>India</option>
                <option>Canada</option>
                <option>United Kingdom</option>
                <option>Australia</option>
              </select>
              <input
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder="Address Line"
                required
                style={{
                  width: '100%',
                  padding: '0.625rem 0.875rem',
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  fontSize: '0.875rem',
                  marginBottom: '0.5rem',
                  boxSizing: 'border-box'
                }}
              />
              <div
                style={{
                  fontSize: '0.813rem',
                  color: '#6b7280',
                  textDecoration: 'underline',
                  cursor: 'pointer'
                }}
              >
                Enter address manually
              </div>
            </div>

            {/* Business Checkbox */}
            <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="checkbox"
                checked={business}
                onChange={e => setBusiness(e.target.checked)}
                id="business"
                style={{ width: '16px', height: '16px', cursor: 'pointer' }}
              />
              <label htmlFor="business" style={{ fontSize: '0.875rem', color: '#374151', cursor: 'pointer' }}>
                Purchasing as a business
              </label>
            </div>

            {/* Warning for API base URL */}
            {envWarning && (
              <div style={{
                maxWidth: 1200,
                margin: '0 auto 1rem',
                fontSize: '0.75rem',
                color: '#b45309',
                background: '#fffbeb',
                border: '1px solid #fcd34d',
                padding: '0.5rem 0.75rem',
                borderRadius: 6
              }}>
                {envWarning}
              </div>
            )}

            {/* Continue Button */}
            <button
              type="button"
              onClick={handlePayment}
              disabled={isProcessingPayment}
              className="pc-pay-btn"
              style={{
                width: '100%',
                padding: '0.875rem',
                background: isProcessingPayment ? '#6b7280' : '#111827',
                color: 'white',
                borderRadius: '6px',
                border: 'none',
                fontSize: '0.9375rem',
                fontWeight: '600',
                cursor: isProcessingPayment ? 'not-allowed' : 'pointer',
                marginBottom: '0.75rem',
                transition: 'background .15s'
              }}
            >
              {isProcessingPayment ? 'Processing...' : 'Continue to Payment'}
            </button>
            {paymentError && (
              <div style={{
                marginBottom: '1rem',
                fontSize: '0.75rem',
                color: '#ef4444',
                fontWeight: 500
              }}>
                {paymentError}
              </div>
            )}
            {/* Footer */}
            <div style={{ textAlign: 'center', fontSize: '0.75rem', color: '#6b7280', lineHeight: '1.5' }}>
              This order process is conducted by our online reseller & Merchant of Record,{' '}
              <span style={{ fontWeight: '600' }}>dodopayments.com</span>, who also handles order-related inquiries and returns.
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '0.75rem', fontSize: '0.75rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#6b7280' }}>
                <img
                  src="https://pub-e63ee2f49d7e4f94b98011a5350eea0f.r2.dev/Brandmark.png"
                  alt="Dodo Payments"
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '2px'
                  }}
                />
                Dodo Payments
              </span>
              <a href="#" style={{ color: '#6b7280', textDecoration: 'none' }}>Privacy</a>
              <a href="#" style={{ color: '#6b7280', textDecoration: 'none' }}>Terms</a>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Styles */}
      <style>
        {`
          /* Base adjustments */
          .pc-billing-root {
            box-sizing: border-box;
          }
          .pc-form input,
          .pc-form select,
          .pc-form button {
            font-family: inherit;
          }

          /* Medium screens: stack columns (summary first, form second) */
          @media (max-width: 960px) {
            .pc-billing-grid {
              grid-template-columns: 1fr !important;
              gap: 2.2rem !important;
            }
            .pc-summary {
              order: 1;
            }
            .pc-form {
              order: 2;
            }
          }

          /* Tablets / small screens */
          @media (max-width: 780px) {
            .pc-billing-root {
              padding-top: 100px !important;
              padding-left: 0.85rem !important;
              padding-right: 0.85rem !important;
            }
            .pc-summary {
              margin-bottom: 0.4rem !important;
            }
            .pc-form {
              padding: 1.55rem 1.25rem 1.7rem !important;
            }
          }

          /* Phones */
          @media (max-width: 640px) {
            .pc-billing-grid {
              gap: 1.6rem !important;
            }
            .pc-summary h2,
            .pc-summary .title {
              font-size: 1.05rem !important;
            }
            .pc-form {
              padding: 1.35rem 1rem !important;
              border-radius: 10px !important;
            }
            .pc-form h2 {
              font-size: 1.25rem !important;
              margin-bottom: 1.05rem !important;
            }
            .pc-pay-btn {
              font-size: 0.85rem !important;
              padding: 0.8rem 0.9rem !important;
            }
            .pc-form input,
            .pc-form select {
              padding: 0.55rem 0.75rem !important;
              font-size: 0.78rem !important;
            }
          }

          /* Extra-small devices */
          @media (max-width: 480px) {
            .pc-billing-root {
              padding-left: 0.6rem !important;
              padding-right: 0.6rem !important;
            }
            .pc-form {
              padding: 1.1rem 0.8rem !important;
            }
            .pc-form h2 {
              font-size: 1.15rem !important;
            }
            .pc-pay-btn {
              font-size: 0.8rem !important;
              padding: 0.72rem 0.75rem !important;
            }
          }

          /* Simplify header select on very small screens */
          @media (max-width: 420px) {
            .pc-summary select {
              display: none !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default PeerCounsellingBillingPage;