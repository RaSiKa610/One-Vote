import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { Check, ClipboardList, CreditCard, Search, MapPin, Users, IdCard, Calendar, Fingerprint, Printer, Ban } from 'lucide-react';

const CHECKLIST_ITEMS = [
  { id: 'register',     Icon: ClipboardList,  titleKey: 'chk_title_register',          descKey: 'chk_desc_register',                  priority: 1 },
  { id: 'voter_id',     Icon: CreditCard,     titleKey: 'chk_title_epic',     descKey: 'chk_desc_epic',                priority: 1 },
  { id: 'check_roll',   Icon: Search,         titleKey: 'chk_title_roll',         descKey: 'chk_desc_roll',                               priority: 1 },
  { id: 'find_booth',   Icon: MapPin,         titleKey: 'chk_title_booth',      descKey: 'chk_desc_booth',                       priority: 2 },
  { id: 'know_candidate', Icon: Users,        titleKey: 'chk_title_cand',         descKey: 'chk_desc_cand',                      priority: 2 },
  { id: 'valid_id',     Icon: IdCard,         titleKey: 'chk_title_id',       descKey: 'chk_desc_id',                               priority: 2 },
  { id: 'election_day', Icon: Calendar,       titleKey: 'chk_title_time',     descKey: 'chk_desc_time',                        priority: 3 },
  { id: 'ink',          Icon: Fingerprint,    titleKey: 'chk_title_ink',     descKey: 'chk_desc_ink',          priority: 3 },
  { id: 'vvpat',        Icon: Printer,        titleKey: 'chk_title_vvpat',             descKey: 'chk_desc_vvpat',                       priority: 3 },
  { id: 'nota',         Icon: Ban,            titleKey: 'chk_title_nota',              descKey: 'chk_desc_nota',               priority: 3 },
];

const PRIORITY_LABELS = {
  1: { labelKey: 'pri1_label',          dot: 'var(--red)' },
  2: { labelKey: 'pri2_label', dot: '#D4A017' },
  3: { labelKey: 'pri3_label',                  dot: 'var(--teal)' },
};

export default function VoterChecklist() {
  const { t } = useLanguage();
  const { checklist, toggleChecklist, checklistProgress } = useUser();
  const done = checklist.filter(i => i.done).length;

  return (
    <div className="page-enter">
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #27ae60, #1e8449)', padding: '28px 20px 24px', color: 'white' }}>
        <span style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.12em', background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: 20 }}>{t('checklist_title').toUpperCase()}</span>
        <h1 className="heading-lg" style={{ color: 'white', marginTop: 10 }}>{t('pre_vote_checklist')}</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: 8, fontSize: '0.9rem' }}>{t('complete_before')}</p>
        <div style={{ marginTop: 20, background: 'rgba(255,255,255,0.15)', borderRadius: 12, padding: '14px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{done} of {checklist.length} completed</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{checklistProgress}%</span>
          </div>
          <div style={{ height: 8, background: 'rgba(255,255,255,0.2)', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${checklistProgress}%`, background: 'white', borderRadius: 4, transition: 'width 0.6s ease' }} />
          </div>
        </div>
      </div>

      {/* Items */}
      <div style={{ padding: '20px' }}>
        {[1, 2, 3].map(priority => {
          const { labelKey, dot } = PRIORITY_LABELS[priority];
          const items = CHECKLIST_ITEMS.filter(i => i.priority === priority);

          return (
            <div key={priority} style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: dot, flexShrink: 0 }} />
                <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{t(labelKey)}</p>
              </div>

              {items.map(item => {
                const state = checklist.find(c => c.id === item.id);
                const isDone = state?.done;
                const { Icon } = item;
                return (
                  <button
                    key={item.id}
                    onClick={() => toggleChecklist(item.id)}
                    style={{ width: '100%', display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 16px', background: isDone ? 'rgba(39,174,96,0.05)' : 'white', border: `2px solid ${isDone ? 'var(--teal)' : 'var(--border)'}`, borderRadius: 16, marginBottom: 10, cursor: 'pointer', transition: 'var(--transition)', textAlign: 'left' }}
                    aria-pressed={isDone}
                    aria-label={item.title}
                  >
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: isDone ? 'rgba(42,157,143,0.12)' : 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={18} color={isDone ? 'var(--teal)' : 'var(--navy)'} strokeWidth={1.75} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.95rem', color: isDone ? 'var(--teal)' : 'var(--navy)', textDecoration: isDone ? 'line-through' : 'none', opacity: isDone ? 0.75 : 1, letterSpacing: '0.02em' }}>
                        {t(item.titleKey)}
                      </p>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 3, lineHeight: 1.5 }}>{t(item.descKey)}</p>
                    </div>
                    <div style={{ width: 26, height: 26, borderRadius: '50%', border: `2px solid ${isDone ? 'var(--teal)' : 'var(--border)'}`, background: isDone ? 'var(--teal)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 4 }}>
                      {isDone && <Check size={13} color="white" strokeWidth={3} />}
                    </div>
                  </button>
                );
              })}
            </div>
          );
        })}

        {checklistProgress === 100 && (
          <div style={{ background: 'linear-gradient(135deg, #27ae60, #1e8449)', borderRadius: 20, padding: '28px 24px', textAlign: 'center', color: 'white' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Check size={32} color="white" strokeWidth={2.5} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.3rem', marginBottom: 8, letterSpacing: '0.02em' }}>{t('ready_to_vote')}</h3>
            <p style={{ fontSize: '0.875rem', opacity: 0.9, lineHeight: 1.6 }}>
              {t('ready_to_vote_desc')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
