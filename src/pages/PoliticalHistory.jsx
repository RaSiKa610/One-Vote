import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { POLITICAL_PARTIES } from '../data/politicalHistory';
import { Landmark, Calendar, Star } from 'lucide-react';

export default function PoliticalHistory() {
  const { t } = useLanguage();

  return (
    <div style={{ padding: '24px 20px 100px', maxWidth: 600, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 30 }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.8rem', color: 'var(--navy)', marginBottom: 8, letterSpacing: '-0.02em' }}>
          {t('hist_title')}
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5 }}>
          {t('hist_subtitle')}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {POLITICAL_PARTIES.map(party => (
          <div key={party.id} style={{ background: 'white', borderRadius: 20, padding: 24, boxShadow: 'var(--shadow-sm)', borderTop: `4px solid ${party.color}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: `${party.color}20`, color: party.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Landmark size={24} />
              </div>
              <div>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.2rem', color: 'var(--navy)' }}>{t(party.nameKey)}</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 4 }}>
                  <Calendar size={14} />
                  <span>{t(party.yearsKey)}</span>
                </div>
              </div>
            </div>
            
            <p style={{ fontSize: '0.95rem', color: 'var(--navy)', lineHeight: 1.6, marginBottom: 24, background: 'var(--cream)', padding: 12, borderRadius: 12 }}>
              {t(party.descKey)}
            </p>

            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--navy)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Star size={16} color="var(--orange)" />
              Key Leaders & Initiatives
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {party.leaders.map(leader => (
                <div key={leader.id} style={{ display: 'flex', gap: 16, borderLeft: `2px solid ${party.color}40`, paddingLeft: 16 }}>
                  <div style={{ width: 60, height: 60, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, background: 'var(--cream)' }}>
                    <img src={leader.image} alt={t(leader.nameKey)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '1rem', marginBottom: 2 }}>{t(leader.nameKey)}</h4>
                    <p style={{ color: 'var(--teal)', fontSize: '0.8rem', fontWeight: 600, marginBottom: 6 }}>{t(leader.roleKey)}</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.4 }}>{t(leader.initKey)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
