import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { Globe, Leaf, Vote, ChevronRight } from 'lucide-react';

// SVG logo mark for splash
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
  const { selectVoterType } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (step === 0) {
      const timer = setTimeout(() => setStep(1), 2200);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleVoterType = (type) => {
    selectVoterType(type);
    setStep(3);
  };

  const handleFinish = () => navigate('/home');

  // ── SPLASH ──────────────────────────────────────────────────────────
  if (step === 0) return (
    <div className="splash">
      <div className="splash-logo" aria-hidden="true">
        <LogoMark size={56} />
      </div>
      <h1 className="splash-title">{t('app_name')}</h1>
      <p className="splash-subtitle">{t('splash_subtitle')}</p>
      <div className="splash-dots" aria-hidden="true">
        <div className="splash-dot"></div>
        <div className="splash-dot"></div>
        <div className="splash-dot"></div>
      </div>
    </div>
  );

  // ── LANGUAGE SELECTION ──────────────────────────────────────────────
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
                <span style={{ fontSize: '0.65rem', fontWeight: 800, color: langCode === lang.code ? 'white' : 'var(--navy)', letterSpacing: '0.04em' }}>
                  {lang.code.toUpperCase()}
                </span>
              </div>
              <div>
                <div className="lang-native">{lang.native}</div>
                <div className="lang-english">{lang.label}</div>
              </div>
              {langCode === lang.code && (
                <span style={{ marginLeft: 'auto', color: 'var(--teal)', fontSize: '1.1rem', fontWeight: 700 }}>✓</span>
              )}
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

  // ── VOTER TYPE ──────────────────────────────────────────────────────
  if (step === 2) return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg-app)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: 'var(--navy)', padding: '48px 20px 32px', color: 'white', textAlign: 'center' }}>
        <h1 className="heading-lg" style={{ color: 'white' }}>{t('who_are_you')}</h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: 8, fontSize: '0.9rem' }}>{t('voter_type_subtitle')}</p>
      </div>

      <div style={{ flex: 1, padding: '32px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* New Voter */}
        <button
          onClick={() => handleVoterType('new')}
          style={{ background: 'white', border: '2px solid var(--border)', borderRadius: 20, padding: '28px 24px', textAlign: 'left', cursor: 'pointer', transition: 'var(--transition)', display: 'flex', alignItems: 'center', gap: 20 }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--teal)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = ''; }}
        >
          <div style={{ width: 72, height: 72, borderRadius: 20, background: 'linear-gradient(135deg, #2A9D8F, #1a7a6e)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Leaf size={32} color="white" strokeWidth={1.5} />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.3rem', color: 'var(--navy)', marginBottom: 4, letterSpacing: '0.02em' }}>{t('new_voter')}</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{t('new_voter_desc')}</div>
            <div style={{ marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: '0.72rem', fontWeight: 700, color: 'var(--teal)', background: 'rgba(42,157,143,0.1)', padding: '3px 10px', borderRadius: 20, letterSpacing: '0.06em' }}>
              PRIORITY GUIDE
            </div>
          </div>
        </button>

        {/* Existing Voter */}
        <button
          onClick={() => handleVoterType('existing')}
          style={{ background: 'white', border: '2px solid var(--border)', borderRadius: 20, padding: '28px 24px', textAlign: 'left', cursor: 'pointer', transition: 'var(--transition)', display: 'flex', alignItems: 'center', gap: 20 }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--navy)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = ''; }}
        >
          <div style={{ width: 72, height: 72, borderRadius: 20, background: 'linear-gradient(135deg, #1A304D, #243d5e)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <rect x="6" y="4" width="20" height="26" rx="3" stroke="white" strokeWidth="2"/>
              <path d="M11 12 L16 16 L21 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11 20 L21 20" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M11 24 L17 24" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.3rem', color: 'var(--navy)', marginBottom: 4, letterSpacing: '0.02em' }}>{t('existing_voter')}</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{t('existing_voter_desc')}</div>
            <div style={{ marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: '0.72rem', fontWeight: 700, color: 'var(--navy)', background: 'rgba(26,48,77,0.08)', padding: '3px 10px', borderRadius: 20, letterSpacing: '0.06em' }}>
              FULL ACCESS
            </div>
          </div>
        </button>
      </div>
    </div>
  );

  // ── WELCOME ─────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg-app)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 28px', textAlign: 'center' }}>
      <div style={{ width: 80, height: 80, borderRadius: 24, background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
        <LogoMark size={48} />
      </div>
      <h2 className="heading-lg text-navy">Welcome to One Vote</h2>
      <p style={{ color: 'var(--text-muted)', marginTop: 8, marginBottom: 32, fontSize: '0.9rem' }}>
        India's democracy is in your hands.
      </p>
      <button className="btn btn-primary btn-full btn-lg" onClick={handleFinish}>
        {t('get_started')}
      </button>
    </div>
  );
}
