import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Leaf, CheckSquare, Globe, User, ChevronRight } from 'lucide-react';

const CATEGORIES = [
  { id: 'general',  Icon: User,        titleKey: 'vt_general_title',  descKey: 'vt_general_desc', color: '#1A304D' },
  { id: 'service',  Icon: Leaf,        titleKey: 'vt_service_title',  descKey: 'vt_service_desc', color: '#2A9D8F' },
  { id: 'overseas', Icon: Globe,       titleKey: 'vt_overseas_title', descKey: 'vt_overseas_desc', color: '#E76F51' },
  { id: 'pwd',      Icon: CheckSquare, titleKey: 'vt_pwd_title',      descKey: 'vt_pwd_desc',      color: '#7C3AED' },
];

export default function VoterTypeHub() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="page-enter">
      <div className="hero-banner" style={{ background: 'linear-gradient(135deg, #1A304D 0%, #243d5e 100%)' }}>
        <p className="label" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>{t('voter_types').toUpperCase()}</p>
        <h1 className="heading-lg" style={{ color: 'white' }}>{t('vt_hub_title')}</h1>
        <p style={{ color: 'rgba(255,255,255,0.75)', marginTop: 8, fontSize: '0.9rem' }}>
          {t('vt_hub_sub')}
        </p>
      </div>

      <div style={{ padding: '24px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
          {CATEGORIES.map(({ id, Icon, titleKey, descKey, color }) => (
            <div 
              key={id}
              style={{ background: 'white', borderRadius: 20, border: '2px solid var(--border)', padding: '20px', display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer', transition: 'var(--transition)' }}
              onClick={() => navigate(`/learn/voter-types/${id}`)}
            >
              <div style={{ width: 56, height: 56, borderRadius: 16, background: color + '15', color: color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={28} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--navy)', marginBottom: 4 }}>{t(titleKey)}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{t(descKey)}</p>
              </div>
              <ChevronRight size={20} color="var(--border)" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
