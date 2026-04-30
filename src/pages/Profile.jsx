import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { languages } from '../i18n/translations';
import { useNavigate } from 'react-router-dom';
import { Globe, ExternalLink, Info, Leaf, CheckSquare, User, BarChart2, LogOut, Phone } from 'lucide-react';

export default function Profile() {
  const { t, langCode, setLanguage } = useLanguage();
  const { user, logout, voterType, selectVoterType, checklistProgress, quizScores, userName } = useUser();
  const navigate = useNavigate();

  const quizPct = quizScores['civic'] || 0;

  const handleLogout = async () => {
    await logout();
    navigate('/', { replace: true });
  };

  return (
    <div className="page-enter">
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #1A304D, #243d5e)', padding: '28px 20px 32px', color: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 64, height: 64, borderRadius: 20, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid rgba(255,255,255,0.15)', flexShrink: 0, overflow: 'hidden' }}>
            {user && user.photoURL ? (
              <img src={user.photoURL} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <User size={28} color="white" strokeWidth={1.5} />
            )}
          </div>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.6rem', letterSpacing: '0.02em', lineHeight: 1.2 }}>{userName}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4, opacity: 0.8, fontSize: '0.82rem' }}>
              {voterType === 'new'
                ? <Leaf size={14} color="rgba(255,255,255,0.9)" />
                : <CheckSquare size={14} color="rgba(255,255,255,0.9)" />
              }
              <span>{voterType === 'new' ? t('new_voter') : t('existing_voter')}</span>
            </div>
          </div>
        </div>

        {/* Auth info */}
        <div style={{ marginTop: 20 }}>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'rgba(255,255,255,0.1)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Phone size={14} color="rgba(255,255,255,0.7)" />
                <span style={{ fontSize: '0.82rem', opacity: 0.9 }}>{user.phoneNumber || t('verified_user') || 'Verified User'}</span>
              </div>
              <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.78rem', fontWeight: 700, color: '#ff9999', cursor: 'pointer', background: 'none', border: 'none' }}>
                <LogOut size={13} /> {t('sign_out') || 'Logout'}
              </button>
            </div>
          ) : (
            <div style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.08)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.15)', fontSize: '0.82rem', opacity: 0.7 }}>
              {t('not_logged_in') || 'Not logged in. Restart app to sign in.'}
            </div>
          )}
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 24 }}>
          <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 14, padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <CheckSquare size={16} color="rgba(255,255,255,0.7)" />
              <span style={{ fontSize: '0.72rem', fontWeight: 700, opacity: 0.7, letterSpacing: '0.06em' }}>{t('checklist_title').toUpperCase()}</span>
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 700 }}>{checklistProgress}%</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 14, padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <BarChart2 size={16} color="rgba(255,255,255,0.7)" />
              <span style={{ fontSize: '0.72rem', fontWeight: 700, opacity: 0.7, letterSpacing: '0.06em' }}>{t('score').toUpperCase()}</span>
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 700 }}>{quizPct}%</div>
          </div>
        </div>
      </div>

      <div style={{ padding: '20px' }}>
        {/* Language selection */}
        <div style={{ background: 'white', borderRadius: 20, border: '2px solid var(--border)', overflow: 'hidden', marginBottom: 16 }}>
          <div style={{ padding: '16px 18px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <Globe size={18} color="var(--navy)" />
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--navy)', fontSize: '1.1rem', letterSpacing: '0.02em' }}>{t('language_settings')}</p>
          </div>
          <div style={{ padding: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {languages.map(lang => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                style={{ padding: '10px 12px', borderRadius: 12, border: `2px solid ${langCode === lang.code ? 'var(--navy)' : 'var(--border)'}`, background: langCode === lang.code ? 'var(--cream)' : 'white', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', transition: 'var(--transition)' }}
                aria-pressed={langCode === lang.code}
              >
                <div style={{ width: 28, height: 28, borderRadius: 8, background: langCode === lang.code ? 'var(--navy)' : 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: '0.58rem', fontWeight: 800, color: langCode === lang.code ? 'white' : 'var(--navy)', letterSpacing: '0.04em' }}>{lang.code.toUpperCase()}</span>
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--navy)' }}>{lang.native}</div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{lang.label}</div>
                </div>
                {langCode === lang.code && <span style={{ marginLeft: 'auto', color: 'var(--teal)', fontWeight: 700, fontSize: '0.9rem' }}>✓</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Voter type switch */}
        <div style={{ background: 'white', borderRadius: 20, border: '2px solid var(--border)', padding: '16px 18px', marginBottom: 16 }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--navy)', marginBottom: 12, fontSize: '1.1rem', letterSpacing: '0.02em' }}>{t('profile_switch')}</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { type: 'new',      Icon: Leaf,         labelKey: 'new_voter' },
              { type: 'existing', Icon: CheckSquare,  labelKey: 'existing_voter' },
            ].map(({ type, Icon, labelKey }) => (
              <button
                key={type}
                onClick={() => selectVoterType(type)}
                style={{ padding: '14px 12px', borderRadius: 12, border: `2px solid ${voterType === type ? 'var(--navy)' : 'var(--border)'}`, background: voterType === type ? 'var(--navy)' : 'white', color: voterType === type ? 'white' : 'var(--navy)', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', transition: 'var(--transition)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, letterSpacing: '0.02em' }}
              >
                <Icon size={16} strokeWidth={2} />
                {t(labelKey)}
              </button>
            ))}
          </div>
        </div>

        {/* About */}
        <div style={{ background: 'var(--cream)', borderRadius: 20, border: '1px solid var(--border)', padding: '18px', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <Info size={18} color="var(--navy)" />
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--navy)', fontSize: '1.1rem', letterSpacing: '0.02em' }}>{t('profile_about')}</p>
          </div>
          <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            {t('profile_about_desc')}
          </p>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 10 }}>{t('version')} 1.0.0 — Phase 3</p>
        </div>

        {/* ECI links */}
        <div style={{ background: 'white', borderRadius: 20, border: '2px solid var(--border)', overflow: 'hidden' }}>
          <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border)' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--navy)', fontSize: '1rem', letterSpacing: '0.02em' }}>{t('profile_eci')}</p>
          </div>
          {[
            { labelKey: 'profile_eci_reg', url: 'https://voters.eci.gov.in' },
            { labelKey: 'profile_eci_web', url: 'https://eci.gov.in' },
            { labelKey: 'profile_eci_cvigil', url: 'https://cvigil.eci.gov.in' },
          ].map((link, i) => (
            <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', borderBottom: i < 2 ? '1px solid var(--border)' : 'none', color: 'var(--navy)', fontSize: '0.85rem', transition: 'var(--transition)' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--cream)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <span>{t(link.labelKey)}</span>
              <ExternalLink size={14} color="var(--text-muted)" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
