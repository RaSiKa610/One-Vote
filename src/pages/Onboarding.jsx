import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { auth, db } from '../config/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { Globe, Leaf, Vote, ChevronRight, Mail, ArrowLeft } from 'lucide-react';

function LogoMark({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none" aria-hidden="true">
      <rect width="56" height="56" rx="16" fill="rgba(234,227,209,0.12)" />
      <rect x="1" y="1" width="54" height="54" rx="15" stroke="rgba(234,227,209,0.25)" strokeWidth="2" />
      <path d="M16 38 L28 18 L40 38" stroke="#EAE3D1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20 32 L36 32" stroke="#C0392B" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="28" cy="18" r="3" fill="#C0392B"/>
    </svg>
  );
}

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const { t, languages, langCode, setLanguage } = useLanguage();
  const { selectVoterType, syncToCloud } = useUser();
  const navigate = useNavigate();

  const [signingIn, setSigningIn] = useState(false);
  const [voterTypeSelected, setVoterTypeSelected] = useState(null);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    if (step === 0) {
      const timer = setTimeout(() => setStep(1), 2200);
      return () => clearTimeout(timer);
    }
  }, [step]);

  useEffect(() => {
    if (step === 0) {
      const timer = setTimeout(() => setStep(1), 2200);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleVoterType = (type) => {
    setVoterTypeSelected(type);
    selectVoterType(type);
    setStep(3); // go to phone login
  };

  const handleGoogleLogin = async () => {
    setAuthError('');
    setSigningIn(true);
    try {
      const { signInWithPopup, GoogleAuthProvider } = await import('firebase/auth');
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Create or update Firestore profile
      const userRef = doc(db, 'users', user.uid);
      const snap = await getDoc(userRef);
      if (!snap.exists()) {
        await setDoc(userRef, {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          voterType: voterTypeSelected,
          createdAt: new Date().toISOString(),
        });
      }
      setStep(5);
    } catch (e) {
      console.error('Google Sign-In error:', e);
      setAuthError('Failed to sign in with Google. Please try again.');
    } finally {
      setSigningIn(false);
    }
  };

  const handleFinish = () => navigate('/home');

  // ── SPLASH ──────────────────────────────────────────────────────────
  if (step === 0) return (
    <div className="splash">
      <div className="splash-logo" aria-hidden="true"><LogoMark size={56} /></div>
      <h1 className="splash-title">{t('app_name')}</h1>
      <p className="splash-subtitle">{t('splash_subtitle')}</p>
      <div className="splash-dots" aria-hidden="true">
        <div className="splash-dot"></div><div className="splash-dot"></div><div className="splash-dot"></div>
      </div>
    </div>
  );

  // ── LANGUAGE SELECTION ───────────────────────────────────────────────
  if (step === 1) return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg-app)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: 'var(--navy)', padding: '48px 20px 32px', color: 'white', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 56, height: 56, borderRadius: 16, background: 'rgba(255,255,255,0.12)', marginBottom: 16 }}>
          <Globe size={28} color="white" />
        </div>
        <h1 className="heading-lg" style={{ color: 'white' }}>{t('select_language')}</h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: 8, fontSize: '0.9rem' }}>{t('language_subtitle')}</p>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 20px' }}>
        <div className="lang-grid">
          {languages.map(lang => (
            <button
              key={lang.code}
              className={`lang-btn${langCode === lang.code ? ' selected' : ''}`}
              onClick={() => setLanguage(lang.code)}
              aria-pressed={langCode === lang.code}
            >
              <div style={{ width: 32, height: 32, borderRadius: 8, background: langCode === lang.code ? 'var(--navy)' : 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 800, color: langCode === lang.code ? 'white' : 'var(--navy)', letterSpacing: '0.04em' }}>{lang.code.toUpperCase()}</span>
              </div>
              <div>
                <div className="lang-native">{lang.native}</div>
                <div className="lang-english">{lang.label}</div>
              </div>
              {langCode === lang.code && <span style={{ marginLeft: 'auto', color: 'var(--teal)', fontSize: '1.1rem', fontWeight: 700 }}>✓</span>}
            </button>
          ))}
        </div>
      </div>
      <div style={{ padding: '16px 20px 32px' }}>
        <button className="btn btn-primary btn-full btn-lg" onClick={() => setStep(2)}>
          {t('continue')} <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );

  // ── VOTER TYPE ───────────────────────────────────────────────────────
  if (step === 2) return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg-app)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: 'var(--navy)', padding: '48px 20px 32px', color: 'white', textAlign: 'center' }}>
        <h1 className="heading-lg" style={{ color: 'white' }}>{t('who_are_you')}</h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: 8, fontSize: '0.9rem' }}>{t('voter_type_subtitle')}</p>
      </div>
      <div style={{ flex: 1, padding: '32px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <button onClick={() => handleVoterType('new')}
          style={{ background: 'white', border: '2px solid var(--border)', borderRadius: 20, padding: '28px 24px', textAlign: 'left', cursor: 'pointer', transition: 'var(--transition)', display: 'flex', alignItems: 'center', gap: 20 }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--teal)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = ''; }}
        >
          <div style={{ width: 72, height: 72, borderRadius: 20, background: 'linear-gradient(135deg, #2A9D8F, #1a7a6e)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Leaf size={32} color="white" strokeWidth={1.5} />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.3rem', color: 'var(--navy)', marginBottom: 4 }}>{t('new_voter')}</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{t('new_voter_desc')}</div>
          </div>
        </button>
        <button onClick={() => handleVoterType('existing')}
          style={{ background: 'white', border: '2px solid var(--border)', borderRadius: 20, padding: '28px 24px', textAlign: 'left', cursor: 'pointer', transition: 'var(--transition)', display: 'flex', alignItems: 'center', gap: 20 }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--navy)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = ''; }}
        >
          <div style={{ width: 72, height: 72, borderRadius: 20, background: 'linear-gradient(135deg, #1A304D, #243d5e)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Vote size={32} color="white" strokeWidth={1.5} />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.3rem', color: 'var(--navy)', marginBottom: 4 }}>{t('existing_voter')}</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{t('existing_voter_desc')}</div>
          </div>
        </button>
      </div>
    </div>
  );

  // ── SIGN IN ──────────────────────────────────────────────────────────
  if (step === 3) return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg-app)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: 'var(--navy)', padding: '64px 20px 40px', color: 'white', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, borderRadius: 20, background: 'rgba(255,255,255,0.12)', marginBottom: 24 }}>
          <Mail size={32} color="white" />
        </div>
        <h1 className="heading-lg" style={{ color: 'white' }}>{t('sign_in_backup') || 'Secure Your Progress'}</h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: 8, fontSize: '0.95rem', maxWidth: 280, margin: '8px auto 0' }}>
          Connect your Google account to sync your voter journey across devices.
        </p>
      </div>

      <div style={{ flex: 1, padding: '40px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <button
          onClick={handleGoogleLogin}
          disabled={signingIn}
          style={{ width: '100%', padding: '16px', borderRadius: 16, background: 'white', border: '2px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, cursor: 'pointer', transition: 'all 0.2s', opacity: signingIn ? 0.7 : 1, boxShadow: 'var(--shadow-sm)' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--navy)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = ''; }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--navy)' }}>
            {signingIn ? (t('verifying') || 'Signing in...') : 'Sign in with Google'}
          </span>
        </button>

        {authError && (
          <p style={{ color: 'var(--red)', fontSize: '0.85rem', textAlign: 'center', fontWeight: 600 }}>{authError}</p>
        )}

        <button onClick={() => setStep(2)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 12 }}>
          <ArrowLeft size={16} /> {t('go_back')}
        </button>
      </div>
    </div>
  );

  // ── WELCOME ──────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg-app)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 28px', textAlign: 'center' }}>
      <div style={{ width: 80, height: 80, borderRadius: 24, background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
        <LogoMark size={48} />
      </div>
      <h2 className="heading-lg text-navy">{t('welcome_title') || 'Welcome to One Vote'}</h2>
      <p style={{ color: 'var(--text-muted)', marginTop: 8, marginBottom: 32, fontSize: '0.9rem' }}>
        {t('welcome_desc') || "India's democracy is in your hands."}
      </p>
      <button className="btn btn-primary btn-full btn-lg" onClick={handleFinish}>
        {t('get_started')}
      </button>
    </div>
  );
}
