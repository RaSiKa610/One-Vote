import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { ChevronRight, Leaf, Landmark, CheckSquare, Scale, Brain, Monitor, Printer, Ban, FileText, Map } from 'lucide-react';

const LEARN_SECTIONS = [
  {
    id: 'new-voter',
    Icon: Leaf,
    bg: 'linear-gradient(135deg, #2A9D8F, #1a7a6e)',
    title: 'New Voter Guide',
    subtitle: "First time voting? Start here",
    badge: 'START HERE',
    badgeColor: 'var(--teal)',
    to: '/learn/new-voter',
    forNew: true,
  },
  {
    id: 'election-process',
    Icon: Landmark,
    bg: 'linear-gradient(135deg, #1A304D, #243d5e)',
    title: 'Election Process',
    subtitle: "How India's democracy works step by step",
    badge: 'MUST READ',
    badgeColor: 'var(--navy)',
    to: '/learn/election-process',
    forNew: false,
  },
  {
    id: 'checklist',
    Icon: CheckSquare,
    bg: 'linear-gradient(135deg, #27ae60, #1e8449)',
    title: 'Voter Checklist',
    subtitle: 'Track your journey before election day',
    badge: 'INTERACTIVE',
    badgeColor: '#27ae60',
    to: '/learn/checklist',
    forNew: false,
  },
  {
    id: 'rights',
    Icon: Scale,
    bg: 'linear-gradient(135deg, #7c3aed, #5b21b6)',
    title: 'Voter Rights & Duties',
    subtitle: 'Know your constitutional rights',
    badge: 'IMPORTANT',
    badgeColor: '#7c3aed',
    to: '/learn/checklist',
    forNew: false,
  },
  {
    id: 'quiz',
    Icon: Brain,
    bg: 'linear-gradient(135deg, #C0392B, #922b21)',
    title: 'Knowledge Quiz',
    subtitle: "Test what you've learned",
    badge: 'FUN',
    badgeColor: 'var(--red)',
    to: '/learn/quiz',
    forNew: false,
  },
];

const EDUCATION_CARDS = [
  { id: 'evm',          Icon: Monitor,      title: 'What is EVM?',             desc: "Electronic Voting Machines — how they work and why they're secure." },
  { id: 'vvpat',        Icon: Printer,      title: 'VVPAT System',             desc: 'Voter Verified Paper Audit Trail — your vote receipt explained.' },
  { id: 'nota',         Icon: Ban,          title: 'NOTA Option',              desc: 'None Of The Above — your right to reject all candidates.' },
  { id: 'mcc',          Icon: FileText,     title: 'Model Code of Conduct',    desc: 'Rules all parties and candidates must follow during elections.' },
  { id: 'eci',          Icon: Landmark,     title: 'Role of ECI',              desc: "The Election Commission of India — guardian of free and fair elections." },
  { id: 'constituency', Icon: Map,          title: 'Constituency System',      desc: 'How India is divided into Lok Sabha and Vidhan Sabha seats.' },
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
        <p className="label" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>YOUR EDUCATION HUB</p>
        <h1 className="heading-lg" style={{ color: 'white' }}>Learn & Grow</h1>
        <p style={{ color: 'rgba(255,255,255,0.75)', marginTop: 8, fontSize: '0.9rem' }}>
          Everything a voter needs to know, in your language
        </p>
      </div>

      {/* Main sections */}
      <div style={{ padding: '20px 20px 8px' }}>
        <p className="label" style={{ color: 'var(--text-muted)', marginBottom: 12 }}>LEARNING PATHS</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {sections.map(({ id, Icon, bg, title, subtitle, badge, badgeColor, to }) => (
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
                  <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1rem', color: 'var(--navy)', letterSpacing: '0.02em' }}>{title}</span>
                  <span style={{ fontSize: '0.58rem', fontWeight: 800, letterSpacing: '0.08em', background: badgeColor, color: 'white', padding: '2px 8px', borderRadius: 10 }}>{badge}</span>
                </div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{subtitle}</span>
              </div>
              <ChevronRight size={20} color="var(--text-muted)" style={{ flexShrink: 0 }} />
            </button>
          ))}
        </div>
      </div>

      {/* Quick Education Cards */}
      <div style={{ padding: '16px 0 24px' }}>
        <div style={{ padding: '0 20px 12px' }}>
          <p className="label" style={{ color: 'var(--text-muted)' }}>QUICK TOPICS</p>
        </div>
        <div className="scroll-row">
          {EDUCATION_CARDS.map(({ id, Icon, title, desc }) => (
            <div key={id}
              style={{ flexShrink: 0, width: 160, background: 'white', borderRadius: 16, padding: '16px', border: '2px solid var(--border)', cursor: 'pointer', transition: 'var(--transition)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--navy)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = ''; }}
            >
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                <Icon size={20} color="var(--navy)" strokeWidth={1.75} />
              </div>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--navy)', marginBottom: 6, letterSpacing: '0.02em' }}>{title}</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
