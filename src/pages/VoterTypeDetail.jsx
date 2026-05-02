import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { User, Leaf, Globe, CheckSquare, ArrowLeft, ExternalLink, Info, FileText, Phone } from 'lucide-react';

const DETAILS = {
  general: {
    icon: User,
    color: '#1A304D',
    sections: [
      { titleKey: 'vt_gen_eligibility', contentKey: 'vt_general_long' },
      { titleKey: 'vt_reg_online', contentKey: 'vt_gen_forms', links: [
        { label: 'NVSP Portal', url: 'https://www.nvsp.in/' },
        { label: 'Voter Portal', url: 'https://voterportal.eci.gov.in/' }
      ]},
      { titleKey: 'vt_offline_title', contentKey: 'vt_gen_offline' }
    ]
  },
  service: {
    icon: Leaf,
    color: '#2A9D8F',
    sections: [
      { titleKey: 'service_voters', contentKey: 'vt_service_eligibility' },
      { titleKey: 'how_to_enroll', contentKey: 'vt_service_forms', links: [
        { label: 'Download Forms (2, 2A, 3)', url: 'https://eci.gov.in/forms/categories/voter-registration-forms/' }
      ]},
      { titleKey: 'vt_proxy_title', contentKey: 'vt_proxy_desc', links: [
        { label: 'Form 13F (Proxy Appointment)', url: 'https://eci.gov.in/forms/categories/voter-registration-forms/' }
      ]},
      { titleKey: 'ETPBS', contentKey: 'vt_service_etpbs' }
    ]
  },
  overseas: {
    icon: Globe,
    color: '#E76F51',
    sections: [
      { titleKey: 'overseas_electors', contentKey: 'vt_overseas_eligibility' },
      { titleKey: 'how_to_enroll', contentKey: 'vt_overseas_long', links: [
        { label: 'Form 6A Online', url: 'https://voterportal.eci.gov.in/' },
        { label: 'Download Forms', url: 'https://eci.gov.in/forms/categories/voter-registration-forms/' }
      ]},
      { titleKey: 'documents_required', contentKey: 'vt_overseas_docs' },
      { titleKey: 'how_to_vote', contentKey: 'vt_overseas_vote' }
    ]
  },
  pwd: {
    icon: CheckSquare,
    color: '#7C3AED',
    sections: [
      { titleKey: 'pwd_electors', contentKey: 'vt_pwd_eligibility' },
      { titleKey: 'how_to_enroll', contentKey: 'vt_pwd_form', links: [
        { label: 'Register Online (NVSP)', url: 'https://www.nvsp.in/' }
      ]},
      { titleKey: 'facilitation', contentKey: 'vt_pwd_facilitation' }
    ]
  }
};

export default function VoterTypeDetail() {
  const { type } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const data = DETAILS[type];

  if (!data) return null;

  const Icon = data.icon;

  return (
    <div className="page-enter">
      <div className="hero-banner" style={{ background: `linear-gradient(135deg, ${data.color} 0%, #1A304D 100%)`, padding: '40px 20px 24px' }}>
        <button 
          onClick={() => navigate(-1)}
          style={{ position: 'absolute', top: 20, left: 16, color: 'white', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', fontWeight: 600 }}
        >
          <ArrowLeft size={18} /> {t('back').toUpperCase()}
        </button>
        
        <div style={{ width: 64, height: 64, borderRadius: 20, background: 'rgba(255,255,255,0.2)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
          <Icon size={32} />
        </div>
        <h1 className="heading-lg" style={{ color: 'white' }}>{t(`vt_${type}_title`)}</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: 8, fontSize: '0.95rem' }}>
          {t(`vt_${type}_desc`)}
        </p>
      </div>

      <div style={{ padding: '24px 20px' }}>
        {data.sections.map((section, idx) => (
          <div key={idx} style={{ background: 'white', borderRadius: 24, border: '2px solid var(--border)', padding: '24px', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: data.color + '15', color: data.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Info size={16} />
              </div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1rem', color: 'var(--navy)' }}>
                {t(section.titleKey) === section.titleKey ? section.titleKey : t(section.titleKey)}
              </h2>
            </div>
            
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: section.links ? 16 : 0 }}>
              {t(section.contentKey)}
            </p>

            {section.links && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {section.links.map((link, lIdx) => (
                  <a 
                    key={lIdx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ background: 'var(--bg-app)', padding: '12px 16px', borderRadius: 12, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                  >
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--navy)' }}>{link.label}</span>
                    <ExternalLink size={14} color="var(--text-muted)" />
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}

        <div style={{ padding: '20px', textAlign: 'center', border: '1px dashed var(--border)', borderRadius: 20 }}>
          <Phone size={24} color="var(--red)" style={{ marginBottom: 8 }} />
          <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--navy)' }}>Need help? Call ECI Helpline</p>
          <p style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--red)', marginTop: 4 }}>1950</p>
        </div>
      </div>
    </div>
  );
}
