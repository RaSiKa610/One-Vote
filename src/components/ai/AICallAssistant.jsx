import { useState, useCallback, useRef } from 'react';
import { Mic, MicOff, X, Send, MessageSquare } from 'lucide-react';
import { useVoice } from '../../hooks/useVoice';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

const VOICE_RESPONSES = {
  register: {
    keywords: ['register', 'registration', 'panjikaran', 'enroll'],
    response_en: 'To register as a voter, visit the official ECI portal at voters.eci.gov.in. You need to be 18 years or older and an Indian citizen.',
    response_hi: 'Matdata ke roop mein panjikaran ke liye, voters.eci.gov.in par jaayein. Aapki umra 18 varsh ya adhik honi chahiye.',
    route: '/learn/new-voter'
  },
  booth: {
    keywords: ['booth', 'polling', 'station', 'find', 'kahan', 'khandhi'],
    response_en: 'I will help you find your polling booth. Go to the Find section to locate your nearest polling station.',
    response_hi: 'Main aapko matdan kendra khojne mein madad karunga. Apna nikatam matdan kendra khojne ke liye khojein section par jaayein.',
    route: '/find'
  },
  vote: {
    keywords: ['vote', 'voting', 'how to vote', 'evm', 'ballot', 'matdan'],
    response_en: 'Voting is simple. Go to your polling booth with valid ID, press the button next to your chosen candidate on the EVM, and you are done!',
    response_hi: 'Matdan karna aasaan hai. Valid pehchaan patra ke saath matdan kendra jaayein, EVM par apne pasandida umeedwaar ke button ko dabaayein.',
    route: '/learn/election-process'
  },
  eligible: {
    keywords: ['eligible', 'eligibility', 'age', 'qualify', 'criteria'],
    response_en: 'You are eligible to vote if you are an Indian citizen, 18 years or older, and registered in the electoral roll.',
    response_hi: 'Aap matdan ke patra hain yadi aap Bharatiya nagarik hain, 18 varsh ya adhik hain, aur matdata soochi mein panjikrit hain.',
    route: '/learn/new-voter'
  },
  nota: {
    keywords: ['nota', 'none of the above', 'reject'],
    response_en: 'NOTA stands for None Of The Above. It allows you to reject all candidates while still participating in the election.',
    response_hi: 'NOTA ka arth hai "None Of The Above". Yah aapko sabhi umeedwaaron ko asvikaar karne ki anumati deta hai.',
    route: '/learn'
  },
};

function findResponse(text, langCode) {
  const lower = text.toLowerCase();
  for (const key in VOICE_RESPONSES) {
    const entry = VOICE_RESPONSES[key];
    if (entry.keywords.some(kw => lower.includes(kw))) {
      return {
        text: langCode === 'hi' ? entry.response_hi : entry.response_en,
        route: entry.route
      };
    }
  }
  return {
    text: langCode === 'hi'
      ? 'Mujhe samajh nahin aaya. Kripya phir se poochhein. Aap matdan, panjikaran, ya matdan kendra ke baare mein poochh sakte hain.'
      : 'I did not understand. Please ask again. You can ask about voting, registration, or finding your polling booth.',
    route: null
  };
}

