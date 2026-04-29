import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { GOVT_SCHEMES } from '../data/schemes';
import { ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function GovSchemes() {
  const { t } = useLanguage();

  return (
    <div style={{ padding: '24px 20px 100px', maxWidth: 600, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 30 }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.8rem', color: 'var(--navy)', marginBottom: 8, letterSpacing: '-0.02em' }}>
          {t('sch_title')}
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5 }}>
          {t('sch_subtitle')}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {GOVT_SCHEMES.map(scheme => (
          <div key={scheme.id} style={{ background: 'white', borderRadius: 20, padding: 20, boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: `${scheme.iconColor}15`, color: scheme.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <ShieldCheck size={24} />
              </div>
              <div>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.15rem', color: 'var(--navy)', marginBottom: 6 }}>
                  {t(scheme.nameKey)}
                </h2>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6, color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  <CheckCircle2 size={16} color="var(--teal)" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span>{t(scheme.eligKey)}</span>
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.95rem', color: 'var(--navy)', lineHeight: 1.5, marginBottom: 20 }}>
              {t(scheme.infoKey)}
            </p>

            <button 
              onClick={() => window.open(scheme.url, '_blank')}
              style={{ width: '100%', padding: '14px', borderRadius: 12, background: 'var(--cream)', color: 'var(--navy)', border: 'none', fontWeight: 600, fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--navy)'; e.currentTarget.style.color = 'white'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--cream)'; e.currentTarget.style.color = 'var(--navy)'; }}
            >
              {t('sch_btn_apply')}
              <ArrowRight size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
