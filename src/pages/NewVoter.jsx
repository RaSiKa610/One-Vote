import { useLanguage } from '../context/LanguageContext';
import { useVoice } from '../hooks/useVoice';
import { Volume2, VolumeX, ExternalLink, CheckCircle, CreditCard, Building2, Monitor, Calendar, User, ChevronRight } from 'lucide-react';

// Icon components for each step
const STEP_ICONS = [User, CheckCircle, CreditCard, Building2, Monitor, Calendar];

const NEW_VOTER_STEPS = [
  {
    step: 1,
    titleKey: 'step1_title',
    contentKey: 'nv_step1_content',
    highlightKey: 'nv_step1_hl',
  },
  {
    step: 2,
    titleKey: 'step2_title',
    contentKey: 'nv_step2_content',
    highlightKey: 'nv_step2_hl',
    cta: { labelKey: 'nv_step2_cta', url: 'https://voters.eci.gov.in' },
  },
  {
    step: 3,
    titleKey: 'step3_title',
    contentKey: 'nv_step3_content',
    highlightKey: 'nv_step3_hl',
  },
  {
    step: 4,
    titleKey: 'step4_title',
    contentKey: 'nv_step4_content',
    highlightKey: 'nv_step4_hl',
    cta: { labelKey: 'nv_step4_cta', internal: '/find' },
  },
  {
    step: 5,
    titleKey: 'step5_title',
    contentKey: 'nv_step5_content',
    highlightKey: 'nv_step5_hl',
  },
  {
    step: 6,
    titleKey: 'step6_title',
    contentKey: 'nv_step6_content',
    highlightKey: 'nv_step6_hl',
  },
];

export default function NewVoter() {
  const { t } = useLanguage();
  const { speak, stopSpeaking, isSpeaking } = useVoice();

  const handleReadAloud = (step) => {
    if (isSpeaking) { stopSpeaking(); return; }
    speak(`${step.title}. ${step.content}`);
  };

  return (
    <div className="page-enter">
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #2A9D8F 0%, #1A304D 100%)', padding: '28px 20px 24px', color: 'white' }}>
        <span style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.12em', background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: 20 }}>{t('new_voter_guide').toUpperCase()}</span>
        <h1 className="heading-lg" style={{ color: 'white', marginTop: 10 }}>{t('nv_header')}</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: 8, fontSize: '0.9rem' }}>
          {t('nv_sub')}
        </p>
        <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
          {['6 Steps', 'Audio Available', 'Works Offline'].map((tag, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 10, padding: '8px 12px', fontSize: '0.75rem', fontWeight: 600 }}>
              {tag}
            </div>
          ))}
        </div>
      </div>

      {/* Steps */}
      <div style={{ padding: '20px' }}>
        {NEW_VOTER_STEPS.map((step, i) => {
          const StepIcon = STEP_ICONS[i] || User;
          return (
            <div key={step.step} style={{ marginBottom: 16 }}>
              <div style={{ background: 'white', borderRadius: 20, border: '2px solid var(--border)', overflow: 'hidden' }}>
                {/* Step header */}
                <div style={{ padding: '18px 18px 0', display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <StepIcon size={22} color="white" strokeWidth={1.75} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--teal)', letterSpacing: '0.1em' }}>STEP {step.step}</span>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.2rem', color: 'var(--navy)', marginTop: 2, letterSpacing: '0.02em' }}>{t(step.titleKey)}</h2>
                  </div>
                  <button
                    onClick={() => handleReadAloud({ title: t(step.titleKey), content: t(step.contentKey) })}
                    style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--cream)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                    aria-label={isSpeaking ? t('stop_reading') : t('read_aloud')}
                  >
                    {isSpeaking ? <VolumeX size={16} color="var(--red)" /> : <Volume2 size={16} color="var(--navy)" />}
                  </button>
                </div>

                {/* Content */}
                <div style={{ padding: '14px 18px' }}>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                    {t(step.contentKey)}
                  </p>
                </div>

                {/* Highlight */}
                <div style={{ margin: '0 18px 18px', background: 'rgba(42,157,143,0.07)', border: '1px solid rgba(42,157,143,0.2)', borderRadius: 12, padding: '12px 14px', display: 'flex', gap: 10 }}>
                  <CheckCircle size={16} color="var(--teal)" style={{ flexShrink: 0, marginTop: 2 }} />
                  <p style={{ fontSize: '0.82rem', color: 'var(--teal)', fontWeight: 600, lineHeight: 1.5 }}>{t(step.highlightKey)}</p>
                </div>

                {/* CTA */}
                {step.cta && (
                  <div style={{ padding: '0 18px 18px' }}>
                    {step.cta.url ? (
                      <a href={step.cta.url} target="_blank" rel="noopener noreferrer"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--navy)', color: 'white', padding: '11px 20px', borderRadius: 12, fontSize: '0.85rem', fontWeight: 700 }}>
                        {t(step.cta.labelKey)} <ExternalLink size={14} />
                      </a>
                    ) : (
                      <a href={step.cta.internal}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--teal)', color: 'white', padding: '11px 20px', borderRadius: 12, fontSize: '0.85rem', fontWeight: 700 }}>
                        {t(step.cta.labelKey)} <ChevronRight size={14} />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
