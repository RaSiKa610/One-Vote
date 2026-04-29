import { useLanguage } from '../context/LanguageContext';
import { useVoice } from '../hooks/useVoice';
import { Volume2, VolumeX, Megaphone, FileText, Search, RotateCcw, Mic, BarChart2, Users, CheckCircle, Flag, Handshake } from 'lucide-react';

const STEP_ICONS = [
  Megaphone, FileText, Search, FileText, Search, RotateCcw,
  Mic, BarChart2, BarChart2, Flag, Handshake
];

const TIMELINE_STEPS = [
  { n: 1,  titleKey: 'tl1_title',      descKey: 'tl1_desc' },
  { n: 2,  titleKey: 'tl2_title',       descKey: 'tl2_desc' },
  { n: 3,  titleKey: 'tl3_title',      descKey: 'tl3_desc' },
  { n: 4,  titleKey: 'tl4_title',       descKey: 'tl4_desc' },
  { n: 5,  titleKey: 'tl5_title',     descKey: 'tl5_desc' },
  { n: 6,  titleKey: 'tl6_title',   descKey: 'tl6_desc' },
  { n: 7,  titleKey: 'tl7_title',              descKey: 'tl7_desc' },
  { n: 8,  titleKey: 'tl8_title',                  descKey: 'tl8_desc' },
  { n: 9,  titleKey: 'tl9_title',               descKey: 'tl9_desc' },
  { n: 10, titleKey: 'tl10_title',      descKey: 'tl10_desc' },
  { n: 11, titleKey: 'tl11_title',         descKey: 'tl11_desc' },
];

export default function ElectionProcess() {
  const { t } = useLanguage();
  const { speak, stopSpeaking, isSpeaking } = useVoice();

  return (
    <div className="page-enter">
      <div style={{ background: 'linear-gradient(135deg, #1A304D, #243d5e)', padding: '28px 20px 24px', color: 'white' }}>
        <span style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.12em', background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: 20 }}>{t('election_process').toUpperCase()}</span>
        <h1 className="heading-lg" style={{ color: 'white', marginTop: 10 }}>{t('ep_header')}</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: 8, fontSize: '0.9rem' }}>
          {t('ep_sub')}
        </p>
      </div>

      <div style={{ padding: '20px' }}>
        {TIMELINE_STEPS.map((step, i) => {
          const StepIcon = STEP_ICONS[i] || FileText;
          const isPollingDay = i === 7;
          return (
            <div key={step.n} style={{ display: 'flex', gap: 16, marginBottom: 8 }}>
              {/* Dot + line */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: isPollingDay ? 'var(--red)' : 'var(--navy)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(26,48,77,0.25)', zIndex: 1, flexShrink: 0,
                }}>
                  <StepIcon size={18} color="white" strokeWidth={1.75} />
                </div>
                {i < TIMELINE_STEPS.length - 1 && (
                  <div style={{ width: 2, flex: 1, background: 'linear-gradient(to bottom, var(--navy), var(--border))', margin: '4px 0' }} />
                )}
              </div>

              {/* Content */}
              <div style={{ flex: 1, paddingBottom: 16 }}>
                <div style={{ background: 'white', borderRadius: 16, border: `2px solid ${isPollingDay ? 'var(--red)' : 'var(--border)'}`, padding: '14px 16px', marginTop: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                    <div>
                      <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.1em' }}>STEP {step.n}</span>
                      <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.05rem', color: isPollingDay ? 'var(--red)' : 'var(--navy)', letterSpacing: '0.02em' }}>{t(step.titleKey)}</h3>
                    </div>
                    <button
                      onClick={() => isSpeaking ? stopSpeaking() : speak(`${t(step.titleKey)}. ${t(step.descKey)}`)}
                      style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--cream)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                      aria-label="Read aloud"
                    >
                      {isSpeaking ? <VolumeX size={14} color="var(--red)" /> : <Volume2 size={14} color="var(--navy)" />}
                    </button>
                  </div>
                  <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t(step.descKey)}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* FPTP explanation */}
      <div style={{ margin: '0 20px 32px', background: 'var(--cream)', borderRadius: 16, padding: '20px', border: '1px solid var(--border)' }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--navy)', marginBottom: 10, fontSize: '1.2rem', letterSpacing: '0.02em' }}>{t('fptp_title')}</h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t('fptp_desc')}
        </p>
      </div>
    </div>
  );
}
