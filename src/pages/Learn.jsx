import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { ChevronRight, Leaf, Landmark, CheckSquare, Scale, Brain, Monitor, Printer, Ban, FileText, Map } from 'lucide-react';

const LEARN_SECTIONS = [
  {
    id: 'new-voter',
    Icon: Leaf,
    bg: 'linear-gradient(135deg, #2A9D8F, #1a7a6e)',
    titleKey: 'new_voter_guide',
    subtitleKey: 'nv_sub',
    badgeKey: 'start_here',
    badgeColor: 'var(--teal)',
    to: '/learn/new-voter',
    forNew: true,
  },
  {
    id: 'election-process',
    Icon: Landmark,
    bg: 'linear-gradient(135deg, #1A304D, #243d5e)',
    titleKey: 'election_process',
    subtitleKey: 'ep_sub',
    badgeKey: 'must_read',
    badgeColor: 'var(--navy)',
    to: '/learn/election-process',
    forNew: false,
  },
  {
    id: 'checklist',
    Icon: CheckSquare,
    bg: 'linear-gradient(135deg, #27ae60, #1e8449)',
    titleKey: 'checklist_title',
    subtitleKey: 'complete_before',
    badgeKey: 'interactive',
    badgeColor: '#27ae60',
    to: '/learn/checklist',
    forNew: false,
  },
  {
    id: 'rights',
    Icon: Scale,
    bg: 'linear-gradient(135deg, #7c3aed, #5b21b6)',
    titleKey: 'voter_rights',
    subtitleKey: 'know_rights',
    badgeKey: 'important',
    badgeColor: '#7c3aed',
    to: '/learn/checklist',
    forNew: false,
  },
  {
    id: 'quiz',
    Icon: Brain,
    bg: 'linear-gradient(135deg, #C0392B, #922b21)',
    titleKey: 'knowledge_quiz',
    subtitleKey: 'test_learned',
    badgeKey: 'fun',
    badgeColor: 'var(--red)',
    to: '/learn/quiz',
    forNew: false,
  },
];

const EDUCATION_CARDS = [
  { id: 'evm',          Icon: Monitor,      titleKey: 'edu_evm_title',             descKey: 'edu_evm_desc' },
  { id: 'vvpat',        Icon: Printer,      titleKey: 'edu_vvpat_title',             descKey: 'edu_vvpat_desc' },
  { id: 'nota',         Icon: Ban,          titleKey: 'edu_nota_title',              descKey: 'edu_nota_desc' },
  { id: 'mcc',          Icon: FileText,     titleKey: 'edu_mcc_title',    descKey: 'edu_mcc_desc' },
  { id: 'eci',          Icon: Landmark,     titleKey: 'edu_eci_title',              descKey: 'edu_eci_desc' },
  { id: 'constituency', Icon: Map,          titleKey: 'edu_const_title',      descKey: 'edu_const_desc' },
];

export default function Learn() {
  const { t } = useLanguage();
  const { voterType } = useUser();
  const navigate = useNavigate();

  const sections = voterType === 'new'
    ? LEARN_SECTIONS
    : LEARN_SECTIONS.filter(s => s.id !== 'new-voter').concat(LEARN_SECTIONS.filter(s => s.id === 'new-voter'));

  return (
    <div className="page-enter">
      <div className="hero-banner" style={{ background: 'linear-gradient(135deg, #1A304D 0%, #2A9D8F 100%)' }}>
        <p className="label" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>{t('lh_header').toUpperCase()}</p>
        <h1 className="heading-lg" style={{ color: 'white' }}>{t('lh_header')}</h1>
        <p style={{ color: 'rgba(255,255,255,0.75)', marginTop: 8, fontSize: '0.9rem' }}>
          {t('lh_sub')}
        </p>
      </div>

      {/* Main sections */}
      <div style={{ padding: '20px 20px 8px' }}>
        <p className="label" style={{ color: 'var(--text-muted)', marginBottom: 12 }}>{t('learning_paths')}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {sections.map(({ id, Icon, bg, titleKey, subtitleKey, badgeKey, badgeColor, to }) => (
            <button
              key={id}
              onClick={() => navigate(to)}
              style={{ background: 'white', border: '2px solid var(--border)', borderRadius: 16, padding: '16px', textAlign: 'left', cursor: 'pointer', transition: 'var(--transition)', display: 'flex', alignItems: 'center', gap: 16, width: '100%' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--navy)'; e.currentTarget.style.transform = 'translateX(4px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = ''; }}
            >
              <div style={{ width: 52, height: 52, borderRadius: 14, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={24} color="white" strokeWidth={1.75} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1rem', color: 'var(--navy)', letterSpacing: '0.02em' }}>{t(titleKey)}</span>
                  <span style={{ fontSize: '0.58rem', fontWeight: 800, letterSpacing: '0.08em', background: badgeColor, color: 'white', padding: '2px 8px', borderRadius: 10 }}>{t(badgeKey)}</span>
                </div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t(subtitleKey)}</span>
              </div>
              <ChevronRight size={20} color="var(--text-muted)" style={{ flexShrink: 0 }} />
            </button>
          ))}
        </div>
      </div>

      {/* Quick Education Cards */}
      <div style={{ padding: '16px 0 24px' }}>
        <div style={{ padding: '0 20px 12px' }}>
          <p className="label" style={{ color: 'var(--text-muted)' }}>{t('quick_topics')}</p>
        </div>
        <div className="scroll-row">
          {EDUCATION_CARDS.map(({ id, Icon, titleKey, descKey }) => (
            <div key={id}
              style={{ flexShrink: 0, width: 160, background: 'white', borderRadius: 16, padding: '16px', border: '2px solid var(--border)', cursor: 'pointer', transition: 'var(--transition)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--navy)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = ''; }}
            >
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                <Icon size={20} color="var(--navy)" strokeWidth={1.75} />
              </div>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--navy)', marginBottom: 6, letterSpacing: '0.02em' }}>{t(titleKey)}</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{t(descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
