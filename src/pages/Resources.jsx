import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Play, BookOpen, Gamepad2, FileText, ExternalLink } from 'lucide-react';

const RESOURCES = [
  { id: 'video', Icon: Play, titleKey: 'edu_evm_title', desc: 'Watch how EVMs and VVPATs work', url: 'https://www.youtube.com/@ECI' },
  { id: 'comic', Icon: BookOpen, titleKey: 'resources_title', desc: 'Read Chacha Chaudhary Voter Comics', url: 'https://ecisveep.nic.in/files/category/115-comics/' },
  { id: 'manual', Icon: FileText, titleKey: 'profile_eci_web', desc: 'SVEEP Manual & BLO E-Patrika', url: 'https://ecisveep.nic.in/files/category/11-publications/' },
  { id: 'games', Icon: Gamepad2, titleKey: 'knowledge_quiz', desc: 'Educational Games by ECI', url: 'https://ecisveep.nic.in/files/category/120-games/' },
];

export default function Resources() {
  const { t } = useLanguage();

  return (
    <div className="page-enter">
      <div className="hero-banner" style={{ background: 'linear-gradient(135deg, #1A304D 0%, #7C3AED 100%)' }}>
        <p className="label" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>{t('resources_title').toUpperCase()}</p>
        <h1 className="heading-lg" style={{ color: 'white' }}>Media Library</h1>
        <p style={{ color: 'rgba(255,255,255,0.75)', marginTop: 8, fontSize: '0.9rem' }}>
          Official voter education materials from ECI
        </p>
      </div>

      <div style={{ padding: '24px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {RESOURCES.map(({ id, Icon, titleKey, desc, url }) => (
            <a 
              key={id}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ background: 'white', borderRadius: 24, border: '2px solid var(--border)', padding: '20px', display: 'flex', flexDirection: 'column', gap: 12, textDecoration: 'none', transition: 'var(--transition)' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--navy)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--cream)', color: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={20} />
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--navy)', marginBottom: 6 }}>{id === 'video' ? 'Video Hub' : (id === 'games' ? 'Literacy Games' : t(titleKey))}</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{desc}</p>
              </div>
              <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.7rem', fontWeight: 700, color: 'var(--teal)' }}>
                OPEN PORTAL <ExternalLink size={10} />
              </div>
            </a>
          ))}
        </div>

        <div style={{ marginTop: 32, textAlign: 'center' }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            All resources are properties of the Election Commission of India.
          </p>
        </div>
      </div>
    </div>
  );
}
