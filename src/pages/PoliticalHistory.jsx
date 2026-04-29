import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { POLITICAL_ERAS } from '../data/politicalHistory';
import { Calendar, Users, ExternalLink, Flag } from 'lucide-react';

export default function PoliticalHistory() {
  const { t } = useLanguage();

  return (
    <div style={{ padding: '24px 20px 100px', maxWidth: 600, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.8rem', color: 'var(--navy)', marginBottom: 8, letterSpacing: '-0.02em' }}>
          {t('hist_title')}
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5 }}>
          {t('hist_subtitle')}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 40, position: 'relative' }}>
        {/* Vertical Line for Timeline */}
        <div style={{ position: 'absolute', left: 24, top: 0, bottom: 0, width: 2, background: 'var(--border)' }} />

        {POLITICAL_ERAS.map((era, index) => (
          <div key={era.id} style={{ position: 'relative', paddingLeft: 48 }}>
            
            {/* Timeline Dot */}
            <div style={{ 
              position: 'absolute', left: 16, top: 0, 
              width: 18, height: 18, borderRadius: '50%', 
              background: era.color, border: '4px solid white', 
              boxShadow: '0 0 0 1px var(--border)' 
            }} />

            {/* Era Card */}
            <div style={{ background: 'white', borderRadius: 20, overflow: 'hidden', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border)' }}>
              
              {/* Header */}
              <div style={{ background: `${era.color}15`, padding: '20px 20px 16px', borderBottom: `2px solid ${era.color}30` }}>
                <span style={{ display: 'inline-block', padding: '4px 10px', background: 'white', borderRadius: 12, color: era.color, fontSize: '0.8rem', fontWeight: 700, marginBottom: 12, boxShadow: 'var(--shadow-sm)' }}>
                  {era.yearRange}
                </span>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.3rem', color: 'var(--navy)', lineHeight: 1.3 }}>
                  {t(era.titleKey)}
                </h2>
              </div>

              <div style={{ padding: 20 }}>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 24 }}>
                  {t(era.descKey)}
                </p>

                {/* Parties */}
                {era.parties && era.parties.length > 0 && (
                  <div style={{ marginBottom: 24 }}>
                     <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--teal)', fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                       <Flag size={14} /> Dominant Forces
                     </h3>
                     <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                       {era.parties.map((party, pIdx) => (
                         <div key={pIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, background: 'var(--cream)', padding: 12, borderRadius: 12 }}>
                           <img src={party.symbol} alt="Party Symbol" style={{ width: 40, height: 40, objectFit: 'contain', background: 'white', padding: 4, borderRadius: 8, flexShrink: 0 }} />
                           <div>
                             <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--navy)', marginBottom: 2 }}>{t(party.nameKey)}</h4>
                             <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{t(party.descKey)}</p>
                           </div>
                         </div>
                       ))}
                     </div>
                  </div>
                )}

                {/* Movements */}
                {era.movements && era.movements.length > 0 && (
                  <div style={{ marginBottom: 24 }}>
                     <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#e67e22', fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                       <Users size={14} /> Social Movements
                     </h3>
                     <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                       {era.movements.map((mov, mIdx) => (
                         <div key={mIdx} style={{ borderLeft: `3px solid #e67e22`, paddingLeft: 12 }}>
                           <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--navy)' }}>{t(mov.titleKey)}</h4>
                           <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.4, marginTop: 4 }}>{t(mov.descKey)}</p>
                         </div>
                       ))}
                     </div>
                  </div>
                )}

                {/* Leaders */}
                {era.leaders && era.leaders.length > 0 && (
                  <div>
                    <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--navy)', fontWeight: 700, marginBottom: 16 }}>Key Figures</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                      {era.leaders.map(leader => (
                        <div key={leader.id} style={{ display: 'flex', gap: 16 }}>
                          <div style={{ width: 56, height: 56, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '2px solid var(--cream)' }}>
                            <img src={leader.image} alt={t(leader.nameKey)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                          <div>
                            <h4 style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '1rem' }}>{t(leader.nameKey)}</h4>
                            <span style={{ display: 'inline-block', fontSize: '0.75rem', fontWeight: 600, color: era.color, background: `${era.color}15`, padding: '2px 8px', borderRadius: 8, marginTop: 4, marginBottom: 6 }}>
                              {t(leader.roleKey)}
                            </span>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.4 }}>{t(leader.initKey)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
              
              {/* Footer Links */}
              <div style={{ padding: '12px 20px', background: 'var(--cream)', borderTop: '1px solid var(--border)', textAlign: 'right' }}>
                 <a href={era.wikiUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', fontWeight: 600, color: 'var(--teal)', textDecoration: 'none' }}>
                    {t('hist_btn_read_more')}
                    <ExternalLink size={14} />
                 </a>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
