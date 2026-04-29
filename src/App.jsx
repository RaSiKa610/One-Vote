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
  const { voterType } = useUser();
  if (!voterType) return <Navigate to="/" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <LanguageProvider>
      <UserProvider>
        <BrowserRouter>
          <AppShell>
            <Routes>
              <Route path="/" element={<Onboarding />} />
              <Route path="/home" element={<RequireOnboarding><Home /></RequireOnboarding>} />
              <Route path="/learn" element={<RequireOnboarding><Learn /></RequireOnboarding>} />
              <Route path="/learn/new-voter" element={<RequireOnboarding><NewVoter /></RequireOnboarding>} />
              <Route path="/learn/election-process" element={<RequireOnboarding><ElectionProcess /></RequireOnboarding>} />
              <Route path="/learn/checklist" element={<RequireOnboarding><VoterChecklist /></RequireOnboarding>} />
              <Route path="/learn/quiz" element={<RequireOnboarding><Quiz /></RequireOnboarding>} />
              <Route path="/find" element={<RequireOnboarding><Find /></RequireOnboarding>} />
              <Route path="/history" element={<RequireOnboarding><PoliticalHistory /></RequireOnboarding>} />
              <Route path="/schemes" element={<RequireOnboarding><GovSchemes /></RequireOnboarding>} />
              <Route path="/profile" element={<RequireOnboarding><Profile /></RequireOnboarding>} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AppShell>
        </BrowserRouter>
      </UserProvider>
    </LanguageProvider>
  );
}
