import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { School, GraduationCap, Users, Landmark, ChevronRight } from 'lucide-react';

const CLUBS = [
  { id: 'school',  Icon: School,        titleKey: 'elc_title',     desc: 'For students aged 14-17 (Future Voters)', url: 'https://ecisveep.nic.in/electoral-literacy-clubs/' },
  { id: 'college', Icon: GraduationCap, titleKey: 'elc_title',     desc: 'For students aged 18-21 (New Voters)', url: 'https://ecisveep.nic.in/electoral-literacy-clubs/' },
  { id: 'rural',   Icon: Users,         titleKey: 'rural_title',   desc: 'Chunav Pathshala community awareness', url: 'https://ecisveep.nic.in/chunav-pathshala/' },
  { id: 'work',    Icon: Landmark,      titleKey: 'vaf_title',     desc: 'Awareness forums for employees', url: 'https://ecisveep.nic.in/electoral-literacy-clubs/' },
];

const COLORS = ['#2A9D8F', '#1A304D', '#E76F51', '#7C3AED'];

export default function ELC() {
  const { t } = useLanguage();

  return (
    <div className="page-enter">
      <div className="hero-banner" style={{ background: 'linear-gradient(135deg, #1A304D 0%, #2A9D8F 100%)' }}>
        <p className="label" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>{t('elc_title').toUpperCase()}</p>
        <h1 className="heading-lg" style={{ color: 'white' }}>Literacy Clubs</h1>
        <p style={{ color: 'rgba(255,255,255,0.75)', marginTop: 8, fontSize: '0.9rem' }}>
          Engaging future and new voters through participation
        </p>
      </div>

      <div style={{ padding: '24px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
          {CLUBS.map(({ id, Icon, titleKey, desc, url }, index) => (
            <div 
              key={id}
              style={{ background: 'white', borderRadius: 20, border: '2px solid var(--border)', padding: '20px', display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer', transition: 'var(--transition)' }}
              onClick={() => window.open(url, '_blank')}
            >
              <div style={{ width: 56, height: 56, borderRadius: 16, background: COLORS[index] + '15', color: COLORS[index], display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={28} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1rem', color: 'var(--navy)', marginBottom: 4 }}>{id === 'rural' ? 'Chunav Pathshala' : (id === 'work' ? t('vaf_title') : (id === 'school' ? 'School ELC' : 'College ELC'))}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{desc}</p>
              </div>
              <ChevronRight size={20} color="var(--border)" />
            </div>
          ))}
        </div>

        <div style={{ marginTop: 24, padding: '24px', background: 'var(--cream)', borderRadius: 24, border: '1px solid var(--border)' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--navy)', marginBottom: 12 }}>{t('vaf_title')}</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 16 }}>
            {t('vaf_desc')}
          </p>
          <div style={{ padding: '12px', background: 'white', borderRadius: 12, marginBottom: 10 }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--navy)', marginBottom: 4 }}>MEMBERSHIP</p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t('vaf_members')}</p>
          </div>
          <div style={{ padding: '12px', background: 'white', borderRadius: 12 }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--navy)', marginBottom: 4 }}>ACTIVITIES</p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t('vaf_activities')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
