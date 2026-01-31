import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { UniversitiesPage } from './pages/UniversitiesPage';
import { ContactPage } from './pages/ContactPage';
import { StudentDashboard } from './pages/StudentDashboard';
import { CounsellorDashboard } from './pages/CounsellorDashboard';
import { SiteNav } from './components/SiteNav';
import { AuthProvider, useAuth } from './context/AuthContext';
import PeerCounsellingPage from './pages/PeerCounsellingPage';
import AuthRegisterPage from './pages/AuthRegisterPage';
import AuthVerifyPage from './pages/AuthVerifyPage';
import AuthLoginPage from './pages/AuthLoginPage';
import AuthForgotPasswordPage from './pages/AuthForgotPasswordPage';
import { FinancialServicesPage } from './pages/FinancialServicesPage';
import UniversityDetailPage from './pages/UniversityDetailPage';
import StudyApplication from './pages/StudyApplication';
import ProgramDetailsPage from './pages/ProgramDetailsPage';
import AccommodationPage from './pages/AccommodationPage';
import UniversityRepresentativeCounsellingPage from './pages/UniversityRepresentativeCounsellingPage';
import AirportPickupPage from './pages/AirportPickupPage';
import Footer from './sections/Footer';
import CareerPage from './pages/CareerPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import PeerCounsellingBillingPage from './pages/PeerCounsellingBillingPage';
import MockPaymentPage from './pages/MockPaymentPage';
import PaymentSuccess from './pages/PaymentSuccess';
import BookingDetailsPage from './pages/BookingDetailsPage';
import StudentBookings  from './pages/StudentBookings';
import PeerProfilePage from './pages/PeerProfilePage';

// RequireAuth component to protect routes
const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }
  return <>{children}</>;
};

// Add this component before <Routes>
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export const App: React.FC = () => (
  <AuthProvider>
    <Router>
      <ScrollToTop />
      <SiteNav />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={
            <AboutPage />
        } />
        <Route path="/services" element={
            <ServicesPage />
        } />
        <Route path="/services/peer-counselling" element={
            <PeerCounsellingPage />
        } />
        <Route path="/universities" element={
            <UniversitiesPage />
        } />
        <Route path="/universities/:id" element={<UniversityDetailPage />} />
        <Route path="/program-details/:id" element={<ProgramDetailsPage />} />
        <Route path="/contact" element={
            <ContactPage />
        } />
        <Route path="/student" element={
          <RequireAuth>
            <StudentDashboard />
          </RequireAuth>
        } />
        {/* Auth pages are public */}
        <Route path="/auth/register" element={<AuthRegisterPage />} />
        <Route path="/auth/verify" element={<AuthVerifyPage />} />
        <Route path="/auth/login" element={<AuthLoginPage />} />
        <Route path="/auth/forgot-password" element={<AuthForgotPasswordPage />} />
        <Route path="/financial-services" element={
            <FinancialServicesPage />
        } />
        <Route path="/services/international-application-process" element={
            <StudyApplication />
        } />
        <Route path="/accommodation" element={
            <AccommodationPage />
        } />
        <Route path="/services/university-representative-counselling" element={
            <UniversityRepresentativeCounsellingPage />
        } />
        <Route path="/services/airport-pickup" element={
            <AirportPickupPage />
        } />
        <Route path="/career" element={<CareerPage />} />
        <Route path="/services/peer-counselling-billing" element={<PeerCounsellingBillingPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />
        <Route path="/mock-payment" element={<MockPaymentPage />} />
        <Route path="/payment-status" element={<PaymentSuccess />} />
        <Route path="/booking/:id" element={<BookingDetailsPage />} />
        <Route path="/student-bookings" element={<StudentBookings />} />
        <Route path="/peer/:id" element={<PeerProfilePage />} />
        <Route path="*" element={<div style={{padding:'4rem',textAlign:'center'}}>Page Not Found</div>} />
      </Routes>
      <Footer />
    </Router>
  </AuthProvider>
);
           