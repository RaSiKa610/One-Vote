import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowLeft, Globe } from 'lucide-react';

export default function Header({ title, showBack = false, showLang = true, transparent = false }) {
  const { t, currentLanguage, languages, setLanguage } = useLanguage();
  const navigate = useNavigate();

  if (transparent) return null;

  return (
    <header className="app-header" role="banner">
      <div className="header-logo">
        {showBack ? (
          <button className="icon-btn" onClick={() => navigate(-1)} aria-label={t('back')}>
            <ArrowLeft size={22} />
          </button>
        ) : (
          <>
            <div className="header-logo-mark" aria-hidden="true" style={{ overflow: 'hidden' }}>
              <img src="https://static.vecteezy.com/system/resources/previews/036/514/118/non_2x/india-election-concept-democracy-voting-ballot-box-with-flag-icon-illustration-vector.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <span className="header-logo-text">{title || t('app_name')}</span>
          </>
        )}
        {showBack && title && (
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--navy)', marginLeft: 4 }}>
            {title}
          </span>
        )}
      </div>
      {showLang && (
        <div className="header-actions">
          <div style={{ position: 'relative' }}>
            <button
              className="icon-btn"
              aria-label="Change language"
              onClick={() => {
                const current = languages.findIndex(l => l.code === currentLanguage.code);
                const next = languages[(current + 1) % languages.length];
                setLanguage(next.code);
              }}
              title={currentLanguage.native}
            >
              <Globe size={20} />
            </button>
            <span style={{
              position: 'absolute', bottom: -2, right: -2,
              fontSize: '0.6rem', fontWeight: 700, background: 'var(--navy)',
              color: 'white', borderRadius: 4, padding: '1px 4px', lineHeight: 1.4
            }}>
              {currentLanguage.code.toUpperCase()}
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
