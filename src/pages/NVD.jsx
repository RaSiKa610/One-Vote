import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Award, Calendar, Share2, CheckCircle2, ChevronRight } from 'lucide-react';

export default function NVD() {
  const { t } = useLanguage();
  const [pledged, setPledged] = useState(() => localStorage.getItem('one_vote_pledged') === 'true');
  const [name, setName] = useState(localStorage.getItem('one_vote_name') || '');

  const handlePledge = () => {
    if (!name.trim()) return;
    localStorage.setItem('one_vote_pledged', 'true');
    localStorage.setItem('one_vote_name', name);
    setPledged(true);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'I took the Voter Pledge!',
        text: `I, ${name}, have taken the Voter Pledge on One Vote to participate in India's democracy!`,
        url: window.location.href,
      }).catch(console.error);
    }
  };

  return (
    <div className="page-enter">
      <div className="hero-banner" style={{ background: 'linear-gradient(135deg, #1A304D 0%, #E76F51 100%)' }}>
        <p className="label" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>{t('nvd_title').toUpperCase()}</p>
        <h1 className="heading-lg" style={{ color: 'white' }}>National Voters' Day</h1>
        <p style={{ color: 'rgba(255,255,255,0.75)', marginTop: 8, fontSize: '0.9rem' }}>
          {t('nvd_sub')}
        </p>
      </div>

      <div style={{ padding: '24px 20px' }}>
        
        {/* Info Card */}
        <div style={{ background: 'var(--cream)', borderRadius: 24, padding: '24px', marginBottom: 24, border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <Award size={24} color="var(--navy)" />
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.2rem', color: 'var(--navy)' }}>{t('nvd_title')}</h2>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {t('nvd_desc')}
          </p>
        </div>

        {/* Pledge Section */}
        <div style={{ background: pledged ? 'linear-gradient(135deg, #2A9D8F, #1a7a6e)' : 'white', borderRadius: 24, padding: '24px', border: pledged ? 'none' : '2px solid var(--border)', transition: 'all 0.4s ease', color: pledged ? 'white' : 'var(--navy)' }}>
          {!pledged ? (
            <>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.3rem', marginBottom: 8 }}>Take the Voter Pledge</h2>
              <p style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: 20 }}>Join millions of Indians in committing to a free and fair democracy.</p>
              
              <div style={{ background: 'var(--bg-app)', padding: '16px', borderRadius: 16, border: '1px solid var(--border)', fontStyle: 'italic', fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 20 }}>
                "We, the citizens of India, having abiding faith in democracy, hereby pledge to uphold the democratic traditions of our country..."
              </div>

              <input 
                type="text" 
                placeholder="Enter your full name" 
                value={name}
                onChange={e => setName(e.target.value)}
                style={{ width: '100%', padding: '14px 16px', borderRadius: 12, border: '2px solid var(--border)', fontSize: '1rem', outline: 'none', marginBottom: 12, transition: 'border-color 0.2s' }}
                onFocus={e => e.target.style.borderColor = 'var(--teal)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
              
              <button 
                className="btn btn-primary btn-full"
                onClick={handlePledge}
                disabled={!name.trim()}
                style={{ opacity: name.trim() ? 1 : 0.6 }}
              >
                Sign the Pledge <ChevronRight size={18} />
              </button>
            </>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <CheckCircle2 size={32} color="white" />
              </div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.5rem', marginBottom: 8 }}>Pledge Taken!</h2>
              <p style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: 24 }}>
                Congratulations, <strong>{name}</strong>! You have successfully committed to India's democratic spirit.
              </p>
              
              <button 
                onClick={handleShare}
                style={{ background: 'white', color: 'var(--teal)', border: 'none', padding: '14px 24px', borderRadius: 16, fontWeight: 700, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: 10, margin: '0 auto', cursor: 'pointer' }}
              >
                <Share2 size={18} /> Share My Pledge
              </button>
            </div>
          )}
        </div>

        {/* ECI Timeline link */}
        <div style={{ marginTop: 24, padding: '16px', borderRadius: 16, border: '1px dashed var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          <Calendar size={16} />
          <span>Next NVD: 25th January, 2025</span>
        </div>

      </div>
    </div>
  );
}
