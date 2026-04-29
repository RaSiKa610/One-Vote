import { useState } from 'react';
import { Mic } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import Assistant from '../../pages/Assistant';

export default function AICallAssistant() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* FAB */}
      <button
        className="voice-fab"
        onClick={() => setOpen(true)}
        aria-label={t('tap_to_speak')}
        title={t('ask_ai')}
        style={{
          position: 'fixed',
          bottom: 80, // Above bottom nav
          right: 20,
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #1A304D, #2A9D8F)',
          color: 'white',
          border: 'none',
          boxShadow: '0 4px 16px rgba(42,157,143,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 100,
          transition: 'transform 0.2s ease',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        <Mic size={24} />
      </button>

      {/* Full Screen Call UI */}
      {open && <Assistant onClose={() => setOpen(false)} />}
    </>
  );
}
