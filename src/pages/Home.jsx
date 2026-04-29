import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { Bell, ExternalLink, Award, Leaf, CheckSquare, Landmark, MapPin, ChevronRight, TrendingUp, Shield, Smartphone } from 'lucide-react';
import { useOffline } from '../hooks/useOffline';

const SVEEP_INITIATIVES = [
  {
    id: 'sveep',
    Icon: Award,
    bg: 'linear-gradient(135deg, #1A304D, #243d5e)',
    titleKey: 'sveep_title',
    subtitleKey: 'sveep_sub',
    descKey: 'sveep_desc',
  },
  {
    id: 'nvd',
    Icon: Shield,
    bg: 'linear-gradient(135deg, #C0392B, #922b21)',
    titleKey: 'nvd_title',
    subtitleKey: 'nvd_sub',
    descKey: 'nvd_desc',
  },
  {
    id: 'meri-pehli',
    Icon: TrendingUp,
    bg: 'linear-gradient(135deg, #2A9D8F, #1a7a6e)',
    titleKey: 'meri_pehli_title',
    subtitleKey: 'meri_pehli_sub',
    descKey: 'meri_pehli_desc',
  },
  {
    id: 'c-vigil',
    Icon: Smartphone,
    bg: 'linear-gradient(135deg, #7c3aed, #5b21b6)',
    titleKey: 'cvigil_title',
    subtitleKey: 'cvigil_sub',
    descKey: 'cvigil_desc',
  },
];

const QUICK_ACTIONS = [
  { id: 'new-voter',    Icon: Leaf,         labelKey: 'new_voter_guide',   to: '/learn/new-voter',        color: 'var(--teal)',  bg: 'rgba(42,157,143,0.1)' },
  { id: 'checklist',   Icon: CheckSquare,  labelKey: 'checklist_title',   to: '/learn/checklist',        color: 'var(--navy)',  bg: 'rgba(26,48,77,0.08)' },
  { id: 'process',     Icon: Landmark,     labelKey: 'election_process',  to: '/learn/election-process', color: '#7c3aed',      bg: 'rgba(124,58,237,0.08)' },
  { id: 'find',        Icon: MapPin,       labelKey: 'find_booth',        to: '/find',                   color: 'var(--red)',   bg: 'rgba(192,57,43,0.08)' },
];

function getGreeting(t) {
  const h = new Date().getHours();
  if (h < 12) return t('good_morning');
  if (h < 17) return t('good_afternoon');
  return t('good_evening');
}

export default function Home() {
  const { t } = useLanguage();
  const { voterType, checklistProgress, userName } = useUser();
  const isOffline = useOffline();
  const navigate = useNavigate();

  return (
    <div className="page-enter">
      {isOffline && (
        <div className="offline-banner" role="status">
          {t('offline_notice')}
        </div>
      )}

      {/* Hero */}
      <div className="hero-banner">
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontSize: '0.78rem', opacity: 0.7, marginBottom: 4, fontWeight: 500, letterSpacing: '0.04em' }}>{getGreeting(t)},</p>
            <h1 className="heading-lg" style={{ color: 'white' }}>{userName}</h1>
            <div style={{ marginTop: 12, display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.12)', borderRadius: 20, padding: '6px 14px' }}>
              {voterType === 'new'
                ? <Leaf size={14} color="rgba(255,255,255,0.9)" />
                : <CheckSquare size={14} color="rgba(255,255,255,0.9)" />
              }
              <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>
                {voterType === 'new' ? 'New Voter' : 'Existing Voter'}
              </span>
            </div>
          </div>
          <button className="icon-btn" style={{ color: 'white', background: 'rgba(255,255,255,0.1)', borderRadius: 12, width: 44, height: 44 }} aria-label="Notifications">
            <Bell size={20} />
          </button>
        </div>

        {/* Progress */}
        <div style={{ marginTop: 24, background: 'rgba(255,255,255,0.1)', borderRadius: 16, padding: '16px' }}>
          <div className="flex items-center justify-between mb-8">
            <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>{t('your_checklist')}</span>
            <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.9)', fontWeight: 700 }}>{checklistProgress}% {t('completed')}</span>
          </div>
          <div className="progress-bar" style={{ background: 'rgba(255,255,255,0.2)' }}>
            <div className="progress-fill" style={{ width: `${checklistProgress}%`, background: 'var(--teal)' }} />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ padding: '20px 20px 8px' }}>
        <p className="label" style={{ color: 'var(--text-muted)', marginBottom: 12 }}>QUICK ACCESS</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {QUICK_ACTIONS.map(({ id, Icon, labelKey, to, color, bg }) => (
            <button
              key={id}
              onClick={() => navigate(to)}
              style={{ background: 'white', border: '2px solid var(--border)', borderRadius: 16, padding: '16px', textAlign: 'left', cursor: 'pointer', transition: 'var(--transition)', display: 'flex', flexDirection: 'column', gap: 10 }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = ''; }}
            >
              <div style={{ width: 40, height: 40, borderRadius: 12, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={20} color={color} strokeWidth={1.75} />
              </div>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--navy)', lineHeight: 1.3 }}>{t(labelKey)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Register CTA */}
      <div style={{ padding: '8px 20px' }}>
        <div style={{ background: 'var(--cream)', border: '2px solid var(--border)', borderRadius: 16, padding: '16px' }}>
          <div className="flex items-center justify-between">
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '0.95rem' }}>{t('register_to_vote')}</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 4 }}>{t('register_desc')}</p>
            </div>
            <a
              href="https://voters.eci.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'var(--navy)', color: 'white', padding: '10px 14px', borderRadius: 10, fontSize: '0.78rem', fontWeight: 700, flexShrink: 0, marginLeft: 12 }}
              aria-label="Open ECI voter registration portal"
            >
              ECI <ExternalLink size={13} />
            </a>
          </div>
        </div>
      </div>

      {/* Government Initiatives */}
      <div style={{ padding: '16px 0 8px' }}>
        <div style={{ padding: '0 20px 10px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Award size={16} color="var(--red)" />
          <p className="label" style={{ color: 'var(--text-muted)' }}>{t('government_schemes')}</p>
        </div>
        <div className="scroll-row">
          {SVEEP_INITIATIVES.map(({ id, Icon, bg, titleKey, subtitleKey, descKey }) => (
            <div key={id} style={{ flexShrink: 0, width: 224, background: 'white', borderRadius: 16, overflow: 'hidden', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ height: 72, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={28} color="white" strokeWidth={1.5} />
              </div>
              <div style={{ padding: '14px' }}>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1rem', color: 'var(--navy)', letterSpacing: '0.02em' }}>{t(titleKey)}</p>
                <p style={{ fontSize: '0.72rem', color: 'var(--teal)', fontWeight: 600, marginTop: 2 }}>{t(subtitleKey)}</p>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 6, lineHeight: 1.5 }}>{t(descKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stat card */}
      <div style={{ padding: '8px 20px 24px' }}>
        <div style={{ background: 'linear-gradient(135deg, #1A304D, #243d5e)', borderRadius: 16, padding: '20px', color: 'white', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
          <p style={{ fontSize: '0.72rem', fontWeight: 700, opacity: 0.7, letterSpacing: '0.1em', marginBottom: 6 }}>{t('did_you_know')}</p>
          <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 600, lineHeight: 1.5, letterSpacing: '0.01em' }}>
            "{t('stat_quote')}"
          </p>
          <p style={{ fontSize: '0.75rem', opacity: 0.6, marginTop: 10 }}>{t('stat_source')}</p>
        </div>
      </div>
    </div>
  );
}
