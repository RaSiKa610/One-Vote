import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Globe, ChevronRight } from 'lucide-react';

const APP_ICON = 'https://static.vecteezy.com/system/resources/previews/036/514/118/non_2x/india-election-concept-democracy-voting-ballot-box-with-flag-icon-illustration-vector.jpg';

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const { t, languages, langCode, setLanguage } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    if (step === 0) {
      const timer = setTimeout(() => setStep(1), 2000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleContinue = () => {
    localStorage.setItem('one_vote_onboarded', 'true');
    navigate('/home');
  };

  // ── SPLASH ────────────────────────────────────────────────────────────
  if (step === 0) return (
    <div className="splash">
      <div className="splash-logo" aria-hidden="true">
        <div style={{ width: 72, height: 72, borderRadius: 20, overflow: 'hidden', border: '2px solid rgba(255,255,255,0.2)', boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}>
          <img src={APP_ICON} alt="One Vote" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>
      <h1 className="splash-title">{t('app_name')}</h1>
      <p className="splash-subtitle">{t('splash_subtitle')}</p>
      <div className="splash-dots" aria-hidden="true">
        <div className="splash-dot"></div><div className="splash-dot"></div><div className="splash-dot"></div>
      </div>
    </div>
  );

  // ── LANGUAGE SELECTION ────────────────────────────────────────────────
  return (
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
        <button className="btn btn-primary btn-full btn-lg" onClick={handleContinue}>
          {t('continue')} <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
