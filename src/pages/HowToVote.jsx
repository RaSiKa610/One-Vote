import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Search, MapPin, CreditCard, UserCheck, Edit3, Monitor, CheckCircle } from 'lucide-react';

const STEPS = [
  { Icon: Search,    titleKey: 'htv_step1' },
  { Icon: MapPin,    titleKey: 'htv_step2' },
  { Icon: CreditCard, titleKey: 'htv_step3' },
  { Icon: UserCheck,  titleKey: 'htv_step4' },
  { Icon: Edit3,      titleKey: 'htv_step5' },
  { Icon: Monitor,    titleKey: 'htv_step6' },
  { Icon: CheckCircle, titleKey: 'htv_step7' },
];

export default function HowToVote() {
  const { t } = useLanguage();

  return (
    <div className="page-enter">
      <div className="hero-banner" style={{ background: 'linear-gradient(135deg, #2A9D8F 0%, #1a7a6e 100%)' }}>
        <p className="label" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>{t('how_to_vote').toUpperCase()}</p>
        <h1 className="heading-lg" style={{ color: 'white' }}>{t('htv_title')}</h1>
        <p style={{ color: 'rgba(255,255,255,0.75)', marginTop: 8, fontSize: '0.9rem' }}>
          {t('htv_sub')}
        </p>
      </div>

      <div style={{ padding: '32px 20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, position: 'relative' }}>
          {/* Vertical Line */}
          <div style={{ position: 'absolute', left: 27, top: 0, bottom: 0, width: 2, background: 'var(--border)', zIndex: 0 }} />
          
          {STEPS.map(({ Icon, titleKey }, index) => (
            <div key={index} style={{ display: 'flex', gap: 20, marginBottom: 32, position: 'relative', zIndex: 1 }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'white', border: '2px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--navy)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                <Icon size={24} />
              </div>
              <div style={{ paddingTop: 8 }}>
                <p className="label" style={{ color: 'var(--teal)', fontSize: '0.7rem', marginBottom: 4 }}>{t('step').toUpperCase()} {index + 1}</p>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.05rem', color: 'var(--navy)', lineHeight: 1.4 }}>{t(titleKey)}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
