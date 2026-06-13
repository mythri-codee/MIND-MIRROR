import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

// Layout
import Navbar        from './components/Navbar';
import Footer        from './components/Footer';
import RippleEffect  from './components/RippleEffect';

// Public pages
import HomePage     from './pages/HomePage';
import AboutPage    from './pages/AboutPage';
import FeaturesPage from './pages/FeaturesPage';
import ContactPage  from './pages/ContactPage';
import DemoPage     from './pages/DemoPage';

// Auth
import AuthPage from './pages/AuthPage';

// App pages
import UploadPage        from './pages/UploadPage';
import AssessmentPage    from './pages/AssessmentPage';
import DashboardPage     from './pages/DashboardPage';
import AnalyticsPage     from './pages/AnalyticsPage';
import PredictionPage    from './pages/PredictionPage';
import ReportPage        from './pages/ReportPage';
import EnhancedDashboard from './pages/EnhancedDashboard';
import DocumentationPage from './pages/DocumentationPage';

// ── Toast component ──
function Toast({ msg, onClose }: { msg: string; onClose: () => void }) {
  useEffect(() => { const t = setTimeout(onClose, 4000); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className="fixed bottom-6 right-6 z-[999] flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl animate-fade-in"
      style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', backdropFilter: 'blur(16px)' }}>
      <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: '#6ee7b7' }} />
      <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: '13px', fontWeight: 600, color: '#6ee7b7', margin: 0 }}>{msg}</p>
    </div>
  );
}

function ProtectedRoute({ user, children }: { user: { name: string; email: string } | null; children: React.ReactNode }) {
  if (!user) return <Navigate to="/auth" replace />;
  return <>{children}</>;
}

function AppContent() {
  const location = useLocation();

  // Theme
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const s = localStorage.getItem('mm_theme');
    return s === 'light' ? 'light' : 'dark';
  });

  // Global state
  const [user,             setUser]             = useState<{ name: string; email: string } | null>(null);
  const [profile,          setProfile]          = useState<any>(null);
  const [assessmentResult, setAssessmentResult] = useState<any>(null);
  const [toast,            setToast]            = useState('');

  // Persist & restore
  useEffect(() => {
    const u = localStorage.getItem('mm_user');
    if (u) setUser(JSON.parse(u));
    const p = localStorage.getItem('mm_profile');
    if (p) setProfile(JSON.parse(p));
    const r = localStorage.getItem('mm_assessment_result');
    if (r) setAssessmentResult(JSON.parse(r));
  }, []);

  // Theme sync
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('mm_theme', theme);
  }, [theme]);

  // Scroll to top on route change
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [location.pathname]);

  const toggleTheme = () => setTheme(p => p === 'dark' ? 'light' : 'dark');

  const handleLoginSuccess = (u: { name: string; email: string }) => {
    setUser(u);
    setToast(`Welcome back, ${u.name}!`);
    // Auto-load Mythri sample when a test account named 'mythri' logs in
    try {
      const nm = (u.name || '').toLowerCase();
      if (nm.includes('mythri')) {
        fetch('/api/sample/mythri').then(r => {
          if (!r.ok) throw new Error('sample fetch failed');
          return r.json();
        }).then((sample) => {
          if (sample) {
            setProfile(sample);
            localStorage.setItem('mm_profile', JSON.stringify(sample));
            setToast('Loaded Mythri sample profile for testing');
          }
        }).catch(() => {
          // silent fail — server may not be running; user can load from UploadPage button
        });
      }
    } catch (_) {}
  };

  const handleProfileLoaded = async (profile: any) => {
    // 1. Keep the UI working instantly exactly as it did before
    setProfile(profile);
    localStorage.setItem('mm_profile', JSON.stringify(profile));
    
    // 2. Silently send the data to your new MongoDB server
    try {
      await fetch('/api/profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
      console.log("Profile saved to database!");
    } catch (error) {
      console.error("Database save failed, but UI continues.", error);
    }
  };

  const handleAssessmentCompleted = (r: any) => {
    setAssessmentResult(r);
    localStorage.setItem('mm_assessment_result', JSON.stringify(r));
    setToast('Assessment complete! View your results below.');
    try {
      confetti({ particleCount: 130, spread: 75, origin: { y: 0.6 }, colors: ['#7c3aed', '#a855f7', '#ec4899', '#10b981'] });
    } catch (_) {}
    // Update profile confidence and mappedDomain based on assessment
    try {
      const saved = localStorage.getItem('mm_profile');
      const profileObj = saved ? JSON.parse(saved) : (profile || {});
      if (profileObj) {
        profileObj.confidence = r.confidencePercentage ?? r.confidence ?? profileObj.confidence ?? 75;
        profileObj.mappedDomain = r.mappedDomain || profileObj.mappedDomain || 'fullstack';
        localStorage.setItem('mm_profile', JSON.stringify(profileObj));
        setProfile(profileObj);
      }
    } catch (e) {
      // ignore profile update failures
    }
  };

  const handleLogout = () => {
    ['mm_user', 'mm_profile', 'mm_assessment_result'].forEach(k => localStorage.removeItem(k));
    setUser(null); setProfile(null); setAssessmentResult(null);
    setToast('Signed out successfully.');
  };

  // Pages that show the footer
  const publicPaths = ['/', '/home', '/about', '/features', '/contact', '/demo'];
  const showFooter  = publicPaths.includes(location.pathname);

  // Auth page is completely standalone — no navbar/footer
  const isAuthPage = location.pathname === '/auth';

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#07070e', color: '#ffffff' }}>

      <RippleEffect />

      {!isAuthPage && <Navbar theme={theme} toggleTheme={toggleTheme} user={user} onLogout={handleLogout} />}

      <main className="flex-grow page-enter" key={location.pathname}>
        <Routes>
          {/* ── Public pages ── */}
          <Route path="/"         element={<HomePage />} />
          <Route path="/home"     element={<Navigate to="/" replace />} />
          <Route path="/about"    element={<AboutPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/contact"  element={<ContactPage />} />
          <Route path="/demo"     element={<DemoPage />} />

          {/* ── Auth — full page, no navbar/footer ── */}
          <Route path="/auth" element={
            <AuthPage onLoginSuccess={handleLoginSuccess} />
          } />

          {/* ── App pages ── */}
          <Route path="/upload" element={<ProtectedRoute user={user}><UploadPage onProfileLoaded={handleProfileLoaded} /></ProtectedRoute>} />
          <Route path="/assessment" element={<ProtectedRoute user={user}><AssessmentPage profile={profile} onAssessmentCompleted={handleAssessmentCompleted} /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute user={user}><DashboardPage /></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute user={user}><AnalyticsPage assessmentResult={assessmentResult} /></ProtectedRoute>} />
          <Route path="/prediction" element={<ProtectedRoute user={user}><PredictionPage assessmentResult={assessmentResult} /></ProtectedRoute>} />
          <Route path="/report" element={<ProtectedRoute user={user}><ReportPage /></ProtectedRoute>} />
          <Route path="/enhanced-dashboard" element={<ProtectedRoute user={user}><EnhancedDashboard profile={profile} assessmentResult={assessmentResult} /></ProtectedRoute>} />
          <Route path="/docs" element={<ProtectedRoute user={user}><DocumentationPage /></ProtectedRoute>} />

          {/* ── Fallback ── */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {showFooter && !isAuthPage && <Footer />}

      {toast && <Toast msg={toast} onClose={() => setToast('')} />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
