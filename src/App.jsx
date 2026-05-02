import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { UserProvider, useUser } from './context/UserContext';
import { useLanguage } from './context/LanguageContext';
import Header from './components/layout/Header';
import BottomNav from './components/layout/BottomNav';
import AICallAssistant from './components/ai/AICallAssistant';
import Onboarding from './pages/Onboarding';
import Home from './pages/Home';
import Learn from './pages/Learn';
import NewVoter from './pages/NewVoter';
import ElectionProcess from './pages/ElectionProcess';
import VoterChecklist from './pages/VoterChecklist';
import Find from './pages/Find';
import Quiz from './pages/Quiz';
import Profile from './pages/Profile';
import PoliticalHistory from './pages/PoliticalHistory';
import GovSchemes from './pages/GovSchemes';
import VoterTypeHub from './pages/VoterTypeHub';
import HowToVote from './pages/HowToVote';
import Analytics from './pages/Analytics';
import NVD from './pages/NVD';
import Helpline from './pages/Helpline';
import ELC from './pages/ELC';
import Resources from './pages/Resources';
import VoterTypeDetail from './pages/VoterTypeDetail';

const PAGE_TITLES = {
  '/home': null,
  '/learn': 'Learn',
  '/learn/new-voter': 'New Voter Guide',
  '/learn/election-process': 'Election Process',
  '/learn/checklist': 'Voter Checklist',
  '/learn/quiz': 'Quiz',
  '/find': 'Find Booth',
  '/profile': 'Profile',
  '/history': 'Political History',
  '/schemes': 'Govt Schemes',
};

function AppShell({ children }) {
  const { t } = useLanguage();
  const location = useLocation();
  const pathname = location.pathname;
  const isOnboarding = pathname === '/';
  const showBack = pathname !== '/home' && !isOnboarding;
  const title = PAGE_TITLES[pathname] || t('app_name');

  if (isOnboarding) return <>{children}</>;

  return (
    <div className="app-container">
      <Header title={title} showBack={showBack} showLang={true} />
      <main className="page-content" id="main-content">
        {children}
      </main>
      <BottomNav />
      <AICallAssistant />
    </div>
  );
}

function RequireOnboarding({ children }) {
  const { authLoading } = useUser();
  const hasOnboarded = localStorage.getItem('one_vote_onboarded') === 'true';

  if (authLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-app)' }}>
        <div className="splash-dot" style={{ width: 12, height: 12 }}></div>
      </div>
    );
  }

  if (!hasOnboarded) return <Navigate to="/onboarding" replace />;
  return children;
}

export default function App() {
  return (
    <LanguageProvider>
      <UserProvider>
        <BrowserRouter>
          <AppShell>
            <Routes>
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/home" element={<RequireOnboarding><Home /></RequireOnboarding>} />
              <Route path="/learn" element={<RequireOnboarding><Learn /></RequireOnboarding>} />
              <Route path="/learn/new-voter" element={<RequireOnboarding><NewVoter /></RequireOnboarding>} />
              <Route path="/learn/election-process" element={<RequireOnboarding><ElectionProcess /></RequireOnboarding>} />
              <Route path="/learn/checklist" element={<RequireOnboarding><VoterChecklist /></RequireOnboarding>} />
              <Route path="/learn/quiz" element={<RequireOnboarding><Quiz /></RequireOnboarding>} />
              
              {/* New v2.0 Routes */}
              <Route path="/learn/voter-types" element={<RequireOnboarding><VoterTypeHub /></RequireOnboarding>} />
              <Route path="/learn/voter-types/:type" element={<RequireOnboarding><VoterTypeDetail /></RequireOnboarding>} />
              <Route path="/learn/how-to-vote" element={<RequireOnboarding><HowToVote /></RequireOnboarding>} />
              <Route path="/learn/analytics" element={<RequireOnboarding><Analytics /></RequireOnboarding>} />
              <Route path="/learn/nvd" element={<RequireOnboarding><NVD /></RequireOnboarding>} />
              <Route path="/learn/helpline" element={<RequireOnboarding><Helpline /></RequireOnboarding>} />
              <Route path="/learn/elc" element={<RequireOnboarding><ELC /></RequireOnboarding>} />
              <Route path="/learn/resources" element={<RequireOnboarding><Resources /></RequireOnboarding>} />

              <Route path="/find" element={<RequireOnboarding><Find /></RequireOnboarding>} />
              <Route path="/history" element={<RequireOnboarding><PoliticalHistory /></RequireOnboarding>} />
              <Route path="/schemes" element={<RequireOnboarding><GovSchemes /></RequireOnboarding>} />
              <Route path="/profile" element={<RequireOnboarding><Profile /></RequireOnboarding>} />
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
          </AppShell>
        </BrowserRouter>
      </UserProvider>
    </LanguageProvider>
  );
}
