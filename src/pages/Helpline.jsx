import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Phone, ShieldAlert, FileText, Smartphone, ExternalLink, ChevronRight } from 'lucide-react';

const HELPLINES = [
  { 
    id: '1950', 
    Icon: Phone, 
    titleKey: 'helpline_title', 
    desc: 'Voter Helpline Number (Toll Free)', 
    action: 'tel:1950', 
    color: '#2A9D8F' 
  },
  { 
    id: 'cvigil', 
    Icon: ShieldAlert, 
    titleKey: 'cvigil_title', 
    desc: 'Report Model Code of Conduct violations', 
    action: 'https://cvigil.eci.gov.in', 
    color: '#E76F51' 
  },
  { 
    id: 'ngsp', 
    Icon: FileText, 
    titleKey: 'profile_eci_reg', 
    desc: 'National Grievance Services Portal', 
    action: 'https://voters.eci.gov.in', 
    color: '#1A304D' 
  },
  { 
    id: 'app', 
    Icon: Smartphone, 
    titleKey: 'ast_assistant_name', 
    desc: 'Download ECI Voter Helpline App', 
    action: 'https://play.google.com/store/apps/details?id=com.eci.citizen', 
    color: '#7C3AED' 
  },
];

export default function Helpline() {
  const { t } = useLanguage();

  return (
    <div className="page-enter">
      <div className="hero-banner" style={{ background: 'linear-gradient(135deg, #E76F51 0%, #C0392B 100%)' }}>
        <p className="label" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>{t('helpline_title').toUpperCase()}</p>
        <h1 className="heading-lg" style={{ color: 'white' }}>Support & Grievances</h1>
        <p style={{ color: 'rgba(255,255,255,0.75)', marginTop: 8, fontSize: '0.9rem' }}>
          Official contact points for every Indian voter
        </p>
      </div>

      <div style={{ padding: '24px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
          {HELPLINES.map(({ id, Icon, titleKey, desc, action, color }) => (
            <a 
              key={id}
              href={action}
              target={action.startsWith('tel') ? '_self' : '_blank'}
              rel="noopener noreferrer"
              style={{ background: 'white', borderRadius: 20, border: '2px solid var(--border)', padding: '20px', display: 'flex', alignItems: 'center', gap: 16, textDecoration: 'none', transition: 'var(--transition)' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = color}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              <div style={{ width: 56, height: 56, borderRadius: 16, background: color + '15', color: color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={28} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--navy)', marginBottom: 4 }}>
                  {id === '1950' ? 'Call 1950' : t(titleKey)}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{desc}</p>
              </div>
              {action.startsWith('http') ? <ExternalLink size={18} color="var(--border)" /> : <ChevronRight size={20} color="var(--border)" />}
            </a>
          ))}
        </div>

        <div style={{ marginTop: 32, padding: '24px', background: 'var(--navy)', borderRadius: 24, color: 'white' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.2rem', marginBottom: 12 }}>Emergency Protocol</h2>
          <p style={{ fontSize: '0.85rem', opacity: 0.8, lineHeight: 1.6, marginBottom: 20 }}>
            If you face physical obstruction or threats at a polling booth, contact the Presiding Officer immediately or call the 1950 helpline.
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ padding: '8px 12px', background: 'rgba(255,255,255,0.1)', borderRadius: 10, fontSize: '0.75rem', fontWeight: 600 }}>24/7 Monitoring</div>
            <div style={{ padding: '8px 12px', background: 'rgba(255,255,255,0.1)', borderRadius: 10, fontSize: '0.75rem', fontWeight: 600 }}>Toll Free</div>
          </div>
        </div>
      </div>
    </div>
  );
}