export default function AICallAssistant() {
  const { t, langCode } = useLanguage();
  const { speak, isSpeaking, stopSpeaking, listen, isListening } = useVoice();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [textInput, setTextInput] = useState('');

  const handleListen = useCallback(() => {
    if (isListening) return;
    setTranscript('');
    setResponse('');
    listen(
      (text) => {
        setTranscript(text);
        const res = findResponse(text, langCode);
        setResponse(res.text);
        speak(res.text);
        if (res.route) setTimeout(() => { navigate(res.route); setOpen(false); }, 3500);
      },
      () => {}
    );
  }, [isListening, listen, speak, langCode, navigate]);

  const handleTextSubmit = useCallback(() => {
    if (!textInput.trim()) return;
    setTranscript(textInput);
    const res = findResponse(textInput, langCode);
    setResponse(res.text);
    speak(res.text);
    setTextInput('');
    if (res.route) setTimeout(() => { navigate(res.route); setOpen(false); }, 3500);
  }, [textInput, langCode, speak, navigate]);

  return (
    <>
      {/* FAB */}
      <button
        className={`voice-fab${isListening ? ' listening' : ''}`}
        onClick={() => setOpen(true)}
        aria-label={t('tap_to_speak')}
        title={t('ask_ai')}
      >
        <Mic size={26} />
      </button>

      {/* Modal */}
      {open && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 200, display: 'flex', alignItems: 'flex-end', backdropFilter: 'blur(4px)' }}
          onClick={(e) => { if (e.target === e.currentTarget) { setOpen(false); stopSpeaking(); } }}
        >
          <div style={{ background: 'white', borderRadius: '28px 28px 0 0', width: '100%', maxWidth: 430, margin: '0 auto', padding: '24px 20px 40px', animation: 'pageIn 0.3s ease' }}>

            {/* Header */}
            <div className="flex items-center justify-between mb-16">
              <div>
                <p className="label" style={{ color: 'var(--red)', marginBottom: 4 }}>AI ASSISTANT</p>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.3rem', color: 'var(--navy)', letterSpacing: '0.02em' }}>{t('ask_ai')}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 2 }}>{t('ai_subtitle')}</p>
              </div>
              <button className="icon-btn" onClick={() => { setOpen(false); stopSpeaking(); }} aria-label={t('close')}>
                <X size={22} />
              </button>
            </div>

            {/* Mic */}
            <div style={{ textAlign: 'center', padding: '12px 0 20px' }}>
              <button
                onClick={handleListen}
                disabled={isSpeaking}
                style={{ width: 88, height: 88, borderRadius: '50%', background: isListening ? 'linear-gradient(135deg, #e74c3c, #c0392b)' : 'linear-gradient(135deg, var(--navy), var(--navy-light))', color: 'white', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxShadow: isListening ? '0 0 0 16px rgba(192,57,43,0.15)' : 'var(--shadow-md)', transition: 'var(--transition)' }}
                aria-label={isListening ? t('listening') : t('tap_to_speak')}
              >
                {isListening ? <MicOff size={32} /> : <Mic size={32} />}
              </button>
              <p style={{ marginTop: 12, fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                {isListening ? t('listening') : t('tap_to_speak')}
              </p>
            </div>

            {/* Transcript */}
            {transcript && (
              <div style={{ background: 'var(--cream)', borderRadius: 12, padding: '12px 16px', marginBottom: 12 }}>
                <p style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: 4, letterSpacing: '0.08em' }}>YOU SAID</p>
                <p style={{ fontSize: '0.95rem', color: 'var(--navy)' }}>{transcript}</p>
              </div>
            )}

            {/* Response */}
            {response && (
              <div style={{ background: 'var(--navy)', borderRadius: 12, padding: '14px 16px', marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <MessageSquare size={14} color="rgba(255,255,255,0.6)" />
                  <p style={{ fontSize: '0.68rem', fontWeight: 800, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.08em' }}>ONE VOTE SAYS</p>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'white', lineHeight: 1.6 }}>{response}</p>
              </div>
            )}

            {/* Text input */}
            <div className="flex gap-8" style={{ marginTop: 8 }}>
              <input
                type="text"
                value={textInput}
                onChange={e => setTextInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleTextSubmit()}
                placeholder="Or type your question here..."
                style={{ flex: 1, padding: '12px 16px', borderRadius: 12, border: '2px solid var(--border)', fontSize: '0.9rem', outline: 'none', fontFamily: 'var(--font-body)', transition: 'var(--transition)' }}
                onFocus={e => e.target.style.borderColor = 'var(--navy)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
              <button
                onClick={handleTextSubmit}
                style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--navy)', color: 'white', border: 'none', cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'var(--transition)' }}
                aria-label="Send"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
